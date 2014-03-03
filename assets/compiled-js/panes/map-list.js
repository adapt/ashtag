// Generated by CoffeeScript 1.7.1
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  module("ashtag.panes");

  ashtag.panes.MapListPane = (function(_super) {
    __extends(MapListPane, _super);

    function MapListPane() {
      this.renderLocations = __bind(this.renderLocations, this);
      this.handleMapLoad = __bind(this.handleMapLoad, this);
      return MapListPane.__super__.constructor.apply(this, arguments);
    }

    MapListPane.prototype.handleMapLoad = function(e, map) {
      MapListPane.__super__.handleMapLoad.apply(this, arguments);
      return this.getLocations().then(this.renderLocations);
    };

    MapListPane.prototype.getLocations = function() {
      return $.getJSON("/api/v1/marker/", {
        limit: 0
      });
    };

    MapListPane.prototype.renderLocations = function(json) {
      var tree, _i, _len, _ref, _results;
      _ref = json.objects;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tree = _ref[_i];
        _results.push(this.addTree(tree));
      }
      return _results;
    };

    MapListPane.prototype.handleMarkerClick = function(event, marker) {
      return $.mobile.changePage(marker.tree.view_url);
    };

    MapListPane.prototype._getMarkerIcon = function(tree) {
      var probability, tagged;
      tagged = tree.tag_number ? 'tagged' : 'untagged';
      if (tree.disease_state === true) {
        probability = 'likely';
      } else if (tree.disease_state === false) {
        probability = 'unlikely';
      } else if (tree.disease_state === null) {
        probability = 'uncertain';
      }
      return "/static/images/markers/" + tagged + "-" + probability + ".png";
    };

    MapListPane.prototype.addTree = function(tree) {
      var icon, latLng, marker, markerOpts;
      latLng = new google.maps.LatLng(tree.latlng[0], tree.latlng[1]);
      if (tree.tag_number) {
        icon = {
          url: this._getMarkerIcon(tree),
          scaledSize: {
            width: 32,
            height: 32
          }
        };
      } else {
        icon = {
          url: this._getMarkerIcon(tree),
          scaledSize: {
            width: 18,
            height: 18
          }
        };
      }
      markerOpts = {
        icon: icon,
        position: latLng,
        map: this.map
      };
      marker = new google.maps.Marker(markerOpts);
      marker.tree = tree;
      return google.maps.event.addListener(marker, 'click', (function(_this) {
        return function(e) {
          return _this.handleMarkerClick(e, marker);
        };
      })(this));
    };

    return MapListPane;

  })(ashtag.panes.MapBasePane);

  $(window).on('pagechange', (function(_this) {
    return function(event, obj) {
      if (obj.toPage.attr('id') === 'map-page') {
        return new ashtag.panes.MapListPane(obj.toPage);
      }
    };
  })(this));

}).call(this);
