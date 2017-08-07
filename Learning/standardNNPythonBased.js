var mathjs = require('mathjs');

Math.seed = 0;
 
// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
 
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;
 
    return min + rnd * (max - min);
}

/* variables */
var n_hidden = 10,
    n_in = 10,
    
    /* outputs */
    n_out = 10,
    
    /* sample data */
    n_sample = 300,
    
    /* hyper params */
    learning_rate = 0.01,
    momentum = 0.9;

function sigmoid(x)
{
  return 1/(1 + Math.exp(-x));
}

function tanh_prime(x)
{
  return 1 - Math.pow(Math.tanh(x),2);
}

function train(x,t,V,W,bv,bw)
{
  /* Forward */
  var A = (mathjs.dot(x,V) + bv),
      Z = Math.tanh(A),
      
      B = (mathjs.dot(Z,W) + bw),
      Y = sigmoid(B),
      
      Ew
}