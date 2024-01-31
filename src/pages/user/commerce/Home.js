import { ShoppingBagOutlined, ShoppingBasketRounded } from "@mui/icons-material";
import { useState } from "react";
import trending1 from '../../../assets/trending1.png';
import trending2 from '../../../assets/trending2.png';
import trending3 from '../../../assets/trending3.png';
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import { BottomNavi } from "../../../components/bottomNavi";
import '../../../css/user.css';

export function MarketHome(){
    const [trendingData, setTrandingData] = useState([1,2,3,4,54,5,6,7,3,3]);
    const iconTextArray =[
        {
            icon:Home,
            text:"Home",
            link:"/market/home"
        },
        {
            icon:Category,
            text:"Shop",
            link:"/market/shop"
        },
        {
            icon:Category,
            text:"Collection",
            link:"/collection"
        },
        {
            icon:Profile,
            text:"Community"
        },
    ]
    const imagesArray = [image1, image2, trending1, trending2, trending3,trending2, trending3, trending2];
    return <div className="home-page-body ">
    <div style={{overflowY:'scroll'}}>
        <div className="home-header-container ">
            <div className="home-name-greeting-container">
                <h3>Blessed</h3>
                <p>Good afternoon, welcome back</p>
            </div>
            <div className="home-cart-profile-pic-container">
                <ShoppingBagOutlined/>
                <p>BO</p>
            </div>
        </div>
        <div className="home-body-container">
            <div className="trending-artwork-container">
                <h4>Trending artworks</h4>
                <p className="active">see all</p>
            </div>
            <div className="home-image-list-container">
            {
                trendingData.map((value, index)=> <div className="home-image-item-container" key={index}>
                    <div>
                        <img alt="artwork"  src={trending1}/>
                        <p className="active">view in shop</p>
                    </div>
                    <div>
                        <img alt="artwork"  src={trending2}/>
                        <p className="active">view in shop</p>
                    </div>
                    <div>   
                        <img alt="artwork"  src={trending3}/>
                        <p className="active">view in shop</p>
                    </div>
                </div>)
            }
            </div>
            <div className="home-explore-main-section">
                <h3>Explore photo collector and Anecdote</h3>
                <div className="home-photo-mainbody">
                    {imagesArray.map((value)=> <div className="home-photo-mainbody-item">
                            <img src={value} alt={'text'}/>
                            <div className="text-structurecontainer">
                                <p>Walls of Kano</p>
                            </div>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
        
        <div className="home-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>

</div>
} 