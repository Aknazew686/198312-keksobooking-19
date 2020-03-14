'use strict';

(function () {
  var filter = document.querySelector('.map__filters');

  var filterPrice = function(type,price) {
    switch (type) {
      case 'any':
        return true;
      case 'low':
        return price <= 10000;
      case 'middle':
        return price > 10000 && price < 50000;
      case 'hight':
        return price >= 50000;
  };
}

  var filterFeatures = function(features, pinFeatures) {
        for(var i = 0; i < features.length; i++) {
          if(pinFeatures.indexOf(features[i]) === -1) {
              return false
          };
        };

        return true
  };

  var filterItem = function(params) {
    return window.data.pins.filter(function(pin) {
      var status = true
        if(params.rooms !=='any' && pin.offer.rooms !== Number(params.rooms)) {
         return false
        }

        if(params.house !=='any' && pin.offer.type !==  params.house) {
          return false
        }

        if(params.guest !=='any' && pin.offer.guests !== Number(params.guests)) {
          return false
        }

        if(!filterPrice(params.price, pin.offer.price)) {
          return false
        }

        if(!filterFeatures(params.features, pin.offer.features)) {
          return false
        }

        return true
    })
  };

  var getCheckboxFeaturesFilter = function() {
    var features = document.querySelectorAll('#housing-features .map__feature');
    var featuresActive = []

    for(var i = 0; i < features.length; i++) {
      if(features[i].isChecked) {
        featuresActive.push(features[i].value);
      }
    };

    return featuresActive;
  }

  var renderFilterPins= function(){
    var house = filter.querySelector('#housing-type').value;
    var price = filter.querySelector('#housing-price').value;
    var rooms = filter.querySelector('#housing-rooms').value;
    var guests = filter.querySelector('#housing-guests').value;
    var features = getCheckboxFeaturesFilter()

    var pins = filterItem({
      house: house,
      price: price,
      rooms: rooms,
      guests: guests,
      features: features
    })

    window.pin.renderPins(pins);
  }

  filter.addEventListener('change', function (evt) {
    renderFilterPins()
  });

  window.filter= {
    renderFilterPins:renderFilterPins
  }

})();
