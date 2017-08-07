module.exports = function transpose(mat)
{
  /* Transpose converts columns to rows and vice versa
     Example:   
     - Matrix: [[5,4],[4,0],[7,10],[-1,8]]
       X----------->
       Y [ 5, 4
       |   4, 0
       |   7, 10
       V   -1, 8 ]
               
     - Converts into: [[5,4,7,-1],[4,0,10,8]]
       X----------->
       Y [ 5, 4, 7, -1
       V   4, 0, 10, 8 ]
  */
  var _mat = (mat || this),
      _shape = this.shape(_mat),
      _arr = matrix(_shape.y);
  
  for(var x=0,len=_shape.y;x<len;x++)
  {
    _arr[x] = vector(_shape.x).map(function(v,i){
      return (_mat[i][x]);
    });
  }
  return _arr;
}