import React ,{useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useWeb3 } from "../../../../Providers";
import Notiflix from 'notiflix';
import employeeApi from "../../../../Api/employeeApi";
const AddEmployee = ()=>{
    const { web3, provider, contract} = useWeb3();
    const [employeeInput, setEmployeeInput] = useState({
        name:'',
        email:'',
        wallet:'',
        error_list:[],
    })
    const [account, setAccount] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    // Get Wallet  
    useEffect(() => {
        const handleAccountsChanged = async () => {
            const accounts = await web3.eth.getAccounts();
            if(accounts.length === 0)
            {
                console.log("No Wallet");
            }else if(accounts[0] !== account) {
                setAccount(accounts[0]);
            }
        }
        if(isConnected) {
            provider.on("accountsChanged",handleAccountsChanged);
        }
        return () => {
            if(isConnected) {
                provider.removeListener('accountsChanged', handleAccountsChanged);
            }
        }
    }, [isConnected]);
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
    const handleInput = (e)=>{
        setEmployeeInput({...employeeInput,[e.target.name]: e.target.value})
    }
    const addManager = async () => {
        let   walletNewManager = employeeInput.wallet;
        return  await contract.methods.addManager(walletNewManager.toString()).send({
            from:account
        });
    }
    const storeEmployee = async () => {
        const data ={
            name:employeeInput.name,
            email:employeeInput.email,
            wallet:employeeInput.wallet, 
        };
        employeeApi.store(data).then(res =>{
            if(res.success === true)
            {
              return  addManager();
            }
        })
        .then((data) => {
            Notiflix.Loading.remove();
            setEmployeeInput({
                name:'',
                email:'',
                wallet:'',
                error_list:[],
            })
            Notiflix.Notify.success("Employee is saved!");
        })
        .catch((error)=>{
            Notiflix.Loading.remove();
            if(error.response.data.listError){
                setEmployeeInput((prev)=>{
                    return {...prev,error_list: error.response.data?.listError}
                });
            }
            Notiflix.Notify.failure("Employee cannot be saved!");
        })
    }
    const handelSubmit = (e)=>{
        Notiflix.Loading.hourglass("Loading data...",{
            clickToClose: true,
            svgSize: '120px',
        });
        e.preventDefault();
        storeEmployee();
    };
    return (
        <div className="container">
            <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    {/* Nested Row within Card Body */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="p-5">
                            <div className="text-center">
                                <h1 className="h4 text-gray-900 mb-4">Add Employee</h1>
                            </div>
                            <div className="mb-4 d-flex justify-content-between">
                                <Link to={'/admin/list-employee'} className="btn btn-primary">List Employee</Link>
                                <div className="d-flex agline-items-center">
                                        <strong>Wallet Owner: </strong>
                                        <p className="account_number m-0 ml-4">
                                        { account ? account : "Account Denined"}
                                        </p>
                                    </div>
                                <button onClick={handelConnectMetamask} className="btn btn-primary btn-user">
                                     Connect Metamask
                                </button>
                            </div>
                                <form className="user">
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                            <input type="text" onChange={handleInput} value={employeeInput.name} name="name" className="form-control form-control-user" id="exampleFirstName" placeholder="Employee Name" />
                                            <span className="text-danger small">{employeeInput.error_list.name}</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <input type="email" onChange={handleInput} value={employeeInput.email} name="email" className="form-control form-control-user"  placeholder="Employee Email" />
                                            <span className="text-danger small">{employeeInput.error_list.email}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                        <label htmlFor="">Wallet Manager</label>
                                        <input type="text" onChange={handleInput} value={employeeInput.wallet} name="wallet" className="form-control form-control-user " id="exampleInputPassword" placeholder="Wallet Manager" />
                                            <span className="text-danger small">{employeeInput.error_list.wallet}</span>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group col-md-12">
                                                <label htmlFor="SelectAnHien">Display</label>
                                                <select name="display"  value={employeeInput.display} onChange={handleInput}  className="form-control input-sm mt-2 inputform">
                                                    <option value={0} className="optionform">Hidden</option>
                                                    <option value={1} className="optionform">Visible</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row mt-5">
                                        <div className="form-group col-md-3">
                                            <button onClick={handelSubmit} className="btn btn-primary btn-user btn-block">
                                                  Add Employee
                                            </button>
                                        </div>
                                   </div>
                                </form>     
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;