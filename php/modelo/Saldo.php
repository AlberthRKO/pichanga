<?php
    class Saldo{
        public $idSaldo;
        public $monto;
        public $fecha;
        public $descripcion;
        public $idAuxiliar;
        
        public function __construct($idSaldo,$monto,$fecha,$descripcion,$idAuxiliar) {
            $this->idSaldo = $idSaldo;
            $this->monto = $monto;
            $this->fecha = $fecha;
            $this->descripcion = $descripcion;
            $this->idAuxiliar = $idAuxiliar;
        }

        public static function insertar($saldo){
            include('../connection.php');
            date_default_timezone_set ("America/La_Paz");
            $date = getdate();
            $now = $date['year']."/".$date['mon']."/".$date['mday']." ".$date['hours'].":".$date['minutes'].":".$date['seconds'];
            $query = $db->prepare("INSERT INTO saldos(MONTO,FECHA,DESCRIPCION,IDAUXILIAR)VALUES(?,'$now',?,?)");
            $query->bind_param("fsi", $saldo->monto, $saldo->descripcion, $saldo->idAuxiliar);

            
            if($query->execute()){
                $query->close();
	            return "OK";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function editar($saldo){
            include('../connection.php');
            $query = $db->prepare("UPDATE saldos SET MONTO=?,DESCRIPCION=? WHERE IDSALDO=?");
            $query->bind_param("fsi", $saldo->monto, $saldo->descripcion, $saldo->idSaldo);
            
            if($query->execute()){
                $query->close();
	            return "Datos editados correctamente";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function eliminar($idSaldo){
            include('../connection.php');
            $query = $db->prepare("DELETE FROM saldos where IDSALDO=?");

            $query->bind_param("i", $idSaldo);

            if($query->execute()){
                $query->close();
	            return "Datos eliminados correctamente";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getTodosSaldos(){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM saldos");

            $saldos = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idSaldo,$monto,$fecha,$descripcion,$idAuxiliar);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $saldoActual = new Saldo($idSaldo,$monto,$fecha,$descripcion,$idAuxiliar);
                    array_push($saldos,$saldoActual);
                }
                //Cerramos la conexion
                $query->close();
                return $saldos;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

        public static function getTodosSaldosPorAuxiliar($idAuxiliar){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM saldos WHERE IDAUXILIAR=?
                                   ORDER BY FECHA");
            $query->bind_param("i", $idAuxiliar);

            $saldos = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idSaldo,$monto,$fecha,$descripcion,$idAuxiliar);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $saldoActual = new Saldo($idSaldo,$monto,$fecha,$descripcion,$idAuxiliar);
                    array_push($saldos,$saldoActual);
                }
                //Cerramos la conexion
                $query->close();
                return $saldos;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

    }
?>