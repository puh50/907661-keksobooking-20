'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  window.map = {
    renderPins: function () {
      var mapFilter = map.querySelector('.map__filters-container');
      var mapPins = document.querySelector('.map__pins');
      var fragmentPin = document.createDocumentFragment();

      for (var i = 0; i < window.data.ads.length; i++) {
        var pin = window.createPin(window.data.ads[i]);
        fragmentPin.appendChild(pin);

        (function (index) {
          pin.addEventListener('click', function () {
            closePopup();
            map.insertBefore(window.craeteCard(window.data.ads[index]), mapFilter);
          });
        })(i);

        (function (index) {
          pin.addEventListener('keydown', function (evt) {
            if (evt.code === 'Enter') {
              closePopup();
              map.insertBefore(window.craeteCard(window.data.ads[index]), mapFilter);
            }
          });
        })(i);

        document.addEventListener('keydown', function (evt) {
          var popup = map.querySelector('.popup');
          window.util.closeByEscape(evt, popup);
        });
      }
      mapPins.appendChild(fragmentPin);
    }
  };

  var closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };
  // page enabling
  var activatePageOnPinMain = function (evt) {
    var buttonPressed = evt.button;
    if (buttonPressed === 0 || evt.code === 'Enter') {
      window.activatePage();
      mapPinMain.removeEventListener('mousedown', activatePageOnPinMain);
      mapPinMain.removeEventListener('keydown', activatePageOnPinMain);
    }
  };
  mapPinMain.addEventListener('mousedown', activatePageOnPinMain);
  mapPinMain.addEventListener('keydown', activatePageOnPinMain);

})();
