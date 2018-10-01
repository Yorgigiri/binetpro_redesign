import { DefaultSliderCustomNavi } from './partials/DefaultSliderCustomNavi';
import './partials/gmaps';
$(function () {
    // DOM ready

    if ($('#mainOnePage').length != 0) {
        onePageScroll("#mainOnePage", {
            sectionContainer: "section",
            loop: false,
            pagination: false,
            responsiveFallback: false
        });
    }

    $('.grid').masonry({
        // options
        itemSelector: '.grid-item'
    });

    if ($('.m-openNewsContent').length != 0 || $('#modal').length != 0) {
        /**
         * Проверяем наличие кнопки открытия модального окна с новостью 
         * на странице новостей и самого модального окна
         */

        $("#modal").iziModal({
            radius: 0,
            width: 1015,
            title: true,
            headerColor: '#ffffff'
        });

        $(document).on('click', '.m-openNewsContent', function (event) {
            event.preventDefault();
            $('#modal').iziModal('open');
        });
        
    }

    /**
     * $('#puzatCarousel').slick - Инициализация слайдера на главной странице
     */
    $('#puzatCarousel').slick({
        arrows: false,
        dots: true,
        fade: true,
        pauseOnFocus: false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true
    });

    $('#topFullWidthSlider-1').slick({
        arrows: true,
        dots: true,
        lazyLoad: 'progressive',
        infinite: true
    });

    $('#capabilitiesSlider').slick({
        arrows: true,
        dots: true,
        lazyLoad: 'progressive',
        infinite: true
    });

    $('#officeBoxSlider').slick({
        arrows: true,
        dots: true,
        lazyLoad: 'progressive',
        infinite: true
    });

    $('#outsideTheOffice').slick({
        arrows: true,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        lazyLoad: 'progressive',
        infinite: true
    });

    function checkCheckboxCheckedAttr(formSelector, checkboxClicker) {
        /**
         * Проверка состояния true аттрибута checked у чекбокса
         */
        $(checkboxClicker).on('click', function () {
            let thisForAttr = $(checkboxClicker).attr('for');
            let parentForm = $(checkboxClicker).parents(formSelector);
            let siblingsCheckbox = $(checkboxClicker).siblings('input#' + thisForAttr);

            if (siblingsCheckbox.is(':checked')) {
                parentForm.find('input[type="submit"]').attr('disabled', true);
            }
            else {
                parentForm.find('input[type="submit"]').attr('disabled', false);
            }
        });
    }

    checkCheckboxCheckedAttr('.recruitForm', '.js-checkTheCheckbox');


    let slider1 = new DefaultSliderCustomNavi('#capabilitiesSlider');
    let slider2 = new DefaultSliderCustomNavi('#officeBoxSlider');
    let slider3 = new DefaultSliderCustomNavi('#outsideTheOffice');
    let slider4 = new DefaultSliderCustomNavi('#topFullWidthSlider-1');
    slider1.init();
    slider2.init();
    slider3.init();
    slider4.rightClick();
    slider4.leftClick();

});