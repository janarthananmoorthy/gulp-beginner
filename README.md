* Gulp + Jquery + Bootstrap + JSTree + Angular

Install node.js

node --version v8.10.0
npm --version 5.6.0

To ensure gulp installed globally
npm install -g gulp

1. touch README.md
2. npm init --yes (to create package.json)
3. Add gulp dev dependencies

		npm i gulp --save-dev
		npm i gulp-uglify --save-dev
		npm i gulp-rename --save-dev
		npm i gulp-concat --save-dev
		npm i gulp-header --save-dev
		npm i gulp-minify-css --save-dev
		npm i gulp-watch --save-dev
		npm i gulp-clean --save-dev
		npm i run-sequence --save-dev

4. Add project dependencies

		npm i jquery --save
		npm i bootstrap --save
		npm i angular --save
		npm i jstree --save

5. Add "gulpfile.js" with basic task
6. create sample controller.js and styles.css to src folder