/*
 * grunt-init-fep
 *
 * Copyright (c) 2016 DK
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a frontend project';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should start with your project org short name and split by _';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'fep'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title', function(value, data, done) {
      // Fix jQuery capitalization.
      value = value.replace(/jquery/gi, 'jQuery');
      done(null, value);
    }),
    init.prompt('description', 'Frontend project'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('node_version', '4.4.5'),
  ], function(err, props) {
    // A few additional properties.
    props.keywords = [];
    props.devDependencies = {
      "grunt": "^0.4.5",
      "grunt-bust-requirejs-cache": "^0.3.2",
      "grunt-cache-bust-alt": "^0.6.1",
      "grunt-contrib-clean": "^0.7.0",
      "grunt-contrib-copy": "^1.0.0",
      "grunt-contrib-jshint": "^0.11.3",
      "grunt-contrib-less": "^1.0.1",
      "grunt-contrib-requirejs": "^0.4.4",
      "grunt-contrib-watch": "^0.6.1",
      "grunt-express-server": "^0.5.2",
      "grunt-inline-text": "^0.1.2",
      "grunt-replace": "^0.10.2",
      "grunt-source-map": "git+https://github.com/dukai/grunt-source-map.git",
      "bluebird": "^3.3.5",
      "express": "^4.13.4",
      "velocity": "^0.7.2",
      "express-velocity-engine": "git+https://github.com/dukai/express-velocity-engine.git"
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: ['src/**', 'node_modules/**']});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', props);
    init.writePackageJSON('bower.json', {
      name: props.name,
      description: props.description,
      homepage: props.homepage,
      licenses: props.licenses,
      dependencies: {}
    });

    // All done!
    done();
  });

};