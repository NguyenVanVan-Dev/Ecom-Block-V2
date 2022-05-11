import React,{useEffect} from "react";
import TopBar from "../../Components/User/Topbar"
import Header from "../../Components/User/Header";
import SideBarCategory from "../../Components/User/SideBarCategory";
import Footer from "../../Components/User/Footer";
import { Outlet } from "react-router-dom";
import { Web3Provider, MetaMarkProvider,UserProvider  } from "../../Providers";
const MasterLayout = ({cartItems}) =>{
    
    useEffect(() => {
        const setBg = document.querySelectorAll('.set-bg');
        setBg.forEach((item) => {
            let bg = item.getAttribute('data-setbg');
            item.style.backgroundImage = `url('${bg}')`;
        })
    });
    return (

        <Web3Provider>
            <UserProvider>
                <MetaMarkProvider>
                <div>
                    <div className="humberger__menu__overlay" />
                    <TopBar></TopBar>
                    
                    <Header cartItems={cartItems}></Header>
                    <SideBarCategory></SideBarCategory>
                    <Outlet></Outlet>
                    <Footer></Footer>
                </div>
                </MetaMarkProvider>
            </UserProvider>
        </Web3Provider>
    )
}

export default MasterLayout;