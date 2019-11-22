// /*redux middleware 中间件的实现思想 函数式编程*/
const app = {
    middleware: [],
    callback(ctx) {
        console.log(ctx);
    },

    use(fn) {
        /* TODO */
        this.middleware.push(fn);
    },

    go(ctx) {
        /* TODO */
        const reducer = (next, fn, i) => () => fn(ctx, next);
        this.middleware.reduceRight(reducer, this.callback.bind(this, ctx))();
    }
}

app.use((ctx, next) => {
    console.log("第一");
    ctx.name = 'Lucy';
    next();
})

app.use((ctx, next) => {
    console.log("第二");
    ctx.age = 12;
    next();
})

app.use((ctx, next) => {
    console.log(`${ctx.name} is ${ctx.age} years old. ${ctx.num}`) // => Lucy is 12 years old.
    next();
})

// ... 任意调用 use 插入中间件
app.go({num: "leon"});


