const defaultOptions = require('../util/default-options');

module.exports = function (options = defaultOptions) {
    if(options === defaultOptions) return options;

    for (const key in defaultOptions) {
        if(!options.hasOwnProperty(key)) {
            options[key] = defaultOptions[key];
        } else if (typeof options[key] !== typeof defaultOptions[key] && isValid(defaultOptions[key])) {
            throw new Error('Incompatible types in key ' + key + ' of options');
        }
    }

    return options;

    function isValid(value) {
        return value !== undefined && value !== null;
    }
}