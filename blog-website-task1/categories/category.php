<?php require "../includes/header.php" ?>
<?php require "../config/config.php" ?>

<?php

if (isset($_GET['cat_id'])) {
    $id = $_GET['cat_id'];

    $posts = $conn->query("SELECT posts.id AS id, posts.title AS title, posts.subtitle AS subtitle, posts.user_name AS user_name, posts.created_at AS 
        created_at, posts.category_id AS category_id, posts.status AS status FROM categories JOIN posts ON categories.id = posts.category_id WHERE posts.category_id = '$id' AND status = 1");

    $posts->execute();
    $rows = $posts->fetchAll(PDO::FETCH_OBJ);
} else {
    header("location: http://localhost/blog-website/404.php");
}

?>

<!-- Page Header-->
<header class="masthead" style="background-image: url('https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&w=500')">
    <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="site-heading">
                    <h3>Posts for this category</h3>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- Main Content-->

<div class="row gx-4 gx-lg-5 justify-content-center">
    <div class="col-md-10 col-lg-8 col-xl-7">

        <?php foreach ($rows as $row) : ?>
            <!-- Post preview-->
            <div class="post-preview">
                <a href="http://localhost/blog-website/posts/post.php?post_id=<?php echo $row->id; ?>">
                    <h2 class="post-title"><?php echo $row->title; ?></h2>
                    <h3 class="post-subtitle"><?php echo $row->subtitle; ?></h3>
                </a>
                <p class="post-meta">
                    Posted by
                    <a href="#!"><?php echo $row->user_name; ?></a>
                    <?php echo date('M', strtotime($row->created_at))  . ',' .  date('d', strtotime($row->created_at)) . ' ' . date('Y', strtotime($row->created_at)); ?>
                </p>
            </div>
            <!-- Divider-->
            <hr class="my-4" />
        <?php endforeach; ?>
        <!-- Pager-->
    </div>
</div>


<?php require "../includes/footer.php"; ?>