module.exports = (function(){
  function CreateEvolve()
  {
    var _goal = ''
      , _mateX = ''
      , _mateY = ''
      , _rate = 0.1
      , _memory = {}
      , _onMemoryCheck = function(){}
      , _onFoundChar = function(){}
      , _i = 0
      , _popID

    function Evolve()
    {
      var _goalSplit = _goal.split("")
        , _mateXSplit = _mateX.split("")
        , _mateYSplit = _mateY.split("")
        , _canMutate = -1
        , _parentGene = 0
        , _esRun = {}

      _layer:for(_i=0;_i<_goalSplit.length;_i+=1)
      {
        if(_i < _mateXSplit.length)
        {
          if(_i < _mateYSplit.length)
          {
            if(_mateXSplit[_i] !== _goalSplit[_i])
            {
              _canMutate = Math.random() <= _rate ? 1 : -1;
              _parentGene = Math.random() <= 0.5 ? 1 : 0;
              _mateXSplit[_i] = (_parentGene ? (_canMutate > 0 ? Evolve.mutate(_mateXSplit[_i]) : _mateXSplit[_i]) : (_canMutate > 0 ? Evolve.mutate(_mateYSplit[_i]) : _mateYSplit[_i]));
            }
            if(_mateYSplit[_i] !== _goalSplit[_i])
            {
              _canMutate = Math.random() <= _rate ? 1 : -1;
              _parentGene = Math.random() <= 0.5 ? 1 : 0;
              _mateYSplit[_i] = (_parentGene ? (_canMutate > 0 ? Evolve.mutate(_mateYSplit[_i]) : _mateYSplit[_i]) : (_canMutate > 0 ? Evolve.mutate(_mateXSplit[_i]) : _mateXSplit[_i]));
            }
            else
            {
              _onFoundChar();
            }
          }
          if(_mateXSplit[_i] === _goalSplit[_i])
          {
            _onFoundChar();
            _onMemoryCheck(_mateXSplit[_i],[_mateXSplit[_i].charCodeAt(0)]);
          }
        }
        else
        {
          break _layer;
        }
      }

      _mateX = _mateXSplit.join("");
      _mateY = _mateYSplit.join("");
      /*
      if(_goal.indexOf(_mateX) === 0 && _goal.length > _mateX.length)
      {
        _mateX = _mateX+(String.fromCharCode(Math.floor(Math.random() * 255)+1));
      }
      if(_goal.indexOf(_mateY) === 0 && _goal.length > _mateY.length)
      {
        _mateY = _mateY+(String.fromCharCode(Math.floor(Math.random() * 255)+1));
      }
      */

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

    Evolve.popID = function(v)
    {
      if(v === undefined)
      {
        return _popID;
      }
      _popID = (typeof v === 'number' ? v : _popID);
      return Evolve;
    }

    Evolve.memory = function(v)
    {
      if(v === undefined)
      {
        return _memory;
      }
      _memory = (typeof v.pipe === 'function' ? v : _memory);
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

    Evolve.onFoundChar = function(v)
    {
      if(v === undefined)
      {
        return _onFoundChar;
      }
      _onFoundChar = (typeof v === 'function' ? v : _onFoundChar);
      return Evolve;
    }


    Evolve.mutate = function(str)
    {
      return String.fromCharCode(str.charCodeAt(0) + (Math.random() <= _rate ? 1 : -1));
    };


    return Evolve;
  }
  return CreateEvolve;
}());
