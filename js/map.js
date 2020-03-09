'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var isActiveMap = false;
  var map = document.querySelector('.map');

  var getActiveMap = function () {
    if (isActiveMap) {
      return;
    }
    map.classList.remove('map--faded');
    map.appendChild(window.pin.renderPins());
    window.form.toggleDisabled(false);
    window.form.adForm.querySelector('form').classList.remove('ad-form--disabled');
    isActiveMap = true;
  };

  map.appendChild(templateCard);

  window.form.mapPinClickHandler.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      getActiveMap();
      window.load.load(renderPins);
      window.form.renderAdress();
    };
  });

  window.form.mapPinClickHandler.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      getActiveMap();
      window.load.load(renderPins);
      window.form.renderAdress();
    }
  });

  window.map = {
    map: map,
    templateCard: templateCard
  };
})();
