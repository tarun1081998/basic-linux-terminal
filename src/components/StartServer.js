import React, { useState } from "react";

const StartServer = ({startServer}) => {
    const [serverName, setServerName] = useState('')
    return (
        <div>
            <input value={serverName} onChange={(e)=>setServerName(e.target.value)}/>
            <button onClick={()=>{startServer(serverName)}}>Start</button>
        </div>
    )
}

export default StartServer