/* 如下：{1:222, 2:123, 5:888}，请把数据处理为如下结构：[222, 123, null, null, 888, null, null, null, null, null, null, null]。 */

var obj = {1:222, 2:123, 5:888,3:45};
const result = Array.from({ length: 12 }).map((_, index) => obj[index + 1] || null);

console.log(result)