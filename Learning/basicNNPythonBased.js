require('seedrandom');
var nj = require('numjs');

var testData1 = [[0,0,1],[0,1,1],[1,0,1],[1,1,1]],
    testData2 = [[-0.16595599, 0.44064899, -0.99977125, -0.39533485],[-0.70648822, -0.81532281, -0.62747958, -0.30887855],[-0.20646505, 0.07763357, -0.16161097, 0.370439]];


function shape(matrix)
{
  /* Shape is the x,y axis of an array
     Example: [[1,2,3],[3,2,5],[2,4,7]] is also [3,3] 3 rows, 3 columns
             X----------->
             Y [ 1, 3, 2
             |   2, 2, 4
             V   3, 5, 7 ]        
  */
  return [matrix.length,matrix[0].length];
}

function transpose(matrix)
{
  /* Transpose converts columns to rows and vice versa
     Example:   [[5,4],[4,0],[7,10],[-1,8]] --> [[5,4,7,-1],[4,0,10,8]]
             X----------->
             Y [ 5, 4
             |   4, 0
             |   7, 10
             V   -1, 8 ]
     gets converted into
             X----------->
             Y [ 5, 4, 7, -1
             V   4, 0, 10, 8 ]
  */
  
  var _shape = shape(matrix);
  return Array.apply(null,new Array(_shape[1])).map(function(v,x){
    return new Float64Array(_shape[0]).map(function(v,i){return matrix[i][x];});
  });
}

function multiplyVectors(vectorA,vectorB)
{
  var result = 0;
  for(var x=0,len=(vectorA || vectorB).length;x<len;x++)
  {
    result = result + ((vectorA[x] || 0) * (vectorB[x] || 0));
  }
  return result;
}

function addVectors(vectorA,VectorB)

/* can't figure this out..... */
function dot(matrixA,matrixB)
{
  matrixB = transpose(matrixB);
  
  var _shapeA = shape(matrixA),
      _shapeB = shape(matrixB),
      _arr = [];
  if(_shapeA[0] === _shapeB[0] && _shapeA[1] === _shapeB[1])
  {
    for(var x0=0,lenX0=_shapeA[0];x0<lenX0;x0++)
    {
      _arr[x0] = new Float64Array(_shapeA[0]);
      for(var x1=0,lenX1=_shapeA[0];x1<lenX1;x1++)
      {
        _arr[x0][x1] = multiply(matrixA[x0],matrixB[x1]);
      }
    }
    return _arr;
  }
  else
  {
    return console.error('Can not multiply the products of diferent sized matrices');
  }
}



function createNNMatrix(x,y,func)
{
  return Array.call(null, {length: x})
  .map(Function.call,function(v){
    return new Float64Array(y).map(Function.call,(func || Math.random));
  });
}

createNNMatrix.fromArray = function(arr)
{
  return Array.apply(null, new Array(arr.length))
  .map(function(v,x){
    return new Float64Array(arr[x].length).map(function(v,i){return arr[x][i];});
  });
}

var syn0 = createNNMatrix.fromArray([[-0.16595599, 0.44064899, -0.99977125, -0.39533485],[-0.7064822, -0.81532281, -0.62747958, -0.30887855],[-0.20646505, 0.07763347, -0.16161097, 0.370439]]);

var syn1 = createNNMatrix.fromArray([[-0.5910955],[0.75623487],[-0.94522481],[0.34093502]]);

















function randomMatrix(lenX,lenW)
{
  var _arr = [];
  for(var x=0,len=lenX;x<len;x++)
  {
    _arr[x] = [];
    for(var i=0,lenn=lenW,_arrI=_arr[x];i<lenn;i++)
    {
      _arrI[i] = Math.random();
    }
  }
  return _arr;
}

function matrixMath(func,matrix)
{
  for(var x=0,len=matrix.length;x<len;x++)
  {
    for(var i=0,matrixI=matrix[x],lenn=matrixI.length;i<lenn;i++)
    {
      matrixI[i] = func(matrixI[i]);
    }
  }
  return matrix;
}

function crossMatrixMath(func,matrix_a,matrix_b)
{
  var _arr = [];
  for(var x=0,len=Math.min(a.length,b.length);x<len;x++)
  {
    _arr[x] = [];
    for(var i=0,_arr=_arr[x],locA=a[x],locB=b[x],lenn=Math.min(locA.length,locB.length);i<lenn;i++)
    {
      _arr[i] = func(locA[i],locB[i]);
    }
  }
  return _arr;
}

function transpose(arr)
{
  var _arr = [];
  for(var x=0,len=arr.length;x<len;x++)
  {
    for(var i=0,arr=arr[x],lenn=arr.length;i<lenn;i++)
    {
      if(!_arr[i]) _arr[i] = [];
      _arr[i].push(arr[i]);
    }
  }
  return _arr;
}

function dotProduct(a,b)
{
  var n = 0, 
      lim = Math.min(a.length,b.length);
  
	for (var x=0,len=Math.min(a.length,b.length);x<len;x++)
    {
      for(var i=0,locA=a[x],locB=b[x],lenn=Math.min(locA.length,locB.length);i<lenn;i++)
      {
        n += locA[i] * locB[i];
      }
    }
	return n;
}

function mean(arr)
{
  arr.sort(function(a,b){return (a-b);});
  
  return ((arr[(arr.length - 1) >> 1] + arr[arr.length >> 1]) / 2);
}

function flatten(arr)
{
  return [].concat.apply([], arr);
}

/*standard linear activator and sigmoid in one. */
function nonLinear(x,deriv=false)
{
  if(deriv)
  {
    return (x*(1-x));
  }
  return (1/1+Math.exp(-x));
}

function njNonLinear(n,deriv=false)
{
  if(deriv)
  {
    return ();
  }
}

/* seed the random number generator so it is always the same */
Math.seedrandom(0);

/* The data that will be inputed into our neural network */
var input_data = [
  [0,0,1],
  [0,1,1],
  [1,0,1],
  [1,1,1]
],

/* The expected output data for our neural network */
expected_result = [
  [0],
  [1],
  [1],
  [0]
],
    
/* our hidden nodes, 2 inputs + 1 bias * 4 nodes in hidden layer */
syn_0 = matrixMath(function(v){return ((2 * v) - 1)},randomMatrix(3,4)),
    
/* 4 nodes * 1 output no bias in hidden layer */
syn_1 = matrixMath(function(v){return ((2 * v) - 1)},randomMatrix(4,1));

for(var x=0,len=60000;x<len;x++)
{
  var l_0 = input_data,
      l_1 = nonLinear(dotProduct(l_0,syn_0)),
      l_2 = nonLinear(dotProduct(l_1,syn_1)),
      
      /* get the error rate for backpropogation */
      l2_error = crossMatrixMath(function(a,b){return (a - b);},expected_result,l_2);
  
  if(x % 10000 === 0) console.log("Error:",mean(flatten(l2_error)));
  
  var l2_delta = matrixMath(function(v){return v * nonLinear(l_2,true)},l2_error),
      
      l1_error = dotProduct(l2_delta,transpose(syn_1))
  
}


