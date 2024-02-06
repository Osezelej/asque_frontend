import Carousel from 'react-material-ui-carousel';
import Africa from '../../assets/africa 1.png';
import image1 from '../../assets/image1.png';
import image2 from '../../assets/image2.png';
import image3 from '../../assets/image3.png';
import image4 from '../../assets/image4.png';
import landing1 from '../../assets/landing1.png';
import landing2 from '../../assets/landing2.png';
import landing3 from '../../assets/landing3.png';
import landing4 from '../../assets/landing4.png';
import { useNavigate } from 'react-router-dom';
import '../../css/landing.css'
export function Home(){
    const navigate = useNavigate();

    const imageArray = [image1, image2, image3, image4];

    const landingArray = [
        {
            image:landing1,
            preTagline:'At Asque you can',
            tagline:'Discover',
            taglineDesc:"Explore Africa's cultural, social, and societal landscape through well curated stories and photo collections"
        },
        {
            image:landing2,
            preTagline:'Also get to seamlessly',
            tagline:'Shop',
            taglineDesc:"Discover and shop the best of African art from a repository of premium sculptures, canvas paintings, photographs, and more"
        },
        {
            image:landing3,
            preTagline:'We create opportunities for you to',
            tagline:'Earn',
            taglineDesc:"Earn attractive commissions while at it by inviting friends and family to the experience"
        },
        {
            image:landing4,
            preTagline:'And have access to',
            tagline:'Community',
            taglineDesc:"Connect with a community of fellow Africa enthusiasts"
        }
    ]

    return<div>
         <div className="landing-page-main-body home-page-body">
            <div style={{overflowY:'scroll'}}>
                <div className="landing-page-header" style={{
                    height:90,
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <div className="landing-header-image-signin-signup-container">
                        <div className="header-image-container">
                            <img src={Africa} height={26} width={25}/>
                        </div>
                        <div className='auth-button-container'>
                            <button className='auth-outline-button' onClick={()=>navigate('/auth/signin')}>
                                Sign in
                            </button>
                            <button className='auth-filled-button' onClick={()=>navigate('/auth/signup')}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
                <div className='landing-hero-section'>
                    <div className='company-name-desc-container'>
                        <h1>ASQUE</h1>
                        <p>Discover, explore and interact with africa's cultural, social, and societal landscape</p>
                    </div>
                    <div className='header-carousel-container'>
                        <Carousel>
                            { imageArray.map((value)=><div className='header-carousel-image-container'>
                                <img src={image4}/>
                                <img src={image3}/>
                                <img src={image2}/>
                            </div>)}
                        </Carousel>
                    </div>
                </div>
                <div className='landing-main-content-container'>
                    {
                        landingArray.map((value, key)=><div className='landing-content-container' key={key}>
                            <div className='landing-image-container'>
                                <img src={value.image}/>
                            </div>
                            <div className='preTagline-tagline-tagline-desc-container'>
                                <div className='preTagline-container'>
                                    <p>{value.preTagline}</p>
                                </div>
                                <div className='tagline-title'>
                                    <p>{value.tagline}</p>
                                </div>
                                <div className='tagline-desc'>
                                    <p>{value.taglineDesc}</p>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
               
            </div>
            
    </div>
    <div className='landing-page-bottom'>
                <div className='footer-container-tagline'>
                    <p>Let{"'"}s stay connected, connect with us through our handles</p>
                </div>
                <div className='contact-us-profile'>
                    <p>Linkedin</p>
                </div>
                <div className='contact-us-profile'>
                    <p>Email</p>
                </div>
                <div className='contact-us-profile'>
                    <p>Instagram</p>
                </div>
                <div className='contact-us-profile'>
                    <p>twiter</p>
                </div>
            </div>
    </div>
}