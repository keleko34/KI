var https = require('https')
  , http = require('http');

module.exports = function()
{
  return (function()
  {
    var _data = this;

    this.getInfo = (url,cb) =>
    {
      var _get = http.get
        , _page = ''
        , _reg = /(<)(?!(a)(.*?)(doc))(?!code)(?!\/code)(.*?)(>)/g //get rid of all tags except code tags and a tags with an href of doc
        , _reg2 = /(<)(?!a)(?!code)(.*?)(\/>)/g //get rid of all one line tags, meta etc.
        , _reg3 = /<script[\s\S]*?>[\s\S]*?<\/script>/ig //get rid of all scripts on the page
        , _reg4 = /^\s*\n/gm //empty lines
        , _cb = cb;

      if(url.indexOf('https') > -1)
      {
        _get = https.get;
      }

      _get(url,(res) => {

        res.on('data',(d) => {

          _page += d.toString().replace(_reg3,'').replace(_reg2,'').replace(_reg,'').replace(/^\s*\n/gm,'');
        });

        res.on('end',(d) => {
          cb(null,_page);
        });

      })
      .on('error',(err) => {
        cb(err);
      });
    }

    return _data;
  }).bind({})();
}

/* testing */

module.exports().getInfo('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions',(err,info) => {
  console.log(info);
});
