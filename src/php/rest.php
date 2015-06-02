<?php
	/**
	* REST class to handle all requests from ajax. Starts the correct function
	* depending on the input line in the URL.
	*/


	/**
	* Imports all the php classes that will be used.
	*/
	session_start();
	require_once('Sign.php');
    require_once('Save.php');
    require_once('SignOut.php');
    require_once('load.php');
    require_once('SignOut.php');
    require_once('Remove.php');

	//Propertie to hold the current input line in the URL.
	$information = $_GET["method"];


		/**
		* Switch to start the correct function depending on the value
		* of the information property.
		*/
		switch ($information) {
			case 'sign':
                Sign::init();
				break;
			case 'saveBlog':
                Save::saveBlog();
				break;
            case 'getMarkers':
                load::getMarkers();
                break;
            case 'updateBlog':
                Save::updateBlog();
                break;
            case 'checkAdmin':
                Sign::checkAdmin();
                break;
            case 'removeBlog':
                Remove::removeBlog();
                break;
            case 'logout':
                SignOut::init();
                break;
			//Return error if the input value does not match a valid attribute.
			default:
                echo("Error not a valid request!");
				break;
		}
