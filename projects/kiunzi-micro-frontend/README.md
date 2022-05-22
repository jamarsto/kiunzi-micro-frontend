# Kiunzi Micro-frontend Tools

Kiunzi is a scaffolding framework for building microservice based applications.  The Kiunzi Micro-frontend Tools library provides support for Module Federation and Custom Elements to enable the development fully encapsulated micro-frontends

## Table of Contents

- [Acknowledgement](#cknowledgement)
- [Motivation](#motivation)
- [Prerequisites](#prerequisistes)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Development](#development)
- [License](#license)

## Acknowledgement

This package uses and is inspired by `@angular-architects/module-federation` and `@angular-architects/module-federation-tools` by [Manfred Steyer](https://twitter.com/ManfredStayer).

## :thinking: Motivation

There were a few in the angular architects packages that I felt could be expanded and improved on, and I also thought that more could be done with schematics to get a full implementation up and running without multiple tweaks to the generated code.

The key motivation is to simplify adoption of micro-frontends.

## Prerequisites

- Module Federation requires Webpack 5+
- Angular's support of Webpack 5 requires Angular 12+

## :package: Installation

This library is intended to be used at the start of establishing a project as it updates configurations and generates additional code and configurations.  In short it builds the scaffolding.

```sh
# Create your angular workspace
ng new micro-frontend-workspace --create-application false

# Navigate into the micro-frontend-workspace folder
cd micro-frontend-workspace

# Create the shell
ng generate application --no-routing --style sass --project shell

# Create the micro-frontends
ng generate application --no-routing --style sass --project mfe1
ng generate application --no-routing --style sass --project mfe2

# Configure the shell
ng add @jamarsto/kiunzi-micro-frontend-tools --project shell --type shell --port 8000

# Configure the micro-frontends
ng add @jamarsto/kiunzi-micro-frontend-tools --project mfe1 --type microfrontend --port 8001
ng add @jamarsto/kiunzi-micro-frontend-tools --project mfe2 --type microfrontend --port 8002
```

<div style="background-color: blue">
:information_source::triangular_flag_on_post:This is still under development so will not update all configuration yet.  Upcoming releases will address this issue.
</div>

## :dvd: Getting Started


:information_source::triangular_flag_on_post:Coming soon

## Development

:information_source::triangular_flag_on_post:Coming soon

## License

This project is licensed under the MIT license.  See the [LICENSE](https://github.com/jamarsto/kiunzi-micro-frontend/blob/master/LICENSE)
