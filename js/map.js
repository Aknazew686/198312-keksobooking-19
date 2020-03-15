'use strict';

(function () {
  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');

  var getActiveMap = function () {
    if (window.data.isActiveMap) {
      return;
    }
    map.classList.remove('map--faded');
    window.backend.load(function (data) {
      window.data.pins = data.filter(function (item) {
        return item.offer !== undefined;
      });
      window.filter.renderFilterPins();
    }, function (error) {
      window.form.addPopupError(error);
    });
    window.form.toggleDisabled(false);
    window.form.filterDisabled(false);
    window.form.adForm.querySelector('form').classList.remove('ad-form--disabled');
    window.data.isActiveMap = true;
  };

  map.appendChild(templateCard);

  window.form.mapPinClickHandler.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      getActiveMap();
      window.form.renderAdress();
    }

  });

  window.form.mapPinClickHandler.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      getActiveMap();
      window.form.renderAdress();
    }
  });

  window.map = {
    map: map,
    templateCard: templateCard,
  };
})();
