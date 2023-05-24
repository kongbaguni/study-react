import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"

function Navigation(props) {
    const [url,setUrl] = useState(null);

    useEffect(()=> {
        setUrl(window.location.pathname);
        console.log(url);
        return (()=> {
            console.log(url);  
        })
    })
    return (
        <nav>
            <ul>
                {props.datas.map((data) => 
                <li key={data.id}><NavLink to={data.url}>{data.title}</NavLink></li>
                )}
                
            </ul>
        </nav>
    )
}

export default Navigation