import { useEffect, useState } from "react";
import { fetchPeople, fetchPerson } from "./fetchers";

const App = () => {
  const [people, setPeople] = useState([]);
  const [id, setId] = useState(null);
  const [person, setPerson] = useState(null);

  useEffect(() => {
    fetchPeople().then((data) => {
      setPeople(data);
    });
  }, []);

  useEffect(() => {
    if (id) {
      fetchPerson(id).then((data) => {
        setPerson(data);
      });
    } else {
      setPerson(null);
    }
  }, [id]);

  const handleButtonClick = (personId) => {
    setId(personId);
  };

  return (
    <div className="App">
      <h1>React Hooks Exercise Starter</h1>
      {people.map((person) => (
        <button key={person.id} onClick={() => handleButtonClick(person.id)}>
          {person.name}
        </button>
      ))}
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
