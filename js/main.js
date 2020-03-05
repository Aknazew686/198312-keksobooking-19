'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;
var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');
var mapPinClickHandler = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.notice');
var adFormElements = adForm.querySelectorAll('fieldset');
var priceInput = document.querySelector('#price');
var typeHousing = document.querySelector('#type')
var room = document.querySelector('#room_number');
var guest = document.querySelector('#capacity');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var photoTemplate = templateCard.querySelector('.popup__photos').cloneNode(true);
var pin = document.querySelector('.map__pin');
var popupClose = templateCard.querySelector('.popup__close');
var isActiveMap = false;

map.appendChild(templateCard);
var modalCard = document.querySelector('.map__card.popup');
modalCard.classList.add('hidden');

map.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    modalCard.classList.add('hidden');
  };
});

popupClose.addEventListener('mouseup', function (evt) {
  if (evt.which === 1) {
    modalCard.classList.add('hidden');
  };
});

room.addEventListener('change', function (evt) {
  if (room.value === '100' && guest.value !== '0') {
    room.setCustomValidity('Должно быть выбранно "не для гостей" ')
  } else if (room.value < guest.value) {
    room.setCustomValidity('Количество гостей превышает количество комнат')
  } else {
    room.setCustomValidity('')
  }
});

guest.addEventListener('change', function (evt) {
  if (guest.value === '0' && room.value !== '100') {
    room.setCustomValidity('Должно быть выбранно "100 комнат" ')
  } else if (guest.value > room.value) {
    guest.setCustomValidity('Количество комнат меньше,чем количество гостей')
  } else {
    guest.setCustomValidity('')
  }
});

var houseType = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
}

timeIn.addEventListener('change', function (evt) {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', function (evt) {
  timeIn.value = evt.target.value;
});

typeHousing.addEventListener('change', function (evt) {
    var value = evt.target.value;

    priceInput.setAttribute('min', houseType[value]);
    priceInput.setAttribute('placeholder', houseType[value]);
});

var toggleDisabled = function(type) {
  for (var i = 0; i < adFormElements.length; i++ ) {
    if (type) {
      adFormElements[i].setAttribute('disabled', 'disabled');
    } else {
      adFormElements[i].removeAttribute('disabled');
    }
  };
}

toggleDisabled(true)

var randomNumber = function (min,max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var randomArr = function (arr) {
  var randomArr = [];
  var copyArr = arr.slice();
  var count =  randomNumber(1,copyArr.length - 1)

  for (var i = 0; i < count; i++) {
    var randomIndex = randomNumber(0,copyArr.length - 1);

    randomArr.push(copyArr[randomIndex]);
    copyArr.splice(randomIndex, 1);
  }

  return randomArr;
}

var createPin = function (i) {
  return {
    author: {
      avatar: 'img/avatars/user0' +  (i + 1) + '.png'
    },
    offer: {
      title: 'объявление',
      address: '600, 350',
      price: randomNumber(0,4000),
      type: 'house',
      rooms: randomNumber(1,4),
      guests: randomNumber(1,8),
      checkin: '12:00',
      checkout: '14:00',
      features: randomArr(FEATURES),
      description: 'Сдается дом для проживания',
      photos: randomArr(PHOTOS)
    },
    location: {
      x: randomNumber(1,1200),
      y: randomNumber(130,630)
    }
  }
}

var createPins = function () {
  var pins = [];

  for (var i = 0; i < 8; i++) {
    pins.push(createPin(i))
  }

  return pins;
}

var pins = createPins();

var getActiveMap = function () {
  if (isActiveMap) {
    return;
  }
  map.classList.remove('map--faded');
  map.appendChild(renderPins());
  toggleDisabled(false);
  adForm.querySelector('form').classList.remove('ad-form--disabled');
  isActiveMap = true;
};

mapPinClickHandler.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    getActiveMap();
  };
});

mapPinClickHandler.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    getActiveMap();
  }
});

function getTypeName(type) {
  switch (type) {
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    default:
      return 'Бунгало';
  }
}

var featureItem = templateCard.querySelector('.popup__feature--wifi');
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

var openCard = function (pin) {
    modalCard.classList.remove('hidden');
    modalCard.querySelector('.popup__title').textContent = pin.offer.title;
    modalCard.querySelector('.popup__text--address').textContent = pin.offer.address;
    modalCard.querySelector('.popup__text--price').textContent = pin.offer.price + '₽/ночь';
    modalCard.querySelector('.popup__type').textContent = getTypeName(pin.offer.type);
    modalCard.querySelector('.popup__text--capacity').textContent = pin.offer.rooms + ' комнаты для ' + pin.offer.guests + ' гостей';
    modalCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + pin.offer.checkin + ', выезд до ' + pin.offer.checkout;
    renderFeatures(pin.offer.features, modalCard.querySelector('.popup__features') );
    modalCard.querySelector('.popup__description').textContent = pin.offer.description;
    renderPhoto(pin.offer.photos, modalCard.querySelector('.popup__photos'));
    modalCard.querySelector('.popup__avatar').src = pin.author.avatar;
};

var renderPin = function(index,fragment) {
  var pinElement = templatePin.cloneNode(true);

    pinElement.style.left =  pins[index].location.x + (AVATAR_WIDTH / 2 ) + 'px';
    pinElement.style.top =  pins[index].location.y + (AVATAR_HEIGHT / 2 ) + 'px';
    pinElement.querySelector('img').src = pins[index].author.avatar;
    pinElement.querySelector('img').alt = pins[index].offer.title;
    fragment.appendChild(pinElement);

    pinElement.addEventListener('mousedown', function (evt) {
      if (evt.which === 1) {
        openCard(pins[index]);
      };
    })

    pinElement.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        openCard(pins[index]);
      };
    })
}

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    renderPin(i, fragment)
  };

  return fragment;
};

