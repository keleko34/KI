module.exports = function()
{
  var _num_output_neurons = 2
    , _num_previous_layer_neurons = 3
    , _output_layer = []
    , _weight_ratio = 1
    , _transfer_weights = []

  function OutputLayer()
  {
    _output_layer = [];
    for(var i=0;i<_num_output_neurons;i+=1)
    {
      var lWeights = [];
      for (var k = 0; k < _num_previous_layer_neurons; k++)
      {
        lWeights.push(OutputLayer.randomWeight());
      }
      _transfer_weights = _transfer_weights.concat(lWeights); //is memory refrenced for easy changing
      _output_layer[i] = {Output:null,TransferWeights:lWeights};
    }
    return _output_layer;
  }

  OutputLayer.numOutputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_output_neurons;
    }
    _num_output_neurons = (typeof v === 'number' ? v : _num_output_neurons);
    return OutputLayer;
  }

  OutputLayer.numPreviousLayerNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_previous_layer_neurons;
    }
    _num_previous_layer_neurons = (typeof v === 'number' ? v : _num_previous_layer_neurons);
    return OutputLayer;
  }

  OutputLayer.weightRatio = function(v)
  {
    if(v === undefined)
    {
      return _weight_ratio;
    }
    _weight_ratio = (typeof v === 'number' ? v : _weight_ratio);
    return OutputLayer;
  }

  OutputLayer.outputLayer = function()
  {
    return _output_layer;
  }

  OutputLayer.transferWeights = function()
  {
    return _transfer_weights;
  }

  HiddenLayer.randomWeight()
  {
    return (Math.random()*(_weight_ratio-(-_weight_ratio))+(-_weight_ratio));
  }

  return OutputLayer;
}
