/*global require:true, module:true */
var Setting = require('./Setting');
var Util = require('./Util');

/**
 * Represent a api.
 *
 * @constructor
 * @param {Array.<Object>} lines input api strings.
 */
var Api = function(lines) {
    this._status = '';
    this._init(lines);
};

/**
 * Init.
 *
 * @param {Array.<Object>} lines input api strings.
 */
Api.prototype._init = function(lines) {
    var i = 0;
    var l = lines.length;
    var scope = this._newScope();
    for (; i < l; i++) {
        scope = this._parseLine(lines[i], scope);
    }
    scope = this._endScope(scope);
    console.log(scope);
};

/**
 * Parse indent level.
 *
 * @param {string} str input string.
 * @return {number} level (0-2).
 */
Api.prototype._parseLevel = function(str) {
    var scopeI = ['    ', '\t'];
    var scopeII = ['        ', '\t\t', '    \t', '\t    '];
    if (Util.startWith(str, scopeII)) {
        return 2;
    }
    if (Util.startWith(str, scopeI)) {
        return 1;
    }
    return 0;
};

/**
 * Parse line.
 *
 * @param {Object} line example:
 *                  {
 *                      text: 'line',
 *                      index: 1
 *                  }.
 * @param {Object} scope .
 * @return {Object} scope.
 */
Api.prototype._parseLine = function(line, scope) {
    var trimText;
    var level = this._parseLevel(line.text);
    if (level > scope._scopeLevel) {
        scope = this._newScope(scope);
    } else if (level < scope._scopeLevel) {
        scope = this._endScope(scope);
    }

    // content or param
    if (level === 3) {
        scope._lines.push(line);
        return scope;
    }

    // other
    line.prefix = Setting.startWith(line.text);
    scope._lines.push(line);
    return scope;
};

/**
 * create a new scope.
 *
 * @param {Object} parentScope parent scope.
 * @return {Object} scope.
 */
Api.prototype._newScope = function(parentScope) {
    var scope = {
        _data: {},
        _lines: [],
        _parent: parentScope,
        _index: parentScope._lines.length
    };
    parentScope._lines.push(scope);
    return scope;
};

/**
 * End of request or response, then generate request and response.
 *
 * @param {Object} scope current scope.
 * @return {Object} parent scope.
 */
Api.prototype._endScope = function(scope) {
    // TODO has data.
    if (scope._lines.length) {
        // has parent scope
        if (scope._parent) {
            var prevData = scope._parent[scope._index - 1];
            if (prevData && prevData.prefix) {
                scope._data
            }
        }
        var i = 0;
        var l = scope._lines.length;
        var line;
        for (; i < l; i++) {
            line = scope._lines[i];
            if (line.prefix) {
                
            }
        }
    }
    return scope._parent;
};
