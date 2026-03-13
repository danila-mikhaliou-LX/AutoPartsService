sap.ui.define(['sap/ui/core/format/DateFormat'], function (DateFormat) {
  'use strict';

  return {
    statusText: function (sStatus) {
      const oResourceBundle = this.getView().getModel('i18n').getResourceBundle();
      return sStatus === 'OUT_OF_STOCK'
        ? oResourceBundle.getText('outOfStock')
        : sStatus === 'OK'
          ? oResourceBundle.getText('available')
          : oResourceBundle.getText('storage');
    },

    statusState: function (sStatus) {
      return sStatus === 'OUT_OF_STOCK' ? 'Error' : sStatus === 'OK' ? 'Success' : 'Warning';
    },

    deliveryDate: function (sDate) {
      if (!sDate) return '';
      let oDate = new Date(sDate);
      if (isNaN(oDate.getTime())) {
        const oDateTimeParser = DateFormat.getDateTimeInstance({ style: 'long' });
        oDate = oDateTimeParser.parse(sDate);
        if (!oDate) return '';
      }
      oDate.setDate(oDate.getDate() + 5);
      const oDateFormatter = DateFormat.getDateInstance({ style: 'long' });
      return oDateFormatter.format(oDate);
    },

    calculateTotal: function (vPrice, vQuantity) {
      if (!vPrice || !vQuantity) return '0.00';
      const fTotal = parseFloat(vPrice) * parseFloat(vQuantity);
      return fTotal.toFixed(2);
    },
    materialText: function (sMaterial) {
      return this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(sMaterial);
    },
    categoryText: function (sCategory) {
      return this.getOwnerComponent()
        .getModel('i18n')
        .getResourceBundle()
        .getText(sCategory.replace(' ', ''));
    },
  };
});
