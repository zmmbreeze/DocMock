
const parseurl = require('parseurl');

const data = require('./data/');
const render = require('./render/');
const directive = require('./directive');

class Router {
    constructor(options) {
        this.opts = options;
    }

    route(req, res, next) {
        const context = {
            opt: this.opts,
            url: parseurl(req),
            req,
            res,
            directive
        };

        return data(context, (ctx, next) => {
            render(ctx, next);
        });
    }
}

module.exports = Router;
