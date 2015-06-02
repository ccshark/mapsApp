<?php

/**
 * Class Remove deletes the blog information
 */
class Remove {
    /**
     * This method removes all the blog information
     * with the posted id.
     */
    public static function removeBlog() {
        include('connect_server.php');
        $id  = $_POST['id'];

        $query = "DELETE FROM blog WHERE blog_id='$id'";
        $result = $db->query($query);
        mysqli_close($db);
    }
} 