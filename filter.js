var fs = require('fs');
var contents = fs.readFileSync('input.json');
var jsonContent = JSON.parse(contents);

function propertyFilter(content) {
    var propsToRemove = Array.prototype.slice.call(arguments, 1, arguments.length);

    return Object.keys(content).reduce(function(prev, current) {
        var value = content[current];

        if (!isObject(value) && propsToRemove.indexOf(current) === -1) {
            prev[current] = content[current];
        }

        if (isObject(value)) {
            prev[current] = propertyFilter(value, propsToRemove);
        }

        return prev;
    }, {});
}

function isObject(value) {
    return typeof value === 'object' && value !== null;
}

var result = propertyFilter(jsonContent, 'id', 'foo');

console.log('result: ');
console.log(result);


