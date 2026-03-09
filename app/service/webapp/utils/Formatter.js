sap.ui.define(['sap/ui/core/format/DateFormat'], function (DateFormat) {
  'use strict';

  return {
    statusText: function (sStatus) {
      return sStatus === 'OUT_OF_STOCK' ? 'Out of stock' : sStatus === 'OK' ? 'Available' : 'Storage';
    },

    statusState: function (sStatus) {
      return sStatus === 'OUT_OF_STOCK' ? 'Error' : sStatus === 'OK' ? 'Success' : 'Warning';
    },

    deliveryDate: function (sDate) {
      if (!sDate) return "";
      const oDate = new Date(sDate);
      if (isNaN(oDate.getTime())) return "";
      oDate.setDate(oDate.getDate() + 5);
      const oDateFormat = DateFormat.getDateInstance({style: "medium"});
      return oDateFormat.format(new Date(oDate));
    }
  };
});
