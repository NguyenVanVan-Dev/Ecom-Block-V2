import { createContext, useContext, useState} from "react";

const MetaMarkContext = createContext();
const  MetaMarkProvider =  ({children}) => {
    const [metaMark, setConnectMetaMark] = useState({
        wallet: '',
        isConnected: false
    });
    return (
        <MetaMarkContext.Provider value={{metaMark, setConnectMetaMark}}>
         {children}
        </MetaMarkContext.Provider>
    )
};

const useMetaMark = () => {
    return  useContext(MetaMarkContext);
};
export default MetaMarkProvider;
export {useMetaMark};