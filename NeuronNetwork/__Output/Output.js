module.exports = (function(){
  function CreateOutputLayer()
  {
    function OutputLayer(o)
    {
      this.numNodes = (typeof o === 'number' || !isNaN(parseInt(o,10)) ? parseInt(o,10) : 1);
      this.nodes = [];
      this.weights = [];
    }

    return OutputLayer;
  }
  return CreateOutputLayer;
});
