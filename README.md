# This is a base repository for JS Academy
## How to run GOL

* run ```npm run start-gol``` to run GOL
* run ```npm run start-gol-b``` to run GOL with '0' (zeroes) having black color

## Prerequisites
* ideally unix environment
  
  Everything in JS world should be platform agnostic, but it can be profitable to have unix environment. Windows user can use Windows Subsystem for Linux.
* Node.js
  https://nodejs.org/en/

  Use LTS or Current. LTS is used as offical version for this course.
  ```
  $ node -v
  v10.16.0
  ```
* npm
  https://github.com/npm/cli

  npm is installed with Node.js
  ```
  $ npm -v
  6.9.0
  ```
* code editor / IDE

  You can use any favorite code editor / IDE. Visual Studio Code is used as offical code editor for this course.

## What next?

* clone this repo
* run ```npm install``` to install all dependencies
* run ```npm run test``` to test if everything is ready
* run ```npm run build``` to build "production" code
* run ```npm run start``` to run "production" code

### And for playing with the repo (developing) 
* run ```npm run start:dev``` to start nodemon - node watching for file changes
* run ```npm run test:dev``` to start jest watching for file changes
* run ```npm run lint:dev``` to be sure your code following all best practices
