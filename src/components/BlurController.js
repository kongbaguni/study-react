import { useState } from "react";

function BlurController(props) {

    const [value, setValue] = useState(props.default);

    const onChangeValue = (event)=> {
        setValue(event.target.value);
        props.callback(event.target.value);
    }

    return (
        <div> Blur : <input type="range" value={value} min={props.min} max={props.max} onChange={onChangeValue}/> { value } px </div>
    )
}

export default BlurController