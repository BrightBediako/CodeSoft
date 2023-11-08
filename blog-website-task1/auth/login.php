<?php require "../includes/header.php" ?>
<?php require "../config/config.php" ?>


<div class="login">
    <?php

    if (isset($_SESSION['username'])) {
        header("Location: http://localhost/clean-blog/index.php");
    }

    if (isset($_POST['submit'])) {
        if ($_POST['email'] == '' or $_POST['password'] == '') {
            echo "<div class='alert alert-danger  text-center  role='alert'> Fields can't be empty! </div>";
        } else {
            $email = $_POST['email'];
            $password = $_POST['password'];

            $login = $conn->query("SELECT * FROM users WHERE email = '$email'");
            $login->execute();

            $row = $login->FETCH(PDO::FETCH_ASSOC);

            if ($login->rowCount() > 0) {
                if (password_verify($password, $row['mypassword'])) {

                    $_SESSION['username'] = $row['username'];
                    $_SESSION['user_id'] = $row['id'];

                    header("Location: http://localhost/clean-blog/index.php");
                    // echo "<div class='alert alert-success  text-center  role='alert'> Login was successful...</div>";
                } else {

                    echo "<div class='alert alert-danger  text-center  role='alert'> Wrong credentials...</div>";
                }
            } else {
                echo "<div class='alert alert-danger  text-center  role='alert'> Wrong credentials...</div>";
            }
        }
    }
    ?>

    <span class="loginTitle">Login</span>
    <form method="POST" action="login.php" class="loginForm">
        <label>Email</label>
        <input class="loginInput" type="text" name="email" placeholder="Enter your email..." />
        <label>Password</label>
        <input class="loginInput" type="password" name="password" placeholder="Enter your password..." />
        <button type="submit" name="submit" class="loginButton">Login</button>
    </form>
    <button class="loginRegisterButton"><a href="register.php" class="link">Register</a></button>
</div>

<!-- <?php //require "../includes/footer.php" 
        ?> -->