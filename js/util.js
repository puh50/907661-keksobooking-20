'use strict';

(function () {
  window.closePopupByEscape = function (evt) {
    var map = document.querySelector('.map');
    var popup = map.querySelector('.popup');
    if (popup && evt.code === 'Escape') {
      popup.remove();
      document.removeEventListener('keydown', window.closePopupByEscape);
    }
  };
})();
