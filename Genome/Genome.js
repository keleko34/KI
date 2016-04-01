var Population = require('./__Population/Population');

module.exports = (function(){
  function CreateGenome(){
    var _pop = 20
      , _Population = Population()
      , _isRunning = false
      , _generation = 0
      , _match = false
      , _mutation = 0.1
      , _time = null

    function Genome(str){
      if(_time !== null)
      {
        clearTimeout(_time);
        _time = null;
      }
      _isRunning = true;

      _Population.generation(_generation)
      .goal(str)
      .amount(_pop)
      .mutationRate(_mutation)
      .onFound(function(){_match = true;})
      .onUpdate(function(p){
        console.log('Generation: ',_generation);
        for(var i=0;i<p.length;i+=1)
        {
          console.log('Str: ',p[i].map(), 'Length: ',p[i].map().length);
        }
        console.log('');
        console.log('');
      })
      .call();

      _generation += 1;
      console.log('str',str);
      _time = setTimeout(function(){if(!_match){Genome.call({},str);}else{_isRunning = false;}},0);
    };

    Genome.pop = function(v)
    {
      if(v === undefined)
      {
        return _pop;
      }
      _pop = (typeof v === 'number' ? v : _pop);
      return Genome;
    }

    Genome.mutation = function(v)
    {
      if(v === undefined)
      {
        return _mutation;
      }
      _mutation = (typeof v === 'number' && v <= 1 ? v : _mutation);
      return Genome;
    }

    Genome.isRunning = function(v)
    {
      return _isRunning;
    }

    Genome.match = function(v)
    {
      return _match;
    }

    Genome.generation = function(v)
    {
      return _generation;
    }

    return Genome;
  }
  return CreateGenome;
}());
