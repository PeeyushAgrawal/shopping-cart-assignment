import React from 'react';
import  { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Categories from "./Categories";
import 'bootstrap/dist/css/bootstrap.min.css';
const Header = () => {
    const [bannerData, setBannerData] = useState([]);

    useEffect(() => {
        fetch('banners')
        .then((res) => res.json())
        .then((data) => setBannerData(data.banners));
    }, []);
  return (
    <>
        <Carousel variant="dark" prevLabel='PREV' className='container-lg' nextLabel='NEXT'>
            {
            bannerData.map((item, index) => {
                return <Carousel.Item key= {index} ><img src={item.bannerImageUrl} alt={item.bannerImageAlt} /></Carousel.Item>
            })
            }
        </Carousel>
        <Categories/>
    </>
  );
}

export default Header;
