/**
 * TODO:
 * - [ ] REPL-driven development (see jak + daxter lisp)
 * - [ ] Test-driven development
 * - [ ] Clean Architecture
 * - [ ] Array and Object destructuring
 */
const express = require('express');

const app = express();

// object
// class CounterService {
//     _count;
//     constructor(initialCount) {
//         this._count = initialCount;
//     }
//
//     increment(value) {
//         this._count += value
//         return this._count;
//     }
// }
// const counter = new CounterService(0);

// Prototype vs. Class(above) - https://medium.com/@parsyval/javascript-prototype-vs-class-a7015d5473b
// let counter = new CounterService(0);
// const CounterService = function (initialCount) {
//     this._count = initialCount;
// }
//
// CounterService.prototype.increment = function (value) {
//     this._count += value;
// }

// lambda notation/arrow function

// same as:
// const increment = (count) => (value) => {
//     return count += value;
// }

const counterService = (initialCount) => {
    let _value = initialCount;
    return {
        increment: (value) => _value += value,
        decrement: (value) => _value -= value,
        get: () => _value
    };
};

// const counterService = (initialCount) => {
//     let count = initialCount;
//     const increment = (value) => {
//         count += value;
//         return count;
//     }
//
//     return {increment: increment};
// }

// const counterService = (initialCount) => {
//     let count = initialCount;
//     const increment = (value) => count += value
//     return {increment};
// }

const counter = counterService(0);

/*
client - mobile app/web client/service that depends on our counter

[client] -> [counter app]
   [counter app] = [adapter = http] -> [counter service] -> [persistence]

 */

/* GET home page. */
// router.get('/count', function(req, res, next) {
//   res.render('index', { title: 'Express API' });
// });

const isValid = (operation, isValid) => (value) => {
    if (isValid(value)) {
        return value
    }
    throw `Invalid ${operation}`;
};

const isValidIncrement = isValid('increment', (value) => value >= 0);
const isValidDecrement = isValid('decrement', (value) => value >= 0);

/*GET current count */
app.get('/count', (_req, res) => res.send(`Current count: ${counter.get()}`))

/*POST counter */
app.post('/increment/', (req, res) => res.send(`Updated count: ${counter.increment(1)}`))

app.post('/increment/:amount', (req, res) =>
    res.send(`Updated count: ${counter.increment(isValidIncrement(parseInt(req.param('amount'))))}`))

app.post('/decrement/:amount', (req, res) =>
    res.send(`Updated count: ${counter.decrement(isValidDecrement(parseInt(req.param('amount'))))}`))


// error handler
app.listen(3000)
