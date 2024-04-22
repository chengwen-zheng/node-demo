class Koa {
  middleware = [];
  static compose(middleware) {
    return function (context, next) {
      let index = -1;
      return dispatch(0);
      function dispatch(i) {
        if (i < index) return Promise.reject(new Error("next() called multiple times"));
        index = i;

        let fn = middleware[i];

        if (i === middleware.length) fn = next;
        if (!fn) return Promise.resolve();

        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
        } catch (e) {
          return Promise.reject(e)
        }
      }
    }
  }

  use(fn) {
    // 维护中间件数组——middleware
    this.middleware.push(fn);
    return this;
  }
}

let mw1 = async function (ctx, next) {
  console.log("next前，第一个中间件")
  await next()
  console.log("next后，第一个中间件")
}
let mw2 = async function (ctx, next) {
  console.log("next前，第二个中间件")
  await next()
  console.log("next后，第二个中间件")
}
let mw3 = async function (ctx, next) {
  console.log("第三个中间件，没有next了")
}

const instance = new Koa().use(mw1).use(mw2).use(mw3);
Koa.compose(instance.middleware)(instance);
