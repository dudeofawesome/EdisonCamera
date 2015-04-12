module.exports = {
	setTriggerClickCallback: function (callback) {
		triggerClickCallback = callback;
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
		return this;
	},
	setTriggerDownCallback: function (callback) {
		triggerDownCallback = callback;
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
		return this;
	},
	setTriggerEndClickCallback: function (callback) {
		triggerEndClickCallback = callback;
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
		return this;
	},
	setAFclickCallback: function (callback) {
		AFclickCallback = callback;
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
		return this;
	},
	setAFdownCallback: function (callback) {
		AFdownCallback = callback;
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
		return this;
	},
	setAFendClickCallback: function (callback) {
		AFendClickCallback = callback;
		if (buttonInterval === null) {
			buttonInteral = setInterval(buttonFunc, BUTTON_FREQUENCY);
		}
		return this;
	}
};

var mraa = require('mraa');

var btnTrigger = new mraa.Gpio(2);
btnTrigger.dir(mraa.DIR_IN);
var btnTriggerDownLastTick = false;
var triggerClickCallback, triggerDownCallback, triggerEndClickCallback;

var btnAF = new mraa.Gpio(3);
btnAF.dir(mraa.DIR_IN);
var btnAFdownLastTick = false;
var AFclickCallback, AFdownCallback, AFendClickCallback;

var BUTTON_FREQUENCY = 1000 / 60;
var buttonFunc = function () {
	if (triggerClickCallback !== null && btnTrigger.read() === 1 && !btnTriggerDownLastTick) {
		triggerClickCallback();
	} else if (triggerEndClickCallback !== null && btnTrigger.read() === 0 && btnTriggerDownLastTick) {
		triggerEndClickCallback();
	}
	if (triggerDownCallback !== null && btnTrigger.read() === 1) {
		triggerDownCallback();
	}
	if (btnTrigger.read() === 1) {
		btnTriggerDownLastTick = true;
	} else {
		btnTriggerDownLastTick = true;
	}

	if (AFclickCallback !== null && btnAF.read() === 1 && !btnAFdownLastTick) {
		AFclickCallback();
	} else if (AFendClickCallback !== null && btnAF.read() === 0 && btnAFdownLastTick) {
		AFendClickCallback();
	}
	if (AFdownCallback !== null && btnAF.read() === 1) {
		AFdownCallback();
	}
	if (btnAF.read() === 1) {
		btnAFdownLastTick = true;
	} else {
		btnAFdownLastTick = true;
	}




	// if (AFclickCallback !== null && btnAF.read() === 1) {
	// 	if (!btnAFdownLastTick) {
	// 		AFclickCallback();
	// 		btnAFdownLastTick = true;
	// 	}
	// } else {
	// 	btnAFdownLastTick = false;
	// }
}
var buttonInterval = null;
