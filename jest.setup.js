global = {
  console: {
    ...console,
    // uncomment to ignore a specific log level
    log: null,
    debug: null,
    info: null,
    // warn: jest.fn(),
    // error: jest.fn(),
  },
  alert: null,
}
