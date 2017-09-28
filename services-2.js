const l = console.log
const { tap } = require('ramda')


// process.stdin.setEncoding("ascii");

// var input_stdin = "";
// var input_stdin_array = "";
// var input_currentline = 0;

// process.stdin.on("data", function(data) {
//   input_stdin += data;
// });

// process.stdin.on("end", function() {
//   input_stdin_array = input_stdin.split("\n");
//   main()
// });

// function readLine() {
// l('l',input_stdin_array[input_currentline++])
//   return input_stdin_array[input_currentline++];
// }

/////////////// ignore above this line ////////////////////

// function main() {
//   var n = 3;
//   var a = [[11, 2, 4],[4, 5, 6],[10, 8, -12]]
// l(Math.abs(a.map((x,i,a) => x[i] - x[n-(i+1)] ).reduce((x,y) => x + y)))
// }
// main()
const organize = (g, f) =>
  f > 0
    ? [].concat([g[0].concat([f])]).concat([g[1]]).concat([g[2]])
    : f < 0
      ? [].concat([g[0]]).concat([g[1].concat([f])]).concat([g[2]])
      : [].concat([g[0]]).concat([g[1]]).concat([g[2].concat([f])]);
 const sumLength = a => a.reduce((x,y) => x + y.length,0)

const arr1 = '-4 3 -9 0 4 1'.split(' ').map(x => parseInt(x))
l(
    arr1.reduce(
        (x,y) => organize(x,y), [[],[],[]]).map((x,i,a) => tap(l,x.length / sumLength(a))))

let g = [[], [],[]]
let t 
for (let f of arr1) {
    l(g)
    if(f > 0) g = [].concat([g[0].concat([f])]).concat([g[1]]).concat([g[2]])
     if (f < 0) g = [].concat([g[0]]).concat([g[1].concat([f])]).concat([g[2]])
         if (f === 0) g = [].concat([g[0]]).concat([g[1]]).concat([g[2].concat([f])])
    l(g)
}
Array(6).fill('#').map((x,i,a) => console.log(' '.repeat(a.length - (i+1)).concat(x.repeat(i+1))))
const arr2 = [1,2,3,4,5]

const ascending = (a, b) => parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;
l(arr2.sort(ascending).reverse());

[arr2.sort(ascending).slice(0,arr2.length -1).reduce((x,y) => x+y,0), arr2.sort(ascending).reverse().slice(0,arr2.length -1).reduce((x,y) => x+y,0)].map( x => console.log(x))

var goopoo = 'cde'
var poogoo = 'abc'
const set1 = (o,y) => {o[y] ? o[y] = o[y]+=1 :  o[y] = 1; return o} 
var gp1 = goopoo.split('').reduce((x,y) => set1(x,y),{}) 
var gp2 = poogoo.split('').reduce((x,y) => set1(x,y),{})
const oo2 = (o,p) => Object.keys(o).filter((x, i, a) => Object.keys(p).some(y => y === x)) 

l(Object.keys(gp1).filter((x,i,a) => Object.keys(gp2).some(y => y === x) ))


l((() => { var x = {'e': 0 } ;var y = 'e'; return set1(x,y) })())


const _has = (k,o) => Object.keys(o).some(x => x === k)
//Should be less than not greater than! switched but not name
const gte2 = (x,y) => x < y ? x : y
function mergeWithSameKey(fn, l, r) {
  var result = {};
  var k;

  for (k in l) {
    if (_has(k, l) && _has(k, r)){
      result[k] = fn(l[k], r[k])
    }
  }
  return result;
}

l(gp1)
l(gp2)


l('p', Object.values(mergeWithSameKey(gte2, gp2, gp1)))
l(Object.entries(mergeWithSameKey(gte2, gp1, gp2)))
l(Object.keys(gp1).filter(x => Object.keys(gp2).includes(x)))



// l('p',Object.values(mergeWithSameKey(gte2,gp2,gp1)))
// l(Object.entries(mergeWithSameKey(gte2, gp1, gp2)))
// l(Object.keys(gp1).filter((x, i, a) => tap(l,Object.keys(gp2).some(y => y !== x))))

// Object.values = function (obj) {
//   var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i) // preallocate the Array
//   while (i--) { resArray[i] = obj[ownProps[i]] }

//   return resArray
// }
// const set = (o, y) => {
//   o[y] ? (o[y] = o[y] += 1) : (o[y] = 1)
//   return o
// }
// const _has = (k, o) => Object.keys(o).some(x => x === k)
// const gt = (x, y) => (x > y ? x : y)
// function mergeWithSameKey (fn, l, r) {
//   var result = {}
//   var k

//   for (k in l) {
//     if (_has(k, l) && _has(k, r)) {
//       result[k] = fn(l[k], r[k])
//     }
//   }
//   return result
// }
// const reduceAddEntries = o =>
//   Object.values(o).reduce((x, y) => parseInt(x, 10) + parseInt(y, 10))
// function main () {
//   var a = readLine()
//   var b = readLine()
//   let c = a.split('').reduce((x, y) => set(x, y), {})
//   let d = b.split('').reduce((x, y) => set(x, y), {})
//   let e = mergeWithSameKey(gt, c, d)
//   let t =
//     reduceAddEntries(c) +
//     reduceAddEntries(d) -
//     reduceAddEntries(mergeWithSameKey(gt, c, d))
//   console.log(reduceAddEntries(mergeWithSameKey(gt, c, d)))
//   console.log(t)
// }
// const set3 = (o,y,n = 0) => { 
//     var i = y
//     while(_has(i.toString(),o)){
//         l(o)
//         l(i)
//         o[i] = o[i] + n
//         i++
//     }
//     return o;
// }


// const maxValue = (ls, n = 0) => Object.values(ls).reduce((x,y) => x > y ? x : y, n)
// const updateList = {}


//Inefficient Windowing Operation (maybe implement with most.js for shits and giggles)
//const _has = (k,o) => Object.keys(o).some(x => x === k)
//const set = (o,y,n) => {o[y] ? o[y] = o[y]+=n :  o[y] = n; return o} 
// const updateList = (o,start,end,n) => { 
//     var i = start
//     while(end >= i){
//         if(_has(i.toString(),o)) set(o,i,n)
//         i++ 
//     }
//     return o;
// }

// const maxValue = (n = 0, ls) => Object.keys(ls).reduce((x,y) => x > y ? x : y, n)

// function main() {
//     var n_temp = readLine().split(' '),
//         n = parseInt(n_temp[0]), 
//         m = parseInt(n_temp[1])
//    let ol = {}
//    let max = 0;
//     for(var a0 = 0; a0 < m; a0++){
//         var a_temp = readLine().split(' ');
//         var a = parseInt(a_temp[0]); //start
//         var b = parseInt(a_temp[1]); //end 
//         var k = parseInt(a_temp[2]); //increment
//         updateList(ol,a,b,k)
//         l(updateList)
//         max = maxValue(max, Object.values(ol))
        
//     }
//     console.log(max)

// }
// const plop1 = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
// l(maxValue(set3(Object.assign({}, plop1), 3, 100)))
// updateList(ol, a, b, k)
// l(updateList)
 l(Array.from({ length: 5 }, (v, i) => i + 1))//.reduce((x,y) => set1(x,y), {}))

var toop = [1,2,3,4,5]
l(Object.assign({},{toop}).toString() )


let tey = {}
let ty = 4568
l((() => tey[ty] = 0)())



  //console.log(`The total meal cost is `${total.toPrecision(0)}` dollars.`) 


const binaryGap = N => N.toString(2).split('1').reduce((x,y,i,a) => y.length > x.length && i !== a.length - 1 ? y : x).length

 //l(binaryGap(20).map(x => x ? x.length : x))
l(Number(15).toString(2).split('1'))

 l(binaryGap(1073741825)
)


const rightRotation  = (b,k) => b.map((v, i, a) => a[((i-(k % a.length)) + a.length) % a.length])
l((0-(3 % 1)) + 1)
l(rightRotation([1,2,3,4,5,6,7,8], 32))

let list2 = [1, 1, 1, 1, 1, 1]

l(list2.reduce((x, y) => x  === y ? x === y : y))


const array_diff = (a, b) =>
  b.reduce((x, y, i, c) => a.some(z => z === y) ? a.filter(z => z !== y ) : x, a)

var x = '10101010001000101110101000101110'
//l(parseInt(x))

l(parseInt(x, 2)|0)

var Morse = {}



Morse.alpha = {
  A: '10111',
  B: '111010101',
  C: '11101011101',
  D: '1110101',
  E: '1',
  F: '101011101',
  G: '111011101',
  H: '1010101',
  I: '101',
  J: '1011101110111',
  K: '111010111',
  L: '101110101',
  M: '1110111',
  N: '11101',
  O: '11101110111',
  P: '10111011101',
  Q: '1110111010111',
  R: '1011101',
  S: '10101',
  T: '111',
  U: '1010111',
  V: '101010111',
  W: '101110111',
  X: '11101010111',
  Y: '1110101110111',
  Z: '11101110101',
  '0': '1110111011101110111',
  '1': '10111011101110111',
  '2': '101011101110111',
  '3': '1010101110111',
  '4': '10101010111',
  '5': '101010101',
  '6': '11101010101',
  '7': '1110111010101',
  '8': '111011101110101',
  '9': '11101110111011101',
  '.': '10111010111010111',
  ',': '1110111010101110111',
  '?': '101011101110101',
  "'": '1011101110111011101',
  '!': '1110101110101110111',
  '/': '1110101011101',
  '(': '111010111011101',
  ')': '1110101110111010111',
  '&': '10111010101',
  ':': '11101110111010101',
  ';': '11101011101011101',
  '=': '1110101010111',
  '+': '1011101011101',
  '-': '111010101010111',
  _: '10101110111010111',
  '"': '101110101011101',
  $: '10101011101010111',
  '@': '10111011101011101',
  ' ': '0' // Technically is 7 0-bits, but we assume that a space will always be between two other characters
}

const trimFront = x => x[0] === '0' ? trimFront(x.slice(1, x.length)) : x
const trimBack = x => x[x.length-1] === '0'  ? trimBack(x.slice(0, x.length - 1)) : x
const convert = x => x.split('').map((y,j,b) => j === b.length -1 ? Morse.alpha[y] :  Morse.alpha[y].concat('000'))
const splitAndTrim = x => x.split('000').map(trimBack).map(trimFront)

var ttt = 'ppppp'
l(ttt[2])
Morse.decode = (integerArray) => 
  integerArray
    .map(x => (x >>> 0).toString(2))
    .map(x => x.length === 32 
      ? x 
      :  x.padStart(32, '0'))
    .reduce((x,y) => x.concat(y))
    .replace(/(?:[0]){6}/g, ' ')
    .split(' ')
    .map(x => x 
      ? splitAndTrim(x) 
      : ' ')
    .map(x => Array.isArray(x) 
      ? x.map(y => Object.entries(Morse.alpha).filter(z => z[1] === y)[0]) 
      : ' ')
    .map(x =>  Array.isArray(x) 
      ? x.reduce((y,z) => z 
        ? y.concat(z[0]) 
        : y, []) 
      : x )
    .map(x => Array.isArray(x) 
      ? x.join('') 
      : '')
    .join(' ')
    .trim()
                  
                   // .join(' ').trim()
    // .filter(x => x !== '').join(' ')
   
   
   
    //.match(/(?:[10]){1,32}/g) 
    //.map(x => x.split('000'))
    //            .reduce((y,z) => y.concat(z)))
    //            .map(x => x.split('000'))
    // //             .map(x => 
    //               Object.entries(Morse.alpha)
    //               .filter(y => y[1] === x)[0])
    //                .map(z => z ? z[0] : [])
    //                 .join(''))
    // .filter(x => x !== '').join(' ')                  
                            
    
    //.map(x => x.split('000'))
    // .reduce((x,y) => x.concat(y))
    //  .map(x => Object.entries(Morse.alpha).filter(y => y[1] === x))
    //   .reduce((x,y) => x.concat(y) )

Morse.encode =  (message) => 
  message
  .split(' ')
  .map((x,i,a) => i === a.length -1 
    ? convert(x)
    : convert(x).concat('0000000'))
  .reduce((x,y) => x.concat(y))
  .join('')
  .match(/(?:[10]){1,32}/g)
    // .map(z => z.length === 32 
    //   ? parseInt(z, 2)|0
    //   : parseInt(z.padEnd(32,'0'),2)|0)



var space = ' '
l((~-298086688|0) === (tap(l,~3996880608|0)))

//l(parseInt((3996880608|0).toString(2),2))

//l(Morse.encode('HELLO WORLD'))
l(Morse.encode('MMM'))

 //l(Morse.decode([-298086688]))
l(Morse.decode([-2004318070,536870912]))
l(Morse.decode([ -1440552402, -1547992901, -1896993141, -1461059584 ]))
l(Morse.decode([-298086688]))


 l(parseInt('10000000000000000000000000000000',2))
// l(parseInt('10001110001000111000100011111', 2))



// Example

// Text content  H           E     L             L             O           [space] W             O               R           L             D       
// Morse Code    ····        ·     ·−··          ·−··          −−−                 ·−−           −−−             ·−·         ·−··          −··     
// Bit pattern   1010101 000 1 000 101110101 000 101110101 000 11101110111 0000000 101110111 000 11101110111 000 1011101 000 10111010 1000 1110101 00000000000000000
// 32-bit Value  -1,440,552,402                       | -1,547,992,901                    | -1,896,993,141                      | -1,461,059,584
// Hex Value     AA22 EA2E                            | A3BB 80BB                         | 8EEE 2E8B                           | A8EA 0000
//

//a 10101010001000101110101000101110101000111011101110000001011101110001110111011100010111010001011101010001110101000000000000000000
//b 10101010001000101110101000101110101000111011101110000000101110111000111011101110001011101000101110101000111010100000000000000000
//c 10101010001000101110101000101110101000111011101110000000101110111000111011101110001011101000101110101000111010100000000000000000
// 11101110001110111000111011100000
// 0001110001000111000100100000


// Test.assertEquals(formatDuration(1), '1 second')
// Test.assertEquals(formatDuration(62), '1 minute and 2 seconds')
// Test.assertEquals(formatDuration(120), '2 minutes')
// Test.assertEquals(formatDuration(3600), '1 hour')
// Test.assertEquals(formatDuration(3662), '1 hour, 1 minute and 2 seconds')


function formatDuration (seconds) {

  if(seconds === 0) return 'now'

  const y = 60 * 60 * 24 * 365
  const d = 60 * 60 * 24
  const h = 60 * 60
  const m = 60

  const year = Math.trunc(seconds / y)
  const day = Math.trunc((seconds % y) / d)
  const hour = Math.trunc((seconds % d) / h) 
  const minute = Math.trunc((seconds % h) / m)

  const constructPhrase = (duration, word) => duration > 1
    ? `${duration} ${word.concat('s')}` 
    : duration === 1 
      ?  `${duration} ${word}` 
      :  ``
      
return Array.from({length: 5}, (v,i) => { 
    switch(i) { 
      case 0:  return constructPhrase(year,'year')
        break;
      case 1:  return constructPhrase(day,'day')
        break;
      case 2:  return constructPhrase(hour,'hour')
        break;
      case 3:  return constructPhrase(minute,'minute')
        break;
      default: return constructPhrase(seconds % m, 'second')
        break;
      }
  }).filter(x => x !== '')
    .join(', ').replace(/,([^,]*)$/, ' and$1')

    // .map((v,i,a) => a.length > 1 
    //   ? (a.length - 1) - i > 1 
    //     ? v.concat(',')
    //     : (a.length - 1) - i === 1
    //       ? v.concat(' and')
    //       : v
    //   : v).join(' ')

}

l(formatDuration(30080))


//Test.assertSimilar(pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]),{pos:[3,7],peaks:[6,3]})

function pickPeaks(arr){
  let peaks = {pos:[],peaks:[]}

let minIndex = 0
let min = arr[0] 
let max = -Infinity

for(let i = 1; i < arr.length; i++){
 if(min > arr[i]) {
    min = arr[i]
 }
l((i-minIndex), i, minIndex)
 max = (i - minIndex) > 1 ? arr.slice(minIndex,i).reduce((x,y) => x > y ? x : y) : -Infinity

 if(max > min) {
   peaks.pos.push(arr.slice(minIndex,i).findIndex(x => max === x))
   peaks.peaks.push(max)
   minIndex = arr[i+1]
   min = arr[i + 1]

   max = -Infinity
 }

}
return peaks
}

var f = [3,2,3,6,4,1,2,3,2,1,2,3]

l(f.findIndex(x => x === 2))

l(pickPeaks(f))