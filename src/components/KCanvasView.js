import { useEffect, useState } from "react";
import BlendModeSelector from "./BlendModeSelector";
import RangePicker from "./RangePicker";
import ColorPicker from "./ColorPicker";
import ToggleButton from "./ToggleButton";
import Checkbox from "./CheckBox";

function KCanvasView(props) {
    const [units, setUnits] = useState([]);
    const [unitCount, setUnitCount] = useState(0); 
    const [speed, setSpeed] = useState(1.0);
    const [blendMode, setBlendMode] = useState('sorce-over');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [isPause, setIsPause] = useState(false);
    const [isControllerOpen, setIsControllerOpen] = useState(false);

    const [dropshadowOffsetX, setDropShadowOffsetX] = useState(0);
    const [dropShadowOffsetY, setDropShadowOffsetY] = useState(0);
    const [dropShadowColor, setDropShadowColor] = useState('#000000');
    const [dropShadowBlurRadius, setDropShadowBlurRadios] = useState(10);
    const [isApplyDropShadow, setIsApplyDropShadow] = useState(false);
    const [filterValues, setFilterValues] = useState({
        blur        : 'blur(0px)', 
        contrast    : 'contrast(100%)', 
        invert      : 'invert(0%)', 
        saturate    : 'saturate(100%)',
        sepia       : 'sepia(0%)',
        opacity     : 'opacity(100%)',
        huerotate   : 'hue-rotate(0deg)',
        brightness  : 'brightness(100%)' 
    })

    const getFilterTxt = () => {
        return filterValues.blur + ' ' 
        + filterValues.contrast + ' ' 
        + filterValues.invert + ' ' 
        + filterValues.saturate + ' ' 
        + filterValues.sepia + ' '
        + filterValues.opacity + ' '
        + filterValues.huerotate + ' '
        + filterValues.brightness + ' '
        ;
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
            ctx.filter = getFilterTxt() + (isApplyDropShadow ? 'drop-Shadow('+dropshadowOffsetX+'px '+dropShadowOffsetY+'px '+ dropShadowBlurRadius+'px '+dropShadowColor+' )' : '');
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(-100,-100,props.width+100,props.height+100);
            for(var i = 0; i < units.length; i++) {
                const u = units[i];
                ctx.fillStyle = u.color;
                ctx.beginPath();
                ctx.arc(u.center.x, u.center.y, u.range, 0, 2 * Math.PI)
                ctx.fill();
                u.center.x += u.movement.x * speed * (isPause ? 0 : 1);
                u.center.y += u.movement.y * speed * (isPause ? 0 : 1);

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
    const dropSadowPanner = (
        <>
            <ColorPicker title = "Drop Shadow" color = {dropShadowColor} callback = {(color) => {
                setDropShadowColor(color);
            }} />

            <RangePicker title = "Drop Shadow offset x" min={-30} max={30} unit="px" default={dropshadowOffsetX} callback = {(value) => {
                setDropShadowOffsetX(value);
            }} />

            <RangePicker title = "Drop Shadow offset y" min={-30} max={30} unit="px" default={dropShadowOffsetY} callback = {(value) => {
                setDropShadowOffsetY(value);
            }} />

            <RangePicker title = "Drop Shadow blur range " min={0} max={30} unit="px" default={dropShadowBlurRadius}  callback = {(value) => {
                setDropShadowBlurRadios(value);
            }} />

        </>
    )    
    const dropShadow = (<>
        <Checkbox title = "use drop shadow" callback = {(value)=> {
            setIsApplyDropShadow(value);
        }}/>

        {isApplyDropShadow ? dropSadowPanner : <></>}
    </>

    )

    const controller = (<>
            <ToggleButton on="pause" off="resume" default = "true" callback = {(isOn) => {
                console.log(isOn);
                setIsPause(isOn);
            }} />
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

            <RangePicker title='opacity' min={0} max={100} default={100} unit="%" callback = {(value)=> {
                const txt = 'opacity('+value+'%)';
                filterValues.opacity = txt;

            }} />

            <RangePicker title='hue-rotate' min={0} max={360} default={0} unit="deg" callback = {(value)=> {
                const txt = 'hue-rotate('+value+'deg)';
                filterValues.huerotate = txt;
            }} />

            <RangePicker title='brightness' min={0} max={100} default={100} unit="%" callback = {(value)=> {
                const txt = 'brightness('+value+'%)';
                filterValues.brightness = txt;
            }} />
            {
                dropShadow
            }

            <ColorPicker title = "background" color = {backgroundColor} callback = {(color) => {                
                console.log(color);
                setBackgroundColor(color)
            }} />

            <p>
            <button onClick={addUnits}>addUnit</button> <button onClick={clearUnits}>clearUnits</button>
            </p>

    </>
    );
    return (
        <article>
            <p>
            <ToggleButton on="open" off="close" default={isControllerOpen ? "true" : "false"} callback = {(isOn)=> {
                console.log("isOn : " + isOn + " : " + isControllerOpen);
                setIsControllerOpen(isOn);
            }} />
            </p>
            {isControllerOpen ? controller : <div></div>}
            
            <canvas width={props.width} height={props.height} id={props.canvasid}></canvas>
            <p>
            {unitCount <= 10 ? "10개 이하":"10개 초과"}
            </p>
            <p>아이템 개수 : {[unitCount]}개</p>
            {tapUI[status]}
        </article>
    )
}


export default KCanvasView;