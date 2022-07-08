import { useSelector, useDispatch } from "react-redux";
import { addFigureInZone } from "./outZoneSlice";

const OutZone = (props) => {

    const { whiteZone, blackZone } = useSelector(state => state.outZone);
    const dispatch = useDispatch();

    const renderFigures = (arr) => {
        const items = arr.map(item => {
            return `<div>${item}</div>`;
        })
    }

    const whiteFigures = renderFigures(whiteZone);
    const blackFigures = renderFigures(blackZone);

    return (
        <div id="loses-figures">
            <div>{whiteFigures}</div>
            <div>{blackFigures}</div>
        </div>
    );
}

export default OutZone;