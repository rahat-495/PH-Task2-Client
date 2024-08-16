
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from "@material-tailwind/react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const ProductsSec = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;

    const {data : books = []} = useQuery({
        queryKey : ['books' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get('/products') ;
            return data ;
        }
    })

    return (
        <div className="w-full flex flex-col items-center gap-3 mb-20">
            
            <h1 className="gro text-4xl text-white text-center mb-10">Products</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                {
                    books?.slice(0,8)?.map((book) => 
                    <div className="h-full">
                        <Card className="mt-6 h-full relative w-[350px]">
                            <CardHeader color="blue-gray" className="relative h-56 mt-8">
                                <img
                                className="w-fit mx-auto h-full"
                                src={book?.coverImage}
                                alt="card-image"
                                />
                            </CardHeader>
                            <CardBody className="mb-6">
                                
                                <h1 className="gro text-lg text-black font-semibold">{book?.bookTitle}</h1>
                                <p className="gro text-lg text-black">{book?.description}</p>
                                <div className="flex items-center justify-between">
                                    <p className="gro text-lg text-black"><span className="font-semibold">Price :</span>${book?.price}</p>
                                    <p className="gro text-lg text-black flex items-center gap-1"><span className="font-semibold">Rating :</span>{book?.ratings} <FaStar className="text-orange-600"/></p>
                                </div>
                                <p className="gro text-lg text-black"><span className="font-semibold">Category :</span> {book?.category}</p>
                                <p className="gro text-lg text-black"><span className="font-semibold">Creation Date : </span> {book?.creationDate.slice(0 , 10)}</p>
                                <p className="gro text-lg text-black"><span className="font-semibold">Creation Time : </span> {book?.creationDate.slice(11)}</p>

                            </CardBody>
                            <CardFooter className="pt-0 absolute w-full bottom-0">
                                <Link to={'/products'} className=""><Button className="w-full capitalize gro ">Read More</Button></Link>
                            </CardFooter>
                        </Card>
                    </div>)
                }
            </div>

            <Link to={'/products'} className="btn btn-outline gro">Sea All</Link>
            
        </div>
    );
};

export default ProductsSec;
