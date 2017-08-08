module.exports = function subtract(vecA,vecB)
{
  var _vecA = (typeof vecB !== 'undefined' ? vecA : this),
      _vecB = (vecB || vecA),
      
      _arr = vector(_vecA.length);
  
  for(var x=0,len=_vecA.length;x<len;x++)
  {
    _arr[x] = (_vecA[x] - _vecB[x]);
  }
  
  return _arr;
}