<?php
    class DatabaseHelper{
        private $db;
		private $table_prefix = "etdv_";

        public function __construct($servername, $username, $password, $dbname){
            $this->db = new mysqli($servername, $username, $password, $dbname);
            if ($this->db->connect_error) {
                die("Connection failed: " . $db->connect_error);
            }
        }

        public function login($email, $password) {
			// Find user in DB
			$query = "SELECT * FROM `". $this->table_prefix ."user` WHERE `email` = ?;";
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
			$query = "SELECT * FROM `".$this->table_prefix."user` WHERE `email` = ?;";
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
            $stmt = $this->db->prepare("INSERT INTO `".$this->table_prefix."user` (`email`, `password`, `type`, `salt`) VALUES (?, ?, ?, ?);");
			$stmt->bind_param('ssss', $email, $password, $type, $salt);
            $stmt->execute();
			return true;
		}

		public function getAllTests() {
			$query = "SELECT * FROM `".$this->table_prefix."test`;";
			$stmt = $this->db->prepare($query);
			$stmt->execute();
			$result = $stmt->get_result();
			$res = $result->fetch_all(MYSQLI_ASSOC);

			// Retrieve pages
			for ($i = 0; $i < count($res); $i++) {
				$res[$i]["pages"] = $this->getTestPages($res[$i]["id"]);
			}
			return $res;
		}

		public function getTest($id) {
			$query = "SELECT * FROM `".$this->table_prefix."test` WHERE `id` = ?;";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			$result = $stmt->get_result();
			$res = $result->fetch_all(MYSQLI_ASSOC);

			for ($i = 0; $i < count($res); $i++) {
				$res[$i]["pages"] = $this->getTestPages($res[$i]["id"]);
			}
			return $res;
		}

		public function getCreatorTests($email) {
			$query = "SELECT ".$this->table_prefix."test.* FROM `".$this->table_prefix."user`, `".$this->table_prefix."test` WHERE `email` = ? AND `cod_creator` = `".$this->table_prefix."user`.`id`;";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('s', $email);
			$stmt->execute();
			$result = $stmt->get_result();
			$res = $result->fetch_all(MYSQLI_ASSOC);

			for ($i = 0; $i < count($res); $i++) {
				$res[$i]["pages"] = $this->getTestPages($res[$i]["id"]);
			}
			return $res;
		}

		public function deleteTest($testId) {
			$pages = $this->getTestPages($testId);
			foreach($pages as $page) {
				if ($page["image"] != null) {
					unlink(UPLOAD_DIR . $page["image"]);
				}
			}

			$stmt = $this->db->prepare("DELETE FROM `".$this->table_prefix."test` WHERE `".$this->table_prefix."test`.`id` = ?;");
			$stmt->bind_param('i', $testId);
            $stmt->execute();
			return true;
		}

		public function createTest($name, $questionnaire, $password, $anonym_user, $codCreator) {
			$stmt = $this->db->prepare("INSERT INTO `".$this->table_prefix."test` (`id`, `name`, `questionnaire_link`, `password`, `anonym_user`, `cod_creator`, `active`) VALUES (NULL, ?, ?, ?, ?, ?, '1');");
			$stmt->bind_param('sssii', $name, $questionnaire, $password, $anonym_user, $codCreator);
			$stmt->execute();
			return $this->db->insert_id;
		}

		public function modifyTestName($testId, $name) {
			$stmt = $this->db->prepare("UPDATE `".$this->table_prefix."test` SET `name` = ? WHERE `".$this->table_prefix."test`.`id` = ?;");
			$stmt->bind_param('si', $name, $testId);
            $stmt->execute();
			return true;
		}

		public function modifyTestQuestionnaire($testId, $questionnaire) {
			$stmt = $this->db->prepare("UPDATE `".$this->table_prefix."test` SET `questionnaire_link` = ? WHERE `".$this->table_prefix."test`.`id` = ?;");
			$stmt->bind_param('si', $questionnaire, $testId);
            $stmt->execute();
			return true;
		}

		public function modifyTestPassword($testId, $password) {
			$stmt = $this->db->prepare("UPDATE `".$this->table_prefix."test` SET `password` = ? WHERE `".$this->table_prefix."test`.`id` = ?;");
			$stmt->bind_param('si', $password, $testId);
            $stmt->execute();
			return true;
		}

		public function modifyTestAnonymUser($testId, $anonym_user) {
			$stmt = $this->db->prepare("UPDATE `".$this->table_prefix."test` SET `anonym_user` = ? WHERE `".$this->table_prefix."test`.`id` = ?;");
			$stmt->bind_param('ii', $anonym_user, $testId);
            $stmt->execute();
			return true;
		}

		public function updateTestState($testId, $state) {
			$stmt = $this->db->prepare("UPDATE `".$this->table_prefix."test` SET `active` = ? WHERE `".$this->table_prefix."test`.`id` = ?;");
			$stmt->bind_param('ii', $state, $testId);
            $stmt->execute();
			return true;
		}

		public function getTestPages($testId) {
			$query = "SELECT * FROM `".$this->table_prefix."page` WHERE `cod_test` = ?;";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('i', $testId);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}
		
		public function getPage($pageId) {
			$query = "SELECT * FROM `".$this->table_prefix."page` WHERE `id` = ?;";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('i', $pageId);
			$stmt->execute();
			$result = $stmt->get_result();
			return $result->fetch_all(MYSQLI_ASSOC);
		}

		public function addTestPage($name, $codTest, $link, $image, $text, $maxTime) {
			$query = "INSERT INTO `".$this->table_prefix."page` (`id`, `name`, `cod_test`, `link`, `image`, `text`, `max_time`) VALUES (NULL, ?, ?, ?, ?, ?, ?);";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('sissss', $name, $codTest, $link, $image, $text, $maxTime);
			$stmt->execute();
			return $this->db->insert_id;
		}

		public function updateImageName($pageId, $newName) {
			$query = "UPDATE `".$this->table_prefix."page` SET `image` = ? WHERE `id` = ?;";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('si', $newName, $pageId);
			$stmt->execute();
			return true;
		}

		public function removeTestPage($id) {
			$page = $this->getPage($id);
			if ($page[0]["image"] != null) {
				if (file_exists(UPLOAD_DIR . $page[0]["image"])) {
					unlink(UPLOAD_DIR . $page[0]["image"]);
				}
			}

			$query = "DELETE FROM `".$this->table_prefix."page` WHERE `".$this->table_prefix."page`.`id` = ?;";
			$stmt = $this->db->prepare($query);
			$stmt->bind_param('i', $id);
			$stmt->execute();
			return true;
		}

		public function getAllAnonymousUsers($id_page) {
			if (
				$stmt = $this->db->prepare("SELECT distinct(anonym_user_index) FROM ".$this->table_prefix."webgazer_data where cod_page = ?")
			) {
				$stmt->bind_param('i', $id_page);
				$stmt->execute();
				$result = $stmt->get_result();
				return $result->fetch_all(MYSQLI_ASSOC);
			}
		}

		public function saveTest($idVisualizzation, $coor_x, $coor_y, $uuid)
		{
			if ($stmt = $this->db->prepare("INSERT INTO ".$this->table_prefix."webgazer_data(instant, x, y, anonym_user_index, cod_page) VALUES (CURTIME(3), ?, ?, ?, ?)")) {
				$stmt->bind_param('ddsi', $coor_x, $coor_y, $uuid, $idVisualizzation);
				return $stmt->execute();
			}
		}

		public function getCollectedData($pageId, $userId)
		{
		   if ($stmt = $this->db->prepare("SELECT instant, x, y from ".$this->table_prefix."webgazer_data where cod_page = ? and anonym_user_index = ? order by instant asc")) {
			  $stmt->bind_param('is', $pageId, $userId);
			  $stmt->execute();
			  $result = $stmt->get_result();
			  return $result->fetch_all(MYSQLI_ASSOC);
		   }
		}
    }
?>