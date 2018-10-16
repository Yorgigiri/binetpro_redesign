
$(function () {
    if (window.ymaps != undefined) {
        ymaps.ready(init_w);
        function init_w() {
            var myMap = new ymaps.Map("map", {
                center: [56.871055, 53.208686],
                zoom: 18,
                controls: []
            });
            var myPlacemark = new ymaps.Placemark([56.871055, 53.208686], {}, {
                iconLayout: "default#image"
            });

            if (window.matchMedia("(max-width: 767px)").matches) {
                myMap.behaviors.disable("multiTouch");
                myMap.behaviors.disable("drag");
            }

            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable("scrollZoom");

        }
    }
});