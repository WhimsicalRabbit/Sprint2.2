const throttle = (fn: Function, ms: number = 1000) => {
    let shouldWait = false;
    let waitingArgs: any[] | null;
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false
        } else {
            fn(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, ms)
        }
    }
    return function (this: any, ...args: any[]) {
        if (shouldWait) {
            waitingArgs = args;
            return
        }

        fn(...args)
        shouldWait = true

        setTimeout(timeoutFunc, ms)
    }
}

module.exports = { throttle }