/*global require:true, module:true */
var Parser = require('./Parser');

/**
 * @type {Function} .
 */
var main = module.exports = function() {
    var parser = new Parser('./example.md');
    parser.on('start', function() {
        // console.log(this.getApis());
    });
};

main();
