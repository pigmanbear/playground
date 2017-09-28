const {
    ar1,
    ar2,
    ar3,
    ar4,
    ar5
} = require('./values')
const l = console.log

var arr13 = [1, 5, 2, 7, 3, 9, 4, 6, 8]



function countInversions(arr1) {
    

    function merge(left, right, arr) {
        let inversions = 0
        var a = 0
        while (left.length && right.length) {
            right[0] < left[0] ? inversions+= left.length : inversions
            arr[a++] = (right[0] < left[0]) ? right.shift() : left.shift();

        }
        while (left.length) {
            arr[a++] = left.shift();

        }
        while (right.length) {
            arr[a++] = right.shift();
        }
        return inversions


    }

    function mergeSort(arr) {
        let inversions = 0

        var len = arr.length;

        if (len === 1) {
            return;
        }

        var mid = Math.floor(len / 2),
            left = arr.slice(0, mid),
            right = arr.slice(mid);

    // mergeSort(left)
    // mergeSort(right)


        var x = mergeSort(left);
        var y = mergeSort(right);
        if(x) inversions+= x
        if(y) inversions+= y
        inversions += merge(left, right, arr);
        return inversions
    }

    return mergeSort(arr1);



}



const countInversions2 = (ys) => {
let inversions = 0
return sort(ys)
function sort (xs) {
  let totalSwaps = 0
  for (var i = 0; i < xs.length; i++) {
    var numberOfSwaps = 0
    for (var j = 0; j < xs.length - 1; j++) {
      if (xs[j] > xs[j + 1]) {
        xs.splice(j, 2, xs[j + 1], xs[j])

        numberOfSwaps++
      }
    }
    totalSwaps += numberOfSwaps
    if (numberOfSwaps == 0) {
      return totalSwaps
    }
  }

}
}


l(countInversions(ar1.replace(/\n/g, ' ').split(' ').map(Number)))
l(countInversions(arr13.map(x=> x)))
l(countInversions2(arr13))
