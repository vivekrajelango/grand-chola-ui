import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


// import required modules
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useRouter } from "next/navigation";

const OffersPage = () => {
    const router = useRouter();

    return (
        <div className="my-4">
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                onClick={()=>router.push('/offers')}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide style={{width: '82%'}}>
                    <img src="/images/offers/1.png" className="rounded-lg" />
                </SwiperSlide>
                <SwiperSlide style={{width: '82%'}}>
                    <img src="/images/offers/3.png" className="rounded-lg" />
                </SwiperSlide>
                <SwiperSlide style={{width: '82%'}}>
                    <img src="/images/offers/2.png" className="rounded-lg" />
                </SwiperSlide>
                {/* <SwiperSlide style={{width: '82%'}}>
                    <img src="https://carousels-ads.swiggy.com/images/slider/4.jpg" className="rounded-lg" />
                </SwiperSlide> */}
            </Swiper>
        </div>
    );
}

export default OffersPage