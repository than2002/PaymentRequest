sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "f47/customer/payment/f47customerpayment/model/models"
  ], function (UIComponent, Device, models) {
    "use strict";
  
    return UIComponent.extend("f47.customer.payment.f47customerpayment.Component", {
      metadata: {
        manifest: "json"
      },
  
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.setModel(models.createDeviceModel(), "device");
        this.getRouter().initialize();
      }
    });
  });
  