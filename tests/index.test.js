const { throttle } = require("../dist/index")

jest.useFakeTimers()

const func = jest.fn()
const throttledFunc = throttle(func, 1000)

describe("Tests For the Throttle function", () => {
    it("There should be only one called when called twice under the 1s delay", () => {

        throttledFunc()
    
        jest.advanceTimersByTime(250)
        throttledFunc()
    
        jest.advanceTimersByTime(500)
        expect(func).toHaveBeenCalledTimes(1)
    })
    it("It should recieve both calls when called over the 1s delay", () => {
        const func = jest.fn()
        const throttledFunc = throttle(func, 1000)
        throttledFunc()
    
        jest.advanceTimersByTime(1000)
        throttledFunc()
    
        jest.advanceTimersByTime(1200)
        expect(func).toHaveBeenCalledTimes(2)
    })


})
