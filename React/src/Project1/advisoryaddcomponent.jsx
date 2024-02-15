import React, { useReducer, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
 Autocomplete,
 Card,
 CardContent,
 Button,
 TextField,
 Typography
} from "@mui/material";
import logo from './travel.png';
import theme from "../theme";
import "../App.css";

const AdvisoryAddComponent = (props) => {

    const sendParentSomeData = (msg) => {
		props.dataFromChild(msg);
	};

    const initialState = {
        name: "",
        country:"",
        countries:[],
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {

            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query { alerts{name} }" }),
            });

            let json = await response.json();

            setState({
                countries: json.data.alerts.map((a) => a.name),
            });
            sendParentSomeData(`Found ${json.data.alerts.length} countries!`);
        } catch (error) {
            console.log(error);
            
        }
    };

    const onAddClicked = async () => {
        let advisory = {
            name: state.name,
            country: state.country,
    };
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
        let query = JSON.stringify({
        query: `mutation {
                    addadv(name: "${advisory.name}", country: "${advisory.country}") {name,country,date}
                }`,
        });
        //console.log(query);
        let response = await fetch("/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: query,
        });
        let json = await response.json();
        setState({
            name:"",
            country:"",

        });
        sendParentSomeData(`Added advisory on ${json.data.addadv.date}!`);
    } catch (error) {
        console.log(error);
    }
    };

    const handleNameInput = (e) => {
        setState({ name: e.target.value });
    };

    const onChange = (e, selectedOption) => {
       setState({ country: selectedOption });
    };

    const emptyorundefined =
        state.name === undefined ||
        state.name === "" ||
        state.country === undefined ||
        state.country === "";

    return (
        <ThemeProvider theme={theme}>
            <Card className="card">
                <CardContent>
                    <div 
                        style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'}}
                    >
                        <img src={logo} width='50%' height='50%' />
                    </div>
                </CardContent>
                <CardContent >
                    <Typography variant="h6" color="primary"
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        World Wide Travel Alerts
                    </Typography>
                    <TextField
                        onChange={handleNameInput}
                        placeholder="Traveler's name"
                        value={state.name}
                    />
                    <p></p>
                     <Autocomplete
                        id="countries"
                        value={state.country}
                        options={state.countries}
                        getOptionLabel={(option) => option}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        style={{ width: 300 }}
                        onChange={onChange}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Available countries"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <Button
                        color="primary"
						variant="contained"
                        style={{ marginTop: 10 }}
                        onClick={onAddClicked}
                        disabled={emptyorundefined}
                    >
                        ADD ADVISORY
                    </Button>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default AdvisoryAddComponent;
