<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadDir = 'uploads/';  // Create a directory to store uploaded images
    $uploadFile = $uploadDir . basename($_FILES['image']['name']);

    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
        echo 'Image uploaded successfully!';
    } else {
        echo 'Error uploading image.';
    }
}
?>
