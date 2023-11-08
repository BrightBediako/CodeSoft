<?php require "../includes/header.php"; ?>
<?php require "../../config/config.php"; ?>


<div class="row">
    <div class="col">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title mb-5 d-inline">Update Admins</h5>


                <form method="POST" action="update-admins.php">
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
                    <button type="submit" name="submit" class="btn btn-primary  mb-4 text-center">Update</button>
                </form>
            </div>
        </div>
    </div>
</div>

<?php require "../includes/footer.php"; ?>