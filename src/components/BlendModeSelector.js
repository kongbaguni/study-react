import { useEffect, useState } from "react";

function BlendModeSelector(props) {
    const modes = [
        "source-over",
        "multiply",
        "source-atop",
        "source-in",
        "source-out",
        "destination-over",
        "destination-atop", 
        "destination-in",
        "destination-out", 
        "lighter", 
        "hardlight",
        "copy", 
        "xor"
    ];
    const [currentmode, setCurrentMode] = useState(modes[0]);

    const onChange = (mode) => {
        setCurrentMode(mode);
        props.callback(mode);
    }
    
    return (
        <div className="blend">blend&nbsp;:&nbsp;
            {
                modes.map((mode)=>
                    <button key={mode} className = {mode == currentmode ? 'on' : 'off'} onClick={(e) => onChange(mode)}>{mode}</button>
                )
            }
        </div>
    )
}

export default BlendModeSelector;