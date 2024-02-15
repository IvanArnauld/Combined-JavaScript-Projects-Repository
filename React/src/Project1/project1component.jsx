import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    Card,
    CardContent,
    Typography,
} from "@mui/material";
import logo from './travel.png';
import theme from "./theme";
import "../App.css";

const Project1HookComponent = () => {
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
                    <Typography
                        color="primary"
                        style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
                    >
                        &copy;INFO3139 - 2023
                    </Typography>
                </CardContent>
            </Card>
        </ThemeProvider>
    );
};

export default Project1HookComponent;