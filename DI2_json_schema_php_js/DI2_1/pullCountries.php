<?php
require_once './DbP.inc.php';
require_once './DbH.inc.php';
$dbh = DbH::getDbH();

$sql = "select country.id, country.name as 'countryName'";
$sql .= " from country;";

$res = $dbh->query($sql);

$a = array();
while ($out = $res->fetch(PDO::FETCH_ASSOC)) {
    array_push($a, $out);
}

$content = json_encode($a, JSON_PRETTY_PRINT);

// file_put_contents('./public/content.json', $content);
print($content);
