/**
 * Static class Map
 */
var Map = {

        /**
         * Global properties
         *
         * @param ajax              Reference to the Ajax-class
         * @param marker            Reference to the marker element
         * @param map               Reference for the map.
         *
         * @param markerArray       Holds all the markers.
         * @param blogArray         Holds all the blog-instances.
         */
        ajax : new Ajax(),
        marker : null,
        map : null,

        markerArray : new Array(),
        blogArray   : new Array(),

        /**
         *	The default position (latitude, longitude), if the
         *	browser can not use geolocation to detect the user's
         *	geographical position
         */
        DEFAULT_LOCATION_LAT : 56.8556997,
        DEFAULT_LOCATION_LNG : 14.8290924,

        /**
         *	This static method acts as a class constructor and triggers
         *	all the event listeners for this application.
         */
        init : function()
        {
            Map.initMap();
            Map.getPosition();
        },

        /**
         *	Method that creates maps object.
         *
         *	@return undefined
         */
        initMap : function()
        {
            var canvas				= document.getElementById('map');
            var options 			= new Object();
            options.zoom		    = 7;
            options.mapTypeId	    = google.maps.MapTypeId.ROADMAP;

            Map.map = new google.maps.Map(canvas, options);
        },

        /**
         * This method gets the current location from the
         * device using the blog.
         */
        getPosition : function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(Map.locationFound, Map.locationUnknown);
            }
        },

        /**
         * This method sends request to Ajax to
         * get the locations for all blogs in the database.
         */
        initMarker : function() {
            var url = 'src/php/rest.php?method=getMarkers';
            Map.ajax.get(url, Map.getMarkersComplete);
        },

        /**
         * This method is a callback method when the markers
         * are returned from Ajax. Starts a new instance of the
         * blog-class with the parameters for each object.
         *
         * @param data              Multidimensional array with blog-data.
         */
        getMarkersComplete : function(data) {
            var array = JSON.parse(data.responseText);
            for(var i in array) {
                var text    = array[i].text;
                var title   = array[i].title;
                var lat     = array[i].lat;
                var lng     = array[i].lng;
                var img     = array[i].image;
                var id      = array[i].blog_id;

                var blog = new Blog();
                blog.init(text, lat, lng, img, title, id);
                Map.blogArray.push(blog);
            }
        },

        /**
         * This method sets the location of the marker
         * to the current location of the device if geolocation
         * is activated.
         *
         * @param position          The location of the device.
         */
        locationFound : function(position)
        {
            var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            Map.map.setCenter(location);
            if(Map.marker) {
                Map.marker.setPosition(location);
                AdminMain.initMarker();
            }
        },

        /**
         * This method sets the markers location to the
         * default location specified in the static parameters,
         * if geolocation is not activated on the device.
         *
         */
        locationUnknown : function() {
            var location = new google.maps.LatLng(Map.DEFAULT_LOCATION_LAT, Map.DEFAULT_LOCATION_LNG);
            Map.map.setCenter(location);
            if(Map.marker) {
                Map.marker.setPosition(location);
                AdminMain.initMarker();
            }
        },

        /**
         * This method creates a new marker when a new
         * blog is created.
         */
        newMarker : function() {
            var options = new Object();
                options.draggable = true;
                options.map = Map.map;
                options.icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
            Map.marker = new google.maps.Marker(options);
            Map.getPosition();
            google.maps.event.addDomListener(Map.marker, "mouseup", AdminMain.initImg);
        }
}
