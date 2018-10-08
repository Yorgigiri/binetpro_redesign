export class DefaultSliderCustomNavi {
    /**
     * Класс для работы с кастомными дубликатами кнопок слик карусели
     * @param {*} sliderId 
     */
    constructor(sliderId) {
        this.sliderId = sliderId;
    }

    leftClick() {
        // Симуляция левого клика
        let arrow = $(this.sliderId).find('.slick-prev');
        let arrowDuplicate = $(this.sliderId).siblings('.defaultSlider-arrows').find('.defaultSlider-arrows__arrow-prev');
        arrowDuplicate.on('click', function () {
            arrow.trigger('click');
        });
    }

    rightClick() {
        // Симуляция правого клика
        let arrow = $(this.sliderId).find('.slick-next');
        let arrowDuplicate = $(this.sliderId).siblings('.defaultSlider-arrows').find('.defaultSlider-arrows__arrow-next');
        arrowDuplicate.on('click', function () {
            arrow.trigger('click');
        });
    }

    arrowClick() {
        let arrow = $(this.sliderId).find('.slick-arrow');
        let self = this;
        arrow.on('click', function () {
            self.setCurrentSlideNum();
        });
    }

    setCurrentSlideNum() {
        let positionNowSelector = $(this.sliderId).siblings('.defaultSlider-arrows').find('.defaultSlider-position__now');
        let getActiveSlideIndex = $(this.sliderId).find('.slick-dots li.slick-active').index();
        positionNowSelector.text(getActiveSlideIndex + 1);
    }

    setTotalSlides() {
        // Вычисляем итоговое количество слайдов (а точнее сколько раз мы прокручиваем)
        let num = $(this.sliderId).find('.slick-dots li').length;
        let totalContainer = $(this.sliderId).siblings('.defaultSlider-arrows').find('.defaultSlider-position__total');
        totalContainer.text(num);
    }

    swipeEvent(){

        let self = this;
        $(this.sliderId).on('swipe', function(){
            self.setCurrentSlideNum();
        });
    }

    init() {

        this.setCurrentSlideNum();
        this.swipeEvent();
        this.setTotalSlides();
        this.leftClick();
        this.arrowClick();
        this.rightClick();
        
    }

}