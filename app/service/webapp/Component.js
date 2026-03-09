sap.ui.define(['sap/ui/core/UIComponent'], (UIComponent) => {
  'use strict';

  return UIComponent.extend('service.Component', {
    metadata: {
      manifest: 'json',
      interfaces: ['sap.ui.core.IAsyncContentCreation'],
    },

    init() {
      UIComponent.prototype.init.apply(this, arguments);
      this.getRouter().initialize();
      const oAppModel = this.getModel('appModel');
      oAppModel.setProperty('/layout', 'OneColumn');
      oAppModel.setProperty('/Cart', []);
      oAppModel.setProperty('/CartWeight', 0);
      oAppModel.setProperty('/TotalPrice', 0);
      oAppModel.setProperty('/newProduct', {
        Name: '',
        Price_amount: '',
        Price_currency: 'USD',
        Photo: '',
        Specs: '',
        Rating: '',
        SupplierInfo: '',
        MadeIn: '',
        ProductionCompanyName: '',
        Status: 'OK',
        Store_ID: '',
      });
    },
  });
});
