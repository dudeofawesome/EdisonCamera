module.exports = {
	fire: function (s) {
		fireTrigger.write(1);
		fireTrigger.write(0);
	},
	autoFocus: function () {
		autoFocusTrigger.write(1);
		autoFocusTrigger.write(0);
	},
	openShutter: function () {
		if (!shutterOpen) {
			fireTrigger.write(1);
			shutterOpen = true;
		}
	},
	closeShutter: function () {
		if (shutterOpen) {
			fireTrigger.write(0);
			shutterOpen = false;
		}
	},
	fireBulb: function (duration) {
		this.openShutter();
		setTimeout(this.closeShutter, duration);
	}
};

var mraa = require('mraa');

var fireTrigger = new mraa.Gpio(8);
fireTrigger.dir(mraa.DIR_OUT);
fireTrigger.write(0);

var autoFocusTrigger = new mraa.Gpio(7);
autoFocusTrigger.dir(mraa.DIR_OUT);
autoFocusTrigger.write(0);

var shutterOpen = false;
