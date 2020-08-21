<?php
	$archivo = $_FILES['file'];

	$templocation = $archivo["tmp_name"];
	$name = $archivo["name"];
	$nameAsignado = explode(".",$name);
	$extension = $name[count($nameAsignado)-1];
	$hoy = getdate();
	$now = $hoy['year']."-".$hoy['mon']."-".$hoy['mday']." ".$hoy['hours'].".".$hoy['minutes'].".".$hoy['seconds'];

	if(!templocation){
		die("NO SE HA SELECCIONADO NINGUN ARCHIVO");
	}
	if(move_uploaded_file($templocation, "../../assets/images/files/$name")){
		echo "Archivo guardado correctamente";
	}
	else{
		echo "Error al guardar el archivo";
	}
?>