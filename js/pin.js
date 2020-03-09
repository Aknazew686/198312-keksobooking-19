'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var randomNumber = function (min,max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

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
  };

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
  };

  var createPins = function () {
    var pins = [];

    for (var i = 0; i < 8; i++) {
      pins.push(createPin(i))
    }

    return pins;
  };

  var pins = createPins();

  var renderPin = function(index,fragment) {
    var pinElement = templatePin.cloneNode(true);

      pinElement.style.left =  pins[index].location.x + (AVATAR_WIDTH / 2 ) + 'px';
      pinElement.style.top =  pins[index].location.y + (AVATAR_HEIGHT / 2 ) + 'px';
      pinElement.querySelector('img').src = pins[index].author.avatar;
      pinElement.querySelector('img').alt = pins[index].offer.title;
      fragment.appendChild(pinElement);

      pinElement.addEventListener('mousedown', function (evt) {
        if (evt.which === window.const.CLICK_MOUSE_LEFT) {
          window.card.renderCard(pins[index]);
        };
      })

      pinElement.addEventListener('keydown', function (evt) {
        if (evt.key === window.const.ENTER_KEY) {
          window.card.renderCard(pins[index]);
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

  window.pin = {
    renderPins: renderPins,
    templatePin: templatePin
  };
})();
