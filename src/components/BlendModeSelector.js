import { useEffect, useState } from "react";

function BlendModeSelector(props) {
    const modes = [
        "source-over",
        "multiply",
        // "source-atop",
        // "source-in",
        // "source-out",
        // "destination-over",
        // "destination-atop", 
        // "destination-in",
        // "destination-out", 
        "lighter", 
        // "copy", 
        "xor"
    ];
    
    const [currentmode, setCurrentMode] = useState(modes[0]);

    const onChangeValue = (mode) => {
        setCurrentMode(mode);
        props.callback(mode);
    }
    
    return (
        <div className="blend">blend&nbsp;:&nbsp;
            {
                modes.map((mode)=>
                    <button key={mode} className = {mode == currentmode ? 'on' : 'off'} onClick={(e) => onChangeValue(mode)}>{mode}</button>
                )
            }
        </div>
    )
}

export default BlendModeSelector;