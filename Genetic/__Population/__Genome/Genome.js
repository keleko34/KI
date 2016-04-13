module.exports = function()
{
  var _genome = []
    , _fitnessScore = Infinity
    , _fitness = require('./../../../CharFitness/CharFitness')()

  function Genome()
  {
    if(_genome.length > 0)
    {
      _fitness.updateWeights(_genome);
    }
    _fitnessScore = _fitness()[0].CharTotal;
    _genome = _fitness.weights();
  }

  Genome.fitnessScore = function()
  {
      return _fitnessScore;
  }

  Genome.fitness = function()
  {
    return _fitness;
  }

  Genome.genome = function()
  {
    return _genome;
  }

  Genome.addCase = function(a,b)
  {
    _fitness.addCase(a.charCodeAt(0),b.charCodeAt(0));
    return Genome;
  }

  return Genome;
}
