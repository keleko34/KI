// Layer Object
// ------------
var layer = function layer() {
	this._neurons = [];
};

_.extend(layer.prototype, {
	parse: function(input) {
		var result = [];
		// For all neurons, ...
		for(var i = 0, len = this._neurons.length; i < len; i++) {
			// Push a result value to an output array.
			result[i] = this._neurons[i].parse(input);
		}
		return result;
	}

});

// Neuron Object
// -------------
var neuron = function neuron() {
	// Weights array.
	this.weights = [];
	// this.bias = Math.floor(Math.random() * (10 - (-10) + 1) + (-10));
	this.bias = 1;

	// Variables for backpropagation.
	this.input = [];
	this.output = 0;
	this.deltas = [];
	this.previousDeltas = [];
	this.gradient = 0;
	this.momentum = 0.7;
};

_.extend(neuron.prototype, {
	parse: function(input) {
		var sum = 0;
		// Cycle through each input and multiply it by a weight value.
		// bias + sigma(input * weight)
		for(var i = 0, len = input.length; i < len; i++) {
			// If no weight to handle current input,
			// then create a new random weight.
			if(!this.weights[i]) {
				this.weights[i] = (function(min,max) {
				    return Math.floor(Math.random()*(max-min+1)+min);
				})(-1, 1);
			}
			// Sum up the weights.
			sum += input[i] * this.weights[i];
		}
		// Add the bias.
		sum += this.bias;
		this.input = sum;
		// Sigmoid activation function.
		return this.output = (function(input) {
					return ( 1 / (1 + Math.exp(-1 * input)) );
				})(sum);
	}

});


// Network Object
// --------------
var network = function(neurons, options) {
	if(!(this instanceof network)) return new network(neurons, options);
	// Set default options.
	this.options = _.defaults((options || {}), {
		iterations: 5000,
		learningRate: 0.3,
        momentum: 0.9
	});
	// Initialize network.
	if(!neurons) neurons = [2, 1]; // Single layer with 2 neurons and 1 output neuron.
	this.initialize(neurons);
};

_.extend(network.prototype, {
	initialize: function(neurons) {
		try {
			if(!Array.isArray(neurons)) neurons = [neurons];
			// Create layers array.
			this._layers = new Array(neurons.length);
			// For each layer, ...
			for(var i = 0, len = neurons.length; i < len; i++) {
				// Initialize
				this._layers[i] = new layer();
				// Populate with n new neurons.
				for(j = 0; j < neurons[i]; j++) {
					this._layers[i]._neurons.push(new neuron());
				}
			}
		} catch(e) {
			console.log("Error:", e.stack);
		}
	},

	input: function(input) {
		try {
			// Force array type.
			if(!Array.isArray(input)) input = [input];
			// Clone input so as not to mess with original array.
			var result = input.slice();
			// Pass input into first layer.
			// And then the result of that layer into each subsequent layer.
			for(var i = 0, len = this._layers.length; i < len; i++) {
				result = this._layers[i].parse(result);
			}

			// console.log(result);
			return result;

		} catch(e) {
			console.log("Error:", e.stack);
		}
	},


	train: function(inputs, ideals) {
		var err = 1, index;
		// Cycle through inputs and ideal values to train network
		// and avoid problem of "catastrophic forgetting"
		for(var i = 0; err > 0.0001; i++) {
			index = i % inputs.length;
			err = this._iteration(inputs[index], ideals[index]);
		} // End of an epoch.
	},

	_iteration: function(input, ideal) {
		try {
			var i, j, k, previous, error, sigErr;
			var neuron, output;

			// Run the network to populate output values.
			this.input(input);

			// Begin backpropagation.

			sigErr = 0.0;

			// Starting from the last layer and working backward, calculate gradients.
			for(i = this._layers.length-1; i >= 0; i--) {
				// If there isn't a next layer, then this is the last layer.
				// In which case, use the ideal values rather than the error
				// of the previous layer.
				if(!this._layers[i+1]) {
					// Cycle through output neurons and calculate their gradients.
					for(j = 0; j < this._layers[i]._neurons.length; j++) {
						neuron = this._layers[i]._neurons[j];
						output = neuron.output;
						// Delta for output neurons is simply the derivative of the
						// activation function multiplied by the difference between
						// the ideal values and the actual output values.
						neuron.gradient = output * (1 - output) * (ideal[j] - output);
						// Calculate total error.
						sigErr += Math.pow((ideal[j] - output), 2);
					}
				}
				// Else, the layer is not the last layer, and its error will
				// require more work to calculate.
				else {
					// Cycle through each neuron in the hidden layers, ...
					for(j = 0; j < this._layers[i]._neurons.length; j++) {
						neuron = this._layers[i]._neurons[j];
						output = neuron.output;
						// The index of this neuron is j.
						// Therefore, the corresponding weights in each neuron
						// will also be at index j.
						error = 0.0;
						// So for every neuron in the following layer, get the
						// weight corresponding to this neuron.
						for(k = 0; k < this._layers[i+1]._neurons.length; k++) {
							// And multiply it by that neuron's gradient
							// and add it to the error calculation.
							error += this._layers[i+1]._neurons[k].weights[j] * this._layers[i+1]._neurons[k].gradient;
						}
						// Once you have the error calculation, multiply it by
						// the derivative of the activation function to get
						// the gradient of this neuron.
						neuron.gradient = output * (1 - output) * error;
					}
				}
			}
			// Once all gradients are calculated, work forward and calculate
			// the new weights. w = w + (lr * df/de * in)
			for(i = 0; i < this._layers.length; i++) {
				// For each neuron in each layer, ...
				for(j = 0; j < this._layers[i]._neurons.length; j++) {
					neuron = this._layers[i]._neurons[j];
					// Modify the bias.
					neuron.bias += this.options.learningRate * neuron.gradient;
					// For each weight, ...
					for(k = 0; k < neuron.weights.length; k++) {
						// Modify the weight by multiplying the weight by the
						// learning rate and the input of the neuron preceding.
						// If no preceding layer, then use the input layer.
						neuron.deltas[k] = this.options.learningRate * neuron.gradient * (this._layers[i-1] ? this._layers[i-1]._neurons[k].output : input[k]);
						neuron.weights[k] += neuron.deltas[k];
						neuron.weights[k] += this.options.momentum * neuron.previousDeltas[k];
					}
					// Set previous delta values.
					neuron.previousDeltas = neuron.deltas.slice();
				}
			}

			return sigErr;

		} catch(e) {
			console.log("Error:", e.stack);
		}
	}


});




// Implementation
var a = new network([2,2,1]);
var output;

a.train([[0,0], [0,1], [1,0], [1,1]], [[0], [1], [1], [0]]);

document.getElementById('one').innerHTML=a.input([0,0]);
document.getElementById('two').innerHTML=a.input([1,0]);
document.getElementById('three').innerHTML=a.input([0,1]);
document.getElementById('four').innerHTML=a.input([1,1]);


