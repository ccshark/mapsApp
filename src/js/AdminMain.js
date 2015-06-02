/**
 * Static class AdminMain
 */
var AdminMain = {

    /**
     * Global properties.
     *
     * @param ajax              Reference to the Ajax-class.
     * @param imgArray          Array that holds all the images.
     * @param blogMenu          Boolean to check if the user is signed in.
     * @param imageContainer    Array to hold all image containers.
     * @param imgCheck          Boolean to check if the img container is placed.
     * @param flickrArray       Holds all the flickr instances.
     *
     * @param title             Reference to the title-element.
     * @param text              Reference to the text-element.
     */
    ajax            : new Ajax(),
    imgArray        : new Array(),
    blogMenu        : false,
    imageContainer  : new Array(),
    imgCheck        : false,
    flickrArray     : new Array(),

    title           : null,
    text            : null,

    /**
     * This method initializes the Map and sends with
     * the rest-url to get markers.
     *
     * @param event             load event.
     */
    init : function(event) {
        Map.init();
        Map.initMarker();
        AdminMain.initBlog();
        AdminMain.initLogout();
    },

    /**
     * This method activates event listener
     * for the logout button.
     */
    initLogout : function() {
        var logout = document.getElementById('log-out');
        Event.addEventListener(logout, "click", AdminMain.logout)
    },

    /**
     * This method sends request to Ajax to start
     * the logout method on the server side.
     *
     * @param event             Mouse event.
     */
    logout : function(event) {
        var url = "src/php/rest.php?method=logout";
        AdminMain.ajax.get(url, AdminMain.logoutCallback)
    },

    /**
     * This method is a callback method when the
     * user is logged out.
     *
     * @param data              Data from php 1 or 0.
     */
    logoutCallback : function(data) {
        var key = data.responseText;
        if (key == 1) {
            window.location = 'index.php';
        }
    },

    /**
     * This method adds event listener on the
     * blog-button.
     */
    initBlog : function() {
        var button = document.getElementById('blog-button');
        Event.addEventListener(button, "click", AdminMain.checkBlog);
    },



    /**
     * THis method checks if the blog window
     * is opened or closed.
     *
     * @param event              Mouse event.
     */
    checkBlog : function(event) {
        if (!AdminMain.blogMenu) {
            AdminMain.createBlog();
            AdminMain.blogMenu = true;
            if(Map.marker) {
                AdminMain.initMarker();
            } else {
                AdminMain.setBlog();
            }
            AdminMain.setBlog();
        } else {
            AdminMain.removeImg();
            AdminMain.removeBlog();
            Map.marker.setMap(null);
            Map.marker = null;
            AdminMain.title = null;
            AdminMain.text = null;
            for (var i = 0; i < AdminMain.imgArray.length; i++) {
                if(AdminMain.imgArray.parentNode) {
                    AdminMain.imgArray.parentNode.removeChild(AdminMain.imgArray[i]);
                }
            }
            AdminMain.blogMenu = false;
        }
    },

    /**
     *  This method creates the blog elements.
     */
    createBlog : function() {
        var blog = document.createElement('div');
        blog.setAttribute("id", "blog");

        var header = document.createElement('h2');
        header.innerHTML = "write new blog";

        AdminMain.title = document.createElement('textarea');
        AdminMain.title.setAttribute("class", "blogtitle");

        AdminMain.text = document.createElement('textarea');
        AdminMain.text.setAttribute("class", "blogtext");

        var button = document.createElement('button');
        button.setAttribute("id", "blog-submit");
        button.innerHTML = "POST";

        var content = document.getElementById('content-wrapper');

        content.appendChild(blog);
        blog.appendChild(header);
        blog.appendChild(AdminMain.title);
        blog.appendChild(AdminMain.text);
        blog.appendChild(button);
    },

    /**
     * This method removes the blog element.
     */
    removeBlog : function() {
        var blog = document.getElementById('blog');
        if(blog) {
            blog.parentNode.removeChild(blog);
        }

    },

    /**
     * This method initializes the blog window
     * and activets event listeners for submission and
     * the testarea.
     */
    setBlog : function() {
        var blog        = document.getElementById('blog');
        var blogSubmit  = document.getElementById('blog-submit');
        if(!Map.marker) {
            Map.newMarker();
        }
        Event.addEventListener(blogSubmit, 'click', AdminMain.initSaveBlog);
    },

    /**
     * This method removes the image element
     * when the write-blog window is closed.
     *
     */
    removeImg : function() {
       if(document.getElementsByClassName('image-container')[0]){
           var img = document.getElementsByClassName('image-container')[0];
           img.parentNode.removeChild(img);
        }
    },

    /**
     * This method activates the image method.
     */
    initMarker : function() {
        AdminMain.initImg(null);
    },

    /**
     * This method activates the submission of the
     * blog information and disables the drag propertie
     * from the marker.
     *
     * @param event             Mouse event.
     */
    initSaveBlog : function(event) {
        Map.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
        Map.marker.draggable = false;
        google.maps.event.clearListeners(Map.marker, "mouseup");
        AdminMain.saveBlog();
    },

    /**
     * This method collects the latitude and longitude
     * parameters from the marker and starts a new instance
     * of the flickr class.
     *
     * @param event             Mouse Event or null, marker position.
     */
    initImg : function(event) {
        var lat = Map.marker.position.k;
        var lng = Map.marker.position.D;

        if(document.getElementsByClassName('image-container')) {
            for(var i = 0; i < AdminMain.imgArray.length; i++) {
                if(AdminMain.imgArray[i].parentNode) {
                    AdminMain.imgArray[i].parentNode.removeChild(AdminMain.imgArray[i]);
                }
            }
            var flickr = new Flickr();
            flickr.init(lat, lng);
            AdminMain.flickrArray.push(flickr);
        }
    },

    /**
     * This method collects the parameters for the blog
     * and sends an Ajax request with all the information.
     */
    saveBlog : function() {
        var blog = document.getElementById('blog').getElementsByTagName('img')[0];
        var image = blog.src;


        var lat     = Map.marker.position.k;
        var lng     = Map.marker.position.D;

        var data = ('text=' + AdminMain.text.value + '&title=' + AdminMain.title.value + '&lat=' + lat + '&lng=' + lng + '&img=' + image);
        var url = "src/php/rest.php?method=saveBlog";
        AdminMain.ajax.post(url, data, AdminMain.saveBlogComplete);
    },

    /**
     * This method is a callback method when the blog
     * information is saved. Removes the blog window
     * from the page.
     *
     * @param data              Information from php.
     */
    saveBlogComplete : function(data) {
        var blog = document.getElementById('blog');
        blog.parentNode.removeChild(blog);
        for(var i = 0; i < Map.markerArray.length; i++) {
            Map.markerArray[i].setMap(null);
        }
        Map.markerArray = [];
        Map.initMarker();
    }
}
google.maps.event.addDomListener(window, 'load', AdminMain.init); // NOTE THIS NEW EVENT LISTENER FROM GOOGLE