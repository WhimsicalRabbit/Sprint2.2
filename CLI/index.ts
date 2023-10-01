import * as readline from 'node:readline';

const rl = readline.createInterface(process.stdin, process.stdout)

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

function print() {
    console.log("\nPress space bar to exit")
}

const throttledPrint = throttle(print, 1000)

function cliFunc() {
    readline.emitKeypressEvents(process.stdin)

    console.log("Press any key, the function will only be executed every second")

    process.stdin.setRawMode(true)

    process.stdin.on('keypress', (str, key) => {
        if (key.sequence === '\u0020') {
            process.exit()
        } else {
            throttledPrint()
        }
    })
}

cliFunc()