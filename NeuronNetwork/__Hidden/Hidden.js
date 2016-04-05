module.exports = function CreateHiddenLayer(n,nw,bias)
{
  function HiddenLayer(n,nw,bias)
  {
    this.bias = bias;
    this.NeuronLayer = this.CreateNeuronLayer(n,nw);
  };

  HiddenLayer.prototype = {
    CreateNeuronLayer:require('./../__NeuronLayer/NeuronLayer')
  };

  return new HiddenLayer(n,nw,bias);
}
