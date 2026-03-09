sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'service/utils/Formatter'],
  (Controller, Formatter) => {
    'use strict';

    return Controller.extend('service.controller.Product', {
      formatter: Formatter,

      onInit() {
        this.getOwnerComponent()
          .getRouter()
          .getRoute('RouteProduct')
          .attachPatternMatched(this.onPatternMatched, this);
      },

      onPatternMatched(oEvent) {
        const sProductID = oEvent.getParameter('arguments').ProductID;
        const sLayout = oEvent.getParameter('arguments').layout;
        const oAppModel = this.getView().getModel('appModel');
        const oView = this.getView();
        oView.bindElement({
          path: `/Products(${sProductID})`,
          events: {
            dataRequested: () => oView.setBusy(true),
            dataReceived: () => oView.setBusy(false),
          },
        });
        oAppModel.setProperty('/layout', sLayout);
        oAppModel.setProperty('/ProductID', sProductID);
      },

      onPressAddToCart(oEvent) {
        const oAppModel = this.getView().getModel('appModel');
        const oProductSelected = oEvent.getSource().getBindingContext().getObject();
        const aCart = oAppModel.getProperty('/Cart');
        let aNewCart = [];

        if (!!aCart.find((oProduct) => oProduct.ID === oProductSelected.ID)) {
          const sQuantity = aCart.find((oProduct) => oProduct.ID === oProductSelected.ID).Quantity;

          aNewCart = [
            ...aCart.filter((oProduct) => oProduct.ID !== oProductSelected.ID),
            { ...oProductSelected, Quantity: sQuantity + 1 },
          ];
        } else {
          aNewCart = [...aCart, { ...oProductSelected, Quantity: 1 }];
        }

        const sCartWeight = aNewCart.reduce((acc, oProduct) => acc + oProduct.Quantity, 0);

        oAppModel.setProperty('/CartWeight', sCartWeight);
        oAppModel.setProperty('/Cart', aNewCart);
      },

      onPressBack() {
        this.getView().getModel('appModel').setProperty('/layout', 'OneColumn');
      },

      onPressCart() {
        this.getOwnerComponent().getRouter().navTo('RouteCart');
      },

      onPressDelete() {
        this.getView()
          .getBindingContext()
          .delete()
          .then(() => {
            this.getView().getModel().refresh();
            this.getView().getModel('appModel').setProperty('/layout', 'OneColumn');
            this.getOwnerComponent().getRouter().navTo('RouteProductList');
          });
        const aCart = this.getView().getModel('appModel').getProperty('/Cart');
        const sProductID = this.getView().getModel('appModel').getProperty('/ProductID');
        const aFilteredCart = aCart.filter((oProduct) => oProduct.ID !== sProductID);
        const sCartWeight = aFilteredCart.reduce((acc, oProduct) => acc + oProduct.Quantity, 0);
        this.getView().getModel('appModel').setProperty('/Cart', aFilteredCart);
        this.getView().getModel('appModel').setProperty('/CartWeight', sCartWeight);
        this.getView().getModel('appModel').refresh();
      },

      onPost(oEvent) {
        const sComment = oEvent.getParameter('value');
        const sProductID = this.getView().getModel('appModel').getProperty('/ProductID');
        this.getView()
          .getModel()
          .bindList('/ProductComments')
          .create({
            Author: 'Anonymous',
            Message: sComment,
            Rating: 5,
            Product_ID: sProductID,
          })
          .created()
          .then(() => this.getView().getModel().refresh());
      },
    });
  },
);
