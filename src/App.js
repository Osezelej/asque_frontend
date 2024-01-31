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
      </Routes>
    </BrowserRouter>);
}

export default App;
