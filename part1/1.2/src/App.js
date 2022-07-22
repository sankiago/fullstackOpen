const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ name, num_of_exercises }) => (
  <p>
    {name} {num_of_exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((currentPart, index) => 
    <Part key={index} name={currentPart.name} num_of_exercises={currentPart.exercises} />
  );
}

const Total = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce(
      (previousValue, currentPart) => previousValue + currentPart.exercises,
      0
    )}
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.it
        parts} />
    </div>
  );
};

export default App;
