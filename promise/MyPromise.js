const pending = "pending";
const fulfilled = "fulfilled";
const rejected = "rejected";

const isFuntion = (fn) => typeof fn == "function";
const isInBrowser = typeof window !== 'undefined';
const nextTick = function (nextTickHandler) {
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



const isThenable = (val) => val && val.then === "function";

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
      });
    }

    const reject = (val) => {
      if (this.state !== pending) return;
      this.state = rejected;
      
      nextTick(() => {
        this.rejectFunc.forEach(fn => fn.call(this, val));
      });
    }

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }

  }

  then(onFulfilled, onRejected) {
    let returnPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = function (x) {
        if (x === returnPromise) {
          reject(new TypeError('The promise and the return value are the same'));
          return;
        }
        if (x && typeof x === 'object' || typeof x === 'function') {
          let used; //PromiseA+2.3.3.3.3 只能调用一次
          try {
            let then = x.then;
            if (typeof then === 'function') {
              //PromiseA+2.3.3
              then.call(x, (y) => {
                //PromiseA+2.3.3.1
                if (used) return;
                used = true;
                resolvePromise(y);
              }, (r) => {
                //PromiseA+2.3.3.2
                if (used) return;
                used = true;
                reject(r);
              });
            } else {
              //PromiseA+2.3.3.4
              if (used) return;
              used = true;
              resolve(x);
            }
          } catch (e) {
            //PromiseA+ 2.3.3.2
            if (used) return;
            used = true;
            reject(e);
          }
        } else {
          //PromiseA+ 2.3.3.4
          resolve(x);
        }
      }
      this.resolveFunc.push(function (val) {
        try {
          if (typeof onFulfilled !== 'function') { // 如果成功了，它不是个函数，意味着不能处理，则把当前Promise的状态继续向后传递
            resolve(val);
            return;
          }
          let x = onFulfilled(val);
          resolvePromise(x);
        } catch (error) {
          reject(error);
        }
      });

      this.rejectFunc.push((function (val) {
        try {
          if (typeof onRejected !== 'function') { // 如果失败了，它不是个函数，意味着不能处理，则把当前Promise的状态继续向后传递
            reject(val);
            return;
          }
          let x = onRejected(val);
          resolvePromise(x);
        } catch (error) {
          reject(error);
        }
      }));
    });

    return returnPromise;
  }

  catch(rejectCallback) {
    this.then(null, rejectCallback);
  }

  finally(fn) {
    return this.then(() => MyPromise.resolve(fn()).then(val => val), (error) => MyPromise.resolve(fn()).then(() => {
      throw error
    }));
  } 1

  static resolve(val) {
    if (!(val instanceof MyPromise)) {
      return val;
    }

    return new MyPromise((resolve) => {
      if (isThenable(val)) {
        val.then(res => resolve(res));
        return;
      }
      resolve(val);
    })
  }

  static reject(val) {
    return new MyPromise((_, reject) => {
      reject(val);
    });
  }

  static all(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable.`);
    }

    let count = promises.length;
    let result = [];
    return new MyPromise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        MyPromise.resolve(promises[i]).then(res => {
          result[i] = res;
          count++;

          // 只有全部返回了，才resolve
          if (count === promises.length) {
            resolve(result);
          }
        }, err => reject(err));

      }
    })
  }

  static allSettled(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable.`);
    }
    let count = promises.length;
    let results = [];
    return new MyPromise((resolve) => {
      promises.forEach((promise, index) => {
        let result = {}
        MyPromise.resolve(promise).then(res => {
          result.status = fulfilled;
          result.value = res;
          result[index] = result;
          if (count === 0) {
            resolve(results);
          }
        }, (reason) => {
          result.reason = reason;
          result.status = rejected;
          result[index] = result;
          if (count === 0) {
            resolve(results);
          }
        });
      });
    });
  }

  static race(promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError(`${promises} is not iterable.`);
    }

    if (arr.length === 0) return new MyPromise(() => { });

    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => MyPromise.resolve(promise).then(res => {
        resolve(res);
      }, err => reject(err)));
    })
  }

  // for unitCase
  static deferred() {
    let result = {};
    result.promise = new MyPromise((resolve, reject) => {
      result.resolve = resolve;
      result.reject = reject;
    });
    return result;
  }
}

module.exports = MyPromise;

