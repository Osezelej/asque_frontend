import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import {Home} from './pages/landing/landing'
import { SignUp } from './pages/auth/signUp';
import { SignIn } from './pages/auth/signIn';
import { ResetPassword } from './pages/auth/resetPassword';
import { RecoverPassword } from './pages/auth/recoverPassword';
import { MarketHome } from './pages/user/commerce/Home';
import { Shop } from './pages/user/commerce/shop';
import { Details } from './pages/user/commerce/detail';
import { Checkout } from './pages/user/commerce/checkout';
import { CheckoutSummary } from './pages/user/commerce/checkoutSummary';
import { MakePayment } from './pages/user/commerce/makePayment';
import { CardInput } from './pages/user/commerce/cardinput';
import { Album } from './pages/user/collection/album';
import { AlbumDesc } from './pages/user/collection/albumDesc';
import { StoryDesc } from './pages/user/collection/StoryDesc';
import { Profile } from './pages/profile/profile';
import { Referal } from './pages/user/userProfileItems/referal';
import { Support } from './pages/user/userProfileItems/support';
import { AdminHome} from './pages/admin/home';
import { CreatorHome } from './pages/creator/Home';
import { CreatorAlbum } from './pages/creator/creatorAlbumPage';
import { CreatorSale } from './pages/creator/creatorSalePage';
import { CreateStories } from './pages/creator/createStories';
import { ViewedPublished } from './pages/creator/viewPublished';
import { ProfileDetails } from './pages/creator/profileDetails';
import { EditProfileDetail } from './pages/creator/editProfileDetail';
import { Community } from './pages/user/commerce/community';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={<Home/>}/>
        <Route path='/auth/signup' element={<SignUp/>} />
        <Route path='/auth/signin' element={<SignIn/>} />
        <Route path='/auth/resetPassword' element={<ResetPassword/>} />
        <Route path='/auth/recoverPassword' element={<RecoverPassword/>}/>
        <Route path='/market/home' element={<MarketHome/>}/>
        <Route path='/market/shop' element={<Shop/>}/>
        <Route path='/market/detail/:itemID' element={<Details/>}/>
        <Route path='/market/cart' element={<Checkout/>}/>
        <Route path='/market/checkout' element={<CheckoutSummary/>}/>
        <Route path='/market/pay/:id' element={<MakePayment/>}/>
        <Route path='/:id/cardInput' element={<CardInput/>}/>
        <Route path='/collection' element={<Album/>}/>
        <Route path='/collection/:id' element={<AlbumDesc/>}/>
        <Route path='/collection/story/:id' element={<StoryDesc/>}/>
        <Route path='/profile-details' element={<ProfileDetails/>}/>
        <Route path='/profile-details/edit' element={<EditProfileDetail/>}/>
        <Route path='/profile/:user' element={<Profile/>} />
        <Route path='/referal/:user' element={<Referal/>}/>
        <Route path='/support' element={<Support/>}/>
        <Route path='/admin/' element={<AdminHome/>}/>
        <Route path='/creator/home' element={<CreatorHome/>}/>
        <Route path='/creator/submit/album' element={<CreatorAlbum/>}/>
        <Route path='/creator/submit/artwort' element={<CreatorSale/>}/>
        <Route path='/creator/submit/story' element={<CreateStories/>}/>
        <Route path='/creator/published' element={<ViewedPublished/>}/>
        <Route path='/community/:user' element={<Community/>}/>
      </Routes>
    </BrowserRouter>);
}

export default App;
