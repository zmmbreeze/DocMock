/*global require:true, module:true */
var defaultSetting = require('./defaultSetting');
var Util = require('./Util');

var Setting = {
    /**
     * Extend the default setting.
     *
     * @param {Object} setting extra setting.
     */
    extend: function(setting) {
        Util.extend(defaultSetting, setting);
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
     * If this string is seperator line.
     *
     * @return {boolean} .
     */
    isSeperator: function(str) {
        var sep = defaultSetting.seperator;
        var i = 0;
        var l = str.length;
        if (l === 0) {
            return false;
        }

        for (; i < l; i++) {
            if (str[i] !== sep) {
                return false;
            }
        }
        return true;
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
            if (startStr = Util.startWith(str, startStrs)) {
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
