module.exports = function broadcast(matA,matB,func)
{
  var _matA = (typeof matB === 'object' ? matA : this),
      _matB = (typeof matB === 'object' ? matB : matA),
      _func = (typeof func === 'function' ? func : (typeof matB === 'function' ? matB : console.error('no function passed to broadcast'))),
      
      _arr = matrix(_matA.length);
  
  for(var x=0,len=_matA.length;x<len;x++)
  {
    _arr[x] = _matA[x].broadcast(_matB[x],_func);
  }
  
  return _arr;
}