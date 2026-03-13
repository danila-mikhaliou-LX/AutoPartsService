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

      onInit() {
        const oAppModel = this.getOwnerComponent().getModel('appModel');
        const oResourceBundle = this.getOwnerComponent().getModel('i18n').getResourceBundle();
        this.getOwnerComponent()
          .getModel()
          .bindList('/Products')
          .requestContexts()
          .then((aContexts) => {
            const aAllCategories = aContexts.map((oContext) => oContext.getProperty('Category'));
            const aUniqueCategories = [...new Set(aAllCategories)].filter(Boolean);
            const aFormattedCategories = [{ key: '', text: oResourceBundle.getText('all') }];
            aUniqueCategories.forEach((sCategory) => {
              aFormattedCategories.push({
                key: sCategory,
                text: oResourceBundle.getText(sCategory.replace(' ', '')),
              });
            });
            oAppModel.setProperty('/Categories', aFormattedCategories);
          });
      },

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
      onSearch() {
        const aFilters = [];
        const sSearchValue = this.getView().byId('searchFieldName').getValue();
        const sSelectedStatus = this.getView().byId('selectStatus').getSelectedKey();
        const sSelectedCategory = this.getView().byId('selectCategory').getSelectedKey();
        const sSliderPriceLow = this.getView().byId('sliderPrice').getValue();
        const ssSliderPriceHigh = this.getView().byId('sliderPrice').getValue2();
        debugger;

        if (sSearchValue) {
          aFilters.push(
            new Filter({
              path: 'Name',
              operator: FilterOperator.Contains,
              value1: sSearchValue,
              caseSensitive: false,
            }),
          );
        }
        if (sSelectedStatus !== '') {
          aFilters.push(
            new Filter({
              path: 'Status',
              operator: FilterOperator.EQ,
              value1: sSelectedStatus,
              caseSensitive: true,
            }),
          );
        }
        if (sSelectedCategory !== '') {
          aFilters.push(
            new Filter({
              path: 'Category',
              operator: FilterOperator.EQ,
              value1: sSelectedCategory,
              caseSensitive: false,
            }),
          );
        }
        aFilters.push(
          new Filter({
            path: 'Price_amount',
            operator: FilterOperator.BT,
            value1: sSliderPriceLow,
            value2: ssSliderPriceHigh,
          }),
        );

        this.getView().byId('productsTable').getBinding('items').filter(aFilters);
      },

      onToggleTheme() {
        const oConfiguration = sap.ui.getCore().getConfiguration();
        const sCurrentTheme = oConfiguration.getTheme();
        const sNewTheme = sCurrentTheme === 'sap_horizon' ? 'sap_horizon_dark' : 'sap_horizon';
        sap.ui.getCore().applyTheme(sNewTheme);
      },
      onToggleLanguage: function () {
        const sCurrentLang = sap.ui.getCore().getConfiguration().getLanguage();
        const sNewLang = sCurrentLang.startsWith('ru') ? 'en' : 'ru';
        const sUrl = window.location.href.split('?')[0];
        window.location.href = sUrl + '?sap-ui-language=' + sNewLang;
      },
    });
  },
);
