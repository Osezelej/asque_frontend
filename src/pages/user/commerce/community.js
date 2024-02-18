import community from '../../../assets/community.png';
import { BottomNavi } from '../../../components/bottomNavi';
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';

export function Community(){
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
            isActive:false
        },
        {
            icon:Category,
            text:"Collection",
            link:"/collection",
            isActive:false
        },
        {
            icon:Profile,
            text:"Community",
            isActive:true,
            link:"/community/blessed",
        },
    ]
    return <div className="community-mainpage-contaner home-page-body ">
        <div style={{overflowY:'scroll'}} className='home-body-container'>
            <div className="shop-header-container" style={{
                        minHeight:90
                    }}>
                        <h2>Community</h2>
                </div>
            <div className="empty-content-display-container " style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:20}}>
                            <div className="empty-content-image-container">
                                    <img src={community} alt=''/>
                            </div>
                            <p>Comming Soon!!</p>

            </div>

        </div>
        <div className="shop-footer-container">
            <BottomNavi imageTextObjectArray={iconTextArray}/>
        </div>
    </div>
}