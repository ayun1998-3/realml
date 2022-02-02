
export const sort = (o) => {
    console.log(ML)
    const result = ML.ArrayXY.sortX(o);
    return result
}

export const generateLabels = (y, func) => { //takes in classifying function, generates labels

    return y.map(value => func(value))
}