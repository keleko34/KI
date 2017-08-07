module.exports = function sigmoid(mat,n)
{
  var _mat = (typeof mat === 'object' ? mat : this),
      _n = (typeof n === 'number' ? n : (typeof mat === 'number' ? mat : undefined));
  
  if(typeof _n === 'number') return (1/(1+Math.exp(-_n)));
  
  var _arr = matrix();
  
  for(var x=0,len=_mat.length;x<len;x++)
  {
    _arr[x] = this.vector.sigmoid(_mat[x]);
  }
  
  return _arr;
}