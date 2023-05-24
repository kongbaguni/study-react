import { useEffect, useState } from "react"

function VidoePreview(props) {
    const [idx, setIdx] = useState(0);
    useEffect(()=> {
        const interval = setInterval(()=> {
            let newIdx = idx + 1;
            if(newIdx >= props.data.length) {
                newIdx = 0;
            }
            setIdx(newIdx);

        }, 1000 / 60);
        return(()=> {
            clearInterval(interval)
        })
    })
    return (
        <>
        <img src={props.data[idx]} alt="preview" width={props.width} height={props.height}></img>
        </>
    )
}

export default VidoePreview