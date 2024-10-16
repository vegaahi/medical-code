import React from "react";
import Carousel from "./Carousel";
import Cards from "./Card";
import Imgvideo from "./Imgvideo";
import Contact from "./Contact";
import AfterLogin from "./AfterLogin";
import img from '../Assets/homeo.jpg';


const Landing = () => {
  return (
    <div>
      <Carousel />
      <div className="d-flex justify-content-around flex-wrap mt-5 mb-5 gap-3">
        <Cards
          icon={<i className="fa-solid fa-unlock fa-5x text-white p-3"></i>}
          name="FULL ACCESS"
          cardtext="Unlock unlimited access to a wealth of resources designed to enhance your learning experience.  "
          readmore="Read more"
        />
        <Cards
          icon={<i className="fa-solid fa-money-bill fa-5x text-white p-3"></i>}
          name="MONTHLY SUBSCRIPTION"
          cardtext="Subscribe monthly to gain flexible access to all our premium content.Enjoy the freedom to learn at your own pace"
          readmore="Read more"
        />
        <Cards
          icon={<i className="fa-solid fa-file fa-5x text-white p-3"></i>}
          name="BUY A CHAPTER"
          cardtext="Purchase individual chapters to gain access to focused content tailored to your learning needs, our chapter purchase option offers flexibility and value"
          readmore="Read more"
        />
      </div>
      {/* <AfterLogin
        img={img}
        title={"The essentials of materia medica"}
        auther={"Shiva Kumar Reddy Methuku"}
        price={"$29.99"}
      /> */}
      <Imgvideo />
      <Contact />
    </div>
  );
};

export default Landing;
