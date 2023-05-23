import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from './Test';
import KCanvasView from './components/KCanvasView';
import People from './People';
import Navigation from './Navigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
const naviData = [
{
  id:1,
  title:"chat1",
  url:"url1"
},
{
  id:2,
  title:"chat2",
  url:"url2"
},
{
  id:3,
  title:"chat3",
  url:"url3"
},
{
  id:4,
  title:"chat4",
  url:"url4"
},

]
root.render(
  <React.StrictMode>
    <Navigation datas = {naviData} />
    <App />
    <Test />
    <KCanvasView width="300" height="200" canvasid="canvas1" />
    <KCanvasView width="300" height="500" canvasid="canvas2" />
    <People data={{
      name:"홍길동",
      birthday:{
        year:1972,
        month:4,
        day:23,
      },
    }} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
