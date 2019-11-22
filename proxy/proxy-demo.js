let person = {
    name: 'leon',
    say: function () {
        console.log('say...')
    },
    apply(target, ctx, args) {
        console.log('apply 拦截')
        console.log(target, ctx, args)
    },
    _say() {
        console.log('before say....')
    },
    say_() {
        console.log('after say....')
    }
}


// Reflect：Object对象的一些明显属于语言内部的方法（比如Object.defineProperty，放到Reflect对象上。
let proxyPerson = new Proxy(person, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        console.log('代理了了proxy');
        return Reflect.get(target, key, receiver);
    }
})

console.log(proxyPerson.name);

// 拦截方法

let targetFun = function (sdf) {
    console.log("apply....");
};

let p = new Proxy(targetFun, person);

p('dsf');


