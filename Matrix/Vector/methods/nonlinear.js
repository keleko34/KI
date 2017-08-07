module.exports = function nonlinear(vec,n,derivative)
{
  var _vec = (typeof vec === 'object' ? vec : this),
      _n = (typeof n === 'number' ? n : (typeof vec === 'number' ? vec : undefined)),
      _derivative = (typeof vec === 'boolean' ? vec : (typeof n === 'bolean' ? n : (typeof derivative === 'boolean' ? derivative : false)));
  
  if(typeof _n === 'number') return (_n*(1-_n));
  
  if(_derivative)
  {
    var _arr = vector(_vec.length);
    
    for(var x=0,len=_vec.length;x<len;x++)
    {
      _arr[x] = (_vec[x]*(1-_vec[x]));
    }
    
    return _arr;
  }
  return this.sigmoid(_vec);
}