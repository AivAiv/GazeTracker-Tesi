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

		public function getAllTests() {
			$query = "SELECT * FROM `test`";
			$stmt = $this->db->prepare($query);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public function getCreatorTests($email) {
			$query = "SELECT test.* FROM `user`, `test` WHERE `email` = ? AND `cod_creator` = `user`.`id` ";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('s', $email);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public function deleteTest($testId) {
			$stmt = $this->db->prepare("DELETE FROM `test` WHERE `test`.`id` = ?");
			$stmt->bind_param('i', $testId);
            $stmt->execute();
			return true;
		}

		// Unused
		public function modifyTest($testId, $name) {
			$stmt = $this->db->prepare("UPDATE `test` SET `name` = ?, `active` = '1' WHERE `test`.`id` = ?;");
			$stmt->bind_param('si', $name, $testId);
            $stmt->execute();
			return true;
		}

		public function createTest($name, $codCreator) {
			$stmt = $this->db->prepare("INSERT INTO `test` (`id`, `name`, `cod_creator`, `active`) VALUES (NULL, ?, ?, '1');");
			$stmt->bind_param('si', $name, $codCreator);
            $stmt->execute();
			return true;
		}
    }
?>