/*
*
add(1); 			// 1
add(1)(2);  	// 3
add(1)(2)(3);// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6
*
* */

function add(...args) {
    let sum = 0;
    const innerAdd = (...args) => {
        args.forEach(i => (sum += i));
        return innerAdd;
    };
    innerAdd.toString = () => sum;
    return innerAdd(...args);
}
add(1);			// 1
add(1)(2);  	// 3
add(1)(2)(3);// 6
add(1)(2, 3); // 6
add(1, 2)(3); // 6
add(1, 2, 3); // 6