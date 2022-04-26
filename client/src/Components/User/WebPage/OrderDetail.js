import React,{useEffect,useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import checkoutApi from '../../../Api/checkoutApi';
import Notiflix from "notiflix";
const OrderDetail = () => {
    const {id} = useParams()
    const [orderItems, setOrderItems] = useState([]);
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
    useEffect(() => {
        const params  = {
            id
        }
        checkoutApi.getDetailOrder(params)
        .then((data) => setOrderItems(data.listItem))
        .catch((err) => Notiflix.Notify.failure('Order not found'))
    }, []);
    const total = orderItems.reduce((total,item) => {
        return total + item.productID.price * item.qty
    },0)
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="/Resource/User/image/breadcrumb.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2>Shopping Cart</h2>
                        <div className="breadcrumb__option">
                        <a href="./index.html">Home</a>
                        <span>Shopping Cart</span>
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
                                        <th className="shoping__product">Products</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th />
                                        </tr>
                                    </thead>
                                <tbody>
                                    { orderItems.length === 0 && (
                                        <tr >
                                            <td colSpan={"5"}> No Items </td>
                                        </tr>
                                    )

                                    }
                                    {
                                        orderItems.map((item)=>(
                                            <tr key={item._id}>
                                                <td className="shoping__cart__item">
                                                    <img src={process.env.REACT_APP_API_URL+`uploads/`+item.productID.image} alt="" />
                                                    <h5>{item.productID.name}</h5>
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {item.productID.price}
                                                </td>
                                                <td className="shoping__cart__quantity">
                                                    <div className="quantity">
                                                        <div className="pro-qty" >
                                                            <input type="number"   min="1" max={item.qty} defaultValue={item.qty} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="shoping__cart__total">
                                                   {(item.productID.price * item.qty).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }
                                                </td>
                                                <td className="shoping__cart__item__close">
                                                    <span className="icon_close"  />
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

export default OrderDetail