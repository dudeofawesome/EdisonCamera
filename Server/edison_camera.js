var buttonController = require("./modules/button_controller.js");
var cameraController = require("./modules/camera_controller.js");

buttonController.setTriggerDownCallback(function () {
    console.log("shooting for 1000ms");
    cameraController.fireBulb(1000);
}).setAFdownCallback(function () {
    console.log("AFing");
    cameraController.autoFocus();
});
