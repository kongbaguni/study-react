import { Link } from "react-router-dom"

function Navigation(props) {
    return (
        <nav>
            <ul>
                {props.datas.map((data) => 
                <li key={data.id}><Link to={data.url}>{data.title}</Link></li>
                )}
                
            </ul>
        </nav>
    )
}

export default Navigation