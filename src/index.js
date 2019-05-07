import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

window.inStr = `{"name":"John","email":"john@awesome.com","plan":"Pro"}`;

function App() {
  return (
    <div className="App">
      <TutorialComponent
        tutorialStr={JSON.stringify(JSON.parse(window.inStr), undefined, 2)}
      />
    </div>
  );
}

class TutorialComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: {},
      serializedTutorial: this.props.tutorialStr
    };
  }

  handleTextChange = e =>
    this.setState({
      serializedTutorial: e.target.value,
      tutorialErrorMsg: null
    });

  handleValidateTutorial = () => {
    try {
      const newTutorial = JSON.parse(this.state.serializedTutorial);
      this.setState({
        tutorial: newTutorial,
        serializedTutorial: JSON.stringify(newTutorial, undefined, 2),
        tutorialErrorMsg: undefined
      });
    } catch (err) {
      this.setState({ tutorialErrorMsg: err.message });
    }
  };

  render() {
    const { tutorialErrorMsg, serializedTutorial } = this.state;
    return (
      <React.Fragment>
        {tutorialErrorMsg && (
          <div className="error-msg">{tutorialErrorMsg}</div>
        )}

        <textarea
          cols="100"
          rows="20"
          onChange={this.handleTextChange}
          value={serializedTutorial}
        />
        <button onClick={this.handleValidateTutorial}>Validate</button>
        <button>Save</button>
        <TutorialDumper tutorialObject={this.state.tutorial} />
      </React.Fragment>
    );
  }
}

const TutorialDumper = props => {
  const { tutorialObject } = props;
  return (
    <ul>
      {Object.keys(tutorialObject).map((k, i) => (
        <li key={i}>{k}</li>
      ))}
    </ul>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
