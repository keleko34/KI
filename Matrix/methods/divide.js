module.exports = function divide(matA,matB)
{
  var _matA = (typeof matB !== 'undefined' ? matA : this),
      _matB = (matB || matA),
      
      _arr = matrix(_matA.length);
  
  for(var x=0,len=_matA.length;x<len;x++)
  {
    _arr[x] = _matA[x].divide(_matB[x]);
  }
  
  return _arr;
}