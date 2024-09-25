import React from "react";

const TextOutput = ({text, key}) =>{
    return (
        <div style={{color: "white"}} key={key} id={key}>
            {text}
        </div>
    )
}

export default TextOutput