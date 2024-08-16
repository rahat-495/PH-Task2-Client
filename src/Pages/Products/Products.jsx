
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { TfiReload } from "react-icons/tfi";

const Products = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const [active, setActive] = useState(1);
    const [search, setSearch] = useState('');
    
    const {data : books = []} = useQuery({
        queryKey : ['books' , user?.email , active , search] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/products?currentPage=${active}&search=${search}`) ;
            return data ;
        }
    })

    const {data : count} = useQuery({
        queryKey : ['count' , user?.email] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get('/productsCount') ;
            return data ;
        }
    })

    const numberOfPages = Math.round(count?.count / 12) ;
    const pages = [...Array(numberOfPages > 0 && numberOfPages).keys()] ;

    const getItemProps = (index) =>
        ({
          variant: active === index ? "filled" : "text",
          color: "white",
          onClick: () => setActive(index),
        });
     
        const next = () => {
        if (active === pages.length) return;
        setActive(active + 1);
    };
     
    const prev = () => {
        if (active === 1) return;
        setActive(active - 1);
    };

    return (
        <div className="flex flex-col items-center gap-3 mb-16">
            
            <h1 className="gro text-4xl font-semibold mt-20">Products</h1>

            <div className="my-3 grid grid-cols-5 gap-3 w-full">
                <Input onChange={(e) => {setSearch(e.target.value) , setActive(1)}} name="search" label="Search" color="white" className="gro"/>

                <Select name="category" label="Filter By Category">
                    <Option>Material Tailwind HTML</Option>
                </Select>

                <Select name="brand" label="Filter By Brand">
                    <Option>Material Tailwind HTML</Option>
                </Select>

                <Select name="PriceRange" label="Filter By Price Range">
                    <Option>Material Tailwind HTML</Option>
                </Select>

                <div className="flex items-center gap-3">
                    <Select name="sortByPrice" label="Sort By Price">
                        <Option>Material Tailwind HTML</Option>
                    </Select>
                    <button className="bg-transparent border px-3 py-3 rounded-lg hover:border-gray-500 duration-300"><TfiReload /></button>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {
                    books?.map((book) => 
                    <div key={book?._id} className="h-full">
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

            <div className="flex items-center my-3 gap-4">

                <Button
                    variant="text"
                    className="flex gro capitalize text-lg text-white items-center gap-2"
                    onClick={prev}
                    disabled={active === 1}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>
                
                <div className="flex items-center gap-2">
                    {
                        pages.map((page) => <IconButton key={page} {...getItemProps(page + 1)}>{page + 1}</IconButton>)
                    }
                </div>

                <Button
                    variant="text"
                    className="flex gro capitalize text-lg text-white items-center gap-2"
                    onClick={next}
                    disabled={active === pages.length}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>

            </div>

        </div>
    );
};

export default Products;
