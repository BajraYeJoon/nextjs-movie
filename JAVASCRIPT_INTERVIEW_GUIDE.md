# JAVASCRIPT CORE CONCEPTS - INTERVIEW GUIDE

Complete refresher for mid-level frontend engineer interviews with tricky questions, code examples, and theoretical answers.

---

# PART 1: THEORETICAL INTERVIEW ANSWERS

Master these explanations to confidently answer conceptual questions.

---

## **1. EXPLAIN CLOSURES**

**Q: What is a closure? Can you explain it in simple terms?**

**ANSWER:**

"A closure is when a function remembers and has access to variables from its outer scope, even after the outer function has finished executing. 

In simple terms, it's like a backpack that a function carries around - it contains all the variables that were in scope when the function was created.

**Key points:**
- Functions in JavaScript form closures
- Inner functions have access to outer function variables
- The outer function's variables stay alive as long as the inner function exists
- Closures are created every time a function is created

**Real-world use case:**
- Data privacy (private variables)
- Factory functions
- Event handlers that need to remember state
- Callbacks that need access to outer scope

**Example in one sentence:**
'A closure gives you access to an outer function's scope from an inner function.'"

---

## **2. EXPLAIN THE EVENT LOOP**

**Q: How does the JavaScript event loop work?**

**ANSWER:**

"JavaScript is single-threaded, meaning it can only execute one piece of code at a time. The event loop is the mechanism that allows JavaScript to perform non-blocking operations despite being single-threaded.

**How it works:**

1. **Call Stack**: Executes synchronous code (LIFO - Last In First Out)
2. **Web APIs**: Browser handles async operations (setTimeout, fetch, DOM events)
3. **Callback Queues**: 
   - **Microtask Queue** (higher priority): Promises, queueMicrotask
   - **Macrotask Queue** (lower priority): setTimeout, setInterval, I/O
4. **Event Loop**: Continuously checks if call stack is empty, then moves tasks from queues

**Execution order:**
1. Execute all synchronous code (call stack)
2. Execute all microtasks (promises)
3. Execute one macrotask (setTimeout)
4. Repeat

**Key insight:** Promises always execute before setTimeout, even if setTimeout has 0 delay, because microtasks have higher priority than macrotasks.

**In one sentence:**
'The event loop continuously checks the call stack and queues, executing code in a specific priority order: synchronous code first, then microtasks, then macrotasks.'"

---

## **3. EXPLAIN 'THIS' KEYWORD**

**Q: How does the 'this' keyword work in JavaScript?**

**ANSWER:**

"The value of 'this' depends on how a function is called, not where it's defined. It's determined at runtime.

**Four binding rules (in order of precedence):**

1. **new binding**: When called with `new`, `this` is the newly created object
   ```javascript
   const obj = new MyFunction(); // this = obj
   ```

2. **Explicit binding**: Using `call`, `apply`, or `bind`
   ```javascript
   func.call(obj); // this = obj
   ```

3. **Implicit binding**: When called as a method
   ```javascript
   obj.method(); // this = obj
   ```

4. **Default binding**: Standalone function call
   ```javascript
   func(); // this = global (or undefined in strict mode)
   ```

**Arrow functions are different:**
- They don't have their own `this`
- They inherit `this` from the enclosing lexical scope
- Cannot be bound with `call`, `apply`, or `bind`
- Cannot be used as constructors

**Common gotcha:**
When you extract a method from an object, it loses its context:
```javascript
const greet = obj.greet; // Lost context
greet(); // this = global, not obj
```

**In one sentence:**
'this is determined by how a function is called: new binding > explicit binding > implicit binding > default binding, except arrow functions which inherit this from their lexical scope.'"

---

## **4. EXPLAIN PROTOTYPES**

**Q: What are prototypes in JavaScript?**

**ANSWER:**

"JavaScript is a prototype-based language. Every object has an internal link to another object called its prototype. When you try to access a property on an object, JavaScript first looks on the object itself, then walks up the prototype chain until it finds the property or reaches null.

**Key concepts:**

1. **Prototype chain**: Objects inherit properties from their prototype
2. **`__proto__`**: Internal link to an object's prototype (deprecated, use Object.getPrototypeOf)
3. **`prototype`**: Property on constructor functions, becomes `__proto__` of instances
4. **Constructor function**: Function used with `new` to create objects

**How it works:**
```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, ${this.name}`;
};

const alice = new Person('Alice');
// alice.__proto__ === Person.prototype
// Person.prototype.__proto__ === Object.prototype
// Object.prototype.__proto__ === null
```

**Benefits:**
- Memory efficiency: Methods shared across all instances
- Inheritance: Objects can inherit from other objects
- Dynamic: Can add methods to all instances at runtime

**In one sentence:**
'Prototypes are the mechanism by which JavaScript objects inherit properties and methods from other objects, forming a chain that JavaScript traverses when looking up properties.'"

---

## **5. EXPLAIN HOISTING**

**Q: What is hoisting in JavaScript?**

**ANSWER:**

"Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the compilation phase, before code execution.

**What gets hoisted:**

1. **`var` declarations**: Hoisted and initialized to `undefined`
   ```javascript
   console.log(x); // undefined (not ReferenceError)
   var x = 5;
   ```

2. **Function declarations**: Fully hoisted (declaration + definition)
   ```javascript
   greet(); // Works!
   function greet() { return 'Hi'; }
   ```

3. **`let` and `const`**: Hoisted but in "Temporal Dead Zone" (TDZ)
   ```javascript
   console.log(x); // ReferenceError
   let x = 5;
   ```

4. **Function expressions**: Only variable is hoisted, not the function
   ```javascript
   greet(); // TypeError: greet is not a function
   var greet = function() { return 'Hi'; };
   ```

**Temporal Dead Zone (TDZ):**
- Period between entering scope and variable declaration
- Accessing variable in TDZ throws ReferenceError
- Applies to `let`, `const`, and `class`

**Best practice:**
- Declare variables at the top of their scope
- Use `const` by default, `let` when reassignment needed
- Avoid `var` in modern JavaScript

**In one sentence:**
'Hoisting moves variable and function declarations to the top of their scope during compilation, but var is initialized to undefined while let/const remain in a temporal dead zone until their declaration is reached.'"

---

## **6. EXPLAIN PROMISES**

**Q: What are Promises and how do they work?**

**ANSWER:**

"A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's a placeholder for a value that will be available in the future.

**Three states:**
1. **Pending**: Initial state, neither fulfilled nor rejected
2. **Fulfilled**: Operation completed successfully (resolved)
3. **Rejected**: Operation failed

**Key characteristics:**
- Once settled (fulfilled or rejected), a promise cannot change state
- Promises are immutable - you can't change the resolved value
- Promises are eager - they start executing immediately when created
- Promises are always asynchronous, even if resolved immediately

**Why use Promises:**
- Avoid callback hell (pyramid of doom)
- Better error handling with `.catch()`
- Chainable with `.then()`
- Can compose multiple async operations

**Promise methods:**
- **`Promise.all()`**: Wait for all, fail fast (rejects if any fails)
- **`Promise.race()`**: First to settle wins
- **`Promise.allSettled()`**: Wait for all, never rejects
- **`Promise.any()`**: First to fulfill wins, rejects if all fail

**Async/await:**
- Syntactic sugar over promises
- Makes async code look synchronous
- `await` pauses execution until promise settles
- Must be used inside `async` function
- Better error handling with try/catch

**In one sentence:**
'A Promise is an object that represents a future value from an asynchronous operation, with three states (pending, fulfilled, rejected) and methods to handle success or failure.'"

---

## **7. EXPLAIN SCOPE**

**Q: What are the different types of scope in JavaScript?**

**ANSWER:**

"Scope determines the accessibility of variables. JavaScript has three types of scope:

**1. Global Scope:**
- Variables declared outside any function or block
- Accessible from anywhere in the code
- In browsers, global variables become properties of `window`
- Avoid polluting global scope

**2. Function Scope:**
- Variables declared inside a function
- Only accessible within that function
- `var` is function-scoped
- Each function creates a new scope

**3. Block Scope:**
- Variables declared inside a block `{}`
- Only accessible within that block
- `let` and `const` are block-scoped
- Introduced in ES6

**Lexical Scope (Static Scope):**
- JavaScript uses lexical scoping
- Inner functions have access to outer function variables
- Scope is determined by where functions are defined, not where they're called
- This is what enables closures

**Scope Chain:**
- When accessing a variable, JavaScript looks in current scope
- If not found, looks in outer scope
- Continues up the chain until global scope
- If still not found, ReferenceError

**Key differences:**
```javascript
// var - function scoped
if (true) {
  var x = 1;
}
console.log(x); // 1 (accessible outside block)

// let - block scoped
if (true) {
  let y = 1;
}
console.log(y); // ReferenceError
```

**In one sentence:**
'Scope determines where variables are accessible: global scope (everywhere), function scope (within function), and block scope (within curly braces), with JavaScript using lexical scoping where inner functions can access outer function variables.'"

---

## **8. EXPLAIN ASYNC/AWAIT**

**Q: What is async/await and how does it differ from Promises?**

**ANSWER:**

"Async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code.

**How it works:**

1. **`async` keyword**: 
   - Makes a function return a Promise
   - Allows use of `await` inside the function
   - Even if you return a value, it's wrapped in a Promise

2. **`await` keyword**:
   - Pauses execution until Promise settles
   - Can only be used inside `async` functions
   - Returns the resolved value of the Promise
   - If Promise rejects, throws an error

**Comparison:**

**Promises:**
```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

**Async/Await:**
```javascript
async function getPosts() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    const postsResponse = await fetch(`/api/posts/${user.id}`);
    const posts = await postsResponse.json();
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}
```

**Benefits:**
- More readable, looks like synchronous code
- Better error handling with try/catch
- Easier debugging (better stack traces)
- Simpler control flow (if/else, loops)

**Important notes:**
- `await` pauses the function, not the entire program
- Multiple awaits run sequentially (use Promise.all for parallel)
- Top-level await is supported in modules (ES2022)
- Async functions always return a Promise

**In one sentence:**
'Async/await is syntactic sugar over Promises that allows you to write asynchronous code in a synchronous style, using await to pause execution until a Promise resolves, with better readability and error handling.'"

---

## **9. EXPLAIN CALL, APPLY, BIND**

**Q: What's the difference between call, apply, and bind?**

**ANSWER:**

"All three methods are used to explicitly set the value of `this` in a function, but they work differently:

**1. call():**
- Invokes the function immediately
- First argument is `this` value
- Remaining arguments passed individually
```javascript
func.call(thisArg, arg1, arg2, arg3);
```

**2. apply():**
- Invokes the function immediately
- First argument is `this` value
- Second argument is an array of arguments
```javascript
func.apply(thisArg, [arg1, arg2, arg3]);
```

**3. bind():**
- Does NOT invoke the function
- Returns a new function with `this` bound
- Can partially apply arguments
```javascript
const boundFunc = func.bind(thisArg, arg1, arg2);
boundFunc(); // Call later
```

**When to use each:**

**call**: When you know the arguments and want to invoke immediately
```javascript
Math.max.call(null, 1, 2, 3); // 3
```

**apply**: When arguments are in an array and want to invoke immediately
```javascript
Math.max.apply(null, [1, 2, 3]); // 3
// Modern alternative: Math.max(...[1, 2, 3])
```

**bind**: When you want to create a new function with fixed `this`
```javascript
const greet = user.greet.bind(user);
setTimeout(greet, 1000); // this is preserved
```

**Mnemonic:**
- **C**all: **C**omma separated arguments
- **A**pply: **A**rray of arguments
- **B**ind: **B**inds and returns new function

**In one sentence:**
'call and apply immediately invoke a function with a specified this value (call takes individual arguments, apply takes an array), while bind returns a new function with this permanently bound without invoking it.'"

---

## **10. EXPLAIN DEBOUNCING VS THROTTLING**

**Q: What's the difference between debouncing and throttling?**

**ANSWER:**

"Both are techniques to limit how often a function executes, but they work differently:

**Debouncing:**
- Delays function execution until after a period of inactivity
- Resets the timer if called again before delay expires
- Only executes once after user stops triggering the event
- **Use case**: Search input, window resize, form validation

**Example**: User types in search box
- User types 'r' → timer starts (500ms)
- User types 'e' → timer resets (500ms)
- User types 'a' → timer resets (500ms)
- User types 'c' → timer resets (500ms)
- User types 't' → timer resets (500ms)
- User stops typing → after 500ms, search executes ONCE

**Throttling:**
- Ensures function executes at most once per time period
- Ignores calls during the cooldown period
- Executes immediately, then blocks for specified time
- **Use case**: Scroll events, mouse movement, button clicks

**Example**: User scrolls page (throttle 1000ms)
- Scroll event 1 → executes immediately
- Scroll events 2-10 → ignored (within 1000ms)
- After 1000ms → next scroll event executes
- Pattern repeats

**Visual analogy:**
- **Debounce**: Elevator waiting for people to stop entering before closing doors
- **Throttle**: Elevator that only stops at every 5th floor

**Implementation:**

**Debounce:**
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

**Throttle:**
```javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

**In one sentence:**
'Debouncing delays execution until after inactivity (waits for user to stop), while throttling limits execution to once per time period (executes at regular intervals regardless of how many times triggered).'"

---

## **11. EXPLAIN SHALLOW VS DEEP COPY**

**Q: What's the difference between shallow and deep copy?**

**ANSWER:**

"The difference is how nested objects and arrays are copied:

**Shallow Copy:**
- Copies only the first level of properties
- Nested objects/arrays are copied by reference
- Changes to nested objects affect both copies
- **Methods**: Spread operator `{...obj}`, `Object.assign()`, `Array.slice()`

**Deep Copy:**
- Recursively copies all levels
- Creates completely independent copy
- Changes to nested objects don't affect original
- **Methods**: `JSON.parse(JSON.stringify())`, `structuredClone()`, custom recursive function

**Example:**
```javascript
const original = {
  name: 'Alice',
  address: { city: 'NYC' }
};

// Shallow copy
const shallow = { ...original };
shallow.address.city = 'LA';
console.log(original.address.city); // 'LA' (affected!)

// Deep copy
const deep = structuredClone(original);
deep.address.city = 'SF';
console.log(original.address.city); // 'LA' (not affected)
```

**When to use:**

**Shallow copy**: 
- Flat objects (no nesting)
- Performance critical (faster)
- You want to share nested references

**Deep copy**:
- Nested objects/arrays
- Need complete independence
- Immutable data patterns

**Gotchas:**
- `JSON.parse(JSON.stringify())` loses functions, dates, undefined, symbols
- `structuredClone()` is modern and handles most cases
- Spread operator only does shallow copy

**In one sentence:**
'Shallow copy duplicates only the top level (nested objects copied by reference), while deep copy recursively duplicates all levels creating a completely independent copy.'"

---

## **12. EXPLAIN MAP VS FOREACH**

**Q: What's the difference between map and forEach?**

**ANSWER:**

"Both iterate over arrays, but they serve different purposes:

**forEach:**
- Executes a function for each element
- Returns `undefined` (no return value)
- Used for side effects (logging, updating external state)
- Cannot break or continue
- Mutates external state

**map:**
- Transforms each element
- Returns a new array with transformed values
- Used for data transformation
- Pure function (no side effects)
- Original array unchanged

**Key differences:**

| Feature | forEach | map |
|---------|---------|-----|
| Return value | undefined | New array |
| Purpose | Side effects | Transformation |
| Chainable | No | Yes |
| Functional | No | Yes |
| Performance | Slightly faster | Slightly slower |

**When to use:**

**forEach**: 
```javascript
// Side effects
users.forEach(user => {
  console.log(user.name);
  sendEmail(user.email);
});
```

**map**:
```javascript
// Transformation
const names = users.map(user => user.name);
const doubled = numbers.map(n => n * 2);
```

**Common mistake:**
```javascript
// ❌ Don't use map for side effects
users.map(user => console.log(user)); // Returns array of undefined

// ✅ Use forEach for side effects
users.forEach(user => console.log(user));

// ❌ Don't use forEach when you need transformed data
let doubled = [];
numbers.forEach(n => doubled.push(n * 2));

// ✅ Use map for transformation
const doubled = numbers.map(n => n * 2);
```

**In one sentence:**
'forEach executes a function for side effects and returns undefined, while map transforms each element and returns a new array, making map ideal for data transformation and forEach for side effects.'"

---

## **13. EXPLAIN LET VS CONST VS VAR**

**Q: What's the difference between let, const, and var?**

**ANSWER:**

"These are three ways to declare variables with different scoping and mutability rules:

**var (old way, avoid in modern code):**
- Function-scoped (or global if outside function)
- Hoisted and initialized to undefined
- Can be redeclared in same scope
- No block scope
- Creates property on global object

**let (ES6):**
- Block-scoped
- Hoisted but in Temporal Dead Zone (TDZ)
- Cannot be redeclared in same scope
- Can be reassigned
- Not added to global object

**const (ES6):**
- Block-scoped
- Hoisted but in Temporal Dead Zone (TDZ)
- Cannot be redeclared in same scope
- Cannot be reassigned
- Must be initialized at declaration
- Object/array contents can still be modified

**Comparison table:**

| Feature | var | let | const |
|---------|-----|-----|-------|
| Scope | Function | Block | Block |
| Hoisting | Yes (undefined) | Yes (TDZ) | Yes (TDZ) |
| Redeclaration | Yes | No | No |
| Reassignment | Yes | Yes | No |
| Initialization | Optional | Optional | Required |

**Examples:**
```javascript
// var - function scoped
if (true) {
  var x = 1;
}
console.log(x); // 1 (accessible)

// let - block scoped
if (true) {
  let y = 1;
}
console.log(y); // ReferenceError

// const - cannot reassign
const z = 1;
z = 2; // TypeError

// const object - can mutate
const obj = { a: 1 };
obj.a = 2; // OK
obj = {}; // TypeError
```

**Best practices:**
1. Use `const` by default
2. Use `let` only when you need to reassign
3. Never use `var` in modern JavaScript

**In one sentence:**
'var is function-scoped and hoisted to undefined, let is block-scoped and can be reassigned, const is block-scoped and cannot be reassigned (though object contents can be modified), with let and const being in a temporal dead zone until declaration.'"

---

## **14. EXPLAIN PURE FUNCTIONS**

**Q: What is a pure function?**

**ANSWER:**

"A pure function is a function that:
1. Always returns the same output for the same input (deterministic)
2. Has no side effects (doesn't modify external state)

**Characteristics:**

**1. Deterministic:**
```javascript
// Pure
function add(a, b) {
  return a + b;
}
add(2, 3); // Always 5

// Impure
function addRandom(a) {
  return a + Math.random(); // Different output each time
}
```

**2. No side effects:**
- Doesn't modify arguments
- Doesn't modify external variables
- Doesn't perform I/O operations
- Doesn't call impure functions

```javascript
// Pure
function double(arr) {
  return arr.map(x => x * 2); // Returns new array
}

// Impure
function doubleInPlace(arr) {
  arr.forEach((x, i) => arr[i] = x * 2); // Modifies original
  return arr;
}
```

**Benefits:**
- **Testable**: Easy to test, no setup/teardown needed
- **Predictable**: Same input always gives same output
- **Cacheable**: Can memoize results
- **Parallelizable**: Safe to run in parallel
- **Debuggable**: Easier to reason about

**Common impure operations:**
- Reading/writing files
- Network requests
- DOM manipulation
- console.log
- Math.random()
- Date.now()
- Modifying global state

**Real-world:**
Pure functions are ideal for business logic, while impure functions are necessary for I/O and side effects. The goal is to isolate side effects and keep most code pure.

**In one sentence:**
'A pure function always returns the same output for the same input and has no side effects, making it predictable, testable, and easier to reason about.'"

---

## **15. EXPLAIN HIGHER-ORDER FUNCTIONS**

**Q: What is a higher-order function?**

**ANSWER:**

"A higher-order function is a function that either:
1. Takes one or more functions as arguments, OR
2. Returns a function as its result

**Examples:**

**1. Takes function as argument:**
```javascript
// map, filter, reduce are higher-order functions
const doubled = [1, 2, 3].map(x => x * 2);

// Custom higher-order function
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}
repeat(3, console.log); // 0, 1, 2
```

**2. Returns a function:**
```javascript
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
const triple = multiplier(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
```

**Common higher-order functions:**
- **Array methods**: map, filter, reduce, forEach, find, some, every
- **Function methods**: call, apply, bind
- **Timers**: setTimeout, setInterval
- **Event handlers**: addEventListener

**Benefits:**
- **Abstraction**: Hide implementation details
- **Reusability**: Create specialized functions from general ones
- **Composition**: Combine simple functions into complex ones
- **Declarative**: Focus on what, not how

**Real-world use cases:**
- **Middleware**: Express.js middleware functions
- **Decorators**: Add behavior to functions
- **Callbacks**: Async operations
- **Currying**: Partial application of arguments

**Example - Authentication middleware:**
```javascript
function requireAuth(handler) {
  return function(req, res) {
    if (req.user) {
      return handler(req, res);
    } else {
      res.status(401).send('Unauthorized');
    }
  };
}

const protectedRoute = requireAuth((req, res) => {
  res.send('Secret data');
});
```

**In one sentence:**
'A higher-order function either takes functions as arguments or returns a function, enabling powerful abstractions like map, filter, and middleware patterns.'"

---

# PART 2: CODE EXAMPLES & TRICKY QUESTIONS

[Previous code examples continue here...]

---

## **QUICK REFERENCE CHEAT SHEET**

**Memorize these one-liners:**

1. **Closure**: "Function remembers variables from outer scope even after outer function returns"
2. **Event Loop**: "Call stack → Microtasks → Macrotasks → Repeat"
3. **this**: "Determined by how function is called: new > explicit > implicit > default"
4. **Prototype**: "Objects inherit from other objects via prototype chain"
5. **Hoisting**: "Declarations moved to top: var=undefined, let/const=TDZ, functions=fully hoisted"
6. **Promise**: "Object representing future value: pending → fulfilled/rejected"
7. **Scope**: "Where variables are accessible: global > function > block"
8. **Async/Await**: "Syntactic sugar over promises, makes async code look sync"
9. **Call/Apply/Bind**: "call=invoke with args, apply=invoke with array, bind=return bound function"
10. **Debounce/Throttle**: "Debounce=wait for inactivity, Throttle=limit frequency"
11. **Shallow/Deep**: "Shallow=copy top level, Deep=copy all levels recursively"
12. **map/forEach**: "map=transform and return array, forEach=side effects return undefined"
13. **let/const/var**: "var=function-scoped, let=block-scoped reassignable, const=block-scoped immutable"
14. **Pure Function**: "Same input → same output, no side effects"
15. **Higher-Order**: "Takes function as arg or returns function"

---

## **INTERVIEW TIPS**

**When answering:**
1. **Start simple**: Give a one-sentence definition
2. **Provide example**: Show code that demonstrates the concept
3. **Explain why**: Discuss benefits and use cases
4. **Mention gotchas**: Show you understand edge cases
5. **Compare alternatives**: Show you know trade-offs

**Example structure:**
```
Q: What is a closure?

1. Definition: "A closure is when a function remembers variables from its outer scope"
2. Example: [Show createCounter example]
3. Why: "Enables data privacy and factory functions"
4. Gotcha: "Can cause memory leaks if not careful"
5. Alternative: "Could use classes with private fields in modern JS"
```

**Red flags to avoid:**
- ❌ "I don't know" (try to reason through it)
- ❌ Memorized definitions without understanding
- ❌ Can't provide examples
- ❌ Don't know when to use it
- ❌ Can't explain trade-offs

**Green flags:**
- ✅ Clear, concise explanations
- ✅ Real-world examples
- ✅ Discuss trade-offs
- ✅ Mention edge cases
- ✅ Ask clarifying questions

Good luck! 🚀
