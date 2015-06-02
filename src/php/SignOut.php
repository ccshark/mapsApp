<?php
/**
 * Class SignOut removes the user from the session and
 * redirects the user to the index page for login.
 */
class SignOut {
    /**
     * Method to clear the session and return
     * the user to the sign in page.
     */
    public static function init() {
        $loggedOut = 0;
        unset($_SESSION);
        session_destroy();

        if(!isset($_SESSION['username'])) {
            $loggedOut = 1;
        }
        echo($loggedOut);
    }
}