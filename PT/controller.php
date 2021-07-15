<?php

error_reporting(E_ERROR);
mysqli_set_charset(connect(), "utf8");

// TODO: CAMBIAR A SWITCH
if ($_POST["action"] == 'insert') {
    insert();
}
else if ($_GET["action"] == 'get'){
    get();
}
else{
    echo 'error';
};


function connect(){
    return mysqli_connect(
    "localhost",
    "root",
    "",
    "formulario-pt"
    );
}


function get(){
    $conn = connect();
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM userdata";
$result = $conn->query($sql);

    if ($result->num_rows > 0) {
    // output data of each row
    $resultado = array();
    while($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $nombre = $row['nombre'];
        $apellido = $row['apellido'];
        $correo = $row['correo'];
        $dni = $row['dni'];
        $telefono = $row['telefono'];

        $resultado[] = array(
            "id" => $id,
            "nombre" => $nombre,
            "apellido" => $apellido,
            "correo" => $correo,
            "dni" => $dni,
            "telefono" => $telefono);
    }
    echo json_encode($resultado);

    } else {
    echo "0 results";
    }
    $conn->close();
}

function insert(){
    $nombre = $_POST["nombre"];
    $apellido = $_POST["apellido"];
    $dni = $_POST["dni"];
    $correo = $_POST["correo"];
    $correo2 = $_POST["correo2"];
    $telefono = $_POST["telefono"];
    
    if(!empty($_POST)||!empty($nombre)){
        $sql = "INSERT INTO userdata (nombre,apellido,dni,correo,correo2,telefono) VALUES ('$nombre', '$apellido', '$dni', '$correo', '$correo2', '$telefono') ";
        mysqli_query(connect(), $sql);
    }     
    echo 'OK';
}
