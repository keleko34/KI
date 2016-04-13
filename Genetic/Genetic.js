module.exports = function()
{
  var _popCount = 0
    , _population = require('./__Population/Population')()
    , _currentPopulation = []
    , _generation = 0
    , _mutation = 0.01
    , _goal = ''
    , _timer = null


  function Genetic()
  {
    if(!_population.mutationRate(_mutation).popCount(_popCount).call())
    {
      if(_timer)
      {
        clearTimeout(_timer);
      }
      setTimeout(function(){Genetic();},0);
    }
  }

  Genetic.popCount = function(v)
  {
    if(v === undefined)
    {
      return _popCount;
    }
    _popCount = (typeof v === 'number' ? v : _popCount);
    return Genetic;
  }

  Genetic.mutation = function(v)
  {
    if(v === undefined)
    {
      return _mutation;
    }
    _mutation = (typeof v === 'number' ? v : _mutation);
    return Genetic;
  }

  Genetic.goal = function(v)
  {
    if(v === undefined)
    {
      return _goal;
    }
    _goal = (typeof v === 'string' && v.length === 1 ? v : _goal);
    return Genetic;
  }

  Genetic.generation = function(v)
  {
    return _generation;
  }
  return Genetic;
}
