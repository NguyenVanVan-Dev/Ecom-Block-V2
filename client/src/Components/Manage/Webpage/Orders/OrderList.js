import React,{useEffect, useState} from 'react'
import {Link, Routes, Route} from "react-router-dom";
import $ from 'jquery'
import Notiflix from 'notiflix';
import orderApi from '../../../../Api/orderApi';
function OrderList() {
    const [orders,setOrders] = useState([]);
    useEffect(() => {
        const fetchOrders = async () => {
            await orderApi.getAll()
            .then((res)=>{
                if(res.success === true){
                    setOrders(res.orders)
                }
                Notiflix.Loading.remove(500);
            })
            .catch((err)=>{
                console.log(err.response);
                Notiflix.Report.failure("Order not Found","please come back later" , 'Cancel');
            })
        }
        fetchOrders();
    }, []);
    Notiflix.Loading.hourglass("Loading data...",{
        clickToClose: true,
        svgSize: '120px',
    });
    const handleRemoveOrder = async (id) => {
        const params = {id}
        await orderApi.delete(params)
        .then((res)=>{
            if(res.success === true){
                Notiflix.Report.warning("Delete orders Successfully","orders has been remove from database" , 'Cancel');
                document.getElementById(`${id}`).remove();
            } 
            console.log(res);
        }).catch((error)=>{
            Notiflix.Report.failure("Delete orders Failure",error.response.data.message, 'Cancel');
        })
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
                                <h1 className="h4 text-gray-900 mb-2">List Category orders</h1>
                            </div>
                            <div className="">
                                <Link to={'/admin/add-orders'} className="btn btn-success mb-4">Add orders</Link>
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Address recever</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Method payment</th>
                                        <th scope="col">Total VND</th>
                                        <th scope="col">Total ETH</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    orders.map((order,index)=>{

                                        let display = '';
                                        order.method === 1 ?display = 'Payment on delivery' : display = 'Payment with tokens(ETH)';
                                        return (<tr key={index} id={order._id}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>{order.streetAddress +", "+ order.apartmentAddress +", "+ order.city +", "+ order.country}</td>
                                                    <td>
                                                        { order.phone}
                                                    </td>
                                                    <td  title={order.email} >{order.email}</td>
                                                    <td>
                                                        { order.notes}
                                                    </td>
                                                    <td>{display}</td>
                                                    <td>{order.totalVND}</td>
                                                    
                                                    <td>{order.totalETH}</td>
                                                    <td>
                                                        <Link to={'/admin/order-detail/'+order._id} className="btn btn-info mr-1 mb-1"><i className="fas fa-edit"></i></Link>
                                                        <button onClick={()=>{handleRemoveOrder(order._id)}} data-id={order._id} className="btn btn-danger remove_cate"><i className="fas fa-trash pr-1"></i></button>
                                                    </td>
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

export default OrderList
