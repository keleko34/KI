/*

var genome = require('./Genome/Genome');

var sampleTests = {
  easy:"Hello, World!!!",
  moderate:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789876543210!@#$%^&*()",
  difficult:"I have been interested in artificial intelligence and artificial life for years and I read most of the popular books printed on the subject. I developed a grasp of most of the topics yet neural networks always seemed to elude me. Sure, I could explain their architecture but as to how they actually worked and how they were implemented… well that was a complete mystery to me, as much magic as science. I bought several books on the subject but every single one attacked the subject from a very mathematical and academic viewpoint and very few even gave any practical uses or examples. So for a long long time I scratched my head and hoped that one day I would be able to understand enough to experiment with them myself.That day arrived some time later when - sat in a tent in the highlands of Scotland reading a book - I had a sudden blast of insight. It was one of those fantastic “eureka” moments and although Scotland is a beautiful place I couldn’t wait to get to a computer so I could try out what I’d just learnt. To my surprise the first neural net I programmed worked perfectly and I haven’t looked back since. I still have a great deal to learn, neural nets are a huge subject, but I hope I can share enough knowledge and enthusiasm to get you started on your own little projects. In many ways the fields of AI and A-Life are very exciting to work in. I think of these subjects as the explorers of old must have looked at all those vast empty spaces on the maps. There is so much to learn and discover."
}

genome().call({},sampleTests[process.argv[2]] !== undefined ? sampleTests[process.argv[2]] : sampleTests.easy);


*/

var NeuronNetwork = require('./NeuronNetwork/NeuronNetwork');

var test = NeuronNetwork(4,2,4,2);
var nn = test.CreateNeuralNetwork();
nn.forEach(function(k,i){
  console.log(k);
  console.log(k.NeuronLayer.neurons);
});

var update = test.update([-1.275,1.275,1.275,1.275]);
console.log("updated: ",update);
