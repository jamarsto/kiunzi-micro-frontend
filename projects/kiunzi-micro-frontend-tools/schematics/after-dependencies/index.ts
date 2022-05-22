import { chain, Rule, externalSchematic } from '@angular-devkit/schematics';
import { Schema as KiunziNgAddSchema } from '../ng-add/schema';

export function afterDependencies(options: KiunziNgAddSchema): Rule {
  return chain([
    externalSchematic('@angular-architects/module-federation', 'ng-add', { project: options.project, port: options.port })
 ]);
}
