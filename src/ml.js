import * as ml5 from "https://unpkg.com/ml5@latest/dist/ml5.min.js"

export const sort = (o) => {
    console.log(ML)
    const result = ML.ArrayXY.sortX(o);
    return result
}

export const predict = (model, xActual) => { // takes in model and classes, generates predicted labels

    let yPredicted = model.predict(xActual)
    return yPredicted
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

export const pca = (x, y) => {

    const pca = new ML.PCA(dataset)
}

export const linReg = (x, y) => {

    const regression = new ML.SimpleLinearRegression(x, y)

    const model = predictor => regression.predict(predictor) //returns regression result based on predictor

    return model
}

export const trainNN = (data) => {

    const options = {
        task: 'classification',
        debug: true
    }

    const nn = ml5.neuralNetwork(options);

    data.forEach(sample => {

        const input = [] // input data
        const output = []// classification
        nn.addData(input, output)

    })


    nn.normalizeData()

    const trainingOptions = {
        epochs: 32,
        batchSize: 12
    }
    nn.train(trainingOptions, finishedTraining);
    
}

function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    console.log(result); // {label: 'red', confidence: 0.8};
}

export const testNN = (data) => {

    const inputs; // testing data
    nn.classify(inputs, handleResults);

    // stuff to calculate accuracy?

}
