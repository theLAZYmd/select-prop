# select-prop

Use this library to get a properted from a nested object using an intuitive 'selector'
Main differences from existing libraries (such as [this](https://www.npmjs.com/package/get-prop) or [this](https://www.npmjs.com/package/get-property))

- Actually works
- In an intuitive manner that you'd expect it to
- Less overhead (42 lines of code!)
- More efficient (no nasty recompiling of regexes each time the function is called)
- **Handles arrays in a way you expect**

So this last one's the most important one. What it means is that it behaves in the way that's most useful when it comes to arrays. Basically, instead of just picking one route, such as obj.property.0.value, it takes *every* route. So if you use `selectProp(obj, 'property.value')` on a data structure of `obj = {property: [{value: 'foo'}, '{value: 'bar'}]}`, it'll return you *all possible values* in an array, i.e. `['foo', 'bar']`

This is really useful for gathering data.

In essense then, this library basically works like running `eval()` on an object to grab a nested property, except without running actually running `eval()` because eval is slow and bad, and also it returns you lots of data. 

## Installation

`npm i select-prop` on the command line.
Then:
`const selectProp = require('select-prop')` in your file.

## Usage

`selectProp(YourObjectHere, YourSelectionStringHere)`
If you want, you can also use an Array of strings as the selection string, just pretend like it's the string but split by '.'

## Examples

```js
const selectProp = require('select-prop');
const myObject = {
	value1: 'foo',
	value2: {
		nested: 'bar'
	},
	value3: {
		nested: [
			'look',
			'its',
			'an',
			'array'
		]
	},
	meme: {
		helloworld: {
			prop1:	{
				prop2: [
                    {
						thisIsAnArray: 'hasMultipleValues',
						willItWork: 'Success'
                    },
                    {
						element2: 'manyValuesYes',
						willItWork: 'SuccessAgain'
                    }
				],
				prop3: 'thisIsAString'
            }
        }
    }
};

selectProp(myObject, 'value1')									// 'foo'
selectProp(myObject, 'value2.nested')							// 'bar'
selectProp(myObject, 'value3.nested');							// ['look', 'its', 'an', 'array']
selectProp(myObject, 'meme.helloworld.prop1.prop3');			// 'thisIsAString'
selectProp(myObject, 'meme.helloworld.prop1.prop2.willItWork');	// ['Success', 'SuccessAgain']
```
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
