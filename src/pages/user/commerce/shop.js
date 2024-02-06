import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import {BottomNavi} from '../../../components/bottomNavi';
import {ReactComponent as Bag} from '../../../assets/Bag 6.svg';
import {ReactComponent as Communication} from '../../../assets/communication.svg';
import share from '../../../assets/Share.png';
import { SearchRounded, ShoppingBagOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function Shop(){
    const navigate = useNavigate()
    let imagesArray = [image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2]
    const iconTextArray =[
        {
            icon:Home,
            text:"Home",
            link:"/market/home",
            isActive:false
        },
        {
            icon:Category,
            text:"Shop",
            link:"/market/shop",
            isActive:true
        },
        {
            icon:Category,
            text:"Collection",
            link:"/collection",
            isActive:false,
        },
        {
            icon:Profile,
            text:"Community",
            isActive:false,
            link:"/community/blessed",
        },
    ]

    return <div className="shop-main-body home-page-body">
        <div style={{overflowY:'scroll'}}>

            <div className="shop-header-container">
                <div className="basket-section" onClick={()=>navigate('/market/cart')}>
                    <ShoppingBagOutlined/>
                </div>
                <div className="page-name-search-section">
                    <h1>Marketplace</h1>
                    <div className='search-icon-name-container'>
                        <SearchRounded style={{
                            height:25.5,
                            width:25.5
                        }}/>
                        <input type='text' placeholder='Search'/>
                    </div>
                </div>
            </div>
            
            <div className="shop-body-container">
                {
                    imagesArray.map((value, index)=><div className='shop-body-content-item-container' key={index} >
                            <div className='image-section' onClick={()=>navigate('/market/detail/artwork')}>
                                <img src={value} alt='photo'/>
                            </div>
                            <div className='item-name-text-price-container'>
                                <div className='item-name-text-container'>
                                    <p className='title'>
                                        Walls of Kano
                                    </p>
                                    <p className='text'>
                                        The Ancient kano city walls
                                    </p>
                                </div>
                                <p className='price'>$112</p>
                            </div>
                            <div className='share-shopnow-button-container'>
                                <button className='share-button'>
                                    <img src={share}/>
                                </button>
                                <button className='shopnow-button'>Shop now</button>
                            </div>

                    </div>)
                }
            </div>
        </div>
       
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>
    </div>
}