'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var AVATAR_WIDTH = 40;
var AVATAR_HEIGHT = 40;
var map = document.querySelector('.map');
var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');
var templateCard = document.querySelector('#card').content.querySelector('.map__card');

var randomNumber = function (min,max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var randomArr = function (arr) {
  var randomArr = [];
  var copyArr = arr.slice();

  for (var i = 0; i < randomNumber(1,copyArr.length - 1); i++) {
    var randomIndex = randomNumber(0,copyArr.length - 1)
    randomArr.push(copyArr[randomIndex]);
    copyArr.splice(copyArr[randomIndex], 1);
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

map.classList.remove('map--faded');

var renderPins = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var pinElement = templatePin.cloneNode(true);

    pinElement.style.left =  pins[i].location.x + (AVATAR_WIDTH / 2 ) + 'px';
    pinElement.style.top =  pins[i].location.y + (AVATAR_HEIGHT / 2 ) + 'px';
    pinElement.querySelector('img').src = pins[i].author.avatar;
    pinElement.querySelector('img').alt = pins[i].offer.title;

    fragment.appendChild(pinElement);
  }

  return fragment;
};

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

var renderCard = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    var cardElement = templateCard.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = pins[i].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = pins[i].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = pins[i].offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = getTypeName(pins[i].offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = pins[i].offer.rooms + ' комнаты для ' + pins[i].offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + pins[i].offer.checkin + ', выезд до ' + pins[i].offer.checkout;
    //cardElement.querySelector('.popup__features') = '#';
    cardElement.querySelector('.popup__description').textContent = pins[i].offer.description;
    cardElement.querySelector('.popup__photos').src = pins[i].offer.photos;
    cardElement.querySelector('.popup__avatar').src = pins[i].author.avatar;

  fragment.appendChild(cardElement);
  }

  return fragment;
};

map.appendChild(renderPins());
map.appendChild(renderCard());
