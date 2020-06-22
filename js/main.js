'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var fieldsets = document.querySelectorAll('fieldset');
  var selects = document.querySelectorAll('select');

  window.util.disableFields(fieldsets);
  window.util.disableFields(selects);
  window.form.fillDefaultAddress();

  window.activatePage = function () {
    var map = document.querySelector('.map');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.activateFields(fieldsets);
    window.util.activateFields(selects);
    window.form.fillAddressActiveMap();

    window.load(window.map.renderPins, function () {});

    // Validation
    // guests/rooms validation
    var guestsSelect = adForm.querySelector('#capacity');
    var roomsSelect = adForm.querySelector('#room_number');
    roomsSelect.addEventListener('change', window.form.validateRoomsGuestsNumber);
    guestsSelect.addEventListener('change', window.form.validateRoomsGuestsNumber);

    // title validation
    var title = adForm.querySelector('#title');
    title.addEventListener('invalid', window.form.titleValidationHandler);
    title.addEventListener('input', window.form.titleValidationHandler);

    // price/type validation
    var price = adForm.querySelector('#price');
    var type = adForm.querySelector('#type');
    price.addEventListener('change', window.form.priceTypeValidationHandler);
    type.addEventListener('change', window.form.priceTypeValidationHandler);

    // price validation
    price.addEventListener('invalid', window.form.priceValidationHandler);
    price.addEventListener('input', window.form.priceValidationHandler);

    // timein/timout validation
    var timein = adForm.querySelector('#timein');
    var timeout = adForm.querySelector('#timeout');
    timein.addEventListener('change', function () {
      window.form.synchronizeTime(timeout, timein);
    });
    timeout.addEventListener('change', function () {
      window.form.synchronizeTime(timein, timeout);
    });

  };
})();
