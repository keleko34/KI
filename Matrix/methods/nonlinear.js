module.exports = function nonlinear(mat,n,derivative)
{
  var _mat = (typeof mat === 'object' ? mat : this),
      _n = (typeof n === 'number' ? n : (typeof mat === 'number' ? mat : undefined)),
      _derivative = (typeof mat === 'boolean' ? mat : (typeof n === 'bolean' ? n : (typeof derivative === 'boolean' ? derivative : false)));
  
  if(typeof _n === 'number') return (_n*(1-_n));
  
  if(_derivative)
  {
    var _arr = matrix();
    
    for(var x=0,len=_mat.length;x<len;x++)
    {
      _arr[x] = _mat[x].nonlinear(true);
    }
    
    return _arr;
  }
  
  return this.sigmoid(_mat);
}