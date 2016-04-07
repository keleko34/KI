module.exports = function (n)
{
  var _num_input_neurons = 2
    , _neurons = [];

  function InputsLayer()
  {
    _neurons = [];
	for (var x = 0; x < _num_input_neurons; x++)
    {
      _neurons.push(InputsLayer.neuron());
    }
	return _neurons;
  };

  InputsLayer.numInputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_input_neurons;
    }
    _num_input_neurons = (typeof v === 'number' ? v : _num_input_neurons);
    return InputsLayer;
  }

  InputsLayer.neurons = function(v)
  {
      return _neurons;
  }

  InputsLayer.neuron = function()
  {
    return {Output: null};
  }

  return InputsLayer;
}
