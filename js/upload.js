'use strict';

(function () {

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        default:
          onError('Ошибка загрузки объявления. Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 1000;
    });

    xhr.open('POST', 'https://javascript.pages.academy/keksobooking');
    xhr.send(data);
  };

})();
