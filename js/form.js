'use strict';

(function () {
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var MAX_PRICE = 1000000;

  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;

  var MAIN_PIN_POINTER_HEIGHT = 18; // from pseudo element ::after of mapPinMain, border-top property

  var availableRooms = {
    1: {
      guests: [1],
      errorMessage: 'для 1 гостя'
    },
    2: {
      guests: [1, 2],
      errorMessage: 'для 1 или 2 гостей'
    },
    3: {
      guests: [1, 2, 3],
      errorMessage: 'для 1, 2 или 3 гостей'
    },
    100: {
      guests: [0],
      errorMessage: 'не для гостей'
    }
  };

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormSelects = adForm.querySelectorAll('select');
  var addressField = adForm.querySelector('#address');
  var price = adForm.querySelector('#price');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.data.upload(function () {
      window.main.deactivatePage();
      window.form.fillDefaultAddress();
      window.main.renderSuccessMessage();
    }, window.main.renderErrorMessage, new FormData(adForm));
  });

  window.form = {
    fillDefaultAddress: function () {
      var map = document.querySelector('.map');
      var mapPinMain = map.querySelector('.map__pin--main');
      var mainPinStyles = window.getComputedStyle(mapPinMain);
      var positionTop = mainPinStyles.getPropertyValue('top');
      var positionLeft = mainPinStyles.getPropertyValue('left');
      var width = mainPinStyles.getPropertyValue('width');
      var height = mainPinStyles.getPropertyValue('height');
      var xCenter = parseInt(positionLeft, 10) + Math.floor(parseInt(width, 10) / 2);
      var yCenter = parseInt(positionTop, 10) + Math.floor(parseInt(height, 10) / 2);
      addressField.value = xCenter + ', ' + yCenter;

      return {
        x: xCenter,
        y: yCenter,
        width: width,
        height: height
      };
    },
    fillAddressActiveMap: function () {
      var pointerY = this.fillDefaultAddress().y + Math.floor(parseInt(this.fillDefaultAddress().height, 10) / 2) + MAIN_PIN_POINTER_HEIGHT;
      var pointerX = this.fillDefaultAddress().x;
      addressField.value = pointerX + ', ' + pointerY;

      return {
        pointerHeight: MAIN_PIN_POINTER_HEIGHT,
        pointerX: pointerX,
        pointerY: pointerY
      };
    },
    roomsGuestsValidationHandler: function () {
      var guestsSelect = adForm.querySelector('#capacity');
      var roomsSelect = adForm.querySelector('#room_number');
      var roomsValue = parseInt(roomsSelect.value, 10);
      var guestsValue = parseInt(guestsSelect.value, 10);

      if (availableRooms[roomsValue].guests.includes(guestsValue)) {
        roomsSelect.setCustomValidity('');
      } else {
        roomsSelect.setCustomValidity(availableRooms[roomsValue].errorMessage);
      }
    },
    titleValidationHandler: function () {
      var title = adForm.querySelector('#title');
      if (title.value.length === 0) {
        title.setCustomValidity('Заголовок объявления должен содержать от ' + MIN_TITLE_LENGTH + ' до ' + MAX_TITLE_LENGTH + ' символов.');
      } else if (title.value.length < MIN_TITLE_LENGTH) {
        title.setCustomValidity('Заголовок объявления должен содержать от ' + MIN_TITLE_LENGTH + ' до ' + MAX_TITLE_LENGTH + ' символов. Введите еще ' + (MIN_TITLE_LENGTH - title.value.length));
      } else if (title.value.length > MAX_TITLE_LENGTH) {
        title.setCustomValidity('Заголовок объявления должен содержать от ' + MIN_TITLE_LENGTH + ' до ' + MAX_TITLE_LENGTH + ' символов. Удалите ' + (title.value.length - MAX_TITLE_LENGTH));
      } else {
        title.setCustomValidity('');
      }
    },
    changePlaceholder: function () {
      var type = adForm.querySelector('#type');

      switch (type.value) {
        case window.constants.HousingType.BUNGALO:
          price.setAttribute('placeholder', MIN_PRICE_BUNGALO);
          break;
        case window.constants.HousingType.FLAT:
          price.setAttribute('placeholder', MIN_PRICE_FLAT);
          break;
        case window.constants.HousingType.HOUSE:
          price.setAttribute('placeholder', MIN_PRICE_HOUSE);
          break;
        case window.constants.HousingType.PALACE:
          price.setAttribute('placeholder', MIN_PRICE_PALACE);
      }
    },
    priceTypeValidationHandler: function () {
      var type = adForm.querySelector('#type');

      var getMinPriceNotification = function (minPrice) {
        return price.value < minPrice ? price.setCustomValidity('Минимальная цена за ночь для ' + type.options[type.selectedIndex].text + ': ' + minPrice) : price.setCustomValidity('');
      };

      switch (type.value) {
        case window.constants.HousingType.BUNGALO:
          getMinPriceNotification(MIN_PRICE_BUNGALO);
          break;
        case window.constants.HousingType.FLAT:
          getMinPriceNotification(MIN_PRICE_FLAT);
          break;
        case window.constants.HousingType.HOUSE:
          getMinPriceNotification(MIN_PRICE_HOUSE);
          break;
        case window.constants.HousingType.PALACE:
          getMinPriceNotification(MIN_PRICE_PALACE);
      }
    },
    priceValidationHandler: function () {
      if (price.value.length === 0) {
        price.setCustomValidity('Заполните поле. Цена за ночь должна быть меньше' + MAX_PRICE);
      } else if (price.value > MAX_PRICE) {
        price.setCustomValidity('Цена за ночь должна быть меньше' + MAX_PRICE);
      }
    },
    synchronizeTime: function (time1, time2) {
      time1.value = time2.value;
    },
    reset: function () {
      var preview = adForm.querySelector('.ad-form-header__preview img');
      adForm.reset();
      preview.src = 'img/muffin-grey.svg';

      var photoContainer = document.querySelector('.ad-form__photo-container');
      var photoBlocks = photoContainer.querySelectorAll('.ad-form__photo');
      var image = photoBlocks[0].querySelector('img');

      if (image) {
        image.remove();
      }

      for (var i = 1; i < photoBlocks.length; i++) {
        photoBlocks[i].remove();
      }
    },
    activate: function () {
      window.util.activateFields(adFormFieldsets);
      window.util.activateFields(adFormSelects);
    },
    deactivate: function () {
      window.util.disableFields(adFormFieldsets);
      window.util.disableFields(adFormSelects);
    }
  };
})();
