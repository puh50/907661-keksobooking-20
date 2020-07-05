'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
      evtMove.preventDefault();

      var shift = {
        x: startCoords.x - evtMove.clientX,
        y: startCoords.y - evtMove.clientY
      };

      startCoords = {
        x: evtMove.clientX,
        y: evtMove.clientY
      };

      // restriction to move out the main pin
      var topPosition = mapPinMain.offsetTop - shift.y;
      var leftPosition = mapPinMain.offsetLeft - shift.x;
      var topBorder = 131;
      var bottomBorder = 631;
      var leftBorder = 0;
      var rightBorder = 1201;
      var pinHalfWidth = parseInt(window.form.fillDefaultAddress().width, 10) / 2;
      var pinHeight = parseInt(window.form.fillDefaultAddress().height, 10);
      var pointerHeight = window.form.fillAddressActiveMap().pointerHeight;
      var pinFullHeight = pinHeight + pointerHeight;

      mapPinMain.style.top = topPosition + 'px';
      mapPinMain.style.left = leftPosition + 'px';

      if (topPosition <= topBorder - pinFullHeight || startCoords.y < mapPinMain.getBoundingClientRect().top) {
        mapPinMain.style.top = topBorder - pinFullHeight + 'px';
      }
      if (topPosition >= bottomBorder - pinFullHeight || startCoords.y > mapPinMain.getBoundingClientRect().bottom) {
        mapPinMain.style.top = bottomBorder - pinFullHeight + 'px';
      }
      if (leftPosition <= leftBorder - pinHalfWidth || startCoords.x < mapPinMain.getBoundingClientRect().left) {
        mapPinMain.style.left = leftBorder - pinHalfWidth + 'px';
      }
      if (leftPosition >= rightBorder - pinHalfWidth || startCoords.x > mapPinMain.getBoundingClientRect().right) {
        mapPinMain.style.left = rightBorder - pinHalfWidth + 'px';
      }

      window.form.fillAddressActiveMap();
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
