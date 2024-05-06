const mongoose = require("mongoose");
const Question = require("./models/question");
const FlashCard = require("./models/flashCard");
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

const questionsData = [
  {
    question: "What syntax is used to define a functional component in React?",
    answer: 2,
    options: ["class", "function", "def", "component"],
    hint: "Think about the keyword used to define a function in JavaScript.",
    category: "React",
    difficulty: "easy",
    explanation:
      "Functional components in React are defined using the 'function' keyword.",
  },
  {
    question:
      "Which hook is used for managing state in React functional components?",
    answer: 3,
    options: ["useContext", "useEffect", "useState", "useReducer"],
    hint: "This hook allows you to declare a state variable.",
    category: "React",
    difficulty: "easy",
    explanation:
      "'useState' is the hook used for managing state in React functional components.",
  },
  {
    question: "Which of the following is NOT a valid JSX syntax?",
    answer: 4,
    options: [
      "<div>Hello World</div>",
      "<MyComponent />",
      '<h1 className="title">Welcome</h1>',
      "<h1>{title}</h1>",
    ],
    hint:
      "Consider how JSX expressions are enclosed and how variables are interpolated.",
    category: "React",
    difficulty: "easy",
    explanation:
      "In JSX, curly braces are used for JavaScript expressions. However, in the given option, 'title' is not defined.",
  },
  {
    question:
      "Which function is called when a component is first rendered in React?",
    answer: 2,
    options: [
      "componentDidUpdate",
      "useEffect",
      "componentWillMount",
      "render",
    ],
    hint:
      "This function is used for side effects such as fetching data or subscribing to events.",
    category: "React",
    difficulty: "easy",
    explanation:
      "'useEffect' is called when a component is first rendered in React. It replaces componentDidMount.",
  },
  {
    question: "How do you pass props to a component in React?",
    answer: 3,
    options: [
      "Using this.props",
      "Using setState",
      "As attributes in JSX",
      "Using ref",
    ],
    hint: "Think about how you pass data to an HTML element.",
    category: "React",
    difficulty: "easy",
    explanation: "Props are passed to a component as attributes in JSX.",
  },
  {
    question:
      "What is the correct way to conditionally render content in React?",
    answer: 1,
    options: [
      "{condition ? <TrueComponent /> : <FalseComponent />}",

      "{if (condition) {return <TrueComponent />} else {return <FalseComponent />}}",
      "{condition && <TrueComponent /> || <FalseComponent />}",
      "{condition ? render(<TrueComponent />) : render(<FalseComponent />)}",
    ],
    hint: "Consider how to write conditional statements within JSX.",
    category: "React",
    difficulty: "easy",
    explanation:
      "The ternary operator allows for conditional rendering in JSX.",
  },
  {
    question: "Which method is used to update the state in React?",
    answer: 2,
    options: ["setState", "useState", "updateState", "changeState"],
    hint: "Think about the function used to update the state.",
    category: "React",
    difficulty: "easy",
    explanation: "'setState' is the method used to update the state in React.",
  },
  {
    question: "What is the purpose of keys in React lists?",
    answer: 4,
    options: [
      "To style list items",
      "To define the type of list",
      "To filter list items",
      "To identify unique list items",
    ],
    hint: "Consider the role of keys in maintaining component state.",
    category: "React",
    difficulty: "easy",
    explanation:
      "Keys are used to identify unique list items, helping React to efficiently update the UI.",
  },
  {
    question:
      "Which hook is used to perform side effects in React functional components?",
    answer: 2,
    options: ["useContext", "useEffect", "useState", "useReducer"],
    hint:
      "Think about actions that occur outside the scope of the component's rendering.",
    category: "React",
    difficulty: "easy",
    explanation:
      "'useEffect' is used to perform side effects in React functional components.",
  },
  {
    question: "What is the purpose of React.Fragment?",
    answer: 1,
    options: [
      "To group multiple elements without adding extra nodes to the DOM",
      "To create a new React component",
      "To import external JavaScript libraries",
      "To define a reusable template",
    ],
    hint: "Consider how to render adjacent JSX elements without a wrapper.",
    category: "React",
    difficulty: "easy",
    explanation:
      "React.Fragment allows you to group multiple elements without introducing unnecessary DOM nodes.",
  },
  {
    question: "What is the purpose of the 'key' attribute in React lists?",
    answer: 2,
    options: [
      "To help React identify which items have changed, are added, or are removed.",
      "To set the unique identifier for each list item.",
      "To determine the order of list items.",
      "To apply styling to list items.",
    ],
    hint:
      "Think about how React handles list rendering and updates efficiently.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'key' attribute is used to help React identify which items have changed, are added, or are removed in a list, improving performance.",
  },
  {
    question: "What is the difference between 'props' and 'state' in React?",
    answer: 1,
    options: [
      "Props are immutable and are passed from parent to child components, while state is mutable and managed within the component itself.",
      "Props are mutable and are managed within the component, while state is immutable and passed from parent to child components.",
      "Props are used for functional components, while state is used for class components.",
      "Props are used for managing component state, while state is used for passing data between components.",
    ],
    hint:
      "Consider the roles and scope of 'props' and 'state' in React component architecture.",
    category: "React",
    difficulty: "medium",
    explanation:
      "'Props' are immutable data passed from parent to child components, while 'state' is mutable data managed within the component itself.",
  },
  {
    question: "How do you conditionally apply CSS classes in React?",
    answer: 3,
    options: [
      "Using the 'class' attribute in JSX.",
      "Using inline CSS styles.",
      "By dynamically assigning class names based on conditions using className.",
      "By importing CSS files directly into components.",
    ],
    hint:
      "Think about how to dynamically apply CSS classes based on conditions in JSX.",
    category: "React",
    difficulty: "medium",
    explanation:
      "You can conditionally apply CSS classes in React by dynamically assigning class names based on conditions using the 'className' attribute in JSX.",
  },
  {
    question: "What is the purpose of React's 'useEffect' hook?",
    answer: 4,
    options: [
      "To handle form submissions in functional components.",
      "To create reusable custom hooks.",
      "To manage component state.",
      "To perform side effects in functional components.",
    ],
    hint:
      "Consider actions that occur outside the scope of component rendering in React functional components.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'useEffect' hook in React is used to perform side effects in functional components, such as data fetching, subscriptions, or manually changing the DOM.",
  },
  {
    question:
      "In React, how do you pass data from a child component to its parent?",
    answer: 2,
    options: [
      "By using props.",
      "By defining callback functions in the parent and passing them as props to the child.",
      "By using state management libraries like Redux.",
      "By directly modifying the parent component's state from the child component.",
    ],
    hint:
      "Think about the flow of data between parent and child components in React.",
    category: "React",
    difficulty: "medium",
    explanation:
      "Data can be passed from a child component to its parent in React by defining callback functions in the parent and passing them as props to the child.",
  },
  {
    question:
      "What is the purpose of the 'key' prop in React router's 'Link' component?",
    answer: 3,
    options: [
      "To define the destination route.",
      "To style the link.",
      "To uniquely identify each route link and optimize rendering performance.",
      "To set the active link.",
    ],
    hint: "Consider how React handles component rendering and optimization.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'key' prop in React router's 'Link' component is used to uniquely identify each route link, optimizing rendering performance by allowing React to distinguish between different links.",
  },
  {
    question: "What is the purpose of the 'useState' hook in React?",
    answer: 1,
    options: [
      "To add state management to functional components.",
      "To manage component-level state in functional components.",
      "To create reusable custom hooks.",
      "To handle form submissions in functional components.",
    ],
    hint:
      "Think about the hook used for managing component state in React functional components.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'useState' hook in React is used to add state management to functional components, allowing them to have local state.",
  },
  {
    question: "What is the purpose of the 'ref' attribute in React?",
    answer: 4,
    options: [
      "To define references to external JavaScript files.",
      "To specify the order of rendering for components.",
      "To set default values for form elements.",
      "To reference DOM elements or React components directly.",
    ],
    hint:
      "Consider how 'ref' is used to interact with the DOM or React components.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'ref' attribute in React is used to reference DOM elements or React components directly, allowing you to interact with them programmatically.",
  },
  {
    question:
      "Which hook is used to optimize performance by skipping unnecessary re-renders in React functional components?",
    answer: 2,
    options: ["useContext", "useMemo", "useCallback", "useEffect"],
    hint:
      "Think about hooks that help optimize rendering performance in React functional components.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'useMemo' hook in React is used to optimize performance by memoizing the result of a function, skipping unnecessary re-renders when the dependencies have not changed.",
  },
  {
    question: "What is the purpose of the 'children' prop in React components?",
    answer: 3,
    options: [
      "To specify default props for a component.",
      "To define child components within a parent component.",
      "To render the content nested between the opening and closing tags of a component.",
      "To manage component state.",
    ],
    hint:
      "Think about how 'children' is used to handle content nested within React components.",
    category: "React",
    difficulty: "medium",
    explanation:
      "The 'children' prop in React components is used to render the content nested between the opening and closing tags of a component.",
  },
  {
    question: "What is the purpose of the 'useReducer' hook in React?",
    answer: 2,
    options: [
      "To manage component state in functional components.",
      "To manage complex state logic in functional components.",
      "To create reusable custom hooks.",
      "To handle form submissions in functional components.",
    ],
    hint:
      "Think about the hook used for managing complex state logic in React functional components.",
    category: "React",
    difficulty: "hard",
    explanation:
      "The 'useReducer' hook in React is used to manage complex state logic in functional components, providing an alternative to 'useState' for managing state.",
  },
  {
    question:
      "Explain the purpose of React's 'Context' API and when it might be used.",
    answer: 3,
    options: [
      "To create reusable custom hooks in React functional components.",
      "To manage component state in class components.",
      "To pass data through the component tree without having to pass props down manually at every level.",
      "To handle form submissions in functional components.",
    ],
    hint:
      "Consider how 'Context' can be used to avoid prop drilling in React applications.",
    category: "React",
    difficulty: "hard",
    explanation:
      "React's 'Context' API is used to pass data through the component tree without having to pass props down manually at every level, which can be particularly useful for global data such as themes or user authentication.",
  },
  {
    question: "What is the purpose of the 'useLayoutEffect' hook in React?",
    answer: 1,
    options: [
      "To perform actions after the DOM has been updated but before the browser paints the screen.",
      "To perform synchronous effects immediately after a component has been rendered or updated.",
      "To manage component state in functional components.",
      "To handle form submissions in functional components.",
    ],
    hint:
      "Think about when 'useLayoutEffect' is triggered in the component lifecycle.",
    category: "React",
    difficulty: "hard",
    explanation:
      "The 'useLayoutEffect' hook in React is used to perform actions after the DOM has been updated but before the browser paints the screen, similar to 'componentDidMount' and 'componentDidUpdate' in class components.",
  },
  {
    question:
      "Explain the concept of 'prop drilling' in React and suggest a solution to avoid it.",
    answer: 4,
    options: [
      "Prop drilling is the process of passing props from parent to child components through multiple layers of intermediate components, which can lead to code verbosity and maintenance issues. To avoid prop drilling, you can use React's Context API or third-party state management libraries like Redux to manage global state that can be accessed by any component without explicit prop passing.",
      "Prop drilling is a technique used to optimize performance in React applications by minimizing the number of props passed between components. To avoid prop drilling, you can use higher-order components (HOCs) or render props.",
      "Prop drilling is a security vulnerability in React applications that occurs when sensitive data is passed as props between components. To avoid prop drilling, you can use server-side rendering (SSR) to generate dynamic content on the server.",
      "Prop drilling is the process of passing props from parent to child components through multiple layers of intermediate components, which can lead to code verbosity and maintenance issues. To avoid prop drilling, you can use React's Context API or higher-order components (HOCs) to pass props more efficiently.",
    ],
    hint:
      "Think about how 'prop drilling' impacts the readability and maintainability of React applications.",
    category: "React",
    difficulty: "hard",
    explanation:
      "'Prop drilling' refers to the process of passing props from parent to child components through multiple layers of intermediate components, which can lead to code verbosity and maintenance issues. To avoid prop drilling, you can use React's Context API or third-party state management libraries like Redux to manage global state that can be accessed by any component without explicit prop passing.",
  },
  {
    question:
      "Explain the concept of 'virtual DOM' in React and its significance.",
    answer: 2,
    options: [
      "Virtual DOM is a JavaScript object that represents the actual DOM and allows React to optimize rendering performance by directly manipulating the DOM elements.",
      "Virtual DOM is a lightweight copy of the actual DOM maintained by React, allowing it to efficiently update and render components by calculating the minimum number of DOM operations needed.",
      "Virtual DOM is a technique used to simulate DOM events in React applications for testing purposes.",
      "Virtual DOM is a component in React responsible for handling asynchronous events and callbacks.",
    ],
    hint:
      "Consider how React optimizes rendering performance through the use of 'virtual DOM'.",
    category: "React",
    difficulty: "hard",
    explanation:
      "'Virtual DOM' is a lightweight copy of the actual DOM maintained by React, allowing it to efficiently update and render components by calculating the minimum number of DOM operations needed. This significantly improves performance compared to directly manipulating the actual DOM.",
  },
  {
    question: "What is the purpose of the 'useCallback' hook in React?",
    answer: 1,
    options: [
      "To memoize functions and optimize performance by preventing unnecessary re-renders of child components that rely on them.",
      "To manage component state in functional components.",
      "To create reusable custom hooks.",
      "To handle form submissions in functional components.",
    ],
    hint:
      "Think about how 'useCallback' is used to optimize performance in React functional components.",
    category: "React",
    difficulty: "hard",
    explanation:
      "The 'useCallback' hook in React is used to memoize functions and optimize performance by preventing unnecessary re-renders of child components that rely on them, particularly in scenarios where functions are passed down as props.",
  },
  {
    question:
      "Explain how React Router's 'Switch' component works and when it might be used.",
    answer: 3,
    options: [
      "React Router's 'Switch' component is used to toggle between different routes in a React application based on the current URL path. It is typically used in conjunction with 'Route' components to define different paths and corresponding components.",
      "React Router's 'Switch' component is used to toggle between different themes in a React application based on user preferences. It is typically used in conjunction with 'ThemeProvider' to define different theme configurations.",
      "React Router's 'Switch' component is used to render the first child 'Route' or 'Redirect' that matches the current location. It is typically used when you want to render only one route at a time.",
      "React Router's 'Switch' component is used to create a controlled tab navigation system in a React application. It is typically used in conjunction with 'Tab' components to define different tabs and corresponding content.",
    ],
    hint:
      "Consider the purpose of 'Switch' in routing and how it determines which route to render.",
    category: "React",
    difficulty: "hard",
    explanation:
      "React Router's 'Switch' component is used to render the first child 'Route' or 'Redirect' that matches the current location. It is typically used when you want to render only one route at a time, ensuring that only the first matching route is rendered.",
  },
  {
    question: "What is the purpose of the 'useImperativeHandle' hook in React?",
    answer: 4,
    options: [
      "To create a reference to a DOM element or React component.",
      "To imperatively manipulate the DOM in functional components.",
      "To handle asynchronous actions in functional components.",
      "To customize the instance value that is exposed by a custom hook.",
    ],
    hint:
      "Think about how 'useImperativeHandle' is used to customize the instance value exposed by a custom hook.",
    category: "React",
    difficulty: "hard",
    explanation:
      "The 'useImperativeHandle' hook in React is used to customize the instance value that is exposed by a custom hook, allowing you to specify which values or functions are accessible from the parent component.",
  },
  {
    question:
      "Explain the purpose of React's 'forwardRef' function and when it might be used.",
    answer: 1,
    options: [
      "React's 'forwardRef' function is used to pass a ref from a parent component to a child component that doesn't need to access the ref itself. It is typically used when you need to forward refs through higher-order components or when using third-party libraries that rely on refs.",
      "React's 'forwardRef' function is used to create a reference to a DOM element or React component.",
      "React's 'forwardRef' function is used to manage component state in functional components.",
      "React's 'forwardRef' function is used to define reusable custom hooks.",
    ],
    hint:
      "Consider situations where you need to pass refs between components in React.",
    category: "React",
    difficulty: "hard",
    explanation:
      "React's 'forwardRef' function is used to pass a ref from a parent component to a child component that doesn't need to access the ref itself. It is typically used when you need to forward refs through higher-order components or when using third-party libraries that rely on refs.",
  },
];

db.once("open", async () => {
  console.log("Connected to MongoDB database");

  try {
    // Remove existing data
    await Question.deleteMany({});
    await FlashCard.deleteMany({});

    // Insert seed data
    await Question.insertMany(questionsData);

    console.log("Seed data inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
});
