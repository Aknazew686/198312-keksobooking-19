'use strict';

(function () {
  var filter = document.querySelector('.map__filters');

  var filterPrice = function (type, price) {
    switch (type) {
      case 'any':
        return true;
      case 'low':
        return price <= 10000;
      case 'middle':
        return price > 10000 && price < 50000;
      case 'hight':
        return price >= 50000;
      default:
        return true;
    }
  };

  var filterFeatures = function (features, pinFeatures) {
    return features.every(function (item) {
      return pinFeatures.indexOf(item) !== -1;
    });
  };

  var filterItem = function (params) {
    return window.data.pins.filter(function (pin) {

      if (params.rooms !== 'any' && pin.offer.rooms !== Number(params.rooms)) {
        return false;
      }

      if (params.house !== 'any' && pin.offer.type !== params.house) {
        return false;
      }

      if (params.guests !== 'any' && pin.offer.guests !== Number(params.guests)) {
        return false;
      }

      if (!filterPrice(params.price, pin.offer.price)) {
        return false;
      }

      if (!filterFeatures(params.features, pin.offer.features)) {
        return false;
      }

      return true;
    });
  };

  var getCheckboxFeaturesFilter = function () {
    var features = document.querySelectorAll('#housing-features .map__checkbox');
    var featuresActive = [];

    features.forEach(function (item) {
      if (item.checked) {
        featuresActive.push(item.value);
      }
    });

    return featuresActive;
  };
  var renderFilterPins = function () {
    var house = filter.querySelector('#housing-type').value;
    var price = filter.querySelector('#housing-price').value;
    var rooms = filter.querySelector('#housing-rooms').value;
    var guests = filter.querySelector('#housing-guests').value;
    var features = getCheckboxFeaturesFilter();

    var pins = filterItem({
      house: house,
      price: price,
      rooms: rooms,
      guests: guests,
      features: features
    });
    window.card.modalCardHidden();
    window.pin.renderPins(pins);
  };


  filter.addEventListener('change', window.debounce(function () {
    renderFilterPins();
  }));

  window.filter = {
    renderFilterPins: renderFilterPins
  };

})();
