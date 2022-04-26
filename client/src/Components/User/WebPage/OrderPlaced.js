import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import checkoutApi from '../../../Api/checkoutApi';
const OrderPlaced = ({cartItems,setCartItems}) => {
    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        const setBg = document.querySelectorAll('.set-bg');
        setBg.forEach((item) => {
            let bg = item.getAttribute('data-setbg');
            item.style.backgroundImage = `url('${bg}')`;
        })
        let hero__item = document.querySelector(".hero__item");
        hero__item.style.display = 'none';
        let hero__categories = document.querySelector(".hero__categories ul");
        hero__categories.style.display = 'none';
    });
    console.log()
    useEffect(() => {
        const params = {
            email: localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).email
        }
        checkoutApi.getListOrder(params)
        .then((data) => {
            setListOrder(data.orders);
        })
    }, []);
    const handleRemoveOrder = async (id) => {
        console.log(id)
    }
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="Resource/User/image/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Order Placed</h2>
                        <div className="breadcrumb__option">
                        <Link to={"/"}>Home</Link>
                        <span>Order Placed</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section className="shoping-cart spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__table">
                                <table>
                                    <thead>
                                        <tr>
                                        <th>STT</th>
                                        <th>Address</th>
                                        <th>Receiver</th>
                                        <th>Phone</th>
                                        <th>Total</th>
                                        <th />
                                        </tr>
                                    </thead>
                                <tbody>
                                    { listOrder.length === 0 && (
                                        <tr >
                                            <td colSpan={"5"}> No Items </td>
                                        </tr>
                                    )

                                    }
                                    {
                                        listOrder.map((item,index)=>(
                                            <tr key={item._id}>
                                                    <td>{index + 1}</td>
                                                    <td >
                                                        {item.apartmentAddress +", "+ item.country}       
                                                    </td>
                                                    <td >
                                                        {item.firstName +" "+ item.lastName}
                                                    </td>
                                                    <td >
                                                    {item.sdt}
                                                    </td>
                                                    <td >
                                                    {(item.totalVND).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) + "/"+ item.totalETH +" ETH"}
                                                    </td>
                                                    <td className="shoping__cart__item__close pr-4">
                                                        <span className='mr-4 delete' onClick={() => handleRemoveOrder(item._id)} ><i className="fas fa-trash-alt"></i></span>
                                                        <Link to={`/order-detail/${item._id}`}>  <span className='info'><i className="fas fa-info-circle"></i></span></Link>
                                                    </td>
                                            </tr>
                                        ))
                                    }
                            
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OrderPlaced