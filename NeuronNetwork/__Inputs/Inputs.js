module.exports = function CreateInputsLayer(n,nw,bias)
{
  function InputsLayer(n,nw,bias)
  {
    this.bias = bias;
    this.NeuronLayer = this.CreateNeuronLayer(n,nw);
  };

  InputsLayer.prototype = {
    CreateNeuronLayer:require('./../__NeuronLayer/NeuronLayer')
  };

  return new InputsLayer(n,nw,bias);
}
