<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache");


$username = $_POST['uname'];
$userpass = $_POST['password'];



$dbconnect=mysqli_connect('localhost','root','root','portaldb');

$user_sql= "SELECT * FROM userinfo where uname='$username' and password='$userpass'";

$user_query=mysqli_query($dbconnect,$user_sql);
$response['statuslogin']=0;
$outp='';

if(mysqli_num_rows($user_query)==1){
    $statusLogin=1;
}else{
    $statusLogin=0;
}


$outp='{"statuslogin":"'.$statusLogin.'"}';
$outout=json_encode($outp);
echo $outout;






//echo $user_query;


/*$outp = "";
while($rs = $user_query->fetch_array(MYSQLI_ASSOC)) {if ($outp != "") {$outp .= ",";}

  //  $outp = '{"UserName":"'. $rs["uname"] . '","userPassword":"'. $rs["password"] . '","userEmail":"'. $rs["email"] .'"}'; 

    $outp .= '{"UserName":"'  . $rs["uname"] . '",';
    $outp .= '"userPassword":"'   . $rs["password"]        . '",';
    $outp .= '"email":"'. $rs["email"]     . '"}'; 
}

$outp ='{"records":['.$outp.']}';
echo $outp*/
?>
