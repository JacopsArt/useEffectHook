import { useEffect, useState } from "react";
import { fetchPeople, fetchPerson } from "./fetchers";

const App = () => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchPeople();
      setPeople(data);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchSelectedPerson = async () => {
      setPerson(null); 

      if (id !== null) {
        try {
          const data = await fetchPerson(id);
          setPerson(data);
        } catch (error) {
          console.error('Error fetching selected person data:', error);
          setPerson(null); // Reset person state in case of error
        }
      }
    };

    fetchSelectedPerson();
  }, [id]);

  const handleButtonClick = (personId) => {
    setId(personId);
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
