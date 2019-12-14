import React, { Fragment } from "react";
//import logo from "./logo.svg";
import "./App.css";

/* Conditional rendering  */

function UserGreeting() {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting() {
  return <h1>Please sign up.</h1>;
}

function Greeting(props: { isLoggedIn: boolean }) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

const App: React.FC = () => {
  console.log("Type Script!");
  return (
    <div className="App">
      <Greeting isLoggedIn={false} />
    </div>
  );
};

/* handling events */
/*
class Toggle extends React.Component<{}, { isToggleON: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { isToggleON: true };
    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }
  //this is a common pattern for an event handler to be a method on the class.
  //in JavaScript, class methods are not bound by default.
  handleClick() {
    this.setState(state => ({
      isToggleON: !state.isToggleON
    }));
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleON ? "ON" : "OFF"}
      </button>
    );
  }
}

class LoggingButton extends React.Component {
  // this syntax ensures `this` is bound within handleClick.
  // warning: this is *experimental* syntax.
  // define an event handler as a class field
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}

class LoggingButton2 extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    this.handleClick(); // this: LoggingButton2
    // use arrow function to get ‘this’ to work
    // drawback: a different callback is created each time the LoggingButton renders
    return (
      <Fragment>
        <button onClick={this.handleClick}>Click me (Undefined) </button>
        <button onClick={e => this.handleClick()}>
          Click me (LoggingButton2)
        </button>
      </Fragment>
    );
  }
}

const App: React.FC = () => {
  console.log("Type Script!");
  return (
    <div className="App">
      <Toggle />
      <LoggingButton />
      <LoggingButton2 />
    </div>
  );
};
*/

/* state and lifecycle */

/*
class Clock extends React.Component<{}, { date: Date }> {
  timerID: number = 0;
  constructor(props: {}) {
    super(props);
    this.state = { date: new Date() };
  }

  //runs after the component output has been rendered to the DOM
  componentDidMount() {
    //this.timerID  = setInterval((() => this.tick()) as TimerHandler, 1000);
    this.timerID = window.setInterval(() => this.tick(), 1000);
  }

  //if the Clock component is ever removed from the DOM,
  //React calls the componentWillUnmount() lifecycle method so the timer is stopped.
  componentWillUnmount() {
    window.clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const App: React.FC = () => {
  console.log("Type Script!");
  return (
    <div className="App">
      <Clock />
    </div>
  );
};
*/

/* components and props - extracting components */
/*
//split components into smaller components.
function Avatar(props: { user: { name: string; avatarUrl: string } }) {
  //naming props from the component’s own point of view
  //rather than the context in which it is being used.
  //All React components must act like pure functions
  //with respect to their props.
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString();
}
function UserInfo(props: { user: { name: string; avatarUrl: string } }) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}

function Comment(props: {
  author: { name: string; avatarUrl: string };
  text: string;
  date: Date;
}) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  );
}
const comment = {
  date: new Date(),
  text: "I hope you enjoy learning React!",
  author: {
    name: "Hello Kitty",
    avatarUrl: "https://placekitten.com/g/64/64"
  }
};

const App: React.FC = () => {
  console.log("Type Script!");
  return (
    <div className="App">
      <Comment
        date={comment.date}
        text={comment.text}
        author={comment.author}
      />
    </div>
  );
};
*/
/* components and props - composing components */

/*
//function can be a valid React component
//as long as it accepts a single “props” object argument.
function Welcome(props: any) {
  return <h1>Hello, {props.name}</h1>;
}

//extend React.Component class
interface WelcomeProps {
  name: string;
}
class Welcome2 extends React.Component<WelcomeProps> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
//using destructuring
class Welcome3 extends React.Component<{ name: string }> {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

const welcomeSara = <Welcome name="Sara" />;
const welcomeJoe = <Welcome2 name="Joe" />;
const welcomeDan = <Welcome3 name="Dan" />;

const App: React.FC = () => {
  console.log("Type Script!");
  return (
    <div className="App">
      {welcomeSara}
      {welcomeJoe}
      {welcomeDan}
    </div>
  );
};
*/

/*
  const App: React.FC = () => {
  console.log("Type Script!");
  return <div className="App"></div>;
};
*/
export default App;
