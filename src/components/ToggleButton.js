import { useState } from "react"

function ToggleButton(props) {
    const [isOn,setIsOn] = useState(props.default);

    const btnHandler = (event) => {
        setIsOn(!isOn);
        props.callback(isOn);
    }

    return (
        <button onClick={btnHandler} > { isOn ? props.on : props.off} </button>
    )
}

export default ToggleButton;