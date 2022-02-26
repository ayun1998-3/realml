export const timer = (duration, frequency = 1) => { //duration of countdown in seconds, frequency of display per second
   
    let t = duration
    let countdown = setInterval( () => {
        console.log(t);
        t -= (1 / frequency);
        if (t === 0) {
            clearInterval(countdown)
        }
        }, 1000/frequency)


}