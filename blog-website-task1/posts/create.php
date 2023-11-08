<?php require "../includes/header.php" ?>
<?php require "../config/config.php" ?>
<!-- Page Header-->
<header class="masthead" style="background-image: url('https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=500')">
    <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="site-heading">
                    <h1>Clean Blog</h1>
                    <span class="subheading">A Blog Theme by Start Bootstrap</span>
                </div>
            </div>
        </div>
    </div>
</header>

<!-- Main Content-->
<div class="container px-4 px-lg-5">



    <?php

    // if (isset($_SESSION['username'])) {
    //     header("Location: http://localhost/clean-blog/index.php");
    // }

    $categories = $conn->query("SELECT * FROM categories");
    $categories->execute();
    $category = $categories->fetchAll(PDO::FETCH_OBJ);

    if (isset($_POST['submit'])) {

        if ($_POST['title'] == '' or $_POST['subtitle'] == '' or $_POST['body'] == '' or $_POST['category_id'] == '') {
            echo "<div class='alert alert-danger  text-center  role='alert'> Fields can't be empty! </div>";
        } else {
            $title = $_POST['title'];
            $subtitle = $_POST['subtitle'];
            $body = $_POST['body'];
            $category_id = $_POST['category_id'];
            $img = $_FILES['img']['name'];
            $user_id = $_SESSION['user_id'];
            $user_name = $_SESSION['username'];

            $dir = 'images/' . basename($img);

            $insert = $conn->prepare("INSERT INTO posts (title, subtitle, body, category_id, img, user_id, user_name) VALUES (:title, :subtitle, :body, :category_id, :img, :user_id, :user_name)");

            $insert->execute([
                ':title' => $title,
                ':subtitle' => $subtitle,
                ':body' => $body,
                ':category_id' => $category_id,
                ':img' => $img,
                ':user_id' => $user_id,
                ':user_name' => $user_name
            ]);

            if (move_uploaded_file($_FILES['img']['tmp_name'], $dir)) {
                header("Location: http://localhost/clean-blog/index.php");
            }
        }
    }
    ?>

    <form method="POST" enctype="multipart/form-data">
        <!-- Email input -->
        <div class="form-outline mb-4">
            <input type="text" name="title" id="form2Example1" class="form-control" placeholder="Title" />
        </div>

        <div class="form-outline mb-4">
            <input type="text" name="subtitle" id="form2Example1" class="form-control" placeholder="Subtitle" />
        </div>

        <div class="form-outline mb-4">
            <textarea type="text" name="body" id="form2Example1" class="form-control" placeholder="Share your story..." rows="8"></textarea>
        </div>

        <div class="form-outline mb-4">
            <select name="category_id" class="form-select" aria-label="Default select example">
                <option selected>Select Category</option>
                <?php foreach ($category as $cat) : ?>
                    <option value="<?php echo $cat->id; ?>"><?php echo $cat->name; ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="form-outline mb-4">
            <input type="file" name="img" id="form2Example1" class="form-control" placeholder="image" />
        </div>
        <!-- Submit button -->
        <button type="submit" name="submit" class="btn btn-primary  mb-4 text-center">Publish</button>


    </form>



</div>

<?php include_once "../includes/footer.php" ?>