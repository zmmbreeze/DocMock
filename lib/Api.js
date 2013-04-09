/*global require:true, module:true */
var Setting = require('./Setting');

/**
 * Represent a api.
 *
 * @constructor
 * @param {Array.<string>} lines input api strings.
 */
var Api = function(lines) {
    this._status = '';
    this._init(lines);
};

/**
 * Init.
 *
 * @param {Array.<string>} lines input api strings.
 */
Api.prototype._init = function(lines) {
    var i = 0;
    var l = lines.length;
    for (; i < l; i++) {
        this._parseLine(lines[i]);
    }
};

/**
 * Parse line.
 *
 * @param {string} line .
 */
Api.prototype._parseLine = function(line) {
    var prefix = Setting.startWith(line);
    switch (prefix) {
        case 'request':
            this._endScope();
            break;
        case 'response':
            this._endScope();
            break;
        default:
            // save name/description/url
            break;
    }
};

/**
 * End of request or response, then generate request and response.
 */
Api.prototype._endScope = function() {
    if (!this._scope) {
        if (this._scope.length > 0) {
            // TODO collect scope to generate request or response.
            console.log(this._scope);
        }
    } else {
        this._scope = [];
    }
};
