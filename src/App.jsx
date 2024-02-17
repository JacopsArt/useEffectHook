import { useEffect, useState } from "react";
import { fetchPeople, fetchPerson } from "./fetchers";

const App = () => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchPeople().then((data) => {
      setPeople(data);
    });
  }, []);

  const handleButtonClick = (personId) => {
    setId(personId);
    fetchPerson(personId).then((data) => {
      setPerson(data);
    });
  };

  return (
    <div className="App">
      <h1>React Hooks Exercise Starter</h1>
      <div>
        {people.map((p) => (
          <button key={p.id} onClick={() => handleButtonClick(p.id)}>
            {p.name}
          </button>
        ))}
      </div>
      {person && (
        <div>
          <h2>{person.name}</h2>
          <p>Age: {person.age}</p>
          <p>Hobbies: {person.hobbies.join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default App;
