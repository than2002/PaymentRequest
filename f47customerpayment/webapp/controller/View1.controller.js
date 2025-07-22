sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast"
], function (Controller, MessageToast) {
  "use strict";

  return Controller.extend("f47.customer.payment.f47customerpayment.controller.View1", {
    
    onInit: function () {
      // ✅ Set current date for Posting Date field
      var oToday = new Date();
      var oView = this.getView();
      
      var oPostingDate = oView.byId("postingDate");
      // var oDocDate = oView.byId("docDate");
      // var oTranslateDate = oView.byId("translatndate");

      if (oPostingDate) oPostingDate.setDateValue(oToday);
      // if (oDocDate) oDocDate.setDateValue(oToday);
      // if (oTranslateDate) oTranslateDate.setDateValue(oToday);
    },

    onCreatePress: function () {
      var oModel = this.getView().getModel();
    
      var oPayload = {
        Docnum: "",
        CompanyCode: "1000",
        Vendor: "V1001",
        to_F47ItemSet: {
          results: [
            { ItemNumber: "001", Amount: "2000", Account: "300001" },
            { ItemNumber: "002", Amount: "1500", Account: "300002" }
          ]
        }
      };
    
      oModel.create("/F47HeaderSet", oPayload, {
        success: function (oData) {
          MessageToast.show("Document Created: " + oData.Docnum);
          // Optional: navigate to page2
          // this.getOwnerComponent().getRouter().navTo("Page2");
        }.bind(this),
        error: function (oError) {
          MessageBox.error("Error creating document!");
          console.log(oError);
        }
      });
    },


    onFieldLengthCheck: function (oEvent) {
      const oInput = oEvent.getSource();
      const sValue = oInput.getValue();
      const iMax = parseInt(oInput.data("maxlength"), 10);

      if (sValue.length > iMax) {
        oInput.setValueState("Error");
      } else {
        oInput.setValueState("None");
      }
    },

    onSubmit: function () {
      var oView = this.getView();

      var docNumber = oView.byId("docNumber").getValue();
      var docDate = oView.byId("docDate").getValue();
      var postingDate = oView.byId("postingDate").getValue();
      var docType = oView.byId("docType").getValue();
      var period = oView.byId("period").getValue();
      var companyCode = oView.byId("companyCode").getValue();
      var currencyRate = oView.byId("currencyRate").getValue();
      var translateDate = oView.byId("translateDate").getValue();
      var reference = oView.byId("reference").getValue();
      var crossCCNo = oView.byId("crossCCNo").getValue();
      var docHeaderText = oView.byId("docHeaderText").getValue();
      var tradingPartner = oView.byId("tradingPartner").getValue();
      var account = oView.byId("account").getValue();
      var sglInd = oView.byId("sglInd").getValue();

      var summary =
        "Document Number: " + docNumber + "\n" +
        "Document Date: " + docDate + "\n" +
        "Posting Date: " + postingDate + "\n" +
        "Type: " + docType + "\n" +
        "Period: " + period + "\n" +
        "Company Code: " + companyCode + "\n" +
        "Currency/Rate: " + currencyRate + "\n" +
        "Translate Date: " + translateDate + "\n" +
        "Reference: " + reference + "\n" +
        "Cross-CC No.: " + crossCCNo + "\n" +
        "Doc Header Text: " + docHeaderText + "\n" +
        "Trading Partner: " + tradingPartner + "\n" +
        "Account: " + account + "\n" +
        "Trg.Sp.G/L ind: " + sglInd;

      MessageToast.show("Customer Down Payment Submitted (Simulation)");
      console.log("Submitted Data:\n" + summary);
    },

    onNextPress: function () {
      this.getOwnerComponent().getRouter().navTo("Page2");
    }
  });
});
