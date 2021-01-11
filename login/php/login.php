<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3.1 project</title>
</head>
<body>
    <?php
        if(session_id() == '' || !isset($_SESSION))
        {
            session_start( );
        }
        
    ?>
    <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post">
        <!--- name will stand for both name and email--->
        Name: <input type="text" name="name" size="25"  placeholder="name or email..."><br><br>
        Password: <input type="password" name="pass" size="25" placeholder="password..."><br><br>
        <input type="submit" value="submit"><br><br>
    <form>

    <?php 
          
        #connection variables
        $name = "root";
        $servername = "127.0.0.1";
        $db_name = "project_part_3";
        $password = "2207tabz";
        $port = "3306";
        
        #create connection
        $conn = mysqli_connect($servername, $name, $password, $db_name, $port);
        
        #test connection
        if(!$conn)
        {
            die("connection failed". mysqli_connect_error()); 
        }
        
        elseif($_SERVER["REQUEST_METHOD"]=="POST")
        {
    
            #user_name will stand for both rider registered name or email
            $user_name = $_POST["name"];
            $user_password = $_POST["pass"];
            
            $sql = "SELECT * FROM users WHERE (nme = '$user_name' OR email = '$user_name') AND passwrd = '$user_password' ";
            $result1 = mysqli_query($conn,$sql);


            if($result1 == FALSE)
            {
                echo "We have no such data" ."<br"."Please make sure you are registered with us". "<br";
                echo "<a href='register.php'>Register</a>";
            }

            elseif (mysqli_num_rows($result1) > 0) {
                $row = mysqli_fetch_assoc($result1);
                
                if($row)
                {
                    $_SESSION["name"] = $user_name;

                    header("Location: http://localhost:4000/Desktop/project/TEE/3.1%20project/web/php/index.php");

                    #echo "<br>" ."<a href='rider-register.php'>Register</a>";

                }
            }

            else
            {
                echo "Error please try again <br>";
                echo "i)Check if your name or email is spelled  correctly <br> ii)Your password is correct <br>iii)make sure you are registered first";
                echo "<br>" ."<a href='rider-register.php'>Register</a>";

            }
        
        mysqli_close($conn);
        }
        

    ?>
</body>
</html>