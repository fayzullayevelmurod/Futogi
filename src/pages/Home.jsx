import { useEffect, useRef} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import assets from "../assets";
import { Link } from "react-router-dom";

export const Home = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.navigation.init();
      swiperRef.current.swiper.navigation.update();
    }
  }, []);

  const goPrev = () => {
    if (swiperRef.current !== null && swiperRef.current.swiper !== null) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const goNext = () => {
    if (swiperRef.current !== null && swiperRef.current.swiper !== null) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <section className="home">
        <img className="top_gradient" src={assets.topGradient} alt="" />
        <div className="home_container">
          <button className="home-button-prev" onClick={goPrev}>
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.036 0.0909843L0.505355 15.3896C0.346725 15.5278 0.219506 15.6988 0.132315 15.8909C0.0451244 16.0829 0 16.2916 0 16.5027C0 16.7138 0.0451244 16.9225 0.132315 17.1146C0.219506 17.3066 0.346725 17.4776 0.505355 17.6159L18.036 32.9098C18.0888 32.9561 18.1537 32.986 18.223 32.9962C18.2923 33.0063 18.3631 32.9962 18.4268 32.9671C18.4906 32.9379 18.5446 32.891 18.5826 32.8318C18.6206 32.7726 18.6408 32.7037 18.6409 32.6333V28.8997C18.6409 28.6876 18.5493 28.4848 18.3889 28.3419L6.82554 18.252L32.6333 18.252C32.835 18.252 33 18.086 33 17.8832V15.1176C33 14.9148 32.835 14.7488 32.6333 14.7488L6.82554 14.7488L18.3889 4.65889C18.5493 4.52061 18.6409 4.31779 18.6409 4.10115V0.367546C18.6409 0.0541077 18.2743 -0.11644 18.036 0.0909843Z"
                fill="white"
                fillOpacity="0.45"
              />
            </svg>
          </button>

          <Swiper
            ref={swiperRef}
            className="homeSwiper"
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: ".home-button-prev",
              nextEl: ".home-button-next",
            }}
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
          >
            <SwiperSlide>
              <img src={assets.homeSlider} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={assets.homeSlider} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={assets.homeSlider} alt="" />
            </SwiperSlide>
          </Swiper>

          <button className="home-button-next" onClick={goNext}>
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.964 32.909L32.4946 17.6104C32.6533 17.4722 32.7805 17.3012 32.8677 17.1091C32.9549 16.9171 33 16.7084 33 16.4973C33 16.2862 32.9549 16.0775 32.8677 15.8854C32.7805 15.6934 32.6533 15.5224 32.4946 15.3841L14.964 0.0901615C14.9112 0.0439462 14.8463 0.0139801 14.777 0.00383316C14.7077 -0.0063138 14.6369 0.00378579 14.5732 0.0329288C14.5094 0.0620718 14.4554 0.10903 14.4174 0.16821C14.3794 0.22739 14.3592 0.296298 14.3591 0.366725V4.10033C14.3591 4.31236 14.4507 4.51518 14.6111 4.65807L26.1745 14.748L0.366653 14.748C0.164993 14.748 0 14.914 0 15.1168V17.8824C0 18.0852 0.164993 18.2512 0.366653 18.2512L26.1745 18.2512L14.6111 28.3411C14.4507 28.4794 14.3591 28.6822 14.3591 28.8988V32.6325C14.3591 32.9459 14.7257 33.1164 14.964 32.909Z"
                fill="white"
                fillOpacity="0.45"
              />
            </svg>
          </button>
        </div>
      </section>
      <section className="products">
        <img className="gradient_big" src={assets.gradientBig} alt="" />
        <img
          className="gradient_big_media"
          src={assets.gradientBigMedia}
          alt=""
        />
        <div className="products_in desktop_block">
          <div className="products_left">
            <Link to="/products" className="products_block product_one">
              <img src={assets.product2} alt="" />
              <h6>СЕТЫ</h6>
            </Link>
            <div className="products_blocks">
              <Link
                to="/products"
                className="products_block mini_block product_blocks_in"
              >
                <img src={assets.product2} alt="" />
                <h6>
                  ГОРЯЧИЕ
                  <br /> РОЛЛЫ
                </h6>
              </Link>
              <div className="products_blocks_two product_blocks_in">
                <Link to="/products" className="products_block">
                  <img src={assets.product3} alt="" />
                  <h6>ПИЦЦА</h6>
                </Link>
                <Link to="/products" className="products_block">
                  <img src={assets.product4} alt="" />
                  <h6>ВОК</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className="products_right">
            <div className="products_blocks">
              <Link to="/products" className="products_block product_blocks_in">
                <img src={assets.product5} alt="" />
                <h6>ХОЛОДНЫЕ РОЛЛЫ</h6>
              </Link>
              <div className="products_blocks_two product_blocks_in">
                <Link to="/products" className="products_block mini_block">
                  <img src={assets.product6} alt="" />
                  <h6>
                    СЯКИ
                    <br /> МАКИ
                  </h6>
                </Link>
                <Link to="/products" className="products_block mini_block">
                  <img src={assets.product7} alt="" />
                  <h6>
                    ФАСТ
                    <br />
                    ФУД
                  </h6>
                </Link>
              </div>
            </div>
            <Link to="/products" className="products_block product_one">
              <img src={assets.product8} alt="" />
              <h6>НАПИТКИ</h6>
            </Link>
          </div>
        </div>
        <div className="products_in desktop_media">
          <div className="products_left">
            <Link to="/products" className="products_block product_one">
              <img src={assets.productMedia1} alt="" />
              <h6>
                ЖАРЕННЫЕ
                <br />
                РОЛЛЫ
              </h6>
            </Link>
            <div className="products_blocks">
              <Link
                to="/products"
                className="products_block mini_block product_blocks_in"
              >
                <img src={assets.productMedia5} alt="" />
                <h6>
                  ХОЛОДНЫЕ
                  <br />
                  РОЛЛЫ
                </h6>
              </Link>
              <div className="products_blocks_two product_blocks_in">
                <Link to="/products" className="products_block">
                  <img src={assets.productMedia2} alt="" />
                  <h6>
                    СЯКИ
                    <br /> МАКИ
                  </h6>
                </Link>
                <Link to="/products" className="products_block">
                  <img src={assets.productMedia4} alt="" />
                  <h6>ВОК</h6>
                </Link>
              </div>
            </div>
          </div>
          <div className="products_right">
            <div className="products_blocks">
              <div className="products_blocks">
                <Link
                  to="/products"
                  className="products_block mini_block product_blocks_in"
                >
                  <img src={assets.productMedia2} alt="" />
                  <h6>
                    ЗАПЕЧЁННЫЕ
                    <br />
                    РОЛЛЫ
                  </h6>
                </Link>
                <div className="products_blocks_two product_blocks_in">
                  <Link to="/products" className="products_block">
                    <img src={assets.productMedia3} alt="" />
                    <h6>ПИЦЦА</h6>
                  </Link>
                  <Link to="/products" className="products_block">
                    <img src={assets.productMedia7} alt="" />
                    <h6>
                      ФАСТ
                      <br />
                      ФУД
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/products" className="products_block product_one">
              <img src={assets.product8} alt="" />
              <h6>НАПИТКИ</h6>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
