<?php
    class Conocimiento{
        public $idConocimiento;
        public $conocimiento;
        public $idAuxiliar;

        
        public function __construct($idConocimiento, $conocimiento, $idAuxiliar){
            $this->idConocimiento = $idConocimiento;
            $this->conocimiento = $conocimiento;
            $this->idAuxiliar = $idAuxiliar;
        }

        public static function insertar($conocimiento){
            include('../connection.php');

            $query = $db->prepare("INSERT INTO conocimientos(CONOCIMIENTO,IDAUXILIAR)
                                   VALUES(?,?)");
            $query->bind_param("si", $conocimiento->conocimiento, $conocimiento->idAuxiliar);
            
            if($query->execute()){
                $query->close();
	            return "OK";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function editar($conocimiento){
            include('../connection.php');
            $query = $db->prepare("UPDATE conocimientos SET CONOCIMIENTO=? WHERE IDCONOCIMIENTO=?");
            $query->bind_param("si", $conocimiento->conocimiento,$conocimiento->idConocimiento);
            
            if($query->execute()){
                $query->close();
	            return "Datos editados correctamente";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function eliminar($idConocimiento){
            include('../connection.php');
            $query = $db->prepare("DELETE FROM CONOCIMIENTOS WHERE IDCONOCIMIENTO=?");

            $query->bind_param("i", $idConocimiento);

            if($query->execute()){
                $query->close();
	            return "Datos eliminados correctamente";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getTodosConocimientosByAuxiliar($idAuxiliar){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM conocimientos WHERE IDAUXILIAR=?");
            $query->bind_param("i", $idAuxiliar);
            $conocimientos = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idConocimiento, $conocimiento, $idAuxiliar);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $conocimientoActual = new Conocimiento($idConocimiento, $conocimiento, $idAuxiliar);
                    array_push($conocimientos,$conocimientoActual);
                }
                //Cerramos la conexion
                $query->close();
                return $conocimientos;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        
        public static function getTodosConocimientos(){
            include('../connection.php');
            $query = $db->prepare("SELECT C.IDCONOCIMIENTO,C.CONOCIMIENTO,C.IDAUXILIAR
                                   FROM conocimientos C INNER JOIN auxiliares A ON A.IDAUXILIAR=C.IDAUXILIAR
                                   WHERE A.ACTIVO='1'");
            $conocimientos = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idConocimiento, $conocimiento, $idAuxiliar);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $conocimientoActual = new Conocimiento($idConocimiento, $conocimiento, $idAuxiliar);
                    array_push($conocimientos,$conocimientoActual);
                }
                //Cerramos la conexion
                $query->close();
                return $conocimientos;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }
        

    }
?>