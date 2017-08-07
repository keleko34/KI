module.exports = function shape(mat)
{
  /* Shape is the x,y axis of an array
     Example:  
     - Matrix: [[1,2,3],[3,2,5],[2,4,7]]
     [3,3] 3 rows, 3 columns
      X----------->
      Y [ 1, 3, 2
      |   2, 2, 4
      V   3, 5, 7 ]        
  */
  var _mat = (mat || this);
  
  return {x:_mat.length,y:_mat[0].length};
}