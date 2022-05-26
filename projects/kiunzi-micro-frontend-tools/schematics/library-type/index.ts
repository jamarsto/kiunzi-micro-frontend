import { apply, applyTemplates, chain, mergeWith, MergeStrategy, move, Rule, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings, virtualFs, workspaces } from '@angular-devkit/core'
import { Schema as KiunziLibraryTypeSchema } from '../library-type/schema';

export function libraryType(options: KiunziLibraryTypeSchema): Rule {
  return chain([
    generateAppFiles(options)
 ]);
}

function generateAppFiles(options: KiunziLibraryTypeSchema): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);

    const libProject = validateProject(workspace, options.project);

    const libTemplateSource = apply(url(`./files/library`), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        authority: options.authority,
        client: options.client
      }),
      move(normalize(libProject.root))
    ]);

    return chain([
      mergeWith(libTemplateSource, MergeStrategy.AllowCreationConflict)
    ]);
  };
}

function validateProject(workspace: workspaces.WorkspaceDefinition, name: string): workspaces.ProjectDefinition | never {
  const project = workspace.projects.get(name);
  if (!project) {
    throw new SchematicsException(`Project '${name}' not found!`);
  }

  const projectType = project.extensions['projectType'];
  if(projectType !== 'library') {
    throw new SchematicsException(`Project '${name}' is not of type 'library'!`);
  }

  return project;
}

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}
