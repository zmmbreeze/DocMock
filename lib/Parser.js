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
    this._parseFile(filePath, encoding || 'utf-8');
    events.EventEmitter.call(this);
    this._status = '';
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
        });
};

/**
 * Parse by line.
 *
 * @param {string} line line of doc file.
 */
Parser.prototype._parseLine = function(line) {
    if (Setting.isSeperator(line)) {
        if (this._status === 'start') {
            // generate apis
            if (this._currentApiStrs.length) {
                this._apis = this._apis || [];
                this._apis.push(new Api(this._currentApiStrs));
                this._currentApiStrs = null;
                this._status = '';
            }
        } else {
            // prepare
            this._status = 'start';
            this._currentApiStrs = [];
        }
    // push line
    } else if (this._status === 'start') {
        this._currentApiStrs.push(line);
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
