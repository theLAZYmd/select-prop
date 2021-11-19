"use strict";
/**
 * If the object contains an array where
 * the selector string could take multiple possible routes,
 * returns all those output possibilities.
 * Otherwise, returns just the singular matching object
 * */
function selectProp(obj, path) {
    var pathArr = path.split('.');
    var arr = [];
    var res = pathArr.reduce(function (prev, curr, i) {
        if (prev instanceof Array) {
            for (var _i = 0, prev_1 = prev; _i < prev_1.length; _i++) {
                var val = prev_1[_i];
                // let my res be an array of all possible routes that fit the route description
                var r = selectProp(val, pathArr.slice(i).join('.'));
                if (r) {
                    if (r instanceof Array)
                        arr = arr.concat(r);
                    else
                        arr.push(r);
                }
            }
        }
        if (prev === null || prev === undefined || prev[curr] === null || prev[curr] === undefined)
            return null;
        return prev[curr];
    }, obj);
    if (arr.length)
        return arr;
    else
        return res;
}
module.exports = selectProp;
//# sourceMappingURL=index.js.map