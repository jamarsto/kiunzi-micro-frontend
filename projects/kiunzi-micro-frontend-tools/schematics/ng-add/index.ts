import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies'
import { Schema as KiunziNgAddSchema } from '../ng-add/schema';

export function ngAdd(options: KiunziNgAddSchema): Rule {
  return chain([
    addPackageJsonDependencies(),
    installPackageJsonDependencies(options)
  ]);
}

function addPackageJsonDependencies(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^14.2.3', name: '@angular-architects/module-federation' },
      { type: NodeDependencyType.Default, version: '^14.2.3', name: '@angular-architects/module-federation-tools' },
      { type: NodeDependencyType.Default, version: '^14.0.0', name: 'angular-auth-oidc-client'},
      { type: NodeDependencyType.Default, version: '^12.1.1', name: '@ng-bootstrap/ng-bootstrap'},
      { type: NodeDependencyType.Default, version: '^2.10.2', name: '@popperjs/core'},
      { type: NodeDependencyType.Default, version: '^5.1.3',  name: 'bootstrap' }
    ];
    dependencies.forEach(dependency => {
      addPackageJsonDependency(tree, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });
    return tree;
  };
}

function installPackageJsonDependencies(options: KiunziNgAddSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('after-dependencies', options), [installTaskId]);
    return tree;
  };
}
