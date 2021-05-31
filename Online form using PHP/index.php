<?php
$insert=false;
if(isset($_POST["name"])){
    //Set connection variables
$server="localhost";
$username="root";
$password="";
//Create a database connection
$con=mysqli_connect($server,$username,$password);
//Check for connection success
if(!$con){
    die("connection to the databse failed".my_sql_connect_error());
}
//Collect post variables
$name=$_POST['name'];
$age=$_POST['age'];
$gender=$_POST['gender'];
$email=$_POST['email'];
$phone=$_POST['phone'];
$desc=$_POST['desc'];
//echo"Success connecting to db";
$sql="INSERT INTO `trip`.`trip` ( `name`, `age`, `gender`, `email`, `phone`, `other`, `dt`) 
VALUES ('$name', '$age', '$gender', '$email', '$phone', '$desc', current_timestamp())";
//echo $sql;
//Execute the query
if($con->query($sql)==true){
    //echo"Suceessfully inserted";
    //Flag for sucessful insertion
    $insert=true;
}
else{
    echo "ERROR:$sql<br>$con->error";
}
//Close database connection
$con->close();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TripPlan</title>
    <link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">

</head>
<body>
    <img class="bg" src="bg.jpg" alt="CollegeImg">
    <div class="container">
        <h1>Trip to US</h1>
        <p>Interested students fill and submit the form</p>
        <?php
        if($insert==true){
        echo"<p class='submitmsg'>Thanks for submitting the form</p>";}
        ?>
        <form action="index.php" method="post">
            <input type="text" name="name" id="name" placeholder="Enter your name">
            <input type="text" name="age" id="age" placeholder="Enter your age">
            <input type="text" name="gender" id="name" placeholder="Enter your gender">
            <input type="email" name="email" id="email" placeholder="Enter your email">
            <input type="phone" name="phone" id="phone" placeholder="Enter your phone no">
            <textarea name="desc" id="desc" cols="30"row="10"placeholder="Enter other info">
            </textarea>
            <button class="btn">Submit</button>
        </form>
    </div>
    <script src="index.js"></script>
    
</body>
</html>