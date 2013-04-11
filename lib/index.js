/*global require:true, module:true */
var Parser = require('./Parser');

/**
 * @type {Function} .
 */
module.exports = function() {
    var parser = new Parser('./example.md');
    console.log(parser.getApis());
};
