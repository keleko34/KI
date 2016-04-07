module.exports = function()
{
  var _num_hidden_layers = 1
    , _num_hidden_neurons = 3
    , _num_input_neurons = 2
    , _hidden_layers = []
    , _weight_ratio = 1
    , _transfer_weights = []

  function HiddenLayer()
  {
    var prev_layer = _num_input_neurons;
    _hidden_layers = [];
    for(var x = 0;x<_num_hidden_layers;x+=1)
    {
      _hidden_layers[x] = [];
      if(x > 0) prev_layer = _num_hidden_neurons;
      for(var i=0;i<_num_hidden_neurons;i+=1)
      {
        var lWeights = [];
        for (var k = 0; k < prev_layer; k++)
        {
          lWeights.push(HiddenLayer.randomWeight());
        }
        _transfer_weights = _transfer_weights.concat(lWeights);
        _hidden_layers[x][i] = {Output:null,TransferWeights:lWeights};
      }
    }
    return _hidden_layers;
  }

  HiddenLayer.numHiddenLayers = function(v)
  {
    if(v === undefined)
    {
      return _num_hidden_layers;
    }
    _num_hidden_layers = (typeof v === 'number' ? v : _num_hidden_layers);
    return HiddenLayer;
  }

  HiddenLayer.numHiddenNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_hidden_neurons;
    }
    _num_hidden_neurons = (typeof v === 'number' ? v : _num_hidden_neurons);
    return HiddenLayer;
  }

  HiddenLayer.numInputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_input_neurons;
    }
    _num_input_neurons = (typeof v === 'number' ? v : _num_input_neurons);
    return HiddenLayer;
  }

  HiddenLayer.weightRatio = function(v)
  {
    if(v === undefined)
    {
      return _weight_ratio;
    }
    _weight_ratio = (typeof v === 'number' ? v : _weight_ratio);
    return HiddenLayer;
  }

  HiddenLayer.HiddenLayers = function()
  {
    return _hidden_layers;
  }

  HiddenLayer.transferWeights = function()
  {
    return _transfer_weights;
  }

  HiddenLayer.putWeights = function(weights)
  {
    var cWeight = 0;
    hl:for(var x=0;x<_hidden_layers.length;x+=1)
    {
      hn:for(var i=0;i<_hidden_layers[x].length;i+=1)
      {
        tw:for(var k=0;k<_hidden_layers[x][i].TransferWeights.length;k+=1)
        {
          if(weights[cWeight] !== undefined)
          {
            _hidden_layers[x][i].TransferWeights[k] = weights[cWeight];
            cWeight += 1;
          }
          else
          {
            break hl;
          }
        }
      }
    }
  }

  HiddenLayer.randomWeight = function()
  {
    return (Math.random()*(_weight_ratio-(-_weight_ratio))+(-_weight_ratio));
  }
  return HiddenLayer;
}
