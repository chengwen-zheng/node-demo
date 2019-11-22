let o = {
  "a": {
    "b": {
      "c": "abc",
      "": "ab"
    },
    "": "a"
  }
}

console.log(mapTree(o, "a-b-c-d", "-"))//abc
console.log(mapTree(o, "a-b-d", "-"))//ab
console.log(mapTree(o, "a-b-c", "-"))//abc
console.log(mapTree(o, "a-b", "-"))//ab
console.log(mapTree(o, "a-c", "-"))//a
console.log(mapTree(o, "b", "-"))//undefined

o = {
  "a": {
    "b": "ab"
  },
  "": "default"
}

console.log(mapTree(o, "a-b", "-")) //ab
console.log(mapTree(o, "a-c", "-")) //default
console.log(mapTree(o, "b", "-")) //default

function mapTree(){
  
}