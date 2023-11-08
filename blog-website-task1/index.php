<?php require "./includes/header.php" ?>
<?php require "./config/config.php" ?>

<!-- Page Header-->
<header class="masthead" style="background-image: url('https://images.pexels.com/photos/1228517/pexels-photo-1228517.jpeg?auto=compress&cs=tinysrgb&w=600')">
    <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="site-heading">
                    <h1>CodeSoft</h1>
                    <!-- search input -->
                    <div class="input-group ps-5">
                        <div id="navbar-search-autocomplete" class="w-100">
                            <form method="POST" action="http://localhost/clean-blog/search.php">
                                <input name="search" type="search" id="form1" class="form-control mt-3" placeholder="search" />
                            </form>
                        </div>
                    </div>
                    <!-- search input end-->
                    <span class="subheading">Internship Project </span>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- Main Content-->

<?php

$posts = $conn->query("SELECT * FROM posts WHERE status = 1 LIMIT 5");
$posts->execute();
$rows = $posts->fetchAll(PDO::FETCH_OBJ);

$categories = $conn->query("SELECT * FROM categories");
$categories->execute();
$category = $categories->fetchAll(PDO::FETCH_OBJ);

?>

<div class="row gx-4 gx-lg-5 justify-content-center">
    <div class="col-md-10 col-lg-8 col-xl-7">

        <?php foreach ($rows as $row) : ?>
            <!-- Post preview-->
            <div class="post-preview">
                <a href="http://localhost/clean-blog/posts/post.php?post_id=<?php echo $row->id; ?>">
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

<!-- categories section -->
<div class="row gx-4 gx-lg-5 justify-content-center">
    <h3 class="mb-5" style="text-align: center;">Categories</h3>
    <?php foreach ($category as $cat) : ?>
        <div class="col-md-6">
            <a href="http://localhost/clean-blog/categories/category.php?cat_id=<?php echo $cat->id; ?>">
                <div class="alert alert-dark bg-dark text-center text-white" role="alert">
                    <?php echo $cat->name; ?>
                </div>
            </a>
        </div>
    <?php endforeach; ?>
</div>

<?php require "includes/footer.php"; ?>