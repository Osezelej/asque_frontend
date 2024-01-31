import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import trending1 from '../../../assets/trending1.png';
import trending2 from '../../../assets/trending2.png';
import trending3 from '../../../assets/trending3.png';
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import { BottomNavi } from "../../../components/bottomNavi";
import Carousel from 'react-material-ui-carousel';
import like from '../../../assets/Vector.png';
import share from '../../../assets/Share.png';

export function AlbumDesc(){
    const imageArray = [image1, image2, trending1, trending2, trending3]
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
    return <div className='detail-desc-main-container home-page-body'>
                <div style={{overflowY:'scroll', paddingBottom:100}}>
                    <div className="collection-main-header">
                      
                    </div>
                    <div className='collection-main-body'>
                        <Carousel>
                            {
                                imageArray.map((value)=><div className='collection-detail-image-container'>
                                    <img src={value}/>
                                </div>)
                            }
                        </Carousel>
                    </div>
                    <div className='title-like-share-container'>
                        <div className='title-name-publiser-container'>
                            <p className='title'>Kanuri Castle</p>
                            <p className='creator'>creator:Favour Onuoha</p>
                            <p className='publish'>published:Nov 11, 2022</p>
                        </div>
                        <div className='like-share-button-container'>
                            <button className='like-button'>
                            <img src= {like} height={14} width={17}/>
                            </button>
                            <button className='share-button'>
                                <img src={share} height={15}
                                    width={15}
                                />
                            </button>
                        </div>
                    </div>
                    <div className='description-container'>
                        <p>Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping.</p>
                    </div>

                </div>
            <div className="home-footer-container">
                <BottomNavi imageTextObjectArray={iconTextArray}/>
            </div>

    </div>
}