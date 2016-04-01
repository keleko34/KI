var Genes = require('./__Genes/Genes')

module.exports = (function(){
  function CreatePopulation()
  {
    var _members = []
      , _amount = 2
      , _goal = ''
      , _generation = 0
      , _onFound = function(){}
      , _onUpdate = function(){}
      , _children = []
      , _repopulate = []
      , _i = 0
      , _mutationRate = 0.2
      , _memoryRead = {}
      , _memoryWrite = {}

    function Population()
    {
      //Create Population
      for(_i=0;_i < _amount;_i+=1)
      {
        if(_members[_i] === undefined)
        {
          _members[_i] = Genes()
          .goal(_goal)
          .popID(_i)
          .memoryRead(_memoryRead)
          .memoryWrite(_memoryWrite)
          .chance(_mutationRate)
          .randomizeMap(_goal.length)
          .onFoundChar(function(){

          });
        }
        //have the genes check their map
        _members[_i].checkMap();
      }
      //sort population by who is stronger, force them to have children and weed out the weak!
      Population.sort(); //sort by the class, only the strong survive
      _children = _members[0].call(_members[0],_members);
      _repopulate = ([_members.length-_children.length,_children.length]).concat(_children);
      _members.splice.apply(_members,_repopulate);
      for(_i=0;_i<_members.length;_i+=1)
      {
        _members[_i].checkMap();
      }
      Population.sort();
      if(_members[0].map() === _goal){
        _onFound();
      }
      _onUpdate(_members);
    }

    Population.amount = function(v)
    {
      if(v === undefined)
      {
        return _amount;
      }
      _amount = (typeof v === 'number' && v > 2 ? v : _amount);
      return Population;
    }

    Population.goal = function(v)
    {
      if(v === undefined)
      {
        return _goal;
      }
      _goal = (typeof v === 'string' ? v : _goal);
      return Population;
    }

    Population.generation = function(v)
    {
      if(v === undefined)
      {
        return _generation;
      }
      _generation = (typeof v === 'number' ? v : _generation);
      return Population;
    }

    Population.onFound = function(v)
    {
      if(v === undefined)
      {
        return _onFound;
      }
      _onFound = (typeof v === 'function' ? v : _onFound);
      return Population;
    }

    Population.onUpdate = function(v)
    {
      if(v === undefined)
      {
        return _onUpdate;
      }
      _onUpdate = (typeof v === 'function' ? v : _onUpdate);
      return Population;
    }

    Population.mutationRate = function(v)
    {
      if(v === undefined)
      {
        return _mutationRate;
      }
      _mutationRate = (typeof v === 'number' && v <= 1 ? v : _mutationRate);
      return Population;
    }

    Population.memoryRead = function(v)
    {
      if(v === undefined)
      {
        return _memoryRead;
      }
      _memoryRead = (typeof v.pipe === 'function' ? v : _memoryRead);
      return Population;
    }

    Population.memoryWrite = function(v)
    {
      if(v === undefined)
      {
        return _memoryWrite;
      }
      _memoryWrite = v;
      return Population;
    }

    Population.members = function(v)
    {
      return _members;
    }

    Population.sort = function()
    {
      _members.sort(function(a,b){
        return a.status() - b.status();
      });
    }

    return Population;
  }
  return CreatePopulation;
}());
