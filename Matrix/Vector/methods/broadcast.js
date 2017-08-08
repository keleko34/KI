module.exports = function broadcast(vecA,vecB,func)
{
  var _vecA = (typeof vecB === 'object' ? vecA : this),
      _vecB = (typeof vecB === 'object' ? vecB : vecA),
      _func = (typeof func === 'function' ? func : (typeof vecB === 'function' ? vecB : console.error('no function passed to broadcast'))),
      
      _arr = vector(_vecA.length);
  
  for(var x=0,len=_vecA.length;x<len;x++)
  {
    _arr[x] = _func(_vecA[x],_vecB[x]);
  }
  
  return _arr;
}