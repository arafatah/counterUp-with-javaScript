class Counter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      startFrom: Number(element.dataset.startFrom || 0),
      target: Number(element.dataset.target || 0),
      duration: Number(element.dataset.duration || 1000),
      showFloat: element.dataset.showFloat === "true",
      delay: Number(element.dataset.delay || 0),
    };

    // Override defaults with provided options
    this.options = { ...this.options, ...options };

    // Initialize state
    this.currentValue = this.options.startFrom;
    this.interval = null;
    this.observer = null;
    this.originalTargetString = element.dataset.target || "0"; 

    // Determine decimal places based on target number
    this.decimalPlaces = this.calculateDecimalPlaces();

    // Set up the intersection observer
    this.setupObserver();
  }

  calculateDecimalPlaces() {
    if (!this.options.showFloat) return 0;

    // Use the original string to determine decimal places
    const decimalPart = this.originalTargetString.split(".")[1];
    return decimalPart ? decimalPart.length : 0;
  }

  formatNumber(number) {
    // For showing exact number of decimal places on target
    return number.toFixed(this.decimalPlaces);
  }

  startCounting() {
    if (this.interval) return; 

    const startCount = () => {
      const intervalTime =
        this.options.duration / (this.options.target - this.options.startFrom);

      this.interval = setInterval(() => {
        // Use easing function for smooth counting
        this.currentValue =
          this.currentValue + (this.options.target - this.currentValue) * 0.03;

        this.element.innerHTML = this.formatNumber(this.currentValue);

        // Check if we're close enough to target to stop
        if (Math.abs(this.currentValue - this.options.target) < 0.000001) {
          clearInterval(this.interval);
          this.interval = null;
          this.element.innerHTML = this.formatNumber(this.options.target);
        }
      }, intervalTime);
    };

    // Apply delay if specified
    if (this.options.delay > 0) {
      setTimeout(startCount, this.options.delay);
    } else {
      startCount();
    }
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.startCounting();
            this.observer.unobserve(this.element);
          } else {
            clearInterval(this.interval);
            this.interval = null;
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    this.observer.observe(this.element);
  }
}

// For all counter elements
const counterElements = document.querySelectorAll("[data-counter]");
counterElements.forEach((element) => new Counter(element));

// For a specific counter by id
//   const element = document.getElementById("counter1");
//   const counter = new Counter(element);
