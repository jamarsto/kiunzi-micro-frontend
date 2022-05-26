import { apply, applyTemplates, chain, externalSchematic, mergeWith, move, Rule, SchematicsException, Tree, url } from '@angular-devkit/schematics';
import { normalize, strings, virtualFs, workspaces } from '@angular-devkit/core'
import { Schema as KiunziNgAddSchema } from '../ng-add/schema';

const LIBRARY: string = 'lib';
const APPLICATION: string = 'app';

export function afterDependencies(options: KiunziNgAddSchema): Rule {
  return chain([
    externalSchematic('@angular-architects/module-federation', 'ng-add', { project: options.project, port: options.port }),
    generateFiles(options)
 ]);
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

function generateFiles(options: KiunziNgAddSchema): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);

    const project = validateProject(workspace, APPLICATION, options.project);
    validateProject(workspace, LIBRARY, options.library);

    const templateSource = apply(url(`./files/${options.type}`), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        project: options.project,
        library: options.library
      }),
      move(normalize(project.root))
    ]);

    return chain([
      mergeWith(templateSource)
    ]);
  };
}

function validateProject(workspace: workspaces.WorkspaceDefinition, type: string, name: string): workspaces.ProjectDefinition | never {
  const subject = type === LIBRARY ? 'project library' : 'project';

  const project = workspace.projects.get(name);
  if (!project) {
    throw new SchematicsException(`Invalid ${subject}: ${name}`);
  }

  const projectType = project.extensions['projectType'] === 'application' ? APPLICATION : LIBRARY;
  if(projectType !== type) {
    throw new SchematicsException(`Invalid ${subject} type: ${projectType}`);
  }

  return project;
}
