<?php include_once "../includes/header.php" ?>
<?php include_once "../config/config.php" ?>

<?php

if (isset($_GET['upd_id'])) {
    $id = $_GET['upd_id'];

    //first query
    $select = $conn->query("SELECT * FROM posts WHERE id = '$id'");
    $select->execute();
    $rows = $select->fetch(PDO::FETCH_OBJ);

    if ($_SESSION['user_id'] !== $rows->user_id) {
        header('Location: http://localhost/blog-website/index.php');
    }

    //second query
    if (isset($_POST['update'])) {
        if ($_POST['title'] == '' or $_POST['subtitle'] == '' or $_POST['body'] == '') {
            echo "<div class='alert alert-danger  text-center  role='alert'> Fields can't be empty! </div>";
        } else {
            unlink("images/" . $rows->img . "");

            $title = $_POST['title'];
            $subtitle = $_POST['subtitle'];
            $body = $_POST['body'];
            $img = $_FILES['img']['name'];

            $dir = 'images/' . basename($img);

            $update = $conn->prepare("UPDATE posts SET title = :title, subtitle = :subtitle, body = :body, img = :img WHERE id = '$id'");

            $update->execute([
                ':title' => $title,
                ':subtitle' => $subtitle,
                ':body' => $body,
                ':img' => $img

            ]);


            if (move_uploaded_file($_FILES['img']['tmp_name'], $dir)) {
                header('location: http://localhost/blog-website/index.php');
            }
        }
    }
} else {
    header("Location: http://localhost/blog-website/404.php");
}
?>

<!-- Page Header-->
<header class="masthead" style="background-image: url('images/<?php echo $rows->img; ?>')">
    <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="site-heading">
                    <h1><?php echo $rows->title; ?></h1>
                    <span class="subheading"><?php echo $rows->subtitle; ?></span>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Main Content-->
<div class="container px-4 px-lg-5">
    <form method="POST" action="update.php?upd_id=<?php echo $id; ?>" enctype="multipart/form-data">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <input type="text" name="title" value="<?php echo $rows->title; ?>" id="form2Example1" class="form-control" placeholder="" />
        </div>
        <div class="form-outline mb-4">
            <input type="text" name="subtitle" value="<?php echo $rows->subtitle; ?>" id="form2Example1" class="form-control" placeholder="" />
        </div>
        <div class="form-outline mb-4">
            <textarea type="text" name="body" id="summernote" class="form-control" placeholder="body" rows="8"><?php echo $rows->body; ?></textarea>
        </div>

        <?php echo "<img src='images/" . $rows->img . "' width=900px height=300px> "; ?>
        <div class="form-outline mb-4">
            <input type="file" name="img" id="form2Example1" class="form-control" placeholder="image" />
        </div>
        <!-- Submit button -->
        <button type="submit" name="update" class="btn btn-primary  mb-4 text-center">Update</button>
    </form>
</div>

<?php include_once "../includes/footer.php" ?>