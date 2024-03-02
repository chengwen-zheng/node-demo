const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected";

const isFuntion = (fn) => typeof fn == "function";
const isInBrowser = typeof window !== 'undefined';
const nextTick = function(nextTickHandler) {
    if (isInBrowser) {
        if (typeof MutationObserver !== 'undefined') { // 首选 MutationObserver 
            var counter = 1;
            var observer = new MutationObserver(nextTickHandler); // 声明 MO 和回调函数
            var textNode = document.createTextNode(counter);
            observer.observe(textNode, { // 监听 textNode 这个文本节点
                characterData: true // 一旦文本改变则触发回调函数 nextTickHandler
            });
            const start = function () {
                counter = (counter + 1) % 2; // 每次执行 timeFunc 都会让文本在 1 和 0 间切换
                textNode.data = counter;
            };
            start();
        } else {
            setTimeout(nextTickHandler, 0);
        }
    } else {
        process.nextTick(nextTickHandler);
    }
};

class MyPromise {

  state = pending;
  // 表示then注册的成功函数
  resolveFunc = [];
  // 表示then注册的失败函数
  rejectFunc = [];

  constructor(executor) {
    const resolve = (val) => {
      if (this.state !== pending) return;
      this.state = fulfilled;
      nextTick(() => {
        this.resolveFunc.forEach(fn => fn.call(this, val))
      })
    }

    const reject = (val) => {
      if (this.state !== pending) return;
      this.state = rejected;
      nextTick(() => {
        this.rejectFunc.forEach(fn => fn.call(val));
      });
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

  }

  then(resolveCallback, rejectCallback) {
    // 判断是否是函数
    resolveCallback = isFuntion(resolveCallback) ? resolveCallback : (v) => v;
    rejectCallback = isFuntion(rejectCallback) ? rejectCallback : (err) => {
      throw err
    };


    return new MyPromise(resolve, reject => {
      this.resolveFunc.push(val => {
        try {
          let x = resolveCallback(val);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      });


      this.rejectFunc.push((val) => {
        try {
          let x = rejectCallback(val);
          x instanceof MyPromise ? x.then(resolve, reject) : reject(x);
        } catch (error) {
          reject(error);
        }
      });
    })
  }

  catch(rejectCallback) {
    this.then(null, rejectCallback);
  }

  finally(fn) {
    return this.then(fn, fn);
  }
}

// 执行测试用例需要用到的代码
MyPromise.deferred = function() {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
      defer.resolve = resolve;
      defer.reject = reject;
  });
  return defer;
}
