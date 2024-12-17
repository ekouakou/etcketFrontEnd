import React, { useState, useEffect } from 'react';
import Splide from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { crudData } from '../../services/apiService';

const SliderComponent = ({ numberSlidesToShow, slideMargin,ImagelBaseUrl }) => {
  const date = JSON.parse(localStorage.getItem("appDate"));
  const mode = JSON.parse(localStorage.getItem("appMode"));
  const [sliderData, setData] = useState([]);

  function getImageName(imagePath) {
    // On divise la chaîne par les '/' et on prend le dernier élément
    const parts = imagePath.split('/');
    return parts[parts.length - 1];
}

  useEffect(() => {
    const params = {
      mode: mode.listBanniereMode,
      DT_BEGIN: date.firstDayOfYear, // 1er jour de l'année en cours
      DT_END: date.today, // la date du jour
    };

    crudData(params, "ConfigurationManager.php")
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    new Splide('.splide', {
      type: 'loop',
      autoplay: true,
      interval: 7000, // 7 secondes
      perPage: numberSlidesToShow || 1,
      pagination: false,
      arrows: true,
    }).mount();
  }, [sliderData, numberSlidesToShow]);

  return (
    <section className="home home--hero">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="hero splide splide--hero" id='banner-section'>
              <div className="splide__track">
                <ul className="splide__list">
                  {sliderData && sliderData.map((image, index) => (
                    <li className="splide__slide" key={index}>
                      <img src={getImageName(image.STR_BANPATH) === "" ? 'assets/img/bg/slide__bg-2.jpg':  ImagelBaseUrl + image.STR_BANPATH }  className='w-100' />
                      {/* <div
                        className="hero__slide"
                        data-bg={{ backgroundImage: `url(${getImageName(image.STR_BANPATH) === "" ? 'assets/img/bg/slide__bg-2.jpg':  ImagelBaseUrl + image.STR_BANPATH })` }}
                        style={{ backgroundImage: `url(${getImageName(image.STR_BANPATH) === "" ? 'assets/img/bg/slide__bg-2.jpg':  ImagelBaseUrl + image.STR_BANPATH })` , backgroundRepeat:'no-repeat', backgroundSize:'cover'}}
                        alt={image.STR_BANPATH}
                      >
                        <div className="hero__content">
                          <h2 className="hero__title">
                            Savage Beauty <sub className="green">9.8</sub>
                          </h2>
                          <p className="hero__text">
                            A brilliant scientist discovers a way to harness the power of the ocean's currents
                            to create a new, renewable energy source. But when her groundbreaking technology
                            falls into the wrong hands, she must race against time to stop it from being used for evil.
                          </p>
                          <p className="hero__category">
                            <a href="#">Action</a>
                            <a href="#">Drama</a>
                            <a href="#">Comedy</a>
                          </p>
                          <div className="hero__actions">
                            <a href="details.html" className="hero__btn">
                              <span>Watch now</span>
                            </a>
                          </div>
                        </div>
                      </div> */}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderComponent;
