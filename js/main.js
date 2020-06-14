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
var adForm = document.querySelector('.ad-form');
var mapPinMain = map.querySelector('.map__pin--main');
var addressField = adForm.querySelector('#address');

var disableFields = function (fields) {
  for (var f = 0; f < fields.length; f++) {
    fields[f].setAttribute('disabled', '');
  }
};
var fieldsets = document.querySelectorAll('fieldset');
disableFields(fieldsets);
var selects = document.querySelectorAll('select');
disableFields(selects);

var activateFields = function (fields) {
  for (var f = 0; f < fields.length; f++) {
    fields[f].removeAttribute('disabled');
  }
};

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

// Counts coordinates of the middle of the main pin
var fillDefaultAddress = function () {
  var mainPinStyles = window.getComputedStyle(mapPinMain);
  var positionTop = mainPinStyles.getPropertyValue('top');
  var positionLeft = mainPinStyles.getPropertyValue('left');
  var width = mainPinStyles.getPropertyValue('width');
  var height = mainPinStyles.getPropertyValue('height');
  var xCenter = parseInt(positionLeft, 10) + Math.floor(parseInt(width, 10) / 2);
  var yCenter = parseInt(positionTop, 10) + Math.floor(parseInt(height, 10) / 2);
  addressField.value = xCenter + ', ' + yCenter;

  return {x: xCenter, y: yCenter, width: width};
};
fillDefaultAddress();

var onPinMainMousedown = function (evt) {
  var buttonPressed = evt.button;
  if (buttonPressed === 0 || evt.code === 'Enter') {
    activatePage();
  }
};
mapPinMain.addEventListener('mousedown', onPinMainMousedown);
mapPinMain.addEventListener('keydown', onPinMainMousedown);

var activatePage = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  activateFields(fieldsets);
  activateFields(selects);

  createAd(4);

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

  var mapFilter = map.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');
  var fragmentPin = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    var pin = renderPin(ads[i]);
    fragmentPin.appendChild(pin);

    (function (index) {
      pin.addEventListener('click', function () {
        closePopup();
        document.addEventListener('keydown', closeByEscapeHandler);
        map.insertBefore(renderCard(ads[index]), mapFilter);
      });
    })(i);

    (function (index) {
      pin.addEventListener('keydown', function (evt) {
        if (evt.code === 'Enter') {
          closePopup();
          map.insertBefore(renderCard(ads[index]), mapFilter);
        }
      });
    })(i);
  }
  mapPins.appendChild(fragmentPin);

  var fillAddressActiveMap = function () {
    var pointerHeight = 18; // from pseudo element ::after of mapPinMain, border-top property
    var pointerY = fillDefaultAddress().y + Math.floor(parseInt(fillDefaultAddress().width, 10) / 2) + pointerHeight;
    addressField.value = fillDefaultAddress().x + ', ' + pointerY;
  };
  fillAddressActiveMap();

  // Validation

  var guestsSelect = adForm.querySelector('#capacity');
  var roomsSelect = adForm.querySelector('#room_number');
  var validateRoomsGuestsNumber = function () {
    var roomsValue = parseInt(roomsSelect.value, 10);
    var guestsValue = parseInt(guestsSelect.value, 10);
    if (roomsValue === 1 && (guestsValue === 0 || guestsValue > roomsValue)) {
      roomsSelect.setCustomValidity('для 1 гостя');
    } else if (roomsValue === 2 && (guestsValue === 0 || guestsValue > roomsValue)) {
      roomsSelect.setCustomValidity('для 1 или 2 гостей');
    } else if (roomsValue === 3 && (guestsValue === 0 || guestsValue > roomsValue)) {
      roomsSelect.setCustomValidity('для 1, 2 или 3 гостей');
    } else if (roomsValue === 100 && guestsValue !== 0) {
      roomsSelect.setCustomValidity('не для гостей');
    } else {
      roomsSelect.setCustomValidity('');
    }
  };
  roomsSelect.addEventListener('change', validateRoomsGuestsNumber);
  guestsSelect.addEventListener('change', validateRoomsGuestsNumber);

  // title validation

  var title = adForm.querySelector('#title');
  var titleValidationHandler = function () {
    if (title.value.length === 0) {
      title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов.');
    } else if (title.value.length < 30) {
      title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов. Введите еще ' + (30 - title.value.length));
    } else if (title.value.length > 100) {
      title.setCustomValidity('Заголовок объявления должен содержать от 30 до 100 символов. Удалите ' + (title.value.length - 100));
    } else {
      title.setCustomValidity('');
    }
  };
  title.addEventListener('input', titleValidationHandler);

  // price validation

  var price = adForm.querySelector('#price');
  var priceValidationHandler = function () {
    if (price.value.length === 0) {
      price.setCustomValidity('Заполните поле. Цена за ночь должна быть меньше 1 000 000');
    } else if (price.value > 1000000) {
      price.setCustomValidity('Цена за ночь должна быть меньше 1 000 000');
    }
  };
  price.addEventListener('change', priceValidationHandler);

  // price/type validation

  var type = adForm.querySelector('#type');
  var priceTypeValidationHandler = function () {

    var getMinPriceNotification = function (minPrice) {
      return price.value < minPrice ? price.setCustomValidity('Минимальная цена за ночь для ' + type.options[type.selectedIndex].text + ': ' + minPrice) : price.setCustomValidity('');
    };

    switch (type.value) {
      case 'flat': getMinPriceNotification(1000);
        break;
      case 'house': getMinPriceNotification(5000);
        break;
      case 'palace': getMinPriceNotification(10000);
    }
  };
  price.addEventListener('change', priceTypeValidationHandler);
  type.addEventListener('change', priceTypeValidationHandler);

  // timein/timout validation

  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var timeinOutValidationHandler = function () {
    if (timein.value !== timeout.value) {
      timeout.setCustomValidity('Для времени заезда ' + timein.options[timein.selectedIndex].text + ', время выезда должно быть Выезд до ' + timein.value.substr(-0, 2));
    } else {
      timeout.setCustomValidity('');
    }
  };
  timein.addEventListener('change', timeinOutValidationHandler);
  timeout.addEventListener('change', timeinOutValidationHandler);

  mapPinMain.removeEventListener('mousedown', onPinMainMousedown);
  mapPinMain.removeEventListener('keydown', onPinMainMousedown);

  var renderCard = function (ad) {
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

    avatarCard.src = ad.author.avatar;
    titleCard.textContent = ad.offer.title;
    addressCard.textContent = ad.offer.address;
    priceCard.textContent = ad.offer.price + ' ₽/ночь';
    typeCard.textContent = ad.offer.type;
    checkInOutCard.textContent = 'Заезд после ' + ad.offer.checkin + ', ' + 'выезд до ' + ad.offer.checkout;
    descriptionCard.textContent = ad.offer.description;

    var adjustRoomsText = function () {
      if (ad.offer.rooms === 1) {
        return ad.offer.rooms + ' комната для ';
      } else if (ad.offer.rooms > 1 && ad.offer.rooms < 5) {
        return ad.offer.rooms + ' комнаты для ';
      } else {
        return ad.offer.rooms + ' комнат для ';
      }
    };

    var adjustGuestsText = function () {
      if (ad.offer.guests === 1) {
        return ad.offer.guests + ' гостя';
      } else {
        return ad.offer.guests + ' гостей';
      }
    };
    capacityCard.textContent = adjustRoomsText() + adjustGuestsText();

    var renderFeatures = function (featuresArray) {
      var featuresCard = card.querySelector('.popup__features');
      featuresCard.innerHTML = '';

      for (var j = 0; j < featuresArray.length; j++) {
        var cardLiTemplate = document.querySelector('#card').content.querySelector('.popup__feature');
        var feature = cardLiTemplate.cloneNode(true);
        feature.className = 'popup__feature popup__feature--' + featuresArray[j];
        featuresCard.appendChild(feature);
      }
    };
    renderFeatures(ad.offer.features);

    var renderPhotos = function (photosArray) {
      var photosCard = card.querySelector('.popup__photos');
      var photoCard = card.querySelector('.popup__photo');
      photoCard.src = photosArray[0];

      if (photosArray.length > 1) {
        var fragmentPhoto = document.createDocumentFragment();
        for (var p = 1; p < photosArray.length; p++) {
          var clonedPhoto = photoCard.cloneNode(true);
          clonedPhoto.src = photosArray[p];
          fragmentPhoto.appendChild(clonedPhoto);
        }
        photosCard.appendChild(fragmentPhoto);
      }
    };
    renderPhotos(ad.offer.photos);

    card.querySelector('.popup__close').addEventListener('click', function () {
      card.remove();
    });

    return card;
  };

  var closePopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };

  var closeByEscapeHandler = function (evt) {
    var popup = map.querySelector('.popup');
    if (evt.code === 'Escape') {
      popup.remove();
      document.removeEventListener('keydown', closeByEscapeHandler);
    }
  };
};
