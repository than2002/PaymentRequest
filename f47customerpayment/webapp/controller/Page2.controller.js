sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/SelectDialog",
  "sap/m/StandardListItem",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, SelectDialog, StandardListItem, JSONModel, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("f47.customer.payment.f47customerpayment.controller.Page2", {
onInit: function () {
      // Set local mock data model for SelectDialog
      var oModel = new JSONModel({
        vendors: [
          { id: "100001", name: "RAJESH EXPORTS" },
          { id: "100002", name: "ACME SUPPLIERS" },
          { id: "100003", name: "XYZ TRADERS" }
        ],
        accounts: [
          { id: "10012000", name: "Advance Payments" },
          { id: "10013000", name: "Vendor Clearing" },
          { id: "10014000", name: "Cash Clearing" }
        ]
      });
      this.getView().setModel(oModel, "helpModel");
    },
    

    onValueHelpVendor: function () {
      var oModel = this.getView().getModel("helpModel");

      var oDialog = new SelectDialog({
        title: "Select Vendor",
        items: {
          path: "helpModel>/vendors",
          template: new StandardListItem({
            title: "{helpModel>name}",
            description: "{helpModel>id}"
          })
        },
        search: function (oEvent) {
          var sValue = oEvent.getParameter("value");
          var oFilter = new Filter("name", FilterOperator.Contains, sValue);
          oDialog.getBinding("items").filter([oFilter]);
        },
        confirm: function (oEvent) {
          var sSelected = oEvent.getParameter("selectedItem").getDescription();
          this.byId("vendor").setValue(sSelected);
        }.bind(this)
      });

      oDialog.setModel(oModel, "helpModel");
      oDialog.open();
    },

    onValueHelpGL: function () {
      var oModel = this.getView().getModel("helpModel");

      var oDialog = new SelectDialog({
        title: "Select G/L Account",
        items: {
          path: "helpModel>/accounts",
          template: new StandardListItem({
            title: "{helpModel>name}",
            description: "{helpModel>id}"
          })
        },
        confirm: function (oEvent) {
          var sSelected = oEvent.getParameter("selectedItem").getDescription();
          this.byId("glAccount").setValue(sSelected);
        }.bind(this)
      });

      oDialog.setModel(oModel, "helpModel");
      oDialog.open();
    },

    onNavBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    },

    onSubmitVendorItem: function () {
      var oView = this.getView();
      var oModel = this.getOwnerComponent().getModel(); // Main OData model
    
      // ⭐ Collect Required Header Fields
      var sBLDAT = oView.byId("date").getValue();          // Posting Date ⭐
      var sBUKRS = oView.byId("companyCode").getValue();   // Company Code ⭐
      var sWAERS = oView.byId("currency").getValue();      // Currency ⭐
      var sLIFNR = oView.byId("vendor").getValue();        // Vendor ⭐
      var sZTERM = oView.byId("paymentTerm").getValue();   // Payment Term (Optional)
      var sZLSCH = oView.byId("paymentMethod").getValue(); // Payment Method (Optional)
      var sMWSKZ = oView.byId("taxCode").getValue();       // Tax Code (Optional)
    
      // Optional: Validate Required Fields Before Submit
      if (!sBLDAT || !sBUKRS || !sWAERS || !sLIFNR) {
        MessageToast.show("Please fill all required fields (*)");
        return;
      }
    
      // ✅ Header Structure
      var oHeader = {
        ZDOCNUM: "",      // Let backend assign
        BLDAT: sBLDAT,    // ⭐
        BUKRS: sBUKRS,    // ⭐
        WAERS: sWAERS,    // ⭐
        LIFNR: sLIFNR,    // ⭐
        ZTERM: sZTERM,
        ZLSCH: sZLSCH,
        MWSKZ: sMWSKZ,
        F47ItemNav: []    // Nested Items
      };
    
      // ⭐ Collect Required Item Fields
      var sHKONT = oView.byId("glAccount").getValue(); // G/L Account ⭐
      var sWRBTR = oView.byId("amount").getValue();    // Amount ⭐
      var sSGTXT = oView.byId("narration").getValue(); // Narration (optional)
    
      // Optional: Validate Item Fields
      if (!sHKONT || !sWRBTR) {
        MessageToast.show("Please enter G/L Account and Amount");
        return;
      }
    
      // ✅ Item Structure
      var oItem = {
        POSNR: "0001",     // Item Number
        HKONT: sHKONT,     // ⭐
        WRBTR: sWRBTR,     // ⭐
        SGTXT: sSGTXT,
        WAERS: sWAERS,     // Needed for item too
        LIFNR: sLIFNR,
        ZTERM: sZTERM,
        ZLSCH: sZLSCH,
        MWSKZ: sMWSKZ
      };
    
      oHeader.F47ItemNav.push(oItem); // Add item to navigation
    
      // 🔄 POST Deep Entity Call
      oModel.create("/F47HeaderSet", oHeader, {
        success: function (oData) {
          MessageToast.show("✅ Document Created: " + oData.DOCNUM);
        },
        error: function (oError) {
          MessageToast.show("❌ Error creating document");
          console.error(oError);
        }
      });
    }
    
    
  });
});
