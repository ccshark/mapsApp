<?php

/**
 * Class Save updates the database with the information set in
 * the settings tab on the web-page.
 */
class Save {
    /**
     * This method inserts the parameters
     * in the database
     */
    public static function saveBlog() {
        include('connect_server.php');

        $text       = $_POST['text'];
        $title      = $_POST['title'];
        $lat        = $_POST['lat'];
        $lng        = $_POST['lng'];
        $img        = $_POST['img'];

        $query = ("INSERT INTO
                            blog (text, title, lat, lng, image)
                   VALUES
                            ('$text', '$title', '$lat', '$lng', '$img')");
        $result = $db->query($query);
        mysqli_close($db);
    }

    /**
     * This method updates the information in
     * the database.
     */
    public static function updateBlog() {
        include('connect_server.php');

        $text       = $_POST['text'];
        $title      = $_POST['title'];
        $id         = $_POST['id'];

        $query = ("UPDATE
                        blog
                  SET
                      text='$text', title='$title'
                  WHERE
                      blog_id='$id'  ");
        $result = $db->query($query);
        mysqli_close($db);
    }
}
