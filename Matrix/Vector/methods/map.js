module.exports = function map(vec,func)
{
  var _vec = (func ? vec : this),
      _func = (func || vec);
  
  for(var x=0,len=_vec.length;x<len;x++)
  {
    _vec[x] = _func(_vec[x],x,_vec);
  }
  return _vec;
}