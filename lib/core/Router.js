const data = require('./data/');
const render = require('./render/');

class Router {
    constructor(options) {
        this.opts = options;
    }

    route(req, res, next) {
        const d = data(req);
        if (d == null) {
            next();
            return;
        }

        render(d, req, res, next);
    }
}

module.exports = Router;
