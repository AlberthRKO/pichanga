<?php
  include '../modelo/Saldo.php';
  include '../config/Auth.php';
  session_start();

  $exceptions = [];
  $request = $_POST['request'];
  $user = null;
  //Auth::authenticate($request,$user,$exceptions);
  switch($request){
    case "insertar":
      $monto = $_POST['monto'];
      $descripcion = $_POST['descripcion'];
      $idAuxiliar = $_POST['idAuxiliar'];
      $saldo = new Saldo(0,$monto,'',$descripcion,$idAuxiliar);
      $result = Saldo::insertar($saldo);
      echo $result;
    break;
    case "editar":
      $idSaldo = $_POST['idSaldo'];
      $monto = $_POST['monto'];
      $descripcion = $_POST['descripcion'];
      $saldo = new Saldo($idSaldo,$monto,'',$descripcion,0);
    break;
    case "eliminar":
      $idSaldo = $_POST['idSaldo'];
      Saldo::eliminar($idSaldo);
    break;
    case "getTodosSaldos":
      $saldos = Saldo::getTodosSaldos();
      if(count($saldos) > 0)
        echo json_encode($saldos);
      else
        echo "empty";
    break;
    case "getTodosSaldosPorAuxiliar":
      $idAuxiliar = $_POST['idAuxiliar'];
      $saldos = Saldo::getTodosSaldosPorAuxiliar($idAuxiliar);
      if(count($saldos) > 0)
        echo json_encode($saldos);
      else
        echo "empty";
    break;
    ////////////////////////////////////////////////////////////////////////////////
    case "ERROR":
      echo "NOT";
  }

?>