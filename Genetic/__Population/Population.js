module.exports = function()
{
  var _genome = require('./__Genome/Genome')
    , _popCount = 0
    , _mutationRate = 0.01
    , _population = []
    , _fitnessTotal = Infinity
    , _fitnessMean = Infinity

  function Population()
  {
    var x=0;
    if(_population.length !== _popCount)
    {
      _population = [];
      for(x;x<_popCount;x+=1)
      {
        _population.push(_genome().addCase('A','H'));
        _population[x]();
      }
    }
    _fitnessTotal = 0;
    _fitnessMean = 0;
    for(x=0;x<_population.length;x+=1)
    {
      _fitnessTotal += _population[x].fitnessScore();
    }
    _fitnessMean = (_fitnessTotal/_population.length);
    console.log('Total:',_fitnessTotal,'Mean:',_fitnessMean,'Best:',_population[0].fitness().call()[0].CharTotal);
    if(_fitnessTotal > 0)
    {
      Population.sort().breed().update();
      return false;
    }
    else
    {
      console.log('found optimum weights or check new chars');
      return true;
    }
  }

  Population.popCount = function(v)
  {
    if(v === undefined)
    {
      return _popCount;
    }
    _popCount = (typeof v === 'number' ? v : _popCount);
    return Population;
  }

  Population.mutationRate = function(v)
  {
    if(v === undefined)
    {
      return _mutationRate;
    }
    _mutationRate = (typeof v === 'number' ? v : _mutationRate);
    return Population;
  }

  Population.pop = function()
  {
    return _population;
  }

  Population.sort = function()
  {
    _population.sort(function(a,b){
      if(a.fitnessScore() > b.fitnessScore()) return 0;
      return 1;
    });
    return Population;
  }

  Population.breed = function()
  {
    var x = 0
      , i = 0
      , mutate = false;
    for(x;x<(_population.length-1);x+=1)
    {
      for(i;i<_population[x].genome().length;i+=1)
      {
          mutate = (Math.random() <= _mutationRate ? true : false); //get mutation chance for first parent
          _population[x].genome()[i] = mutate ? (_population[x].genome()[i] + (Population.crossChance() ? 1 : -1)) : (Population.crossChance() ? _population[(x+1)].genome()[i] : _population[x].genome()[i]);
          mutate = (Math.random() <= _mutationRate ? true : false);//get mutation chance for second parent
          _population[(x+1)].genome()[i] = mutate ? (_population[(x+1)].genome()[i] + (Population.crossChance() ? 1 : -1)) : (Population.crossChance() ? _population[x].genome()[i] : _population[(x+1)].genome()[i]);
      }
    }
    return Population;
  }

  Population.crossChance = function()
  {
    return Math.round((Math.random()*(1-(0))+(0)));
  }

  Population.update = function()
  {
    var x= 0;
    for(x;x<_population.length;x+=1)
    {
      _population[x]();
    }
    return Population;
  }

  return Population;
}
