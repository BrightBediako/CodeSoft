<?php require "../includes/header.php"; ?>
<?php require "../config/config.php"; ?>

<?php

if (isset($_GET['prof_id'])) {
    $id = $_GET['prof_id'];

    //first query
    $select = $conn->query("SELECT * FROM users WHERE id = '$id'");
    $select->execute();
    $rows = $select->fetch(PDO::FETCH_OBJ);

    if ($_SESSION['user_id'] !== $rows->id) {
        header('location: http://localhost/clean-blog/index.php');
    }

    //second query
    if (isset($_POST['update'])) {
        if ($_POST['email'] == '' or $_POST['username'] == '') {
            echo "<div class='alert alert-danger  text-center  role='alert'> Fields can't be empty! </div>";
        } else {
            $email = $_POST['email'];
            $username = $_POST['username'];

            $update = $conn->prepare("UPDATE users SET email = :email, username = :username WHERE id = '$id'");

            $update->execute([
                ':email' => $email,
                ':username' => $username,
            ]);

            header('location: http://localhost/clean-blog/users/profile.php?prof_id=' . $_SESSION['user_id'] . '');
        }
    }
} else {
    header("location: http://localhost/clean-blog/404.php");
}

?>

<!-- Page Header-->
<!-- <header class="masthead" style="background-image: url('https://images.pexels.com/photos/3293148/pexels-photo-3293148.jpeg?auto=compress&cs=tinysrgb&w=500')">
    <div class="container position-relative px-4 px-lg-5">
        <div class="row gx-4 gx-lg-5 justify-content-center">
            <div class="col-md-10 col-lg-8 col-xl-7">
                <div class="site-heading">
                    <h3>My Profile</h3>
                </div>
            </div>
        </div>
    </div>
</header> -->

<!-- Main Content-->

<div class="login">
    <span class="loginTitle">My Profile</span>
    <form method="POST" action="profile.php?prof_id=<?php echo $rows->id; ?>" class="loginForm">
        <label>Email</label>
        <input class="loginInput" type="text" name="email" value="<?php echo $rows->email; ?>" placeholder="Enter your email..." />
        <label>Username</label>
        <input class="loginInput" type="text" name="username" value="<?php echo $rows->username; ?>" placeholder="Enter your password..." />
        <button type="submit" name="update" class="loginButton">Update</button>
    </form>
</div>


<?php require "../includes/footer.php"; ?>