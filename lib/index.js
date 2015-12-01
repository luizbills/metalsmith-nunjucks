var path = require('path');
var nunjucks = require('nunjucks');
var minimatch = require("minimatch");

module.exports = function(opts) {
  opts = opts || {};

  var env = null;

  return (files, metalsmith, done) => {
    if (env == null) {
      var templatesPath = path.join(metalsmith._directory, metalsmith._source);
      env = nunjucks.configure(templatesPath, opts);
    }

    for (filepath in files) {
      if (path.extname(filepath) == '.html') {
        var file = files[filepath];
        var metadata = Object.assign({}, file, metalsmith._metadata);
        var result = nunjucks.renderString(file.contents.toString(), metadata);
        file.contents = new Buffer(result);
      }
    }

    done();
  };
};