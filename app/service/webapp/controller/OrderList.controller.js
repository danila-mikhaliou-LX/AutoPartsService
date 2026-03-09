sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'service/utils/Formatter', 'sap/m/MessageToast'],
  (Controller, Formatter, MessageToast) => {
    'use strict';

    return Controller.extend('service.controller.OrderList', {
      formatter: Formatter,
      onInit() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute('RouteOrderList').attachPatternMatched(this.onPatternMatched, this);
      },

      onPatternMatched() {
        const oAppModel = this.getView().getModel('appModel');
        oAppModel.setProperty('/layout', 'TwoColumnsMidExpanded');
      },

      onOrderPress(oEvent) {
        const oItem = oEvent.getSource();
        const oContext = oItem.getBindingContext();
        const sOrderID = oContext.getProperty("ID");
        
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("RouteOrder", {
          OrderID: sOrderID,
          layout: "TwoColumnsMidExpanded"
        });
      }
    });
  },
);
