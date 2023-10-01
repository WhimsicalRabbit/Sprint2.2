const counter = document.getElementById("counter")

const throttleFn = (fn: Function, ms: number = 100) => {
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

const throttledCounter = throttleFn(() => {
    counterUp(counter)
})

document.addEventListener("mousemove", e => {
    throttledCounter()
})

function counterUp (element: any) {
    element.textContent = (parseInt(element.innerText) || 0) +1
}