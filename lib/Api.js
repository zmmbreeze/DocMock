/*global require:true, module:true */
var Setting = require('./Setting');
var Util = require('./Util');
var util = require('util');

/**
 * Represent a api.
 *
 * @constructor
 * @param {Array.<Object>} lines input api strings.
 */
var Api = function(lines) {
    this._status = '';
    this._originalLines = lines;
    this._init(lines);
};

/**
 * Get the formatted api text with line number and error message.
 *
 * @param {boolean} printToTerminal if print to terminal.
 * @return {string} formatted api text.
 */
Api.prototype.print = function(printToTerminal) {
    var lines = this._originalLines;
    var i = 0;
    var l = lines.length;
    var line;
    var str = 'API START =======================\n';
    for (; i < l; i++) {
        line = lines[i];
        str += line.index + ': ';
        str += line.text + '\n';
        if (line.error) {
            str += 'ERROR: ' + line.error + '\n';
        }
    }
    str += 'API END ====================\n';

    if (printToTerminal) {
        util.puts(str);
    }

    return str;
};

/**
 * Init.
 *
 * @param {Array.<Object>} lines input api strings.
 */
Api.prototype._init = function(lines) {
    var i = 0;
    var l = lines.length;
    var scope = this._newScope('root');
    for (; i < l; i++) {
        scope = this._parseLine(lines[i], scope);
    }
    scope = this._endScope(scope);
};

/**
 * Parse indent level.
 *
 * @param {string} str input string.
 * @return {Number} level (0-2).
 */
Api.prototype._parseLevel = function(str) {
    if (str.trim() === '') {
        return 0;
    }
    str = str.replace(/\t/g, '    ');
    var count = 0;
    var i = 0;
    var c = str[i];
    while (c === ' ') {
        c = str[i];
        i++;
    }

    return Math.floor((i - 1) / 4);
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
    var level = this._parseLevel(line.text);

    // content or param
    if (level === 3) {
        if (scope._prevLine) {
            var start = scope._prevLine.start;
            if (start === 'param' || start === 'content') {
                this._parseHighLevelLine(line, start, scope);
            }
        }
        return scope;
    }


    if (level > scope._scopeLevel) {
        scope = this._newScope(scope);
    } else if (level < scope._scopeLevel) {
        scope = this._endScope(scope);
    }

    // other
    line.prefix = Setting.startWith(line.text);
    scope._context[line.prefix] = line;
    scope._prevLine = line;
    return scope;
};

/**
 * Create a new scope.
 *
 * @param {string} name scope name.
 * @param {Object} parentScope parent scope.
 * @return {Object} scope.
 */
Api.prototype._newScope = function(name, parentScope) {
    // scope struct.
    var scope = {
        name: name || '',       // scope name.
        context: {},            // save data
        childrenScope: [],      // child scopes
        parent: parentScope     // parent scope
    };
    parentScope.childrenScope.push(scope);
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

/**
 * @type {Object} Api.
 */
module.exports = Api;
