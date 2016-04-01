var Population = require('./__Population/Population')
  , fs = require('fs')
  , JSONStream = require('JSONStream')

module.exports = (function(){
  function CreateGenome(){
    var _pop = 20
      , _Population = Population()
      , _isRunning = false
      , _generation = 0
      , _match = false
      , _mutation = 0.5
      , _time = null
      , _onEnd = function(){}
      , _memoryRead = fs.createReadStream(process.cwd().replace(/\\/g,'/')+'/Genome/__Memory/Memory.json',{autoClose:false})
      , _memoryWrite = fs.createWriteStream(process.cwd().replace(/\\/g,'/')+'/Genome/__Memory/Memory.json',{autoClose:false})
      , _testCount = 0
      , _timer = new Date().getTime();

    _memoryRead.pipe(JSONStream.parse('*'))

    _memoryRead.extendedOnData = [];
    _memoryRead.extendedOnEnd = [];

    _memoryRead.on('data',function(d){
      if(_memoryRead.extendedOnData)
      {
        _memoryRead.extendedOnData.forEach(function(k,i){
          k(d);
        });
      }
    });
    _memoryRead.on('end',function(){
      if(_memoryRead.extendedOnEnd)
      {
        _memoryRead.extendedOnEnd.forEach(function(k,i){
          k();
        });
      }
    });

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
      .memoryRead(_memoryRead)
      .memoryWrite(_memoryWrite)
      .onUpdate(Genome.log)
      .call();

      _generation += 1;

      _testCount++;
      _time = setTimeout(function(){
        if(!_match)
        {
          Genome.call({},str);
        }
        else
        {
          _isRunning = false;
          Genome.log(_Population.members(),'Found Match!!!!!');
        }
      },0);
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

    Genome.onEnd = function(v)
    {
      if(v === undefined)
      {
        return _onEnd;
      }
      _onEnd = (typeof v === 'function' ? v : _onEnd);
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

    Genome.log = function(p,m){
      if(_testCount >= 250 || m)
      {
        setTimeout(function(){
          if(m)
          {
            var endTime = new Date().getTime();
            _timer = endTime - _timer;
            var sec = Math.floor(_timer/1000);
            var mod = (_timer % 1000);
            console.log(m,' in ',sec.toString()+'.'+mod.toString(),' seconds');
          }
          console.log('Generation: ',_generation);
          for(var i=0;i<2;i+=1)
          {
            console.log('String: ',p[i].map(),' (',p[i].status(),')');
          }
          console.log('');
          console.log('');
          _testCount = 0;
        },30)

      }

    }

    return Genome;
  }
  return CreateGenome;
}());
