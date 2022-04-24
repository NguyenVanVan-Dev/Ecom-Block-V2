import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import checkoutApi from '../../../Api/checkoutApi';
const OrderPlaced = ({cartItems,setCartItems}) => {
    const [listOrder, setListOrder] = useState([]);
    const [priceETH, setPriceETH] = useState("57788940");
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
        let listOrder = []
        checkoutApi.getListOrder()
        .then((data) => {
            data.orders.forEach((item) => {
                item.listItemOrder.forEach((orderItem) => { 
                   listOrder.push(orderItem);
                })
            })
            setListOrder(listOrder);
        })
    }, []);
    console.log(listOrder)
    const handleQty = (e,id)=>{
        setCartItems(prev => {
                const newCart = prev.map((item)=> item._id === id ? {...item,quantity:parseInt(e.target.value)} : item)
                console.log(JSON.stringify(newCart));
                localStorage.setItem('cart',JSON.stringify(newCart));
                return newCart;
        });
    };
    const handleClearCart = ()=> {
        setCartItems([]);
        localStorage.removeItem('cart');
    };
    const handleRemoveItemCart = (id)=>{
        setCartItems(prev => {
            const newCart = prev.filter((item)=> item._id !== id)
            localStorage.setItem('cart',JSON.stringify(newCart));
            return newCart;
        });
    }
    // const subTotal = cartItems.reduce((total,item)=>total+ item.price * item.quantity,0)
    return (
        <div>
            <section className="breadcrumb-section set-bg" data-setbg="Resource/User/image/breadcrumb.jpg">
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
                                    { listOrder.length === 0 && (
                                        <tr >
                                            <td colSpan={"5"}> No Items </td>
                                        </tr>
                                    )

                                    }
                                    {
                                        listOrder.map((item)=>(
                                            <tr key={item._id}>
                                                <td className="shoping__cart__item">
                                                    <img src={process.env.REACT_APP_API_URL+`uploads/`+item.productID.image} alt="" />
                                                    <h5>{item.productID.name + item._id}</h5>
                                                </td>
                                                <td className="shoping__cart__price">
                                                    {item.productID.price}
                                                </td>
                                                <td className="shoping__cart__quantity">
                                                    <div className="quantity">
                                                        <div className="pro-qty" >
                                                            <input type="number" onChange={(e) => handleQty(e,item._id)}  min="1" max={item.qty} defaultValue={item.qty} />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="shoping__cart__total">
                                                   {(item.productID.price * item.qty).toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }
                                                </td>
                                                <td className="shoping__cart__item__close">
                                                    <span className="icon_close" onClick={()=> handleRemoveItemCart(item._id)} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                            
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shoping__cart__btns">
                                <a href="#" className="primary-btn cart-btn">Status order: </a>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="shoping__continue">
                                <div className="shoping__discount">
                                <h5>Discount Codes</h5>
                                <form action="#">
                                    <button type="submit" className="site-btn">Cancel Order</button>
                                </form>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    )
}

export default OrderPlaced