function Checkbox (props) {
    const onChangeValueHandler = (event) => {
        console.log(event.target.checked);
        props.callback(event.target.checked);
    }
    
    return (
        <> {props.title} : <input type="checkbox" onChange={onChangeValueHandler} />
        </>
    )
}

export default Checkbox;