import './App.css';

import Table from "../Table/Table";
import Timer from "../Timer/Timer";
import OutZone from '../OutZone/OutZone';

const App = () => {

    return (
        <div id="game">
            <Table/>
            <OutZone/>
        </div>
    );
}

export default App;