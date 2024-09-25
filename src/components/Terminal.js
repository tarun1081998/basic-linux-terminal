import React, { useState } from "react";
import Command from "./Command";
import TextOutput from "./TextOutput";
import { v4 as uuidv4 } from 'uuid';
import { execCdCommand, execCpCommand, execLsCommand, execMkdirCommand } from "../Helper";

const Terminal = ({serverName}) => {

    // const comms = ['pwd', 'ls', 'mkdir', 'mv', 'cp', 'cd']
    const [tree, setTree] = useState({"/": {}})
    
    
    const enterCommand = (command) => {
        let message = ''
        message = execCommand(command)
        const currentPath = window.localStorage.getItem('currentPath')
        setComps((comp)=>[...comp, <TextOutput text={message} key={uuidv4()}/>])
        setComps((comp)=>[...comp, <Command server={serverName+ ' ' + currentPath.slice(1,-1)} onEnter={enterCommand} key={uuidv4()}/>])
        
    }
    const [comps, setComps] = useState([<Command server={serverName+ ' ' + window.localStorage.getItem('currentPath').slice(1,-1)} onEnter={enterCommand} key={uuidv4()}/>])

    const execCommand = (command) => {
        command = command.trimEnd()
        const currentPath = window.localStorage.getItem('currentPath')
        switch(command.split(' ')[0]){
            case 'mkdir':
                return execMkdirCommand(command,tree,currentPath,setTree);
            case 'ls':
                return execLsCommand(command,tree,currentPath);
            case 'cd':
                return execCdCommand(command,currentPath,tree)
            case 'pwd':
                return currentPath;
            case 'cp':
                return execCpCommand(command, tree, currentPath)
            default:
                return 'command not found!';
        }
    };


    return (
        <div className="terminal" id="terminal">
            {comps}
        </div>
    )
}

export default Terminal;