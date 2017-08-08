/* not pure, mutatable */

module.exports = function map(mat,func)
{
  /* This method allows for map altering the sub vectors in a customized way */
  
  var _mat = (func ? mat : this),
      _func = (func || mat);
  
  for(var x=0,len=_mat.length;x<len;x++)
  {
    _mat[x].map(_func);
  }
  return _mat;
}