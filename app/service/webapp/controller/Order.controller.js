sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'service/utils/Formatter'],
  (Controller, Formatter) => {
    'use strict';

    return Controller.extend('service.controller.Order', {
      formatter: Formatter,

      onInit() {
        this.getOwnerComponent()
          .getRouter()
          .getRoute('RouteOrder')
          .attachPatternMatched(this.onPatternMatched, this);
      },

      onPatternMatched(oEvent) {
        const sOrderID = oEvent.getParameter('arguments').OrderID;
        const sLayout = oEvent.getParameter('arguments').layout;
        const oAppModel = this.getView().getModel('appModel');
        const oView = this.getView();

        oView.bindElement({
          path: `/Orders(${sOrderID})`,
          events: {
            dataRequested: () => oView.setBusy(true),
            dataReceived: () => oView.setBusy(false),
          },
        });

        oAppModel.setProperty('/layout', sLayout);
      },

      onNavBack() {
        this.getOwnerComponent().getRouter().navTo('RouteOrderList');
      },
    });
  },
);
