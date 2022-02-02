
export const sort = (o) => {
    console.log(ML)
    const result = ML.ArrayXY.sortX(o);
    return result
}

export const predict = (model, yActual) => { // takes in model and classes, generates predicted labels

    return yActual.map(y => model(y))
}



export const generateLabels = (classifier, y) => { //takes in classifying function, generates labels

    return y.map(value => classifier(value))
}



export const lda = (someValue) => {


}

export const linReg = (x, y) => {

    const regression = new ML.SimpleLinearRegression(x, y)

    const model = predictor => regression.predict(predictor) //returns regression result based on predictor

    return model
}