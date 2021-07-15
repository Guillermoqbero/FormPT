<?php 
include("database.php");
echo '<link href="./styles/tabla.styles.css" type="text/css" rel="stylesheet">';
echo '<script
			src="https://kit.fontawesome.com/2c36e9b7b1.js"
			crossorigin="anonymous"
		></script>';

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>
<body>
    <main>
 <a href="index.html" class="link-user" > <div class="neumorphic variation2"> <i class="fas fa-angle-double-left"></i><span>Formulario</span></div></a>
    <table class="blueTable">
<thead>
<tr>
<th>ID</th>
<th>Nombre</th>
<th>Apellido</th>
<th>correo</th>
<th>DNI</th>
<th>Teléfono</th>

</tr>
</thead>

<tbody>
 <?php 
    
    if($resultado){
while($row  = $resultado->fetch_array()){

    $id = $row["id"];
    $nombre = $row["nombre"];
    $apellido = $row["apellido"];
    $correo = $row["correo"];
    $dni = $row["dni"];
    $telefono = $row["telefono"];
    ?>
<tr>  
<td class="mobile"><?php echo $id ?></td>
<td><?php echo $nombre ?></td>
<td><?php echo $apellido ?></td>
<td><?php echo $correo ?></td>
<td><?php echo $dni ?></td>
<td><?php echo $telefono ?></td>
</tr>



    <?php
}
}
    
    ?> </tbody>
</table>
    </main>
</body>
</html>