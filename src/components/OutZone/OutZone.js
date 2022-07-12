import { v4 as uuid} from 'uuid';

import { useSelector } from "react-redux";
import { addFigureInZone } from "./outZoneSlice";
import Timer from '../Timer/Timer';

const OutZone = () => {
    const { white, black } = useSelector(state => state.outZone);

    const renderFigures = (arr) => {
        const items = arr.map(item => {
            return <div key={uuid()} style={{fontSize: "50px"}}>{item}</div>;
        })
        return items;
    }

    const whiteFigures = renderFigures(white);
    const blackFigures = renderFigures(black);

    return (
        <div id="loses-figures" style={{position: "relative", height: "100vh", marginLeft: "5vw"}}>
            <div style={{height: "200px", position: "absolute", top: "10vh", display: "flex"}}>{whiteFigures}</div>
            <div style={{height: "200px", position: "absolute", bottom: "10vh", display: "flex"}}>{blackFigures}</div>
            <Timer/>
        </div>
    );
}

export default OutZone;