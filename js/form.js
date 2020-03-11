'use strict';

(function () {
  var MAINPIN_WIDTH = 62;
  var MAINPIN_HEIGHT = 62;
  var MAINPIN_TRAINGLE_HEIGHT = 22;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var typeHousing = document.querySelector('#type')
  var room = document.querySelector('#room_number');
  var guest = document.querySelector('#capacity');
  var adForm = document.querySelector('.notice');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var priceInput = document.querySelector('#price');
  var mapPinClickHandler = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var form = document.querySelector('.ad-form');
  var successPopup = document.querySelector('#success').content.querySelector('.success');
  var succesTemplate = successPopup.cloneNode(true);
  var main = document.querySelector('main');


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
  };

  toggleDisabled(true);

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

  var xCoord = parseInt(mapPinClickHandler.style.left);
  var yCoord = parseInt(mapPinClickHandler.style.top);

  var renderAdress = function () {
    address.value = xCoord + (MAINPIN_WIDTH / 2) + ', ' + (yCoord + MAINPIN_TRAINGLE_HEIGHT + MAINPIN_HEIGHT);
  };

  mapPinClickHandler.addEventListener('mousedown', function (evt) {
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
        mapPinClickHandler.style.left = (0 - MAINPIN_WIDTH / 2) + 'px';
        xCoord = (0 - MAINPIN_WIDTH / 2);
       } else if (xCoord + MAINPIN_WIDTH / 2 >= 1200) {
        mapPinClickHandler.style.left = (1200 - MAINPIN_WIDTH / 2) + 'px';
        xCoord = (1200 -  MAINPIN_WIDTH / 2);
      } else {
        mapPinClickHandler.style.left = xCoord + 'px';
      };

      if (yCoord + MAINPIN_HEIGHT + MAINPIN_TRAINGLE_HEIGHT <= 130) {
        mapPinClickHandler.style.top = (130 - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT) + 'px';
        yCoord = (130 - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT);
      } else if (yCoord + MAINPIN_HEIGHT + MAINPIN_TRAINGLE_HEIGHT >= 630) {
        yCoord = (630 - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT);
        mapPinClickHandler.style.top = (630 - MAINPIN_HEIGHT - MAINPIN_TRAINGLE_HEIGHT) + 'px';

      } else {
        mapPinClickHandler.style.top = yCoord + 'px';
      };

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

  var hiddenPins = function () {
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.add('hidden');
    };
  };



  var addPopupSuccess = function () {
    main.appendChild(succesTemplate);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    toggleDisabled(true);
    form.classList.add('ad-form--disabled');
    window.upload.upload(new FormData(form), function (response) {
      window.map.map.classList.add('map--faded');
      hiddenPins();
      form.reset();
      addPopupSuccess();
      window.map.isActiveMap = false;
    });
  });

  succesTemplate.addEventListener('mousedown', function (evt) {
    if (evt.which === window.const.CLICK_MOUSE_LEFT) {
      succesTemplate.classList.add('hidden');
    };
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ESC_KEY) {
      succesTemplate.classList.add('hidden');
    };
  });

  window.form = {
    adForm: adForm,
    toggleDisabled: toggleDisabled,
    getTypeName: getTypeName,
    mapPinClickHandler: mapPinClickHandler,
    renderAdress: renderAdress,
    xCoord: xCoord,
    yCoord: yCoord
  };
})();
