'use strict';
var $ = require('most');
var { create } = require("@most/create");

// observable => stream

module.exports = observable => create((add, end, error) => {
  observable.subscribe({
    onNext      : data  =>  add(data),
    onError     : err => error(err),
    onCompleted : ()    =>  end()
  })
  return () => console.log('disposed')
});
