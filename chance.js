const c = require('chance')
const r = require('sanctuary')


chance = new c.Chance(Math.random() * 100);
const unique = number => func => chance.unique(func, number);


console.log(r.fromMaybe([],r.Just(unique(10)(chance.domain))))

//console.log(r.compose(r.map(r.toLower), r.map(r.toUpper))(r.Just(unique(10)(chance.domain))))
// var request = require("request");
// var url = "https://requestb.in/1jaw2z61";
// request(url, function(error, response, body) {
//   if (!error) {
//     console.log(body);
//   }
// });