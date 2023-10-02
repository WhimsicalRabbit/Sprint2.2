# Level 1

The throttle function, unlike the debounce function will always execute the first time and always every second (or its delay parameter) without reseting the timer, this can be used for example when listening to specific events in the html such as window resizing and mouse movement. The first level of the sprint is logic based so its only tested the time applications of the throttle function with jest's time mocks, one test to see that the function is called twice when the delay ends, and another to see that it has not been called before this delay ends.

# Level 2

This level can be found in the CLI folder. When executing "node index.js" it will ask you to press any key and that the function will be executed every second, the function will simply show a console log reminding you that if you press the space bar you can stop the loop.

# Level 3

This level can be found in thefront-end folder. When executing the html a counter will appear in the middle of the page, this counter would add +1 every time the mouse move, but, while being throttled it's set to add +1 every 100ms so it can still track the mouse movement well without calling it and overwhelming amount of times.
