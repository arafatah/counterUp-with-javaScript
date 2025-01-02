/* class Counter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      startFrom: +(element.dataset.startFrom || 0),
      target: +(element.dataset.target || 0),
      duration: +(element.dataset.duration || 1000),
      showFloat: element.dataset.showFloat === "true",
      delay: +(element.dataset.delay || 0),
    };

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

    // For delaying the start
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
 */


////////////////////

/* class Counter {
  constructor(element, options = {}) {
    this.element = element;
    
    // Extract the numeric value from formatted strings
    const extractNumericValue = (str) => {
      if (!str) return 0;
      // Remove all characters except digits, dots, and minus signs
      return parseFloat(str.replace(/[^\d.-]/g, ''));
    };

    this.options = {
      startFrom: extractNumericValue(element.dataset.startFrom || '0'),
      target: extractNumericValue(element.dataset.target || '0'),
      duration: +(element.dataset.duration || 1000),
      showFloat: element.dataset.showFloat === "true",
      delay: +(element.dataset.delay || 0),
    };
    
    this.options = { ...this.options, ...options };
    
    // Initialize state
    this.currentValue = this.options.startFrom;
    this.interval = null;
    this.observer = null;
    
    // Store the original string format
    this.originalTargetString = element.dataset.target || "0";
    this.formatPattern = this.extractFormatPattern(this.originalTargetString);
    
    // Determine decimal places based on target number
    this.decimalPlaces = this.calculateDecimalPlaces();
    
    // Set up the intersection observer
    this.setupObserver();
  }

  extractFormatPattern(str) {
    // Store the original string to analyze its format
    const pattern = {
      prefix: '',
      suffix: '',
      thousandsSeparator: '',
      decimalSeparator: '.'
    };

    // Remove all whitespace
    str = str.trim();

    // Find any non-numeric prefix (currency symbols, etc)
    const prefixMatch = str.match(/^[^\d-]+/);
    if (prefixMatch) {
      pattern.prefix = prefixMatch[0];
      str = str.slice(pattern.prefix.length);
    }

    // Find any non-numeric suffix
    const suffixMatch = str.match(/[^\d.]+$/);
    if (suffixMatch) {
      pattern.suffix = suffixMatch[0];
      str = str.slice(0, -pattern.suffix.length);
    }

    // Detect thousands separator and decimal separator
    const parts = str.split('.');
    if (parts[0].includes(',')) {
      pattern.thousandsSeparator = ',';
    }

    // If there's a different decimal separator, detect it
    if (parts.length > 1) {
      const lastChar = str.charAt(str.lastIndexOf(parts[1]) - 1);
      if (lastChar !== '.') {
        pattern.decimalSeparator = lastChar;
      }
    }

    return pattern;
  }

  calculateDecimalPlaces() {
    if (!this.options.showFloat) return 0;
    
    // Use the original string to determine decimal places
    const decimalPart = this.originalTargetString.split(this.formatPattern.decimalSeparator)[1];
    return decimalPart ? decimalPart.length : 0;
  }

  formatNumber(number) {
    // Convert number to string with proper decimal places
    let formattedNumber = number.toFixed(this.decimalPlaces);

    // Split number into whole and decimal parts
    let [wholePart, decimalPart] = formattedNumber.split('.');

    // Add thousands separator if present in original format
    if (this.formatPattern.thousandsSeparator) {
      wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, this.formatPattern.thousandsSeparator);
    }

    // Reconstruct number with proper separators
    formattedNumber = wholePart;
    if (decimalPart) {
      formattedNumber += this.formatPattern.decimalSeparator + decimalPart;
    }

    // Add prefix and suffix
    return `${this.formatPattern.prefix}${formattedNumber}${this.formatPattern.suffix}`;
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
    
    // For delaying the start
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

// Initialize all counters
const counterElements = document.querySelectorAll("[data-counter]");
counterElements.forEach((element) => new Counter(element)); */


/////////////

class Counter {
  constructor(element, options = {}) {
    this.element = element;
    
    // Extract the numeric value from formatted strings
    const extractNumericValue = (str) => {
      if (!str) return 0;
      // Remove all characters except digits, dots, and minus signs
      return parseFloat(str.replace(/[^\d.-]/g, ''));
    };

    this.options = {
      startFrom: extractNumericValue(element.dataset.startFrom || '0'),
      target: extractNumericValue(element.dataset.target || '0'),
      duration: +(element.dataset.duration || 1000),
      delay: +(element.dataset.delay || 0),
    };
    
    this.options = { ...this.options, ...options };
    
    // Initialize state
    this.currentValue = this.options.startFrom;
    this.interval = null;
    this.observer = null;
    
    // Store the original string format
    this.originalTargetString = element.dataset.target || "0";
    this.formatPattern = this.extractFormatPattern(this.originalTargetString);
    
    // Determine decimal places based on target number
    this.decimalPlaces = this.calculateDecimalPlaces();
    
    // Set up the intersection observer
    this.setupObserver();
  }

  extractFormatPattern(str) {
    // Store the original string to analyze its format
    const pattern = {
      parts: [], // Store all parts in order
      thousandsSeparator: '',
      decimalSeparator: '.',
      wholePartFormat: '', // Store the exact format of the whole number part
      decimalPartFormat: '' // Store the exact format of the decimal part
    };

    // Remove all whitespace
    str = str.trim();

    // Split the string into parts
    const parts = str.split(/(-?\d+\.?\d*)/);
    pattern.parts = parts.filter(part => part); // Remove empty strings

    // Find numeric part to analyze format
    const numericPart = parts.find(part => /\d/.test(part));
    if (numericPart) {
      const [wholePart, decimalPart] = numericPart.split('.');
      
      // Store exact format of whole and decimal parts
      pattern.wholePartFormat = wholePart;
      pattern.decimalPartFormat = decimalPart || '';

      // Detect separators
      if (numericPart.includes(',')) {
        pattern.thousandsSeparator = ',';
      }
    }

    return pattern;
  }

  calculateDecimalPlaces() {
    // Check if the original string has decimal places
    return this.formatPattern.decimalPartFormat.length;
  }

  formatNumber(number) {
    // Get the whole and decimal parts of the current number
    let [wholePart, decimalPart] = number.toFixed(this.decimalPlaces).split('.');
    
    // Determine the length of the whole part format
    const targetWholeLength = this.formatPattern.wholePartFormat.length;
    
    // Pad with zeros to match original format length
    wholePart = wholePart.padStart(targetWholeLength, '0');

    // Add thousands separator if present in original format
    if (this.formatPattern.thousandsSeparator) {
      wholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, this.formatPattern.thousandsSeparator);
    }

    // Reconstruct number with proper format
    let formattedNumber = wholePart;
    if (decimalPart) {
      formattedNumber += '.' + decimalPart;
    }

    // Replace the numeric part in the original format
    let result = '';
    let numberInserted = false;
    
    for (let part of this.formatPattern.parts) {
      if (/\d/.test(part) && !numberInserted) {
        result += formattedNumber;
        numberInserted = true;
      } else {
        result += part;
      }
    }

    return result;
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
    
    // For delaying the start
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

// Initialize all counters
const counterElements = document.querySelectorAll("[data-counter]");
counterElements.forEach((element) => new Counter(element));