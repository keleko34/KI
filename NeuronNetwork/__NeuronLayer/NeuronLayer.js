module.exports = function CreateNeuronLayer(n)
{
  function NeuronLayer(n,nw)
  {
    this.numNeurons = (typeof n === 'number' || !isNaN(parseInt(n,10)) ? parseInt(n,10) : 1);
    this.neurons = [];

    var x =0;
    for(x;x<this.numNeurons;x+=1)
    {
      this.neurons.push(this.CreateNeuron(nw));
    }
  };

  NeuronLayer.prototype = {
    CreateNeuron:require('./__Neuron/Neuron')
  };

  return new NeuronLayer(n);
}
