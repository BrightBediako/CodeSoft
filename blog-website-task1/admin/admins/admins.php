<?php require "../includes/header.php"; ?>
<?php require "../../config/config.php"; ?>

<?php

if (!isset($_SESSION['adminname'])) {
  header("Location: http://localhost/blog-website/admin/admins/login-admins.php");
}

$admins = $conn->query("SELECT * FROM admins LIMIT 7");
$admins->execute();
$rows = $admins->fetchAll(PDO::FETCH_OBJ);

?>

<div class="row">
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4 d-inline">Admins</h5>
        <a href="create-admins.php" class="btn btn-primary mb-4 text-center float-right">Create Admins</a>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">username</th>
              <th scope="col">email</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($rows as $row) : ?>
              <tr>
                <th scope="row"><?php echo $row->id; ?></th>
                <td><?php echo $row->adminname; ?></td>
                <td><?php echo $row->email; ?></td>
                <td><a href="update-admin.php" class="btn btn-warning text-white text-center ">Update</a></td>
                <td><a href="delete-admin.php" class="btn btn-danger  text-center ">Delete</a></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<?php require "../includes/footer.php"; ?>