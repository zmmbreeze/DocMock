/*global require:true, module:true */
var fs = require('fs');
var reader = require('buffered-reader');
var BinaryReader = reader.BinaryReader;
var DataReader = reader.DataReader;
var util = require('util');
var events = require('events');

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
    // TODO
};

/**
 * Get apis when start event emitted.
 *
 * @return {Array<Object>} apis.
 */
Parser.prototype.getApis = function() {
    // TODO
    return [];
};

/**
 * @param {Object} exports .
 */
module.exports = Parser;
