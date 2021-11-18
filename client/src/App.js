import './css/App.css';
import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./main/Main";
import Register from "./auth/Register";
import Verify from "./auth/Verify";
import Login from "./auth/Login";
import ProtectedRoute from './auth/ProtectedRoute';
import Error from "./Error";
import ModeContext from './ModeContext';
import {ThemeProvider, createTheme, CssBaseline, responsiveFontSizes} from "@mui/material";

function RoutesComponent() {
  return(
    <Routes>
      <Route className="routegrade" path="/signin" element={<Login />} />
      <Route className="routegrade" path="/signup" element={<Register />} />
      <Route className="routegrade" path="/verify" element={<ProtectedRoute requiresValid={false} component={<Verify />} />} />
      <Route className="routegrade" path="/" element={<ProtectedRoute requiresValid={true} component={<Main />} />} />
      <Route className="routegrade" path="*" element={<Error type="404" />} />
    </Routes>
  )
}

function App() {
  const [mode, setMode] = useState('dark');
  var changeMode = (value) => {
    setMode(value);
  }
  var darkTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  darkTheme = responsiveFontSizes(darkTheme);

  return (
    <div className="App">
    <ModeContext.Provider value={{colorMode:mode,setColorMode:changeMode}}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Router>
          <RoutesComponent/>  
        </Router>
      </ThemeProvider>
    </ModeContext.Provider>
    </div>
  );
}

export default App;
