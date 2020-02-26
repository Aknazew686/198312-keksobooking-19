'use strict';

var randomNumber = function (min,max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

var arrFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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

randomArr(arrFeatures);

var arrPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var pins = [];

var createPins = function () {
  for (var i = 0; i < 8; i++) {
    pins.push(createPin(i))
  }
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
      features: [randomArr(arrFeatures)],
      description: 'Сдается дом для проживания',
      photos: [randomArr(arrPhotos)]
    },
    location: {
      x: randomNumber(1,1200),
      y: randomNumber(130,630)
    }
  }
}

createPins();

var arrayRandElement = function (arr) {
  var random = Math.floor(Math.random() * arr.length);
  return arr[random];
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');


var randomX = function () {
  var randX = 'left: ' + randomNumber(1,1200) + 'px;';
  return randX;
}

var randomY = function () {
  var randY = ' top: ' + randomNumber(130,630) + 'px;';
  return randY;
}

var mapPin = document.querySelector('.map__pin');
mapPin.setAttribute('style', randomX() + randomY());
mapPin.querySelector('img').src = arrayRandElement(pins).author.avatar;
mapPin.querySelector('img').alt = arrayRandElement(pins).offer.title;

var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
fragment.appendChild(pins);
mapPins.appendChild(fragment);

var templatePin = document.querySelector('#pin')
.content
.querySelector('.map__pins');


for (var i = 0; i < pins.length; i++) {
  var PinElement = templatePin.cloneNode(true);

  mapPins.querySelector('img').src = pins[i].author.avatar;
  mapPins.querySelector('img').alt = pins[i].offer.title;

  mapPins.appendChild(PinElement);
}

