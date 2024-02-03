import { useNavigate } from "react-router-dom"
import book from '../../assets/book.png';
import camera from '../../assets/Camera 2.png';
import { ProfileItem } from "../../components/profileItem";
export function CreatorHome(){

    const navigate = useNavigate();
    const iconArray = [
        {
            leadingIcon:camera,
            title:'Art works',
            subText:'List artwork for sale or simply share your great sights of Africa',
            link:'',
            from:'creator',
            isArtwork:true
        },
        {
            leadingIcon:book,
            title:'Stories',
            subText:'A global audience is eager to know, share thoughts',
            link:'',
            from:'creator',
            isArtwork:false
        },
      
    ]

    return <div className="creator-home-main-body home-page-body">
        <div style={{overflowY:'scroll'}}>
            <div className="home-header-container ">
                <div className="home-name-greeting-container">
                    <h3>Blessed</h3>
                    <p>welcome back creator</p>
                </div>
                <div className="home-cart-profile-pic-container">
                    <p onClick={()=>navigate('/profile/blessed')}>BO</p>
                </div>
            </div>
            <div className="trending-artwork-container">
                    <h4>Create: List artwork and share stories</h4>
            </div>
            <div className="creator-detail-item-container">
            {
                iconArray.map((value)=><ProfileItem 
                    LeadingIcon={value.leadingIcon}
                    textTitle={value.title}
                    subTextTitle={value.subText}
                    link={value.link}
                    from = {value.from}
                    isArtwork={value.isArtwork}
                />)
            }
            </div>
        </div>

    </div>
}