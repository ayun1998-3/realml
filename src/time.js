export const timer = (duration, display = true, frequency = 1) => { //duration of countdown in seconds, frequency of display per second, whether countdown is displayed

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