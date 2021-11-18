import { createContext } from "react";

const ModeContext = createContext({
    colorMode: 'dark',
    setColorMode: ()=>{}
});

export default ModeContext;