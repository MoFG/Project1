# async-pipe [![Build Status](https://travis-ci.org/bendrucker/async-pipe.svg?branch=master)](https://travis-ci.org/bendrucker/async-pipe)

> Create an async data pipeline


## Install

```
$ npm install --save async-pipe
```


## Usage

```js
var asyncPipe = require('async-pipe')
var addThree = asyncPipe(addOne, addTwo)

addThree(5, function (err, value) {
  //=> value === 8
})

function addOne (value, callback) {
  setTimeout(function () {
    callback(null, value + 1)
  }, 1000)
}

function addTwo (value, callback) {
  setTimeout(function () {
    callback(null, value + 2)
  }, 1000)
}
```

## API

#### `asyncPipe(fns)` -> `function`

##### fns

*Required*  
Type: `array[function]` / `function...`

An array of async functions that take `data, callback`. You can also pass in the functions as arguments instead of a single array.


## License

MIT © [Ben Drucker](http://bendrucker.me)
