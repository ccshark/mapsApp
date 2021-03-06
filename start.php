<?php
/**
 * Checks if the user exists in session.
 */
session_start();
if(isset($_SESSION['username']) && isset($_SESSION['password'])) {
} else {
    header("location:index.php");
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>

    <!-- META DATA -->

    <meta http-equiv="Content-Type"	content="text/html; charset=utf-8" />

    <meta name="" 	content="" />
    <meta name=""	content="" />
    <meta name=""	content="" />
    <meta name=""	content="" />

    <!-- CSS -->

    <link href="src/css/style.css" rel="stylesheet" type="text/css" media="screen" title="Default" />

    <!-- JAVASCRIPT -->
    <script type="text/javascript" language="javascript" src="src/js/events/Event.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/net/Ajax.js"></script>
    <script type="text/javascript" language="javascript" src="https://maps.googleapis.com/maps/api/js?sensor=true"></script>
    <script type="text/javascript" language="javascript" src="src/js/window/Map.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/window/Blog.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/utils/Flickr.js"></script>
    <script type="text/javascript" language="javascript" src="src/js/AdminMain.js"></script>


    <!-- TITLE -->
    <title>1ME205 - Assignment Four</title>

</head>

<body>

<div id="page-wrapper">
    <button id="blog-button" value="write-blog">Write blog</button>
    <button id="log-out">Log out</button>
    <div id="content-wrapper">

        <div id="read-blog"></div>
    </div>
    <div id="map">

    </div>
</div>

</body>

</html>