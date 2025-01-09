import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow_icon.png';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  const scrollToNewCollections = () => {
    const section = document.getElementById('new-collections');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='hero'>
      <div className="hero-left">
        <p>New Collections Available Now</p>
        <h2>Limited Time Only!</h2>

        <div className="hero-latest-btn" onClick={scrollToNewCollections}>
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="" />
        </div>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="" />
      </div>
    </div>
  );
};

export default Hero;
