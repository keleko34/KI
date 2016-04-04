/// weights layers = [[]//input,[]//hidden,[]//hidden etc,[]//output];
////// [{val,weight},{val,weight}]//input
////// [{val,weight},{val,weight}] //hidden

///weights -1.275, 1.275;

//Math.round((1.275 + 1.275) * 100) --> gives us a char code





(function(){

  var getRandomWeight = function(min,max)
  {
    return Math.floor(Math.random()*(max-min+1)+min);
  };

   var getRandomChar = function()
  {
    return (Math.random()*(1.275-(-1.275))+(-1.275));
  };

  var convertToChar = function(v)
  {

  }

  var sig = function(x)
  {
    return 1/(1+Math.pow(Math.E, -x));
  };

  var getActivationValue = function(inputs,weights)
  {
    var sum = 0
      , x = 0;
    for(x;x<inputs.length;x+=1)
    {
      if(weights[x] === undefined)
      {
        weights[x] = getRandomValue(-1,1);
      }
      sum += (inputs[x] * weights[x]);
    }
    return sum;
  };

  var sortFitness = function(fitA,fitB)
  {
    return (fitA < fitB ? 0 : 1);
  }


}());
