
export const simulate = (func) => { //simulates data stream
    // func is a function that takes an Array

    let dataValues = [];

    let animate = () => {
        let x = Date.now()
        let val = Math.sin(x) //synthetic wave data

        dataValues.push(val) //populates array with data stream
        func(dataValues);

        setTimeout(animate, 1000)
    }

    animate()
    
}

export const generate = (func, dataArray) => { // takes an array and returns generated data

    let results = dataArray.map(val => func(val))
    return results

}

export const generate2d = (func, dataArray, length) => { // takes an array and return 2d generated data

    dataArray = dataArray.map(val => func(val))
    let data2d = []
    for (let i = 0; i < dataArray.length; i += length) {
        data2d.push(dataArray.slice(i, i+length))
    }

    console.log(data2d)

    return data2d
}

export const test = () => {
    return "cool"
}