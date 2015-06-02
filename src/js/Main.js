/**
 *	Example class to demonstrate Google Maps JavaScript
 *	API version three.
 *
 *	@author		Henrik Andersen
 *	@email		henrik.andersen@lnu.se
 *	@version	1.0
 *	@since		xxxx-xx-xx
 *	@requires	Event.js
 */
var Main = {

    //---------------------------------------------------
    //  Public static properties
    //---------------------------------------------------

    ajax : new Ajax(),

    loginMenu : false,

    //---------------------------------------------------
    //  Public static methods
    //---------------------------------------------------

    /**
     *	This static method acts as a class constructor and triggers
     *	all the event listeners for this application.
     *
     *	@return undefined
     */
    init : function()
    {
        Map.init();
        Map.initMarker();
        Main.initLoginButton();
    },

    /**
     * This method activates event listener on the
     * login button.
     */
    initLoginButton : function() {
        var signButton = document.getElementsByClassName('login-button')[0];
        Event.addEventListener(signButton, "click", Main.initLogin);
    },

    /**
     * This method checks if the login menu is active
     * or not, and enables event listener for the login form.
     *
     * @param event             Mouse event.
     */
    initLogin : function(event) {
        var sign = document.getElementById('sign');
        var login = document.getElementById('login');

        if(!Main.loginMenu) {
            login.style.visibility = "visible";
            Main.loginMenu = true;
        } else {
            login.style.visibility = "hidden";
            Main.loginMenu = false;
        }

        Event.addEventListener(sign, 'click', Main.login);
    },

    /**
     *
     * @param event
     */
    login : function(event) {
        event.preventDefault();

        var username = document.getElementById('username');
        var password = document.getElementById('password');

        var data = ('username=' + username.value + '&password=' + password.value);
        var url =  "src/php/rest.php?method=sign";
        Main.ajax.post(url, data, Main.loginCallback);
    },

    loginCallback : function(data) {
        var key = data.responseText;
        if(key == 1) {
            window.location = "start.php";
        } else {
            //fel användarnamn eller lösenord.
        }
    }
}

/**
 *	Using Googles event listeners to activate the class.
 */
google.maps.event.addDomListener(window, 'load', Main.init);