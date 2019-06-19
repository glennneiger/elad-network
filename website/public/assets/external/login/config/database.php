<?php
// used to get mysql database connection
class Database{

	// specify your own database credentials
	private $host = "172.16.0.204";
	private $db_name = "platform.elad.network";
	private $username = "platform.elad.network";
	private $password = "YK8%$%$%^&am*&0TrxIHDr9M";
	public $conn;

	// get the database connection
	public function getConnection(){

		$this->conn = null;

		try{
			$this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
		}catch(PDOException $exception){
			echo "Connection error: " . $exception->getMessage();
		}

		return $this->conn;
	}
}
?>
