import React, {useReducer, useEffect} from "react";
import { useQuery } from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import {
	Card,
	CardContent,
	Typography,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import "../App.css";
import logo from './travel.png';
import theme from "../theme";
import "../App.css";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

const AlertComponent = (props) => {

    const sendParentSomeData = (msg) => {
		props.dataFromChild(msg);
	};

    useEffect(() => {
        useQuery;
        sendParentSomeData("Running setup...");
    }, []);

    const initialState = {
        resArr: [],
    };

    const reducer = (state, newState) => ({ ...state, ...newState });
    const [state, setState] = useReducer(reducer, initialState);
    
    const { isLoading, isFetched, error, data } = useQuery("querykeyname", async () => {
		let response = await fetch("/graphql", {
			method: "POST",
			headers: {
				"Content-Type": "application/json; charset=utf-8",
			},
			body: JSON.stringify({ query: "query { project1_setup {results} }" }),
		});
        let json = await response.json();;
        let resultss = json.data.project1_setup.results.replace(/([.])\s*(?=[A-Z])/g, "$1|").split("|");
		setState({resArr: resultss});
        sendParentSomeData("ALERTS COLLECTION SETUP COMPLETED!");
	});

	return (
		<ThemeProvider theme={theme}>
			<Card className="card" style={{ border: "outset", textAlign: "center"}}>
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
                    <div
                        style={{
                            fontSize: "large",
                            textAlign: "center",
                            fontFamily: "verdana",
                            color: "#text",
                            padding: "10vw",
                        }}
                    >
                        Alert Setup - Details
                    </div>
                </CardContent>
				<CardContent>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {state.resArr.map((result) => (
                                    <TableRow key={result}>
                                        <TableCell sx={{ fontSize: "small", fontWeight: "bold", color: "red"}}>
                                            {result}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
				</CardContent>
                <br />
                    <Typography
                        color="primary"
                        style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
                    >
                        &copy;INFO3139 - 2023
                    </Typography>
			</Card>
            
		</ThemeProvider>
	);
};

export default AlertComponent;
