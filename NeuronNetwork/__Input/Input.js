module.exports = (function(){
  function CreateInputLayer()
  {
    function InputLayer(i)
    {
      this.numNodes = (typeof i === 'number' || !isNaN(parseInt(i,10)) ? parseInt(i,10) : 1);
      this.nodes = [];
      this.weights = [];
    }

    return InputLayer;
  }
  return CreateInputLayer;
});
