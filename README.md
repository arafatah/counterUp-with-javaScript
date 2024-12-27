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
