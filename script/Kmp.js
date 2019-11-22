/* KMP的优化算法 (寻找匹配字符串的前缀与后缀最大公共长度，该值仅仅与匹配字符串相关)*/

function index(string, searchString) {
    let next = getLongestPS(searchString);
    let i = 0,
        j = 0;
    while (i <= (string.length - 1) && j <= (searchString.length - 1)) {
        if (string[i] === searchString[j]) {
            i++;
            j++;
        } else {
            // 注意当不匹配时,并不移动字符串,而是移动匹配字符串。(回溯)
            if (j == 0) {
                i++;
            } else {
                j = next[j];
            }
        }
    }
    if (j > searchString.length - 1) {
        return i - searchString.length;
    }
    return -1;
}


/*
* longestPS
* 求一段字符串的前缀与后缀的最大公共长度;
* */
function getLongestPS(searchString) {
    let i = 0;
    let next = [0];
    let j = 1;
    while (j < searchString.length) {
        if (searchString[i] == searchString[j]) {
            next[j] = i + 1;
            i++;
            j++;
        } else {
            if (i == 0) {
                next[j] = 0
                j++;
            } else {
                i = next[i - 1];
            }
        }
    }
    return next;
}

let string = "sdfabasdlfsaslfjslkadadfjlabab";
let searchString = "abab";

console.log(index(string, searchString));
console.log(string.indexOf(searchString));