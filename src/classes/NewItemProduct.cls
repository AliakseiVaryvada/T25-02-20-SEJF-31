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

        ProductItem productItem= new ProductItem(
                Product2Id = productId,
                LocationId = locationId,
                QuantityOnHand = QuantityOnHand,
                QuantityUnitOfMeasure = quantityUnit,
                SerialNumber = serialNumber
        );

        try {
            insert productItem;
        } catch (Exception e){
            throw new AuraHandledException('Something went wrong! Check entered value for' +
                    ' duplicate or contact with Admin');
        }

        return productItem;

    }

}