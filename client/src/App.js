import './css/App.css';
import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./main/Main";
import Register from "./auth/Register";
import Verify from "./auth/Verify";
import Login from "./auth/Login";
import ProtectedRoute from './auth/ProtectedRoute';
import Error from "./Error";
import {ThemeProvider, createTheme, CssBaseline} from "@mui/material";

function RoutesComponent() {
  return(
    <Routes>
      <Route className="routegrade" path="/signin" element={<Login />} />
      <Route className="routegrade" path="/signup" element={<Register />} />
      <Route className="routegrade" path="/verify" element={<Verify />} />
      <Route className="routegrade" path="/" element={<ProtectedRoute component={<Main />} />} />
      <Route className="routegrade" path="*" element={<Error type="404" />} />
    </Routes>
  )
}

function App() {
  return (
    <div className="App">
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <RoutesComponent/>  
      </Router>
    </ThemeProvider>
    </div>
  );
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default App;
