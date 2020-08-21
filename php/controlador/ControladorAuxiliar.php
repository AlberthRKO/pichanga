<?php
  include('../modelo/Auxiliar.php');
  $request = $_POST['request'];
  switch($request){
    case "insertar":
      $nombres = $_POST['nombres'];
      $apellidos = $_POST['apellidos'];
      $ci = $_POST['ci'];
      $complemento = $_POST['complemento'];
      $telefono = $_POST['telefono'];
      $correo = $_POST['correo'];
      $foto = $_POST['foto'];
      $cuenta = $_POST['cuenta'];
      $banco = $_POST['banco'];
      $auxiliar = new Auxiliar(1,$nombres,$apellidos,$ci,$complemento,$telefono,$correo,"",$cuenta,$banco,"","","0","1");
      $result = Auxiliar::insertar($auxiliar);
      añadirFoto($auxiliar,$foto);
      añadirConocimientos($auxiliar);
      echo $result;
    break;
    case "getIdUltimoAuxiliar":
      $idAuxiliar = Auxiliar::getIdUltimoAuxiliar();
      echo $idAuxiliar;
    break;
    case "editar":
      $idAuxiliar = $_POST['idAuxiliar'];
      $nombres = $_POST['nombres'];
      $apellidos = $_POST['apellidos'];
      $ci = $_POST['ci'];
      $complemento = $_POST['complemento'];
      $telefono = $_POST['telefono'];
      $correo = $_POST['correo'];
      $cuenta = $_POST['cuenta'];
      $banco = $_POST['banco'];
      $foto = $_POST['foto'];
      $auxiliar = new Auxiliar($idAuxiliar,$nombres,$apellidos,$ci,$complemento,$telefono,$correo,$cuenta,$banco,$foto,"","0","1");
      Auxiliar::editar($auxiliar);
    break;
    case "eliminar":
      $idAuxiliar = $_POST['idAuxiliar'];
      Auxiliar::eliminar($idAuxiliar);
    break;
    case "getByCiContrasena":
      $ci = $_POST['ci'];
      $contrasena = $_POST['contrasena'];
      $auxiliar = Auxiliar::getByCiContrasena($ci,$contrasena);
      if($auxiliar != null)
        echo json_encode($auxiliar);
      else
        echo "empty";
    break;
    case "getByCi":
      $ci = $_POST['ci'];
      $auxiliar = Auxiliar::getByCi($ci);
      if($auxiliar != null)
        echo json_encode($auxiliar);
      else
        echo "empty";
    break;
    case "getTodosAuxiliares":
      $auxiliares = Auxiliar::getTodosUsuarios();
      if($auxiliares != null)
        echo json_encode($auxiliares);
      else
        echo "empty";
    break;
  }

  function añadirFoto($auxiliar,$foto){
    if(file_exists("../../assets/images/files/$foto")){
      $fotoAsignada = "default.jpg";
      if($foto != "" && $foto != null){
        $name = explode(".",$foto);
        $extension = $name[count($name)-1];
        $idAuxiliar = Auxiliar::getIdUltimoAuxiliar();
        $fotoAsignada = "$idAuxiliar.$extension";//por si da errores cambiar la extension a jpg
        $fotoAsignada = "$idAuxiliar.jpg";
        rename("../../assets/images/files/$foto", "../../assets/images/user/$fotoAsignada");
      }
      $auxiliar->idAuxiliar = $idAuxiliar;
      $auxiliar->foto = $fotoAsignada;
      Auxiliar::editar($auxiliar);
    }
  }
?>