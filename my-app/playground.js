'use strict'

const person = {
  name: 'Jin',
  whatIsThis() {
      console.log(this);
  }
};

person.whatIsThis(); // person {}

const sayHi = person.whatIsThis;
sayHi(); // global