<?php
// Set the content type to HTML
header('Content-Type: text/html');

// Serve the requested file or display a default message
if (isset($_SERVER['PATH_INFO'])) {
    // Get the requested file path
    $filePath = __DIR__ . $_SERVER['PATH_INFO'];

    // Check if the file exists
    if (file_exists($filePath)) {
        // Serve the file
        readfile($filePath);
    } else {
        // File not found, display a default message
        echo '404 - File not found';
    }
} else {
    // No specific file requested, display a default message
    //echo 'Welcome to the PHP server';
    $response = handleAPI($_SERVER['REQUEST_METHOD']);

    echo json_encode($response);
}

function handleAPI($requestMethod)
{
    $msg = [];

    $msg['message'] = '$requestMethod request received: ' . $_SERVER['REQUEST_URI'];

    switch ($requestMethod) {
        case 'GET':
            $requestData = $_GET;
            break;

        case 'POST':
        case 'PUT':
            $requestData = json_decode(file_get_contents('php://input'), true);
            break;
    }

    return dispatch($requestData['target'], $requestMethod, $msg);
}

function dispatch($requestData, $requestMethod, $msg)
{
    $target = $requestData['target'];

    if (isset($target)) {
        switch ($target) {
            case 'test':
                $msg['data'] = 'TESTED';
                break;

            default:
                $msg['error'] = 'Invalid target specified';
                break;
        }
    }
    else
    {
        $msg['error'] = 'No target specified';
    }

    return $msg;
}
