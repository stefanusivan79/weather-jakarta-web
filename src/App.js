import React from 'react';
import './App.css';
import Header from "./components/Header";
import Weathers from "./containers/Weathers";

function App() {
    return (
        <div>
            <Header/>
            <Weathers/>
        </div>
    );
}

export default App;
