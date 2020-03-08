'use strict';

(function () {
  var photoTemplate = window.map.templateCard.querySelector('.popup__photos').cloneNode(true);
  var modalCard = document.querySelector('.map__card.popup');
  var featureItem = window.map.templateCard.querySelector('.popup__feature--wifi');
  var popupClose = window.map.templateCard.querySelector('.popup__close');

  modalCard.classList.add('hidden');

  featureItem.classList.remove('popup__feature--wifi');

  var renderFeatures = function (features, container) {
    container.innerHTML = '';

    for (var i = 0; i < features.length; i++) {
      var cardFeature = featureItem.cloneNode(true);
      cardFeature.classList.add('popup__feature--' + features[i]);
      container.appendChild(cardFeature);
    }
  };

  var renderPhoto = function (photo, container) {
    container.innerHTML = '';

     for (var i = 0; i < photo.length; i++) {
       var cardPhoto = photoTemplate.cloneNode(true);
       cardPhoto.querySelector('img').src = photo[i];
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
    renderFeatures(pin.offer.features, modalCard.querySelector('.popup__features') );
    modalCard.querySelector('.popup__description').textContent = pin.offer.description;
    renderPhoto(pin.offer.photos, modalCard.querySelector('.popup__photos'));
    modalCard.querySelector('.popup__avatar').src = pin.author.avatar;
};

window.map.map.addEventListener('keydown', function (evt) {
  if (evt.key === window.const.ESC_KEY) {
    modalCard.classList.add('hidden');
  };
});

popupClose.addEventListener('mouseup', function (evt) {
  if (evt.which === window.const.CLICK_MOUSE_LEFT) {
    modalCard.classList.add('hidden');
  };
});

window.card = {
  modalCard: modalCard,
  renderCard: renderCard
};
})();
