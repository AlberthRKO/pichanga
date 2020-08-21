<?php
//Configurando la conexion
$dbHost = '127.0.0.1';
$dbUser = 'root';
$dbPassword = '';
$dbName = 'pichangadb';

$db = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

//Verifiando el estado de la conexion
if(mysqli_connect_errno()) {
    exit("Error al conectar con la BD.");
}

//Seleccionamos el set de caracteres
mysqli_set_charset($db, "utf8");
