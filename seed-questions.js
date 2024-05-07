const mongoose = require("mongoose");
const Question = require("./models/question");
const FlashCard = require("./models/flashCard");
const User = require("./models/user");
const UserFlashCard = require("./models/userDefinedFlashCard");
const Quiz = require("./models/quiz");

require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

const questionsData = [
  {
    category: "React",
    question:
      "Which method in a class component is called when the component is first mounted?",
    answer: 4,
    options: [
      "componentDidUpdate",
      "componentWillUnmount",
      "shouldComponentUpdate",
      "componentDidMount",
    ],
    hint:
      "It's the lifecycle method that runs after the component output has been rendered to the DOM.",
    explanation:
      "componentDidMount is called as soon as the component is mounted and ready.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What is the purpose of the 'key' prop in a list of elements?",
    answer: 1,
    options: [
      "To help React identify which items have changed, are added, or are removed",
      "To enforce uniqueness of elements in the list",
      "To improve performance by avoiding re-renders",
      "To unlock special features in the React framework",
    ],
    hint: "It's a string that React uses to track list items.",
    explanation:
      "Keys help React identify which items have changed, are added, or are removed, which helps in efficient updates of the user interface.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What is a 'prop' in React?",
    answer: 2,
    options: [
      "A state management library",
      "A way to pass data to components",
      "A method to handle events",
      "A tool for defining styles",
    ],
    hint:
      "It's similar to function arguments in JavaScript and attributes in HTML.",
    explanation:
      "Props are how you pass data from a parent component to a child component in React.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "How can you update the state of a component?",
    answer: 3,
    options: [
      "By directly modifying the state object",
      "By refreshing the page",
      "By using the setState method",
      "By creating a new component",
    ],
    hint: "It's a method provided by React for this specific purpose.",
    explanation:
      "The setState method is used to schedule updates to the component's state object.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What does 'React' stand for?",
    answer: 2,
    options: [
      "Read, Evaluate, Act, Cycle, Halt",
      "It's just a name, it doesn't stand for anything",
      "Reacting to user actions",
      "Rendering Engine for Active Content Technology",
    ],
    hint: "The name was chosen for its simplicity and memorability.",
    explanation:
      "React is just a name and doesn't stand for anything. It was chosen because it's simple and descriptive of the library's capability to react to state changes.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What is a higher-order component in React?",
    answer: 4,
    options: [
      "A component that renders another component",
      "A function that takes a component and returns a new component",
      "A parent component that holds state",
      "A component that comes with additional methods",
    ],
    hint: "It's a pattern used to reuse component logic.",
    explanation:
      "A higher-order component is a function that takes a component and returns a new component, thereby reusing the component logic.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "How do you create a Context in React?",
    answer: 3,
    options: [
      "React.createState()",
      "React.makeContext()",
      "React.createContext()",
      "React.newContext()",
    ],
    hint:
      "It's a method that creates an object to pass data through the component tree.",
    explanation:
      "React.createContext() is the method used to create a Context object in React.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What does the 'useState' hook return?",
    answer: 1,
    options: [
      "A state value and a function to update it",
      "The initial state value only",
      "A reference to the state object",
      "An array of all state values in the component",
    ],
    hint: "The hook returns a pair of values.",
    explanation:
      "The useState hook returns an array with two elements: the current state value and a function that lets you update it.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "Which of the following is not a lifecycle method in React?",
    answer: 4,
    options: [
      "componentDidMount",
      "shouldComponentUpdate",
      "componentWillUnmount",
      "componentRender",
    ],
    hint:
      "All lifecycle methods have specific prefixes, except one listed here.",
    explanation:
      "componentRender is not a lifecycle method in React. The correct method for rendering is simply called 'render'.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "What is the purpose of React Router?",
    answer: 2,
    options: [
      "To connect to the backend server",
      "To synchronize component state",
      "To enable navigation among views",
      "To manage global state",
    ],
    hint: "It deals with the URL in your web application.",
    explanation:
      "React Router is a standard library for routing in React. It enables navigation among different components in a React application, handling the URL changes without a page reload.",
    difficulty: "easy",
  },
  {
    category: "React",
    question: "How does React handle form submissions?",
    answer: 2,
    options: [
      "Using the onSubmit HTML attribute",
      "Using an event handler function",
      "By automatically refreshing the page",
      "Through a built-in form submission method",
    ],
    hint: "It's similar to handling other events in React.",
    explanation:
      "React uses an event handler function, typically passed to the onSubmit attribute of a form element, to handle form submissions.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is the use of the 'useEffect' hook in React?",
    answer: 3,
    options: [
      "To fetch data on component mount",
      "To create context providers",
      "For side effects in functional components",
      "To memoize component output",
    ],
    hint:
      "Think of operations that need to be done outside the scope of the UI rendering.",
    explanation:
      "The useEffect hook is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is 'prop drilling' and how can it be avoided?",
    answer: 4,
    options: [
      "Passing props to deep components through intermediaries",
      "Drilling holes in components for ventilation",
      "A method to optimize performance",
      "Using React's Context API or state management libraries",
    ],
    hint:
      "It's a common problem when passing data through many layers of components.",
    explanation:
      "Prop drilling is the process of passing props from a higher-level component to a lower-level component through many layers. It can be avoided by using React's Context API or state management libraries like Redux.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is the difference between 'state' and 'props' in React?",
    answer: 1,
    options: [
      "State is internal and controlled by the component itself, while props are external and controlled by whatever renders the component",
      "There is no difference; they are interchangeable",
      "Props are functions, while state is an object",
      "State is persistent storage, while props are temporary data",
    ],
    hint:
      "One is mutable by the component, the other is immutable and passed by the parent.",
    explanation:
      "State is a mutable object managed within the component. Props (short for properties) are immutable and are used to pass data from a parent component to a child component.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "How do you optimize performance for a list of items in React?",
    answer: 3,
    options: [
      "By using the PureComponent class",
      "By keeping all components stateless",
      "Using the 'key' prop correctly",
      "By avoiding the use of hooks",
    ],
    hint:
      "It's a special prop that helps React identify which items have changed.",
    explanation:
      "Using the 'key' prop correctly can help optimize performance by ensuring that React can identify and re-render only the items that have changed, rather than re-rendering the entire list.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is the purpose of the 'useRef' hook in React?",
    answer: 4,
    options: [
      "To update the component state",
      "To create a new context",
      "To manage the component lifecycle",
      "To access DOM nodes directly",
    ],
    hint: "It's used to get a reference to a DOM element.",
    explanation:
      "The useRef hook is used to access and interact with a DOM node directly in functional components.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is 'lifting state up' in React?",
    answer: 1,
    options: [
      "Moving state closer to the common ancestor of components that need it",
      "Increasing the size of the state object",
      "Storing state in the cloud",
      "Enhancing state with additional functionality",
    ],
    hint: "It's a technique to manage shared state across multiple components.",
    explanation:
      "Lifting state up involves moving state to a common ancestor of components that need to share the state, so that it can be passed down as props to the components that need it.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is the purpose of the 'useCallback' hook?",
    answer: 2,
    options: [
      "To call functions at specific intervals",
      "To memoize functions and prevent unnecessary re-renders",
      "To handle asynchronous calls",
      "To bind functions to the component instance",
    ],
    hint:
      "It's related to performance optimization for functions in functional components.",
    explanation:
      "The useCallback hook is used to memoize functions in functional components, which can prevent unnecessary re-renders when the function is passed as a prop to child components.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "How can you handle asynchronous operations in React?",
    answer: 3,
    options: [
      "Using the 'async' keyword on the component",
      "By placing the 'await' operator in the render method",
      "With the 'useEffect' hook or custom hooks",
      "React does not support asynchronous operations",
    ],
    hint:
      "It's a hook that can be used for side effects, including asynchronous operations.",
    explanation:
      "Asynchronous operations in React can be handled using the useEffect hook for side effects, or by creating custom hooks that encapsulate asynchronous logic.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "What is the 'children' prop?",
    answer: 1,
    options: [
      "A special prop that allows components to pass elements to their children",
      "A library for managing child components",
      "A method to clone child components",
      "A state management tool for child components",
    ],
    hint:
      "It's a prop that includes anything between the opening and closing tags of a component.",
    explanation:
      "The 'children' prop is a special prop, automatically passed to every component, that includes the content between the opening and closing tags of a component.",
    difficulty: "medium",
  },
  {
    category: "React",
    question: "How does React's reconciliation algorithm work?",
    answer: 2,
    options: [
      "By comparing the current DOM to the virtual DOM",
      "By comparing the previous and next virtual DOMs",
      "By deleting the entire DOM and re-rendering from scratch",
      "By manually tracking changes in component state",
    ],
    hint: "It involves a virtual representation of the UI.",
    explanation:
      "React's reconciliation algorithm works by comparing the previous virtual DOM with the next virtual DOM, computing the difference, and then updating the real DOM efficiently.",
    difficulty: "hard",
  },
  {
    category: "React",
    question:
      "What is the significance of the 'key' prop in a list when implementing shouldComponentUpdate?",
    answer: 4,
    options: [
      "It ensures that the component updates in place",
      "It prevents the re-rendering of all list items",
      "It is used to identify which elements have changed",
      "It helps in determining if a component instance needs to be re-rendered",
    ],
    hint: "It's related to performance optimization during updates.",
    explanation:
      "The 'key' prop is crucial in lists especially when implementing shouldComponentUpdate because it helps React determine if a component instance needs to be re-rendered by identifying elements that have changed.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "Explain the concept of 'controlled components' in React.",
    answer: 1,
    options: [
      "Components that manage their own state and integrate tightly with DOM inputs",
      "Components that are controlled by parent components through props",
      "Components that cannot change their state",
      "Components that control the rendering of child components",
    ],
    hint:
      "These components are tied to the state and typically involve form elements.",
    explanation:
      "Controlled components in React are those where the form data is handled by the state within the component. The input's value is controlled by React in this way.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "How do you implement error boundaries in React?",
    answer: 3,
    options: [
      "Using the componentDidCatch lifecycle method",
      "By wrapping components with try/catch blocks",
      "By using a higher-order component that implements componentDidCatch",
      "Error boundaries are not a feature of React",
    ],
    hint: "It's a lifecycle method introduced in React 16.",
    explanation:
      "Error boundaries are implemented using the componentDidCatch lifecycle method in class components. This method catches errors in any of the child component trees and allows the rendering of a fallback UI.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "What are render props in React?",
    answer: 2,
    options: [
      "Props that trigger re-rendering",
      "A technique for sharing code between React components using a prop whose value is a function",
      "Properties that contain JSX templates",
      "Props that are only rendered under certain conditions",
    ],
    hint: "It's a pattern for sharing functionality across components.",
    explanation:
      "Render props refer to a technique for sharing code between components using a prop whose value is a function that returns React elements.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "Describe the differences between Real DOM and Virtual DOM.",
    answer: 1,
    options: [
      "Real DOM is slow and updates slowly, while Virtual DOM is fast and updates efficiently",
      "Real DOM is a concept by React, while Virtual DOM is a browser standard",
      "There is no difference; they are just two terms for the same thing",
      "Virtual DOM allows direct manipulation, while Real DOM does not",
    ],
    hint:
      "One is an actual browser API, while the other is a performance optimization technique used by React.",
    explanation:
      "The Real DOM is an actual representation of the UI in the browser and updates slowly. The Virtual DOM is a lightweight copy of the Real DOM used by React to optimize updates by batching them and updating the Real DOM efficiently.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "What is the purpose of the 'useImperativeHandle' hook?",
    answer: 4,
    options: [
      "To handle state changes imperatively",
      "To create a ref that is attached to a DOM element",
      "To implement imperative animations",
      "To customize the instance value that is exposed to parent components when using refs",
    ],
    hint: "It's used in conjunction with refs and forwardRef.",
    explanation:
      "useImperativeHandle is used in conjunction with ref and forwardRef to customize the instance value that is exposed to parent components, especially for handling focus, selection, or media playback.",
    difficulty: "hard",
  },
  {
    category: "React",
    question:
      "How can server-side rendering (SSR) be achieved in a React application?",
    answer: 3,
    options: [
      "By using the ReactDOMServer library",
      "By deploying the application to a server",
      "By using frameworks like Next.js or Gatsby",
      "SSR is not possible with React",
    ],
    hint: "It involves rendering components to HTML on the server.",
    explanation:
      "Server-side rendering in React can be achieved by using the ReactDOMServer library for simple cases or by using frameworks like Next.js or Gatsby that provide a more integrated SSR solution.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "Explain the concept of 'suspense' in React.",
    answer: 2,
    options: [
      "A suspense is a period during which the component is waiting to receive props",
      "A mechanism for components to wait for some code to load before they render",
      "A suspense is an error thrown by a component when it fails to render",
      "A suspense is a tool for debugging performance issues",
    ],
    hint: "It's related to dynamic loading and code splitting.",
    explanation:
      "Suspense in React is a mechanism that allows components to 'wait' for something before rendering, such as data fetching or dynamic imports, providing a way to show fallback content while waiting.",
    difficulty: "hard",
  },
  {
    category: "React",
    question: "What are the benefits of using React's new concurrent mode?",
    answer: 1,
    options: [
      "It allows React to interrupt rendering work to prioritize certain tasks",
      "It enables multiple versions of React to run simultaneously",
      "It is a new syntax for writing components",
      "It allows React components to be executed concurrently on multiple threads",
    ],
    hint: "It's a set of new features that help React apps stay responsive.",
    explanation:
      "Concurrent mode is a set of new features that help React apps stay responsive by interrupting the rendering process to prioritize certain tasks, such as user inputs, over others.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "What is the output of `console.log(typeof null)`?",
    options: [" 'object'", " 'null'", " 'undefined'", " 'error'"],
    answer: 1,
    hint: "It's a quirk from the early days of JavaScript.",
    explanation:
      "The output is 'object'. This is a long-standing bug in JavaScript, as `null` is not actually an object.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "How do you declare a variable in JavaScript?",
    options: [
      "var myVar = 'Hello';",
      "variable myVar = 'Hello';",
      "v myVar = 'Hello';",
      "$myVar = 'Hello';",
    ],
    answer: 1,
    hint: "It's the traditional way to declare variables in JavaScript.",
    explanation:
      "You declare a variable using the `var` keyword followed by the variable name and assignment operator.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.toObject()",
      "JSON.fromString()",
    ],
    answer: 1,
    hint: "It's the opposite of serialization.",
    explanation:
      "The `JSON.parse()` method parses a JSON string, constructing the JavaScript value or object described by the string.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What does the `===` operator check for?",
    options: [
      "Value equality",
      "Type similarity",
      "Both value and type equality",
      "None of the above",
    ],
    answer: 3,
    hint: "It's the strict comparison operator.",
    explanation:
      "The `===` operator checks for both value and type equality, making it a strict comparison operator.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "How do you create an array in JavaScript?",
    options: [
      "var myArray = (1,2,3);",
      "var myArray = [1,2,3];",
      "var myArray = {1,2,3};",
      "var myArray = <1,2,3>;",
    ],
    answer: 2,
    hint: "It's a list-like object.",
    explanation:
      "An array is created using square brackets `[]` with elements separated by commas.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "Which statement creates a new function in JavaScript?",
    options: [
      "function myFunc() {}",
      "new Function()",
      "Both 1 and 2",
      "createFunction myFunc() {}",
    ],
    answer: 3,
    hint: "There are multiple ways to declare functions.",
    explanation:
      "A new function can be created either by a function declaration or by using the `new Function()` constructor.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What is the purpose of the `break` statement in JavaScript?",
    options: [
      "To exit a loop",
      "To break the code",
      "To pause the execution",
      "To break the internet",
    ],
    answer: 1,
    hint: "It's used to stop the current flow.",
    explanation:
      "The `break` statement is used to exit a loop or a `switch` statement before it has finished executing.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What will `console.log(1 + '2' + 3)` output?",
    options: ["'123'", "'6'", "'33'", "'15'"],
    answer: 1,
    hint: "JavaScript performs type coercion.",
    explanation:
      "The output will be '123'. JavaScript converts numbers to strings when using the `+` operator with strings.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "How do you write a comment in JavaScript?",
    options: [
      "<!-- This is a comment -->",
      "** This is a comment **",
      "// This is a comment",
      "/* This is a comment */",
    ],
    answer: 4,
    hint: "There are single-line and multi-line comments.",
    explanation:
      "Single-line comments start with `//`, while multi-line comments start with `/*` and end with `*/`.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question: "What method is used to round a number to the nearest integer?",
    options: ["Math.round()", "Math.floor()", "Math.ceil()", "Math.int()"],
    answer: 1,
    hint: "It's a common mathematical operation.",
    explanation:
      "The `Math.round()` method rounds a number to the nearest integer.",
    difficulty: "easy",
  },
  {
    category: "JavaScript",
    question:
      "What is the difference between `null` and `undefined` in JavaScript?",
    options: [
      "`null` is a value that represents no value, `undefined` is a value automatically assigned to variables",
      "`null` and `undefined` are the same",
      "`null` is a data type, `undefined` is a value",
      "`null` is automatically assigned to variables, `undefined` represents no value",
    ],
    answer: 1,
    hint:
      "One is an intentional absence of any value, the other is a default uninitialized state.",
    explanation:
      "`null` is an assignment value that represents no value, while `undefined` is a type of value that indicates a variable has been declared but not defined.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "How do you check if an object is an array in JavaScript?",
    options: [
      "`typeof`",
      "`instanceof`",
      "`Array.isArray()`",
      "`isObjectArray()`",
    ],
    answer: 3,
    hint: "It's a static method on the Array constructor.",
    explanation:
      "`Array.isArray()` is the preferred method to check if an object is an array because it returns `true` if the object is an array, otherwise `false`.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question:
      "What will the following code output? `console.log(0.1 + 0.2 === 0.3);`",
    options: ["`true`", "`false`", "`undefined`", "`Error`"],
    answer: 2,
    hint: "JavaScript has precision issues with floating-point arithmetic.",
    explanation:
      "The code will output `false` because of floating-point arithmetic errors in JavaScript. `0.1 + 0.2` does not precisely equal `0.3`.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is a closure in JavaScript?",
    options: [
      "A function with preserved data",
      "The end of a function",
      "A function without parameters",
      "An error caused by incorrect syntax",
    ],
    answer: 1,
    hint: "It's a function combined with its lexical environment.",
    explanation:
      "A closure is a function that has access to its own scope, the scope of the outer function, and global variables.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is event delegation in JavaScript?",
    options: [
      "A process to add event listeners to child elements",
      "A method to handle events at a higher level in the DOM than the element on which the event originated",
      "Delegating events to the server",
      "A library for managing events",
    ],
    answer: 2,
    hint: "It takes advantage of the event bubbling phase.",
    explanation:
      "Event delegation is a technique where a single event listener is added to a parent element to handle events for multiple child elements.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is the purpose of the `this` keyword in JavaScript?",
    options: [
      "To refer to the current object",
      "To create a new instance of an object",
      "To pass the current context to a function",
      "To store data in the global scope",
    ],
    answer: 1,
    hint: "It's context-dependent.",
    explanation:
      "The `this` keyword refers to the object it belongs to, and its value is determined by how a function is called.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "How do you create a private variable in JavaScript?",
    options: [
      "Using the `var` keyword inside a function",
      "Using the `#` symbol before the variable name",
      "Both 1 and 2",
      "It's not possible to create private variables in JavaScript",
    ],
    answer: 3,
    hint: "There are traditional and modern ways to achieve this.",
    explanation:
      "Private variables can be created by declaring them within a function scope or using the `#` symbol in classes (ES2020+).",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What does the `bind` method do in JavaScript?",
    options: [
      "It binds an object to a function reference",
      "It combines two strings",
      "It merges two arrays",
      "It prevents a function from being called",
    ],
    answer: 1,
    hint: "It's related to the `this` keyword.",
    explanation:
      "The `bind` method creates a new function that, when called, has its `this` keyword set to the provided value.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is the difference between `==` and `===` in JavaScript?",
    options: [
      "`==` checks for value equality, `===` checks for value and type equality",
      "`==` checks for type equality, `===` checks for value equality",
      "There is no difference",
      "`==` is used for variables, `===` is used for objects",
    ],
    answer: 1,
    hint: "One is strict, the other is not.",
    explanation:
      "`==` is the abstract equality operator and `===` is the strict equality operator. `==` will convert the operands to the same type before making the comparison, while `===` does not do type conversion.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question: "What is the execution context in JavaScript?",
    options: [
      "The location where the script is executed",
      "The environment in which JavaScript code is executed",
      "The part of the code currently being executed",
      "The browser where the JavaScript is running",
    ],
    answer: 2,
    hint: "It's about the scope and environment.",
    explanation:
      "The execution context is the environment or scope in which JavaScript code is evaluated and executed.",
    difficulty: "medium",
  },
  {
    category: "JavaScript",
    question:
      "What will the following code output to the console and why? `console.log(1 < 2 < 3); console.log(3 > 2 > 1);`",
    options: ["true, true", "true, false", "false, true", "false, false"],
    answer: 2,
    hint: "Consider how the '<' and '>' operators work in sequence.",
    explanation:
      "The output will be `true, false`. The first comparison `1 < 2` evaluates to `true`, which is then implicitly converted to `1` when compared to `3`, so `1 < 3` is `true`. However, `3 > 2` evaluates to `true`, which is then converted to `1`, and `1 > 1` is `false`.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "How can you ensure a function `f` can only be called once?",
    options: [
      "1: Using a closure to keep track of whether `f` has been called",
      "2: Setting `f = null` after the first call",
      "3: Using the `Function.prototype.bind` method",
      "4: Wrapping `f` in another function that checks a flag",
    ],
    answer: 1,
    hint: "It involves encapsulating the function state.",
    explanation:
      "Using a closure, you can encapsulate the state of whether the function has been called and prevent further calls if it has.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question:
      "What is the output of the following code? `const a = [1, 2, 3]; const b = [1, 2, 3]; const c = '1,2,3'; console.log(a == c); console.log(b == c); console.log(a == b);`",
    options: [
      "true, true, true",
      "false, false, false",
      "true, true, false",
      "false, false, true",
    ],
    answer: 3,
    hint: "Consider how arrays are compared in JavaScript.",
    explanation:
      "The output will be `true, true, false`. Arrays are converted to strings when compared with strings, so `a` and `b` are equal to `c`. However, `a` and `b` are different instances and are not equal when compared directly.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question:
      "What does the following function return? `function f() { console.log(this); }`",
    options: [
      "Returns `undefined`",
      "Returns the global object or `window` in a browser",
      "Returns the function itself",
      "Throws a TypeError",
    ],
    answer: 2,
    hint: "Consider the default context of `this` in a function.",
    explanation:
      "The function returns the global object or `window` in a browser because `this` defaults to the global object in non-strict mode.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question:
      "What is the value of `foo.length`? `var foo = []; foo[100] = 'hello';`",
    options: ["100", "101", "1", "'undefined'"],
    answer: 2,
    hint: "The length of an array is one more than the highest index.",
    explanation:
      "The length of `foo` is `101` because the highest index is `100`, and array lengths are always one more than the highest index.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question:
      "What is the result of the following expression? `(function(x, f = () => x) { var x; var y = x; x = 2; return [x, y, f()]; })(1)`",
    options: [
      "`[2, 1, 1]`",
      "`[2, undefined, 1]`",
      "`[2, undefined, 2]`",
      "`[undefined, undefined, 1]`",
    ],
    answer: 2,
    hint: "Consider the order of initialization and hoisting.",
    explanation:
      "The result is `[2, undefined, 1]`. The variable `x` is hoisted and thus `y` is `undefined`. The default parameter `f` captures the argument `x` before it is re-assigned inside the function.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "What will the following code output? `console.log(typeof NaN);`",
    options: ["'number'", "'NaN'", "'undefined'", "'object'"],
    answer: 1,
    hint: "Consider the type of `NaN` in JavaScript.",
    explanation:
      "The output will be `'number'`. Despite its name, `NaN` is a numeric value representing not-a-number.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question:
      "What is the output of the following code? `console.log(0.1 + 0.2 === 0.3);`",
    options: ["`true`", "`false`", "`undefined`", "`Error`"],
    answer: 2,
    hint: "JavaScript has precision issues with floating-point arithmetic.",
    explanation:
      "The code will output `false` because of floating-point arithmetic errors in JavaScript. `0.1 + 0.2` does not precisely equal `0.3`.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question: "How can you detect if a variable is an array in JavaScript?",
    options: [
      "`variable instanceof Array`",
      "`Array.isArray(variable)`",
      "`variable.constructor === Array`",
      "All of the above",
    ],
    answer: 4,
    hint: "There are multiple ways to check if a variable is an array.",
    explanation:
      "All of the options provided are valid ways to check if a variable is an array in JavaScript.",
    difficulty: "hard",
  },
  {
    category: "JavaScript",
    question:
      "What will the following code output to the console and why? `const person = { age: 20, name: 'Ben' }; const peopleArray = [person, person, person]; peopleArray[1].name = 'Joe'; console.log(peopleArray[0].name);`",
    options: ["'Ben'", "'Joe'", "'undefined'", "Throws a TypeError"],
    answer: 2,
    hint: "Consider how objects are stored and referenced in arrays.",
    explanation:
      "It will print 'Joe'. The `peopleArray` has three elements, but all three elements are references to the same memory space, which is the `person` object. Changing one reference changes all others.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question: "What is the correct file extension for Python files?",
    options: [".pyt", ".pt", ".py", ".python"],
    answer: 3,
    hint: "It's the most common file extension for Python scripts.",
    explanation: "The correct file extension for Python files is '.py'.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "How do you print a string to the console in Python?",
    options: [
      "echo 'Hello World'",
      "print 'Hello World'",
      "console.log('Hello World')",
      "print('Hello World')",
    ],
    answer: 4,
    hint: "It's a built-in function in Python for output.",
    explanation:
      "In Python, you use the `print()` function to output text to the console.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "Which of these data types does not exist in Python?",
    options: ["list", "dictionary", "array", "tuple"],
    answer: 3,
    hint:
      "One of these is not a built-in data type but can be implemented using a module.",
    explanation:
      "While lists, dictionaries, and tuples are built-in data types in Python, 'array' is not; it is provided by the array module.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "Which of these data types does not exist in Python?",
    options: ["list", "dictionary", "array", "tuple"],
    answer: 3,
    hint:
      "One of these is not a built-in data type but can be implemented using a module.",
    explanation:
      "While lists, dictionaries, and tuples are built-in data types in Python, 'array' is not; it is provided by the array module.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What keyword is used to define a function in Python?",
    options: ["func", "def", "function", "declare"],
    answer: 2,
    hint: "It's a short form of 'define'.",
    explanation: "The keyword `def` is used to define a function in Python.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What is the output of `print(8 // 3)`?",
    options: ["2.666", "2.67", "2", "3"],
    answer: 3,
    hint: "It's the operator for floor division.",
    explanation:
      "The `//` operator performs floor division, which divides and then rounds down to the nearest whole number. So, `8 // 3` equals `2`.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question:
      "Which of the following is the boolean operator for logical AND in Python?",
    options: ["&", "and", "&&", "plus"],
    answer: 2,
    hint: "It's a keyword, not a symbol.",
    explanation:
      "The keyword `and` is the boolean operator for logical AND in Python.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "How do you create a variable with the numeric value 5?",
    options: ["x = int(5)", "x = num(5)", "int x = 5", "x = 5"],
    answer: 4,
    hint: "It's the simplest form of assignment in Python.",
    explanation:
      "In Python, you can create a variable with a numeric value simply by assigning the number to it, like `x = 5`.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "Which function can generate a sequence of numbers in Python?",
    options: ["sequence()", "range()", "array()", "list()"],
    answer: 2,
    hint: "It's commonly used in for loops.",
    explanation:
      "The `range()` function generates a sequence of numbers and is often used for looping a specific number of times in for loops.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What is the correct way to create a comment in Python?",
    options: [
      "/* This is a comment */",
      "// This is a comment",
      "# This is a comment",
      "-- This is a comment",
    ],
    answer: 3,
    hint: "It's a single character that marks the start of a comment.",
    explanation: "In Python, comments start with the `#` character.",
    difficulty: "easy",
  },
  {
    category: "Python",
    question: "What is the result of `list('hello')`?",
    options: [
      "1: ['h', 'e', 'l', 'l', 'o']",
      "2: ['hello']",
      "3: SyntaxError",
      "4: TypeError",
    ],
    answer: 1,
    hint: "Think about how strings are iterable in Python.",
    explanation:
      "The `list()` function converts an iterable into a list. Since a string is an iterable of its characters, `list('hello')` results in `['h', 'e', 'l', 'l', 'o']`.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What does the `enumerate` function return?",
    options: [
      "1: A list",
      "2: A tuple",
      "3: An enumerate object",
      "4: A dictionary",
    ],
    answer: 3,
    hint: "It's a built-in function that adds a counter to an iterable.",
    explanation:
      "`enumerate` returns an enumerate object, which is an iterator that yields pairs containing a count and a value yielded by the iterable argument.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What is the output of `print(2 ** 3 ** 2)`?",
    options: ["1: 64", "2: 512", "3: 729", "4: 6561"],
    answer: 4,
    hint: "Remember the order of operations for exponents.",
    explanation:
      "The expression is evaluated as `2 ** (3 ** 2)`, which equals `2 ** 9`, resulting in `512`.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What is the difference between `==` and `is`?",
    options: [
      "1: `==` checks for value equality, `is` checks for identity",
      "2: `==` checks for identity, `is` checks for value equality",
      "3: There is no difference",
      "4: `==` is used for variables, `is` is used for objects",
    ],
    answer: 1,
    hint: "One compares values, the other compares object identities.",
    explanation:
      "`==` compares the values of two objects, while `is` compares their identities, i.e., if they are the same object in memory.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "How do you create a virtual environment in Python?",
    options: [
      "1: virtualenv myenv",
      "2: python -m venv myenv",
      "3: python -m virtualenv myenv",
      "4: venv myenv",
    ],
    answer: 2,
    hint: "It's a command that uses a module from the standard library.",
    explanation:
      "The command `python -m venv myenv` creates a virtual environment named `myenv` using the `venv` module.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question:
      "What is the term for inserting a value into a string with `{}` placeholders?",
    options: [
      "1: Concatenation",
      "2: Interpolation",
      "3: Formatting",
      "4: Templating",
    ],
    answer: 3,
    hint: "It's a method of creating strings by combining variables.",
    explanation:
      "The term for this is 'formatting', which can be done using the `format()` method or f-strings in Python.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question:
      "Which of the following is not a valid way to create a dictionary?",
    options: [
      "1: {1: 'a', 2: 'b'}",
      "2: dict(one='a', two='b')",
      "3: dict(zip([1, 2], ['a', 'b']))",
      "4: dict([(1, 'a'), (2, 'b')])",
    ],
    answer: 2,
    hint:
      "All options are valid except one that uses incorrect keyword arguments.",
    explanation:
      "The second option is incorrect because dictionary keys cannot be strings when using the `dict()` function with keyword arguments.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What is the output of `print('Python'.find('th'))`?",
    options: ["1: 1", "2: 2", "3: -1", "4: 3"],
    answer: 2,
    hint: "The `find` method returns the lowest index of the substring.",
    explanation:
      "The `find` method returns the starting index of the substring if found, which is `2` for 'th' in 'Python'.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "Which keyword is used for error handling in Python?",
    options: ["1: error", "2: except", "3: catch", "4: try"],
    answer: 2,
    hint: "It's used in a block that handles exceptions.",
    explanation:
      "The `except` keyword is used in Python to catch and handle exceptions raised by errors.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question: "What does the `pass` statement do in Python?",
    options: [
      "1: It passes control to the next iteration of a loop",
      "2: It passes execution to another function",
      "3: It does nothing and acts as a placeholder",
      "4: It terminates the program",
    ],
    answer: 3,
    hint:
      "It's often used where the syntax requires a statement but no action is needed.",
    explanation:
      "The `pass` statement is a null operation; nothing happens when it executes and is used as a syntactic placeholder.",
    difficulty: "medium",
  },
  {
    category: "Python",
    question:
      "What is the result of the following code snippet? `isinstance(type, object)`",
    options: ["1: True", "2: False", "3: TypeError", "4: None"],
    answer: 1,
    hint: "Consider the relationship between types and objects in Python.",
    explanation:
      "The result is `True`. In Python, everything is an object, including types themselves. Therefore, `type` is an instance of `object`.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question:
      "What will the `any([])` and `all([])` functions return respectively?",
    options: [
      "1: True, True",
      "2: True, False",
      "3: False, True",
      "4: False, False",
    ],
    answer: 3,
    hint:
      "Think about the definitions of `any` and `all` with respect to empty iterables.",
    explanation:
      "`any([])` returns `False` because there are no truthy elements in an empty list. `all([])` returns `True` due to the concept of vacuous truth; since there are no elements to be false, it returns `True`.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question:
      "How does Python's `round` function handle values like `round(5 / 2)`?",
    options: [
      "1: Rounds up",
      "2: Rounds down",
      "3: Rounds to the nearest even number",
      "4: SyntaxError",
    ],
    answer: 3,
    hint: "Consider the rounding method used by Python's `round` function.",
    explanation:
      "Python's `round` function uses banker's rounding, where half values are rounded to the nearest even number. Thus, `round(5 / 2)` returns `2` instead of `3`.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question:
      "What will the following class definition print when executed? `class A: answer = 42 def __init__(self): self.answer = 21 self.__add__ = lambda x, y: x.answer + y def __add__(self, y): return self.answer - y print(A() + 5)`",
    options: ["1: 63", "2: 26", "3: 16", "4: 21"],
    answer: 3,
    hint:
      "Attribute resolution in Python checks the instance level before the class level.",
    explanation:
      "The output will be `16`. Python resolves attributes by checking the instance level first, then the class level. The `__add__` method defined in the class body is overridden by the instance attribute set in the constructor.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question:
      "What is the behavior of the `+=` operator when applied to a list inside a function?",
    options: [
      "1: Modifies the list in place",
      "2: Creates a new list",
      "3: Throws an error",
      "4: Has no effect",
    ],
    answer: 1,
    hint: "The `+=` operator can have different effects based on the context.",
    explanation:
      "The `+=` operator modifies the list in place. This means that if a list is passed to a function and the `+=` operator is used, the original list outside the function will be affected.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question: "What is the result of `print({} is {})`?",
    options: ["1: True", "2: False", "3: SyntaxError", "4: None"],
    answer: 2,
    hint: "Consider the identity of empty dictionaries.",
    explanation:
      "The result is `False`. Each empty dictionary literal `{}` creates a new dictionary object, so their identities are different.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question: "What does the `@staticmethod` decorator do?",
    options: [
      "1: Converts a method into a static method",
      "2: Makes a method accessible without an instance",
      "3: Both 1 and 2",
      "4: None of the above",
    ],
    answer: 3,
    hint: "Static methods behave differently from instance methods.",
    explanation:
      "The `@staticmethod` decorator converts a method into a static method, which means it can be called without an instance of the class.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question: "How does the `global` keyword work inside a function?",
    options: [
      "1: It creates a new global variable",
      "2: It allows modification of a variable defined outside the function",
      "3: It imports a variable from another module",
      "4: It declares a variable that can be accessed anywhere in the module",
    ],
    answer: 2,
    hint: "The `global` keyword affects the scope of variables.",
    explanation:
      "The `global` keyword allows a function to modify a variable that is defined in the global scope, outside of the function.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question: "What is the output of `print('Hello World'.split(' ')[-1])`?",
    options: [
      "1: 'Hello'",
      "2: 'World'",
      "3: ['Hello', 'World']",
      "4: 'Hello World'",
    ],
    answer: 2,
    hint: "Consider how indexing works with negative numbers in Python.",
    explanation:
      "The output is `'World'`. The `split` method splits the string into a list, and `[-1]` accesses the last element of the list.",
    difficulty: "hard",
  },
  {
    category: "Python",
    question: "What is the result of `print((lambda x: x + 1)(2))`?",
    options: ["1: 1", "2: 2", "3: 3", "4: 4"],
    answer: 3,
    hint: "It's an anonymous function being called with an argument.",
    explanation:
      "The result is `3`. The lambda function takes `x` and returns `x + 1`. When called with `2`, it returns `3`.",
    difficulty: "hard",
  },
];

db.once("open", async () => {
  console.log("Connected to MongoDB database");

  try {
    // Remove existing data
    await Question.deleteMany({});
    await FlashCard.deleteMany({});
    await User.deleteMany({});
    await UserFlashCard.deleteMany({});
    await Quiz.deleteMany({});

    // Insert seed data
    await Question.insertMany(questionsData);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
});
