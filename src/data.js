export const generateAudio = (func) => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {

        const context = new AudioContext();
        var analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.2;
        analyser.fftSize = 1024;
        analyser.minDecibels = -127;
        analyser.maxDecibels = 0;

        var filterNode = context.createBiquadFilter();
        // filterNode.type = 'highpass';
        // filterNode.frequency.value = 7000;

        var gainNode = context.createGain(); // Create a gain node to change audio volume.
        // gainNode.gain.value = 1.0;  

        const microphone = context.createMediaStreamSource(stream);
        microphone.connect(filterNode);
        filterNode.connect(gainNode);
        // microphone.connect(gainNode);
        gainNode.connect(analyser);
        analyser.connect(context.destination);

        stream.onended = () => {
            microphone.disconnect();
            gainNode.disconnect();
            filterNode.disconnect()
        }

        // Show Audio Volume
        let volumeCallback = null;
        let volumeInterval = null;
        const frequencies = new Uint8Array(analyser.frequencyBinCount);
        let raw = new Uint8Array(analyser.frequencyBinCount)
        const getData = () => {
            analyser.getByteFrequencyData(frequencies);
            analyser.getByteTimeDomainData(raw)
            func(raw) // perform operation on latest raw audio data
            console.log(raw, frequencies)
        };

        setInterval(getData, 100); // Get Data Every 100ms

    })
}


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
        data2d.push(dataArray.slice(i, i + length))
    }

    console.log(data2d)

    return data2d
}

export const test = () => {
    return "cool"
}