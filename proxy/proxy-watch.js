function Person(name) {
    this.name = name

    this.say = () => {
        console.log('say...');
    }

    this._say = () => {
        console.log('before say...');
    }

    this.say_ = () => {
        console.log('after say...');
    }

    this.sing = () => {
        console.log('sing...')
    }
}


function CreateWatchProxy(func) {
    let handler = {
        construct(target, arrArray) {
            let obj = new target(...arrArray);
            for (let i in obj) {
                if (obj[i] instanceof Function) {
                    if (!i.startsWith('_') && !i.endsWith('_')) {
                        obj[i] = new Proxy(obj[i], {
                            apply(target, thisArg, argArray) {
                                if (obj['_' + i] instanceof Function) {
                                    obj['_' + i](...argArray)
                                }
                                let ret = Reflect.apply(target, thisArg, argArray)
                                console.log(this)
                                if (obj[i + '_'] instanceof Function) {
                                    obj[i + '_'](...argArray)
                                }
                                return ret
                            }
                        })
                    }
                }
            }
            return obj
        }
    }
    return new Proxy(func, handler);
}

Person = CreateWatchProxy(Person);

person = new Person();

person.say();

person.sing();