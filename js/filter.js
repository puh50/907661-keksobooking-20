'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var filterFieldsets = mapFilter.querySelectorAll('fieldset');
  var filterSelects = mapFilter.querySelectorAll('select');
  var housingTypeFilter = map.querySelector('#housing-type');
  var priceFilter = map.querySelector('#housing-price');
  var roomsFilter = map.querySelector('#housing-rooms');
  var guestsFilter = map.querySelector('#housing-guests');
  var items = [];

  window.filter = {
    activateFilter: function () {
      window.util.activateFields(filterFieldsets);
      window.util.activateFields(filterSelects);
    },
    deactivateFilter: function () {
      window.util.disableFields(filterFieldsets);
      window.util.disableFields(filterSelects);
    },
    filtering: function (data) {


      var filterByFeatures = function (item) {
        var checkedFeatures = map.querySelectorAll('.map__checkbox:checked');
        var featuresWereChecked = [];


        checkedFeatures.forEach(function (feature) {
          featuresWereChecked.push(feature.value);
        });

        for (var i = 0; i < featuresWereChecked.length; i++) {
          if (featuresWereChecked.length === 0) {
            return data;
          } else if (item.offer.features.includes(featuresWereChecked[i])) {
            items.push(item);
          }
        }

      };

      data.filter(function (item) {
        if (housingTypeFilter.value !== 'any') {
          return item.offer.type === housingTypeFilter.value;
        } else {
          return data;
        }
      }).filter(function (item) {
        switch (priceFilter.value) {
          case 'low':
            return item.offer.price < 10000;
          case 'middle':
            return item.offer.price >= 10000 && item.offer.price < 50000;
          case 'high':
            return item.offer.price >= 50000;
          default:
            return data;
        }
      }).filter(function (item) {
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
            return data;
        }
      }).filter(function (item) {
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
            return data;
        }
      }).filter(filterByFeatures);

      // Leaves unique ads
      var uniqueAds = items.filter(function (it, i) {
        return items.indexOf(it) === i;
      });

      window.map.renderPins(uniqueAds);
      window.map.ads = data;
      items = [];
    }
  };
})();
