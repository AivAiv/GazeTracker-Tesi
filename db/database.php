<?php
    class DatabaseHelper{
        private $db;

        public function __construct($servername, $username, $password, $dbname){
            $this->db = new mysqli($servername, $username, $password, $dbname);
            if ($this->db->connect_error) {
                die("Connection failed: " . $db->connect_error);
            }        
        }

        public function login($email, $password) {
			$query = "SELECT email, password FROM user WHERE email = ? AND password = ?";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('ss',$email, $password);
			$stmt->execute();
			$result = $stmt->get_result();

			return $result->fetch_all(MYSQLI_ASSOC);
		}
    }
?>