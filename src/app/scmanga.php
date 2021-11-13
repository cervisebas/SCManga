<?php
	header("Access-Control-Allow-Origin: *");
	echo json_encode(array(
		'version' => '1.1',
		'url' => 'http://api.scapps.ga/app-manga.apk'
	));
?>