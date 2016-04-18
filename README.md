# ScenicNinja

> Made by HolisticParallelogram

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
You'll need API keys for [Google Places](https://developers.google.com/places/web-service/get-api-key) and for [Google Plus](https://developers.google.com/+/web/api/rest/oauth#acquiring-and-using-an-api-key). Add these to the config files in /server/config, following the format of the example files, and remove `.example` from the filename.
Make sure you have all [dependencies](#installing-dependencies) installed. Then, from within the root directory:
```
npm install
webpack
npm start
```

Visit `localhost:4568` in the browser.

## Requirements

- Node 0.10.x
- Webpack 1.12.14

## Development

To compile client-side code, run:
```
webpack --watch
```
`webpack --watch` will recompile a `bundle.js` file when any client-side JS files have changed.

In a separate shell, start the server by running:
```
npm install
npm run dev
```

Visit `localhost:4568` in the browser.

### Installing Dependencies

From within the root directory:

```
npm install -g nodemon webpack
```
## Deployment
#### Initial Setup on Digital Ocean
- Set up your droplet with raw Ubuntu
- Apt is the package manager on Ubuntu (think brew but for Ubuntu)
- Do an apt update:  sudo apt-get update
- Install MySql:  sudo apt-get install mysql-server
- Enter a secure password when prompted and note it down as it will be added to server/config/mysqlsetup.js later
- Follow the below instructions for deploying new changes manually
- If you get ERRCONN, check server/db/db.js for correct credentials
- Ensure that credentials in db.js match those exported in server/config files

#### Deploying New Changes
- Merge the production branch of the repo with the master branch
- Log in to the digital ocean droplet using:
- ssh root@xxx.xxx.xxx.x (get your droplet IP Address from digital ocean)
- If the ssh fails 3x, you'll be prompted for the password.
- Enter UNIX Password for your Digital Ocean droplet (Go to Access menu if you need to reset)
- Either clone down your production repo, or cd into the root directory
- git pull origin master
- npm install
- webpack
- cd server
- ls to see if config exists, if not, create it as below
- mkdir config
- cd config
=============================
- ls and look to see if the below files are already on the server, if not, add them as below
- touch googleplus.js
- touch googleplaces.js
- touch mysqlsetup.js

- vim googleplus.js (or open in whatever terminal editor you prefer)
- Insert the following:
```
module.exports = {
  CLIENT_ID: 'enter-your-googleplus-api-key-here',
  CLIENT_SECRET: 'enter-your-googleplus-api-key-here'
};
:wq
```

- vim googleplaces.js
- Insert the following:
```
module.exports = 'your-googleplaces-api-key-goes-here';
:wq
```

- vim mysqlsetup.js
- Insert the following:
```
module.exports = 'your-serverside-mysql-password-goes-here';
:wq
```

==============================

- npm start
- Go to xxx.xxx.xx.x:4568 to see your site live
### Roadmap

View the project roadmap [here](https://github.com/HolisticParallelogram/holisticparallelogram/issues).


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
