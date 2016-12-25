
const Promise = require('any-promise');
const Document = require('./index');

class JSDocument extends Document {
    /**
     * parse into array of template.
     * @param {string} filePath path of file
     * @return {Promise} promise
     */
    parse(filePath) {
        const js = require(filePath);
        return Promise.resolve(js);
    }
}

Document.add('js', JSDocument);
module.exports = JSDocument;
