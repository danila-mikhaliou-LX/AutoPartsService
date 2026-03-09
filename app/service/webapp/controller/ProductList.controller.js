sap.ui.define(
  [
    'sap/ui/core/mvc/Controller',
    'service/utils/Formatter',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator',
  ],
  (Controller, Formatter, Filter, FilterOperator) => {
    'use strict';

    return Controller.extend('service.controller.ProductList', {
      formatter: Formatter,

      onInit() {},

      onProductPress(oEvent) {
        const oItem = oEvent.getParameter('listItem');
        const sSelectedProductID = oItem.getBindingContext().getProperty('ID');
        this.getOwnerComponent().getRouter().navTo('RouteProduct', {
          ProductID: sSelectedProductID,
          layout: 'TwoColumnsMidExpanded',
        });
      },

      onPressCart() {
        this.getOwnerComponent().getRouter().navTo('RouteCart');
      },

      onPressOrders() {
        this.getOwnerComponent().getRouter().navTo('RouteOrderList');
      },

      onPressAddProduct() {
        this.getOwnerComponent().getRouter().navTo('RouteCreateProduct');
      },

      onSearch(oEvent) {
        const aFilter = [];
        const sFilterValue = oEvent.getSource().getProperty('value');
        this.getView().byId('productsTable');
        aFilter.push(
          new Filter({
            path: 'Name',
            operator: FilterOperator.Contains,
            value1: sFilterValue,
            caseSensitive: false,
          }),
        );
        this.getView().byId('productsTable').getBinding('items').filter(aFilter);
        debugger;
      },
    });
  },
);
