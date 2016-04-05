var CreateNueron = require('./__Nueron/Nueron')

module.exports = function CreateNueronLayer()
{
  function NueronLayer(n,nw)
  {
    this.numNuerons = (typeof n === 'number' || !isNaN(parseInt(n,10)) ? parseInt(n,10) : 1);
    this.nuerons = [];

    var x =0;
    for(x;x<this.numNuerons;x+=1)
    {
      this.nuerons.push(this.CreateNueron(nw));
    }
  };

  NueronLayer.prototype = {
    CreateNueron:CreateNueron
  };

  return NueronLayer;
}
