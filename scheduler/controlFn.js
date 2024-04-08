// 异步失败的超时控制
// 实现一个controlFn：
// 传入三个函数，第一个参数为异步函数，第二个参数为最大请求数，第三个参数为最大请求时间

// 调用controlFn的时候直接调用第一个参数的异步函数，如果失败了，则再次调用
// 但是最多只会调用最大的请求次数
// 并且如果开始执行函数的时候超过最大的请求时间也会停止

const createDeferred = (silent) => {
  const deferred = {};

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  if (silent) {
    deferred.promise.catch(() => { });
  }

  return deferred;
};

const asyncFn = () => {
  const { promise, resolve, reject } = createDeferred();

  setTimeout(() => {
    if (Math.random() > 0.5) {
      console.log('resolve');
      resolve();
    } else {
      console.log('reject');
      reject();
    }
  });

  return promise;
}
const noop = () => { }

const controlFn = async (fn, maxCount, maxTime) => {
  let didTimeOut = false;
  setTimeout(()=>didTimeOut = true, maxTime);
  let concurrentCount = 0;
  while (didTimeOut === false && concurrentCount < maxCount) {
    concurrentCount++;
    await fn().then(() => noop)
      .catch(() => concurrentCount--);
  }
}

controlFn(asyncFn, 5, 10);
