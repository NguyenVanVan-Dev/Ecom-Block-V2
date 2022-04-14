
import React,{useState} from "react";
import { Routes, Route} from "react-router-dom";
import Login from "./Components/Manage/Auth/Login";
import AdminLayout from "./Layout/PageAdmin/AdminLayout";

import Notiflix from "notiflix";
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
                <Route path="/admin/login" element = {<Login/>} />
            </Routes>
        {/* <Routes>
            <Route path="/" element={<MasterLayoutUI cartItems={cartItems}/>} >
                <Route path="cart" element={<Cart setCartItems={setCartItems} cartItems={cartItems}/>} />
                <Route path="checkout" element={<CheckOut setCartItems={setCartItems} cartItems={cartItems}/>} />
                <Route path="product/:id" element={<DetailProductUser handleAddCart={handleAddCart}/>} />
                <Route path="login" element={<LoginUser/>} />
                <Route path="shop" element={<Shop/>} />
                <Route path="/" element={<Home handleAddCart={handleAddCart}  />} />
            </Route>
            <Route path="/admin/login" element = {<Login/>} />
            <Route path="/admin/register" element = {<Register/>} />
            <Route path="/admin/forgot-password" element = {<ForgotPassword/>} />
            <Route path="/admin/reset-password/:token" element = {<ResetPassword/>} />
            <Route path="/admin" element = {<AdminLayout/>} >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="profile" element={<Profile/>} />
                <Route path="add-category" element={<AddCategory/>} />
                <Route path="list-category" element={<ListCategory/>} />
                <Route path="category/:id" element={<DetailCategory/>} />
                <Route path="add-product" element={<AddProduct/>} />
                <Route path="list-product" element={<ListProduct/>} />
                <Route path="product/:id" element={<DetailProduct/>} />  
                <Route path="list-transaction" element={<ListTransaction/>} />  
                <Route path="add-contract" element={<AddContract/>} />
                <Route path="list-contract" element={<ListContract/>} />
            </Route>
        </Routes> */}
        </div>
    );
}

export default App;
