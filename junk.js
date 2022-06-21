{ onEpochEnd: e }]: r.whileTraining = [{ onEpochEnd: e }], this.neuralNetworkData.isMetadataReady || this.createMetaData(this.neuralNetworkData.data.raw), this.neuralNetworkData.isWarmedUp || this.prepareForTraining(this.neuralNetworkData.data.raw), !r.inputs && !r.outputs) { var i = this.convertTrainingDataToTensors(), o = i.inputs, a = i.outputs; r.inputs = o, r.outputs = a } this.neuralNetwork.isLayered
    || (this.options.layers = this.createNetworkLayers(this.options.layers, this.neuralNetworkData.meta)),
    this.neuralNetwork.isLayered || (this.options.layers = this.addDefaultLayers(this.options.task, this.neuralNetworkData.meta)),
    this.neuralNetwork.isCompiled || this.compile(), this.neuralNetwork.train(r, n)}}, { key: "addLayer", value: function(t) { this.neuralNetwork.addLayer(t) } },
{
    key: "createNetworkLayers", value: function(t, e) {
        var n = this, r = Or()(t), i = Object.assign({}, e), o = i.inputUnits, a = i.outputUnits, s = r.length; if (!(r.length >= 2)) return !1;
        r[0].inputShape = r[0].inputShape ? r[0].inputShape : o; var u = r[s - 1]; return u.units = u.units ? u.units : a, r.forEach(function (t) { n.addLayer(p.layers[t.type](t)) }), r
    }
},
{
    key: "addDefaultLayers", value: function(t, e) {
        var n; switch (t.toLowerCase()) {
            case "classification": return n = [{ type: "dense", units: this.options.hiddenUnits, activation: "relu" },
            { type: "dense", activation: "softmax" }], this.createNetworkLayers(n, e); case "regression": return n = [{ type: "dense", units: this.options.hiddenUnits, activation: "relu" }, { type: "dense", activation: "sigmoid" }],
                this.createNetworkLayers(n, e); case "imageclassification": return n = [{ type: "conv2d", filters: 8, kernelSize: 5, strides: 1, activation: "relu", kernelInitializer: "varianceScaling" },
                { type: "maxPooling2d", poolSize: [2, 2], strides: [2, 2] }, { type: "conv2d", filters: 16, kernelSize: 5, strides: 1, activation: "relu", kernelInitializer: "varianceScaling" }, { type: "maxPooling2d", poolSize: [2, 2], strides: [2, 2] },
                { type: "flatten" }, { type: "dense", kernelInitializer: "varianceScaling", activation: "softmax" }], this.createNetworkLayers(n, e); default: return console.log("no imputUnits or outputUnits defined"), n = [{ type: "dense", units: this.options.hiddenUnits, activation: "relu" }, { type: "dense", activation: "sigmoid" }], this.createNetworkLayers(n, e)
        }
    }
},
{
    key: "compile", value: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null, e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, n = null === e ? this.options.learningRate : e, r = {};
        null !== t ? r = pi({}, t) : "classification" === this.options.task || "imageClassification" === this.options.task ? r = { loss: "categoricalCrossentropy", optimizer: p.train.sgd, metrics: ["accuracy"] } : "regression" === this.options.task && (r = { loss: "meanSquaredError", optimizer: p.train.adam, metrics: ["accuracy"] }), r.optimizer = r.optimizer ? this.neuralNetwork.setOptimizerFunction(n, r.optimizer) : this.neuralNetwork.setOptimizerFunction(n, p.train.sgd), this.neuralNetwork.compile(r), this.options.debug && this.neuralNetworkVis.modelSummary({ name: "Model Summary" }, this.neuralNetwork.model)
    }
},
{ key: "predictSync", value: function(t) { return this.predictSyncInternal(t) } }, { key: "predict", value: function(t, e) { return C(this.predictInternal(t), e) } }