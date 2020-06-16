'use strict';

(function () {
  var TITLE = ['Уютное гнездышко для молодоженов', 'Уютная квартирка в центре Токио', 'Гостевой дом для всей семьи'];
  var ADDRESS = ['101-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3', '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3', '103-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3'];
  var PRICE = [5000, 2000, 1000, 2300, 800, 3000, 1500, 10000];
  var TYPE = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
  var ROOMS = [1, 2, 3, 4, 5];
  var GUESTS = [1, 2, 3, 4, 5];
  var CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['Замечательное жилье', 'Уютное', 'С евро ремонтом'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  // var ads = [];

  var getRandomValue = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var getArrayRandomValue = function (arr) {
    var randomValue = Math.floor(Math.random() * Math.floor(arr.length));
    return arr[randomValue];
  };

  window.data = {
    createAd: function (count) {
      var locationX;
      var locationY;

      for (var i = 1; i <= count; i++) {
        var avatarNumber = i % 8 + 1;
        locationX = getRandomValue(600, 1200);
        locationY = getRandomValue(130, 630);
        var ad = {
          'author': {
            'avatar': 'img/avatars/user' + '0' + avatarNumber + '.png' // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
          },
          'offer': {
            'title': getArrayRandomValue(TITLE), // строка, заголовок предложения
            'address': getArrayRandomValue(ADDRESS), // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
            'price': getArrayRandomValue(PRICE), // число, стоимость
            'type': getArrayRandomValue(TYPE), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
            'rooms': getArrayRandomValue(ROOMS), // число, количество комнат
            'guests': getArrayRandomValue(GUESTS), // число, количество гостей, которое можно разместить
            'checkin': getArrayRandomValue(CHECK_IN_OUT), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
            'checkout': getArrayRandomValue(CHECK_IN_OUT), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
            'features': [getArrayRandomValue(FEATURES)], // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
            'description': getArrayRandomValue(DESCRIPTION), // строка с описанием,
            'photos': [getArrayRandomValue(PHOTOS)] // массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
          },
          'location': {
            'x': locationX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
            'y': locationY // случайное число, координата y метки на карте от 130 до 630.
          }
        };
        window.data.ads.push(ad);
      }
      return window.data.ads;
    },
    ads: []
  };
})();
