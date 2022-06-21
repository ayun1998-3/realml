// import * as ml5 from "https://unpkg.com/ml5@latest/dist/ml5.min.js"

const options = {                         // options for muse data, input size and layers differ from options for synthetic data
    task: 'classification',
    debug: true,
    inputs: [2, 2],
    // layers: [
    //     {
    //         type: 'conv2d',
    //         filters: 8,
    //         kernelSize: 3,
    //         strides: 1,
    //         activation: 'relu',
    //         kernelInitializer: 'varianceScaling',
    //     },
    //     {
    //         type: 'maxPooling2d',
    //         poolSize: [1, 2],
    //         strides: [1, 2],
    //     },
    //     {
    //         type: 'conv2d',
    //         filters: 16,
    //         kernelSize: 1,
    //         strides: 1,
    //         activation: 'relu',
    //         kernelInitializer: 'varianceScaling',
    //     },
    //     {
    //         type: 'flatten'
    //     },
    //     {
    //         type: 'dense',
    //         kernelInitializer: 'varianceScaling',
    //         activation: 'softmax',
    //     },
    // ]

}

// const nn = ml5.neuralNetwork(options);

export const sort = (o) => {
    console.log(ML)
    const result = ML.ArrayXY.sortX(o);
    return result

}

export const predict = (model, xActual) => { // takes in model and classes, generates predicted labels

    let yPredicted = model.predict(xActual)
    return yPredicted

}


const Batch_Size = 15
const model = tf.sequential();


export const tfTrain = (data, labels) => {

    // Define model
    model.add(tf.layers.conv1d({ inputShape: [60, 4], kernelSize: 4, filters: 8, activation: 'relu', strides: 2}))

    // model.add(tf.layers.conv2d({ inputShape: [4, 5, 12], filters: 12, kernelSize: 2, strides: 1, activation: 'relu', kernelInitializer: 'varianceScaling' }))
    // model.add(tf.layers.maxPooling2d({ poolSize: [1, 2], strides: [1, 2] }))
    // model.add(tf.layers.conv2d({ filters: 24, kernelSize: 2, strides: 1, activation: 'relu', kernelInitializer: 'varianceScaling' }))
    model.add(tf.layers.flatten())
    model.add(tf.layers.dense({ units: 2, kernelInitializer: 'varianceScaling', activation: 'sigmoid' }))
    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['accuracy'] });
    const surface = { name: 'Model Summary', tab: 'Model Inspection' };
    tfvis.show.modelSummary(surface, model)

    // Generate some synthetic data for training.
    // const xs = tf.tensor2d([1, 2, 3, 4, 6, 8, 10], [7, 1]);
    // const ys = tf.tensor2d([1, 3, 5, 7, 9, 11, 15], [7, 1]);
    // const xs = tf.randomNormal([30, 4, 5, 12])

    // Define display and metrics for evaluating training
    const metrics = ['loss', 'val_loss', 'acc', 'val_acc'];
    const container = {
        name: 'Model Training', tab: 'Model', styles: { height: '1000px' }
    };

    // data = data.map(x => x)
    // labels = labels.map(x => x)
    // shuffle(data, labels)
    console.log('data: ', data)
    console.log('label: ', labels)
    // const avg = data.map(x => {
    //     console.log(x)
    //     return x.flat(Infinity).reduce((x, y)=> x + y)}
    //     ).reduce((x, y) => x + y)/30
    // console.log(avg)
    // labels = []
    // data.forEach(x => {
    //     if (x.flat(Infinity).reduce((x, y) => x + y) > avg) labels.push([0, 1])  
    //     else labels.push([1, 0])
    // })
    // console.log(labels)


    // // console.log(data, labels)
    // const splitPoint = Math.floor(data.length * 4 / 5)
    const xs = tf.tensor3d(data)
    const ys = tf.tensor2d(labels)
    // const xs = tf.tensor4d(data.slice(0, splitPoint))
    // const ys = tf.tensor2d(labels.slice(0, splitPoint))
    // const valxs = tf.tensor4d(data.slice(splitPoint))
    // const valys = tf.tensor2d(labels.slice(splitPoint))

    const fitCallbacks = tfvis.show.fitCallbacks(container, metrics);
    // Train the model using the data.
    model.fit(xs, ys, { batchSize: Batch_Size, epochs: 60, shuffle: true, callbacks: fitCallbacks}).then(() => {
        // model.predict(tf.tensor2d([5], [1, 1])).print();
    });

}

export const tfTest = async (data) => {

    // console.log(data)
    // const testingData = tf.tensor4d(data)
    // testingData.print()
    const temp = []
    temp.push(data)
    const predictions = model.predict(tf.tensor3d(temp), {batchSize: 1});
    console.log(predictions)
    predictions.print()
    
    let results = await predictions.array()
    console.log(results)
    return results
    // console.log(predictions.argMax(-1))

}


export const generateLabels = (classifier, x) => { //takes in classifying function, generates labels

    return x.map(value => classifier(value))
}

export const generateLabels2d = (classifier, x) => {

    return x.map(sample => { //for each sample
        let i = sample.reduce((a, b) => a + b) / sample.length // calculate mean
        return classifier(i) // return classified result based on mean
    })
}

export const naiveBayes = (x, y) => {

    let model = new ML.NaiveBayes.GaussianNB()
    model.train(x, y)
    return model;
}


export const lda = (someValue) => {


}

export const pca = (dataset) => {

    const pca = new ML.PCA(dataset)
    console.log(pca.getExplainedVariance());
}

export const linReg = (x, y) => {

    const regression = new ML.SimpleLinearRegression(x, y)

    const model = predictor => regression.predict(predictor) //returns regression result based on predictor

    return model
}


// export const trainNN = (data, labels) => {
//     // data = [
//     //     {r:255, g:0, b:0, color:'red-ish'},
//     //     {r:254, g:0, b:0, color:'red-ish'},
//     //     {r:253, g:0, b:0, color:'red-ish'},
//     //     {r:0, g:255, b:0, color:'green-ish'},
//     //     {r:0, g:254, b:0, color:'green-ish'},
//     //     {r:0, g:253, b:0, color:'green-ish'},
//     //     {r:0, g:0, b:255, color:'blue-ish'},
//     //     {r:0, g:0, b:254, color:'blue-ish'},
//     //     {r:0, g:0, b:253, color:'blue-ish'}
//     //   ];

//     data = [
//         [[1, 2], [6, 3]],
//         [[4, 6], [8, 1]],
//         [[5, 4], [9, 6]],
//         [[0, 3], [5, 2]],
//         [[10, 2], [9, 9]],
//         [[8, 5], [8, 9]]
//     ]
//       data.forEach(item => {
//         // const inputs = {
//         //   r: item.r, 
//         //   g: item.g, 
//         //   b: item.b
//         // };
//         const inputs = item
//         const output = {
//         //   color: item.color
//             type: item[0][0] > 4 ? 'big' : 'small'
//         };

//         nn.addData(inputs, output);
//       });

//     // console.log(data)
//     // console.log(labels)

//     // remove zeroes from data to prepare data for nn.normalizedata
//     //AN = Needed for Audio training   // data = data.map(sample => sample.map(period => period.map(value => value + Math.random())))

//     // for (let value = 0; value < data[0][0].length; value ++) {
//     //     let isZero = true
//     //     for (let sample = 0; sample < data.length; sample ++){
//     //         for (let period = 0; period < sample.length; period ++)  {
//     //             if (data[sample][period][value] != 0) {
//     //                 isZero = false
//     //                 break;
//     //             }
//     //         }
//     //     }

//     //     if (isZero) {
//     //         for (let sample = 0; sample < data.length; sample ++){
//     //             for (let period = 0; period < sample.length; period ++)  {
//     //                 data[sample][period].splice(value, 1)
//     //             }
//     //         }
//     //     }
//     //     value--
//     // }

//     // // console.log(data)
//     // for (let i = 0; i < data.length; i++) {
//     //     // const input = data[i].flat(Infinity)

//     //     // const sumData = data[i].reduce(
//     //     //     (x, y) => {
//     //     //         let temp = []
//     //     //         for (let j = 0; j < x.length; j++) {
//     //     //             temp.push(x[j] + y[j])
//     //     //         }
//     //     //         return temp
//     //     //     }
//     //     // )

//     //     // const avgData = sumData.map(x => x / data[i].length)
//     //     // console.log(input)
//     //     // console.log('input', input)
//     //     const input = data[i].flat(1)
//     //     const output = { type: labels[i] }
//     //     console.log('input:', data[i])
//     //     nn.addData(input, output)
//     // }

//     nn.normalizeData()

//     console.log(nn.neuralNetworkData.data)


//     //delete NaNs
//     // nn.data.training = nn.data.training.map(sample => {
//     //     let arrayValues = []
//     //     for (const value in sample.xs) {
//     //         arrayValues.push(sample.xs[value])
//     //     }
//     //     console.log(arrayValues)
//     //     arrayValues = arrayValues.filter(value => !Number.isNaN(value))
//     //     console.log(arrayValues)

//     //     let temp = sample
//     //     temp.xs = {}
//     //     arrayValues.forEach((value, ind) => {
//     //         console.log(ind)
//     //         ind = ind.toString()

//     //         temp.xs[ind] = value}
//     //         )
//     //     console.log(temp)
//     //     return temp
//     // })

//     console.log(nn.data.training)


//     const trainingOptions = {
//         epochs: 10,
//         batchSize: 3
//     }

//     function doneTraining() {
//         // nn.save('model', () => {console.log('model saved')})
//         console.log('done!');
//     }
//     nn.train(trainingOptions, doneTraining);
// }

// export const testNN = (data) => {


//     // console.log(nn.neuralNetwork)
//     // console.log(data)
//     // let input = data.map(period => period.map(value => value + Math.random()))
//     // FOR AUDIO TESTING ONLY
//     /*    const sumData = data.reduce(
//             (x, y) => {
//                 let temp = []
//                 for (let j = 0; j < x.length; j++) {
//                     temp.push(x[j] + y[j])
//                 }
//                 return temp
//             }
//         )

//         const avgData = sumData.map(x => x / data.length)
//         const input = avgData 
//     */
//     // let input = data.map(channel => channel.map(feature => {
//     //     console.log(feature)
//     //     const max = Math.max(...feature)
//     //     const min = Math.min(...feature)
//     //     console.log(max, min)
//     //     return feature.map(sample => (sample - min) / (max - min))
//     // }
//     // ))

//     // const input = data.flat(1).map(sample => sample.map(value => Math.abs(value)))
//     const input  = [[8, 12], [0, 3]]
//     // const input = [[[[1, 2],[1, 2]],[[1, 2],[1, 2]],[[1, 2],[1, 2]]],[[[1, 2],[1, 2]],[[1, 2],[1, 2]],[[1, 2],[1, 2]]],[[[1, 2],[1, 2]],[[1, 2],[1, 2]],[[1, 2],[1, 2]]]]
//     // console.log(input.length, input[0].length, input[0][0].length)
//     // const input = {
//     //     r: 255, 
//     //     g: 0, 
//     //     b: 0
//     //   }
//     console.log(nn)
//     console.log(input)
//     nn.classify(input, handleResults)   // error here


// }


// function handleResults(error, result) {
//     if (error) {
//         console.error(error);
//         return;
//     }

//     const confidences = result.map(type => type.confidence)
//     const maxPossibility = Math.max(...confidences)
//     console.log(result) // {label: 'red', confidence: 0.8}

//     let p = document.createElement('p')
//     document.body.insertAdjacentElement('beforeend', p)

//     if (maxPossibility > 0.6) {

//         let prediction = result[confidences.indexOf(maxPossibility)].label
//         console.log(prediction); // prints label of result with highest confidence

//         p.innerHTML = `Prediction: ${prediction} \n Confidence: ${maxPossibility}`

//     }

//     else {
//         p.innerHTML = 'Not Sure'
//     }
// }


// export const loadModel = async () => {
//     // const modelDetails = {
//     //     model: './model.json',
//     //     metadata: './model_meta.json',
//     //     weights: './model.weights.bin'
//     // }
//     await nn.load('./model.json', () => { console.log('Model loaded') })
// }


function shuffle(array1, array2) {
    let currentIndex = array1.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array1[currentIndex], array1[randomIndex]] = [
            array1[randomIndex], array1[currentIndex]];
        [array2[currentIndex], array2[randomIndex]] = [
            array2[randomIndex], array2[currentIndex]];

    }

    return array1, array2;
}