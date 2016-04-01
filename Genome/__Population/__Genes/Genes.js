var Evolve = require('./__Evolve/Evolve')
  , fs = require('fs')
  , ArrayStream = require('stream-array')
  , JSONStream = require('JSONStream');

module.exports = (function(){
  function CreateGene()
  {
    var _map = ''
      , _chance = 0.1
      , _status = 0
      , _goal = ''
      , _i = 0
      , _isMemoryData = false
      , _memoryExists = false
      , _memoryCheck = ""
      , _memoryCheckArr = []
      , _memoryChunks = []
      , _memoryLoc = process.cwd().replace(/\\/g,'/')+'/Genome/__Population/__Genes/__Memory/Memory.json'
      , _memory = fs.createReadStream(_memoryLoc).pipe(JSONStream.parse('*'))

      _memory.on('data',function(d){
        if(typeof d === 'object')
        {
          _isMemoryData = true;
          if(d[_memoryCheck] === 'undefined')
          {
            _memoryExists = true;
          }
          _memoryChunks.push(d);
        }
        else
        {
          _isMemoryData = false;
        }
      });

      _memory.on('end',function(){
        var _newMemory = {};
        _newMemory[_memoryCheck] = _memoryCheckArr;
        if(!_memoryExists) _memoryChunks.push(_newMemory);
        if(_isMemoryData) ArrayStream(_memoryChunks).pipe(JSONStream.stringify()).pipe(fs.createWriteStream(_memoryLoc));
      });

    function Gene(Mates)
    {
      //only mates with half of the population, the rest die off.
      var _children = []
        , _mutation = function(){}
      for(_i=0;_i<(Mates.length/2);_i+=1)
      {
        _mutation = Evolve()
        .goal(_goal)
        .rate(_chance)
        .mateX(_map)
        .mateY(Mates[_i].map())
        .onMemoryCheck(function(k,charArray){_memoryCheck = k;_memoryCheckArr = charArray;});
        _children[_i] = CreateGene().chance(_chance).map(_mutation.call());
        _map = _mutation.mateX();
      }
      return _children;
    }

    Gene.map = function(v)
    {
      if(v === undefined)
      {
        return _map;
      }
      _map = (typeof v === 'string' ? v : _map);
      return Gene;
    }

    Gene.goal = function(v)
    {
      if(v === undefined)
      {
        return _goal;
      }
      _goal = (typeof v === 'string' ? v : _goal);
      return Gene;
    }

    Gene.chance = function(v)
    {
      if(v === undefined)
      {
        return _chance;
      }
      _chance = (typeof v === 'number' && v <= 1 ? v : _chance);
      return Gene;
    }

    Gene.status = function()
    {
      return _status;
    }

    Gene.checkMap = function()
    {
      var mapChars = _map.split("")
        , goalChars = _goal.split("")
        , matched = 0;

      for (_i=0;_i<goalChars.length;_i+=1)
      {
          matched += (goalChars[_i] === mapChars[_i] ? 0 : 1);
      }
      _status = matched; //number of mistakes this loser has.
    }

    return Gene;
  }
  return CreateGene;
}());
