const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: '.',
  spec_files: [
    './tests/**/*-test.js'
  ],
  helpers: [
    './tests/helpers/**/*.js'
  ]
});

jasmine.execute();
