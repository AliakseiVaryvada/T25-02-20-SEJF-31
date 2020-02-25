/**
 * Created by aliaksei on 24.2.20.
 */

public with sharing class NewItemProduct {
    //init function for page
    @AuraEnabled
    public static List<String> newNewItemProductInit(){

        List<String> QuantityUnitOfMeasureList = new List<String>();
        Schema.DescribeFieldResult fieldResult = ProductItem.QuantityUnitOfMeasure.getDescribe();
        List<Schema.PicklistEntry> elements = fieldResult.getPicklistValues();

        for( Schema.PicklistEntry pickListValue : elements){
            QuantityUnitOfMeasureList.add(pickListValue.getLabel());
        }

        return QuantityUnitOfMeasureList;
    }

    @AuraEnabled
    public static ProductItem newItemProduct(
            String locationId,
            String productId,
            String quantityUnit,
            Double quantityOnHand,
            String serialNumber

    ){

        system.debug(locationId);
        system.debug(productId);
        system.debug(quantityUnit);
        system.debug(quantityOnHand);
        System.debug(serialNumber);


        ProductItem productItem= new ProductItem(
                Product2Id = productId,
                LocationId = locationId,
                QuantityOnHand = QuantityOnHand,
                QuantityUnitOfMeasure = quantityUnit,
                SerialNumber = serialNumber
        );

        system.debug(productItem);
        insert productItem;

        return productItem;

    }

}