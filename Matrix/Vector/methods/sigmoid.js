module.exports = function sigmoid(vec,n)
{
  var _vec = (typeof vec === 'object' ? vec : this),
      _n = (typeof n === 'number' ? n : (typeof vec === 'number' ? vec : undefined));
  
  if(typeof _n === 'number') return (1/(1+Math.exp(-_n)));
  
  var _arr = vector(_vec.length);
  
  for(var x=0,len=_vec.length;x<len;x++)
  {
    _arr[x] = (1/(1+Math.exp(-_vec[x])));
  }
  
  return _arr;
}