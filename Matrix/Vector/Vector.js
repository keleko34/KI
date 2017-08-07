function descriptor(val)
{
  return {
    configurable:true,
    enumerable:false,
    value:val,
    writable:true
  }
}

function vector(arr)
{
  var _data;
  if(arr && typeof arr === 'object')
  {
    _data = new Float64Array(arr.length).map(function(v,i){return arr[i];});
  }
  else if(typeof arr === 'number')
  {
    _data = new Float64Array(arr).map(function(){return 0;});
  }
  else
  {
    _data = new Float64Array(0);
  }
  
  Object.defineProperties(_data,{
    constructor:descriptor(vector),
    dot:descriptor(vector.dot),
    sigmoid:descriptor(vector.sigmoid),
    nonlinear:descriptor(vector.nonlinear),
    random:descriptor(vector.random),
    magnitude:descriptor(vector.magnitude),
    map:descriptor(vector.map)
  });
  
  return _data;
}

vector.dot = require('./methods/dot');
vector.sigmoid = require('./methods/sigmoid');
vector.nonlinear = require('./methods/nonlinear');
vector.random = require('./methods/random');
vector.magnitude = require('./methods/magnitude');
vector.map = require('./methods/map');

(global || window).vector = vector;

module.exports = vector;