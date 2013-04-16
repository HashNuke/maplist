(function() {
  var Maplist,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Maplist = (function() {

    function Maplist(element, options) {
      this.element = element;
      this.options = options;
      this.setIcons = __bind(this.setIcons, this);
      this.hoverCallback = __bind(this.hoverCallback, this);
      this.mapObject = this.options["map"];
      this.icon = this.options["icon"];
      this.hoverIcon = this.options["hoverIcon"];
      this.mapCenter = this.options["center"];
      this.setIcons(0);
      this.childTagName = this.element.children()[0].tagName;
      if (!(this.mapCenter != null)) {
        this.mapCenter = this.element.children(":first").data("latlong");
      }
      this.mapObject.setCenter(new google.maps.LatLng(this.mapCenter[0], this.mapCenter[1]));
      this.element.on("mouseenter", "li", this.hoverCallback);
    }

    Maplist.prototype.hoverCallback = function(event) {
      var target;
      target = $(event.target);
      if (this.childTagName !== event.target.tagName) {
        target = $(event.target).closest(this.childTagName);
      }
      return this.setIcons(target.prevAll().length);
    };

    Maplist.prototype.setIcons = function(selectedOffet) {
      var $child, gLatLong, i, latLong, markerOptions, _ref, _results;
      _results = [];
      for (i = 0, _ref = this.element.children().length; 0 <= _ref ? i < _ref : i > _ref; 0 <= _ref ? i++ : i--) {
        $child = this.element.children().eq(i);
        latLong = $child.data("latlong");
        gLatLong = new google.maps.LatLng(latLong[0], latLong[1]);
        markerOptions = {
          position: gLatLong,
          map: this.mapObject
        };
        if (this.icon != null) markerOptions["icon"] = this.icon;
        if (i === selectedOffet && (this.hoverIcon != null)) {
          markerOptions["icon"] = this.hoverIcon;
        }
        _results.push(new google.maps.Marker(markerOptions));
      }
      return _results;
    };

    return Maplist;

  })();

  $(function() {
    return $.fn.maplist = function(options) {
      return new Maplist(this, options);
    };
  });

}).call(this);
