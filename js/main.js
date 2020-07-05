'use strict';

(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var guestsSelect = adForm.querySelector('#capacity');
  var roomsSelect = adForm.querySelector('#room_number');
  var title = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var type = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapFilter = map.querySelector('.map__filters');

  window.main = {
    activatePage: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.form.activate();
      window.filter.activate();
      window.form.fillAddressActiveMap();

      window.load(window.map.renderPins, function (message) {
        window.main.renderErrorMessage(message);
        window.filter.deactivate();
      });

      mapFilter.addEventListener('change', window.debounce(function () {
        window.map.closePopup();
        window.map.removePins();
        window.filter.filtrate(window.map.ads);
      })
      );

      // Validation
      // guests/rooms validation
      roomsSelect.addEventListener('change', window.form.roomsGuestsValidationHandler);
      guestsSelect.addEventListener('change', window.form.roomsGuestsValidationHandler);

      // title validation
      title.addEventListener('invalid', window.form.titleValidationHandler);
      title.addEventListener('input', window.form.titleValidationHandler);

      // price/type validation
      price.addEventListener('change', window.form.priceTypeValidationHandler);
      type.addEventListener('change', window.form.priceTypeValidationHandler);

      price.addEventListener('change', window.form.changePlaceholder);
      type.addEventListener('change', window.form.changePlaceholder);

      // price validation
      price.addEventListener('invalid', window.form.priceValidationHandler);
      price.addEventListener('input', window.form.priceValidationHandler);

      // timein/timout validation
      timein.addEventListener('change', function () {
        window.form.synchronizeTime(timeout, timein);
      });
      timeout.addEventListener('change', function () {
        window.form.synchronizeTime(timein, timeout);
      });

      resetButton.addEventListener('click', this.deactivatePage);
    },
    deactivatePage: function () {
      map.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      window.form.deactivate();
      window.filter.deactivate();
      window.map.removePins();
      window.map.closePopup();
      window.form.reset();
      window.form.changePlaceholder();
      window.form.fillDefaultAddress();
      window.map.setMainPinDefaultPlace();

      mapPinMain.addEventListener('mousedown', window.map.onPinMainClickOrEnter);
      mapPinMain.addEventListener('keydown', window.map.onPinMainClickOrEnter);

      roomsSelect.removeEventListener('change', window.form.roomsGuestsValidationHandler);
      guestsSelect.removeEventListener('change', window.form.roomsGuestsValidationHandler);

      // title validation
      title.removeEventListener('invalid', window.form.titleValidationHandler);
      title.removeEventListener('input', window.form.titleValidationHandler);

      // price/type validation
      price.removeEventListener('change', window.form.priceTypeValidationHandler);
      type.removeEventListener('change', window.form.priceTypeValidationHandler);

      price.removeEventListener('change', window.form.changePlaceholder);
      type.removeEventListener('change', window.form.changePlaceholder);

      // price validation
      price.removeEventListener('invalid', window.form.priceValidationHandler);
      price.removeEventListener('input', window.form.priceValidationHandler);

      // timein/timout validation
      timein.removeEventListener('change', function () {
        window.form.synchronizeTime(timeout, timein);
      });
      timeout.removeEventListener('change', function () {
        window.form.synchronizeTime(timein, timeout);
      });

      resetButton.removeEventListener('click', this.deactivatePage);
    },
    renderSuccessMessage: function () {
      var messageTemplate = document.querySelector('#success').content.querySelector('.success');
      var newMessage = messageTemplate.cloneNode(true);
      main.appendChild(newMessage);

      document.addEventListener('keydown', function (evt) {
        window.util.closeByEscape(evt, newMessage);
      });
      newMessage.addEventListener('click', function () {
        newMessage.remove();
      });
    },
    renderErrorMessage: function (message) {
      var messageTemplate = document.querySelector('#error').content.querySelector('.error');
      var newMessage = messageTemplate.cloneNode(true);
      var newMessageText = newMessage.querySelector('.error__message');
      newMessageText.textContent = message;
      main.appendChild(newMessage);

      newMessage.querySelector('.error__button').addEventListener('click', function () {
        newMessage.remove();
      });
      newMessage.addEventListener('click', function () {
        newMessage.remove();
      });
      document.addEventListener('keydown', function (evt) {
        window.util.closeByEscape(evt, newMessage);
      });
    }
  };

  window.main.deactivatePage();
  window.form.fillDefaultAddress();
})();
