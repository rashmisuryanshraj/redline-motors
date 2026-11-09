<?php

header("Content-Type: application/json");

require_once "../config/database.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Only POST requests are allowed."
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$email = trim($_POST["email"] ?? "");
$phone = trim($_POST["phone"] ?? "");
$car_name = trim($_POST["car_name"] ?? "");
$message = trim($_POST["message"] ?? "");

if ($name === "" || $email === "" || $phone === "") {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please fill all required fields."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Please enter a valid email."
    ]);
    exit;
}

try {
    $sql = "INSERT INTO enquiries
            (name, email, phone, car_name, message)
            VALUES
            (:name, :email, :phone, :car_name, :message)";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ":name" => $name,
        ":email" => $email,
        ":phone" => $phone,
        ":car_name" => $car_name,
        ":message" => $message
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Your enquiry has been submitted successfully!"
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Unable to save enquiry."
    ]);
}
?>