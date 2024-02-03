import image1 from '../../../assets/image1.png';
import image2 from '../../../assets/image2.png';
import trending1 from '../../../assets/trending1.png';
import trending2 from '../../../assets/trending2.png';
import trending3 from '../../../assets/trending3.png';
import {ReactComponent as Profile} from '../../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../../assets/Home3.svg';
import {ReactComponent as Category} from '../../../assets/Category.svg';
import { BottomNavi } from "../../../components/bottomNavi";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Album(){
    const imageArray = [image1, image2, trending1, trending2, trending3]
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
            isActive:true
        },
        {
            icon:Profile,
            text:"Community",
            isActive:false
        },
    ]
    
    const [isStory, setIsStory] = useState(false);
    const navigate = useNavigate()
    return <div className="collection-main-page home-page-body">
                <div style={{overflowY:'scroll', marginBottom:0}}>
                        <div className="collection-main-header">
                            <div className="menu-title">
                                {!isStory ? <p onClick={()=>setIsStory(false)} style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Album</p>:<p onClick={()=>setIsStory(false)}>Album</p>}
                            </div>
                            <div className="menu-title">
                                  {isStory ? <p onClick={()=>setIsStory(true)} style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,
                                    
                                    }}>Stories</p>:<p onClick={()=>setIsStory(true)}>Stories</p>}
                            </div>
                        </div>
                       {!isStory && <div className='collention-body'>
                            {imageArray.map((value)=><div className='collection-item-container' >
                                <div className='title-link-container'>
                                    <p className='title'>Otedola's Bridge</p>
                                    <p className='active' onClick={()=>navigate('/collection/123')}>View</p>
                                </div>
                                <div className='image-container'>
                                    <img src={value} />
                                </div>
                            </div>)}
                        </div>} 
                       {isStory && <div className='Stories-body-container'>
                            {imageArray.map((value)=><div className='stories-item-container' onClick={()=>navigate('/collection/story/123')}>
                                <div className='text-container'>
                                    <p className='title'>Kanuri Castle</p>
                                    <p style={{fontSize:14, width:251}}>Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. </p>
                                </div>
                                <div className='story-image-containe'>
                                    <img src={value} height={55} width={55}/>
                                </div>
                            </div>)}
                        </div> } 

                </div>

                <div className="shop-footer-container">
                    <BottomNavi imageTextObjectArray={iconTextArray}/>
                </div>
            
    </div>
}
