'use strict';

(function () {

  var TIMEOUT = 1000;
  var STATUS_OK = 200;
  var GET_DATA_URL = 'https://javascript.pages.academy/keksobooking/data';
  var SEND_DATA_URL = 'https://javascript.pages.academy/keksobooking';

  var request = function (method, url, onSuccess, onError, data) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case STATUS_OK:
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

      xhr.timeout = TIMEOUT;
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  window.data = {
    load: function (onSuccess, onError) {
      request('GET', GET_DATA_URL, onSuccess, onError);
    },
    upload: function (onSuccess, onError, data) {
      request('POST', SEND_DATA_URL, onSuccess, onError, data);
    }
  };

})();
