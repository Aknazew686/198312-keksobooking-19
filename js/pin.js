'use strict';

(function () {
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function(pin,fragment) {
    var pinElement = templatePin.cloneNode(true);

      pinElement.style.left =  pin.location.x + (AVATAR_WIDTH / 2 ) + 'px';
      pinElement.style.top =  pin.location.y + (AVATAR_HEIGHT / 2 ) + 'px';
      pinElement.querySelector('img').src = pin.author.avatar;
      pinElement.querySelector('img').alt = pin.offer.title;
      fragment.appendChild(pinElement);

      pinElement.addEventListener('mousedown', function (evt) {
        if (evt.which === window.const.CLICK_MOUSE_LEFT) {
          window.card.renderCard(pin);
        };
      })

      pinElement.addEventListener('keydown', function (evt) {
        if (evt.key === window.const.ENTER_KEY) {
          window.card.renderCard(pin);
        };
      })
  }

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      pins[i].remove()
    };
  };

  var renderPins = function (pins) {
    removePins();
    var fragment = document.createDocumentFragment();
    var length = pins.length < 5 ? pins.length: 5

    for (var i = 0; i < length; i++) {
      renderPin(pins[i], fragment)
    };

     window.map.map.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removePins,
    templatePin: templatePin
  };
})();
