

class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            val: 0
        };
    }

    componentDidMount() {
        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 1 次 log

        this.setState({val: this.state.val + 1});
        console.log(this.state.val);    // 第 2 次 log

        setTimeout(() => {
            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 第 3 次 log

            this.setState({val: this.state.val + 1});
            console.log(this.state.val);  // 第 4 次 log
        }, 0);
    }

    render() {
        return null;
    }
};
// 0,0,2,3

/*
1、第一次和第二次都是在 react 自身生命周期内，触发时 isBatchingUpdates 为 true，所以并不会直接执行更新 state，而是加入了 dirtyComponents，所以打印时获取的都是更新前的状态 0。
2、两次 setState 时，获取到 this.state.val 都是 0，所以执行时都是将 0 设置成 1，在 react 内部会被合并掉，只执行一次。设置完成后 state.val 值为 1。
3、setTimeout 中的代码，触发时 isBatchingUpdates 为 false，所以能够直接进行更新，所以连着输出 2，3。
输出： 0 0 2 3 */


/* 
在React的setState函数实现中，会根据一个变量 isBatchingUpdate 来判断是直接同步更新this.state还是放到队列中异步更新 。
React使用了事务的机制，React的每个生命周期和合成事件都处在一个大的事务当中。
在事务的前置钩子中调用batchedUpdates方法修改isBatchingUpdates变量为true，在后置钩子中将变量置为false。
原生绑定事件和setTimeout异步的函数没有进入到React的事务当中，或者当他们执行时，刚刚的事务已近结束了，后置钩子触发了，所以此时的setState会直接进入非批量更新模式，表现在我们看来成为了同步SetState。
*/