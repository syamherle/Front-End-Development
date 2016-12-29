<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache");

$oldusername=$_POST['olduname'];
$username = $_POST['newuname'];
$userpass = $_POST['password'];
$usermail = $_POST['email'];



$dbconnect=mysqli_connect('localhost','root','root','portaldb');

$user_sql = "UPDATE userinfo SET uname = '$username', password = '$userpass', email='$usermail' WHERE uname = '$oldusername'";

if(mysqli_query($dbconnect,$user_sql)){
    $statusLogin=1;
}else{
    $statusLogin=0;
}

$outp='{"statuslogin":"'.$statusLogin.'"}';
$outout=json_encode($outp);
echo $outout;
?>
