
const compose = require('./compose');
const templates = [];

const data = (ctx, next) => {
    return compose(templates)(ctx, next);
};

data.addTemplate = (template) => {
    templates.push(template);
};

module.export = data;
