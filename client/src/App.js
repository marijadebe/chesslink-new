import './css/App.css';
import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from "./main/Main";
import Register from "./auth/Register";
import Verify from "./auth/Verify";
import Login from "./auth/Login";
import ProtectedRoute from './auth/ProtectedRoute';
import SinglePlayer from './singleplayer/SinglePlayer';
import Account from './account/Account.js';
import Messages from './messages/Messages.js';
import Error from "./Error";
import ModeContext from './ModeContext';
import {ThemeProvider, createTheme, CssBaseline, responsiveFontSizes} from "@mui/material";
import { SnackbarProvider } from 'notistack';
import Multiplayer from './multiplayer/Multiplayer';

function RoutesComponent() {
  return(
    <Routes>
      <Route className="routegrade" path="/signin" element={<Login />} />
      <Route className="routegrade" path="/signup" element={<Register />} />
      <Route className="routegrade" path="/verify" element={<ProtectedRoute requiresValid={false} component={<Verify />} />} />
      <Route className="routegrade" path="/singleplayer" element={<ProtectedRoute requiresValid={true} component={<SinglePlayer />} />} />
      <Route className="routegrade" path="/multiplayer/:id" element={<ProtectedRoute requiresValid={true} component={<Multiplayer />} />} />
      <Route className="routegrade" path="/users/:name" element={<ProtectedRoute requiresValid={true} component={<Account />} />} />
      <Route className="routegrade" path="/messages/:name" element={<ProtectedRoute requiresValid={true} component={<Messages />} />} />
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
        <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Router>
          <RoutesComponent/>  
        </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </ModeContext.Provider>
    </div>
  );
}

export default App;
