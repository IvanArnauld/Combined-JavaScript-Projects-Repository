// import React, { useReducer } from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import { 
//     Snackbar,
//     Toolbar,
//     Card,
//     AppBar,
//     CardHeader,
//     CardContent,
//     Typography,
//     Icon,
// } from "@mui/material";
// import AlertComponent from "./alertcomponent";
// import logo from './travel.png';
// import theme from "../theme";
// import "../App.css";
// import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient();

// const ResetComponent = (props) => {

//     const msgFromChild = (msg) => {
//         props.dataFromChild(msg);
//     };

//      return (
//         <ThemeProvider theme={theme}>
//             <Card className="card">
//                 {/* <CardContent>
//                     <div 
//                         style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'}}
//                     >
//                         <img src={logo} width='50%' height='50%' />
//                     </div>
//                 </CardContent>
//                 <CardContent >
//                     <Typography variant="h6" color="primary"
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         World Wide Travel Alerts
//                     </Typography>
//                     <div
//                         style={{
//                             fontSize: "large",
//                             textAlign: "center",
//                             fontFamily: "verdana",
//                             color: "#text",
//                             padding: "10vw",
//                         }}
//                     >
//                         Alert Setup - Details
//                     </div>
//                     <QueryClientProvider client={queryClient}>
//                         <AlertComponent
//                             dataFromChild={msgFromChild}
//                         />
//                     </QueryClientProvider>
//                     <br />
//                     <Typography
//                         color="primary"
//                         style={{ float: "right", paddingRight: "1vh", fontSize: "smaller" }}
//                     >
//                         &copy;INFO3139 - 2023
//                     </Typography>
//                 </CardContent> */}
//             </Card>
//         </ThemeProvider>
//     );
// };

// export default ResetComponent;
