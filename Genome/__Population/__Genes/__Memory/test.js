var fs = require('fs'),
  JSONStream = require('JSONStream'),
  es = require('event-stream'),
  streamArray = require('stream-array')

var getStream = function () {
    var jsonData = './memory.json',
        stream = fs.createReadStream(jsonData, {encoding: 'utf8'}),
        parser = JSONStream.parse('*');
        return stream.pipe(parser);
};
var getWriteStream = function(){
        var jsonData = './memory.json';
        return (fs.createWriteStream(jsonData, {flag:'a+'}));
};

var gst = getStream()
.pipe(es.mapSync(function (d){
  console.log(d,typeof d);
  if(d['a'] !== undefined){d['a'] = [240]};
  return d;
}));

gst.pipe(es.mapSync(function (d){
  console.log(d,typeof d);
  if(d['d'] !== undefined){d['d'] = [240]};
  return d;
}))

var data = []
  , found = false;
gst.on('data',function(d){
  if(d["d"] !== undefined)
  {
    found = true;
  }
  data.push(d);
});
gst.on('end',function(){
  if(!found) data.push({"d":[230]});
  streamArray(data).pipe(JSONStream.stringify()).pipe(fs.createWriteStream("./memory.json"));
});
