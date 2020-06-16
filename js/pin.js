'use strict';

(function () {
  window.createPin = function (ad) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = ad.location.x - 25 + 'px';
    pin.style.top = ad.location.y - 70 + 'px';
    pinImg.src = ad.author.avatar;
    pinImg.alt = ad.offer.title;

    return pin;
  };
})();
