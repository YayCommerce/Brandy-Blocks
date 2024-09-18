(function ($) {
  $(document).ready(function () {
    const defaultConfig = {
      direction: 'horizontal',
      slidesPerView: 3,
      spaceBetween: 40,
    };
    function getConfigFromBlock(blockEl) {
      const isInEditor = $(blockEl).hasClass('block-editor-block-list__block');
      const isInfiniteLoop = !isInEditor && blockEl.dataset.loop === 'true';
      const isAutoPlay = !isInEditor && blockEl.dataset.autoPlay === 'true';
      return {
        defaultConfig,
        slidesPerView:
          blockEl.dataset.slidesPerView ?? defaultConfig.slidesPerView,
        spaceBetween:
          blockEl.dataset.itemsSpacing ?? defaultConfig.spaceBetween,
        navigation: {
          prevEl: blockEl.querySelector('.swiper-button-prev'),
          nextEl: blockEl.querySelector('.swiper-button-next'),
        },
        pagination: {
          el: blockEl.querySelector('.swiper-pagination'),
          type: 'bullets',
          clickable: true,
        },
        loop: isInfiniteLoop,
        autoplay: isAutoPlay
          ? {
              delay: blockEl.dataset.autoPlayDelay ?? 3000,
              pauseOnMouseEnter: true,
            }
          : false,
      };
    }
    window.addEventListener('brandyRefreshTestimonials', function (ev) {
      const targetBlockId = ev.detail?.block;
      $('.wp-block-brandy-testimonials').each((ind, block) => {
        if (targetBlockId != null && block.dataset.block !== targetBlockId) {
          return;
        }
        $(block)
          .find('.swiper')
          .each((__, swiperEl) => {
            new Swiper(swiperEl, getConfigFromBlock(block));
          });
      });
    });
    window.dispatchEvent(new CustomEvent('brandyRefreshTestimonials'));
  });
})(window.jQuery);
