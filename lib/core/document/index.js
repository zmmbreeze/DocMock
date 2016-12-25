
const path = require('path');
const fs = require('fs');
const Promise = require('any-promise');

class Document {
    constructor(opt) {
        this.opt = opt;
    }

    getFileContent(filePath) {
        const promise = new Promise();
        fs.readFile(filePath, (err, data) => {
            if (err) {
                promise.reject(err);
                return;
            }

            promise.resolve(data);
        });
        return promise;
    }

    /**
     * parse into array of template.
     * @param {string} filePath path of file
     * @return {Promise} promise
     */
    parse(filePath) {
        return Promise.resolve();
    }
}


const documentClasses = {};
const documents = {};

Document.parse = (filePath, opt) => {
    const extname = path.extname(filePath);
    const document = documents[extname] || (() => {
        const Document = documentClasses[extname];
        if (!Document) {
            return;
        }

        documents[extname] = new Document(opt);
        return documents[extname];
    })();
    return document.parse(filePath);
};

Document.add = (extname, document) => {
    documents[extname] = document;
};

module.exports = Document;
