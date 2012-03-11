<?php header('Content-type: application/json');
echo (isset($_GET['callback']) ? $_GET['callback'] : 'callback'); ?>({
    "course": "RIA",
    "lecturers": [
        {
            "id": 1,
            "name": "Davy De Winne"
        },
        {
            "id": 2,
            "name": "Bramus Van Damme"
        }
    ]
});