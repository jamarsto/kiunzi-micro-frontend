# Kiunzi Micro-frontend Tools

Kiunzi is a scaffolding framework for building microservice based applications.  The Kiunzi Micro-frontend Tools library provides support for Module Federation and Custom Elements to enable the development fully encapsulated micro-frontends

## 🏠Table of Contents

- [Acknowledgements](#acknowledgements)
- [Motivation](#motivation)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Development](#development)
- [License](#license)

## 🎁Acknowledgements

This package uses and is inspired by `@angular-architects/module-federation` and `@angular-architects/module-federation-tools` by [Manfred Steyer](https://twitter.com/ManfredSteyer).

## 🤔Motivation

There were a few in the angular architects packages that I felt could be expanded and improved on, and I also thought that more could be done with schematics to get a full implementation up and running without multiple tweaks to the generated code.

The key motivation is to simplify adoption of micro-frontends.

## 🔍Prerequisites

- Module Federation requires Webpack 5+
- Angular's support of Webpack 5 requires Angular 12+
- This library is built using Angular 13+

## 📦Installation

This library is intended to be used at the start of establishing a project as it updates configurations and generates additional code and configurations.  In short it builds the scaffolding.

First, update the `tsconfig.json` to add the `resolveJsonModule` and `esModuleIterop` flags
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true,
```

Next, build example application
```sh
# Create your angular workspace
ng new micro-frontend-workspace --create-application false

# Navigate into the micro-frontend-workspace folder
cd micro-frontend-workspace

# Create the shared library
ng generate library lib

# Create the shell
ng generate application --no-routing --style sass --project shell

# Create the micro-frontends
ng generate application --no-routing --style sass --project mfe1
ng generate application --no-routing --style sass --project mfe2

# Configure the library
ng add @jamarsto/kiunzi-micro-frontend-tools --project lib --type library --authority <your_oidc_server_url> --client <your_client_id>

# Configure the shell
ng add @jamarsto/kiunzi-micro-frontend-tools --project shell --type shell --port 8000 --library lib

# Configure the micro-frontends
ng add @jamarsto/kiunzi-micro-frontend-tools --project mfe1 --type microfrontend --port 8001 --library lib
ng add @jamarsto/kiunzi-micro-frontend-tools --project mfe2 --type microfrontend --port 8002 --library lib
```

Finally, make sure the library is linked locally so that it is exposed as an `npm` package to the build
```sh
cd projects/lib
npm link
cd ../..
npm link lib
```
You may need to restart your ide for the `tsconfig.json` and `npm link` changes to be picked up

## 📀Getting Started

Update `projects/shell/src/app/app-routing.module.ts` to add the modules to the ``shell`` route
```ts
export const customShellRoutes: CustomShellRoutes = {
	headRoutes: [
		{ path: '', redirectTo: 'retail', pathMatch: 'full' },
		{ path: 'unauthorized', component: UnauthorisedComponent }
	],
	moduleRoutes: [
		{ title: 'Module One', name: 'mfe1', prefix: 'one', items: [], guards: [AutoLoginAllRoutesWithRoleGuard], roles: ['ADMIN', 'USER'] },
		{ title: 'Module Two', name: 'mfe2', prefix: 'two', items: [], guards: [AutoLoginAllRoutesWithRoleGuard], roles: ['ADMIN', 'USER'] }
	],
	tailRoutes: [
		{ path: '**', component: NotFoundComponent }
	]
}
```

Update the `src/app/remote-app/remote-app-routing.module.ts` for each module to reflect any new routing
```ts
const customRoutes: CustomModuleRoutes = {
  headRoutes: [
    { path: '', redirectTo: shellModule.prefix, pathMatch: 'full' },
    { path: 'unauthorized', component: UnauthorisedComponent }
  ],
  moduleRoute: { component: RootComponent, guards: [AutoLoginAllRoutesWithRoleGuard], roles: ['ADMIN', 'USER'], children: [
    { path: '', component: HomeComponent },
    { path: 'example', component: ExampleComponent },
  ]},
  tailRoutes: []
}
```

Update the `src/assets/menu.json` for each module to reflect routes we want to add to the `shell` navigation bar
```json
{
    "menuItems": [
        { "title": "Home", "link": "/", "fullMatch": true },
        { "title": "Path", "link": "/path", "fullMatch": false },
        { "title": "Payment", "link": "/payment", "fullMatch": false }
    ]
}
```

## ✨Development

The `shellModule` constant in each `src/app/remote-app/remote-app-routing.module.ts` is used to simulate the `shell` when testing the micro-frontend in standalone mode
```ts
export const shellModule: Module = {name: 'mfe1', title: 'Module One', prefix: 'one', items: jsonMenuItems.menuItems as MenuItems};
```

The navigation bar in the `projects/src/shell/app/component/header/header.component.ts` is dynamically generated using the `src/assets/menu.json` from each module
```ts
ngOnInit(): void {
  this.modules.forEach((entry) => this
      .menuItemService
      .getMenuItemsForModule(entry.name)
      .subscribe((children) => entry.items = children));
}
```

To keep the routes from the `shell` and modules in sync Kiunzi uses events under the hood. To register the event handling we use `syncRouteShell.sync` in the `constructor` of `projects/shell/src/app/app.component.ts`

```ts
constructor(private router: Router, private syncRouteShell: SyncRouteShell) {
  this.syncRouteShell.sync(this.router, customShellRoutes);
}
```

and we use `syncRouteModule.sync` in `ngOnInit` of `src/app/remote-app/remote-app.component.ts` in each module

```ts
ngOnInit(): void {
  this.syncRouteModule.sync(this.router, shellModule.name);
}
```

## 📄License

This project is licensed under the MIT license.  See the [LICENSE](https://github.com/jamarsto/kiunzi-micro-frontend-tools/blob/master/LICENSE)
