'use strict';

(function () {
  window.craeteCard = function (ad) {
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
    checkInOutCard.textContent = 'Заезд после ' + ad.offer.checkin + ', ' + 'выезд до ' + ad.offer.checkout;
    descriptionCard.textContent = ad.offer.description;

    var renderType = function () {
      switch (ad.offer.type) {
        case 'flat':
          typeCard.textContent = 'Квартира';
          break;
        case 'house':
          typeCard.textContent = 'Дом';
          break;
        case 'bungalo':
          typeCard.textContent = 'Бунгало';
          break;
      }
    };
    renderType();

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

      if (photosArray.length > 1) {
        var fragmentPhoto = document.createDocumentFragment();
        for (var p = 0; p < photosArray.length; p++) {
          var clonedPhoto = photoCard.cloneNode(true);
          clonedPhoto.src = photosArray[p];
          fragmentPhoto.appendChild(clonedPhoto);
        }
        photosCard.appendChild(fragmentPhoto);
      }
      if (photosArray.length > 0) {
        photoCard.src = photosArray[0];
      } else {
        photosCard.remove();
      }
    };
    renderPhotos(ad.offer.photos);

    card.querySelector('.popup__close').addEventListener('click', function () {
      card.remove();
    });

    return card;
  };
})();
