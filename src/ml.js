// import * as ml5 from "https://unpkg.com/ml5@latest/dist/ml5.min.js"

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

let nn;

export const trainNN = (data, labels) => {

    const options = {
        task: 'classification',
        debug: true
    }

    nn = ml5.neuralNetwork(options);

    // data.forEach(sample => {

    //     const input = [] // input data
    //     const output = []  // classification
    //     nn.addData(input, output)

    // })

    console.log(data)
    console.log(labels)

    for (let i = 0; i < data.length; i++) {
        const input = data[i]
        const output = {type: labels[i]}
        nn.addData(input, output)
    }


    console.log(nn.data)
    nn.normalizeData()
    console.log(nn.data.training)

    const trainingOptions = {
        epochs: 32,
        batchSize: 12
    }
    nn.train(trainingOptions);
    
    // function finishedTraining(){
    //     classify();
    //   }
      
    //   // Step 8: make a classification
    //   function classify(){
    //     const input = {

    //     }
    //     nn.classify(input, handleResults);
    //   }
}


function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    
    if (Math.abs(result[0].confidence - result[1].confidence) > 0.35) {
    console.log((result[0].confidence > result[1].confidence) ? result[0].label : result[1].label);
    console.log(result) // {label: 'red', confidence: 0.8};
    }
}  

export const testNN = (data) => {

    const input = data // testing data
    nn.classify(input, handleResults)

    // stuff to calculate accuracy?


}


// // // Tutorial

// // Step 1: load data or create some data 
// const data = [
//     {r:255, g:0, b:0, color:'red-ish'},
//     {r:254, g:0, b:0, color:'red-ish'},
//     {r:253, g:0, b:0, color:'red-ish'},
//     {r:0, g:255, b:0, color:'green-ish'},
//     {r:0, g:254, b:0, color:'green-ish'},
//     {r:0, g:253, b:0, color:'green-ish'},
//     {r:0, g:0, b:255, color:'blue-ish'},
//     {r:0, g:0, b:254, color:'blue-ish'},
//     {r:0, g:0, b:253, color:'blue-ish'}
//   ];
  
//   // Step 2: set your neural network options
//   const options = {
//     task: 'classification',
//     debug: true
//   }
  
//   // Step 3: initialize your neural network
//   const nn = ml5.neuralNetwork(options);
  
//   // Step 4: add data to the neural network
//   data.forEach(item => {
//     const inputs = {
//       r: item.r, 
//       g: item.g, 
//       b: item.b
//     };
//     // const inputs = [Math.random()*255,  0, Math.random()*255]
//     const output = {
//       color: item.color
//     };
  
//     nn.addData(inputs, output);
//   });
  
//   // Step 5: normalize your data;
//   nn.normalizeData();
//   console.log(nn.data.training)
  
//   // Step 6: train your neural network
//   const trainingOptions = {
//     epochs: 32,
//     batchSize: 12
//   }
//   nn.train(trainingOptions, finishedTraining);
  
//   // Step 7: use the trained model
//   function finishedTraining(){
//     classify();
//   }
  
//   // Step 8: make a classification
//   function classify(){
//     const input = {
//       r: 255, 
//       g: 0, 
//       b: 0
//     }
//     nn.classify(input, handleResults);
//   }
  
//   // Step 9: define a function to handle the results of your classification
//   function handleResults(error, result) {
//       if(error){
//         console.error(error);
//         return;
//       }
//       console.log(result); // {label: 'red', confidence: 0.8};
//   } 