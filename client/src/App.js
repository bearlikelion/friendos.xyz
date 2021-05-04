import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  // Hooks
  const [servers, setServers] = useState([])
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("//api.friendos.xyz/")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setServers(result.servers);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        <h1>Friendos Game Servers:</h1>
        <ul>
          {servers.map(server => (
            <li key={server.steamid}>
              <h2>{server.name}</h2>
              <h3><a href={"https://store.steampowered.com/app/" + server.appid} target="_blank" rel="noreferrer">{server.product}</a></h3>
              <h4>Players: {server.players} / {server.max_players}</h4>
              <a href={"steam://connect/" + server.addr}>Connect</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
