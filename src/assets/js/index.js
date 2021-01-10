require('../scss/main.scss');
require('./modules/scroll.js');
import { tsParticles } from "tsparticles";

tsParticles
  .loadJSON("ts-1", "./tsparticles/hero-particles.json")
  .then((container) => {
  })
  .catch((error) => {
    console.error(error);
  })