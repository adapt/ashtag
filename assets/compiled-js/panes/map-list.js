// Generated by CoffeeScript 1.6.3
(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    _this = this;

  module("ashtag.panes");

  ashtag.panes.MapListPane = (function(_super) {
    __extends(MapListPane, _super);

    function MapListPane() {
      this.renderLocations = __bind(this.renderLocations, this);
      this.handleMapLoad = __bind(this.handleMapLoad, this);
      _ref = MapListPane.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MapListPane.prototype.handleMapLoad = function(e, map) {
      MapListPane.__super__.handleMapLoad.apply(this, arguments);
      this.centerOnUser();
      return this.getLocations().then(this.renderLocations);
    };

    MapListPane.prototype.getLocations = function() {
      return $.getJSON("/api/v1/tree/");
    };

    MapListPane.prototype.renderLocations = function(json) {
      var tree, _i, _len, _ref1, _results;
      _ref1 = json.objects;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        tree = _ref1[_i];
        _results.push(this.addTree(tree));
      }
      return _results;
    };

    MapListPane.prototype.handleMarkerClick = function(event, marker) {
      if (marker.tree.tag_number) {
        return $.mobile.changePage(marker.tree.view_url);
      }
    };

    MapListPane.prototype.addTree = function(tree) {
      var icon, latLng, marker, markerOpts,
        _this = this;
      latLng = new google.maps.LatLng(tree.latlng[0], tree.latlng[1]);
      if (tree.tag_number) {
        icon = {
          url: '/static/images/map-tree-icon-green.png',
          scaledSize: {
            width: 32,
            height: 32
          }
        };
      } else {
        icon = {
          url: '/static/images/map-tree-icon-orange.png',
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
      return google.maps.event.addListener(marker, 'click', function(e) {
        return _this.handleMarkerClick(e, marker);
      });
    };

    return MapListPane;

  })(ashtag.panes.MapBasePane);

  $(window).on('pagechange', function(event, obj) {
    if (obj.toPage.attr('id') === 'map-page') {
      return new ashtag.panes.MapListPane(obj.toPage);
    }
  });

}).call(this);