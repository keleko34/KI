///Creation
function Neural_Network (Number_Of_Input_Neurons, Number_Of_Hidden_Layers, Number_Of_Neurons_Per_Hidden_Layer, Number_Of_Output_Neurons) {
	return [Input_Layer(Number_Of_Input_Neurons)].concat(Hidden_Layers(Number_Of_Input_Neurons, Number_Of_Hidden_Layers, Number_Of_Neurons_Per_Hidden_Layer)).concat([Output_Layer(Hidden_Layers == 0 ? Number_Of_Input_Neurons: Number_Of_Neurons_Per_Hidden_Layer, Number_Of_Output_Neurons)]);
};
function Input_Layer (Number_Of_Input_Neurons) {
	var ret = [];
	for (var n = 0; n < Number_Of_Input_Neurons; n++)
		ret.push(Input_Neuron());
	return ret;
};
function Input_Neuron () {
	return {Output: null};
};
function Hidden_Layers (Number_Of_Input_Neurons, Number_Of_Hidden_Layers, Number_Of_Neurons_Per_Hidden_Layer) {
	var ret = [];
	for (var h = 0; h < Number_Of_Hidden_Layers; h++)
		ret.push(Hidden_Layer(h == 0 ? Number_Of_Input_Neurons : Number_Of_Neurons_Per_Hidden_Layer, Number_Of_Neurons_Per_Hidden_Layer));
	return ret;
};
function Hidden_Layer (Number_Of_Neurons_In_Previous_Layer, Number_Of_Neurons_Per_Hidden_Layer) {
	var ret = [];
	for (var n = 0; n < Number_Of_Neurons_Per_Hidden_Layer; n++)
		ret.push(Hidden_Neuron(Number_Of_Neurons_In_Previous_Layer));
	return ret;
};
function Hidden_Neuron (Number_Of_Neurons_In_Previous_Layer) {
	return {Output: null, Input_Transfer_Weights: Input_Transfer_Weights(Number_Of_Neurons_In_Previous_Layer), Bias: 0};
};
function Input_Transfer_Weights (Number_Of_Neurons_In_Previous_Layer) {
	var ret = [];
	for (var n = 0; n < Number_Of_Neurons_In_Previous_Layer; n++)
		ret.push(0);
	return ret;
};
function Output_Layer (Number_Of_Neurons_In_Previous_Layer, Number_Of_Output_Neurons) {
	var ret = [];
	for (var n = 0; n < Number_Of_Output_Neurons; n++)
		ret.push(Output_Neuron(Number_Of_Neurons_In_Previous_Layer));
	return ret;
};
function Output_Neuron (Number_Of_Neurons_In_Previous_Layer) {
	return Hidden_Neuron(Number_Of_Neurons_In_Previous_Layer);
};



//Runnning sprint
function Transfer (Hidden_Or_Output_Neuron, Previous_Layer) {
	Hidden_Or_Output_Neuron.Output = Hidden_Or_Output_Neuron.Bias; //adds bias
	for (var n = 0; n < Previous_Layer.length; n++) //computes sigma layers
    {
      Hidden_Or_Output_Neuron.Output += Previous_Layer[n].Output * Hidden_Or_Output_Neuron.Input_Transfer_Weights[n];
    }
};
function Activate (Hidden_Or_Output_Neuron) { //sigmoid output of layer
	Hidden_Or_Output_Neuron.Output = 1 / (1 + Math.exp(-Hidden_Or_Output_Neuron.Output));
};
function Run (nn, Input_Values) {
	// Provide input values to input neurons
	for (var i = 0; i < Input_Values.length; i++)
		nn[0][i].Output = Input_Values[i];
	// Resolve network
	for (var h = 1; h < nn.length; h++) {
		for (var n = 0; n < nn[h].length; n++) {
			Transfer(nn[h][n], nn[h - 1]);
			Activate(nn[h][n]);
		}
	}
	// Gather output
	var ret = [];
	for (var n = 0; n < nn[nn.length - 1].length; n++)
		ret.push(nn[nn.length - 1][n].Output);
	return ret;
};
function Neural_Network_Fitness (Neural_Network, Cases) {
	var errors = [];
	for (var c = 0; c < Cases.length; c++) {
		var output = Run(Neural_Network, Cases[c][0]);
		var output_error = 0;
		for (var o = 0; o < output.length; o++)
			output_error += Math.pow(output[o] - Cases[c][1][o], 2);
		errors.push(output_error / output.length);
		// the output error for each case uses MSE to calculate
		// the total component error.
		// ie. for a case with 10 output components we calculate
		// the MSE of the components for that case, then add it
		// to the collected errors for all cases, which the MSE
		// is then taken of. We are effectively compounding 2 layers
		// of MSE.
	}
	var error = 0;
	for (var e = 0; e < errors.length; e++)
		error += Math.pow(errors[e], 2);
	return error / errors.length;
	// We define fitness here using MSE, which stands for
	// mean squared errors - or more simply, the average
	// of all the errors squares.
	// ie ((e1^2) + (e2^2) + (e3^2)) / 3 = mse
	// Therefore the fitness is the MSE of the collected
	// MSE's of each cases output component delta from the correct
	// output.
};

var convertToChar = function(f)
{
  return Math.round((f)*100);
}

var convertToInput = function(c)
{
  return (((c/100)).toFixed(2)/1);
}

var getFitnessPow = function(o,c)
{
  return Math.pow(o - c, 2);
}

var getFitnessChar = function(o,c)
{
  return ((convertToChar(o) - convertToChar(c)) * (convertToChar(o) - convertToChar(c)));
}

var getDiff = function(goal,actual)
{
  return (goal > actual ? (goal - actual) : (actual - goal));
}

var convertDiffToActual = function(actual,goal,diff)
{
  return (goal > actual ? (actual+diff) : (actual-diff));
}

var randomChar = function()
{
  return Math.floor(Math.random()*(255-(0)+1)+(0));
}

var xor = [
	[[0, 0], [0]],
	[[0, 1], [1]],
	[[1, 0], [1]],
	[[1, 1], [0]]
];
var charCheck = [
  [Array.apply(null, Array(256)).map(function(k,i){return ((((i)/100)).toFixed(2)/1)}),[convertToInput(72)]],
  [Array.apply(null, Array(256)).map(function(k,i){return ((((i)/100)).toFixed(2)/1)}),[convertToInput(72),convertToInput(69),convertToInput(76),convertToInput(76),convertToInput(79)]]
];

//how it works, [0][0] = current Char, [0][1] = goal Char [1][0] = the difference needed for [0] === [1]
var hello = [72,69,76,76,79];
var test = [randomChar(),randomChar(),randomChar(),randomChar(),randomChar()]
var charCheck2 = [];

hello.forEach(function(k,i){
  charCheck2.push([[convertToInput(test[i]),convertToInput(k)],[convertToInput(getDiff(k,test[i]))]]);
});

var nn = Neural_Network(2, 1, 3, 1);
var n = Neural_Network(256,1,256,1);
var nh = Neural_Network(256,1,256,5);

var expn = Neural_Network(256,2,26,5);

var smexpn = Neural_Network(2,1,3,1);

Neural_Network_Fitness(nn, xor);

var getWeights = function(nn)
{
  var w = [];
  for(var x=1;x<nn.length;x+=1)
  {
    for(var i=0;i<nn[x].length;i+=1)
    {
      for(var k=0;k<nn[x][i].Input_Transfer_Weights.length;k+=1)
      {
        w.push(nn[x][i].Input_Transfer_Weights[k]);
      }
    }
  }
  return w;
}

var putWeights = function(nn,weights)
{
  var c = 0;
  for(var x=1;x<nn.length;x+=1)
  {
    for(var i=0;i<nn[x].length;i+=1)
    {
      for(var k=0;k<nn[x][i].Input_Transfer_Weights.length;k+=1)
      {
        nn[x][i].Input_Transfer_Weights[k] = weights[c];
        c += 1;
      }
    }
  }
}

var randomWeight = function(n)
{
  return ((Math.random()*(n-(-n))+(-n)).toFixed(2)/1);
}

var randomizeWeights = function(weights,n)
{
  for(var x=0;x<weights.length;x+=1)
  {
    weights[x] = randomWeight(n);
  }
}

var randomuUpdateNN = function(nn,n)
{
  var w = getWeights(nn);
  randomizeWeights(w,n);
  putWeights(nn,w);
  return nn;
}

var FitnessSingleCase = function(nn,c)
{
  var output = Run(nn, c[0]);
  var Fitness = {
    Pow:[],
    Char:[],
    PowTotal:0,
    PowMean:0,
    CharTotal:0,
    CharMean:0
  };
  for (var o = 0; o < output.length; o++)
  {

    Fitness.Pow.push(getFitnessPow(output[o],c[1][o]));
    Fitness.Char.push(getFitnessChar(output[o],c[1][o]));
    Fitness.PowTotal += getFitnessPow(output[o],c[1][o]);
    Fitness.CharTotal += getFitnessChar(output[o],c[1][o]);

    console.log("Goal: ",c[1][o],convertToChar(c[1][o]),String.fromCharCode(convertToChar(c[1][o])));
    console.log("Actual: ",(output[o]),convertToChar(output[o]),String.fromCharCode(convertToChar(output[o])));
    console.log("Fitness: POW: ",getFitnessPow(output[o],c[1][o])," Char: ",getFitnessChar(output[o],c[1][o]));

    output[o] = {
      Actual:
      {
        nnChar:output[o],
        charcode:convertToChar(output[o]),
        char:String.fromCharCode(convertToChar(output[o]))
      },
      Goal:
      {
        nnChar:c[1][o],
        charcode:convertToChar(c[1][o]),
        char:String.fromCharCode(convertToChar(c[1][o]))
      }
    }
  }
  Fitness.PowMean = (Fitness.PowTotal/output.length);
  Fitness.CharMean = (Fitness.CharTotal/output.length);
  return {output:output,Fitness:Fitness};
}

var difFitnessSingleCase = function(nn,c)
{
  var output = Run(nn, c[0]);
  var Fitness = {
    Pow:[],
    Char:[],
    PowTotal:0,
    PowMean:0,
    CharTotal:0,
    CharMean:0
  };
  for (var o = 0; o < output.length; o++)
  {

    Fitness.Pow.push(getFitnessPow(output[o],c[1][o]));
    Fitness.Char.push(getFitnessChar(output[o],c[1][o]));
    Fitness.PowTotal += getFitnessPow(output[o],c[1][o]);
    Fitness.CharTotal += getFitnessChar(output[o],c[1][o]);

    console.log("Goal Diff: ",c[1][o],convertToChar(c[1][o]),String.fromCharCode(convertToChar(c[1][o])));
    console.log("Actual Diff: ",(output[o]),convertToChar(output[o]),String.fromCharCode(convertToChar(output[o])));
    console.log("Goal: ",c[0][1],convertToChar(c[0][1]),String.fromCharCode(convertToChar(c[0][1])));
    console.log("Actual: ",convertDiffToActual(c[0][0],c[0][1],output[o]),convertToChar(convertDiffToActual(c[0][0],c[0][1],output[o])),String.fromCharCode(convertToChar(convertDiffToActual(c[0][0],c[0][1],output[o]))));
    console.log("Fitness: POW: ",getFitnessPow(output[o],c[1][o])," Char: ",getFitnessChar(output[o],c[1][o]));

    output[o] = {
      Actual:
      {
        nnChar:output[o],
        charcode:convertToChar(output[o]),
        char:String.fromCharCode(convertToChar(output[o]))
      },
      Goal:
      {
        nnChar:c[1][o],
        charcode:convertToChar(c[1][o]),
        char:String.fromCharCode(convertToChar(c[1][o]))
      }
    }
  }
  Fitness.PowMean = (Fitness.PowTotal/output.length);
  Fitness.CharMean = (Fitness.CharTotal/output.length);
  return {output:output,Fitness:Fitness};
}

var diffMultiCase = function(nn,cs)
{
  var outputs = [];
  for(var x=0;x<cs.length;x+=1)
  {
    console.log("Running: ",cs[x]);
    outputs.push(difFitnessSingleCase(nn,cs[x]));
  }
  return outputs;
}

var randomSingleFitnessRun = function(nn,n,c)
{
  randomuUpdateNN(nn,n);
  return FitnessSingleCase(nn,c);
}

Object.defineProperty(window,'cls',{get:function(){clear();}})

Object.defineProperty(window,'log',{set:function(val){console.log(val);}})
