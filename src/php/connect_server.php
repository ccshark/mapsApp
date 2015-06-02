<?php
/**
 * Class for the server connection.
 * Specifies and connects to the database.
 */
        $db_user = 'root';
        $db_pass = '';
        $db_host = 'localhost';
        $db_name = 'Maps';

        // Connect to server and select databse.
        $db = new mysqli($db_host, $db_user, $db_pass, $db_name);

        if($db->connect_errno > 0) {
            die('Can not connect to database');
        }
