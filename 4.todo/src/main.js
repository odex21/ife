import {foo} from './lib.js';
console.log(foo);
setTimeout(() => console.log(foo), 500);

@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true