// Here's our generator function
// Note the asterisk and the yield statements
// that is what defines a generator function
function *theGenerator(){
	yield "One, for the money";
	yield "Two, for the show";
	yield "Three to get ready! Now go, cat, go";
};

// Now we create an instance of the generator object
var elvis = theGenerator();

// Now we can get the next value from the 
// instance. 
// Nothing happens until we call .next(),
// so Node is free to do something else in the meantime
console.log(elvis.next().value); // outputs “First”
console.log(elvis.next().value); // outputs “Second”
console.log(elvis.next().value); // outputs “Third”
/*
console.log(elvis.next()); // ouputs { value: undefined, done: true }
console.log(elvis.next()); // throws Error: Generator has already finished*/