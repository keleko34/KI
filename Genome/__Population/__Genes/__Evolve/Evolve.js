module.exports = (function(){
  function CreateEvolve()
  {
    var _goal = ''
      , _mateX = ''
      , _mateY = ''
      , _rate = 0.1
      , _onMemoryCheck = function(){}
      , _i = 0

    function Evolve()
    {
      var _goalSplit = _goal.split("")
        , _mateXSplit = _mateX.split("")
        , _mateYSplit = _mateY.split("")
        , _canMutate = -1
        , _parentGene = 0

      for(_i=0;_i<_goalSplit.length;_i+=1)
      {
        if(_i < _mateXSplit.length)
        {
          if(_i < _mateYSplit.length)
          {
            if(_mateXSplit[_i] !== _goalSplit[_i])
            {
              _parentGene = Math.random() <= 0.5 ? 1 : 0;
              _mateXSplit[_i] = (_parentGene ? _mateXSplit[_i] : _mateYSplit[_i]);
            }
            _parentGene = Math.random() <= 0.5 ? 1 : 0;
            _mateYSplit[_i] = (_parentGene ? _mateYSplit[_i] : _mateXSplit[_i]);
          }
          if(_mateXSplit[_i] === _goalSplit[_i])
          {
            _onMemoryCheck(_mateXSplit[_i],[_mateXSplit[_i].charCodeAt(0)]);
          }
          else
          {
            _canMutate = Math.random() <= _rate ? 1 : -1;
            if(_canMutate === 1)
            {
              _mateXSplit[_i] = String.fromCharCode(_mateXSplit[_i].charCodeAt(0) + _canMutate);
            }
          }
        }
      }
      _mateX = _mateXSplit.join("");
      _mateY = _mateYSplit.join("");
      if(_goal.indexOf(_mateX) === 0 && _goal.length > _mateX)
      {
        _mateX = _mateX+' ';
      }
      if(_goal.indexOf(_mateY) === 0 && _goal.length > _mateY)
      {
        _mateY = _mateY+' ';
      }
      return _mateY;
    }

    Evolve.goal = function(v)
    {
      if(v === undefined)
      {
        return _goal;
      }
      _goal = (typeof v === 'string' ? v : _goal);
      return Evolve;
    }

    Evolve.mateX = function(v)
    {
      if(v === undefined)
      {
        return _mateX;
      }
      _mateX = (typeof v === 'string' ? v : _mateX);
      return Evolve;
    }

    Evolve.mateY = function(v)
    {
      if(v === undefined)
      {
        return _mateY;
      }
      _mateY = (typeof v === 'string' ? v : _mateY);
      return Evolve;
    }

    Evolve.rate = function(v)
    {
      if(v === undefined)
      {
        return _rate;
      }
      _rate = (typeof v === 'number' && v <= 1 ? v : _rate);
      return Evolve;
    }

    Evolve.onMemoryCheck = function(v)
    {
      if(v === undefined)
      {
        return _onMemoryCheck;
      }
      _onMemoryCheck = (typeof v === 'function' ? v : _onMemoryCheck);
      return Evolve;
    }


    return Evolve;
  }
  return CreateEvolve;
}());
