var CreateNueronLayer = require('./__NueronLayer/NueronLayer');

module.exports = function CreateNeuronNetwork(i,h,nh,o)
{
  function NeuronNetwork(i,h,nh,o) //i: number of inputs, nh: number of hidden layers, h: nuerons per hidden layer, o: number of outputs
  {
    this.numInputs = (typeof i === 'number' || !isNaN(parseInt(i,10)) ? parseInt(i,10) : 1);
    this.numHiddenLayers = (typeof h === 'number' || !isNaN(parseInt(h,10)) ? parseInt(h,10) : 1);
    this.neuronsPerHiddenLayer = (typeof nh === 'number' || !isNaN(parseInt(nh,10)) ? parseInt(nh,10) : 2);
    this.numOutputs = (typeof o === 'number' || !isNaN(parseInt(o,10)) ? parseInt(o,10) : 1);
    this.activationResponse = 0;
    this.bias = 0;
    this.layers = [];

    var x=0;
    if(this.numHiddenLayers > 0)
    {
      this.layers.push(CreateNueronLayer(this.neuronsPerHiddenLayer,this.numInputs));
      for(x;x<this.numHiddenLayers;x+=1)
      {
        this.layers.push(CreateNueronLayer(this.neuronsPerHiddenLayer,this.neuronsPerHiddenLayer));
      }
      this.layers.push(CreateNueronLayer(this.numOutputs,this.neuronsPerHiddenLayer));
    }
    else
    {
      this.layers.push(CreateNueronLayer(this.numOutputs,this.numInputs));
    }

  }

  NeuronNetwork.prototype = {
    CreateNueronLayer:CreateNueronLayer,
    RandomWeight:function()
    {
      return Math.random()*(1-(-1)+1)+(-1);
    }, //gives random weight between -1,0,1;
    RandomNum:function(min,max)
    {
      return Math.floor(Math.random()*(max - min + 1) + min)
    }, //gives random number between passed min and max
    RandomNNChar:function()
    {
      return (Math.random()*(1.275-(-1.275))+(-1.275));
    }, //gives random NN encoded Char
    NNCharToCharCode:function(NNChar)
    {
      return (NNChar+1.275)*100;
    }, //converts NN encoded Char to JS Char Code
    Sigmoid:function(netInp)
    {
      return (1/(1+Math.exp(netInp / this.activationResponse)))
    }, //get sigmoid
    getActivation:function(layer,weights)
    {
      var sum = 0,
          x = 0;
      for(x;x<inputs.length;x+=1)
      {
        if(weights[x] === undefined)
        {
          weights[x] = getRandomValue(-1,1);
        }
        sum += (inputs[x] * weights[x]);
      }
      return sum;
    }, //get activation value from layer nodes and weights
    getWeights:function()
    {
      var weights = []
        , x = 0
        , i = 0;
      for(x;x<(this.layers.length-1);x+=1)
      {
        for(i;i<this.layers[x].weights.length;i+=1)
        {
          weights.push(this.layers[x].weights[i]);
        }
      }
      return weights;
    },
    putWeights:function(weights)
    {
      var x = 0
        , i = 0
        , weight = 0;
      for(x;x<(this.layers.length-1);x+=1)
      {
        for(i;i<this.layers[x].weights.length;i+=1)
        {
          this.layers[x].weights[i] = weights[weight];
          weight += 1;
        }
      }
    }
  };


  return new NeuronNetwork(i,h,nh,o);
}
