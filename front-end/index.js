var counter = document.getElementById("counter");
var throttleFn = function (fn, ms) {
    if (ms === void 0) { ms = 100; }
    var shouldWait = false;
    var waitingArgs;
    var timeoutFunc = function () {
        if (waitingArgs == null) {
            shouldWait = false;
        }
        else {
            fn.apply(void 0, waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, ms);
        }
    };
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        fn.apply(void 0, args);
        shouldWait = true;
        setTimeout(timeoutFunc, ms);
    };
};
var throttledCounter = throttleFn(function () {
    counterUp(counter);
});
document.addEventListener("mousemove", function (e) {
    throttledCounter();
});
function counterUp(element) {
    element.textContent = (parseInt(element.innerText) || 0) + 1;
}
