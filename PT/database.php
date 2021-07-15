<?php

$connection = mysqli_connect(
"localhost",
"root",
"",
"formulario-pt"
);

error_reporting(E_ERROR);
mysqli_set_charset($connection, "utf8");

         
$nombre = $_POST["nombre"];
$apellido = $_POST["apellido"];
$dni = $_POST["dni"];
$correo = $_POST["correo"];
$correo2 = $_POST["correo2"];
$telefono = $_POST["telefono"];


if(!empty($_POST)||!empty($nombre)  ){
$sql = "INSERT INTO userdata (nombre,apellido,dni,correo,correo2,telefono) VALUES ('$nombre', '$apellido', '$dni', '$correo', '$correo2', '$telefono') ";
mysqli_query($connection, $sql);
}
               
           

$consulta =  "SELECT * FROM userdata";
$resultado = mysqli_query($connection, $consulta);


?>