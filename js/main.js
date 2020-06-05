'use strict';

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
    ads.push(ad);
  }
  return ads;
};

createAd(1);

var renderPin = function (ad) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pin = pinTemplate.cloneNode(true);
  var pinImg = pin.querySelector('img');

  pin.style.left = ad.location.x - 25 + 'px';
  pin.style.top = ad.location.y - 70 + 'px';
  pinImg.src = ad.author.avatar;
  pinImg.alt = ad.offer.title;

  return pin;
};

var mapPins = document.querySelector('.map__pins');
var fragmentPin = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragmentPin.appendChild(renderPin(ads[i]));
}
mapPins.appendChild(fragmentPin);

var renderCard = function (adArray) {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);

  var avatarCard = card.querySelector('.popup__avatar');
  var titleCard = card.querySelector('.popup__title');
  var addressCard = card.querySelector('.popup__text--address');
  var priceCard = card.querySelector('.popup__text--price');
  var typeCard = card.querySelector('.popup__type');
  var capacityCard = card.querySelector('.popup__text--capacity');
  var checkInOutCard = card.querySelector('.popup__text--time');
  var descriptionCard = card.querySelector('.popup__description');

  avatarCard.src = adArray[0].author.avatar;
  titleCard.textContent = adArray[0].offer.title;
  addressCard.textContent = adArray[0].offer.address;
  priceCard.textContent = adArray[0].offer.price + ' ₽/ночь';
  typeCard.textContent = adArray[0].offer.type;
  // if for different number of rooms and guests
  capacityCard.textContent = adArray[0].offer.rooms + ' комнаты для ' + adArray[0].offer.guests + ' гостей';
  checkInOutCard.textContent = 'Заезд после ' + adArray[0].offer.checkin + ', ' + 'выезд до ' + adArray[0].offer.checkout;
  descriptionCard.textContent = adArray[0].offer.description;

  var renderFeatures = function (featuresArr) {
    var featuresCard = card.querySelector('.popup__features');
    var featuresLi = featuresCard.querySelectorAll('li');

    for (var f = 0; f < featuresLi.length; f++) {
      featuresLi[f].style.display = 'none';
    }

    for (var j = 0; j < featuresArr.length; j++) {

      if (featuresArr[j] === 'wifi') {
        var featureWifi = featuresCard.querySelector('.popup__feature--wifi');
        featureWifi.style.display = 'inline-block';
      }
      if (featuresArr[j] === 'dishwasher') {
        var featureDishwasher = featuresCard.querySelector('.popup__feature--dishwasher');
        featureDishwasher.style.display = 'inline-block';
      }
      if (featuresArr[j] === 'parking') {
        var featureParking = featuresCard.querySelector('.popup__feature--parking');
        featureParking.style.display = 'inline-block';
      }
      if (featuresArr[j] === 'washer') {
        var featureWasher = featuresCard.querySelector('.popup__feature--washer');
        featureWasher.style.display = 'inline-block';
      }
      if (featuresArr[j] === 'elevator') {
        var featureElevator = featuresCard.querySelector('.popup__feature--elevator');
        featureElevator.style.display = 'inline-block';
      }
      if (featuresArr[j] === 'conditioner') {
        var featureConditioner = featuresCard.querySelector('.popup__feature--conditioner');
        featureConditioner.style.display = 'inline-block';
      }
    }
  };
  renderFeatures(adArray[0].offer.features);

  var renderPhotos = function (photosArr) {
    var photosCard = card.querySelector('.popup__photos');
    var photoCard = card.querySelector('.popup__photo');
    photoCard.src = photosArr[0];

    if (photosArr.length > 1) {
      var fragmentPhoto = document.createDocumentFragment();
      for (var p = 1; p < photosArr.length; p++) {
        var clonedPhoto = photoCard.cloneNode(true);
        clonedPhoto.src = photosArr[p];
        fragmentPhoto.appendChild(clonedPhoto);
      }
      photosCard.appendChild(fragmentPhoto);
    }
  };
  renderPhotos(adArray[0].offer.photos);

  return card;
};

var mapFilters = document.querySelector('.map__filters-container');
map.insertBefore(renderCard(ads), mapFilters);
