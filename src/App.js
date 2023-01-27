
import './App.css';
import Footer from './components/Footer';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default function App ()  {
  const [progress, setProgress] = useState(0)
  
  const apikey = "b472c5971df241cbb9056f9e144edfac"
  
    return (
      <div>
        <Navbar/>
        <LoadingBar color='red' progress={progress} height={3}/>
         <Routes>
          <Route exact  path="/" element={<News setProgress={setProgress} apiKey={apikey} key="general" pageSize="5" country="in" category="general"/>}/>
          <Route exact  path="/business" element={<News setProgress={setProgress} apiKey={apikey} key="business" pageSize="5" country="in" category="business"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apikey} key="entertainment" pageSize="5" country="in" category="entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apikey} key="healTh" pageSize="5" country="in" category="health"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apikey} key="science" pageSize="5" country="in" category="science"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apikey} key="sports"pageSize="5" country="in" category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apikey} key="technology" pageSize="5" country="in" category="technology"/>}/>
        </Routes>
      </div>
    )
  
}

