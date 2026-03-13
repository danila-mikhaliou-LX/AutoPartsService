sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'service/utils/Formatter'],
  (Controller, Formatter) => {
    'use strict';

    return Controller.extend('service.controller.Cart', {
      formatter: Formatter,
      onInit() {
        const oRouter = this.getOwnerComponent().getRouter();
        oRouter.getRoute('RouteCreateProduct').attachPatternMatched(this.onRouteMatched, this);
      },

      onRouteMatched(oEvent) {
        this.getView().getModel('appModel').setProperty('/layout', 'TwoColumnsMidExpanded');
      },
      onSave() {
        const oRouter = this.getOwnerComponent().getRouter();
        const oAppModel = this.getView().getModel('appModel');
        const oNewProduct = { ...this.getView().getModel('appModel').getData().newProduct };
        const sCreatedProductSuccess = this.getOwnerComponent()
          .getModel('i18n')
          .getResourceBundle()
          .getText('createdProductSuccess');
        this.getView()
          .getModel()
          .bindList('/Products')
          .create(oNewProduct)
          .created()
          .then(() => {
            oAppModel.setProperty('/layout', 'OneColumn');
            oRouter.navTo('RouteProductList');
            this.getView().getModel().refresh();
            sap.m.MessageToast.show(sCreatedProductSuccess);
          });
      },
      onCancel() {
        this.getOwnerComponent().getRouter().navTo('RouteProductList');
        this.getView().getModel('appModel').setProperty('/layout', 'OneColumn');
      },
    });
  },
);
