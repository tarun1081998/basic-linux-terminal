import './App.css';
import StartServer from './components/StartServer';
import Terminal from './components/Terminal';
import { useEffect, useState } from 'react';

function App() {
  const [serverName, setServerName] = useState('')
  useEffect(()=>{
    window.localStorage.setItem('currentPath','/')
  },[])
  const startServer = (serverName) => {
    setServerName(serverName)
  }
  return (
    <div className='main-container'>
      <StartServer startServer={startServer}/>
      {serverName.length > 0 && 
        <Terminal serverName={serverName}/>
      }
    </div>
  );
}

export default App;
