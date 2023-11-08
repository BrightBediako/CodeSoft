<?php

try {
    $host = "localhost";
    $dbname = "internblog";
    $user = "root";
    $password = "";

    $conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

} catch (PDOException $e) {
    echo $e->getMessage();
}

if ($conn == true) {
    // echo "Connected successfull";
} else {
    echo "Connected failed";
}
