/*global require:true, module:true */
var defaultSetting = require('./defaultSetting');

var extend = function(oldObj, newObj) {
    for (var key in newObj) {
        var value = newObj[key];
        if (typeof value === 'object') {
            if (!oldObj[key]) {
                oldObj[key] = value;
            } else {
                extend(oldObj[key], value);
            }
        } else {
            oldObj[key] = value;
        }
    }
};

/**
 * If input string is start with the string in startStrs.
 *
 * @param {string} str input string.
 * @param {Array.<string>} startStrs array of key string.
 * @return {string} key started with.
 */
var startWith = function(str, startStrs) {
    for (var i = 0, l = startStrs.length; i < l; i++) {
        if (str.indexOf(startStrs[i]) === 0) {
            return startStrs[i];
        }
    }
    return '';
};

var Setting = {
    /**
     * Extend the default setting.
     *
     * @param {Object} setting extra setting.
     */
    extend: function(setting) {
        extend(defaultSetting, setting);
    },
    /**
     * if the input str is seperator.
     *
     * @param {string} str input string.
     * @return {boolean} if.
     */
    isSeperator: function(str) {
        var sep = defaultSetting.seperator;
        for (var i = 0, l = str.length; i < l; i++) {
            if (str[i] !== sep) {
                return false;
            }
        }
        return true;
    },
    /**
     * Get the command identifier.
     *
     * @return {string} command identifier.
     */
    getIdentifier: function() {
        return defaultSetting.commandIdentifier;
    },
    /**
     * Get the string started with.
     *
     * @param {string} str input string.
     * @return {string} string started with.
     */
    startWith: function(str) {
        var startStrs;
        var startStr;
        var key;
        for (key in defaultSetting.keys) {
            startStrs = defaultSetting.keys[key];
            if (startStr = startWith(str, startStrs)) {
                return key;
            }
        }
        return '';
    }
};

/**
 * @param {Object} setting Object to manipluate settings.
 */
module.exports = Setting;
