module.exports = function magnitude()
{
  var _args = (argument.length ? arguments : this),
      _magnitude = 0;
  
  for(var x=0,len=_args.length;x<len;x++)
  {
    _magnitude = (_magnitude + (_args[x] * _args[x]));
  }
  
  _magnitude = Math.sqrt(_magnitude);
  
  return _magnitude;
}