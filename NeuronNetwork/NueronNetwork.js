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

    if(this.numHiddenLayers > 0)
    {
      this.layers.push(this.CreateInputLayer(this.neuronsPerHiddenLayer,this.numInputs,this.RandomWeight()));
      for(var x=0;x<this.numHiddenLayers;x+=1)
      {
        this.layers.push(this.CreateHiddenLayer(this.neuronsPerHiddenLayer,this.neuronsPerHiddenLayer,this.RandomWeight()));
      }
      this.layers.push(this.CreateOutputLayer(this.numOutputs,this.neuronsPerHiddenLayer));
    }
    else
    {
      this.layers.push(this.CreateOutputLayer(this.numOutputs,this.numInputs,this.RandomWeight()));
    }

  }

  NeuronNetwork.prototype = {
    CreateInputLayer:require('./__Inputs/Inputs'),
    CreateHiddenLayer:require('./__Hidden/Hidden'),
    CreateOutputLayer:require('./__Outputs/Outputs'),
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
    }, //get all weights into single array
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
    }, //return new values in weights array back into network
    update:function(Nuerons)
    {
      var outputs = []
        , currentWeight = 0
        , x = 0
        , i = 0
        , k = 0
        , currentWeights = 0
        , netInput = 0;
      if(Nuerons.length != this.numInputs)
      {
        return outputs;
      }

      for(x;x<this.numHiddenLayers;x+=1)
      {
        if(i > 0)
        {
          Nuerons = outputs;
        }

        outputs = [];
        currentWeight = 0;

        for(i;i<this.layers[x].nuerons.length;i+=1)
        {
          netInput = 0;
          currentWeights = this.layers[x].nuerons[i].weights;
          for(k;k<(currentWeights.length - 1);k+=1)
          {
            netInput += (input[currentWeight] * currentWeights[k]);\
            currentWeight += 1;
          }
          netInput += (currentWeights[currentWeights.length-1] * this.bias);

          outputs.push(this.Sigmoid(netInput));
          currentWeight = 0;
        }
      }
    }
    return outputs;
  };


  return new NeuronNetwork(i,h,nh,o);
}
