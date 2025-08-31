/* what is polyfill?
A polyfill is a piece of code (usually JavaScript on the web) used to provide modern functionality on older browsers that do not natively support it.

For example, if a web application uses the `Array.prototype.includes` method, which is not supported in older browsers like Internet Explorer, a polyfill can be added to define this method for those browsers. */

if(!Array.prototype.myForEach) {
    Array.prototype.myForEach = function(userFn) {
        for(let i = 0; i < this.length; i++) {
            userFn(this[i], i);
        }
    }
}

if(!Array.prototype.myMap) {
    Array.prototype.myMap = function(userFn) {
        const result = []
        for(let i = 0; i < this.length; i++) {
            const value = userFn(this[i], i)
            result.push(value)
        }
        return result;
    }
}

if(!Array.prototype.myFilter) {
    Array.prototype.myFilter = function(userFn) {
        const result = []
        for(let i = 0; i < this.length; i++) {
            if(userFn(this[i])) {
                result.push(this[i])
            }
        }
        return result
    }
}

const arr = [1, 2, 3, 4, 5, 6];

const ret = arr.myForEach(function(value, index) {
    console.log (`Value at index ${index} is ${value}`);
})
console.log(`Ret value is ${ret}`); // undefined
// What for each does?
// It takes a callback function as an argument and executes that function once for each element in the array, passing the current element, its index, and the entire array as arguments to the callback function. It does not return anything (undefined).

const n = arr.myMap(function(value, index){
    if(index % 2 === 0) {
        return value * 2;
    } else return value;
});
console.log(n); // [2, 2, 6, 4]
// What map does?
// It takes a callback function as an argument and creates a new array by applying that function to each element in the original array. The new array contains the results of calling the provided function on every element in the calling array. It returns the new array.

const afterFilter = arr.myFilter(function(value){
    return value % 2 === 0;
});
console.log(afterFilter); // [2, 4, 6]
// What filter does?
// It takes a callback function as an argument and creates a new array with all elements that pass the test implemented by the provided function. The new array contains only the elements for which the callback function returns true. It returns the new array.