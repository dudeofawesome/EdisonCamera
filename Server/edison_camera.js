var buttonController = require("button_controller");
var cameraController = require("./modules/camera_controller.js");

var BUTTON_TRIGGER_PIN = 3;
var BUTTON_AF_PIN = 2;


var shootingBulbMode = false;
buttonController.add(BUTTON_TRIGGER_PIN,
	null,
	null,
	function () {
		console.log("shooting in bulb mode");
		cameraController.openShutter();
		shootingBulbMode = true;
	},
	function () {
		if (!shootingBulbMode) {
			console.log("shooting for 100ms");
			cameraController.fireBulb(100);
		} else {
			cameraController.closeShutter();
			shootingBulbMode = false;
		}
	});

buttonController.add(BUTTON_AF_PIN,
	null,
	null,
	null,
	function () {
		console.log("AFing");
		cameraController.autoFocus();
	});

buttonController.setLongClickTime(500);