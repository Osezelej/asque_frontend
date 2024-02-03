import trending1 from '../../assets/trending1.png';
import trending2 from '../../assets/trending2.png';
import trending3 from '../../assets/trending3.png';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import {ReactComponent as Profile} from '../../assets/Profile 1.svg';
import {ReactComponent as Home} from '../../assets/Home3.svg';
import {ReactComponent as Category} from '../../assets/Category.svg';
import { useState } from 'react';
import { SearchRounded } from '@mui/icons-material';
import share from '../../assets/Share.png';
import '../../css/admin.css'
import { Modal } from '@mui/material';
import ModalIcon from '../../assets/unsuccess.png';

export function AdminHome(){
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
    let imagesArray = [image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2,image1, image2];
    const imageArray = [image1, image2, trending1, trending2, trending3]
    let [chosenContent, SetChosenContent] = useState({
        store:true,
        album:false,
        stories:false,
    });
    let [openModal, setOpenModal] = useState(false)
    return <div className="home-page-body">
    <Modal open={openModal} onClose={()=>setOpenModal(false)}>
    <div style={{
        height:'100%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <div style={{
            backgroundColor:'white',
            width:'350px',
            height:'220px',
            borderRadius:15,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'space-between'
        }}>
            <div className='modal-icon-container' style={{
                position:'relative',
                padding:15,
                }}>
                <img src={ModalIcon} />
            </div>
            <div className='modal-content-container' style={{
                display:"flex",
                flexDirection:'column',
                alignItems:'center',
                justifyContent:'center',
                columnGap:15
            }}>
                <h3>Confirm Delete</h3>
                <p style={{
                    textAlign:'center'
                }}>
                    Are you sure you want to delete <b>Kanuri castle?</b>
                </p>
            </div>
            <div className='modal-action-button-container' style={{
                display:'flex',
                justifyContent:'space-evenly',
                width:'100%',
                height:60,
                alignItems:'center',
                fontWeight:900
                }}>
                <div className='modal-action-button'>
                    <p onClick={()=>setOpenModal(false)}>
                        No,back
                    </p>
                </div>
                <div className='modal-action-button'>
                    <p style={{color:'black'}} onClick={()=>setOpenModal(false)}>Yes</p>
                </div>
            </div>

        </div>
    </div>
        
    </Modal>
        <div style={{overflowY:'scroll'}}>
            <div className="home-header-container ">
                <div className="home-name-greeting-container">
                    <h3>Blessed</h3>
                    <p>Good afternoon, welcome back</p>
                </div>
                <div className="home-cart-profile-pic-container">
                    <p>BO</p>
                </div>
            </div>
            <div className="home-body-container">
            <div className="trending-artwork-container">
                <h4>Edit collections</h4>
                <p className="active">see all</p>
            </div>
            <div className="home-image-list-container">
            {
                trendingData.map((value, index)=> <div className="home-image-item-container" key={index}>
                    <div>
                        <img alt="artwork"  src={trending1}/>
                    </div>
                    <div>
                        <img alt="artwork"  src={trending2}/>
                    </div>
                    <div>   
                        <img alt="artwork"  src={trending3}/>
                    </div>
                </div>)
            }
            </div>

            <div className="home-explore-main-section">
                <h3>Delete Item</h3>

                <div className='admin-navigation-header'>
                    {chosenContent.store ? <p  style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Store</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:false, store:true, stories:false}})}>Store</p>
                                    
                    }
                    {chosenContent.album ? <p style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Album</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:true, store:false, stories:false}})} >Album</p>
                                    
                    }
                    {chosenContent.stories? <p   style={{
                                    color:'#BE774C', 
                                    fontWeight:'bold', 
                                    borderBottomWidth: 2, 
                                    borderBottomStyle:'solid',
                                    paddingBottom:5,

                                    }}>Stories</p>:<p onClick={()=>SetChosenContent((prev)=>{return {album:false, store:false, stories:true}})}>Stories</p>
                                    
                    }
                </div>
                <div className='search-icon-name-container'>
                        <SearchRounded style={{
                            height:25.5,
                            width:25.5
                        }}/>
                        <input type='text' placeholder='Search'/>
                    </div>
                {chosenContent.store && <div className="home-photo-mainbody" style={{rowGap:25}}>
                    {imagesArray.map((value, index)=> <div className='shop-body-content-item-container' key={index}>
                            <div className='image-section'>
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
                                
                                <button className='shopnow-button' style={{width:'100%'}}>Delete Now </button>
                            </div>

                    </div>)
                    }
                </div>
                }

                {chosenContent.album && <div className="home-photo-mainbody" style={{rowGap:25}}>
                    {imagesArray.map((value, index)=> <div className='shop-body-content-item-container' key={index}>
                            <div className='image-section'>
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
                                <p className='price'></p>
                            </div>
                            <div className='share-shopnow-button-container'>
                                
                                <button className='shopnow-button' style={{width:'100%'}}>Delete Now </button>
                            </div>

                    </div>)
                    }
                </div>}
                {chosenContent.stories &&  <div className='Stories-body-container'>
                            {imageArray.map((value)=><div>
                                <div className='stories-item-container'>

                                    <div className='text-container'>
                                        <p className='title'>Kanuri Castle</p>
                                        <p style={{fontSize:14, width:251}}>Lets make your comfort zone memorable, Order for a product Above 50,000 naira and get a free Shipping. </p>
                                    </div>
                                    <div className='story-image-containe'>
                                        <img src={value} height={55} width={55}/>
                                    </div>
                                </div>
                                <div className='share-shopnow-button-container'>
                                    <button className='shopnow-button' style={{width:'100%'}} onClick={()=>setOpenModal(true)} >Delete Now </button>
                                </div>
                            </div>)}
                        </div>}
            </div>
        </div>
        </div>


    </div>
}