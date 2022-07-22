import { useState } from "react";

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>;

const getRandomInt = (max) => Math.floor(Math.random() * max); //max is not included

const increaseVote = ({ currentVotes, optionVoted }) => {
  const newVotes = { ...currentVotes };
  newVotes[optionVoted] += 1;
  return newVotes;
};

const getMaxFromObject = (object) => {
  const objectKeys = Object.keys(object);
  const max = objectKeys.reduce((currentMax, currentValue) =>
    object[currentValue] > object[currentMax] ? currentValue : currentMax
  ,0);
  return max
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [anecdoteVotes, setAnecdoteVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });
  const [selected, setSelected] = useState(0);
  const anecdoteMostVoted = getMaxFromObject(anecdoteVotes)
  console.log(anecdoteMostVoted);
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <Button
        onClick={() => setSelected(getRandomInt(anecdotes.length))}
        text="random anecdote 😳"
      />
      <Button
        onClick={() =>
          setAnecdoteVotes(
            increaseVote({ currentVotes: anecdoteVotes, optionVoted: selected })
          )
        }
        text="vote"
      />
      <p>has {anecdoteVotes[selected]} votes</p>
      
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[anecdoteMostVoted]}</div>
      <p>has {anecdoteVotes[anecdoteMostVoted]} votes</p>
      
    </>
  );
};

export default App;
