'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = adForm.querySelector('#address');
  var price = adForm.querySelector('#price');

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
    validateRoomsGuestsNumber: function () {
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
    priceTypeValidationHandler: function () {
      var type = adForm.querySelector('#type');

      var getMinPriceNotification = function (minPrice) {
        return price.value < minPrice ? price.setCustomValidity('Минимальная цена за ночь для ' + type.options[type.selectedIndex].text + ': ' + minPrice) : price.setCustomValidity('');
      };

      var changePlaceholder = function (placeholder) {
        price.setAttribute('placeholder', placeholder);
      };

      switch (type.value) {
        case 'bungalo':
          changePlaceholder(0);
          break;
        case 'flat':
          getMinPriceNotification(1000);
          changePlaceholder(1000);
          break;
        case 'house':
          getMinPriceNotification(5000);
          changePlaceholder(5000);
          break;
        case 'palace':
          getMinPriceNotification(10000);
          changePlaceholder(10000);
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
    }
  };
})();
