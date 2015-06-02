<?php

/**
 * Class load returns the information for all the blogs.
 */
class load {
    /**
     * Collects all the information for all the blog-posts
     * and returns an multidimensional array.
     */
    public static function getMarkers() {
        include('connect_server.php');

        $query = "SELECT text, title, lat, lng, image, blog_id FROM blog";

        $result = $db->query($query);
        $array = array();
        while($row = mysqli_fetch_assoc($result)) {
            array_push($array, $row);
        }
        echo json_encode($array);
        mysqli_close($db);
    }
} 