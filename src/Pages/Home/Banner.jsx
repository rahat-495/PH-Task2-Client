import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation , Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <div className="mx-3 lg:mx-0">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={true}
        grabCursor={true}
        modules={[Parallax, Pagination, Navigation , Autoplay]}
        className="mySwiper h-[350px] lg:h-[650px] mb-20"
      >

        <div
          slot="container-start"
          className="parallax-bg w-full h-[350px] lg:h-[650px] bg-no-repeat bg-cover absolute bg-[url('https://cms.nvctrading.com/app/uploads/2017/12/online-shopping.jpg')]"
          data-swiper-parallax="-5%"
        ></div>

        <SwiperSlide>
          <div className="title bg-black text-white bg-opacity-30" data-swiper-parallax="-300">
            <div className="hero flex flex-col items-center justify-center min-h-[350px] lg:min-h-[650px]">
              <div className="hero-content text-center">
                <div className="max-w-lg gro">
                  <h1 className="text-xl lg:text-4xl font-bold gro">Welcome to Product Mart</h1>
                  <p className="py-6">
                    Empowering educators and students with a streamlined school management system. Simplify administrative tasks and enhance learning experiences.
                  </p>
                  <p className="hidden lg:flex py-2">
                    Our platform is designed to provide a user-friendly experience, ensuring that all your school management needs are met with efficiency and ease.
                  </p>
                  <p className="py-2">
                    Join the growing number of schools that are transforming their operations with EduManage. Discover the difference today.
                  </p>
                  <button className="btn btn-primary">Discover More</button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="title bg-black text-white bg-opacity-30" data-swiper-parallax="-300">
            <div className="hero flex flex-col items-center justify-center min-h-[350px] lg:min-h-[650px]">
              <div className="hero-content text-center">
                <div className="max-w-lg gro">
                  <h1 className="text-xl lg:text-4xl font-bold gro">Efficient Management</h1>
                  <p className="py-6">
                    Manage student records, staff information, and daily operations seamlessly. Experience the power of efficient school management.
                  </p>
                  <p className="hidden lg:flex py-2">
                    Our system is built to handle the complexities of school administration, allowing you to focus on what matters most—education.
                  </p>
                  <p className="py-2">
                    With intuitive features and robust functionality, EduManage is your partner in achieving excellence in school management.
                  </p>
                  <button className="btn btn-primary">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="title bg-black text-white bg-opacity-30" data-swiper-parallax="-300">
            <div className="hero flex flex-col items-center justify-center min-h-[350px] lg:min-h-[650px]">
              <div className="hero-content text-center">
                <div className="max-w-lg gro">
                  <h1 className="text-xl lg:text-4xl font-bold gro">Innovative Features</h1>
                  <p className="py-6">
                    From attendance tracking to grade management, our system offers a range of innovative features designed to support modern educational needs.
                  </p>
                  <p className="py-2 hidden lg:flex">
                    Stay ahead with our cutting-edge technology that brings simplicity and efficiency to school administration.
                  </p>
                  <p className="py-2">
                    Discover how our features can transform your schools operations and enhance the learning experience for everyone involved.
                  </p>
                  <button className="btn btn-primary">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>
    </div>
  );
};

export default Banner;
