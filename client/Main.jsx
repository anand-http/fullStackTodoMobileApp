import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Login from './screens/login';
import Footer from './components/footer';
import Profile from './screens/profile';
import Register from './screens/register';
import CameraComponent from './screens/camera';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile } from './redux/action/auth';
import Loader from './components/loader';
import ChangePassword from './screens/changePassword';
import ForgetPassword from './screens/forgetPassword';
import Verify from './screens/verify';
import ResetPassword from './screens/resetPassword';


const stack = createNativeStackNavigator();



const Main = () => {
    const dispatch = useDispatch();

    const { isAuthenticated, isLoading } = useSelector(state => state.auth);


    useEffect(() => {

        dispatch(getMyProfile())


    }, [dispatch, getMyProfile]);


    return (
        isLoading ? <Loader /> : <NavigationContainer>

            <stack.Navigator initialRouteName={isAuthenticated ? "home" : "login"} screenOptions={{ headerShown: false }} >

                <stack.Screen name="home" component={Home} />


                <stack.Screen name="login" component={Login} />


                <stack.Screen name="camera" component={CameraComponent} />

                <stack.Screen name='forget-password' component={ForgetPassword} />

                <stack.Screen name='reset-password' component={ResetPassword} />



                <stack.Screen name='change-password' component={ChangePassword} />


                <stack.Screen name="register" component={Register} />


                <stack.Screen name="verify" component={Verify} />

                <stack.Screen name='profile' component={Profile} />

            </stack.Navigator>
            {
                isAuthenticated && <Footer />
            }


        </NavigationContainer>
    )
}

export default Main;