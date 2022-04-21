import { createContext, useContext, useEffect, useState} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../Utilities/load-contracts";
import ABI from  "../ABI.json";
const Web3Context = createContext();
const  Web3Provider =  ({children}) => {
   
    const [web3Api, setWeb3Api] = useState({
        provider: null,
        web3: null,
        contract: null,
    });
    useEffect(() => {
        const loadProvider = async () => {
          const provider = await detectEthereumProvider();
          // const contract = await loadContract("ManagerOgani", provider)
          const web3 = new Web3(provider);
          if (provider) {
            setWeb3Api({
              web3: web3,
              provider,
              contract: new web3.eth.Contract(ABI, '0x9ED09DA23dB437ebc515E05CE40661c5A6b7E371')
            })
          } else {
            console.error("please, Install Metamask")
          }
        }
        loadProvider()
      }, []);
    return (
        <Web3Context.Provider value={web3Api}>
         {children}
        </Web3Context.Provider>
    )
};

const useWeb3 = () => {
    return  useContext(Web3Context);
};
export default Web3Provider;
export {useWeb3};

