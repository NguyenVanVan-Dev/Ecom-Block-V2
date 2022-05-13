import { createContext, useContext, useEffect, useState} from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { loadContract } from "../../Utilities/load-contracts";
import ABI from  "../ABIold.json";
import ABI_V2 from  "../ABI_V2.json"; // address Ropsten Ethscan 0x237Fc62f28a9b28Fc9c33baC7fC6c9424E143f9C
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
          const ManagerOgani = loadContract("ManagerOgani", provider);
          const abiSMContract=  (await ManagerOgani).Artifact.abi //localhost ganache 
          const addressSMContract = (await ManagerOgani).deployedContract.address;  //localhost ganache 
          const web3 = new Web3(provider);
          const providerInfura = new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws/v3/ce71593d5f1e4f4c939d498531303136');
          const web3Infura = new Web3(providerInfura);
          const ManagerOganiInfura = new web3Infura.eth.Contract(ABI_V2,'0x4bE6Da0e943adc8397B923A3562a0bfDf850909A')
          ManagerOganiInfura.events.transferSupplierSuccess({filter: {}, fromBlock: 'latest'}, (error, data) =>{
              if(error) {
                console.log(error);
              } else {
                console.log(data);
              }
          })
          if (provider) {
            // setWeb3Api({
            //   web3: web3,
            //   provider,
            //   contract: new web3.eth.Contract(ABI, '0x9ED09DA23dB437ebc515E05CE40661c5A6b7E371') // production V1
            // })
            // setWeb3Api({
            //   web3: web3,
            //   provider,
            //   contract: new web3.eth.Contract(abiSMContract, addressSMContract) // localhost
            // })
            setWeb3Api({
              web3: web3,
              provider,
              contract: new web3.eth.Contract(ABI_V2, '0x4bE6Da0e943adc8397B923A3562a0bfDf850909A') // production V2 
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

