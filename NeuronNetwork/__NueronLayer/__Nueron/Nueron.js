module.exports = function CreateNueron(n)
{
  function Nueron(n)
  {
    this.numWeights = (typeof n === 'number' || !isNaN(parseInt(n,10)) ? parseInt(n,10)+1 : 1); // +1 bias
    this.weights = [];

    var x =0;
    for(x;x<this.numWeights;x+=1)
    {
      this.weights.push(this.RandomWeight());
    }
  };

  Nueron.prototype = {
    RandomWeight:function()
    {
      return Math.random()*(1-(-1)+1)+(-1);
    }
  };

  return new Nueron(n);
}
