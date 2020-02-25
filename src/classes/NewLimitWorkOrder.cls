/**
 * Created by aliaksei on 25.2.20.
 */

    public class NewLimitWorkOrder {

        //init function for page
        @AuraEnabled
        public static List<String> newLimitWorkOrderInit(){

            List<String> statusList = new List<String>();
            Schema.DescribeFieldResult fieldResult = WorkOrderLineItem.Status.getDescribe();
            List<Schema.PicklistEntry> elements = fieldResult.getPicklistValues();

            for( Schema.PicklistEntry pickListValue : elements){
                statusList.add(pickListValue.getLabel());
            }

            return statusList;
        }

        @AuraEnabled
        public static WorkOrderLineItem newWorkOrderLineItem(
                String workTypeId,
                String workOrderId,
                String status,
                String description
        ){

            WorkOrderLineItem workOrderLineItem = new WorkOrderLineItem(
                    workTypeId = workTypeId,
                    workOrderId = workOrderId,
                    status = status,
                    description = description
            );
            try {
                insert workOrderLineItem;
            }
            catch (Exception e){
                throw new AuraHandledException('Something went wrong. Contact with Admin : '
                        + e.getMessage());
            }

            return workOrderLineItem;

        }

    }
