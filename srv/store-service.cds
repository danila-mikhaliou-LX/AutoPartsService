using com.sap.learning as db from '../db/schema';

service StoreService @(path: '/root') {
    entity Stores          as projection on db.Stores;

    entity Products        as projection on db.Products
        actions {
            function getAverageRating() returns Integer
        };

    entity ProductComments as projection on db.ProductComments;
    entity Orders          as projection on db.Orders;
    
    action mutate(param : String) returns String;

}
