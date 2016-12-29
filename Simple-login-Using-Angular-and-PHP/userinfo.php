<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-cache");


$username = $_GET['userName'];


$dbconnect=mysqli_connect('localhost','root','root','portaldb');

$user_sql= "SELECT * FROM userinfo where uname='$username'";

$user_query=mysqli_query($dbconnect,$user_sql);
$outp='';
while($rs = $user_query->fetch_array(MYSQLI_ASSOC)) {if ($outp != "") {$outp .= ",";}

  //  $outp = '{"UserName":"'. $rs["uname"] . '","userPassword":"'. $rs["password"] . '","userEmail":"'. $rs["email"] .'"}';

    $outp .= '{"username":"'  . $rs["uname"] . '",';
    $outp .= '"userpassword":"'  . $rs["password"] . '",';
    $outp .= '"userfiles":"'  . $rs["files"] . '",';
    $outp .= '"email":"'. $rs["email"]     . '"}'; 
}

$outp ='{"records":'.$outp.'}';
$outp=json_encode($outp);

echo $outp;






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
