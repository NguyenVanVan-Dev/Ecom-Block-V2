import React,{useEffect, useState} from 'react'
import {useWeb3} from "../../../../Providers";
import Notiflix from 'notiflix';
import axios from 'axios';
function ListTransaction() {
    const [transactions, setTransactions] = useState();
    const {web3, contract, provider} = useWeb3();
    useEffect(() => {
        axios.get('https://api-ropsten.etherscan.io/api?module=account&action=txlist&address=0x4bE6Da0e943adc8397B923A3562a0bfDf850909A&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=D5DD34SRRQ1H7SFD82DBZEXDDJR9GAIC1Y')
        .then((res) => {
            setTransactions(res.data.result);
        })
    }, []);

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
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr className='text-center'>
                                        <th scope="col">TxHash</th>
                                        <th scope="col">Method</th>
                                        <th scope="col">Block</th>
                                        <th scope="col">Date Time (UTC)</th>
                                        <th scope="col">From</th>
                                        <th scope="col">To</th>
                                        <th scope="col">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    
                                    transactions && transactions.map((transaction,index)=>{
                                        const time = transaction.timeStamp
                                        const d = new Date(time.toString());
                                        return (<tr key={index} id={transaction._id} className='text-center'>
                                                    <td scope="row" className='text-truncate hash-tag'>{transaction.hash}</td>
                                                    <td>{transaction.blockNumber}</td>
                                                    <td>{transaction.blockNumber}</td>
                                                    <td>
                                                        { d.toString() }
                                                    </td>
                                                    <td className='text-truncate hash-tag'>{transaction.from}</td>
                                                    <td className='text-truncate hash-tag'>{transaction.to}</td>
                                                    <td>{ web3.utils.fromWei((transaction.value).toString(), "ether")} ETH</td>
                                                    
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