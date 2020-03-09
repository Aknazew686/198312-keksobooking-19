'use strict';

(function () {
  var AVATAR_WIDTH = 40;
  var AVATAR_HEIGHT = 40;
  var templatePin = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var renderPins = function (pins) {
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
