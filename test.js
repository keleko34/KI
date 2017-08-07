var matrix = require('./Matrix/Matrix');
var y = matrix([[0,0,1],[0,1,1],[1,0,1],[1,1,1]]);
matrix.seed(0);
var t = matrix.random(3,4);
y.dot(t);