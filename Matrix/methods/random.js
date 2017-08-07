module.exports = function random(n,nn)
{
  var _n = (typeof nn !== 'undefined' ? n : 1),
      _nn = (typeof nn !== 'undefined' ? nn : (n || 1));
  
  var _arr = matrix();
  for(var x=0,len=_n;x<len;x++)
  {
    _arr[x] = this.vector.random(_nn);
  }
  return _arr;
}
