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
			// Find user in DB
			$query = "SELECT * FROM `user` WHERE `email` = ?";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('s',$email);
			$stmt->execute();
			$result = $stmt->get_result();
			$arrayResult = $result->fetch_all(MYSQLI_ASSOC);

			if (count($arrayResult) == 0) { return null; }

			// Check passwords
			$expectedPassword = $arrayResult[0]["password"];
			$salt = $arrayResult[0]["salt"];
			$passwordToCheck = hash('sha512', $password . $salt);
			if ($passwordToCheck == $expectedPassword) {
				return $arrayResult;
			} else {
				return null;
			}
		}

		public function isEmailPresent($email) {
			$query = "SELECT * FROM `user` WHERE `email` = ?";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('s', $email);
			$stmt->execute();
			if (count($stmt->get_result()->fetch_all(MYSQLI_ASSOC)) != 0) {
				return true;
			} else {
				return false;
			}
		}

        public function register($email, $password, $type, $salt) {
            $stmt = $this->db->prepare("INSERT INTO `user` (`email`, `password`, `type`, `salt`) VALUES (?, ?, ?, ?);");
			$stmt->bind_param('ssss', $email, $password, $type, $salt);
            $stmt->execute();
			return true;
		}
    }
?>