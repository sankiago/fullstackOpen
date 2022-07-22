import { useState } from "react";

const Button = ({ onClick, text, uniqueKey }) => (
  <button key={uniqueKey} onClick={onClick}>
    {text}
  </button>
);

const updateOptionState = (option, currentState, setState) => () => {
  const stateUpdated = { ...currentState };
  stateUpdated[option] += 1;
  console.log(stateUpdated);
  setState(stateUpdated);
  return stateUpdated;
};

const ButtonHub = ({ title, options, currentState, setState }) => {
  const buttons = options.map((option, index) => (
    <Button
      key={index}
      onClick={updateOptionState(option, currentState, setState)}
      text={option}
    ></Button>
  ));
  return (
    <>
      <h2>{title}</h2>
      {buttons}
    </>
  );
};

const StatisticLine = ({ label, value }) => (
  <tr>
    <td>{label}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ data }) => {
  const dataAsArray = Object.entries(data);
  const all = dataAsArray.reduce(
    (partialSum, [option, amount]) => partialSum + amount,
    0
  );

  if (all == 0)
    return (
      <>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </>
    );

  const weightedSum = dataAsArray.reduce((partialSum, [option, amount]) => {
    let weightedAmount;
    switch (option) {
      case "good":
        weightedAmount = amount * 1;
        break;
      case "neutral":
        weightedAmount = 0;
        break;
      case "bad":
        weightedAmount = amount * -1;
        break
    }
    return partialSum + weightedAmount;
  }, 0);
  const average = weightedSum / all;
  const positiveFeedback = (data.good / all) * 100;
  const dataAsJSX = dataAsArray.map((datum, index) => (
    <StatisticLine label={datum[0]} value={datum[1]} key={datum[0]} />
  ));
  const statsAsJSX = (
    <>
      <StatisticLine label="all" value={all} key="all" />
      <StatisticLine label="average" value={average.toFixed(1)} key="average" />
      <StatisticLine label="positive" value={positiveFeedback.toFixed(2) + '%'} key="positive" />
    </>
  );
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          {dataAsJSX}
          {statsAsJSX}
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const feedbackOptionsList = ["good", "neutral", "bad"];

  //Set initial states
  const initialStates = {};
  feedbackOptionsList.forEach((option) => {
    initialStates[option] = 0;
  });
  const [feedbackOptionState, setFeedbackOptionState] = useState(initialStates);

  return (
    <>
      <ButtonHub
        title="give feedback"
        options={feedbackOptionsList}
        currentState={feedbackOptionState}
        setState={setFeedbackOptionState}
      />
      <Statistics data={feedbackOptionState} />
    </>
  );
};

export default App;
