class Maplist

  constructor: (@element, @options) ->
    @mapObject = @options["map"]
    @icon      = @options["icon"]
    @hoverIcon = @options["hoverIcon"]
    @mapCenter = @options["center"]

    # select the first item by default
    @setIcons(0)
    @childTagName = @element.children()[0].tagName

    # if center option is not passed
    # let the first position be the center of the map
    if ! @mapCenter?
      @mapCenter = @element.children(":first").data("latlong")

    @mapObject.setCenter(new google.maps.LatLng(@mapCenter[0], @mapCenter[1]))

    @element.on "mouseenter", "li", @hoverCallback


  hoverCallback: (event) =>
    target   = $(event.target)
    if @childTagName != event.target.tagName
      target = $(event.target).closest(@childTagName)

    @setIcons target.prevAll().length


  setIcons: (selectedOffet) =>
    for i in [0...@element.children().length]
      $child        = @element.children().eq(i)
      latLong       = $child.data("latlong")
      gLatLong      = new google.maps.LatLng(latLong[0], latLong[1])
      markerOptions = { position: gLatLong, map: @mapObject }

      # set custom icon if available
      markerOptions["icon"] = @icon if @icon?

      # use hover icon if available
      if i == selectedOffet && @hoverIcon?
        markerOptions["icon"] = @hoverIcon

      # create marker
      new google.maps.Marker(markerOptions)


$ ->
  $.fn.maplist = (options) ->
    new Maplist(this, options)
