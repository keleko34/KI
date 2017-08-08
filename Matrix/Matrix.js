require('seedrandom');

function descriptor(val)
{
  return {
    configurable:true,
    enumerable:false,
    value:val,
    writable:true
  }
}

function matrix(arr)
{
  var _data = (typeof arr === 'number' ? Array.apply(null, Array(arr)).map(function(){return matrix.vector(1);}) : []);
  
  Object.defineProperties(_data,{
    constructor:descriptor(matrix),
    vector:descriptor(matrix.vector)
  });
  
  /* convert all matrix vectors to FLOAT64Arrays */
  if(arr && arr.length)
  {
    for(var x=0,len=arr.length;x<len;x++)
    {
      _data[x] = _data.vector(arr[x]);
    }
  }
  
  Object.defineProperties(_data,{
    transpose:descriptor(matrix.transpose),
    shape:descriptor(matrix.shape),
    dot:descriptor(matrix.dot),
    map:descriptor(matrix.map),
    sigmoid:descriptor(matrix.sigmoid),
    nonlinear:descriptor(matrix.nonlinear),
    seed:descriptor(matrix.seed),
    random:descriptor(matrix.random),
    add:descriptor(matrix.add),
    subtract:descriptor(matrix.subtract),
    multiply:descriptor(matrix.multiply),
    divide:descriptor(matrix.divide),
    modulus:descriptor(matrix.modulus)
  });
  
  return _data;
}

/* include all sub libraries */
matrix.vector = require('./Vector/Vector');
matrix.transpose = require('./methods/transpose');
matrix.shape = require('./methods/shape');
matrix.dot = require('./methods/dot');
matrix.map = require('./methods/map');
matrix.sigmoid = require('./methods/sigmoid');
matrix.nonlinear = require('./methods/nonlinear');
matrix.seed = function(v){ Math.seedrandom(v);};
matrix.random = require('./methods/random');
matrix.add = require('./methods/add');
matrix.subtract = require('./methods/subtract');
matrix.multiply = require('./methods/multiply');
matrix.divide = require('./methods/divide');
matrix.modulus = require('./methods/modulus');

(global || window).matrix = matrix;
module.exports = matrix;