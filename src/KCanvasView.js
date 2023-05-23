import { useEffect, useState } from "react";
import BlendModeSelector from "./components/BlendModeSelector";
import RangePicker from "./components/RangePicker";
import ColorPicker from "./components/ColorPicker";

function KCanvasView(props) {
    const [units, setUnits] = useState([]);
    const [unitCount, setUnitCount] = useState(0); 
    const [speed, setSpeed] = useState(1.0);
    const [blendMode, setBlendMode] = useState('sorce-over');
    const [filterValues, setFilterValues] = useState({
        blur        : 'blur(0px)', 
        contrast    : 'contrast(100%)', 
        invert      : 'invert(0%)', 
        saturate    : 'saturate(100%)',
        sepia       : 'sepia(0%)',
    })

    const getFilterTxt = () => {
        return filterValues.blur + ' ' + filterValues.contrast + ' ' + filterValues.invert + ' ' + filterValues.saturate + ' ' + filterValues.sepia;
    }

    let drawCount = 0;
    useEffect(()=> {
       draw();
        const int = setInterval(()=> {
            draw();
        },1000 / 60);  
        return () => {
            clearInterval(int);
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
            ctx.globalCompositeOperation = blendMode;
            ctx.filter = getFilterTxt();
            for(var i = 0; i < units.length; i++) {
                const u = units[i];
                ctx.fillStyle = u.color;
                ctx.beginPath();
                ctx.arc(u.center.x, u.center.y, u.range, 0, 2 * Math.PI)
                ctx.fill();
                u.center.x += u.movement.x * speed;
                u.center.y += u.movement.y * speed;

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
                setBlendMode(value);
            }} />
            <RangePicker title="spped" min={1} max={20} default={1} unit = "배속" callback = {(value)=> {
                setSpeed(value);
            }} />
            <RangePicker title="blur" min={0} max={20} default={0} unit = "px" callback = {(value)=> {
                const blurtxt = 'blur('+value+'px)';
                filterValues.blur =  blurtxt;
            }} />  

            <RangePicker title="contrast" min={0} max={100} default={100} unit = "%" callback = {(value)=> {
                const txt = 'contrast('+value+'%)';
                filterValues.contrast = txt;
            }} />

            <RangePicker title="invert" min={0} max={100} default={0} unit = "%" callback = {(value)=> {
               const txt = 'invert('+value+'%)';
               filterValues.invert = txt;
            }} />

            <RangePicker title="saturate" min={0} max={100} default={100} unit = "%" callback = {(value)=> {
                const txt = 'saturate('+value+'%)';
                filterValues.saturate = txt;
            }} />

            <RangePicker title="sepia" min={0} max={100} default={0} unit = "%" callback = {(value)=> {
                const txt = 'sepia('+value+'%)';
                filterValues.sepia = txt;
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