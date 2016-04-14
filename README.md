# Holistic Parallelogram

> Views Near You

## Team

  - __Product Owner__: Joel Aguero
  - __Scrum Master__: Andrew Ho
  - __Development Team Members__: Reina Mei, Laura Curley

## Table of Contents

1. [Overview](#overview)
2. [Usage](#usage)
3. [Requirements](#requirements)
4. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
5. [Team](#team)
6. [Contributing](#contributing)

## Overview

### Tech Stack
- [React](https://facebook.github.io/react/) and [Redux](http://redux.js.org/)
- [Node](https://nodejs.org/en/) and [Express](http://expressjs.com/)
- [Sequelize ORM](http://docs.sequelizejs.com/en/latest/) and [MySQL](https://www.mysql.com/)

#### Webpack
Webpack bundles dependencies into one file, so that all dependencies can be loaded into the DOM with a single `<script>` tag.  Webpack starts with an entry file (`App.js`) and traverses the project’s dependencies based on the `import` and `export` statements in the code. It uses a `webpack.config.js` file in the root directory to define which loaders are required for compilation and the destination of the output file.

#### Schema
![Schema design]
(http://i.imgur.com/lag3WRs.png)

## Usage

Make sure you have all [dependencies](#installing-dependencies) installed. Then, from within the root directory:
```
npm install
webpack
node server.js
```

Visit `localhost:4568` in the browser.

## Requirements

- Node 0.10.x
- Webpack 1.12.14

## Development

To compile client-side code and start the server, run:
```
webpack
node server.js
```

If you are developing on the client only, type `webpack-dev-server` into the CLI to start the server and visit `localhost:8080/client/` in the browser. This will watch the client-side JS files and reload the browser if any of them change, and will not compile a bundle.js file.

### Installing Dependencies

From within the root directory:

```
npm install -g webpack-dev-server webpack
```

### Roadmap

View the project roadmap [here](https://github.com/HolisticParallelogram/holisticparallelogram/issues).


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
