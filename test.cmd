cd app
mocha --compilers js:babel-register --require source-map-support/register imports/**/*.tests.js
cd ..