var Evolve = require('./__Evolve/Evolve')
  , fs = require('fs')
  , ArrayStream = require('stream-array')
  , JSONStream = require('JSONStream')

module.exports = (function(){
  function CreateGene()
  {
    var _map = ''
      , _popID = 0
      , _chance = 0.1
      , _status = 0
      , _goal = ''
      , _i = 0
      , _memoryRead = {} //read stream
      , _memoryWrite = null //write stream
      , _memoryLookup = null //event-stream
      , _memoryChunks = [] //array to be passed to write stream
      , _isMemoryData = false //if data is proper to be written
      , _memoryExists = false //if the memory piece does not already exist

      , _memoryCheck = "" //current check
      , _memoryCheckArr = [] //current array of charCodes to set on check

      , _onFoundChar = function(){}

    function Gene(Mates)
    {
      if(_memoryRead.extendedOnData && _memoryRead.extendedOnEnd)
      {
        _memoryRead.extendedOnData[_popID] = function(d)
        {
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
        }

        _memoryRead.extendedOnEnd[_popID] = function()
        {
            var _newMemory = {};
            _newMemory[_memoryCheck] = _memoryCheckArr;
            if(!_memoryExists) _memoryChunks.push(_newMemory);
            if(_memoryWrite)
            {
              if(_isMemoryData) ArrayStream(_memoryChunks).pipe(JSONStream.stringify()).pipe(_memoryWrite);
            }
            if(_memoryRead.extendedOnEnd[_popID].extendedEnd)
            {
              _memoryRead.extendedOnEnd[_popID].extendedEnd();
            }
            if(_memoryLookup)
            {
              _memoryRead.unpipe(_memoryLookup);
              _memoryLookup = null;
            }
        }
      }

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
        .memory(_memoryRead)
        .popID(_popID)
        .onMemoryCheck(function(k,charArray){
          _memoryCheck = k;
          _memoryCheckArr = charArray;
          _memoryRead.read();
        })
        .onFoundChar(_onFoundChar);

        _children[_i] = CreateGene()
        .chance(_chance)
        .goal(_goal)
        .map(_mutation.call())
        .popID(_i)
        .memoryRead(_memoryRead)
        .memoryWrite(_memoryWrite);

        _map = _mutation.mateX();
      }
      //_memoryLookup = _memory.pipe();
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

    Gene.popID = function(v)
    {
      if(v === undefined)
      {
        return _popID;
      }
      _popID = (typeof v === 'number' ? v : _popID);
      return Gene;
    }

    Gene.memoryRead = function(v)
    {
      if(v === undefined)
      {
        return _memoryRead;
      }
      _memoryRead = (typeof v.pipe === 'function' ? v : _memoryRead);
      return Gene;
    }

    Gene.memoryWrite = function(v)
    {
      if(v === undefined)
      {
        return _memoryWrite;
      }
      _memoryWrite = v;
      return Gene;
    }

    Gene.onFoundChar = function(v)
    {
      if(v === undefined)
      {
        return _onFoundChar;
      }
      _onFoundChar = (typeof _onFoundChar === 'function' ? v : _onFoundChar);
      return Gene;
    }

    Gene.checkMap = function()
    {
      var total = 0;
      for (_i = 0; _i < _map.length; _i+=1) {
          total += (_map.charCodeAt(_i) - _goal.charCodeAt(_i)) * (_map.charCodeAt(_i) - _goal.charCodeAt(_i));
      }
      _status = total; //number of mistakes.
      return Gene;
    }

    Gene.randomizeMap = function(l)
    {
      for(_i=0;_i<l;_i+=1)
      {
        _map += String.fromCharCode(Math.floor(Math.random() * 255));
      }
      return Gene;
    }

    return Gene;
  }
  return CreateGene;
}());
