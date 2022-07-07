
import './App.css';

import Table from "../Table/Table";
import Timer from "../Timer/Timer";


const App = () => {
    
    return (
        <div id="game">
            <Table />
            <div id="out-zone">
                <Timer />
            </div>
        </div>
    );
}

export default App;