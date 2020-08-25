<?php
    class Auxiliar{
        public $idAuxiliar;
        public $nombres;
        public $apellidos;
        public $ci;
        public $expedido;
        public $ciudad;
        public $telefono;
        public $correo;
        public $foto;
        public $cuenta;
        public $banco;
        public $fechaRegistro;
        public $contrasena;
        public $rol;
        public $activo;

        
        public function __construct($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,$contrasena,$rol,$activo) {
            $this->idAuxiliar = $idAuxiliar;
            $this->nombres = $nombres;
            $this->apellidos = $apellidos;
            $this->ci = $ci;
            $this->expedido = $expedido;
            $this->ciudad = $ciudad;
            $this->telefono = $telefono;
            $this->correo = $correo;
            $this->foto = $foto;
            $this->cuenta = $cuenta;
            $this->banco = $banco;
            $this->fechaRegistro = $fechaRegistro;
            $this->contrasena = $contrasena;
            $this->rol = $rol;
            $this->activo = $activo;
        }

        public static function insertar($auxiliar){
            include('../connection.php');

            $query = $db->prepare("INSERT INTO auxiliares(NOMBRES,APELLIDOS,CI,EXPEDIDO,CIUDAD,TELEFONO,CORREO,CUENTA,BANCO,FECHAREGISTRO,CONTRASENA)
                                   VALUES(?,?,?,?,?,?,?,?,?,NOW(),'')");
            $query->bind_param("sssssssss", $auxiliar->nombres, $auxiliar->apellidos, $auxiliar->ci, $auxiliar->expedido, $auxiliar->ciudad, $auxiliar->telefono, $auxiliar->correo, $auxiliar->cuenta, $auxiliar->banco);
            
            if($query->execute()){
                $query->close();
	            return "OK";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getIdUltimoAuxiliar(){
            include('../connection.php');
            $query = $db->prepare("SELECT MAX(IDAUXILIAR) FROM auxiliares");
            $id = 0;
            //Indicamos la variable donde se guardaran los resultados
            $query->bind_result($idAuxiliar);
            //listamos todos los resultados
            if($query->execute()){
                while($query->fetch()){
                    $id = $idAuxiliar;
                }
                $query->close();
            }
            return $id;
        }

        public static function editar($auxiliar){
            include('../connection.php');
            $query = $db->prepare("UPDATE auxiliares SET NOMBRES=?,APELLIDOS=?,CI=?,EXPEDIDO=?,CIUDAD=?,TELEFONO=?,CORREO=?,FOTO=?,CUENTA=?,BANCO=? WHERE IDAUXILIAR=?");
            $query->bind_param("ssssssssssi", $auxiliar->nombres, $auxiliar->apellidos, $auxiliar->ci, $auxiliar->expedido, $auxiliar->ciudad, $auxiliar->telefono, $auxiliar->correo, $auxiliar->foto, $auxiliar->cuenta, $auxiliar->banco, $auxiliar->idAuxiliar);
            
            if($query->execute()){
                $query->close();
	            return "Datos editados correctamente";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function eliminar($idAuxiliar){
            include('../connection.php');
            $query = $db->prepare("UPDATE auxiliares SET ACTIVO='0' WHERE IDAUXILIAR=?");

            $query->bind_param("i", $idAuxiliar);

            if($query->execute()){
                $query->close();
	            return "Datos eliminados correctamente";
            } else {
                echo "Error al realizar la consulta: ".$query->error;
                $query->close();
            }
        }

        public static function getByCiContrasena($ci,$contrasena){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM auxiliares WHERE CI=? AND CONTRASENA=? AND ACTIVO='1'");

            $query->bind_param("ss", $ci,$contrasena);
            $auxiliar = null;
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,$contrasena,$rol,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $auxiliar = new Auxiliar($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,$contrasena,$rol,$activo);
                }
                //Cerramos la conexion
                $query->close();
                return $auxiliar;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

        public static function getByCi($ci){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM auxiliares WHERE CI=? AND ACTIVO='1'");
            $query->bind_param("s", $ci);
            $auxiliar = null;
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,$contrasena,$rol,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $auxiliar = new Auxiliar($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,$contrasena,$rol,$activo);
                }
                //Cerramos la conexion
                $query->close();
                return $auxiliar;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

        public static function getTodosAuxiliares(){
            include('../connection.php');
            $query = $db->prepare("SELECT * FROM auxiliares WHERE ACTIVO='1'");

            $auxiliares = array();
            //Ejecutamos la consulta
            if($query->execute()){
                
                //Alamacenaos los datos de la consulta
                $query->store_result();
                
                if($query->num_rows == 0)
                    return null;
                
                //Indicamos la variable donde se guardaran los resultados
                $query->bind_result($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,$contrasena,$rol,$activo);
                
                //listamos todos los resultados
                while($query->fetch()){
                    $auxiliarActual = new Auxiliar($idAuxiliar,$nombres,$apellidos,$ci,$expedido,$ciudad,$telefono,$correo,$foto,$cuenta,$banco,$fechaRegistro,"",$rol,$activo);
                    array_push($auxiliares,$auxiliarActual);
                }
                //Cerramos la conexion
                $query->close();
                return $auxiliares;
                
            } else
                exit('Error al realizar la consulta: '.$query->close());
        }

    }
?>