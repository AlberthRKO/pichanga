<?php
  include('../modelo/Conocimiento.php');
  include('../modelo/Auxiliar.php');
  $request = $_POST['request'];
  switch($request){
    case "insertarAlUltimo":
      $conocimientos = $_POST['conocimientos'];
      $idAuxiliar = Auxiliar::getIdUltimoAuxiliar();
      $conocimientos = json_decode($conocimientos);
      $mensaje = "";
      foreach($conocimientos as $c) {
        $conocimiento = new Conocimiento(1,$c,$idAuxiliar);
        Conocimiento::insertar($conocimiento);
      }
    break;
    case "editar":
      $idConocimiento = $_POST['idConocimiento'];
      $c = $_POST['conocimiento'];
      $conocimiento = new Conocimiento($idConocimiento,$c,1);
      Conocimiento::editar($conocimiento);
    break;
    case "eliminar":
      $idConocimiento = $_POST['idConocimiento'];
      Conocimiento::eliminar($idConocimiento);
    break;
    case 'getTodosConocimientos':
      $conocimientos = Conocimiento::getTodosConocimientos();
      if($conocimientos != null)
        echo json_encode($conocimientos);
      else
        echo "empty";
    break;
  }
?>