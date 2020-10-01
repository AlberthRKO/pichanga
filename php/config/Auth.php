<?php
use Firebase\JWT\JWT;

class Auth
{
    private static $secret_key = 'S.¡w?1s4aa-s4df9x8@';
    private static $encrypt = ['HS256'];
    private static $aud = null;

    public static function SignIn($data)
    {
        $time = time();

        $token = array(
            'exp' => $time + (60*60*24),
            'aud' => self::Aud(),
            'data' => $data
        );

        return JWT::encode($token, self::$secret_key);
    }

    public static function Check($token){
        if(empty($token))
            return "NOT";

        $decode = JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        );

        $time = time();
        if($decode->aud !== self::Aud() || $decode->exp <= $time)
            return "NOT";
        else
            return "OK";
    }

    public static function GetData($token)
    {
        return JWT::decode(
            $token,
            self::$secret_key,
            self::$encrypt
        )->data;
    }

    private static function Aud()
    {
        $aud = '';

        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        }

        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();

        return sha1($aud);
    }

    
  function authenticate(&$request,&$user,$exceptions){
    if(isset($exceptions[$request]))
        return;
    if(!isset($_SESSION['jwt'])){
        $request = "ERROR";
        return;
    }
    $jwt = $_SESSION['jwt'];
    $result = Auth::Check($jwt);
    if($result == "NOT")
      $request = "ERROR";
    else
      $user = Auth::GetData($jwt);
  }
}
?>