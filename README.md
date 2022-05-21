# Kiunzi Micro-frontend Tools

Kiunzi is a scaffolding framework for building microservice based applications.  The Kiunzi Micro-frontend Tools library provides support for Module Federation and Custom Elements to enable the development fully encapsulated micro-frontends

## Table of Contents

- [Acknowledgement](#cknowledgement)
- [Prerequisites](#prerequisistes)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Development](#development)
- [Contributing](#contributing)
- [Support + Feedback](#support--feedback)

## Acknowledgement

This package uses and is inspired by `@angular-architects/module-federation` and `@angular-architects/module-federation-tools` by [Manfred Steyer](https://twitter.com/ManfredStayer). There were a few areas that I felt could be expanded and improved on, and I also thought that more could be done with schematics to get a full implementation up ang running without multiple tweaks to the generated code.

## Prerequisites

- Module Federation requires Webpack 5+
- Angular's support of Webpack 5 requires Angular 12+

## Installation

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

:triangular_flag_on_post:Note: This is still under development so will not update all configuration yet.  Upcoming releases will address this issue.

## Getting Started

## Development

## Contributing

## Support + Feedback

## License

This project is licensed under the MIT license.  See the [LICENSE](https://github.com/jamarsto/kiuni-micro-frondend)
