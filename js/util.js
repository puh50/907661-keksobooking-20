'use strict';

(function () {
  window.util = {
    closeByEscape: function (evt, element) {
      if (element && evt.code === 'Escape') {
        element.remove();
        document.removeEventListener('keydown', window.util.closeByEscape);
      }
    },
    disableFields: function (fields) {
      for (var f = 0; f < fields.length; f++) {
        fields[f].setAttribute('disabled', '');
      }
    },
    activateFields: function (fields) {
      for (var f = 0; f < fields.length; f++) {
        fields[f].removeAttribute('disabled');
      }
    }
  };
})();
