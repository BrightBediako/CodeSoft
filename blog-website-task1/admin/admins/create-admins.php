<?php require "../includes/header.php"; ?>
<?php require "../../config/config.php"; ?>


<div class="row">
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-5 d-inline">Create Admins</h5>

        <?php

        if (!isset($_SESSION['adminname'])) {
          header("location: http://localhost/blog-website/admin-panel/admins/login-admins.php");
        }

        if (isset($_POST['submit'])) {

          if ($_POST['email'] == '' or $_POST['adminname'] == '' or $_POST['password'] == '') {
            echo
            "<div class='alert alert-danger  text-center  role='alert'> Fields are required!!! </div>";
          } else {
            $email = $_POST['email'];
            $adminname = $_POST['adminname'];
            $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

            $insert = $conn->prepare("INSERT INTO admins (email, adminname, mypassword) VALUES (:email, :adminname, :mypassword)");

            $insert->execute([
              ':email' => $email,
              ':adminname' => $adminname,
              ':mypassword' => $password
            ]);

            header("Location: /http://localhost/blog-website/admin/admins/admins.php");
          }
        }
        ?>
        <form method="POST" action="create-admins.php">
          <!-- Email input -->
          <div class="form-outline mb-4 mt-4">
            <input type="email" name="email" id="form2Example1" class="form-control" placeholder="Email" />
          </div>
          <div class="form-outline mb-4">
            <input type="text" name="adminname" id="form2Example1" class="form-control" placeholder="Admin name" />
          </div>
          <div class="form-outline mb-4">
            <input type="password" name="password" id="form2Example1" class="form-control" placeholder="Password" />
          </div>
          <!-- Submit button -->
          <button type="submit" name="submit" class="btn btn-primary  mb-4 text-center">create</button>
        </form>
      </div>
    </div>
  </div>
</div>

<?php require "../includes/footer.php"; ?>