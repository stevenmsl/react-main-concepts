import React, { Fragment } from "react";
//import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  };
  return <div className="App"></div>;
};

/* Render Props - use HOC to improve wrapped component  */
/*
interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
  children(props: InjectedCounterProps): JSX.Element;
}
interface MakeCounterChildrenPropOnly {
  children(props: InjectedCounterProps): JSX.Element;
}

// omit the children property from MakeCounterProps
type MakeCounterHocProps = Pick<
  MakeCounterProps,
  Exclude<keyof MakeCounterProps, keyof MakeCounterChildrenPropOnly>
>;

interface MakeCounterState {
  value: number;
}
class MakeCounter extends React.Component<MakeCounterProps, MakeCounterState> {
  state: MakeCounterState = {
    value: 0
  };

  increment = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.maxValue
          ? prevState.value
          : prevState.value + 1
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.minValue
          ? prevState.value
          : prevState.value - 1
    }));
  };

  render() {
    return this.props.children({
      value: this.state.value,
      onIncrement: this.increment,
      onDecrement: this.decrement
    });
  }
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
): React.SFC<Pick<P, Exclude<keyof P, keyof InjectedCounterProps>> &
  MakeCounterHocProps> => ({
  minValue,
  maxValue,
  // When you hover over …pros it appears to be empty.
  // But the style property is still there, and it’s just isn’t part of the MakeCounterHocProps type
  ...props
}: MakeCounterHocProps) => (
  <MakeCounter minValue={minValue} maxValue={maxValue}>
    {injectedProps => <Component {...(props as P)} {...injectedProps} />}
  </MakeCounter>
);

interface CounterProps extends InjectedCounterProps {
  style: React.CSSProperties;
}
const Counter = (props: CounterProps) => {
  console.log("Counter's props", props); // Verify the properties are passing down properly to the Counter
  return (
    <div style={props.style}>
      <button onClick={props.onDecrement}> - </button>
      {props.value}
      <button onClick={props.onIncrement}> + </button>
    </div>
  );
};

// MyCounter Doesn’t have access to the render prop (children) as it has been removed.
const MyCounter = makeCounter(Counter);

const App: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  };

  return (
    <div className="App">
      <MyCounter minValue={-6} maxValue={6} style={divStyle} />
    </div>
  );
};
*/

/* Render Props - wrapped component  */
/*
interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface CounterProps extends InjectedCounterProps {
  style: React.CSSProperties;
}

// MakeCounter is no longer backed into Counter
const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);

interface WrappedCounterProps extends CounterProps {
  minValue?: number;
  maxValue?: number;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
  children(props: InjectedCounterProps): JSX.Element;
}

interface MakeCounterState {
  value: number;
}

class MakeCounter extends React.Component<MakeCounterProps, MakeCounterState> {
  state: MakeCounterState = {
    value: 0
  };

  increment = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.maxValue
          ? prevState.value
          : prevState.value + 1
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.minValue
          ? prevState.value
          : prevState.value - 1
    }));
  };

  render() {
    return this.props.children({
      value: this.state.value,
      onIncrement: this.increment,
      onDecrement: this.decrement
    });
  }
}

const WrappedCounter = ({
  minValue,
  maxValue,
  ...props
}: WrappedCounterProps) => (
  <MakeCounter minValue={minValue} maxValue={maxValue}>
    {injectedProps => <Counter {...props} {...injectedProps} />}
  </MakeCounter>
);

const App: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  };

  // The main drawback here is that WrappedCounter is less convenient to use:
  // you need to specify dummy values for the injected properties which will never been used.
  return (
    <div className="App">
      <WrappedCounter
        maxValue={6}
        minValue={-6}
        style={divStyle}
        value={-100} // Will not be used as this taken over by Make Counter and initialized to 0
        onIncrement={() => {}} // Will not be used
        onDecrement={() => {}} // Will not be used
      />
    </div>
  );
};
*/
/* Render Props */
/*
interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
  // render prop
  // states that the component requires a function
  // passed in that takes in the injected props and returns a JSX element
  children(props: InjectedCounterProps): JSX.Element;
}

interface MakeCounterState {
  value: number;
}

// Render Props - Benefits
// Render Props vs. HOC
// 1. MakeCounter's own component declaration becomes much simpler
//    when comparing to the HOC approach:
//    class MakeCounter extends React.Component<
//    Pick<P, Exclude<keyof P, keyof InjectedCounterProps>> & MakeCounterProps,
//    MakeCounterState
//    >
// 2. It is no longer wrapped in a function as it is no longer a HOC

class MakeCounter extends React.Component<MakeCounterProps, MakeCounterState> {
  state: MakeCounterState = {
    value: 0
  };

  increment = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.maxValue
          ? prevState.value
          : prevState.value + 1
    }));
  };

  decrement = () => {
    this.setState(prevState => ({
      value:
        prevState.value === this.props.minValue
          ? prevState.value
          : prevState.value - 1
    }));
  };

  render() {
    // less work here in rendering when comparing to the HOC approach:
    // no destructuring and object rest/spread needed
    return this.props.children({
      value: this.state.value,
      onIncrement: this.increment,
      onDecrement: this.decrement
    });
  }
}

interface CounterProps {
  style: React.CSSProperties;
  minValue?: number;
  maxValue?: number;
}

// Counter needs to tell MakeCounter what its children looks like
// and how the injected props are used in rendering its children
// even though Counter is not responsible for providing the values
// of injected props

const Counter = (props: CounterProps) => (
  <MakeCounter minValue={props.minValue} maxValue={props.maxValue}>
    {injectedProps => (
      <div style={props.style}>
        <button onClick={injectedProps.onDecrement}> - </button>
        {injectedProps.value}
        <button onClick={injectedProps.onIncrement}> + </button>
      </div>
    )}
  </MakeCounter>
);

// render prop component approach allows
// for more control over the naming of the props
// and flexibility in their usage when comparing to HOC approach

interface CounterProps2 {
  style: React.CSSProperties;
  value: number;
  minCounterValue?: number;
  maxCounterValue?: number;
}

// Render Props - Issues
// MakeCounter is now baked into the Counter (Counter2) component rather than wrapping it,
// making it more difficult to test the two in isolation

const Counter2 = (props: CounterProps2) => (
  <MakeCounter
    minValue={props.minCounterValue}
    maxValue={props.maxCounterValue}
  >
    {(
      // the props are injected in the render function of component,
      // you cannot make use of them in the lifecycle methods in Counter2
      injectedProps
    ) => (
      <div>
        <div>Some other value: {props.value} </div>
        <div style={props.style}>
          <button onClick={injectedProps.onDecrement}> - </button>
          {injectedProps.value}
          <button onClick={injectedProps.onIncrement}> + </button>
        </div>
        {props.minCounterValue !== undefined ? (
          <div>Min value: {props.minCounterValue} </div>
        ) : null}
        {props.maxCounterValue !== undefined ? (
          <div>Max value: {props.maxCounterValue} </div>
        ) : null}
      </div>
    )}
  </MakeCounter>
);

const App: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  };
  return (
    <div className="App">
      <Counter style={divStyle} minValue={-5} maxValue={5} />
      <Counter2
        style={divStyle}
        value={10}
        minCounterValue={-6}
        maxCounterValue={6}
      />
    </div>
  );
};
*/
/* Higher Order Component (HOC) – Enhance + Inject */
/*
interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterProps {
  minValue?: number;
  maxValue?: number;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  class MakeCounter extends React.Component<
    Pick<P, Exclude<keyof P, keyof InjectedCounterProps>> & MakeCounterProps,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0
    };

    increment = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.maxValue
            ? prevState.value
            : prevState.value + 1
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value:
          prevState.value === this.props.minValue
            ? prevState.value
            : prevState.value - 1
      }));
    };

    render() {
      const { minValue, maxValue, ...props } = this.props;
      return (
        <Component
          {...(props as P)}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };


//The component to be wrapped by the HOC
interface CounterProps extends InjectedCounterProps {
  style: React.CSSProperties;
}

type testType = Exclude<CounterProps, InjectedCounterProps>;

const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);

const MyCounter = makeCounter(Counter);

const App: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  };
  return (
    <div className="App">
      <MyCounter style={divStyle} minValue={-2} maxValue={5} />
    </div>
  );
};
*/

/* Higher Order Component (HOC) – Injectors */

/*
// the props that will be injected into the component
// the injected props will then be removed from the wrapped component 
// so they can no longer be set from the outside
interface InjectedCounterProps {
  value: number;
  onIncrement(): void;
  onDecrement(): void;
}

interface MakeCounterState {
  value: number;
}

const makeCounter = <P extends InjectedCounterProps>(
  Component: React.ComponentType<P>
) =>
  // Exclude is essentially: type Exclude<T, U> = T extends U ? never : T
  // So in our case since P extends InjectedCounterProps the return type will be never
  // Exclude<P, InjectedCounterProps> will return never
  // Exclude is really intended for removing branches from a union type.
  // For example Exclude<string|null|void, null|void> ⇒ string,
  // or for excluding elements from a keyof type
  //
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetu

  class MakeCounter extends React.Component<
    Pick<P, Exclude<keyof P, keyof InjectedCounterProps>>,
    MakeCounterState
  > {
    state: MakeCounterState = {
      value: 0
    };

    increment = () => {
      this.setState(prevState => ({
        value: prevState.value + 1
      }));
    };

    decrement = () => {
      this.setState(prevState => ({
        value: prevState.value - 1
      }));
    };

    render() {
      return (
        <Component
          {...(this.props as P)}
          value={this.state.value}
          onIncrement={this.increment}
          onDecrement={this.decrement}
        />
      );
    }
  };

//The component to be wrapped by the HOC
interface CounterProps extends InjectedCounterProps {
  style: React.CSSProperties;
}

type testType = Exclude<CounterProps, InjectedCounterProps>;

const Counter = (props: CounterProps) => (
  <div style={props.style}>
    <button onClick={props.onDecrement}> - </button>
    {props.value}
    <button onClick={props.onIncrement}> + </button>
  </div>
);

const MyCounter = makeCounter(Counter);

const App: React.FC = () => {
  const divStyle: React.CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.85)"
  };
  return (
    <div className="App">
      <MyCounter style={divStyle} />
    </div>
  );
};
*/

/* Higher Order Component (HOC) – Enhancers */
/*
function LoadingSpinner() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

//props that will be added to the component when it is wrapped
interface WithLoadingProps {
  loading: boolean;
}

// P represents the props of the component that is passed into the HOC
// React.ComponentType<P> is an alias of React.FunctionComponent<P>|React.ClassComponent<P>
const withLoading = <P extends object>(Component: React.ComponentType<P>) =>
  class WithLoading extends React.Component<P & WithLoadingProps> {
    render() {
      const { loading, ...props } = this.props;
      // A type cast (props as P) is required from TypeScript v3.2 onwards
      return loading ? <LoadingSpinner /> : <Component {...(props as P)} />;
    }
  };

interface WelcomePropsType {
  name?: string;
}

class Welcome extends React.Component<WelcomePropsType> {
  constructor(props: WelcomePropsType) {
    super(props);
  }

  render() {
    const { name } = this.props;
    return (
      <div>
        <p>Welcome {name}!</p>
      </div>
    );
  }
}

const WelcomeWithLoading = withLoading<WelcomePropsType>(Welcome);

const App: React.FC = () => {
  return (
    <div className="App">
      <WelcomeWithLoading loading={true}> </WelcomeWithLoading>
      <WelcomeWithLoading loading={false} name={"Steven"} />
    </div>
  );
};
*/

/* Composition vs Inheritance - Containment 2 */
/*
function Contacts() {
  return (
    <div className="Contacts">
      <p>Contacts</p>
    </div>
  );
}

function Chat() {
  return (
    <div className="Chat">
      <p>Chat</p>
    </div>
  );
}

type SplitPanePropsType = {
  left?: React.ReactNode;
  right?: React.ReactNode;
};

const SplitPane: React.FunctionComponent<SplitPanePropsType> = props => (
  <div className="SplitPane">
    <p>SplitPane</p>
    <div className="SplitPane-left">{props.left}</div>
    <div className="SplitPane-right">{props.right}</div>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="App">
      <SplitPane left={<Contacts />} right={<Chat />}></SplitPane>
    </div>
  );
};
*/
/* Composition vs Inheritance - Containment 1 */
/*
type FancyBorderProps = {
  color: string;
};

const FancyBorder: React.FunctionComponent<FancyBorderProps> = props => (
  <div className={"FancyBorder FancyBorder-" + props.color}>
    {props.children}
  </div>
);

function WelcomeDialog() {
  //Anything inside the <FancyBorder> JSX tag
  //gets passed into the FancyBorder component as a children prop.
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
}

const App: React.FC = () => {
  return (
    <div className="App">
      <WelcomeDialog />
    </div>
  );
};
*/

/*  Lifting State Up - components in sync  */

/*
function toCelsius(fahrenheit: number) {
  return ((fahrenheit - 32) * 5) / 9;
}

function toFahrenheit(celsisu: number) {
  return (celsisu * 9) / 5 + 32;
}

function tryConvert(tempature: string, convert: (temp: number) => number) {
  const input = parseFloat(tempature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

type scaleKeyType = keyof typeof scaleNames; // "c" | "f"
type TemperatureInputPropType = {
  scale: scaleKeyType;
  temperature: string;
  onTemperatureChange: (temp: string) => void;
};

class TemperatureInput extends React.Component<TemperatureInputPropType, {}> {
  constructor(props: TemperatureInputPropType) {
    // lifting state up: sharing state is accomplished
    // by moving it up to the closest common ancestor of
    // the components that need it.
    // Remove the local state from the TemperatureInput
    // and move it into the Calculator instead.
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    // - now that the temperature is coming from the parent as a prop,
    //   the TemperatureInput has no control over it:
    //   When the TemperatureInput wants to update its temperature,
    //   it calls this.props.onTemperatureChange:
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    // - replace this.state.temperature with this.props.temperature

    const tempature = this.props.temperature;
    const scale = this.props.scale;
    // TemperatureInput accept both temperature
    // and onTemperatureChange props from its parent Calculator.
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}</legend>
        <input value={tempature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

function BoilingVerdict(props: { celsius: number }) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil</p>;
}

type CalculatorStateType = {
  scale: scaleKeyType;
  temperature: string;
};

class Calculator extends React.Component<{}, CalculatorStateType> {
  constructor(props: {}) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleCelsiusChange.bind(this);
    // Calculator owns the shared state,
    // it becomes the “source of truth”
    // for the current temperature in both inputs
    this.state = { temperature: "", scale: "c" };
  }

  handleCelsiusChange(temperature: string) {
    // Calculator component asks React to re-render itself
    // by calling this.setState()
    this.setState({ scale: "c", temperature });
  }
  handleFahrenheitChange(temperature: string) {
    this.setState({ scale: "f", temperature });
  }

  // React calls the Calculator component’s render method to learn
  // what the UI should look like after the local state changed
  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    // React calls the render methods of the individual TemperatureInput
    // components with their new props specified by the Calculator.
    // It learns what their UI should look like.
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
};
*/

/*  Lifting State Up - components not in sync  */

/*
const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

type scaleKeyType = keyof typeof scaleNames; // "c" | "f"

class TemperatureInput extends React.Component<
  {
    scale: scaleKeyType;
  },
  { temperature: string }
> {
  constructor(props: { scale: any }) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ temperature: e.target.value });
  }

  render() {
    const tempature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}</legend>
        <input value={tempature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
};
*/

/*  Lifting State Up - 1 */
/*
function BoilingVerdict(props: { celsius: number }) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil</p>;
}

class Calculator extends React.Component<{}, { temperature: string }> {
  constructor(props: {}) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }
  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ temperature: e.target.value });
  }
  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter tempature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
};
*/

/* Forms – Handling Multiple Inputs */
/*
class Reservation extends React.Component<{}, any> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfRequest: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log({ [name]: value });
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            checked={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Reservation />
    </div>
  );
};
*/
/* Forms – select tag */

/*
class FlavorForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { value: "coconut" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //use ChangeEvent not SyntheticEvent so you have access to target.value
  handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert(`Your favorite flavor is: ${this.state.value}`);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <FlavorForm />
    </div>
  );
};
*/

/* Forms – Controlled Components */

/*
class NameForm extends React.Component<{}, { value: string }> {
  constructor(props: {}) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value });
  }
  handleSubmit(event: any) {
    alert("A name was submitted: " + this.state.value);
    //console.log("A name was submitted: " + this.state.value);
    event.preventDefault();
  }
  render() {
    // Since the value attribute is set on our form element,
    // the displayed value will always be this.state.value,
    // making the React state the source of truth.
    // Since handleChange runs on every keystroke to update the React state,
    // the displayed value will update as the user types.
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <NameForm />
    </div>
  );
};
*/

/* Lists and Keys - Keys Must Only Be Unique Among Siblings */
/*
function Blog(props: {
  posts: { id: number; title: string; content: string }[];
}) {
  // Keys used within arrays should be unique among their siblings.
  // However they don’t need to be globally unique.
  // We can use the same keys when we produce two different arrays.

  const sidebar = (
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map(post => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}
const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." }
];

const App: React.FC = () => {
  return (
    <div className="App">
      <Blog posts={posts} />
    </div>
  );
};
*/

/* Lists and Keys - correct key usage  */

/*
function ListItem(props: { value: number }) {
  //There is no need to specify the key here:
  return <li>{props.value}</li>;
}
function NumberList(props: { numbers: number[] }) {
  const numbers = props.numbers;
  // Key should be specified inside the array.
  const listItems = numbers.map(number => (
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];

const App: React.FC = () => {
  return (
    <div className="App">
      <NumberList numbers={numbers} />
    </div>
  );
};
*/
/* Lists and Keys - Basic List Component */
/*
function NumberList(props: { numbers: number[] }) {
  const numbers = props.numbers;
  // A “key” is a special string attribute you need to include
  // when creating lists of elements.
  // - Keys help React identify which items have changed,
  //   are added, or are removed.
  // - Keys should be given to the elements inside the array
  //   to give the elements a stable identity:
  const listItems = numbers.map(number => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];

const App: React.FC = () => {
  return (
    <div className="App">
      <NumberList numbers={numbers} />
    </div>
  );
};
*/

/* Lists and Keys - Rendering Multiple Components */
/*
const numbers = [1, 2, 3, 4, 5];
//JSX.Element[]
const listItems = numbers.map(number => <li>{number}</li>);
const App: React.FC = () => {
  return (
    <div className="App">
      <ul>{listItems}</ul>
    </div>
  );
};
*/

/* Conditional rendering - Preventing Component from Rendering */

/*
function WarningBanner(props: { warn: boolean }) {
  if (!props.warn) {
    //returning null from a component’s render method does not
    //affect the firing of the component’s lifecycle methods.
    return null; //you want a component to hide itself even though it was rendered by another component
  }
  return <div className="warning">Warning!</div>;
}

class Page extends React.Component<{}, { showWarning: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }
  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="App">
      <Page />
    </div>
  );
};
*/

/* Conditional rendering - Inline If with Logical && Operator */

/*
function Mailbox(props: { unreadMessages: string[] }) {
  const unreadMessages = props.unreadMessages;
  //true && expression always evaluates to expression,
  //and false && expression always evaluates to false.
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>you have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}
const messages = ["React", "Re: React", "Re:Re: React"];

const App: React.FC = () => {
  return (
    <div className="App">
      <Mailbox unreadMessages={messages} />
    </div>
  );
};
*/

/* Conditional rendering  */

/*
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

function LoginButton(props: { onClick: () => void }) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props: { onClick: () => void }) {
  return <button onClick={props.onClick}>Logout</button>;
}

class LoginControl extends React.Component<{}, { isLoggedIn: boolean }> {
  constructor(props: {}) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }
  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const App: React.FC = () => {
  console.log("Type Script!");
  return (
    <div className="App">
      <LoginControl />
    </div>
  );
};
*/

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
