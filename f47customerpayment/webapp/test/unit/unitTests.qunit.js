/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"f47/customer/payment/f47customerpayment/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
