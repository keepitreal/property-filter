var fs = require('fs');
var contents = fs.readFileSync('input.json');
var jsonContent = JSON.parse(contents);

function propertyFilter(content, propsToRemove) {
    return Object.keys(content).reduce(function(prev, current) {
        var value = content[current];

        if (propsToRemove.indexOf(current) === -1) {
            prev[current] = content[current];
        }

        if (Array.isArray(value)) {
            prev[current] = value.map(function(ob) {
                return propertyFilter(ob, propsToRemove);
            });
        }

        if (isObject(value) && !Array.isArray(value)) {
            prev[current] = propertyFilter(value, propsToRemove);
        }

        return prev;
    }, {});
}

function isObject(value) {
    return typeof value === 'object' && value !== null;
}

function filter(obj) {
    var propsToRemove = Array.prototype.slice.call(arguments, 1, arguments.length);
    return propertyFilter(obj, propsToRemove);
}

var result = filter(jsonContent, 'id', 'foo');

console.log('result: ');
console.log(result);


