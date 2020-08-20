const { homedir } = require('os');
const path = require('path');

module.exports = function(pathToFile, useCWD = false) {
    if(!pathToFile) throw new Error('Empty path');
    const _path = pathToFile.replace('~', homedir()).replace(/\\/g, '/');
    if(path.isAbsolute(_path)) return _path;
    return (useCWD ? path.resolve(process.cwd(), _path) : path.resolve(__dirname, '..', '..', _path)).replace(/\\/g, '/');
};