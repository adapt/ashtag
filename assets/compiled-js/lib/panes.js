(function() {
  var __slice = [].slice;

  window.module = function(name, node) {
    var parts, path, _name, _name1;
    if (node == null) {
      node = window;
    }
    path = [];
    if (typeof name === "string") {
      parts = name.split(".");
    } else {
      parts = name;
    }
    if (parts.length > 1) {
      node[_name = parts[0]] || (node[_name] = {});
      return module(parts.slice(1, +parts.length + 1 || 9e9), node[parts[0]]);
    } else {
      return node[_name1 = parts[0]] || (node[_name1] = {});
    }
  };

  module("ashtag.lib.panes");

  ashtag.lib.panes.BasePane = (function() {
    BasePane.prototype.requiredParams = [];

    function BasePane($el, spec) {
      var _ref;
      this.$el = $el;
      this.spec = spec != null ? spec : {};
      ashtag.lib.mixins.Observable.prototype.augment(this);
      if ((_ref = this.requiredParams) != null ? _ref.length : void 0) {
        this._requireParams.apply(this, this.requiredParams);
      }
      this.$el.data('pane', this);
      this.initialise();
      this.setupEvents();
      this.start();
    }

    BasePane.prototype._requireParams = function() {
      var name, names, _i, _len, _results;
      names = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _results = [];
      for (_i = 0, _len = names.length; _i < _len; _i++) {
        name = names[_i];
        if (this.spec[name] == null) {
          throw "Param '" + name + "' was not specified";
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    BasePane.prototype.$ = function(selector) {
      return jQuery(selector, this.$el);
    };

    BasePane.prototype.initialise = function() {};

    BasePane.prototype.setupEvents = function() {};

    BasePane.prototype.start = function() {};

    return BasePane;

  })();

}).call(this);
