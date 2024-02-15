import React, {useReducer, useEffect} from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Autocomplete,
    FormControl,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
    Card,
    CardContent,
    Typography,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    TableHead,
} from "@mui/material";
import logo from './travel.png';
import theme from "../theme";
import "../App.css";



const AdvisoryListComponent = (props) => {

    const sendParentSomeData = (msg) => {
		props.dataFromChild(msg);
	};

    const initialState = {
        selected: "travelers",
        dropdownChoice: "",
        results: [],
        alerts: [],
        names: [],
        toDisplay: [],
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            let len = 0;
            let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query { advisories{name,country,text,date} }" }),
            });

            let responseTwo = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify({ query: "query { alerts{country,name,text,date,region,subregion} }" }),
            });

            let json = await response.json();
            let jsonTwo = await responseTwo.json();
            len = json.data.advisories.length;
            setState({
                results: json.data.advisories,
                alerts: jsonTwo.data.alerts,
                names: json.data.advisories.map((a) => a.name).filter((value, index, self) => self.indexOf(value) === index),
            });
            sendParentSomeData(`Found ${len} advisories!`);
        } catch (error) {
            console.log(error);
            
        }
    };

    const fetchData = async (value) => {
        try {
            let len = 0;
            if(state.selected === "travelers")
            {

                let query = "query ($name: String) {advisoriesforuser(name: $name) {name, country, text, date}}";
                let json = await fetchServer(query,{"name": value});
                len = json.data.advisoriesforuser.length;
                setState({
                    toDisplay: json.data.advisoriesforuser,
                });
            }
            else if (state.selected === "regions")
            {
                let query = "query ($region: String) {advisoriesforregion(region: $region) {name, country, text, date}}";
                let json = await fetchServer(query,{"region": value});
                len = json.data.advisoriesforregion.length;
                setState({
                    toDisplay: json.data.advisoriesforregion,
                });
            }
            else if (state.selected === "subregions")
            {
                let query = "query ($subregion: String) {advisoriesforsubregion(subregion: $subregion) {name, country, text, date}}";
                let json = await fetchServer(query,{"subregion": value});
                len = json.data.advisoriesforsubregion.length;
                setState({
                    toDisplay: json.data.advisoriesforsubregion,
                });
            }
            if (value !== null) {
                sendParentSomeData(`Found ${len} alerts for ${value}!`);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    };

    const fetchNames = async(value) => {
        try {
            let len = 0;
            if(value === "travelers")
            {

                let query = "query { advisories{name,country,text,date} }";
                let json = await fetchServer(query);
                len = json.data.advisories.map((a) => a.name).filter((value, index, self) => self.indexOf(value) === index).length;
                setState({
                    names: json.data.advisories.map((a) => a.name).filter((value, index, self) => self.indexOf(value) === index),
                });
            }
            else if(value === "regions"){
                let query = "query { regions }";
                let json = await fetchServer(query);
                len = json.data.regions.length;
                setState({
                    names: json.data.regions.filter(element => element !== ""),
                });
            }
            else if(value === "subregions"){
                let query = "query { subregions }";
                let json = await fetchServer(query);
                len = json.data.subregions.length;
                setState({
                    names: json.data.subregions.filter(element => element !== ""),
                });
            }
            if (value !== null) {
                sendParentSomeData(`Found ${len} ${value}!`);
            }
        } catch (error) {
            console.log(error);
            
        }
    };

    const fetchServer = async (query, variable) => {
        let response = await fetch("/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: variable===null? JSON.stringify({ query }):JSON.stringify({ query, variables: variable }),
            });
        return response.json();
    }

    const handleInput = (e) => {
        setState({ selected: e.target.value });
        fetchNames(e.target.value);
    };

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
                         <br />
                    <FormControl>
                        <FormLabel id="radio-buttons-group-label">List Advisories By:</FormLabel>
                        <RadioGroup
                            row
                            value={state.selected}
                            name="radio-buttons-group"
                            onChange={handleInput}
                        >
                            <FormControlLabel value="travelers" control={<Radio />} label="Traveler" />
                            <FormControlLabel value="regions" control={<Radio />} label="Region" />
                            <FormControlLabel value="subregions" control={<Radio />} label="Sub-Region" />
                        </RadioGroup>
                    </FormControl>
                    <Autocomplete
                        id="advisories"
                        value={state.dropdownChoice}
                        options={state.names}
                        getOptionLabel={(option) => option}
                        onChange={(event, value) => fetchData(value)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={state.selected}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <TableContainer >
                        <Table>
                            <TableHead sx={{ bgcolor: "yellow" }}>
                                <TableRow>
                                    <TableCell align="left"><Typography fontWeight={"bold"} color={"primary"}>Country</Typography></TableCell>
                                    <TableCell align="left"><Typography fontWeight={"bold"} color={"primary"}>Alert Information</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {state.toDisplay.map((result) => (
                                    <TableRow key={result.country+result.name+result.date}>
                                        <TableCell sx={{ fontSize: "small", fontWeight: "bold", color: "red"}}>
                                            {result.country}
                                        </TableCell>
                                        <TableCell sx={{ fontSize: "x-small", fontWeight: "bold", color: "red"}}>
                                            {result.text + ". " + result.date}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default AdvisoryListComponent;