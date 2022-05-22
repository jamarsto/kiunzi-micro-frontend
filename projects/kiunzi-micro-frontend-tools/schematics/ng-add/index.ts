import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { Schema as KiunziNgAddSchema } from './schema';

export function ngAdd(options: KiunziNgAddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('after-dependencies', options), [installTaskId]);
    return tree;
  };
}
