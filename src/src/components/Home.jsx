import "./Home.css";

import { Calendar, Scissors, ShieldCheck, Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "./Header";
import Footer from "./Footer";
import MenuLateral from "./MenuLateral";

const Home = () => {
  const cortes = [
    "/images/corte1.avif",
    "/images/corte2.avif",
    "/images/corte3.avif",
    "/images/corte4.avif",
    "/images/corte5.avif",
  ];
  const swiperRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      swiperRef.current?.update();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Header />
      <div className="home-container">
        <MenuLateral />
        <section className="hero-section">
          <span className="hero-subtitle">BEM-VINDO AO BARBER HUB</span>

          <h1>Estilo que combina com você.</h1>

          <p>
            Descubra cortes modernos, clássicos e personalizados feitos para
            realçar sua melhor versão.
          </p>

          <div className="slider-wrapper">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              slidesPerView={3}
              centeredSlides
              spaceBetween={30}
              loop
              navigation
              observer={true}
              observeParents={true}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3000,
              }}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
              }}
            >
              {cortes.map((imagem, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={imagem}
                    alt={`Corte ${index}`}
                    className="slide-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="beneficios-grid">
          <div className="beneficio-card">
            <Scissors size={32} />

            <h3>Profissionais Especializados</h3>

            <p>Barbeiros experientes e apaixonados pelo que fazem.</p>
          </div>

          <div className="beneficio-card">
            <Calendar size={32} />

            <h3>Agendamento Fácil</h3>

            <p>Marque seu horário de forma rápida e prática.</p>
          </div>

          <div className="beneficio-card">
            <Star size={32} />

            <h3>Avaliações de Clientes</h3>

            <p>Veja opiniões reais antes de escolher.</p>
          </div>

          <div className="beneficio-card">
            <ShieldCheck size={32} />

            <h3>Ambiente Premium</h3>

            <p>Conforto e atendimento diferenciado.</p>
          </div>
        </section>

        <section className="cta-card">
          <div>
            <h2>Pronto para renovar seu estilo?</h2>

            <p>Agende agora e viva a experiência Barber Hub.</p>

            <p>9:00 - 19:00</p>
          </div>
          <Link to="/agendamento-cliente">
            <button>Agendar Horário</button>
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
