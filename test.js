/* test 1 
require('seedrandom');
var nj = require('numjs');

Math.seedrandom(0);

var X = nj.array([[0,0,1],
                  [0,1,1],
                  [1,0,1],
                  [1,1,1]]),
    
    Y = nj.array([[0],
                  [1],
                  [1],
                  [0]]),
    
    syn0 = nj.ones([3,4], 'float64').add(1).multiply(nj.random(3,4)).subtract(1),  
    syn1 = nj.ones([4,1], 'float64').add(1).multiply(nj.random(4,1)).subtract(1),
    
    i = 60000;

function nonlin(x,deriv)
{
  if(deriv)
  {
    return x.multiply(nj.ones(x.shape.reverse(),'float64').subtract(x));
  }
  return nj.ones(x.shape.reverse(),'float64').divide(nj.ones(x.shape.reverse(),'float64').add(nj.exp(x.negative())));
}

while(i--)
{
  var l0 = X,
      l1 = nonlin(l0.dot(syn0)),
      l2 = nonlin(nj.dot(l1,syn1)), // breaks here, as numjs is not properly calculating the dot 

      l2_error = Y.subtract(l2);
      
      if(!(i % 10000)) console.log('Error: ',i,l2_error);
      
  var l2_delta = l2_error.multiply(nonlin(l2,true)), 
      l1_error = l2_delta.dot(syn1.T),
      l1_delta = l1_error.multiply(nonlin(l1,true));

      syn1 = syn1.add(l1.T.dot(l2_delta));
      syn0 = syn0.add(l0.T.dot(l1_delta));
}
console.log("Output after training");
console.log(l2);
*/

/* test 2 */

var matrix = require('./Matrix/Matrix');

matrix.seed(0);

var X = matrix([[0,0,1],
                [0,1,1],
                [1,0,1],
                [1,1,1]]),
    
    Y = matrix([[0],
                [1],
                [1],
                [0]]),

    syn0 = matrix.random(3,4).map(function(v){return (2 * v - 1);}),  
    syn1 = matrix.random(4,1).map(function(v){return (2 * v - 1);}),
    
    i = 60000;

while(i--)
{
  var l0 = X,
      l1 = matrix.dot(l0,syn0).sigmoid(),
      l2 = matrix.dot(l1,syn1).sigmoid(),

      l2_error = Y.subtract(l2);
      
      if(!(i % 10000)) console.log('Error: ',i,l2_error);
      
  var l2_delta = l2_error.multiply(l2.nonlinear(true)), 
      l1_error = l2_delta.dot(syn1.transpose()),
      l1_delta = l1_error.multiply(l1.nonlinear(true));

      syn1 = syn1.add(l1.transpose().dot(l2_delta));
      syn0 = syn0.add(l0.transpose().dot(l1_delta));
}

console.log("Output after training");
console.log(l2);