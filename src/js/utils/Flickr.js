/**
 * Dynamic class Fickr
 *
 * @type {Function}
 */
var Flickr = (function() {
    var current     = this; //Reference to the this object.

    /**
     * Global properties.
     *
     * @param lat           Latitude for the images.
     * @param lng           Longitude for the images.
     * @param container     Placeholder for the images. HTML-element.
     */
    this.lat         = null;
    this.lng         = null;
    this.container   = null;

    /**
     * Global static properties.
     *
     * @param API_KEY       Flickr API-key.
     */

    this.API_KEY     = '43233c3d55432ac048f78aaaff97a107';

    /**
     * Constructor method.
     * This method is started from the Maps class. checks
     * if the image container is created or not. If it is
     * created, it will empty the array and the images from it.
     *
     * @param lat           The markers Latitude.
     * @param lng           The markers Longitude.
     */
     this.init = function(lat, lng) {
         current.lat = lat;
         current.lng = lng;

         if(!AdminMain.imgCheck) {
             createElements();
             AdminMain.imgCheck = true;
         } else {
             if (current.container != null) {
                 for (var i = 0; i < AdminMain.imgArray.length; i++) {
                     current.container.removeChild(AdminMain.imgArray[i]);
                 }
             }
             createElements();
         }
     };

    /**
     * This method creates the placeholder-element
     * and appends it on the page.
     */
     function createElements() {
         current.container = document.createElement('div');
         current.container.setAttribute("class", "image-container");

         var wrapper = document.getElementById('content-wrapper');
         wrapper.appendChild(current.container);

         initImg();
     }

    /**
     * This method creates the flickr request-string
     * ands sends it with an Ajax request.
     */
     function initImg() {
         var request = "https://api.flickr.com/services/rest/?";
             request += "method=flickr.photos.search";
             request += "&api_key=" + current.API_KEY;
             request += "&lat="+ current.lat;
             request += "&lon="+ current.lng;
             request += "&per_page=5";
             request += "&page=1";
             request += "&format=json";
         var ajax = new Ajax();
         ajax.get(request, loadImg);

     }

    /**
     * This method is a callback method when the Flickr
     * request is done. Strips the returndata and converts
     * the data to an JSON-array.
     *
     * @param data              Return data from Flickr.
     */
     function loadImg(data) {
         data = data.responseText;
         data = data.replace('jsonFlickrApi(', '');
         data = data.substring(0, data.length - 1);
         data = JSON.parse(data);

         getImage(data);
     }

    /**
     * This method loops through the return data from
     * Flickr and creates the link to each image and places
     *
     * @param data              JSON-array with return data from FLickr.
     */
     function getImage(data) {
         var array = data.photos.photo;
         for(var i in array) {
             var id     = array[i].id;
             var farm   = array[i].farm;
             var server = array[i].server;
             var secret = array[i].secret;

             var img = 'http://farm' + farm + '.staticflickr.com/' + server + '/' + id + '_' + secret + '_s.jpg';

             placeImg(img);
         }
     }

    /**
     * This method places the images on the conteiner
     * element on the page and activates event listener
     * on each image.
     *
     * @param img               The link to the specific image.
     */
    function placeImg(img) {
        var imgElm = document.createElement('img');
        imgElm.setAttribute("src", img);
        current.container.appendChild(imgElm);
        AdminMain.imgArray.push(imgElm);
        Event.addEventListener(imgElm, "click", selectedImg);
    }

    /**
     * This method moves the image to the blog
     * element when clicked.
     *
     * @param event             Mouse event.
     */
    function selectedImg(event) {
        var blogElm = document.getElementById('blog');
        blogElm.appendChild(event.target);
        current.container.parentNode.removeChild(current.container);
        AdminMain.imgCheck = false;
    }
});
