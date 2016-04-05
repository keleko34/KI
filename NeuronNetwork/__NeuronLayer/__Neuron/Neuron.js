module.exports = function CreateNeuron(n)
{
  function Neuron(n)
  {
    this.numWeights = (typeof n === 'number' ? n : 1);
    this.weights = [];

    var x =0;
    for(x;x<this.numWeights;x+=1)
    {
      this.weights.push(this.RandomWeight());
    }
  };

  Neuron.prototype = {
    RandomWeight:function()
    {
      return Math.random()*(1-(-1))+(-1);
    }
  };

  return new Neuron(n);
}
