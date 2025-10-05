// Example JavaScript with modern features

// Optional chaining - Baseline 2020
const user = data?.user?.name ?? 'Anonymous';

// Private class fields - Baseline 2022
class MyClass {
  #privateField = 'secret';
  
  getPrivate() {
    return this.#privateField;
  }
}

// Dynamic import - Baseline 2020
const module = await import('./utils.js');

// BigInt - Baseline 2020
const bigNumber = 123n;

// Nullish coalescing - Baseline 2020
const value = input ?? 'default';