module.exports = function dot(vectorA,vectorB)
{
  /* This multiplies and adds the values together of both vectors to find the dot product of two vectors
     Example: 
     - A: [2,3] B: [5,4] 
     - [10,12] 
     - 22
     
     it also allows for different lenthed vectors by doing a zero fill.
     This is important for doing matrice dot multiplications with different column lengths
     Example: 
     - A: [2,3,8] B: [5,4] 
     - A: [2,3,8] B: [5,4,0] 
     - [10,12,0] 
     - 22
  */
  
  var _vectorA = (vectorB ? vectorA : this),
      _vectorB = (vectorB || vectorA);
  
  var result = 0;
  for(var x=0,len=(_vectorA || _vectorB).length;x<len;x++)
  {
    result = result + ((_vectorA[x] || 0) * (_vectorB[x] || 0));
  }
  return result;
}