'use strict';

(function () {
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
          case 'low':
            return item.offer.price < 10000;
          case 'middle':
            return item.offer.price >= 10000 && item.offer.price < 50000;
          case 'high':
            return item.offer.price >= 50000;
          default:
            return item;
        }
      };

      var filterByRooms = function (item) {
        var roomsFilter = map.querySelector('#housing-rooms');

        switch (roomsFilter.value) {
          case 'any':
            return item.offer.rooms >= 0;
          case '1':
            return item.offer.rooms === 1;
          case '2':
            return item.offer.rooms === 2;
          case '3':
            return item.offer.rooms === 3;
          default:
            return item;
        }
      };

      var filterByGuests = function (item) {
        var guestsFilter = map.querySelector('#housing-guests');

        switch (guestsFilter.value) {
          case 'any':
            return item.offer.guests >= 0;
          case '0':
            return item.offer.guests === 'не для гостей';
          case '1':
            return item.offer.guests === 1;
          case '2':
            return item.offer.guests === 2;
          default:
            return item;
        }
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
