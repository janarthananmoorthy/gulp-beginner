# Gulp + Jquery + Bootstrap + JSTree + Angular + Karma

## Pre-conditions
* Install node.js
* node: **v8.10.0**
* npm: **5.6.0**
* Install gulp globally **(npm install -g gulp)**

## Basic Angular-Gulp project

1. touch **README.md**
2. npm init --yes (to create package.json)
3. Add gulp dev dependencies
```
npm i gulp --save-dev
npm i gulp-uglify --save-dev
npm i gulp-rename --save-dev
npm i gulp-concat --save-dev
npm i gulp-header --save-dev
npm i gulp-minify-css --save-dev
npm i gulp-watch --save-dev
npm i gulp-clean --save-dev
npm i run-sequence --save-dev
```
4. Add project dependencies
```
npm i jquery --save
npm i bootstrap --save
npm i angular --save
npm i jstree --save
npm i angular-route --save
```
5. Add `gulpfile.js` with basic task
6. create sample `controller.js` and `styles.css` to src folder

## Karma Test Cases

1. Add below dev dependencies
```
npm install angular-mocks --save-dev
npm install karma --save-dev
npm install gulp-karma --save-dev
npm install jasmine-core --save-dev
npm install karma-phantomjs-launcher --save-dev
npm install karma-jasmine --save-dev
npm install karma-coverage --save-dev
```

2. Add `karma.conf.js` and `controller.spec.js` files
```
src
test
├── config
│   └── karma.conf.js
└── unit
    └── contorller.spec.js
```
**Note:** If you are using `ngRoute` don't forgot to add `beforeEach(angular.mock.module('ngRoute'));`<br />
**Reference:** [https://docs.angularjs.org/guide/unit-testing](https://docs.angularjs.org/guide/unit-testing)
