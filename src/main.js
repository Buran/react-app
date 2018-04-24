import('./modules/calc').then(Calculator => {
  console.log(Calculator.sum(1, 2))
});

console.log('Hello, world!');
