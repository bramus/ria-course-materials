<?php
	header('Content-Type:text/xml');
	sleep(5);
	echo '<?xml version="1.0" encoding="UTF-8"?>
<sample>
	<course>WMD</course>
	<lecturers>
		<lecturer>Bramus Van Damme</lecturer>
		<lecturer>Davy De Winne</lecturer>
	</lecturers>
</sample>';
?>