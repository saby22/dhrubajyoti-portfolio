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

tsParticles
  .loadJSON("ts-2", "./tsparticles/education-particles.json")
  .then((container) => {
  })
  .catch((error) => {
    console.error(error);
  })