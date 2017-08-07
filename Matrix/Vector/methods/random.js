module.exports = function random(n)
{
  var _n = (n || 1);
  
  var _arr = vector(_n);
  for(var x=0,len=_n;x<len;x++)
  {
    _arr[x] = Math.random();
  }
  return _arr;
}