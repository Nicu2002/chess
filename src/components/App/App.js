import './App.css';

import Table from "../Table/Table";
import Timer from "../Timer/Timer";
import OutZone from '../OutZone/OutZone';

const App = () => {

    return (
        <div id="game">
            <Table/>
            <div id="out-zone">
                <OutZone/>
                {/* <Timer /> */}
            </div>
        </div>
    );
}

export default App;