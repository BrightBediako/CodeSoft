<?php require "../includes/header.php" ?>
<?php require "../config/config.php" ?>


<div class="register">

    <?php

    if (isset($_SESSION['username'])) {
        header("Location: http://localhost/blog-website/index.php");
    }

    if (isset($_POST['submit'])) {

        if ($_POST['email'] == '' or $_POST['username'] == '' or $_POST['password'] == '') {
            echo "<div class='alert alert-danger  text-center  role='alert'> Fields are required! </div>";
        } else {
            $email = $_POST['email'];
            $username = $_POST['username'];
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

            $insert = $conn->prepare("INSERT INTO users (email, username, mypassword) VALUES (:email, :username, :mypassword)");

            $insert->execute([
                ':email' => $email,
                ':username' => $username,
                ':mypassword' => $password
            ]);

            header("Location: login.php");
        }
    }
    ?>


    <span class="registerTitle">Register</span>
    <form method="POST" action="register.php" class="registerForm">
        <label>Email</label>
        <input class="registerInput" type="email" name="email" placeholder="Enter your email..." />
        <label>Username</label>
        <input class="registerInput" type="text" name="username" placeholder="Enter your username..." />
        <label>Password</label>
        <input class="registerInput" type="password" name="password" placeholder="Enter your password..." />
        <button type="submit" name="submit" class="registerButton">Register</button>
    </form>
    <button class="registerLoginButton"><a href="login.php" class="link">LOGIN</a></button>
</div>


<?php require "../includes/footer.php" ?>