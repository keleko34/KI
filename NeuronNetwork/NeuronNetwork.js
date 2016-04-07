var Input = require('./__Input/Input')
  , Hidden = require('./__Hidden/Hidden')
  , Output = require('./__Output/Output');

module.exports = function()
{
  var _neural_network = []
    , _num_input_neurons = 2
    , _num_hidden_layers = 1
    , _num_hidden_neurons = 3
    , _num_output_neurons = 1
    , _output = []
    , _input_layer = Input()
    , _hidden_layer = Hidden()
    , _output_layer = Output()
    , _weight_ratio = 1;

  function NeuralNetwork()
  {
    _input_layer.numInputNeurons(_num_input_neurons);

    _hidden_layer.numHiddenLayers(_num_hidden_layers)
    .numHiddenNeurons(_num_hidden_neurons)
    .numInputNeurons(_num_input_neurons)
    .weightRatio(_weight_ratio);

    _output_layer.numOutputNeurons(_num_output_neurons)
    .numPreviousLayerNeurons((_num_hidden_layers > 0 ? _num_hidden_neurons : _num_input_neurons))
    .weightRatio(_weight_ratio);

    _neural_network = [_input_layer()]
    .concat(_hidden_layer())
    .concat([_output_layer()]);
    return _neural_network;
  }

  NeuralNetwork.numInputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_input_neurons;
    }
    _num_input_neurons = (typeof v === 'number' ? v : _num_input_neurons);
    return NeuralNetwork;
  }

  NeuralNetwork.numHiddenLayers = function(v)
  {
    if(v === undefined)
    {
      return _num_hidden_layers;
    }
    _num_hidden_layers = (typeof v === 'number' ? v : _num_hidden_layers);
    return NeuralNetwork;
  }

  NeuralNetwork.numHiddenNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_hidden_neurons;
    }
    _num_hidden_neurons = (typeof v === 'number' ? v : _num_hidden_neurons);
    return NeuralNetwork;
  }

  NeuralNetwork.numOutputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_output_neurons;
    }
    _num_output_neurons = (typeof v === 'number' ? v : _num_output_neurons);
    return NeuralNetwork;
  }

  NeuralNetwork.weightRatio = function(v)
  {
    if(v === undefined)
    {
      return _weight_ratio;
    }
    _weight_ratio = (typeof v === 'number' ? v : _weight_ratio);
    return NeuralNetwork;
  }

  NeuralNetwork.output = function()
  {
    return _output;
  }

  NeuralNetwork.neuralNetwork = function()
  {
    return _neural_network;
  }

  NeuralNetwork.activation = function(previous_layer,hidden_or_output_neuron)
  {
    hidden_or_output_neuron.Output = hidden_or_output_neuron.Bias; //adds bias
	for (var x = 0; x < previous_layer.length; x++) //computes sigma layers
    {
      hidden_or_output_neuron.Output += previous_layer[n].Output * hidden_or_output_neuron.TransferWeights[n];
    }
    return NeuralNetwork;
  }

  NeuralNetwork.updateNeuronSigmoid = function(hidden_or_output_neuron)
  {
    hidden_or_output_neuron.Output = 1 / (1 + Math.exp(-hidden_or_output_neuron.Output));
    return NeuralNetwork;
  }

  NeuralNetwork.update = function(input_values) //equal to number of input neurons
  {
    var x = 0
      , i = 0;

    _output = [];
    for(x;x<input_values.length;x+=1)
    {
      _neural_network[0][i].Output = input_values[i];
    }
    for(x=1;x<_neural_network.length;x+=1)
    {
      for(i;i<_neural_network[x].length;i+=1)
      {
        NeuralNetwork.activation(_neural_network[(x-1)],_neural_network[x][i])
        .updateNeuronSigmoid(_neural_network[x][i]);
        if(i === (_neural_network[x].length - 1))
        {
          _output.push(_neural_network[x][i].Output);
        }
      }
    }
    return NeuralNetwork;
  }

  NeuralNetwork.randomWeight = function()
  {
    return (Math.random()*(_weight_ratio-(-_weight_ratio))+(-_weight_ratio));
  }

  return NeuralNetwork;
}
