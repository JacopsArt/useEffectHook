import { useEffect, useState } from "react";
import { fetchPeople, fetchPerson } from "./fetchers";

const App = () => {
  const [people, setPeople] = useState([]);
  const [person, setPerson] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    console.log("Fetching initial data...");
    const fetchInitialData = async () => {
      console.log("Fetching People");
      const data = await fetchPeople();
      setPeople(data);
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    console.log("Fetching selected person data...");
    const fetchSelectedPerson = async () => {
      setPerson(null); // Immediately set the person state to null

      if (id !== null) {
        try {
          console.log("Fetching Person");
          const data = await fetchPerson(id);
          setPerson(data);
        } catch (error) {
          console.error('Error fetching selected person data:', error);
          setPerson(null); // Reset person state in case of error
        }
      }
    };

    fetchSelectedPerson();

    // Cleanup function
    return () => {
      console.log("Cleaning up the person effect");
    };
  }, [id]);

  const handleButtonClick = (personId) => {
    console.log("Button clicked. Person ID:", personId);
    setId(personId);
  };

  useEffect(() => {
    console.log("Rendering");
  });

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
