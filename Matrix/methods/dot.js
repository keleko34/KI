module.exports = function dot(matA,matB)
{
  /* The dot product is the product of two matrices,
     Math: AB = A(row)*Bt(column)
     Bt = transpose of B
     
     Example: 
     - A: [[3,4],[2,3]] B: [[4,5],[3,2]]
          X-------->       X-------->
          Y [ 3, 2         Y [ 4, 3
          V   4, 3 ]       V   5, 2 ]
          
     - Transpose B: [[4,3],[5,2]]
                    X-------->
                    Y [ 4, 5
                    V   3, 2 ]
    
     - Vector dot operations on each row with column
       [3,4] [4,3] === [12,12] === 24
       [3,4] [5,2] === [15,8] === 23
       [2,3] [4,3] === [8,9] === 17
       [2,3] [5,2] === [10,6] === 16
       
     - Giving us a dot product of:
       A: [[24,23],[17,16]]
          X-------->
          Y [ 24, 17 
          V   23, 16 ]
  */
  
  var _matA = (matB ? matA : this),
      _matB = this.transpose((matB || matA)),
      _shapeA = this.shape(_matA),
      _shapeB = this.shape(_matB),
      _arr = matrix(_shapeA.x);
  if(_shapeA.x === _shapeB.x && _shapeA.y === _shapeB.y)
  {
    for(var x0=0,lenX0=_shapeA.x;x0<lenX0;x0++)
    {
      _arr[x0] = this.vector(_shapeA.x);
      for(var x1=0,lenX1=_shapeA.x;x1<lenX1;x1++)
      {
        _arr[x0][x1] = this.vector.dot(_matA[x0],_matB[x1]);
      }
    }
    return _arr;
  }
  else
  {
    return console.error('Can not dot product different sized matrices');
  }
}