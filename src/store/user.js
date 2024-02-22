import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BACKEND_URL, {LOCALSTORAGEACCESSTOKENKEY, LOCALSTORAGEAUTHKEY, LOCALSTORAGEPROFILEKEY} from "../config";
import axios from "axios";

const userThunk = createAsyncThunk('user/registeruser', async (userData, thunkApi)=>{
  let data ;
  try{
    await axios.get(BACKEND_URL + '/auth', {
      headers:{
        Authorization:`Bearer ${userData}`
      }
    }).then((value)=>{
      data = value.data.message.data;
      localStorage.setItem(LOCALSTORAGEAUTHKEY, JSON.stringify(data));

    }).catch((error)=>{
      console.log(error)
      throw new Error('an error occured please try again')
    })
  }catch(e){
    return thunkApi.rejectWithValue(1)
  }
  console.log(data);
 return data
})

const profileThunk = createAsyncThunk('user/profile', async(userid, thunkApi)=>{
  let data;
  try{
    let accessToken  =localStorage.getItem(LOCALSTORAGEACCESSTOKENKEY);
        await axios.get(BACKEND_URL + '/profile/user/'+ userid, {
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        }).then((value)=>{
            console.log(value.data.message.profile)
            localStorage.setItem(LOCALSTORAGEPROFILEKEY, JSON.stringify(value.data.message.profile))
            data = value.data.message.profile;
        }).catch((err)=>{
          console.log(err)
          throw new Error('an error occured')
        })
        return data
  }catch(e){
    return thunkApi.rejectWithValue('an error occured')
  }
  
})
const userSlice = createSlice({
    name:'user',
    initialState:{
          user:{
            loading:false,
            fufiled:false,
            error:false,
            userid: "",
            email: "",
            role: "",
            isAdmin:false,
          },
          profile:{
              profileid:'',
              accountName:"",
              accountNumber:"",
              bank:"",
              briefBio:"",
              earning:"",
              mobileNumber:'',
              name:'',
              profilePicUrl:'', 
              loading:false,
              error:false,
              fufilled:false,
              websiteUrl:"",
              initials:""
          },
          address:{
            addr:'',
            city:'',
            zip:'',
            country:'',
            referrerCOde:''
          }
    },
    reducers:{

      registerUserAddress(state, {payload}){
        state.address.addr = payload.addr;
        state.address.city = payload.city;
        state.address.country = payload.country;
        state.address.referrerCOde = payload.referrerCOde;
        state.address.zip = payload.zip
      },

      registerUser(state, {payload}){
        state.user.userid = payload.id;
        state.user.role = payload.role;
        state.user.email = payload.email;
        state.user.isAdmin = payload.isAdmin;
      },
        registerUserProfile(state, {payload}){
          state.profile.accountName = payload.accountName;
          state.profile.accountNumber = payload.accountNumber;
          state.profile.bank = payload.bank;
          state.profile.briefBio = payload.briefBio;
          state.profile.earning = payload.earning;
          state.profile.profileid = payload.id;
          state.profile.mobileNumber = payload.mobileNumber;
          state.profile.name = payload.name;
          state.profile.profilePicUrl = payload.profilePicUri;
          state.profile.websiteUrl = payload.websiteLink;
          state.profile.error = false;
          state.profile.loading = false;
          state.profile.fufilled = true;
  
          let name = payload.name;
          let nameList = name.split(' ');
          let initial = '';
          console.log(name, nameList)
          nameList.forEach(element => {
            initial = element[0]
            
          });
  
          state.profile.initials = initial.toUpperCase()
          state.user.email = payload.userEmail;
          
        },
        resetProfile(state, {payload}){
          state.profile.error = false;
          state.profile.loading = false;
          state.profile.fufilled = false;
        },
        resetUser(state, {payload}){
          state.user.fufiled = false;
          state.user.error = false;
          state.user.loading = false
        }
    },


    extraReducers(builder){
      builder.addCase(userThunk.pending, (state, {payload})=>{
        state.user.loading = true;
        state.user.fufiled = false;
        state.user.error = false;
      });
      builder.addCase(userThunk.fulfilled, (state, {payload})=>{
        state.user.userid = payload.id;
        state.user.role = payload.role;
        state.user.email = payload.email;
        state.user.isAdmin = payload.isAdmin;
        state.user.fufiled = true;
        state.user.error = false;
        state.user.loading = false;

      });
      builder.addCase(userThunk.rejected, (state, {payload})=>{
        state.user.error = true;
        state.user.loading = false;
        state.user.fufiled = false;
      });
      
      builder.addCase(profileThunk.rejected, (state, {payload})=>{
        state.profile.error = true;
        state.profile.loading = false;
        state.profile.fufilled = false;
      });
      builder.addCase(profileThunk.fulfilled, (state, {payload})=>{
        state.profile.accountName = payload.accountName;
        state.profile.accountNumber = payload.accountNumber;
        state.profile.bank = payload.bank;
        state.profile.briefBio = payload.briefBio;
        state.profile.earning = payload.earning;
        state.profile.profileid = payload.id;
        state.profile.mobileNumber = payload.mobileNumber;
        state.profile.name = payload.name;
        state.profile.profilePicUrl = payload.profilePicUri;
        state.profile.websiteUrl = payload.websiteLink;
        state.profile.error = false;
        state.profile.loading = false;
        state.profile.fufilled = true;

        let name = payload.name;
        let nameList = name.split(' ');
        let initial = '';
        console.log(name, nameList)
        nameList.forEach(element => {
          initial = element[0]
          
        });

        state.profile.initials = initial.toUpperCase()
        state.user.email = payload.userEmail;
        
      
      });
      builder.addCase(profileThunk.pending, (state, {payload})=>{
        state.profile.error = false;
        state.profile.loading = true;
        state.profile.fufilled = false;
      });
    }
})

const userReducer = userSlice.reducer;
const {registerUserProfile, registerUser, resetProfile, resetUser, registerUserAddress}  = userSlice.actions
export default userReducer;
export {userThunk, profileThunk, registerUserProfile, registerUser, resetProfile, resetUser, registerUserAddress }