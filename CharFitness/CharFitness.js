var NeuralNetwork = require('./../NeuralNetwork/NeuralNetwork');

module.exports = function()
{
  var _cases = []
    , _num_input_neurons = 2
    , _num_hidden_layers = 1
    , _num_hidden_neurons = 3
    , _num_output_neurons = 2
    , _weight_ratio = 1
    , _weights = []
    , _neuralNetwork = null
    , _neuralNetworkLib = NeuralNetwork()
    , _fitness = [];

  function CharFitness()
  {
    _fitness = [];
    var caseFitness = {};
    if(!_neuralNetwork)
    {
      CharFitness.createOrUpdateNeuralNetwork();
    }
    for(var x=0;x<_cases.length;x+=1)
    {
      caseFitness = CharFitness.runCase(_cases[x]);
      _fitness.push(caseFitness);
      // possible update case ?
      _cases[x][0][0] = caseFitness.output.outputValue.nnChar;
      _cases[x][1][(_cases[x][1].length-1)] = CharFitness.getDiff(caseFitness.output.goalValue.charCode,caseFitness.output.outputValue.charCode);
    }
    return _fitness;
  }

  CharFitness.numInputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_input_neurons;
    }
    _num_input_neurons = (typeof v === 'number' ? v : _num_input_neurons);
    return CharFitness;
  }

  CharFitness.numHiddenLayers = function(v)
  {
    if(v === undefined)
    {
      return _num_hidden_layers;
    }
    _num_hidden_layers = (typeof v === 'number' ? v : _num_hidden_layers);
    return CharFitness;
  }

  CharFitness.numHiddenNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_hidden_neurons;
    }
    _num_hidden_neurons = (typeof v === 'number' ? v : _num_hidden_neurons);
    return CharFitness;
  }

  CharFitness.numOutputNeurons = function(v)
  {
    if(v === undefined)
    {
      return _num_output_neurons;
    }
    _num_output_neurons = (typeof v === 'number' ? v : _num_output_neurons);
    return CharFitness;
  }

  CharFitness.weightRatio = function(v)
  {
    if(v === undefined)
    {
      return _weight_ratio;
    }
    _weight_ratio = (typeof v === 'number' ? v : _weight_ratio);
    return CharFitness;
  }

  CharFitness.convertInputToCharCode = function(input_value)
  {
    return Math.round((input_value)*100);
  }

  CharFitness.convertCharCodeToInput = function(char_code)
  {
    return (char_code/100);
  }

  CharFitness.convertInputToChar = function(input_value)
  {
    return String.fromCharCode(CharFitness.convertInputToCharCode(input_value));
  }

  CharFitness.convertFromCharToInput = function(char_string)
  {
    return CharFitness.convertCharCodeToInput(char_string.charCodeAt(0));
  }

  CharFitness.getPowerFitness = function(output_value,goal_value)
  {
    return Math.pow(output_value - goal_value, 2);
  }

  CharFitness.getCharFitness = function(output_value,goal_value)
  {
    return ((CharFitness.convertInputToCharCode(output_value) - CharFitness.convertInputToCharCode(goal_value)) * (CharFitness.convertInputToCharCode(output_value) - CharFitness.convertInputToCharCode(goal_value)));
  }

  CharFitness.getDiff = function(goal_value,input_value)
  {
    return (goal_value > input_value ? (goal_value - input_value) : (input_value - goal_value));
  }

  CharFitness.convertOutputFromDiffToValue = function(input_value,goal_value,output_value)
  {
    return (goal_value > input_value ? (input_value+output_value) : (input_value-output_value));
  }

  CharFitness.randomValueBetween = function(min,max,round)
  {
    var rand = (Math.random()*(max-(min))+(min));
    return (round ? Math.round(rand) : rand);
  }

  CharFitness.randomChar = function()
  {
    return String.fromCharCode(CharFitness.randomValueBetween(0,255,true));
  }

  CharFitness.randomCharCode = function()
  {
    return CharFitness.randomValueBetween(0,255,true);
  }

  CharFitness.randomInput = function()
  {
    CharFitness.randomValueBetween(0,CharFitness.convertCharCodeToInput(255));
  }

  CharFitness.cases = function()
  {
    return _cases;
  }

  CharFitness.clearCases = function()
  {
    _cases = [];
  }

  CharFitness.addCase = function(input_charcode,goal_charcode)
  {
    var diff = CharFitness.getDiff(goal_charcode,input_charcode);
    _cases.push([
      [
        CharFitness.convertCharCodeToInput(input_charcode),
        CharFitness.convertCharCodeToInput(goal_charcode)
      ],
      [
        CharFitness.convertCharCodeToInput(diff)
      ]]);
  }

  CharFitness.createOrUpdateNeuralNetwork = function()
  {
    _neuralNetworkLib.numInputNeurons(_num_input_neurons)
    .numHiddenLayers(_num_hidden_layers)
    .numHiddenNeurons(_num_hidden_neurons)
    .numOutputNeurons(_num_output_neurons)
    .weightRatio(_weight_ratio);
    _neuralNetwork = _neuralNetworkLib();
    _weights = _neuralNetworkLib.getWeights();
    return CharFitness;
  }

  CharFitness.weights = function()
  {
    return _weights;
  }

  CharFitness.randomWeights = function()
  {
    _neuralNetworkLib.randomizeWeights();
  }

  CharFitness.updateWeights = function(weights)
  {
    _neuralNetworkLib.putWeights(weights);
  }

  CharFitness.runCase = function(single_case)
  {
    var currentFitness = {
      output:
      {
        outputDiff:
        {
          nnChar:0,
          charCode:0,
          char:''
        },
        outputValue:
        {
          nnChar:0,
          charCode:0,
          char:''
        },
        goalDiff:
        {
          nnChar:0,
          charCode:0,
          char:''
        },
        goalValue:
        {
          nnChar:0,
          charCode:0,
          char:''
        }
      },
      Pow:[],
      Char:[],
      PowTotal:0,
      PowMean:0,
      CharTotal:0,
      CharMean:0
    }
      , output = _neuralNetworkLib.update(single_case[0]).output();
    for (var x=0; x < output.length; x+=1)
    {
      currentFitness.Pow.push(CharFitness.getPowerFitness(output[x],single_case[1][x]));
      currentFitness.Char.push(CharFitness.getCharFitness(output[x],single_case[1][x]));
      currentFitness.PowTotal += CharFitness.getPowerFitness(output[x],single_case[1][x]);
      currentFitness.CharTotal += CharFitness.getCharFitness(output[x],single_case[1][x]);

      currentFitness.output.goalDiff.nnChar = single_case[1][x];
      currentFitness.output.goalDiff.charCode = CharFitness.convertInputToCharCode(single_case[1][x]);
      currentFitness.output.goalDiff.char = CharFitness.convertInputToChar(single_case[1][x]);

      currentFitness.output.outputDiff.nnChar = output[x];
      currentFitness.output.outputDiff.charCode = CharFitness.convertInputToCharCode(output[x]);
      currentFitness.output.outputDiff.char = CharFitness.convertInputToChar(output[x]);

      currentFitness.output.goalValue.nnChar = single_case[0][(single_case[0].length-1)];
      currentFitness.output.goalValue.charCode = CharFitness.convertInputToCharCode(single_case[0][(single_case[0].length-1)]);
      currentFitness.output.goalValue.char = CharFitness.convertInputToChar(single_case[0][(single_case[0].length-1)]);

      currentFitness.output.outputValue.nnChar = CharFitness.convertOutputFromDiffToValue(single_case[0][x],single_case[0][(single_case[0].length-1)],output[x]);
      currentFitness.output.outputValue.charCode = CharFitness.convertInputToCharCode(currentFitness.output.outputValue.nnChar);
      currentFitness.output.outputValue.char = CharFitness.convertInputToChar(currentFitness.output.outputValue.nnChar);

      /*
      console.log("Goal Diff: ",c[1][o],convertToChar(c[1][o]),String.fromCharCode(convertToChar(c[1][o])));
      console.log("Actual Diff: ",(output[o]),convertToChar(output[o]),String.fromCharCode(convertToChar(output[o])));
      console.log("Goal: ",c[0][1],convertToChar(c[0][1]),String.fromCharCode(convertToChar(c[0][1])));
      console.log("Actual: ",convertDiffToActual(c[0][0],c[0][1],output[o]),convertToChar(convertDiffToActual(c[0][0],c[0][1],output[o])),String.fromCharCode(convertToChar(convertDiffToActual(c[0][0],c[0][1],output[o]))));
      console.log("Fitness: POW: ",getFitnessPow(output[o],c[1][o])," Char: ",getFitnessChar(output[o],c[1][o]));
      */
    }
    currentFitness.PowMean = (currentFitness.PowTotal/output.length);
    currentFitness.CharMean = (currentFitness.CharTotal/output.length);
    return currentFitness;
  }

  return CharFitness;
}
