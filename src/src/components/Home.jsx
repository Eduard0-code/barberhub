import Header from "./Header";
import MenuLateral from "./MenuLateral";
import Footer from "./Footer";
import "./Home.css";

const Home = () => {
  return (
    <>
    
    <Header />
    <div className="home-container">
    <MenuLateral />
    </div>
    <Footer />
    </>

  )
}
export default Home;