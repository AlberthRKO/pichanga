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

    }
?>