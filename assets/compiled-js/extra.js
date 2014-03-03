// Generated by CoffeeScript 1.7.1
(function() {
  var __slice = [].slice;

  module("ashtag.extra");

  ashtag.extra.track = function(o) {
    var tracker, _i, _len, _ref, _results;
    if (window._gat) {
      _ref = window._gat._getTrackers();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tracker = _ref[_i];
        _results.push(tracker._trackEvent(o.category, o.action, o.label, o.value, o.nonInteraction));
      }
      return _results;
    } else if (window._gaq) {
      return window._gaq.push(['_trackEvent', o.category, o.action, o.label, o.value, o.nonInteraction]);
    }
  };

  ashtag.extra.callAfter = function(count, callback) {
    var callCount;
    callCount = 0;
    return function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      callCount += 1;
      if (callCount === count) {
        return callback.apply(null, args);
      }
    };
  };

  ashtag.extra.online = function() {
    return window.navigator.onLine === true || window.navigator.onLine === void 0;
  };

  ashtag.extra.whenOnline = function() {
    var def;
    def = $.Deferred();
    $(window).on('online', (function(_this) {
      return function() {
        return def.resolve();
      };
    })(this));
    if (ashtag.extra.online) {
      def.resolve();
    }
    return def;
  };

  ashtag.extra._locationPromise = null;

  ashtag.extra.geoLocate = (function(_this) {
    return function() {
      var def;
      def = $.Deferred();
      if (!navigator.geolocation) {
        def.reject();
        return def.promise();
      }
      if (ashtag.extra._locationPromise) {
        return ashtag.extra._locationPromise;
      }
      navigator.geolocation.getCurrentPosition(function(position) {
        return def.resolve(position.coords.latitude, position.coords.longitude);
      }, function(error) {
        return def.reject();
      }, {
        timeout: 20000
      });
      ashtag.extra._locationPromise = def;
      return def.promise();
    };
  })(this);

  ashtag.extra.isLatLngSane = function(lat, lng) {
    var bounds;
    bounds = {
      lat: {
        max: 63,
        min: 48
      },
      lng: {
        max: 3,
        min: -12
      }
    };
    if (lat > bounds.lat.max || lat < bounds.lat.min) {
      return false;
    }
    if (lng > bounds.lng.max || lat < bounds.lng.min) {
      return false;
    }
    return true;
  };

}).call(this);
