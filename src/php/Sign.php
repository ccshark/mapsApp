<?php

/**
 * Class Sign evaluates the sign in information and
 * logs in the user if the information matches the information
 * in the database.
 */
Class Sign {

    /**
     * Method to check the user input with the information in
     * the database. If the information is correct the usersname,
     * password and id is stored in session.
     */
    public static function init() {
        include('connect_server.php');

        $username       = $_POST['username'];
        $password       = $_POST['password'];

        //$encrypt    = md5($password);

        // To protect MySQL injection
        $username = stripslashes($username);
        $password = stripslashes($password);
        $username = $db->real_escape_string($username);
        $password = $db->real_escape_string($password);

        $query = "SELECT * FROM user WHERE username='$username' AND password='$password'";
        $result= $db->query($query);

        // Mysql_num_row is counting table row
        $count= $result->num_rows;

        if($count==1){
            $idQuery = "SELECT id FROM user WHERE username='$username'";
            $idResult = $db->query($idQuery);
            $row = mysqli_fetch_array($idResult);
            $id = $row['id'];

            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            $_SESSION['id'] = $id;

            //Returns 1 if user is signed in.
            echo($count);

        }
        else {
            //Returns 0 if user is not signed in.
            echo($count);
        }
        mysqli_close($db);

    }

    public static function checkAdmin() {
        if(isset($_SESSION['username']) && isset($_SESSION['password'])) {
            echo 1;
        } else {
            echo 0;
        }
    }
}