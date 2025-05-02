import '@testing-library/jest-dom';

// Make sure we have access to jest globals
declare global {
  namespace NodeJS {
    interface Global {
      jest: typeof jest;
    }
  }
}

// Configure Jest timeout
jest.setTimeout(10000);
