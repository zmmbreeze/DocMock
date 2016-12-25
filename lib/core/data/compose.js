
const Promise = require('any-promise');


/**
 * Compose `templates` returning
 * a fully valid templates comprised
 * of all those which are passed.
 *
 * @param {Array} templates
 * @return {Function}
 * @api public
 */

const compose = (templates) => {
    if (!Array.isArray(templates)) {
        throw new TypeError('Templates stack must be an array!');
    }
    for (const fn of templates) {
        if (typeof fn !== 'function') {
            throw new TypeError('Templates must be composed of functions!');
        }
    }

    /**
     * @param {Object} context
     * @return {Promise}
     * @api public
     */

    return function (context, next) {
        // last called templates
        let index = -1;
        function dispatch(i) {
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'));
            }

            index = i;
            let fn = templates[i];
            if (i === templates.length) {
                fn = next;
            }

            if (!fn) {
                return Promise.resolve();
            }

            try {
                return Promise.resolve(fn(context, function next() {
                    return dispatch(i + 1);
                }));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        return dispatch(0);
    };
};

module.exports = compose;
