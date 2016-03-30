var lookup = require('./lookup')
    rules = require('./rules')
  , fs = require('fs');

module.exports = function()
{
  return (function()
  {
    var _data = this;
    this.learningMaterials = [
      'https://nodejs.org/api',
      'http://stackoverflow.com/questions/tagged/javascript',
      'https://developer.mozilla.org/en/docs/Web/JavaScript'
    ];

    this.known = false;

    return _data;
  }).bind({})();
}


/* testing */
