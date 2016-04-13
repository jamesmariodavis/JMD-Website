exports.parse = function (str, line, parser, types, options, swig) {
    parser.on('start', function () {
        // ...
    });
    parser.on(types.STRING, function (token) {
        // ...
    });
};

exports.compile = function (compiler, args, content, parents, options, blockName) {
    if (args[0] === 'foo') {
        return compiler(content, parents, options, blockName) + '\n';
    }
    return '_output += "fallback";\n';
};

exports.ends = false;

exports.blockLevel = true;