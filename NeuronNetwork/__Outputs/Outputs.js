module.exports = function CreateOutputsLayer(n)
{
  function OutputsLayer(n,nw,bias)
  {
    this.bias = bias;
    this.NeuronLayer = this.CreateNeuronLayer(n,nw);
  };

  OutputsLayer.prototype = {
    CreateNeuronLayer:require('./../__NeuronLayer/NeuronLayer')
  };

  return new OutputsLayer(n);
}
