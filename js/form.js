'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormSelects = adForm.querySelectorAll('select');
  var addressField = adForm.querySelector('#address');
  var price = adForm.querySelector('#price');

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(adForm), function () {
      window.main.deactivatePage();
      window.form.fillDefaultAddress();
      window.main.renderSuccessMessage();
    }, window.main.renderErrorMessage);
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
      var pointerHeight = 18; // from pseudo element ::after of mapPinMain, border-top property
      var pointerY = this.fillDefaultAddress().y + Math.floor(parseInt(this.fillDefaultAddress().height, 10) / 2) + pointerHeight;
      var pointerX = this.fillDefaultAddress().x;
      addressField.value = pointerX + ', ' + pointerY;

      return {
        pointerHeight: pointerHeight,
        pointerX: pointerX,
        pointerY: pointerY
      };
    },
    roomsGuestsValidationHandler: function () {
      var guestsSelect = adForm.querySelector('#capacity');
      var roomsSelect = adForm.querySelector('#room_number');
      var roomsValue = parseInt(roomsSelect.value, 10);
      var guestsValue = parseInt(guestsSelect.value, 10);

      if (roomsValue === 1 && (guestsValue === 0 || guestsValue > roomsValue)) {
        roomsSelect.setCustomValidity('для 1 гостя');
      } else if (roomsValue === 2 && (guestsValue === 0 || guestsValue > roomsValue)) {
        roomsSelect.setCustomValidity('для 1 или 2 гостей');
      } else if (roomsValue === 3 && (guestsValue === 0 || guestsValue > roomsValue)) {
        roomsSelect.setCustomValidity('для 1, 2 или 3 гостей');
      } else if (roomsValue === 100 && guestsValue !== 0) {
        roomsSelect.setCustomValidity('не для гостей');
      } else {
        roomsSelect.setCustomValidity('');
      }
    },
    titleValidationHandler: function () {
      var title = adForm.querySelector('#title');
      if (title.value.length === 0) {
        title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов.');
      } else if (title.value.length < 30) {
        title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов. Введите еще ' + (30 - title.value.length));
      } else if (title.value.length > 100) {
        title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов. Удалите ' + (title.value.length - 100));
      } else {
        title.setCustomValidity('');
      }
    },
    changePlaceholder: function () {
      var type = adForm.querySelector('#type');

      switch (type.value) {
        case 'bungalo':
          price.setAttribute('placeholder', '0');
          break;
        case 'flat':
          price.setAttribute('placeholder', '1000');
          break;
        case 'house':
          price.setAttribute('placeholder', '5000');
          break;
        case 'palace':
          price.setAttribute('placeholder', '10000');
      }
    },
    priceTypeValidationHandler: function () {
      var type = adForm.querySelector('#type');

      var getMinPriceNotification = function (minPrice) {
        return price.value < minPrice ? price.setCustomValidity('Минимальная цена за ночь для ' + type.options[type.selectedIndex].text + ': ' + minPrice) : price.setCustomValidity('');
      };

      switch (type.value) {
        case 'bungalo':
          getMinPriceNotification(0);
          break;
        case 'flat':
          getMinPriceNotification(1000);
          break;
        case 'house':
          getMinPriceNotification(5000);
          break;
        case 'palace':
          getMinPriceNotification(10000);
      }
    },
    priceValidationHandler: function () {
      if (price.value.length === 0) {
        price.setCustomValidity('Заполните поле. Цена за ночь должна быть меньше 1 000 000');
      } else if (price.value > 1000000) {
        price.setCustomValidity('Цена за ночь должна быть меньше 1 000 000');
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
