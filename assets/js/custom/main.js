import { DefaultSliderCustomNavi } from './partials/DefaultSliderCustomNavi';
import './partials/yandex_maps';
$(function () {
    // DOM ready

    /**
	 * Lifehack для автоматического изменения высоты textarea в форме
	 */
    $(function () {
        var txt = $('#comments');
        var hiddenDiv = $('.recruitForm__textarea-hiddenDiv');
        var content = null;
        txt.addClass('noscroll');
        hiddenDiv.addClass('hiddendiv');
        txt.bind('keyup', function () {
            content = txt.val();
            content = content.replace(/\n/g, '<br>');
            hiddenDiv.html(content);
            txt.css('height', hiddenDiv.height() - 4);
        });
    });

    if ($('#mainOnePage').length != 0 && window.matchMedia('(min-width: 768px)').matches) {

        onePageScroll("#mainOnePage", {
            sectionContainer: "section",
            loop: false,
            pagination: false,
            responsiveFallback: false
        });

        $('.firstBlock__toBottom').on('click', function () {
            moveDown('#mainOnePage');
        });

    }

    $('.mainMenu__mobileButtonToggle').on('click', function () {
        $(this).siblings('.mainMenu').toggleClass('mainMenu_toggled');
        $(this).toggleClass('mainMenu__mobileButtonToggle_menuIsVisible');
    });

    if (window.matchMedia('(max-width: 768px)').matches) {

        window.onscroll = function () {

            (function () {
                /**
                 * Анонимная функция с добавлением класса к главной шапке в зависимости от положения скролла
                 *  */

                let scrolled = window.pageYOffset || document.documentElement.scrollTop; // total window offset
                let firstBlockScrolled = $('#checkpointBlockOne');
                let secondBlockScrolled = $('#checkpointBlockTwo');
                let mainHeader = $('.mainHeader');
                let one = getOffsetAndHeight(firstBlockScrolled);
                let two = getOffsetAndHeight(secondBlockScrolled);

                function getOffsetAndHeight(element) {
                    let object = {};
                    let bottomOffsetCalculate = element.offset().top + element.height();

                    object.offset = element.offset().top;
                    object.bottomOffset = bottomOffsetCalculate;

                    return object;
                }

                function setClassToHeader(object) {
                    if (scrolled >= object.offset && scrolled < object.bottomOffset) {
                        return true;
                    }
                    else {
                        return false;
                    };
                }

                var blackBlock1 = setClassToHeader(one);
                var blackBlock2 = setClassToHeader(two);

                if (blackBlock1 || blackBlock2) {
                    mainHeader.addClass('mainHeader_blackTheme');
                }
                else {
                    mainHeader.removeClass('mainHeader_blackTheme');
                }

            })();

        }

    }


    // var $grid = $('.grid').masonry({
    //     // options
    //     itemSelector: '.grid-item'
    // });

    if ($('#modal-iframe').length != 0) {
        // Инициализация модального окна с айфреймом (youtube, vimeo and etc)
        var videoModal = $('#modal-iframe').iziModal({
            iframe: true,
            title: true,
            width: 900,
            iframeHeight: 600,
            headerColor: '#ffffff',
            iframeURL: "https://www.youtube.com/embed/jTZ-Y4Nbcgg?autoplay=1&rel=0&fs=0&showinfo=0"
        });

        $('.m--openVideoIframe').on('click', function () {
            videoModal.iziModal('open');
        });

    }

    if ($('.m-openNewsContent').length != 0 || $('#modal').length != 0) {
        /**
         * Проверяем наличие кнопки открытия модального окна с новостью 
         * на странице новостей и самого модального окна
         */

        $("#modal").iziModal({
            radius: 0,
            width: 1015,
            title: true,
            headerColor: '#ffffff',
            onOpening: function (modal) {

                modal.startLoading();
                var addId = $('body').data('added_id');
                console.log(addId);
                $.get('/wp-content/themes/binet.pro/ajax/ajax.php?id=' + addId, function (data) {
                    data = JSON.parse(data);

                    $("#modal .innerPage-news__title").html(data[0].title);
                    $("#modal .newsModal__content").html(data[0].content);
                    $("#modal .innerPage-news__date").html(data[0].date);
                    $("#modal .innerPage-news__img").attr('src', data[0].image);
                    $("#modal .ya-share2").data('url', data[0].url);

                    modal.stopLoading();
                });
            }
        });

        $(document).on('click', '.m-openNewsContent', function (event) {
            event.preventDefault();

            var getId = $(this).data('post_id');

            $('body').data('added_id', getId);
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
        infinite: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    adaptiveHeight: true
                }
            }
        ]
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
        infinite: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    dots: true
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    dots: true
                }
            }
        ]
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

