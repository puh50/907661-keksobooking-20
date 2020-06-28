'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var filterFieldsets = mapFilter.querySelectorAll('fieldset');
  var filterSelects = mapFilter.querySelectorAll('select');
  var housingType = map.querySelector('#housing-type');

  window.filter = {
    activateFilter: function () {
      window.util.activateFields(filterFieldsets);
      window.util.activateFields(filterSelects);
    },
    deactivateFilter: function () {
      window.util.disableFields(filterFieldsets);
      window.util.disableFields(filterSelects);
    },
    filterByHousingType: function (data) {
      if (housingType.value !== 'any') {
        var filteredAds = data.filter(function (ad) {
          return ad.offer.type === housingType.value;
        });
        window.map.removePins();
        window.map.closePopup();
        window.map.renderPins(filteredAds);
        window.map.ads = data;
      } else {
        window.map.removePins();
        window.map.closePopup();
        window.map.renderPins(data);
      }
    }
  };
})();
