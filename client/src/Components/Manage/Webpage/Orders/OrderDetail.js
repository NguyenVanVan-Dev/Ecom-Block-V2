import React ,{ useState,useEffect} from "react";
import {Link,useParams} from "react-router-dom";
import Notiflix from 'notiflix';
import $ from 'jquery';
import orderApi from "../../../../Api/orderApi";

function OrderDetail() {
    const { id } = useParams();
    const [order,setOrder] = useState(null);
    useEffect(() => {
        const fetchOrderDetail = async () => {
            const params = {id}
                await orderApi.detail(params)
                .then(res =>{
                    if(res.success === true){
                        setOrder(res.order); 
                    }
                }).catch((error)=>{
                    Notiflix.Report.failure("Ogani Notification ",`No order found with id "${id}" ` , 'Cancel');
                })
        }
        fetchOrderDetail();
    }, []);
    console.log(order);
    const handelSubmit = async (e)=>{
        e.preventDefault();
        Notiflix.Loading.hourglass("Loading data! Please wait...",{
            clickToClose: true,
            svgSize: '120px',
        });

    };
    return (
        order && order.map((orderDetail) => {
            let methodPayment = '';
            if(orderDetail.method === 1){
                methodPayment = 'Payment on delivery'
            } else if( orderDetail.method ===2 ) {
                methodPayment =  'Payment with tokens(ETH)'
            }
            return (
                <div key={orderDetail._id} className="container-fluid">
                    <h1 className="h3 mb-2 text-gray-800">Bảng Dữ Liệu</h1>
                    <p className="mb-4"> Thông Báo:</p>
                    <div className="">
                        <Link to={'/admin/order-list'} className="btn btn-success mb-4">Order List</Link>
                    </div>
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Thông Tin Khách Hàng </h6>
                        </div>
                        <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr style={{textAlign: 'center'}}>
                                <th>Tên Khách Hàng</th>
                                <th>Số Điện Thoại</th>
                                <th>E-mail</th>
                                </tr>
                            </thead>               
                            <tbody>
                                <tr style={{textAlign: 'center'}}>
                                <td>{orderDetail.name}</td>
                                <td>{orderDetail.phone}</td>
                                <td>{orderDetail.email}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Thông Tin Đơn Hàng </h6>
                        </div>
                        <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr style={{textAlign: 'center'}}>
                                <th>Tổng Tiền VNĐ</th>
                                <th>Tổng Tiền ETH</th>
                                <th>Note</th>
                                <th>Địa Chỉ</th>
                                <th>Hình Thức Thanh Toán</th>
                                </tr>
                            </thead>               
                            <tbody>
                                <tr style={{textAlign: 'center'}}> 
                                <td>{orderDetail.totalVND}</td>
                                <td>{orderDetail.totalETH}</td>
                                <td>{orderDetail.notes}</td>
                                <td>{orderDetail.streetAddress +", "+ orderDetail.apartmentAddress +", "+ orderDetail.city +", "+ orderDetail.country}</td>
                                <td>{methodPayment}</td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    <hr />
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                        <h6 className="m-0 font-weight-bold text-primary">Chi Tiết Đơn Hàng </h6>
                        </div>
                        <div className="card-body">
                        <div className="table-responsive">
                            
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr style={{textAlign: 'center'}}>
                                <th>STT</th>
                                <th>Tên Sản Phẩm</th>
                                <th>Số Lượng</th>
                                <th>Giá Sản Phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Tổng Tiền</th>
                                </tr>
                            </thead>               
                            <tbody>
                                {
                                    orderDetail.listItemOrder.map((item, index) => {
                                        return (<>
                                            <tr className="text-center">
                                                <td><i>{index + 1}</i></td>
                                                <td>{item.productID.name}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.productID.price}đ</td>
                                                <td> <img src={process.env.REACT_APP_API_URL+'uploads/'+item.productID.image} id='review-image' className=" img-thumbnail w-25" alt="..."/></td>
                                                <td>  
                                                    <span className="mr-5 font-weight-bold"> Thanh toán:</span> {item.qty * item.price }  VNĐ
                                                </td>
                                            </tr>
                                        </>)
                                    })
                                }
                                <tr>
                                    <td colspan="6" class="p-2">  
                                        <span class="mr-5 font-weight-bold"> Thanh toán:</span> {orderDetail.totalVND} VNĐ                                       
                                    </td> 
                                </tr>
                                <tr>
                                    <td colspan="6" class="p-2">  
                                        <span class="mr-5 font-weight-bold"> Thanh toán:</span> {orderDetail.totalETH} ETH                                     
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                    <div className="card shadow mb-4 p-3">
                        <form role="form">
                        <div className="form-group col-sm-6">
                        <select name="select_status" class="form-control">
                            <option value="">----Chọn hình thức đơn hàng-----</option>
                            <option  value="1" selected={orderDetail.status ===1 ? true : false} >Chưa Xử Lý</option>
                            <option  value="2" selected={orderDetail.status ===2 ? true : false} >Đã Xử Lý-Đã Giao Hàng</option>
                            <option  value="3" selected={orderDetail.status ===3 ? true : false} >Hủy Đơn Hàng</option>
                        </select>
                        </div>
                        <div className="form-group col-sm-6">
                            <button type="submit" name="update_order" className="btn btn-info form-control">cập nhật đơn hàng
                            </button>
                        </div>
                        </form>
                        <div className="col-md-6">
                        <a target="_blank" href="{{url('/print-order/'.$details->order_id)}}" className="btn btn-warning">in đơn hàng</a>
                        </div>
                    </div>
                    <hr />
                </div>
            )
        })
    )


}

export default OrderDetail