<?php
require_once './DbP.inc.php';
require_once './DbH.inc.php';
$dbh = DbH::getDbH();

// $sql = $dbh->prepare("select country.id, country.name as 'countryName',
//                        country.population as 'countryPopulation', country.surfacearea,
//                        country.headofstate, cities.name as 'cityName',
//                        cities.population as 'cityPopulation', country_languages.language,
//                        country_languages.isofficial
//                        from cities
//                        join country
//                        on cities.countrycode = country.id
//                        join country_languages
//                        on cities.countrycode = country_languages.countrycode
//                        where cities.countrycode = :code;");
//
// $sql->bindParam(':code', 'ABW');

$code = $_GET['code'];

$sql = "select country.id, country.name as 'countryName', country.population as 'countryPopulation', country.surfacearea, country.headofstate, cities.name as 'cityName', cities.population as 'cityPopulation', country_languages.language, country_languages.isofficial";
$sql .= " from cities";

$sql .= " join country";
$sql .= " on cities.countrycode = country.id";

$sql .= " join country_languages";
$sql .= " on cities.countrycode = country_languages.countrycode";

$sql .= " where cities.countrycode = ".$code.";";

$res = $dbh->query($sql);

$a = array();
while ($out = $res->fetch(PDO::FETCH_ASSOC)) {
    array_push($a, $out);
}

$sql = "select country.id, country.capital, cities.name, cities.population";
$sql .= " from country";
$sql .= " join cities";
$sql .= " on country.capital = cities.id";
$sql .= " where cities.countrycode = ".$code.";";
$res = $dbh->query($sql);
while ($out = $res->fetch(PDO::FETCH_ASSOC)) {
    array_push($a, $out);
}

$content = json_encode($a, JSON_PRETTY_PRINT);

file_put_contents('./public/content.json', $content);
// print($content);
