sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'service/utils/Formatter', 'sap/m/MessageToast'],
  (Controller, Formatter, MessageToast) => {
    'use strict';

    return Controller.extend('service.controller.Cart', {
      formatter: Formatter,
      onInit() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute('RouteCart').attachPatternMatched(this.onCartMatched, this);
      },

      onCartMatched() {
        const oAppModel = this.getView().getModel('appModel');
        oAppModel.setProperty('/layout', 'TwoColumnsMidExpanded');
        const aCart = oAppModel.getProperty('/Cart');
        const sTotalPrice = aCart.reduce((acc, oProduct) => {
          const sPrice = oProduct.Price_amount;
          const sQuantity = oProduct.Quantity;
          return acc + sPrice * sQuantity;
        }, 0);
        oAppModel.setProperty('/TotalPrice', sTotalPrice);
      },

      onCloseCart() {
        const oRouter = this.getOwnerComponent().getRouter();
        const oAppModel = this.getView().getModel('appModel');
        oAppModel.setProperty('/layout', 'OneColumn');
        oRouter.navTo('RouteProductList');
      },

      onCleanCart() {
        const oAppModel = this.getView().getModel('appModel');
        oAppModel.setProperty('/Cart', []);
        oAppModel.setProperty('/TotalPrice', 0);
        oAppModel.setProperty('/CartWeight', 0);
        oAppModel.refresh();
      },

      onPressDelete(oEvent) {
        const oAppModel = this.getView().getModel('appModel');
        const aCart = oAppModel.getProperty('/Cart');
        const oCtx = oEvent.getParameter('listItem').getBindingContext('appModel');

        const sProductID = oCtx.getProperty('ID');

        const aFilteredCart = aCart.filter((oProduct) => oProduct.ID !== sProductID);
        oAppModel.setProperty('/Cart', aFilteredCart);
        const sTotalPrice = aFilteredCart.reduce((acc, oProduct) => {
          const sPrice = oProduct.Price_amount;
          const sQuantity = oProduct.Quantity;
          return acc + sPrice * sQuantity;
        }, 0);
        const sCartWeight = aFilteredCart.reduce((acc, oProduct) => acc + oProduct.Quantity, 0);

        oAppModel.setProperty('/CartWeight', sCartWeight);
        oAppModel.setProperty('/TotalPrice', sTotalPrice);

        oAppModel.refresh();
      },

      onCreateOrder: function () {
        const oAppModel = this.getView().getModel('appModel');
        const aCart = oAppModel.getProperty('/Cart') || [];
        const sTotalPrice = oAppModel.getProperty('/TotalPrice');

        const aOrderItems = aCart.map(function (oProduct) {
          return {
            Product_ID: oProduct.ID,
            Quantity: parseInt(oProduct.Quantity, 10) || 1,
          };
        });

        const sTodayDate = new Date().toISOString().split('T')[0];

        const oNewOrder = {
          Posted: sTodayDate,
          Price_amount: parseFloat(sTotalPrice) || 0,
          Price_currency: 'USD',
          Items: aOrderItems,
        };

        const oODataModel = this.getView().getModel();
        const oListBinding = oODataModel.bindList('/Orders');
        this.getView().setBusy(true);

        oListBinding
          .create(oNewOrder)
          .created()
          .then(() => {
            this.getView().setBusy(false);
            sap.m.MessageToast.show('Order created successfully');

            oAppModel.setProperty('/Cart', []);
            oAppModel.setProperty('/TotalPrice', 0);
            oAppModel.setProperty('/CartWeight', 0);

            oAppModel.refresh();
            this.getView().getModel().refresh();
          })
          .catch((oError) => {
            this.getView().setBusy(false);
            sap.m.MessageBox.error('Error ' + oError.message);
          });
      },
    });
  },
);
