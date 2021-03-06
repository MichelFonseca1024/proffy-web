import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import landingImg from '../../assets/images/landing.svg';
import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import api from '../../services/api';

function Landing() {
  const [totalConnnections, setTotalConnnections] = useState(0);

  useEffect(() => {
    api.get('/connections').then(async (response) => {
      const { total } = response.data;
      await setTotalConnnections(total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-baner">
        <div id="page-landing-content" className="container">
          <div className="logo-container">
            <img src={logoImg} alt="Proffy" />
            <h2>Sua Plataforma de estudos online.</h2>
          </div>

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </div>
      </div>

      <div id="page-landing-options" className="container">
        <span className="welcome">
          Sejam bem vindo. <br />
          <strong>O que deseja fazer?</strong>
        </span>
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="Dar Aulas" />
            Dar Aulas
          </Link>
        </div>

        <span className="total-connections">
          Total de {totalConnnections} conexões ja realizadas
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
      </div>
    </div>
  );
}

export default Landing;
