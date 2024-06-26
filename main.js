song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
status_song1 = "";
status_song2 = "";

function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);
    }
    
    function modelLoaded(){
    console.log("Posenet is initialized");
    }

function gotPoses(results){
        if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("The left wrist x is " + leftWristX + "and the left wrist y is " + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("The right wrist x is " + rightWristX + "and the right wrist y is " + rightWristY);
        }    
        }

function draw(){
image(video, 0, 0, 600, 500);
fill("red");
stroke("black");
status_song1 = song1.isPlaying();
status_song2 = song2.isPlaying();
if(scoreLeftWrist > 0.2){
circle(leftWristX, leftWristY, 20)
song2.stop();
if(status_song1 == false){
    song1.play();
    document.getElementById("song_heading").innerHTML = "Harry Potter Theme Song"; 
}
}
if(scoreRightWrist > 0.2){
circle(rightWristX, rightWristY, 20);
song1.stop();
if(status_song2 == false){
    song2.play();
    document.getElementById("song_heading").innerHTML = "Peter Pan Song";    
    }
}
}