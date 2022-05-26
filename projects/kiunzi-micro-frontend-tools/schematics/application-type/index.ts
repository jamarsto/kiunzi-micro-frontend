import { apply, applyTemplates, chain, externalSchematic, mergeWith, MergeStrategy, move, Rule, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings, virtualFs, workspaces } from '@angular-devkit/core'
import { Schema as KiunziApplicationTypeSchema } from '../application-type/schema';

export function applicationType(options: KiunziApplicationTypeSchema): Rule {
  return chain([
    externalSchematic('@angular-architects/module-federation', 'ng-add', { project: options.project, port: options.port }),
    generateAppFiles(options)
 ]);
}

function generateAppFiles(options: KiunziApplicationTypeSchema): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);

    const appProject = validateProject(workspace, 'application', options.project);
    validateProject(workspace, 'library', options.library);

    const appTemplateSource = apply(url(`./files/${options.type}`), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        project: options.project,
        library: options.library
      }),
      move(normalize(appProject.root))
    ]);

    return chain([
      mergeWith(appTemplateSource, MergeStrategy.AllowCreationConflict)
    ]);
  };
}

function validateProject(workspace: workspaces.WorkspaceDefinition, type: string, name: string): workspaces.ProjectDefinition | never {
  const project = workspace.projects.get(name);
  if (!project) {
    throw new SchematicsException(`Project '${name}' not found!`);
  }

  const projectType = project.extensions['projectType'];
  if(projectType !== type) {
    throw new SchematicsException(`Project '${name}' is not of type '${type}'!`);
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
