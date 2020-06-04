'use strict';

var title = ['Уютное гнездышко для молодоженов', 'Уютная квартирка в центре Токио', 'Гостевой дом для всей семьи'];
var price = [5000, 2000, 1000, 2300, 800, 3000, 1500, 10000];
var type = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var rooms = [1, 2, 3, 4, 5];
var guests = [1, 2, 3, 4, 5];
var checkInOut = ['12:00', '13:00', '14:00'];
var features = ['Wi-Fi', 'Посудомоечная машина', 'Парковка', 'Стиральная машина', 'Лифт', 'Кондиционер'];
var description = ['Замечательное жилье', 'Уютное', 'С евро ремонтом'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ads = [];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomValue = function (min, max) {
  return Math.random() * (max - min) + min;
};

var getArrayRandomValue = function (arr) {
  var randomValue = Math.floor(Math.random() * Math.floor(arr.length));
  return arr[randomValue];
};

var createAd = function (count) {
  var locationX;
  var locationY;

  for (var i = 1; i <= count; i++) {
    locationX = getRandomValue(600, 1200);
    locationY = getRandomValue(130, 630);
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + '0' + i + '.png' // где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
      },
      'offer': {
        'title': getArrayRandomValue(title), // строка, заголовок предложения
        'address': location.x + ', ' + location.y, // строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
        'price': getArrayRandomValue(price), // число, стоимость
        'type': getArrayRandomValue(type), // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
        'rooms': getArrayRandomValue(rooms), // число, количество комнат
        'guests': getArrayRandomValue(guests), // число, количество гостей, которое можно разместить
        'checkin': getArrayRandomValue(checkInOut), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
        'checkout': getArrayRandomValue(checkInOut), // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
        'features': getArrayRandomValue(features), // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
        'description': getArrayRandomValue(description), // строка с описанием,
        'photos': getArrayRandomValue(photos) // массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
      },
      'location': {
        'x': locationX, // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
        'y': locationY // случайное число, координата y метки на карте от 130 до 630.
      }
    };
    ads.push(ad);
  }
  return ads;
};

createAd(9);

var renderPin = function (ad) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinImg = pinTemplate.querySelector('img');
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = ad.location.x - 25 + 'px';
  pin.style.top = ad.location.y - 70 + 'px';
  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;

  return pin;
};

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragment.appendChild(renderPin(ads[i]));
}
mapPins.appendChild(fragment);
