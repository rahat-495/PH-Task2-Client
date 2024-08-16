
import {createBrowserRouter} from 'react-router-dom' ;
import Root from '../Layout/Root';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Register/SignUp';
import Products from '../Pages/Products/Products';

const router = createBrowserRouter([
    {
        path : '/' ,
        element : <Root/>,
        children : [
            {
                path : '/' ,
                element : <Home/> ,
            },
            {
                path : '/login' ,
                element : <Login/> ,
            },
            {
                path : '/signUp' ,
                element : <SignUp/> ,
            },
            {
                path : '/products' ,
                element : <Products/> ,
            },
        ] 
    }
])

export default router;
