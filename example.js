const jobs = new Array(5).fill(() => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const resVal = Math.floor(Math.random() * 3) ? false : `job complete`;
      res(resVal);
    }, Math.floor(Math.random() * 10_000));
  });
});

for (const job of jobs) {
  console.log('started');
  new JobRunner({ job }).emit('start');
}
