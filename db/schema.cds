namespace com.sap.learning;

using {
  cuid,
  managed
} from '@sap/cds/common';

entity Stores : cuid, managed {
  Name        : String(45) @mandatory;
  Email       : String(45) @mandatory;
  PhoneNumber : String(45) @mandatory;
  Address     : String(100);
  Established : DateTime;
  FloorArea   : Integer;
  Products    : Association to many Products
                  on Products.Store = $self;
}

entity Products : cuid, managed {
  Name                  : String(45)             @mandatory;
  Price                 : Price;
  Photo                 : String(100);
  Specs                 : String(2000)           @mandatory;
  Rating                : Integer                @assert.range: [
    0,
    5
  ];
  SupplierInfo          : String(2000);
  MadeIn                : String(45);
  ProductionCompanyName : String(100);
  Status                : String(100);
  Comment               : Association to many ProductComments
                            on Comment.Product = $self;
  Store                 : Association to Stores  @mandatory  @assert.target;

}

entity ProductComments : cuid, managed {
  Author  : String(45)               @mandatory;
  Message : String(2000)             @mandatory;
  Rating  : Integer;
  Posted  : Date;
  Product : Association to Products  @mandatory  @assert.integrity;
}

entity StoreToProduct {
  Store   : Association to Stores;
  Product : Association to Products;
}

entity Orders : cuid, managed {
  Posted : Date;
  Price  : Price;
  Items  : Composition of many OrderItems
             on Items.Order = $self;
}

entity OrderItems : cuid {
  Order    : Association to Orders;
  Product  : Association to Products;
  Quantity : Integer default 1;
}

type Price {
  amount   : Decimal;
  currency : String(3) default 'USD';
}
