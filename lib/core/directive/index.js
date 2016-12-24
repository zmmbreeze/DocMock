
module.exports = {
    directives: {},

    addDirective(name, callback) {
        this.directives[name] = callback;
    },

    call(name) {
        const func = this.directives[name];
        if (typeof func === 'function') {
            func.call(this, ...Array.from(arguments).slice(1));
        }
    },

    apply(name) {
        const func = this.directives[name];
        if (typeof func === 'function') {
            func.apply(this, Array.from(arguments).slice(1));
        }
    }
};
