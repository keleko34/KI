

module.exports = (function(){
  function CreateNeuronNetwork()
  {
    function NeuronNetwork(i,h,nh,o) //i: number of inputs, nh: number of hidden layers, h: nuerons per hidden layer, o: number of outputs
    {
      this.numInputs = (typeof i === 'number' || !isNaN(parseInt(i,10)) ? parseInt(i,10) : 1);
      this.numHiddenLayers = (typeof h === 'number' || !isNaN(parseInt(h,10)) ? parseInt(h,10) : 1);
      this.neuronsPerHiddenLayer = (typeof nh === 'number' || !isNaN(parseInt(nh,10)) ? parseInt(nh,10) : 2);
      this.numOutputs = (typeof o === 'number' || !isNaN(parseInt(o,10)) ? parseInt(o,10) : 1);

      this.layers = [];
    }

    NeuronNetwork.prototype = {
      Input:Input,
      Hidden:Hidden,
      Output:Output
    };


    return NeuronNetwork;
  }
  return CreateNeuronNetwork;
}());
