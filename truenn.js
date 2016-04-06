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
	Hidden_Or_Output_Neuron.Output = Hidden_Or_Output_Neuron.Bias;
	for (var n = 0; n < Previous_Layer.length; n++)
		Hidden_Or_Output_Neuron.Output += Previous_Layer[n].Output * Hidden_Or_Output_Neuron.Input_Transfer_Weights[n];
};
function Activate (Hidden_Or_Output_Neuron) {
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

var xor = [
	[[0, 0], [0]],
	[[0, 1], [1]],
	[[1, 0], [1]],
	[[1, 1], [0]]
];
var charCheck = [
  [Array.apply(null, Array(256)).map(function(k,i){return ((((i)/100)).toFixed(2)/1)}),[convertToInput(72)]],
  [Array.apply(null, Array(256)).map(function(k,i){return ((((i)/100)).toFixed(2)/1)}),[convertToInput(72),convertToInput(69),convertToInput(76),convertToInput(76),convertToInput(76)]]
];
var nn = Neural_Network(2, 1, 3, 1);
var n = Neural_Network(256,1,256,1);
var nh = Neural_Network(256,1,256,5);
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

var updateNN = function(nn,n)
{
  var w = getWeights(nn);
  randomizeWeights(w,n);
  putWeights(nn,w);
  return nn;
}

var FitnessSingleCase = function(nn,c)
{
  var output = Run(nn, c[0]);
		var output_error = 0;
        var closest = 0;
		for (var o = 0; o < output.length; o++)
        {
          output_error += Math.pow(((output[o].toFixed(2))/1) - c[1][o], 2);
        }
		return [c[1][0],convertToChar(c[1][0]),String.fromCharCode(convertToChar(c[1][0])),(output_error / output.length),output[0],convertToChar(output[0]),String.fromCharCode(convertToChar(output[0])),((convertToChar(output[0]) - convertToChar(c[1][0])) * (convertToChar(output[0]) - convertToChar(c[1][0]))),output];
}

var randomFitnessRun = function(nn,n,c)
{
  updateNN(nn,n);
  return FitnessSingleCase(nn,c);
}

Object.defineProperty(window,'cls',{get:function(){clear();}})

Object.defineProperty(window,'log',{set:function(val){console.log(val);}})
