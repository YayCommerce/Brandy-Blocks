(function ($) {
  let intervalIds = [];
  const DEFAULT_GAP = 50;
  const AUTOPLAY_SPEED = 5000;
  const itemMinWidth = 300;
  let canInterval = true;
  const checkingWindow =
    document.querySelector("#customize-preview iframe")?.contentWindow ??
    window;
  function clearIntervals() {
    intervalIds.forEach((id) => {
      clearInterval(id);
    });
    intervalIds = [];
  }

  function stopInterval() {
    clearIntervals();
    canInterval = false;
  }
  function openInterval() {
    canInterval = true;
  }
  class BrandyCarousel {
    intervalId = null;
    numberCard = 2;
    carouselElement = null;
    testimonialsElement = null;
    blockElement = null;
    settings = {
      autoplay: true,
      // pauseOnHover: true,
      infiniteLoop: true,
    };
    totalItems = 0;
    totalSlides = 0;
    currentSlide = 0;
    carouselWidth = checkingWindow.innerWidth;
    singleItemWidth = itemMinWidth;
    itemGap = DEFAULT_GAP / 2;
    constructor(element) {
      if (checkingWindow.innerWidth <= 800) {
        this.numberCard = 1;
      }
      this.blockElement = $(element);
      this.carouselElement = $(element).find(".brandy-testimonials-carousel");
      this.testimonialsElement = $(element).find(
        ".brandy-testimonials-wrapper"
      );
      if (
        this.carouselElement == null ||
        this.blockElement == null ||
        this.testimonialsElement == null
      ) {
        return;
      }
      this.init();
    }
    showHideArrow() {
      if (this.settings.infiniteLoop) {
        return;
      }
      if (this.currentSlide == this.totalSlides - 1) {
        $(this.carouselElement).find(".forward-arrow").hide();
      } else {
        $(this.carouselElement).find(".forward-arrow").show();
      }
      if (this.currentSlide == 0) {
        $(this.carouselElement).find(".backward-arrow").hide();
      } else {
        $(this.carouselElement).find(".backward-arrow").show();
      }
    }
    initData() {
      this.settings.autoplay =
        $(this.blockElement)
          .find(".brandy-testimonials-wrapper")
          .attr("auto-play") == "true"
          ? true
          : false;
      this.settings.infiniteLoop =
        $(this.blockElement)
          .find(".brandy-testimonials-wrapper")
          .attr("infinite-loop") == "true"
          ? true
          : false;
      this.settings.infiniteLoop =
        $(this.blockElement)
          .find(".brandy-testimonials-wrapper")
          .attr("infinite-loop") == "true"
          ? true
          : false;

      this.totalItems =
        $(this.carouselElement).find(".brandy-testimonials__card").length ?? 0;

      this.itemGap =
        parseFloat(
          $(this.blockElement)
            .find(".brandy-testimonials-wrapper")
            .attr("item-spacing") ?? DEFAULT_GAP
        ) / 2;

      this.carouselWidth = $(this.carouselElement).width();

      const iW =
        this.carouselWidth / this.numberCard -
        (this.numberCard == 1 ? 0 : this.itemGap);

      if (iW < itemMinWidth) {
        this.numberCard = 1;
      }
      this.singleItemWidth =
        this.carouselWidth / this.numberCard -
        (this.numberCard == 1 ? 0 : this.itemGap);

      this.currentSlide = 0;
      this.totalSlides = Math.ceil(this.totalItems / this.numberCard);
    }
    removeDots() {
      $(this.testimonialsElement).find(".carousel-dots").remove();
    }
    applyStyles() {
      $(this.carouselElement)
        .find(".brandy-testimonials__list")
        .css("transform", "translateX(0)");
      $(this.carouselElement)
        .find(".brandy-testimonials__card")
        .outerWidth(this.singleItemWidth);
      $(this.carouselElement)
        .find(".brandy-testimonials__list")
        .width(this.totalItems * this.singleItemWidth * 2);
      $(this.carouselElement)
        .find(".brandy-testimonials__list")
        .css("gap", this.itemGap * 2);
    }
    nextSlide() {
      if (this.currentSlide >= this.totalSlides - 1) {
        if (!this.settings.infiniteLoop) {
          return;
        }
        this.currentSlide = 0;
      } else {
        this.currentSlide++;
      }
      this.transitionSlides();
    }
    prevSlide() {
      if (this.currentSlide <= 0) {
        if (!this.settings.infiniteLoop) {
          return;
        }
        this.currentSlide = this.totalSlides - 1;
      } else {
        this.currentSlide--;
      }
      this.transitionSlides();
    }
    activateSlides() {
      $(this.carouselElement)
        .find(".brandy-testimonials__card")
        .each((index, el) => {
          $(el).removeClass("current-card");
          if (
            index >= this.currentSlide * this.numberCard &&
            index < this.currentSlide * this.numberCard + this.numberCard
          ) {
            $(el).addClass("current-card");
          }
        });
    }
    transitionSlides() {
      let xOffset = 0;
      let numberPassedItems = this.currentSlide * this.numberCard;
      xOffset = -(
        numberPassedItems * this.singleItemWidth +
        numberPassedItems * this.itemGap +
        this.currentSlide * this.itemGap * (this.numberCard === 1 ? 1 : 2)
      );

      if (this.totalItems - numberPassedItems < this.numberCard) {
        numberPassedItems =
          numberPassedItems -
          (this.numberCard - (this.totalItems - numberPassedItems));

        xOffset = -(
          numberPassedItems * this.singleItemWidth +
          numberPassedItems * this.itemGap +
          this.currentSlide * this.itemGap * (this.numberCard === 1 ? 1 : 2) -
          this.itemGap
        );
      }

      if (this.currentSlide == 0) {
        xOffset = 0;
      }

      this.showHideArrow();
      this.activateSlides();

      $(this.carouselElement)
        .find(".brandy-testimonials__list")
        .css("transform", `translateX(${xOffset}px)`);
      $(this.testimonialsElement)
        .find(".carousel-dot")
        .removeClass("current-slide");
      $(this.testimonialsElement)
        .find(`.carousel-dot[data-position='${this.currentSlide}']`)
        .addClass("current-slide");
    }
    stopAutoplay() {
      if (this.intervalId != null) {
        clearInterval(this.intervalId);
      }
    }
    startAutoplay() {
      if (!this.settings.autoplay || !canInterval) {
        return;
      }
      this.intervalId = setInterval(() => {
        this.currentSlide++;
        if (this.currentSlide > this.totalSlides - 1) {
          if (!this.settings.infiniteLoop) {
            this.currentSlide = this.totalSlides - 1;
          } else {
            this.currentSlide = 0;
          }
        }
        this.transitionSlides();
      }, AUTOPLAY_SPEED);
      intervalIds.push(this.intervalId);
    }
    start() {
      const parentThis = this;
      $(this.carouselElement)
        .find(".carousel-arrow")
        .on("click", function (e) {
          e.preventDefault();
          e.stopPropagation();

          if (this.dataset?.slide === "forward") {
            parentThis.nextSlide();
          } else {
            parentThis.prevSlide();
          }
        });

      this.startAutoplay();
      const x = this.stopAutoplay.bind(this);
      const y = this.startAutoplay.bind(this);

      if (this.settings.autoplay) {
        $(this.carouselElement).on("mouseenter", x);
        $(this.carouselElement).on("mouseleave", y);
      }

      $(window).on("carouselDestroyed", () => {
        $(this.carouselElement).off("mouseenter", x);
        $(this.carouselElement).off("mouseleave", y);
      });
    }
    initDots() {
      if (this.totalItems > this.numberCard) {
        $(this.testimonialsElement).append(
          `<div class='carousel-dots'>${Array(this.totalSlides)
            .fill(true)
            .map(
              (_, index) =>
                `<span class="carousel-dot ${
                  index == 0 ? "current-slide" : ""
                }" data-position="${index}"></span>`
            )
            .join("")}</div>`
        );
      }

      const parentThis = this;
      $(this.testimonialsElement)
        .find(".carousel-dot")
        .on("click", function (e) {
          e.stopPropagation();
          e.preventDefault();
          const targetPosition = this.dataset?.position;
          if (targetPosition == null) {
            return;
          }
          parentThis.currentSlide = targetPosition;
          parentThis.transitionSlides();
        });
    }
    init() {
      this.removeDots();
      this.initData();
      this.applyStyles();
      this.start();
      this.showHideArrow();
      this.initDots();
    }
  }

  window.brandy = {
    carousels: {
      load: function () {
        clearIntervals();
        $(".wp-block-brandy-testimonials").each(function () {
          $(this).addClass("block-upgraded");
          new BrandyCarousel(this);
        });
      },
      openInterval,
      stopInterval,
    },
  };

  $(document).ready(function () {
    window.brandy.carousels.load();
    $(window).on("resize", function () {
      window.dispatchEvent(new CustomEvent("loadTestimonials"));
    });
    $(window).on("loadTestimonials", function () {
      window.brandy.carousels.load();
    });
  });
})(window.jQuery);
