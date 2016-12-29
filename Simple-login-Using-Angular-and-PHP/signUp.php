<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache");


$username = $_POST['uname'];
$userpass = $_POST['password'];
$usermail = $_POST['email'];




$dbconnect=mysqli_connect('localhost','root','root','portaldb');

$user_sql = "INSERT INTO userinfo (uname, password, email,files) VALUES ('$username', '$userpass', '$usermail','')";

if(mysqli_query($dbconnect,$user_sql)){
    $statusLogin=1;
}else{
    $statusLogin=0;
}
$outp='{"statuslogin":"'.$statusLogin.'"}';
$outout=json_encode($outp);
echo $outout;


?>
