/**
 * Dynamic class Blog
 *
 * @type {Function}
 */
var Blog = (function() {
    var current 	= this; //Reference to the this object.

    /**
     * Global properties
     *
     * @param text          Holds the text value.
     * @param title         Holds the title value.
     * @param lat           Latitude for the blog
     * @param lng           Longitude for the blog.
     * @param img           Images stored in the blog.
     * @param id            The database id for the blog.
     *
     * @param marker        Reference to the marker created.
     * @param selected      Boolean to check if the blog is selected or not.
     */
    this.text        = null;
    this.title       = null;
    this.lat         = null;
    this.lng         = null;
    this.img         = null;
    this.id          = null;

    this.marker      = null;
    this.selected    = false;

    /**
     * This method is called from the Map-class
     * and recives all the parameters for the blog.
     *
     * @param title         Title value for the blog.
     * @param text          Text value for the blog
     * @param lat           latitude for the blog
     * @param lng           longitude for the blog
     * @param img           image for the blog.
     * @param id            Reference to the blog's id
     */
    this.init = function(text, lat, lng, img, title, id) {
        current.text    = text;
        current.title   = title;
        current.lat     = lat;
        current.lng     = lng;
        current.img     = img;
        current.id      = id;
        createMarker();
    };

    /**
     * This method creates a new marker object
     * with the latitude and longitude parameters
     * for the blog.
     */
    function createMarker() {
        var location = new google.maps.LatLng(current.lat, current.lng);
        var options = new Object();
            options.map = Map.map;
            options.position = location;
            options.icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
        current.marker = new google.maps.Marker(options);
        Map.markerArray.push(current.marker);
        google.maps.event.addListener(current.marker, "click", selectMarker);
    }

    /**
     * This event presents the current blog
     * when the marker for the blog is selected.
     *
     * @param event             Mouse event.
     */
    function selectMarker(event) {
        var blog = document.getElementById('read-blog');
            blog.innerHTML = '';

        var blogTitle = document.createElement('p');
            blogTitle.innerHTML = current.title;
            blogTitle.setAttribute("class", "blogtitle");

        var blogtext = document.createElement('p');
            blogtext.innerHTML = current.text;
            blogtext.setAttribute("class", "blogtext");

        if(current.img != "undefined") {
            var imgElm = document.createElement('img');
            imgElm.setAttribute("src", current.img);
            blog.appendChild(imgElm);
        }

        blog.appendChild(blogTitle);
        blog.appendChild(blogtext);

        checkAdmin();
    }

    /**
     * This method sends an request to Ajax to check
     * if the admin account is signed in.
     */
    function checkAdmin() {
        var ajax = new Ajax();
        var url  = "src/php/rest.php?method=checkAdmin";
        ajax.get(url, checkComplete);
    }

    /**
     * This method is a callback method when
     * for the admin check.
     *
     * @param data              Data from php.
     */
    function checkComplete(data){
        var key = data.responseText;
        if(key == 1) {
            var blog = document.getElementById('read-blog');
            initSettings(blog);
            initRemove(blog);
        }
    }

    /**
     * This method creates a button to update
     * the text and title information in the blog
     *
     * @param blog              Reference to the containr-element.
     */
    function initSettings(blog) {
        var button = document.createElement('button');
            button.innerHTML = "edit";
            button.setAttribute("class", "settings");
        blog.appendChild(button);
        Event.addEventListener(button, "click", settings);
    }

    /**
     * This method creates a button to remove
     * the current blog.
     *
     * @param blog              Reference to the container-element.
     */
    function initRemove(blog) {
        var button = document.createElement('button');
            button.innerHTML = 'Remove';
            button.setAttribute("class", "remove");
        blog.appendChild(button);
        Event.addEventListener(button, "click", remove);
    }

    /**
     * This method removes the information in the blog
     * window and creates two textareas and adds the information
     * in the blog. Also creates a new save button.
     *
     * @param event             Mouse event.
     */
    function settings(event) {
        var blog = document.getElementById('read-blog');
            blog.innerHTML = '';
        var blogtitle = document.createElement('textarea');
            blogtitle.innerHTML = current.title;
            blogtitle.setAttribute("class", "blogtitle");

        var blogtext    = document.createElement('textarea');
            blogtext.innerHTML = current.text;
            blogtext.setAttribute("class", "blogtext");

        var submit      = document.createElement('button');
            submit.innerHTML = "save";

        blog.appendChild(blogtitle);
        blog.appendChild(blogtext);
        blog.appendChild(submit);

        Event.addEventListener(submit, "click", save);
    }

    /**
     * This method sends request with Ajax to remove the
     * current blog from the database.
     *
     * @param event             Mouse Event.
     */
    function remove(event) {
        var url = 'src/php/rest.php?method=removeBlog';
        var data = "id=" + current.id;
        var ajax = new Ajax();
        ajax.post(url, data, removeCallback);
    }

    /**
     * This method is a callback when the blog
     * has been removed from the database.
     *
     * removes the marker from the map and clears the blog.
     *
     * @param data              Data from php.
     */
    function removeCallback(data) {
        for(var i = 0; i < Map.markerArray.length; i++) {
            Map.markerArray[i].setMap(null);
        }
        var index = Map.blogArray.indexOf(current);
        Map.blogArray[index] = "undefined";
        Map.blogArray.splice(index, 1);

        Map.markerArray = [];
        Map.initMarker();
    }

    /**
     * This method collects all the information
     * for the blog and sends an request with Ajax
     * to update the database with the new information.
     *
     * @param event             Mouse event.
     */
    function save(event) {
        var title = document.getElementsByClassName('blogtitle')[0].value;
        var text  = document.getElementsByClassName('blogtext')[0].value;

        current.title = title;
        current.text  = text;

        var data = ('text=' + text + '&title=' + title + '&id=' + current.id);
        var url = "src/php/rest.php?method=updateBlog";
        var ajax = new Ajax();
        ajax.post(url, data, saveBlogComplete);
    }

    /**
     * This method is a callback method when the
     * database is updated with the new information.
     *
     * @param data              Data from php.
     */
    function saveBlogComplete(data) {
        var blog = document.getElementById('read-blog');
        var title = document.getElementsByClassName('blogtitle')[0];
        var text  = document.getElementsByClassName('blogtext')[0];

        blog.removeChild(title);
        blog.removeChild(text);

        selectMarker(null);
    }
});












