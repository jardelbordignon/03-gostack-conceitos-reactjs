import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setReposiories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(res => {
      console.log(res.data)
      setReposiories(res.data)
    })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      title: "Desafio ReactJS",
      url: "https://github.com/jardelbordignon",
      techs: ["ReactJs", "Node.js"],
    })
    setReposiories([...repositories, res.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    const filteredRepositories = repositories.filter(rep => (rep.id !== id))
    setReposiories(filteredRepositories)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => (
          <li key={rep.id}>
            <h4>{rep.title}</h4>
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
