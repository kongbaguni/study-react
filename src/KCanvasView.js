import { useEffect, useState } from "react";
import BlendModeSelector from "./components/BlendModeSelector";
import BlurController from "./components/BlurController";
import ColorPicker from "./components/ColorPicker";

function KCanvasView(props) {
    const [units, setUnits] = useState([]);
    const [unitCount, setUnitCount] = useState(0); 
    const [stateInterval, setStateInterval] = useState(null);
 
    let drawCount = 0;
    useEffect(()=> {
       draw();
       if(stateInterval == null) {
        const int = setInterval(()=> {
            draw();
           },10);
        setStateInterval(int);
       }
    })

    const addUnits = () => {
        const arr = units;
    
        const unitTempletes = [
            {
                center: {x:40,y:40},
                range : 20,
                color:"#ff00ff",
                movement : {x:0.5, y : 0.1}
            },
            {
                center: {x:50,y:50},
                range : 30,
                color:"#369",
                movement : {x:0.5, y : -0.4}
            },
            {
                center: {x:30,y:20},
                range : 10,
                color:"#ffa",
                movement : {x:0.1, y : 0.3}
            },
            {
                center: {x:30,y:30},
                range : 15,
                color:"#98f",
                movement : {x:0.4, y : -0.3}
            },
        ]
        arr.push(unitTempletes[units.length%unitTempletes.length]);
        setUnits(arr);
        setUnitCount(units.length);
    }

    const clearUnits = () => {
        while (units.length > 0) {
            units.pop();
        }
        setUnitCount(units.length);
    }

    const draw = () => {
        drawCount ++;
        const colors = [
            "#369", "#693", "#936", "#963", "#f00", "#0f0", "#00f", "#ff0", "#f0f", "#0ff"
        ]
        const canvas = document.getElementById(props.canvasid);
        
        function getNextColor(now) {
            const nextColor = colors[drawCount % colors.length];
            if(nextColor == now) {
                drawCount ++;
                return getNextColor(now)
            }
            return nextColor
        }

        if(canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0,0,props.width,props.height);
            for(var i = 0; i < units.length; i++) {
                const u = units[i];
                ctx.fillStyle = u.color;
                ctx.beginPath();
                ctx.arc(u.center.x, u.center.y, u.range, 0, 2 * Math.PI)
                ctx.fill();
                u.center.x += u.movement.x;
                u.center.y += u.movement.y;

                if(u.center.y + u.range + u.movement.y >= props.height || u.center.y < u.range - u.movement.y) {
                    u.movement.y *= -1;
                    u.color = getNextColor(u.color);
                }
                if(u.center.x + u.range + u.movement.x >= props.width || u.center.x < u.range - u.movement.x) {
                    u.movement.x *= -1;
                    u.color = getNextColor(u.color);
                }           
            }
        }
    }

    let status='shipping'
    let tapUI = {
        info:<p>상품정보</p>,
        shipping:<p>배송관련</p>,
        refound:<p>환불관련</p>
    }
    

    return (
        <article>
            <BlendModeSelector callback = {(value)=> {
                console.log("new blend : " + value);
                const canvas = document.getElementById(props.canvasid);
                const ctx = canvas.getContext('2d');
                ctx.globalCompositeOperation = value;               
            }} />

            <BlurController min={0} max={20} default={0} callback = {(value)=> {
                const canvas = document.getElementById(props.canvasid);
                const ctx = canvas.getContext('2d');
                const blurtxt = 'blur('+value+'px)';
                console.log(blurtxt);
                ctx.filter = blurtxt; 
            }} />  

            <ColorPicker title = "background" color = {"#ffffff"} callback = {(color) => {
                const canvas = document.getElementById(props.canvasid);
                canvas.style.backgroundColor = color;
                console.log(color);
            }} />
            <canvas width={props.width} height={props.height} id={props.canvasid}></canvas>
            <p>
            <button onClick={addUnits}>addUnit</button>
            <button onClick={clearUnits}>clearUnits</button>
            </p>
            {unitCount <= 10 ? "10개 이하":"10개 초과"}
            
            <p>아이템 개수 : {[unitCount]}개</p>
            {tapUI[status]}
        </article>
    )
}


export default KCanvasView;