import React,{ useState,useEffect} from "react";
import OwlCarousel from 'react-owl-carousel';

const TopSlideCategory = () =>{
    useEffect(() => {
        const setBg = document.querySelectorAll('.set-bg');
        setBg.forEach((item) => {
            let bg = item.getAttribute('data-setbg');
            item.style.backgroundImage = `url('${bg}')`;
        })
    }, []);
    return (
        <section className="categories">
            <div className="container">
            <div className="row">
                <OwlCarousel className='owl-theme categories__slider'
                    loop 
                    margin={10} 
                    nav
                    items="5"
                    autoplay
                    animateOut={"fadeOut"}
                >  
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/Resource/User/image/categories/cat-1.jpg`} >
                       
                        <h5><a href="#">Fresh Fruit</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/Resource/User/image/categories/cat-2.jpg`}>
                        <h5><a href="#">Dried Fruit</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/Resource/User/image/categories/cat-3.jpg`}>
                        <h5><a href="#">Vegetables</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/Resource/User/image/categories/cat-4.jpg`}>
                        <h5><a href="#">drink fruits</a></h5>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="categories__item set-bg" data-setbg={`/Resource/User/image/categories/cat-5.jpg`}>
                        <h5><a href="#">drink fruits</a></h5>
                        </div>
                    </div>
                </OwlCarousel>
            </div>
            </div>
        </section>
    )
}

export default TopSlideCategory;