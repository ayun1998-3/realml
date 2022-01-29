
export const sort = (o) => {
    console.log(ML)
    const result = ML.ArrayXY.sortX(o);
    return result
}

export const generateLabels = (y) => { //generate labels

    return y.map(value => (value < 0) ? -1 : 1)
}