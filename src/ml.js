// import * as ml5 from "https://unpkg.com/ml5@latest/dist/ml5.min.js"

const options = {
    task: 'classification',
    // inputs: [9, 20],
    debug: true
}

let nn = ml5.neuralNetwork(options);
nn.load('C:\Users\auste\Downloads\model.weights.bin', () => { console.log('Model loaded') })

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

export const pca = (dataset) => {

    const pca = new ML.PCA(dataset)
    console.log(pca.getExplainedVariance());
}

export const linReg = (x, y) => {

    const regression = new ML.SimpleLinearRegression(x, y)

    const model = predictor => regression.predict(predictor) //returns regression result based on predictor

    return model
}


export const trainNN = (data, labels) => {

    console.log(data)
    console.log(labels)

    // remove zeroes from data to prepare data for nn.normalizedata
    data = data.map(sample => sample.map(period => period.map(value => value + Math.random())))

    // for (let value = 0; value < data[0][0].length; value ++) {
    //     let isZero = true
    //     for (let sample = 0; sample < data.length; sample ++){
    //         for (let period = 0; period < sample.length; period ++)  {
    //             if (data[sample][period][value] != 0) {
    //                 isZero = false
    //                 break;
    //             }
    //         }
    //     }

    //     if (isZero) {
    //         for (let sample = 0; sample < data.length; sample ++){
    //             for (let period = 0; period < sample.length; period ++)  {
    //                 data[sample][period].splice(value, 1)
    //             }
    //         }
    //     }
    //     value--
    // }

    console.log(data)
    for (let i = 0; i < data.length; i++) {
        // const input = data[i].flat(Infinity)

        const sumData = data[i].reduce(
            (x, y) => {
                let temp = []
                for (let j = 0; j < x.length; j++) {
                    temp.push(x[j] + y[j])
                }
                return temp
            }
        )

        const avgData = sumData.map(x => x / data[i].length)
        const input = avgData
        console.log(input)
        // console.log('input', input)
        const output = {type: labels[i]}
        nn.addData(input, output)
    }


    console.log(nn.neuralNetworkData.data)

    nn.normalizeData()
    console.log(nn.data.training)


    //delete NaNs
    // nn.data.training = nn.data.training.map(sample => {
    //     let arrayValues = []
    //     for (const value in sample.xs) {
    //         arrayValues.push(sample.xs[value])
    //     }
    //     console.log(arrayValues)
    //     arrayValues = arrayValues.filter(value => !Number.isNaN(value))
    //     console.log(arrayValues)

    //     let temp = sample
    //     temp.xs = {}
    //     arrayValues.forEach((value, ind) => {
    //         console.log(ind)
    //         ind = ind.toString()
            
    //         temp.xs[ind] = value}
    //         )
    //     console.log(temp)
    //     return temp
    // })

    console.log(nn.data.training)


    const trainingOptions = {
        epochs: 32,
        batchSize: 12

    }
    function doneTraining() {
        console.log('done!');
        console.log(nn.model)

      }    
    nn.train(trainingOptions, doneTraining);

    nn.save('model', () => {console.log('model saved')})

    
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
    
    const confidences = result.map(type => type.confidence)
    const maxPossibility = Math.max(...confidences)
    console.log(result) // {label: 'red', confidence: 0.8}

    let p = document.createElement('p')
    document.body.insertAdjacentElement('beforeend', p)

    if (maxPossibility > 0.7) {

        let prediction = result[confidences.indexOf(maxPossibility)].label
        console.log(prediction); // prints label of result with highest confidence

        p.innerHTML = `Prediction: ${prediction} \n Confidence: ${maxPossibility}`

    }

    else{
        p.innerHTML = 'Not Sure'
    }
}  

export const testNN = (data) => {

    // console.log(data)
    // let input = data.map(period => period.map(value => value + Math.random()))

    const sumData = data.reduce(
        (x, y) => {
            let temp = []
            for (let j = 0; j < x.length; j++) {
                temp.push(x[j] + y[j])
            }
            return temp
        }
    )

    const avgData = sumData.map(x => x / data.length)
    const input = avgData
      // testing data
    // console.log(input)
    // const flatInput = input.flat(Infinity)
    // console.log(flatInput)

    nn.classify(input, handleResults)


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