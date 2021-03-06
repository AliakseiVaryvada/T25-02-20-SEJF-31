/**
 * Created by aliaksei on 24.2.20.
 */

    public class NewProductRequirement {

        //init function for page
        @AuraEnabled
        public static List<String> newProductRequirementInit(){

            List<String> QuantityUnitOfMeasureList = new List<String>();
            Schema.DescribeFieldResult fieldResult = ProductRequired.QuantityUnitOfMeasure.getDescribe();
            List<Schema.PicklistEntry> elements = fieldResult.getPicklistValues();

            for( Schema.PicklistEntry pickListValue : elements){
                QuantityUnitOfMeasureList.add(pickListValue.getLabel());
            }

            return QuantityUnitOfMeasureList;
        }

        @AuraEnabled
        public static ProductRequired newProductRequirement(
                WorkType workTypeObj,
                Product2 productObj,
                String quantityUnit,
                Double quantityRequired
        ){

            ProductRequired productRequired = new ProductRequired(
                    Product2Id = productObj.id,
                    ParentRecordId = workTypeObj.id,
                    QuantityRequired = QuantityRequired,
                    QuantityUnitOfMeasure = quantityUnit
            );

            try {
                insert productRequired;
            } catch (Exception e){
                throw new AuraHandledException('Something went wrong! Check entered value for' +
                        ' duplicate or contact with Admin.');
            }

            return productRequired;

        }

    }