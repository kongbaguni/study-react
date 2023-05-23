import { useState } from "react";

function RangePicker(props) {

    const [value, setValue] = useState(props.default);

    const onChangeValue = (event)=> {
        setValue(event.target.value);
        props.callback(event.target.value);
    }

    return (
        <div> {props.title} : <input type="range" value={value} min={props.min} max={props.max} onChange={onChangeValue}/> { value } {props.unit} </div>
    )
}

export default RangePicker