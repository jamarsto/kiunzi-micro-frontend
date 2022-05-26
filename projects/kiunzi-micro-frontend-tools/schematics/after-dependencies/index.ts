import { chain, noop, Rule, schematic, } from '@angular-devkit/schematics';
import { Schema as KiunziAfterDependenciesSchema } from '../after-dependencies/schema';

export function afterDependencies(options: KiunziAfterDependenciesSchema): Rule {
  return chain([
    options.type === 'library' ? schematic('library-type', options) : noop(),
    options.type === 'shell' ? schematic('application-type', options) : noop(),
    options.type === 'microfrontend' ? schematic('application-type', options) : noop()
  ]);
}
