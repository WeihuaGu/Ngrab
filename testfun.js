
var fn=(arr)=>{
  var result = [],
      i = 0;
  result[i] = [arr[0]];
  arr.reduce(function(prev, cur){
    cur-prev === 1 ? result[i].push(cur) : result[++i] = [cur];
    return cur;
  });
  return result;
}


var oldArr = [1,2,3,7,8,9,15,17,18,19];
console.log(fn(oldArr));
