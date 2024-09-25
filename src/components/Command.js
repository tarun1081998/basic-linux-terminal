import React, { useEffect, useRef, useState } from "react";

const Command = ({server, onEnter, key}) => {
    const [command, setCommand] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const submitCommand = (e) =>{
        if(e.key.toLowerCase() === 'enter'){
            setIsDisabled(true)
            onEnter(command)
        }
    }

    return(
        <div key={key}>
            <span className="server-name">{server+" $"}</span>
            <input 
                className="command-inp" 
                value={command} 
                onChange={(e)=>setCommand(e.target.value)} 
                onKeyDown={submitCommand} 
                id={key} 
                disabled={isDisabled}
                ref={inputRef}
            />
        </div>
    )
}

export default Command;