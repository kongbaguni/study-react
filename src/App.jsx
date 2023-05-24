import { Route, Routes } from "react-router";
import Home from "./Home";
import Canvas from "./Canvas";
import Navigation from "./components/Navigation";
import Comments from "./Comments";
const navidata = [
    {
        id:0,
        url:"/",
        title:"home",
        component : Home,
    },
    {
        id:1,
        url:"/canvas",
        title:"canvas",
        component : Canvas,
    },
    {
        id:2,
        url:"/comments",
        title:"comments",
        component : Comments,
    },
]

function App() {
    return <div>
        <Navigation datas={navidata}/>
        <Routes >
            {
                navidata.map((data)=> 
                    <Route path={data.url} Component={data.component}/>
                )
            }
        </Routes>
    </div>
};
export default App;