var lookup = require('./lookup')
  , fs = require('fs');

module.exports = function()
{
  return (function()
  {
    var _data = this;

    this.define = ['var','let','const'];
    this.starts = ['{','('];
    this.ends = ['}',')'];
    this.finalEnd = [';'];

    this.type = (data) =>
    {
      var type = '';
      _data.define.forEach((k) => {
        if(data.indexOf(k) > -1)
        {

        }
      });
    }

    return _data;
  }).bind({})();
}
