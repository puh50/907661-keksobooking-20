'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  window.createPin = function (ad) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var pin = pinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = ad.location.x - (PIN_WIDTH / 2) + 'px';
    pin.style.top = ad.location.y - PIN_HEIGHT + 'px';
    pinImg.src = ad.author.avatar;
    pinImg.alt = ad.offer.title;

    return pin;
  };
})();
