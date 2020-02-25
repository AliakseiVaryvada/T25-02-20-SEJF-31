/**
 * Created by aliaksei on 24.2.20.
 */

public with sharing class NewWorkOrder {

    public class wrapperClass {
        @AuraEnabled public List<String> statusList { get; set; }
        @AuraEnabled public List<String> priorityList { get; set; }
    }
    //init function for page
    @AuraEnabled
    public static wrapperClass newWorkOrderInit(){

        wrapperClass wrapperClassInit = new wrapperClass();

        List<String> statusList = new List<String>();
        List<String> priorityList = new List<String>();

        Schema.DescribeFieldResult fieldResultStatus = WorkOrder.Status.getDescribe();
        Schema.DescribeFieldResult fieldResultPriority = WorkOrder.Priority.getDescribe();

        List<Schema.PicklistEntry> elementsStatus = fieldResultStatus.getPicklistValues();
        List<Schema.PicklistEntry> elementsPriority = fieldResultPriority.getPicklistValues();

        for( Schema.PicklistEntry pickListValue : elementsStatus){
            statusList.add(pickListValue.getLabel());
        }
        for( Schema.PicklistEntry pickListValue : elementsPriority){
            priorityList.add(pickListValue.getLabel());
        }
        wrapperClassInit.statusList = statusList;
        wrapperClassInit.priorityList = priorityList;

        return wrapperClassInit;
    }

    @AuraEnabled
    public static WorkOrder newWorkOrder(
            String status,
            String priority,
            String workTypeId,
            String subject,
            String description
    ){

        WorkOrder workOrder = new WorkOrder(
                status = status,
                priority = priority,
                workTypeId = workTypeId,
                description = description,
                subject = subject
        );
        try {
            insert workOrder;
        } catch (Exception e){
            throw new AuraHandledException('Something went wrong! Check entered value for' +
                    ' duplicate or contact with Admin');
        }
        return workOrder;
    }
}