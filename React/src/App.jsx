import React, { useReducer } from "react";
// import SocketClient from "./week10/socketclient";
// import AllRooms from "./Week10/allrooms";
// import Lab15ClientComponent from "./Week10/lab15client"
// import StreetClientComponent from "./Week11/street";
// import Scenario1Test from "./Week12/scenario1test";
// import Scenario1And2Test from "./Week12/scenario1and2test";
// import Scenario123Test from "./Week12/scenario123test";
// import Scenario1234Test from "./Week12/scenario1234test";
// import ScenariosEnhanced from "./Week12/scenariosenhanced";
// import Week13Exercise1 from "../Week13/week13exercise";
// import Week13Exercise2 from "../Week13/week13exercise2";
// import Week13Exercise3 from "../Week13/week13exercise3";
import Project2Component from "./Project2/project2component";

function App() {

    const initialState = {
        roomMsg: "",
    };
    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    const msgFromChild = (msg) => {
        setState({ roomMsg: msg });
    };
    
    return (
        <Project2Component />
    );
}

export default App;
