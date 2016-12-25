const fs = require('fs');
const path = require('path');

const template = require('./template');

module.exports = (opt) => {
    return getFiles(opt.dirs).reduce((arr, file, index) => {
        const templates = template.parse(file, opt);
        return arr.concat(templates);
    }, []);
};
