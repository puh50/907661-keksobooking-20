'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  window.map = {
    ads: [],
    renderPins: function (data) {
      var mapFilter = map.querySelector('.map__filters-container');
      var mapPins = document.querySelector('.map__pins');
      var fragmentPin = document.createDocumentFragment();
      var pinsToShow = 5;
      window.map.ads = data;

      if (pinsToShow > data.length) {
        pinsToShow = data.length;
      }

      for (var i = 0; i < pinsToShow; i++) {
        if (data[i].offer !== undefined) {
          var pin = window.createPin(data[i]);
          fragmentPin.appendChild(pin);

          (function (element, index) {
            element.addEventListener('click', function () {
              var activeElement = map.querySelector('.map__pin--active');
              if (activeElement) {
                activeElement.classList.remove('map__pin--active');
              }
              element.classList.add('map__pin--active');
              window.map.closePopup();
              map.insertBefore(window.craeteCard(data[index]), mapFilter);
            });
          })(pin, i);

          (function (element, index) {
            element.addEventListener('keydown', function (evt) {
              if (evt.code === 'Enter') {
                element.classList.add('map__pin--active');
                window.map.closePopup();
                map.insertBefore(window.craeteCard(data[index]), mapFilter);
              }
            });
          })(pin, i);
        }

        document.addEventListener('keydown', function (evt) {
          var popup = map.querySelector('.popup');
          var activeElement = map.querySelector('.map__pin--active');
          window.util.closeByEscape(evt, popup);
          if (activeElement) {
            activeElement.classList.remove('map__pin--active');
          }
        });
      }
      mapPins.appendChild(fragmentPin);
    },
    pinMainClickHandler: function (evt) {
      var buttonPressed = evt.button;
      if (buttonPressed === 0) {
        window.main.activatePage();
        mapPinMain.removeEventListener('mousedown', window.map.pinMainClickHandler);
        mapPinMain.removeEventListener('keydown', window.map.pinMainEnterPressHandler);
      }
    },
    pinMainEnterPressHandler: function (evt) {
      if (evt.code === 'Enter') {
        window.main.activatePage();
        mapPinMain.removeEventListener('keydown', window.map.pinMainEnterPressHandler);
        mapPinMain.removeEventListener('mousedown', window.map.pinMainClickHandler);
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
