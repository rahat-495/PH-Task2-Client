
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FaRotate } from "react-icons/fa6";

const Products = () => {

    const {user} = useAuth() ;
    const axiosSecure = useAxiosSecure() ;
    const [active , setActive] = useState(1);
    const [search , setSearch] = useState('');
    const [category , setCategory] = useState('');
    const [brand , setBrand] = useState('');
    const [price , setPrice] = useState('');
    const [priceSort , setPSort] = useState('');
    const [reset , setReset] = useState(false);
    const [pages , setPages] = useState([]);
    
    const {data : books = []} = useQuery({
        queryKey : ['books' , user?.email , active , search , category , brand , price , priceSort] ,
        queryFn : async () => {
            const {data} = await axiosSecure.get(`/products?currentPage=${active}&search=${search}&category=${category}&brand=${brand}&price=${price}&priceSort=${priceSort}`) ;
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

    useEffect(() => {
        if(search || category || brand || price || priceSort){
            const numberOfPages = Math.round(books?.count / 8) ;
            const pages = [...Array(numberOfPages > 0 && numberOfPages).keys()] ;
            setPages(pages) ;
        }
        else{
            const numberOfPages = Math.round(count?.count / 8) ;
            const pages = [...Array(numberOfPages > 0 && numberOfPages).keys()] ;
            setPages(pages) ;
        }
    } , [search , category , brand , price , priceSort , count?.count , books])

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

    const handleReset = () => {
        setBrand('') ;
        setCategory('') ;
        setPSort('') ;
        setPrice('') ;
        setSearch('') ;    
        setReset(false) ;
    }

    return (
        <div className="flex flex-col items-center gap-3 mb-16 mx-3 lg:mx-0">
            
            <h1 className="gro text-4xl font-semibold mt-20">Products</h1>

            <div className="my-3 grid grid-cols-1 lg:grid-cols-5 gap-3 w-full">
                <Input value={search} onChange={(e) => {setSearch(e.target.value) , setActive(1)}} name="search" label="Search" color="white" className="gro"/>

                <Select value={category} onChange={(e) => {setCategory(e) , setActive(1)}} name="category" label="Filter By Category">
                    <Option value="Web Development">Web Development</Option>
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Artificial Intelligence">Artificial Intelligence</Option>
                    <Option value="Data Science">Data Science</Option>
                    <Option value="Programming">Programming</Option>
                </Select>

                <Select value={brand} onChange={(e) => {setBrand(e) , setActive(1)}} name="brand" label="Filter By Brand">
                    <Option value="Tech Books Publishing">Tech Books Publishing</Option>
                    <Option value="Big Nerd Ranch">Big Nerd Ranch</Option>
                    <Option value="Addison-Wesley">Addison-Wesley</Option>
                    <Option value="Prentice Hall">Prentice Hall</Option>
                    <Option value="O'Reilly Media">O'Reilly Media</Option>
                </Select>

                <Select value={price} onChange={(e) => {setPrice(e) , setActive(1)}} name="PriceRange" label="Filter By Price Range">
                    <Option value="00 - 10">$ 01 - 10</Option>
                    <Option value="11 - 20">$ 11 - 20</Option>
                    <Option value="21 - 30">$ 21 - 30</Option>
                    <Option value="31 - 40">$ 31 - 40</Option>
                    <Option value="41 - 50">$ 41 - 50</Option>
                    <Option value="51 - 60">$ 51 - 60</Option>
                    <Option value="61 - 70">$ 61 - 70</Option>
                </Select>

                <div className="flex items-center gap-3">
                    <Select value={priceSort} onChange={(e) => {setPSort(e) , setActive(1)}} name="sortByPrice" label="Sort By Price">
                        <Option value="High To Low">High To Low</Option>
                        <Option value="Low To High">Low To High</Option>
                    </Select>
                    <button onClick={() => {handleReset() , setReset(true) , setTimeout(() => (setReset(false)) , 450)}} className="bg-transparent border px-3 py-3 rounded-lg hover:border-gray-500 duration-300">{ reset ? <FaRotate className="animate-spin"/> : <FaRotate /> }</button>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {
                    search || category || brand || price ?
                    books?.result?.map((book) => 
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
                                <p className="gro text-lg text-black"><span className="font-semibold">Brand : </span> {book?.brandName}</p>

                            </CardBody>
                            <CardFooter className="pt-0 absolute w-full bottom-0">
                                <Link to={'/products'} className=""><Button className="w-full capitalize gro ">Read More</Button></Link>
                            </CardFooter>
                        </Card>
                    </div>) : 
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
                                <p className="gro text-lg text-black"><span className="font-semibold">Brand : </span> {book?.brandName}</p>

                            </CardBody>
                            <CardFooter className="pt-0 absolute w-full bottom-0">
                                <Link to={'/products'} className=""><Button className="w-full capitalize gro ">Read More</Button></Link>
                            </CardFooter>
                        </Card>
                    </div>) 
                }
            </div>

            <div className="flex-col items-start lg:flex-row flex lg:items-center my-3 gap-1 lg:gap-4">

                <Button
                    variant="text"
                    className="flex gro capitalize text-lg text-white items-center gap-2 -ml-5 lg:-ml-0"
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
                    className="flex gro capitalize text-lg text-white items-center gap-2 ml-[260px] lg:ml-0"
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
