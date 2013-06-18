(function() {
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

}).call(this);
