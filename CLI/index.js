"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("node:readline"));
const rl = readline.createInterface(process.stdin, process.stdout);
const throttle = (fn, ms = 1000) => {
    let shouldWait = false;
    let waitingArgs;
    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false;
        }
        else {
            fn(...waitingArgs);
            waitingArgs = null;
            setTimeout(timeoutFunc, ms);
        }
    };
    return function (...args) {
        if (shouldWait) {
            waitingArgs = args;
            return;
        }
        fn(...args);
        shouldWait = true;
        setTimeout(timeoutFunc, ms);
    };
};
function print() {
    console.log("\nPress space bar to exit");
}
const throttledPrint = throttle(print, 1000);
function cliFunc() {
    readline.emitKeypressEvents(process.stdin);
    console.log("Press any key, the function will only be executed every second");
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, key) => {
        if (key.sequence === '\u0020') {
            process.exit();
        }
        else {
            throttledPrint();
        }
    });
}
cliFunc();
