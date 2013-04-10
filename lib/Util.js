/*global require:true, module:true */

/**
 * @param {Object} setting Util.
 */
var Util = module.exports = {
    extend: function(oldObj, newObj) {
        for (var key in newObj) {
            var value = newObj[key];
            if (typeof value === 'object') {
                if (!oldObj[key]) {
                    oldObj[key] = value;
                } else {
                    Util.extend(oldObj[key], value);
                }
            } else {
                oldObj[key] = value;
            }
        }
    },
    /**
     * If input string is start with the string in startStrs.
     *
     * @param {string} str input string.
     * @param {Array.<string>} startStrs array of key string.
     * @return {string} key started with.
     */
    startWith: function(str, startStrs) {
        for (var i = 0, l = startStrs.length; i < l; i++) {
            if (str.indexOf(startStrs[i]) === 0) {
                return startStrs[i];
            }
        }
        return '';
    }
};
