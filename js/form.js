'use strict';

(function () {
  var MAINPIN_WIDTH = 62;
  var MAINPIN_HEIGHT = 62;
  var MAINPIN_TRAINGLE_HEIGHT = 22;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeHousing = document.querySelector('#type');
  var room = document.querySelector('#room_number');
  var guest = document.querySelector('#capacity');
  var adForm = document.querySelector('.notice');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var filter = document.querySelector('.map__filters');
  var filterElement = filter.querySelectorAll('select, input');
  var priceInput = document.querySelector('#price');
  var mapPinClick = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var succesTemplate = successPopup.cloneNode(true);
  var errorPopup = document.querySelector('#error').content.querySelector('.error');
  var errorTemplate = errorPopup.cloneNode(true);
  var main = document.querySelector('main');
  var buttonReset = document.querySelector('.ad-form__reset');
  var errorButton = document.querySelector('#error').content.querySelector('.error__button');
  var xCoord = parseInt(mapPinClick.style.left, 10);
  var yCoord = parseInt(mapPinClick.style.top, 10);

  var renderAdress = function () {
    address.value = xCoord + (MAINPIN_WIDTH / 2) + ', ' + (yCoord + MAINPIN_TRAINGLE_HEIGHT + MAINPIN_HEIGHT);
  };

  renderAdress();

  buttonReset.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      priceInput.setAttribute('placeholder', 1000);
      resetMainPin();
      xCoord = parseInt(mapPinClick.style.left, 10);
      yCoord = parseInt(mapPinClick.style.top, 10);
      form.reset();
      filter.reset();
      renderAdress();
      window.card.modalCardHidden();
      window.map.map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      toggleDisabled(true);
      filterDisabled(true);
      window.data.isActiveMap = false;
      window.pin.removePins();
    }
  });

  buttonReset.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      priceInput.setAttribute('placeholder', 1000);
      resetMainPin();
      xCoord = parseInt(mapPinClick.style.left, 10);
      yCoord = parseInt(mapPinClick.style.top, 10);
      form.reset();
      filter.reset();
      renderAdress();
      window.card.modalCardHidden();
      window.map.map.classList.add('map--faded');
      form.classList.add('ad-form--disabled');
      toggleDisabled(true);
      filterDisabled(true);
      window.data.isActiveMap = false;
      window.pin.removePins();
    }
  });

  var validationRoom = function () {
    if (room.value === '100' && guest.value !== '0') {
      room.setCustomValidity('Должно быть выбранно "не для гостей" ');
    } else if (room.value < guest.value) {
      room.setCustomValidity('Количество гостей превышает количество комнат');
    } else {
      room.setCustomValidity('');
    }
  };

  var validationGuest = function () {
    if (guest.value === '0' && room.value !== '100') {
      room.setCustomValidity('Должно быть выбранно "100 комнат" ');
    } else if (guest.value > room.value) {
      guest.setCustomValidity('Количество комнат меньше,чем количество гостей');
    } else {
      guest.setCustomValidity('');
    }
  };

  var validateRoomGuest = function () {
    validationGuest();
    validationRoom();
  };

  room.addEventListener('change', function () {
    validateRoomGuest();
  });

  guest.addEventListener('change', function () {
    validateRoomGuest();
  });

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  typeHousing.addEventListener('change', function (evt) {
    var value = evt.target.value;

    priceInput.setAttribute('min', window.const.HOUSE_TYPE[value]);
    priceInput.setAttribute('placeholder', window.const.HOUSE_TYPE[value]);
  });

  var toggleDisabled = function (type) {
    adFormElements.forEach(function (item) {
      if (type) {
        item.setAttribute('disabled', 'disabled');
      } else {
        item.removeAttribute('disabled');
      }
    });
  };

  toggleDisabled(true);

  var filterDisabled = function (type) {
    filterElement.forEach(function (item) {
      if (type) {
        item.setAttribute('disabled', 'disabled');
      } else {
        item.removeAttribute('disabled');
      }
    });
  };

  filterDisabled(true);

  var getTypeName = function (type) {
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
  };

  mapPinClick.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      xCoord = xCoord - shift.x;
      yCoord = yCoord - shift.y;

      if (xCoord + MAINPIN_WIDTH / 2 <= 0) {
        mapPinClick.style.left = (0 - MAINPIN_WIDTH / 2) + 'px';
      } else if (xCoord + MAINPIN_WIDTH / 2 >= 1200) {
        mapPinClick.style.left = (1200 - MAINPIN_WIDTH / 2) + 'px';
      } else {
        mapPinClick.style.left = xCoord + 'px';
      }

      if (yCoord + MAINPIN_HEIGHT + MAINPIN_TRAINGLE_HEIGHT <= 130) {
        mapPinClick.style.top = (130 - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT) + 'px';
      } else if (yCoord + MAINPIN_HEIGHT + MAINPIN_TRAINGLE_HEIGHT >= 630) {
        mapPinClick.style.top = (630 - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT) + 'px';

      } else {
        mapPinClick.style.top = yCoord + 'px';
      }

      renderAdress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var addPopupSuccess = function () {
    main.appendChild(succesTemplate);
  };

  var addPopupError = function (error) {
    errorTemplate.querySelector('.error__message').textContent = error;
    main.appendChild(errorTemplate);
  };

  var resetMainPin = function () {
    mapPinClick.style.left = window.const.MAIN_PIN_DEFAULT_POS.left;
    mapPinClick.style.top = window.const.MAIN_PIN_DEFAULT_POS.top;
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.send(new FormData(form), function () {
      window.map.map.classList.add('map--faded');
      window.pin.removePins();
      form.reset();
      filter.reset();
      window.card.modalCardHidden();
      resetMainPin();
      xCoord = parseInt(mapPinClick.style.left, 10);
      yCoord = parseInt(mapPinClick.style.top, 10);
      addPopupSuccess();
      renderAdress();
      window.data.isActiveMap = false;
    }, function (error) {
      addPopupError(error);
    });
    form.classList.add('ad-form--disabled');
    toggleDisabled(true);
    filterDisabled(true);
    priceInput.setAttribute('placeholder', 1000);
  });

  succesTemplate.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      succesTemplate.remove();
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ESC_KEY) {
      succesTemplate.remove();
      errorTemplate.remove();
    }
  });

  errorTemplate.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      errorTemplate.remove();
    }
  });

  errorButton.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      errorTemplate.remove();
    }
  });

  window.form = {
    adForm: adForm,
    toggleDisabled: toggleDisabled,
    filterDisabled: filterDisabled,
    getTypeName: getTypeName,
    mapPinClick: mapPinClick,
    renderAdress: renderAdress,
    addPopupError: addPopupError,
    xCoord: xCoord,
    yCoord: yCoord
  };
})();
