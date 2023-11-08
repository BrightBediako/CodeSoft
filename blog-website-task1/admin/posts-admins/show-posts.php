<?php require "../includes/header.php"; ?>
<?php require "../../config/config.php"; ?>

<?php

if (!isset($_SESSION['adminname'])) {
  header("location: http://localhost/clean-blog/admin/admins/login-admins.php");
}

$posts = $conn->query("SELECT posts.id AS id, posts.title AS title, posts.user_name AS user_name, categories.name AS name, posts.status AS status FROM categories JOIN posts ON categories.id = posts.category_id");

$posts->execute();
$rows = $posts->fetchAll(PDO::FETCH_OBJ);

?>

<div class="row">
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4 d-inline">Posts</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Category</th>
              <th scope="col">User</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($rows as $row) : ?>
              <tr>
                <th scope="row"><?php echo $row->id; ?></th>
                <td><?php echo $row->title; ?></td>
                <td><?php echo $row->name; ?></td>
                <td><?php echo $row->user_name; ?></td>
                <?php if ($row->status == 0) : ?>
                  <td><a href="posts-status.php?status=<?php echo $row->status; ?>&id=<?php echo $row->id; ?>" class="btn btn-danger  text-center ">Deactivated</a></td>
                <?php else : ?>
                  <td><a href="posts-status.php?status=<?php echo $row->status; ?>&id=<?php echo $row->id; ?>" class="btn btn-primary  text-center ">Activated</a></td>
                <?php endif; ?>
                <td><a href="delete-posts.php?po_id=<?php echo $row->id; ?>" class="btn btn-danger  text-center ">Delete</a></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

<?php require "../includes/footer.php"; ?>