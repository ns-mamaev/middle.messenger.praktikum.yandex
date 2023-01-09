function sum(...args) {
  if (args.length === 0) {
    throw Error('function required at least 1 argument!');
  }
  return args.reduce((acc, current) => acc + current, 0);
}

export default sum;
