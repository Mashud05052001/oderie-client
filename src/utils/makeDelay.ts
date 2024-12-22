const makeDelay = (ms: number = 3000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default makeDelay;
