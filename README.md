# Smooth Counter Animation 🎯

A JavaScript-based smooth counter animation that counts from a starting value to a target value. The counter only starts when the element becomes visible in the viewport. It is highly customizable through HTML `data-*` attributes or JavaScript options.

## Features 🚀

- **Smooth Animation**: The counter animates smoothly towards the target using an easing function.
- **Visibility Trigger**: Counters only start when they are visible in the viewport, utilizing the `IntersectionObserver`.
- **Customizable**: Easily adjust the counter's start value, target value, duration, and more via `data-*` attributes or JavaScript options.
- **Decimal Precision**: Optionally display floating-point numbers with a specified number of decimals.
- **Multiple Counters**: Supports multiple counters on the same page with different configurations.

## Installation ⚙️

### 1. JavaScript:
Include the `Counter` class in your project. You can either include it via a `<script>` tag in HTML or import it into your JavaScript file.

### 2. CSS:
(Optional) Style your counters as desired. The CSS is optional, but you can easily customize the appearance of the counters according to your layout.

## Usage 🧩

### Automatically Initialize Counters 🔥

Add the `data-counter` attribute to any element you want to act as a counter. The counter will automatically start when the element becomes visible in the viewport.

```html
<span data-counter data-startFrom="0" data-target="1000" data-duration="2000" data-showFloat="false" data-delay="500">0</span>

Automatically initialize all counters:


// Automatically initialize all counters with the `data-counter` attribute
const counterElements = document.querySelectorAll("[data-counter]");
counterElements.forEach((element) => new Counter(element));

Manually Initialize a Specific Counter 🔧
If you need more control or want to initialize a specific counter, you can manually select the element and pass it to the Counter constructor.

javascript
Copy code
const element = document.getElementById("counter1");
const counter = new Counter(element);
JavaScript Initialization with Custom Options ⚙️
You can also create a counter programmatically and pass options as needed. These options will override any corresponding data-* attributes.

javascript
Copy code
const element = document.getElementById("counter1");
const counter = new Counter(element, {
  startFrom: 10,
  target: 1000,
  duration: 5000,
  showFloat: true,
  delay: 1000,
});
Options ⚡️
Data Attributes 📊
You can customize the behavior of each counter using the following data-* attributes:

data-counter: Marks the element as a counter.
data-startFrom: The starting value of the counter (default: 0).
data-target: The target value the counter should reach (default: 0).
data-duration: The time (in milliseconds) it takes for the counter to reach the target (default: 1000).
data-showFloat: Whether to show floating-point numbers (true or false, default: false).
data-delay: The delay (in milliseconds) before the counter starts animating (default: 0).
JavaScript Options 🔧
You can also pass options directly when creating a counter via JavaScript. These options override any corresponding data-* attributes:

javascript
Copy code
const counter = new Counter(element, {
  startFrom: 10,
  target: 200,
  duration: 3000,
  showFloat: true,
  delay: 1000,
});
How It Works 🛠️
1. Initialization 🚀
The Counter class is initialized for each element with the data-counter attribute.
The counter starts counting when the element becomes visible in the viewport using the IntersectionObserver API.
2. Counting Logic 📈
The counter begins at the value defined in data-startFrom (or JavaScript options) and increments towards the data-target value.
The increment is smooth, achieved using an easing function where the value gradually approaches the target.
The update interval is calculated based on the duration (data-duration) and the difference between the starting value and target.
3. Decimal Places 🔢
If data-showFloat="true", the counter will display floating-point numbers, and the number of decimal places will be automatically determined based on the target value.
If data-showFloat="false", the counter will round to the nearest integer.
4. Visibility Trigger 👀
The counter only starts when it becomes visible in the viewport. The IntersectionObserver ensures that the counter is active only when the user can see it.
If the element goes out of the viewport before reaching the target, the counter stops and resumes when it comes back into view.
5. Delay and Duration ⏳
Delay: You can delay the start of the animation using data-delay (in milliseconds).
Duration: The time it takes for the counter to reach the target value is defined by data-duration.
Example 🎯
HTML Example 🧑‍💻
html
Copy code
<span data-counter data-startFrom="0" data-target="1000" data-duration="2000" data-showFloat="false" data-delay="500">0</span>
JavaScript Example 👨‍💻
javascript
Copy code
// Automatically initialize all counters
const counterElements = document.querySelectorAll("[data-counter]");
counterElements.forEach((element) => new Counter(element));

// Or initialize a specific counter by ID
const element = document.getElementById("counter1");
const counter = new Counter(element);
Custom Initialization 🎨
javascript
Copy code
const element = document.getElementById("counter1");
const counter = new Counter(element, {
  startFrom: 10,
  target: 500,
  duration: 3000,
  showFloat: true,
  delay: 1000,
});
License 📜
This project is licensed under the MIT License - see the LICENSE file for details.