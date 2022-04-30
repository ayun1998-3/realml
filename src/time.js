export const timer = (duration, display = false, frequency = 1) => { //duration of countdown in seconds,  whether countdown is displayed, frequency of display per second

    let t = duration
    return new Promise((resolve, reject) => {

        if (display) console.log(t)

        let countdown = setInterval(() => {

            t -= (1 / frequency);

            if (t === 0) {
                clearInterval(countdown)
                resolve()
            }
            else if (display) {
                console.log(t)
            }
            
        }, 1000 / frequency)
    })


}