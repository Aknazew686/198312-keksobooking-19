'use strict';

(function () {
  var photoTemplate = window.map.templateCard.querySelector('.popup__photos').cloneNode(true);
  var modalCard = document.querySelector('.map__card.popup');
  var popupClose = window.map.templateCard.querySelector('.popup__close');

  modalCard.classList.add('hidden');

  var renderFeatures = function (features, container) {
    var featuresElement = container.querySelector('.popup__feature');

    for (var i = 0; i < featuresElement.length; i++) {
      var classType = featuresElement[i].classList[1].split('--')[1];
      if (features.indexOf(classType) === -1) {
        featuresElement[i].remove();
      }
    }
  };

  var renderPhoto = function (photos, container) {
    container.innerHTML = '';

    for (var i = 0; i < photos.length; i++) {
      var cardPhoto = photoTemplate.cloneNode(true);
      cardPhoto.querySelector('img').src = photos[i];
      container.appendChild(cardPhoto);
    }
  };

  var renderCard = function (pin) {
    modalCard.classList.remove('hidden');
    modalCard.querySelector('.popup__title').textContent = pin.offer.title;
    modalCard.querySelector('.popup__text--address').textContent = pin.offer.address;
    modalCard.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    modalCard.querySelector('.popup__type').textContent = window.form.getTypeName(pin.offer.type);
    modalCard.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    modalCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    renderFeatures(pin.offer.features, modalCard.querySelector('.popup__features'));
    modalCard.querySelector('.popup__description').textContent = pin.offer.description;
    renderPhoto(pin.offer.photos, modalCard.querySelector('.popup__photos'));
    modalCard.querySelector('.popup__avatar').src = pin.author.avatar;
  };

  var modalCardHidden = function () {
    modalCard.classList.add('hidden');
  };

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ESC_KEY) {
      modalCardHidden();
    }
  });

  popupClose.addEventListener('mouseup', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      modalCardHidden();
    }
  });

  window.card = {
    modalCard: modalCard,
    renderCard: renderCard,
    popupClose: popupClose,
    modalCardHidden: modalCardHidden
  };
})();
