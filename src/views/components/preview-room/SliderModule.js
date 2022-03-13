import SwiperFacade from '../../../libs/swiper/SwiperFacade';

class Slider {
  constructor(container) {
    this.container = container;
    this.init();
  }

  init() {
    new SwiperFacade(this.container);
  }
}

export default Slider;