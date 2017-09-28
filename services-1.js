const {
    cond,
    and,
    compose,
    ifElse,
    divide,
    gt,
    lte,
    modulo,
    T,
    F,
    times,
    not,
    identity,
    range,
    forEach,
    equals,
    either,
    or,
    map,
    chain,
    flatten,
    tap,
    scan,
    tail,
    add,
    reduce,
    slice,
    mapAccum,
    isEmpty,
    head,
    length,
    applySpec,
    reverse,
    subtract,
    isNil,
    sum,
    max,
    filter,
    contains,
    mergeWith,
    flip,
    has, 
    keys,
    min,
    values
} = require("ramda");
const {
    assert
} = require('chai'); 

// Using Assert style
// const { expect } = require('chai');  // Using Expect style
// const { should } = require('chai');  // Using Should style
const l = console.log

const lt = tap(l)
//Initial*
//Check for Domains, IPs
//100K - Number of Domains/IPS
//Check for Index on Domains/IPs
//If needed, create Domains, IPs, Indexes

//Common
//Domains
//Types - Domains/IPS
//interface/struct - Domains
//interface/struct - IPs
//Relationships (interface/struct?)

//Child Process
//Initial*
//Normalize
//InvertNormalize
//Add/Subtract Nodes/Relationships (recursvie loop)

//API
//Endpoints:
// - /domains
// - /ips
// - /depth/num
// starting point for depth?
// random domains
// random ips
// All returns are Pair Type for D3 force directed
//

const isTwo = x => and(lte(x, 3), gt(x, 1));
const modTwoThree = x => or(equals(0, modulo(x, 2)), equals(0, modulo(x, 3))) || x < 2;
const check = x => {
    for (let i = 5; i <= Math.ceil(Math.sqrt(x)); i++) {
        if (equals(0, modulo(x, i))) return true;
    }
    return false;
};
//const domainNameRegex = /^(?:[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9])?\.){0,126}(?:[a-z0-9](?:[a-z0-9\-]{0,61}[a-z0-9]))\.?$/i;

const check2 = x => {
    for (let i = 5; i <= Math.ceil(Math.sqrt(x)); i += 6) {
        if (equals(0, modulo(x, i))) return true;
    }
    return false;
};
// const isTwo = x => and(lte(x, 3), gt(x, 1));
// const modTwoThree = x => or(equals(0, modulo(x, 2)), equals(0, modulo(x, 3))) || x < 2;
// const check = x => {
//     for (let i = 5; i <= Math.ceil(Math.sqrt(x)); i++) {
//         if (equals(0, modulo(x, i))) return true;
//     }
//     return false;
// };

const isPrime = x =>
    cond([
        [x => x < 2, F],
        [x => isTwo(x), T],
        [x => modTwoThree(x), F],
        [x => check(x), F],
        [T, T]
    ])(x)



function* Fwp() {
    let number = 0;
    let go = true;
    let poo = true
    while (and(go, lte(number, 1e20))) {
        go = cond([
            [x => x < 2, T],
            [x => isTwo(x), F],
            [x => modTwoThree(x), T],
            [x => check2(x), T],
            [T, F]
        ])(number)
        poo = go === isPrime(number)
        if (poo) {
            l('caught poo', go, number)
            return number
        }
        if (not(go)) yield number
        number++;
        go = true;
    }
}


const pairs = n => chain(i => map(j => [i, j], range(i, n + 1)), range(1, n + 1));
//console.log(pairs(10))
const factors = n => pairs(n).filter(([i, j]) => i * j === n);
//console.log(factors(10))
// console.log(check(5))

let it = Fwp();
// for (let value of it) {
//     console.log(`Primes: ${value}`)
// }
//times(() => console.log(it.next().value), 3);
//times(i => console.log(check(i)), 10)

// const arr = range(1,10)
// console.log(arr)
// forEach(x => console.log(check(x)), arr)

const likes = names => {
    let len = names.length;
    const getLength = x => x.length - 2;
    // const print = names => len === 1  ? return `${names[0]} likes this`
    // ?
    // len === 0 ? return 'no one likes this :

    switch (len) {
        case 0:
            return "no one likes this";
            break;
        case 1:
            return `${names[0]} likes this`;
            break;
        case 2:
            return `${names[0]}, ${names[1]} like this`;
            break;
        case 3:
            return `${names[0]}, ${names[1]}, and ${names[2]} like this`;
            break;
        default:
            return `${names[0]}, ${names[1]}, and ${getLength(names).toString()} others like this`;
    }
};

// console.log(likes([]))
// console.log(likes(["Alex", "George"]))
// console.log(likes(["Alex", "George", "Macy"]))
// console.log(likes(["Alex", "George", "Macy", "Lindsay"]))
// console.log(likes(["Alex", "George", "Macy", "Lindsay", "Kate"]));

const orders = () => {}

// assert.equals(order("is2 Thi1s T4est 3a"), "Thi1s is2 3a T4est");
// assert.equals(
//   order("4of Fo1r pe6ople g3ood th5e the2"),
//   "Fo1r the2 g3ood 4of th5e pe6ople"
// );
// assert.equals(order(""), "");

let str = 'is2 This1 a3 te4st'
const vowels = /(?:[aeiou]+)/gi
let k = /(?:\d+)/g

const comparator = (a, b) => {
    // l(a.match(k), b.match(k))

    return parseInt(a.match(k), 10) > parseInt(b.match(k), 10) ? 1 : -1

}

//var s = arr.slice(0, arr.length - 1).join(", ") + ", and " + arr.slice(-1);
function order(s) {
    return s.split(' ').sort(comparator).join(' ')
}

// l(str.split(' ').sort(comparator))
// l(order(str))
// l(comparator('is288', 'te4s9ts'))

const vowelCount = s => s.split('').map(v => v.match(vowels)).reduce((x, y) => y === null ? x + 0 : x + y.length, 0)


// l(vowelCount('a aa aaa aaaaaa a a a aaaaaaaa'))
// l('a aa aaa aaaaaa a a a aaaaaaaa'.split())
// l('iisdpisaudps'.split())

const p = 'a aa aaa aaaaaa a a a aaaaaaaa'
// l(p.split('').map((v, i, a) => v.match(/(?:[aeiou]+)/gi)))
// l(vowelCount(p))

const bin = p => (p >>> 0).toString(2)

l(bin(1234))
const openOrSenior = xs => xs.map((v) => v.reduce((x, y) => (x > 54 && y > 6) ? 'Senior' : 'Open'))

// l(openOrSenior([]));


const duplicateCount = x => x.split('').map(
    (v, i, a) => {
        let count = 0
        for (let letter of a.slice(i, a.length).entries()) {
            letter[1] === v ? count++ : 0
        }
        return count === 2 ? 1 : 0
    }).reduce((x, y) => x + y)

// l(duplicateCount('aalsls'))











assert.deepEqual(openOrSenior([
    [45, 12],
    [55, 21],
    [19, -2],
    [104, 20]
]), [
    "Open",
    "Senior",
    "Open",
    "Senior"
]);
assert.deepEqual(openOrSenior([
    [3, 12],
    [55, 1],
    [91, -2],
    [54, 23]
]), [
    "Open",
    "Open",
    "Open",
    "Open"
]);
assert.deepEqual(openOrSenior([
    [59, 12],
    [55, -1],
    [12, -2],
    [12, 12]
]), [
    "Senior",
    "Open",
    "Open",
    "Open"
]);

// assert.equal(duplicateCount(""), 0);
// assert.equal(duplicateCount("abcde"), 0);
// assert.equal(duplicateCount("aabbcde"), 2);
// assert.equal(duplicateCount("aabBcde"), 2, "should ignore case");
// assert.equal(duplicateCount("Indivisibility"), 1);
// assert.equal(
//   duplicateCount("Indivisibilities"),
//   2,
//   "characters may not be adjacent"
// );


const comparator2 = (a, b) => parseInt(a, 10) > parseInt(b, 10) ? 1 : -1;

const comp = (a1, a2) => {
    if (a1.length !== a2.length) return false
    a2_sorted = a2.sort(comparator2)
    return a1.sort(comparator2).map((v, i) => {
        for (let num of a2_sorted.slice(i, a2.length).entries()) {
            console.log(num[1], v)
            if (num[1] > v ? Math.sqrt(num[1]) === v : Math.sqrt(v) === num[1]) return true
        }
        return false
    }).reduce((x, y) => x && y)
}

a1 = [121, 144, 19, 161, 19, 144, 19, 11];
a2 = [
    11 * 11,
    121 * 121,
    144 * 144,
    19 * 19,
    161 * 161,
    19 * 19,
    144 * 144,
    19 * 19
];
assert.equal(comp(a1, a2), true);

a3 = [121, 144, 19, 161, 19, 144, 19, 12];
a4 = [
    11 * 11,
    121 * 121,
    144 * 144,
    19 * 19,
    161 * 161,
    19 * 19,
    144 * 144,
    19 * 19
];

// l(a1.sort(comparator2))
// l(a2.sort(comparator2))
// l(comp(a3, a4))
// l(comp(a1, a2));

const comp2 = (a1, a2) => {
    if (a1.length !== a2.length) return false;
    a2s = a2.sort(comparator2);
    return a1
        .sort(comparator2)
        .map((v, i) => {
            console.log(a2s[i], v);
            return (a2s[i] > v ? Math.sqrt(a2s[i]) === v : Math.sqrt(v) === a2s[i]) ? true : false

        })
        .reduce((x, y) => x && y);
};

// l(comp2(a3, a4));
// l(comp2(a1, a2));

// l(!!a2)

// let a5 = []
// l(!!a5)



//const reg = v => { return RegExp('('.concat(v.slice(0,1),')\\1'),'g') }
//const tripledouble = (n1, n2) => !!n1 && !!n2 && n1.toString().match(/(\d)\1\1/g).map((v) => reg(v).test(n2.toString())).reduce((x,y) => x || y) ? 1 : 0



const reg = v => {
    return RegExp(`(${v.slice(0,1)})\\1`, 'g')
}
const tripledouble = (n1, n2) => (!!n1 && !!n2 && (n1.toString().match(/(\d)\1\1/g) || []).map((v) => reg(v).test(n2.toString())).reduce((x, y) => x || y, false)) ? 1 : 0

//const reg = v => { return RegExp('('.concat(v.slice(0,1),')\\1'),'g') }
//const tripledouble = (n1, n2) => (!!n1 && !!n2 && (n1.toString().match(/(\d)\1\1/g) || []).map((v) => reg(v).test(n2.toString())).reduce((x,y) => x || y,false)) ? 1 : 0


// l(tripledouble(451999277, 41177722899));


// l(reg('7'))

assert.equal(tripledouble(451999277, 41177722899), 1);
assert.equal(tripledouble(1222345, 12345), 0);
assert.equal(tripledouble(12345, 12345), 0);
assert.equal(tripledouble(666789, 12345667), 1);
assert.equal(tripledouble(10560002, 100), 1);

function* fibonacci() {
    let fn1 = 0;
    let fn2 = 1
    yield fn1
    yield fn2
    while (fn2 < 100) {
        var current = fn1;
        fn1 = fn2;
        yield fn2 = current + fn1;

    }
}

// for (let n of fibonacci()) {
//     l('Fib', n)
// }

let product = (n1, n2) => n1 * n2
//let sum = add
let greaterThan = (x, y) => x > y

const fib2 = n => {
    if (greaterThan(0, n)) return false
    let n1 = 0
    let n2 = 1
    let current = 0
    let fp = 0
    let go = true
    while (go) {
        current = add(n1, n2)
        fp = product(n1, n2)
        if (fp === n) return true;
        //console.log('Fib2', current)
        n1 = n2
        n2 = current
        go = greaterThan(n, fp)
    }
    return false
}

const largest = (x, y) => x > y ? x : y
const scanSeq = compose(tail, scan(add, 0))
const maxSequence = arr =>
    isEmpty(arr) ? 0 :
    arr.map((v, i, a) => scanSeq(a.slice(i, arr.length)).reduce(largest)).reduce(largest)

const ms = compose(tail, scan(add, 0))

const ts = mapAccum((x, y) => [add(x, y), add(x, y)], 0)
//compose(reduce((x, y) => (x > y ? x : y), 0),

// l(fib2(1e19))
// l(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
// //l(compose(reduce((x,y) => x > y ? x : y,0),tail,scan(add,0))([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
// l(ts([-2, 1, -3, 4, -1, 2, 1, -5, 4]))
// l('a'.codePointAt(0))
// l('a'.charCodeAt(0))
// l('Z'.charCodeAt(0))
// l(range('A'.charCodeAt(0), 'z'.charCodeAt(0)))
// l(map(String.fromCharCode, range('A'.charCodeAt(0), 'z'.charCodeAt(0))))
var hoo = ["a", "c", "d", "e", "f"]

// const charCode = c => c.charCodeAt(0)
// const headCode = c => charCode(head(c))
// //const findMissingLetter = arr => 
// //l(map(charCode, hoo))


// const missing = x => range(headCode(x), headCode(reverse(x))+1)

// applySpec({
//     start: head,
//     len: length,
//     total: compose(sum, map(charCode))
// })
// l(map(charCode, hoo).reduce(add,0))
// l(missing(hoo).reduce(add,0))

// l(String.fromCharCode(Math.abs(map(charCode, hoo).reduce(add, 0) - missing(hoo).reduce(add, 0))))


const charCode = c => c.charCodeAt(0)
const headCharCode = compose(charCode, head)
const fullRange = arr => range(headCharCode(arr), headCharCode(reverse(arr)) + 1)
const missing = y => subtract(fullRange(y).reduce(add, 0), map(charCode, y).reduce(add, 0))
const findMissingLetter = x => compose(String.fromCharCode, Math.abs, missing)(x)

// l(missing(hoo))
// l(findMissingLetter(hoo))

// function findMissingLetter(array) {
//   var codes = array.map(a => a.charCodeAt(0)),
//     last = codes.length - 1,
//     sum = codes.reduce((a, b) => a + b),
//     expect = tap(l,(codes[last] + codes[0])) * tap(l,(codes[last] - codes[0] + 1))/ 2;
//     l(expect)
//     l(sum)

//   return String.fromCharCode(expect - sum);
// }

//l(missing(hoo));
//l(findMissingLetter(hoo));
//const parensAdd = compose(subtract(charCode(v)),head,slice(i,a.length),reverse)

// l(charCode('('))
// l(charCode(')'))
let yoo = ')))((( ((( (() ((())) ( (()) (()) () ) ))) '
let yoo2 = '()()()()()()()(ssssss)()()()()()()()()(())'
//l(yoo.split('').map((v,i,a) => charCode(v)).reduce((x,y) => y === 41 ? x - y : x + y))
// l(yoo.match(/[()]/g)) //map((v,i,a) => v.charCodeAt(0) === 40 ? -1 * v.charCodeAt(0) : v.charCodeAt(0) ).reduce((x,y) => x + y))
// l(yoo.match(/[()]/g))

// l(yoo.match(/[()]/g)
//     .map((v, i, a) => {
//         return compose(subtract(charCode(v)), charCode,head,slice(i, a.length), reverse)(a)
//         // let na = head(reverse(a).slice(i, a.length))
//         // //if (charCode(v) === 41) return 0
//         // return subtract(charCode(na),charCode(v))
//  }))
//  l(yoo.match(/[()]/g).map((v, i, a) => {
//      let na = reverse(a).slice(i, a.length);
//      //if (charCode(v) === 41) return 0
//      for (let p of na) {
//        return subtract(charCode(p), charCode(v))
//      }
//      return 1;
//    }));

//const FirstFactorial = n => n === 1 ? 1 : n * FirstFactorial(n-1) 

const getIndex = s => s.match(/[()]/g).join('').indexOf('()')
const checkIndex = s => getIndex(s) === -1
const checkString = either(isEmpty, checkIndex)
const reduceString = s => checkString(s) ? s : reduceString(s.slice(0, getIndex(s)).concat(s.slice(getIndex(s) + 2, s.length)))


//l(yoo.match(/[()]/g).join(''))

//l(yoo.match(/[()]/g).join('').indexOf('()'))
let yoo3 = '()()()()()()()()()()()()()()()()(()))'.match(/[()]/g).join('')
let loplp = yoo2.length
// l(loplp)
// for(let i = 0; i < (loplp/2)  ; i++) {
//     l(i)
//     yoo3 = slicer(yoo3)
//     l(yoo3)
// }
// l(reduceString(yoo2.match(/[()]/g).join("")));
// l(''.match(/[()]/g));








const findNb = m => {
    let n = 0
    for (let i = 1; i < (Math.ceil(Math.pow(m, 1 / 3))); i++) {
        n += Math.pow(i, 3)
        if (subtract(m, n) === 0) return i
        if (subtract(m, n) < 0) return -1
    }
}

const digits = (num, exp) => num.toString().split('').map((v, i) => Math.pow(parseInt(v), exp + i)).reduce((x, y) => x + y)
// const digPow = (n, p) => {
//     let e = 1
//     let val = digits(n, e)
//     while (val <= n) {
//         if (val === n) return 1;
//         l(v)
//         val = digits(n, e++)
//     }
//     return -1
// }
const digPow = (num, exp) => {
    let val = num.toString().split('').map((v, i) => Math.pow(parseInt(v), exp + i)).reduce((x, y) => x + y)
    return val % num === 0 ? val / num : -1
}
// l(digPow(46288, 3))

const digPow1 = (n, p) => {
    var x = String(n).split("").reduce((s, d, i) => s + Math.pow(d, p + i), 0)
    return x % n ? -1 : x / n
}
// l(digPow1(90, 1))



// assert.equal(findNb(4183059834009), 2022);
// assert.equal(findNb(24723578342962), -1);
// assert.equal(findNb(135440716410000), 4824);
// assert.equal(findNb(40539911473216), 3568);

// assert.equal(digPow(89, 1), 1);
// assert.equal(digPow(92, 1), -1);
// assert.equal(digPow(46288, 3), 51);

const gap = (g, start, end) => {
    let pair = []
    for (let s = start; s <= (end - g); s++) {
        let value = range(s, s + (g + 1)).filter(x => isPrime(x))
        if (value.length === 2 && value.reduce((x, y) => y - x) === g) return value
    }
    return null
}
//.reduce((x,y,i,a) => y - x === g && x > 0 ? [x, y] : Array.isArray(x) ? x : (i !== a.length - 1) ? y : null)

// l(gap(367 - 359, 358, 370));

assert.deepEqual(gap(2, 100, 110), [101, 103]);
assert.deepEqual(gap(4, 100, 110), [103, 107]);
assert.deepEqual(gap(6, 100, 110), null);
assert.deepEqual(gap(8, 300, 400), [359, 367]);

assert.deepEqual(gap(10, 300, 400), [337, 347]);
// v, b[b.length - (i +1 ) ]] : ['0', v])//
const unevenZip = (a, b) => a.reverse().map((v, i, x) => b[i] ? parseInt(v, 10) + parseInt(b[b.length - (i + 1)], 10) : parseInt(v, 10))
// const  sumStrings(a,b) => [a,b].reduce((x,y) => parseInt(x, 10) + parseInt(y,10)).toString()
var g1 = '712569312664357328695151392'
var g3 = '712569312664357328695151392'
var g2 = '71256931266328695151392'

const sumStrings = (a, b) => {
    let x = a.split('')
    let y = b.split('')
    let value = x.length > y.length ? unevenZip(x, y) : unevenZip(y, x)
    let f = 0
    let v2 = value.map((v, i, a) => {
        let n = v + f
        let ns = n.toString().split('').reverse()
        ns.length > 1 ? f = parseInt(ns[1]) : f = 0
        return parseInt(ns[0])
    })
    f > 0 ? v2.push(f) : v2
    return v2.reverse().join('').replace(/\b0+/g, '')
}

// l(sumStrings('00103', '08567'))
// l(sumStrings(g1,g3).length)
// l(sumStrings(g1,g3))
// l(unevenZip(g1.split(''),g3.split('')))
//l(unevenZip(g1.split(''),g3.split('')).length)

l1 = [1, 4, 8, 7, 7, 15];
l2 = [1, -2, 3, 0, -6, 1];
l3 = [20, -13, 40];
l4 = [1, 2, 3, 4, 1, 0];
l5 = [10, 5, 2, 3, 7, 5];
l6 = [4, -2, 3, 3, 4];
l7 = [0, 2, 0];
l8 = [5, 9, 13, -3];
l9 = [1, 4, 8, 7, 7, 15, 2, 6];

const subpair = x => x[0] - x[1]
const pairCompare = (x, y) => {
    return subpair(y) > subpair(x) && y[1] < x[1] ? y : x
}
const sum_Pairs = (arr, n) => {
    let value = arr
        .map((v, i, a) => {
            for (let x of a.slice(i, a.length).entries()) {
                if (add(v, x[1]) === n && i !== x[0] + i) return [i, x[0] + i]
            }
        }) //.reduceRight((x, y) => x.concat(y), [])
    return value //.length > 0 ? value.reduce(pairCompare).map(x => arr[x]) : undefined 
}

// var sum_pairs = function(ints, s) {
//   var seen = {};
//   for (var i = 0; i < ints.length; ++i) {
//     //l('s',seen)
//     //l(seen[s - ints[i]])
//     if (seen[s - ints[i]]) return [s - ints[i], ints[i]];
//     seen[ints[i]] = true;
//   }
// };
const sum_pairs = (arr, n) => {
    //let p = arr.reduce((x,y,i) => x.length > 0 && x.some(z => z[1] === y) ? x : x.concat([[i,y]]), [])
    let p = []
    for(let x of arr.entries()){
    if(!p.some(y => y[1] === x[1] && y[1] + x[1] !== n) ) {
         let t = p.find((v,i,a) => v[1] + x[1] === n )
         if(t) return [t[1], x[1]]
         p = p.concat([x])
        }
    }
};

// const sum_pairs = (arr, n) => {
//     let p1 = []
//     let p2 = arr.length
//     for (let x of arr.entries()) {
//         l(arr.filter(y => y + x[1] === n ))

//         }
//     return //p1.map(x => arr[x])
// }

const allarrs = [
    [l1, 8],
    [l2, -6],
    [l3, -7],
    [l4, 2],
    [l5, 10],
    [l6, 8],
    [l7, 0],
    [l8, 10],
    [l9, 8]
];


l(map(x => sum_pairs(...x), allarrs))
//l('l', sum_pairs(l5, 10))
const printRand = () =>
    Math.floor(10 * Math.random()) > 3 ?
    1 * Math.floor(10 * Math.random()) :
    -1 * Math.floor(10 * Math.random());
let printOne = () => 1
let tt = process.hrtime()
let randomOne = () => times(printOne, 5000000).concat(5).concat(5)

// //let random = times(printRand, 2e6)
l('Rand', sum_pairs(randomOne(), 10))
l(process.hrtime(tt));


// const sum_pairs = (arr, n) => {
//   let p1 = [];
//   let p2 = 0;
//   for (let x of arr.entries()) {
//     p1.length > 0 ? (p2 = arr.length - p1[1]) : (p2 = p2);
//     l(p2);
//     for (let y of arr.slice(x[0], arr.length).entries()) {
//       if (add(x[1], y[1]) === n && x[0] !== y[0] + x[0]) {
//         p1.length === 0
//           ? (p1 = [x[0], y[0] + x[0]])
//           : (p1 = pairCompare(p1, [x[0], y[0] + x[0]]));
//         break;
//       }
//     }
//     return p1; //.map(x => arr[x])
//   }
// };
const dpairs = n =>  range(1, Math.ceil(Math.sqrt(n)) + 1 ).reduce((x,y,i,a) => !x.some(z => z[1] === y)  &&  equals(0,modulo(n, y)) ? x.concat([[y, n/y]]) : x, []  )
const flatter = n => n.reduce((x,y) => x.concat(y))
const common = n => n.reduce((x,y,i,a) => a.some(z => z === y) && !x.some(z => z === y) ? x.concat([y]) : x, [])
  //let p = arr.reduce((x,y,i) => x.length > 0 && x.some(z => z[1] === y) ? x : x.concat([[i,y]]), [])
//  { let p = [];
//   for (let x of  range(1, Math.floor((n+1)/2))) {
//      !p.some(y => y[1] === x)  && equals(0,modulo(n, x)) ? p.push([x, n/x]) : p
//   }
//   return p
// };
const factors3 = n => { let p = range(1, Math.floor((n+1)/2)) }
const pairs2 = n => chain(i => map(j => [i, j], range(i, Math.ceil((n+1)/2))), range(1, Math.ceil((n+1)/2)))
//console.log(pairs(10))
const factors2 = n => pairs2(n).filter(([i, j]) => i * j === n).concat([[1,n]]);
const ttt = process.hrtime()
l(ttt)
l(dpairs(360))
const dd1 = flatter(dpairs(12)).filter(x => flatter(dpairs(4)).some(y =>  y === x) )
 
const nbrLaps = (x,y) => map(c => divide(c,compose(reduce((a,b) => a > b ? a : b,0),filter(z => contains(z,flatten(dpairs(y)))),flatten,dpairs)(x)), [x,y])
l(nbrLaps(4,6))


l(dd1)
l(process.hrtime(ttt));
// const ttt2 = process.hrtime()
// l(ttt2)
// l(factors(100))
// l(process.hrtime(ttt2))
// const ttt3 = process.hrtime();
// l(factors2(100))
// l(process.hrtime(ttt3))

// function gcd(a, b) {
//   if (b == 0) return a;
//   return gcd(b, a % b);
// }

// var nbrOfLaps = function(x, y) {
//   var lcm = x * y / gcd(x, y);
//   return [lcm / x, lcm / y];
// };

const iqTest = (numbers) => numbers.split(' ')
                                    .map((x,i) => [i+1,parseInt(x,10) % 2 === 0])
                                    .reduce((x,y,i,z) => z.filter(a => a[1] === x[1]).length > 1 ? y : x)[0]




const minC = compose(reduce((a,b) => a < b ? a : b, Infinity),map(Math.floor),values)
const cakes = (r, a) => map(x => has(x, a) , keys(r)).reduce((a,b) => a && b, true) ?  minC(mergeWith(divide,a,r)) : 0


// // must return 2
// l(cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200}))
// // must return 0
// l(cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000}))

const minQ = q => q.reduce((a,b) => a < b ? a : b, Infinity)
const maxQ = q => q.reduce((a,b) => a > b ? a : b, 0)
const getMinQIdx = q => q.findIndex(x => minQ(q) === x)
const queueTime = (ls, n) => ls.length > n ? maxQ(ls.reduce((a,b,i) => i < n ? a.concat(b) :  a.map((v,j,c) =>  j === getMinQIdx(c) ? v + b : v) ,[])) : maxQ(ls)

l(queueTime([], 1))
l(queueTime([1,2,3,4], 1))
l(queueTime([2,2,3,3,4,4, 8,7,6,4,3,2,5,2,5,42,4,3,4], 2))
l(queueTime([1,2,3,4,5], 100))
l('//////////////////////////////////')
l(queueTime([9,17,7,19,15,3,13,2,14,16,1,3,8,2,14,11,16,11,15,17,10,18,14,16,7,18,7,8,16,5,18,1,2,14,15,11,17,5,7,14,6,4,17,15,10,14,1,18,15,8,2,10,16,9,10,19,4,1,12,19,6,3,14,3,7,7,2,17,19,19,9,8,16,19,14,20,19,3,20,20,3,9,4,4,16,19,4,9,19,10,19,12,15,9,15,1,1,11,4,8,1,17,13,9,4,17,11,3,16,5,6,13,8,7,13,2,15,6,5,6,18,11,13,8,2,20,9,15,11,8],7))

let longQ = [9,17,7,19,15,3,13,2,14,16,1,3,8,2,14,11,16,11,15,17,10,18,14,16,7,18,7,8,16,5,18,1,2,14,15,11,17,5,7,14,6,4,17,15,10,14,1,18,15,8,2,10,16,9,10,19,4,1,12,19,6,3,14,3,7,7,2,17,19,19,9,8,16,19,14,20,19,3,20,20,3,9,4,4,16,19,4,9,19,10,19,12,15,9,15,1,1,11,4,8,1,17,13,9,4,17,11,3,16,5,6,13,8,7,13,2,15,6,5,6,18,11,13,8,2,20,9,15,11,8]

// let mLq = q => {
//     let p = 0

//     let f = []
//     l(q.length -6)
//     l([q.slice(p, p + 7)]);  
//     while(p < q.length - 6){
//         f.push(q.slice(p,p+7))
//         p+=7
//     }
//     return f
// }
// l(mLq(longQ).reduce((x,y) => x.map((a,i) => y[i] ? a + y[i] : a))) 

// class Queue {
//   constructor(customers, numberOfTills) {
//     this.customers = customers;
//     this.tills = Array(numberOfTills).fill(0);
//     this.minutes = 0;
//   }

//   availableTill() {
//     return this.tills.indexOf(0);
//   }

//   balanceTills() {
//     const lowestRemainingTime = Math.min(...this.tills);
//     l('lrt', lowestRemainingTime)
//     l('before', this.tills)
//     this.tills = this.tills.map(v => v - lowestRemainingTime);
//     l('after', this.tills)
//     this.minutes += lowestRemainingTime;
//     l('minutes', this.minutes)
//   }

//   moveCustomerToAvailableTill(customer) {
//     let availableTill = this.availableTill();
//     if (availableTill >= 0) {
//       this.tills[availableTill] = customer;
//     }
//   }

//   estimateTime() {
//     this.customers.forEach(customer => {
//       this.balanceTills();
//       this.moveCustomerToAvailableTill(customer);
//     });

//     this.minutes += Math.max(...this.tills);
//     return this.minutes;
//   }
// }

// const queueTime1 = (customers, numberOfTills) => {
//   return new Queue(customers, numberOfTills).estimateTime();
// };

// // l(queueTime1([], 1));
// //l(queueTime1([1, 2, 3, 4], 1));
//  l(queueTime1([2, 2, 3, 3, 4, 4, 8, 7, 6, 4, 3, 2, 5, 2, 5, 42, 4, 3, 4], 2));
// // l(queueTime1([1, 2, 3, 4, 5], 100));

// process.stdin.resume();
// process.stdin.setEncoding('ascii');

// var input_stdin = "";
// var input_stdin_array = "";
// var input_currentline = 0;

// process.stdin.on('data', function (data) {
//     input_stdin += data;
// });

// process.stdin.on('end', function () {
//     input_stdin_array = input_stdin.split("\n");
//     main();
// });

// function readLine() {
//     return input_stdin_array[input_currentline++];
// }

// /////////////// ignore above this line ////////////////////

// function simpleArraySum(n, ar) {
//     // Complete this function
// }

// function main() {
    // var n = parseInt(readLine());
    // ar = readLine().split(' ');
    // ar = ar.map(Number);
    // var result = simpleArraySum(n, ar);
    // process.stdout.write("" + result + "\n");

// }
let globalInt = 0
function processData(input) {
console.info('Process Data', globalInt)
globalInt++ 
if(globalInt > 1) process.stdin.end()
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";

process.stdin.on("data", function (input) {
    _input += input;
    processData(_input);
});

process.stdin.on("end", function () {
    processData(_input);
});