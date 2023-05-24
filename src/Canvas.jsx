import KCanvasView from "./components/KCanvasView";

function Canvas() {
    return (
    <>
    <article>
        <header><h2>Home</h2></header>
        <KCanvasView width={300} height={300} canvasid = "canvas1"/>
    </article>
    </>
    )
}

export default Canvas;