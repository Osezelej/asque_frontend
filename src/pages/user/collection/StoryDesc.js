import { BottomNavi } from "../../../components/bottomNavi";
import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import share from '../../../assets/Share.png';
import { FavoriteOutlined } from "@mui/icons-material";
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import like from '../../../assets/Vector.png';

export function StoryDesc(){
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
    return <div className="story-desc-body-page home-page-body">
        <div style={{overflowY:'scroll'}}>
        <div className="collection-main-header">
                      
                      </div>
            <div className="story-image-container">
                <img src={image1}/>
            </div>
            <div className='title-like-share-container'>
                    <div className='title-name-publiser-container'>
                        <p className='title'>Kanuri Castle</p>
                        <p className='creator'>creator:Favour Onuoha</p>
                        <p className='publish'>published:Nov 11, 2022</p>
                    </div>
                    <div className='like-share-button-container'>
                        <button className='like-button'>
                            <img src={like} height={15} width={17}/>
                        </button>
                        <button className='share-button'>
                            <img src={share}/>
                        </button>
                    </div>
            </div>
            <div className="description-text-container">
                <p>Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.</p>
            </div>
        </div>
        <div className="home-footer-container">
                <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>
    </div>
}