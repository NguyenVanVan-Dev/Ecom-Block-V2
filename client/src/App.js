
import React,{useState} from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./Components/Manage/Auth/Login";
import AdminLayout from "./Layout/PageAdmin/AdminLayout";
import UserLayout from "./Layout/PageUser/UserLayout";
import Home from "./Components/User/WebPage/Home";
import Dashboard from "./Components/Manage/Webpage/Dashboard";
import Register from "./Components/Manage/Auth/Register";
import AddCategory from "./Components/Manage/Webpage/Category/AddCategory";
import ListCategory from "./Components/Manage/Webpage/Category/ListCategory";
import DetailCategory from "./Components/Manage/Webpage/Category/DetailCategory";
import AddProduct from "./Components/Manage/Webpage/Product/AddProduct";
import ListProduct from "./Components/Manage/Webpage/Product/ListProduct";
import DetailProduct from "./Components/Manage/Webpage/Product/DetailProduct";
import ForgotPassword from "./Components/Manage/Auth/ForgotPassword";
import ResetPassword from "./Components/Manage/Auth/ResetPassword";
import Cart from "./Components/User/WebPage/Cart";
import ListTransaction from "./Components/Manage/Webpage/Transaction/ListTransaction";
import AddContract from "./Components/Manage/Webpage/Contract/AddContract";
import ListContract from "./Components/Manage/Webpage/Contract/ListContract";
import CheckOut from "./Components/User/WebPage/CheckOut";
import DetailProductUser from "./Components/User/WebPage/DetailProduct";
import LoginUser from "./Components/User/WebPage/Login";
import Shop from "./Components/User/WebPage/Shop"
import AddEmployee from "./Components/Manage/Webpage/Employee/AddEmployee";
import OrderPlaced from "./Components/User/WebPage/OrderPlaced";
import Notiflix from "notiflix";
import OrderDetail from "./Components/User/WebPage/OrderDetail";
import OrderDetailAdmin from "./Components/Manage/Webpage/Orders/OrderDetail";
import OrderList from "./Components/Manage/Webpage/Orders/OrderList";
function App() {
    const [cartItems, setCartItems] = useState(()=>{
        const storageCart = JSON.parse(localStorage.getItem('cart'));
        return storageCart ?? [];
    });
    const handleAddCart = (product,quantity = 1) =>{
      
        const ProductExits = cartItems.find((item)=> item._id === product._id);
        if(ProductExits)
        {
            setCartItems(prev => {
                const newCart = prev.map((item)=> 
                    item._id === product._id ? {...ProductExits,quantity:ProductExits.quantity + quantity} : item
                )
                localStorage.setItem('cart',JSON.stringify(newCart));
                return newCart;
            })
        }else {
            setCartItems(prev => {
                const newCart =  [...prev,{...product,quantity: quantity}]
                localStorage.setItem('cart',JSON.stringify(newCart));
                return newCart;
            });
        }
        Notiflix.Notify.success("Add product to cart");
    }
   
    return (
        <div className="App">
        <Routes>
            <Route path="/" element={<UserLayout cartItems={cartItems}/>} >
                <Route path="cart" element={<Cart setCartItems={setCartItems} cartItems={cartItems}/>} />
                <Route path="checkout" element={<CheckOut setCartItems={setCartItems} cartItems={cartItems}/>} />
                <Route path="product/:id" element={<DetailProductUser handleAddCart={handleAddCart}/>} />
                <Route path="login" element={<LoginUser/>} />
                <Route path="shop" element={<Shop/>} />
                <Route path="order-placed" element={<OrderPlaced/>} />
                <Route path="order-detail/:id" element={<OrderDetail/>} />
                <Route path="/" element={<Home handleAddCart={handleAddCart}  />} />
            </Route>
            <Route path="/admin/login" element = {<Login/>} />
            <Route path="/admin/register" element = {<Register/>} />
            <Route path="/admin/forgot-password" element = {<ForgotPassword/>} />
            <Route path="/admin/reset-password/:token" element = {<ResetPassword/>} />
            <Route path="/admin" element = {<AdminLayout/>} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-category" element={<AddCategory/>} />
                <Route path="list-category" element={<ListCategory/>} />
                <Route path="category/:id" element={<DetailCategory/>} />
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="list-product" element={<ListProduct/>} />
                <Route path="product/:id" element={<DetailProduct/>} />  
                <Route path="list-transaction" element={<ListTransaction/>} />  
                <Route path="add-contract" element={<AddContract/>} />
                <Route path="list-contract" element={<ListContract/>} />
                <Route path="add-employee" element={<AddEmployee/>} />
                <Route path="order-list" element={<OrderList/>} />
                <Route path="order-detail/:id" element={<OrderDetailAdmin/>} />
            </Route>
        </Routes>
        </div>
    );
}

export default App;
