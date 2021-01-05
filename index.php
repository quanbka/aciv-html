<?php

$actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
$fileName = (parse_url($actual_link, PHP_URL_PATH));
if ($fileName == '/') {
    $fileName = '/index';
}
// print_r($fileName); die;
$file = file_get_contents(".$fileName.html", true);
// $file = str_replace("(024) 7107 7688", "0778662793", $file);
//$file = str_replace("/Coveo", "https://www.fticonsulting-asia.com/Coveo", $file);

$file = str_replace("FTI", "ACIV", $file);
$file = str_replace("~", "/~", $file);
$file = str_replace("//~", "/~", $file);
$file = str_replace("/~", "https://www.fticonsulting-asia.com/~", $file);
//$file = str_replace("/css", "https://www.fticonsulting-asia.com/css", $file);
//$file = str_replace("/js", "https://www.fticonsulting-asia.com/js", $file);
echo $file;

?>
