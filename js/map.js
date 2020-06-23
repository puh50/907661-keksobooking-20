'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  window.map = {
    renderPins: function (ads) {
      var mapFilter = map.querySelector('.map__filters-container');
      var mapPins = document.querySelector('.map__pins');
      var fragmentPin = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        var pin = window.createPin(ads[i]);
        fragmentPin.appendChild(pin);

        (function (index) {
          pin.addEventListener('click', function () {
            window.map.closePopup();
            map.insertBefore(window.craeteCard(ads[index]), mapFilter);
          });
        })(i);

        (function (index) {
          pin.addEventListener('keydown', function (evt) {
            if (evt.code === 'Enter') {
              window.map.closePopup();
              map.insertBefore(window.craeteCard(ads[index]), mapFilter);
            }
          });
        })(i);

        document.addEventListener('keydown', function (evt) {
          var popup = map.querySelector('.popup');
          window.util.closeByEscape(evt, popup);
        });
      }
      mapPins.appendChild(fragmentPin);
    },
    activatePageOnPinMain: function (evt) {
      var buttonPressed = evt.button;
      if (buttonPressed === 0 || evt.code === 'Enter') {
        window.main.activatePage();
        mapPinMain.removeEventListener('mousedown', window.map.activatePageOnPinMain);
        mapPinMain.removeEventListener('keydown', window.map.activatePageOnPinMain);
      }
    },
    removePins: function () {
      var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
      if (pins.length !== 0) {
        pins.forEach(function (pin) {
          pin.remove();
        });
      }
    },
    closePopup: function () {
      var popup = map.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
    },
    getMainPinDefaultPlace: (function () {
      var styles = window.getComputedStyle(mapPinMain);
      mapPinMain.style.top = styles.top;
      mapPinMain.style.left = styles.left;

      return {
        top: mapPinMain.style.top,
        left: mapPinMain.style.left
      };
    })(),
    setMainPinDefaultPlace: function () {
      mapPinMain.style.top = this.getMainPinDefaultPlace.top;
      mapPinMain.style.left = this.getMainPinDefaultPlace.left;
    }
  };

})();
