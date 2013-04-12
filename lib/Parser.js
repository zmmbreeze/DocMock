/*global require:true, module:true */
var fs = require('fs');
var reader = require('buffered-reader');
var BinaryReader = reader.BinaryReader;
var DataReader = reader.DataReader;
var util = require('util');
var events = require('events');
var Setting = require('./Setting');
var Api = require('./Api');

/**
 * Parser for api doc.
 *
 *      new Parser('./doc.md').on('end', function() {
 *          var apis = this.getApis();
 *      });
 *
 * @constructor
 * @param {string} filePath path of doc file.
 * @param {string} encoding encoding of doc file, default is utf-8.
 */
var Parser = function(filePath, encoding) {
    events.EventEmitter.call(this);
    this._status = '';
    this._parseFile(filePath, encoding || 'utf-8');
};

util.inherits(Parser, events.EventEmitter);

/**
 * Parse the file.
 *
 * @param {string} filePath path of doc file.
 * @param {string} encoding encoding of doc file, default is utf-8.
 */
Parser.prototype._parseFile = function(filePath, encoding) {
    if (!fs.existsSync(filePath)) {
        throw new Error('File: ' + filePath + ' not exist.');
    }
    var me = this;
    me._fileIndex = 0;

    new DataReader(filePath, { encoding: encoding })
        .on('error', function(error) {
            me._parseSuccess = false;
            throw new Error(error);
        })
        .on('line', function(line) {
            me._parseLine(line);
        })
        .on('end', function() {
            me._parseSuccess = true;
            me.emit('start');
        })
        .read();
};

/**
 * Parse by line.
 *
 * @param {string} line line of doc file.
 */
Parser.prototype._parseLine = function(line) {
    if (Setting.isSeperator(line)) {
        if (this._status === 'start') {
            // generate api
            if (this._createApi()) {
                this._status = '';
            }
        } else {
            // prepare
            this._status = 'start';
            this._currentApiStrs = [];
        }
    // push line
    } else if (this._status === 'start') {
        var start = Setting.startWith(line);
        if (start === 'name') {
            // generate api
            this._createApi();
            this._hasApiName = true;
        }
        this._currentApiStrs.push({
            text: line,
            start: start,
            index: this._fileIndex
        });
    }
    this._fileIndex++;
};

Parser.prototype._createApi = function() {
    if (this._hasApiName && this._currentApiStrs.length) {
        this._apis = this._apis || [];
        this._apis.push(new Api(this._currentApiStrs));
        this._currentApiStrs = [];
        return true;
    } else {
        return false;
    }
};

/**
 * Get apis when start event emitted.
 *
 * @return {Array<Object>} apis.
 */
Parser.prototype.getApis = function() {
    return this._apis;
};

/**
 * @type {Object} exports .
 */
module.exports = Parser;
