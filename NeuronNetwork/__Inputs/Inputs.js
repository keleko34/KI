module.exports = function CreateInputsLayer(n)
{
  function InputsLayer(n,nw,bias)
  {
    this.bias = bias;
    this.NeuronLayer = this.CreateNeuronLayer(n,nw);
  };

  InputsLayer.prototype = {
    CreateNeuronLayer:require('./../__NeuronLayer/NeuronLayer')
  };

  return new InputsLayer(n);
}
