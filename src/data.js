
export const simulate = (func) => { //simulates data stream
    // func is a function that takes an Array

    let dataValues = [];

    let animate = () => {
        let x = Date.now()
        let val = Math.sin(x) //synthetic wave data

        dataValues.push(val)
        func(dataValues);

        setTimeout(animate, 1000)
    }

    animate()
    
}

export const generate = (dataArray) => { // takes an array and returns generated data

    let results = dataArray.map(val => Math.sin(val))
    return results

}

export const test = () => {
    return "cool"
}