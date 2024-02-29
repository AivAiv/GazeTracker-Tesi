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
			$query = "SELECT `email`, `password`, `type` FROM `user` WHERE `email` = ? AND `password` = ?";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('ss',$email, $password);
			$stmt->execute();
			$result = $stmt->get_result();

			return $result->fetch_all(MYSQLI_ASSOC);
		}

        public function register($email, $password, $type) {
            // Check for same email
			$query = "SELECT * FROM `user` WHERE `email` = ?";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('s', $email);
			$stmt->execute();
			if (count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) != 0) {
				return true;
			}

            // Insert new user
            $stmt = $this->db->prepare("INSERT INTO `user` (`email`, `password`, `type`) VALUES (?, ?, ?);");
			$stmt->bind_param('sss', $email, $password, $type);
            $stmt->execute();
			return false;
		}
    }
?>