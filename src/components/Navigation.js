function Navigation(props) {
    return (
        <nav>
            <ul>
                {props.datas.map((data) => 
                <li key={data.id}><a href={data.url}>{data.title}</a></li>
                )}
                
            </ul>
        </nav>
    )
}

export default Navigation