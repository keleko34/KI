module.exports = (function(){
  function CreateHiddenLayer()
  {
    function HiddenLayer(nh)
    {
      this.numNodes = (typeof nh === 'number' || !isNaN(parseInt(nh,10)) ? parseInt(nh,10) : 2);
      this.nodes = [];
      this.weights = [];
    }

    HiddenLayer.prototype = {

    };

    return HiddenLayer;
  }
  return CreateHiddenLayer;
}());
