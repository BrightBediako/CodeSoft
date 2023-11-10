<?php require "../includes/header.php"; ?>
<?php require "../../config/config.php"; ?>
<?php

if (!isset($_SESSION['adminname'])) {
  header("location: http://localhost/blog-website/admin/admins/login-admins.php");
}

$comments = $conn->query("SELECT posts.id AS id, posts.title AS title, comments.id AS comment_id, comments.id_post_comment AS id_post_comment, comments.user_name_comment AS user_name_comment, comments.comment AS comment, comments.status_comment AS status_comment FROM comments JOIN posts ON posts.id = comments.id_post_comment");

$comments->execute();
$rows = $comments->fetchAll(PDO::FETCH_OBJ);

?>
<div class="row">
  <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title mb-4 d-inline">Comments</h5>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Comment</th>
              <th scope="col">User</th>
              <th scope="col">Status</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($rows as $row) : ?>
              <tr>
                <th scope="row"><?php echo $row->comment_id; ?></th>
                <td><?php echo $row->title; ?></td>
                <td><?php echo $row->comment; ?></td>
                <td><?php echo $row->user_name_comment; ?></td>
                <?php if ($row->status_comment == 0) : ?>
                  <td><a href="http://localhost/blog-website/admin/comments-admins/status-comments.php?comment_id=<?php echo $row->comment_id; ?>&status_comment=<?php echo $row->status_comment; ?>" class="btn btn-danger  text-center ">Deactivated</a></td>
                <?php else : ?>
                  <td><a href="http://localhost/blog-website/admin/comments-admins/status-comments.php?comment_id=<?php echo $row->comment_id; ?>&status_comment=<?php echo $row->status_comment; ?>" class="btn btn-success  text-center ">Activated</a></td>
                <?php endif; ?>
                <td><a href="http://localhost/blog-website/admin/comments-admins/delete-comments.php?comment_id=<?php echo $row->comment_id; ?>" class="btn btn-danger  text-center ">Delete</a></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


<?php require "../includes/footer.php"; ?>