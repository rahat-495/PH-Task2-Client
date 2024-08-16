
import { Button, CardBody, CardFooter, Checkbox, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import { ToastContainer , toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LoginC = ({location}) => {

    const axiosSecure = useAxiosSecure() ;
    const { signIn , googleLogin } = useAuth() ;
    const navigate = useNavigate() ;
    const [eye , setEye] = useState(false) ;
    const [remember , setRemember] = useState(false) ;
    const [errorText , setErrorText] = useState('') ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;
    
        const form = e.target ;
        const email = form.email.value ;
        const pass = form.password.value ;
    
        if(remember){
          signIn(email , pass) 
          .then((result) => {
            console.log(result);
            form.reset() ;
            toast.success('Login Success Fully !') ;

            const userInfo = {
              name : result?.user?.displayName ,
              email : result?.user?.email ,
              image: result?.user?.photoURL,
              role : "student" ,
              isBlock : false ,
              isFired : false ,
            }

            axiosSecure.put('/createUser' , userInfo)
            .then((result) => {
              console.log(result) ;
            })
  
            setTimeout(() => {
              if(location.state){
                navigate(location.state) ;
              }
              else{
                navigate('/') ;
              }
            }, 1000);
  
          })
          .catch((error) => {
            console.log(error.message);
            if(error.message.includes('Firebase: Error (auth/invalid-credential).')){
              toast.error("Password Isn't Match") ;
            }
            else if(error.message.includes("Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).")){
              toast.error("This account has been temporarily disabled !") ;
            }
          })
        }
        else{
          setErrorText('Please Accept Our Turms & Condition !') ;
        }
    }

    const handleGoogleLogin = () => {
      googleLogin()
      .then( async (result) => {

        console.log(result);  
        toast.success('Login Success Fully !') ;
        
        const userInfo = {
          name : result?.user?.displayName ,
          email : result?.user?.email ,
          image: result?.user?.photoURL,
          role : "student" ,
          isBlock : false ,
          isFired : false ,
        }

        axiosSecure.put('/createUser' , userInfo)
        .then((result) => {
          console.log(result) ;
        })

        setTimeout(() => {
          if(location.state){
            navigate(location.state) ;
          }
          else{
            navigate('/') ;
          }
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      })
    }

  return (
    <div>
      <CardBody className="flex px-0 flex-col">
        <form onSubmit={handleSubmit} className="flex mx-0 flex-col gap-3">
          <Input required name="email" label="Email" size="lg" />
          <div className="relative">
            {eye ? (
              <IoMdEyeOff
                onClick={() => setEye(!eye)}
                className="cursor-pointer text-2xl absolute z-10 top-[10px] right-2"
              />
            ) : (
              <IoMdEye
                onClick={() => setEye(!eye)}
                className="cursor-pointer text-2xl absolute z-10 top-[10px] right-2"
              />
            )}
            <Input
              className="z-0"
              type={eye ? "text" : "password"}
              name="password"
              label="Password"
              size="lg"
              required
            />
          </div>

            <div className="-ml-2.5">
              <Checkbox
                onClick={() => setRemember(!remember)}
                label="Turms & Condition"
              />
            </div>

            <div>
              {remember ? (
                <p></p>
              ) : (
                <p className="text-red-800 font-semibold">{errorText}</p>
              )}
            </div>

          <input
            type="submit"
            className="w-full btn text-gray-800 hover:text-white btn-outline hover:bg-[#393939]"
            value={"Log In"}
          />

          <div className="divider">OR</div>

          <Button onClick={handleGoogleLogin} className="text-lg gap-3 justify-center flex items-center bg-transparent text-black border border-[#343434] hover:shadow-none">
              <FcGoogle  className="text-2xl"/>
              <p className="text-base">Login With Google</p>
          </Button>

        </form>
      </CardBody>

      <CardFooter className="pt-0 mx-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Link
            className="text-blue-gray-900 font-bold mx-1 hover:underline"
            to={"/signUp"}
          >
            Sign Up
          </Link>
        </Typography>
      </CardFooter>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginC;
