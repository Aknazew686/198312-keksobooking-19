'use strict';

(function () {

  var statusCode = {
    OK: 200
  };
  var TIME_IN_MS = 10000;
  var URL = 'https://js.dump.academy/keksobooking';

  var makeRequest = function (onSuccess, onError, xhr){
    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_IN_MS;
  };

  window.backend = {
    load: function (onSuccess, onError,) {
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('GET', URL + '/data');
      xhr.send();
      xhr.responseType = 'json';
    },
    sent: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      makeRequest(onSuccess, onError, xhr);
      xhr.open('POST', URL);
      xhr.send(data);
      xhr.responseType = 'json';
    }
  };

  window.map = {
    makeRequest: makeRequest
  };
})();
