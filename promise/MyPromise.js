const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
const isInBrowser = typeof window !== 'undefined';

const microTaskQuene =
	typeof queueMicrotask === 'function'
		? queueMicrotask
		: typeof Promise === 'function'
		? (callback) => Promise.resolve(null).then(callback)
		: setTimeout;

class MyPromise {
    static isPromise(val) {
        return val && val instanceof Promise;
    }

    static resolve(x) {
        if (MyPromise.isPromise(x)) {
            return x;
        }
        return new MyPromise((resolve) => {
            // thenable
            if (x && typeof x.then === 'function') {
                x.then((res) => resolve(res));
                return;
            }
            resolve(x);
        });
    }

    static reject(r) {
        return new MyPromise((resolve, reject) => {
            reject(r);
        });
    }

    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledList = [];
        this.onRejectedList = [];
        try {
            executor(this.handleResolve.bind(this), this.handleReject.bind(this))
        } catch (e) {
            this.handleReject(e);
        }
    }

    // all方法返回一个promise，所有的都resolve，才返回resolve(result),将第一个reject作为外层的reject
    static all(array) {
        if (!Array.isArray(array)) {
            throw new TypeError(`${array} is not array`);
        }
        let count = array.length;
        let result = [];
        if (count === 0) {
            return MyPromise.resolve(result);
        }
        return new MyPromise((resolve, reject) => {
            array.forEach((promise, index) => {
                // promise可以为非promise
                MyPromise.resolve(promise).then((res) => {
                    result[index] = res;
                    if (--count === 0) {
                        resolve(result);
                    }
                }, reject);
            });
        });

    }

    // race方法返回第一个敲定的resolve和reject
    static race(array) {
        if (!Array.isArray(array)) {
            throw new TypeError(`${array} is not array`);
        }
        let count = array.length;

        if (count === 0) {
            return new MyPromise(() => { });
        }
        return new MyPromise((resolve, reject) => {
            array.forEach((promise) => {
                // promise可以为非promise
                MyPromise.resolve(promise).then(resolve, reject)
            });
        })
    }


    static allSettled(array) {
        if (!Array.isArray(array)) {
           throw new TypeError(`${array} is not array`);
        }
        let count = array.length;
        let result = [];
        if (count === 0) {
            return MyPromise.resolve(result);
        }
        return new MyPromise((resolve, reject) => {
            array.forEach((promise, index) => {
                // promise可以为非promise
                MyPromise.resolve(promise).then((res) => {
                    result[index] = {
                        value: res,
                        status: FULFILLED
                    }

                    if (--count === 0) {
                        resolve(result);
                    }
                }, (reason) => {
                    result[index] = {
                        reason,
                        status: REJECTED
                    }

                    if (--count === 0) {
                        resolve(result);
                    }
                });
            });
        });
    }

    handleResolve(val) {
        if (this.status != PENDING) return;
        this.status = FULFILLED;
        this.value = val;
        this.onFulfilledList.forEach((cb) => cb && cb.call(this, val));
        this.onFulfilledList = [];
    }

    handleReject(err) {
        if (this.status != PENDING) return;
        this.status = REJECTED;
        this.reason = err;
        this.onRejectedList.forEach((cb) => cb && cb.call(this, err));
        this.onRejectedList = [];
    }

    then(onFulfilled, onRejected) {
        const promise2 = new MyPromise((resolve, reject) => {
            const resolvePromise = function (x) {
                if (x === promise2) {
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
            };

            const onResolvedFunc = function (val) {
                microTaskQuene(function () {
                    try {
                        if (typeof onFulfilled !== 'function') { // 如果成功了，它不是个函数，意味着不能处理，则把当前Promise的状态继续向后传递
                            resolve(val);
                            return;
                        }
                        const x = onFulfilled(val);
                        resolvePromise(x);
                    } catch (e) {
                        reject(e);
                    }
                });
                
            };

            const onRejectedFunc = function (val) {
                microTaskQuene(function () {
                    try {
                        if (typeof onRejected !== 'function') { // 如果失败了，它不是个函数，意味着不能处理，则把当前Promise的状态继续向后传递
                            reject(val);
                            return;
                        }
                        const x = onRejected(val);
                        resolvePromise(x);
                    } catch (e) {
                        reject(e);
                    }
                });
            };

            if (this.status === PENDING) {
                //这样把then注册的函数，放到list中延时执行。内部加了try/catch，把修改状态的逻辑全放在了handleResolve、handleReject这俩函数中
                this.onFulfilledList.push(onResolvedFunc);
                this.onRejectedList.push(onRejectedFunc);
            } else if (this.status === FULFILLED) { //如果这个Promise已经成功，说明已经resolve过了，不能再依赖resolve来触发，就直接执行成功处理。比如aa = Promise.resolve()，有多处使用.then
                onResolvedFunc(this.value);
            } else { // if(this.status === REJECTED) { //如果这个Promise已经失败，说明已经reject过了，不能再依赖reject来触发，就直接执行失败处理。
                onRejectedFunc(this.reason);
            }
        });

        return promise2;
    }

    toString() {
        return '[object MyPromise]';
    }

    // static withResolvers() {
    //     let resolve, reject;
    //     const promise = new MyPromise((resolve, reject) => {
    //         resolve = resolve;
    //         reject = reject
    //     });

    //     return {
    //         promise, resolve, reject
    //     };
    // }
    static deferred() {
        let result = {};
        result.promise = new MyPromise((resolve, reject) => {
            result.resolve = resolve;
            result.reject = reject;
        });
        return result;
    }

    /**
     * 先执行同步代码，替代Promise.resolve().then(func)
     * @example 
     * 
     * const f = () => console.log('now');
     * MyPromise.try(f);
     * console.log('next');
     */
    static try(func) {
        return new MyPromise((resolve) => {
            resolve(func());
        });
    }

    catch(onReject) {
        return this.then(null, onReject);
    }

    finally(callback) {
        return this.then(
            (val) => MyPromise.resolve(callback()).then(() => val),
            (err) => MyPromise.resolve(callback()).then(() => { throw err })
        );
    }

    done(onFulfilled, onRejected) {
        this.then(onFulfilled, onRejected)
            .catch(function (reason) {
                // 抛出一个全局错误
                setTimeout(() => {
                    throw reason
                }, 0);
            });
    }
}

module.exports = MyPromise;
