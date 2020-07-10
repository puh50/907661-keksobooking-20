'use strict';

(function () {
  var MIDDLE_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var price = {
    low: 'low',
    middle: 'middle',
    high: 'high'
  };

  var avalaibleGuests = {
    '1': 1,
    '2': 2,
    '0': 'не для гостей'
  };

  var ANY_OPTION = 'any';

  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var filterFieldsets = mapFilter.querySelectorAll('fieldset');
  var filterSelects = mapFilter.querySelectorAll('select');

  window.filter = {
    activate: function () {
      window.util.activateFields(filterFieldsets);
      window.util.activateFields(filterSelects);
    },
    deactivate: function () {
      window.util.disableFields(filterFieldsets);
      window.util.disableFields(filterSelects);
    },
    reset: function () {
      mapFilter.reset();
    },
    filtrate: function (data) {

      var filterByHousingType = function (item) {
        var housingTypeFilter = map.querySelector('#housing-type');

        if (housingTypeFilter.value !== 'any') {
          return item.offer.type === housingTypeFilter.value;
        }
        return item;
      };

      var filterByPrice = function (item) {
        var priceFilter = map.querySelector('#housing-price');

        switch (priceFilter.value) {
          case price.low:
            return item.offer.price < MIDDLE_PRICE;
          case price.middle:
            return item.offer.price >= MIDDLE_PRICE && item.offer.price < HIGH_PRICE;
          case price.high:
            return item.offer.price >= HIGH_PRICE;
          default:
            return item;
        }
      };

      var filterByRooms = function (item) {
        var roomsFilter = map.querySelector('#housing-rooms');

        if (roomsFilter.value === ANY_OPTION) {
          return item.offer.rooms >= 0;
        }

        return item.offer.rooms === parseInt(roomsFilter.value, 10);
      };

      var filterByGuests = function (item) {
        var guestsFilter = map.querySelector('#housing-guests');

        if (guestsFilter.value === ANY_OPTION) {
          return item.offer.guests >= 0;
        } else if (avalaibleGuests[guestsFilter.value]) {
          return avalaibleGuests[guestsFilter.value] === item.offer.guests;
        }

        return item;
      };

      var filterByFeatures = function (item) {
        var checkedFeatures = map.querySelectorAll('.map__checkbox:checked');

        for (var i = 0; i < checkedFeatures.length; i++) {
          if (!item.offer.features.includes(checkedFeatures[i].value)) {
            return false;
          }
        }
        return item;
      };

      var filteredData = data.filter(function (item) {
        return filterByHousingType(item)
          && filterByPrice(item)
          && filterByRooms(item)
          && filterByGuests(item)
          && filterByFeatures(item);
      });

      window.map.renderPins(filteredData);
      window.map.ads = data;
    }
  };
})();
