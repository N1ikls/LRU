import LRU from "./LRU.js";
const a = new LRU(4);
a.put(1, 1);
a.put(2, 1);
a.get(2);
a.put(3, 1);
a.put(4, 1);
a.put(5, 1);
a.put(6, 1);
a.get(6);
console.log(a.mas);
//Testing
// const cache = new LRU(4);
// // in 1,2 -- 6,5,4,3
// cache.put(1, 1);
// cache.put(2, 1);
// cache.get(2);
// cache.put(3, 1);
// cache.put(4, 1);
// cache.put(5, 1);
// cache.put(6, 1);
// //3,4,5,6 out
// console.log(cache.mas);
