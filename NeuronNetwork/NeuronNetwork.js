module.exports = function CreateNeuronNetwork(i,h,nh,o)
{
  function NeuronNetwork(i,h,nh,o) //i: number of inputs, nh: number of hidden layers, h: nuerons per hidden layer, o: number of outputs
  {
    this.numInputs = (typeof i === 'number' ? i : 1);
    this.numHiddenLayers = (typeof h === 'number' ? h : 1);
    this.neuronsPerHiddenLayer = (typeof nh === 'number' ? nh : 2);
    this.numOutputs = (typeof o === 'number' ? o : 1);
    this.activationResponse = 0;
    this.bias = 0;
    this.layers = [];
  }

  NeuronNetwork.prototype = {
    CreateInputLayer:require('./__Inputs/Inputs'),
    CreateHiddenLayer:require('./__Hidden/Hidden'),
    CreateOutputLayer:require('./__Outputs/Outputs'),
    CreateNeuralNetwork:function()
    {
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
      return this.layers;
    },
    RandomWeight:function()
    {
      return (Math.random()*(1-(-1))+(-1));
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
    getActivation:function(inputs,weights)
    {
      var sum = 0,
          x = 0,
          cWeight = 0;
      for(x;x<(weights.length);x+=1)
      {
        sum += (inputs[cWeight] * weights[x]);
        cWeight += 1;
      }
      return sum;
    }, //get activation value from layer nodes and weights
    getWeights:function()
    {
      var weights = []
        , x = 0
        , i = 0
        , k = 0
        , nLayer;
      for(x;x<(this.layers.length-1);x+=1)
      {
        nLayer = this.layers[x].NeuronLayer.neurons;
        for(i;i<nLayer.length;i+=1)
        {
          for(k;k<nLayer[i].weights.length;k+=1)
          {
            weights.push(nLayer[i].weights[k]);
          }
        }
      }
      return weights;
    }, //get all weights into single array
    putWeights:function(weights)
    {
      var x = 0
        , i = 0
        , k = 0
        , nLayer
        , weight = 0;
      for(x;x<(this.layers.length-1);x+=1)
      {
        nLayer = this.layers[x].NeuronLayer.neurons;
        for(i;i<nLayer.length;i+=1)
        {
          for(k;k<nLayer[i].weights.length;k+=1)
          {
            nLayer[i].weights[k] = weights[weight];
            weight += 1;
          }
        }
      }
    }, //return new values in weights array back into network
    update:function(Nuerons)
    {
      var outputs = []
        , x = 0
        , i = 0
        , k = 0
        , nLayer
        , currentWeights = 0
        , netInput = 0;
      if(Nuerons.length != this.numInputs)
      {
        return outputs;
      }

      for(x;x<(this.numHiddenLayers+1);x+=1)
      {
        if(x > 0)
        {
          Nuerons = outputs;
        }

        outputs = [];
        nLayer = this.layers[x].NeuronLayer;
        for(i;i<nLayer.neurons.length;i+=1)
        {
          netInput = 0;
          ncWeights = nLayer.neurons[i].weights;
          netInput = this.getActivation(Nuerons,ncWeights);
          netInput += (nLayer.bias * this.bias);
          outputs.push(this.Sigmoid(netInput));
          currentWeight = 0;
        }
      }
      return outputs;
    }
  };


  return new NeuronNetwork(i,h,nh,o);
}
