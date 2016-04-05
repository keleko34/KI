module.exports = function CreateOutputsLayer(n,nw)
{
  function OutputsLayer(n,nw)
  {
    this.NeuronLayer = this.CreateNeuronLayer(n,nw);
  };

  OutputsLayer.prototype = {
    CreateNeuronLayer:require('./../__NeuronLayer/NeuronLayer')
  };

  return new OutputsLayer(n,nw);
}
