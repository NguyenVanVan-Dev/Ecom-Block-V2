import React,{useEffect, useState} from 'react'
import {useWeb3} from "../../../../Providers";
import Notiflix from 'notiflix';
function ListTransaction() {
    const [transactions, setTransactions] = useState();
    const {web3, contract, provider} = useWeb3();
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const LoadTransaction = async () =>{
            await contract.methods.getAllTransaction().send({from:account})
            .then((data)=>{
                console.log(data);
                Notiflix.Notify.failure("This feature is currently not available");
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        contract && LoadTransaction();
    }, [account]);
    const  handelConnectMetamask = async () => {
        provider.request({ method: 'eth_requestAccounts' })
        .then((account)=>{
           setAccount(account[0]);
           setIsConnected(true);
        })
        .catch((error) => {
          if (error.code === 4001) {
            console.log('Please connect to MetaMask.');
          } else {
            console.error(error);
          }
        });
    }
    return (
        <div className="mx-4">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-12 table-responsive">
                            <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-2">Transaction History</h1>
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                    {/* <Link to={'/admin/list-product'} className="btn btn-primary ">List Product</Link> */}
                                    <button onClick={()=> handelConnectMetamask()} className="btn btn-primary btn-user">
                                        Connect Metamask
                                    </button>
                                </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr className='text-center'>
                                        <th scope="col">#</th>
                                        <th scope="col">Id Product</th>
                                        <th scope="col">Total Payment</th>
                                        <th scope="col">Wallet Supplier</th>
                                        <th scope="col">Wallet Admin</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    
                                    transactions && transactions.map((transaction,index)=>{
                                        
                                        return (<tr key={index} id={transaction._id} className='text-center'>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{transaction.idProduct}</td>
                                                    <td>{ web3.utils.fromWei((transaction.totalPayment).toString(), "ether")} ETH</td>
                                                    <td>
                                                        { transaction.supplier}
                                                    </td>
                                                    <td>{transaction.currentAdmin}</td>
                                                    
                                                </tr>)
                                    })
                                }
                                </tbody>
                            </table>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListTransaction