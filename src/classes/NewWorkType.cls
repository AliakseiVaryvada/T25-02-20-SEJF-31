/**
 * Created by aliaksei on 24.2.20.
 */

public class NewWorkType {

    //init function for page
    @AuraEnabled
    public static List<String> newWorkType(){

        List<String> durationTypeList = new List<String>();
        Schema.DescribeFieldResult fieldResult = WorkType.DurationType.getDescribe();
        List<Schema.PicklistEntry> elements = fieldResult.getPicklistValues();

        for( Schema.PicklistEntry pickListValue : elements){
            durationTypeList.add(pickListValue.getLabel());
        }

        return durationTypeList;
    }

    @AuraEnabled
    public static WorkType newWorkTypeAdd(
            String WorkTypeName,
            String Description,
            Double EstimatedDuration,
            String DurationType,
            Boolean ServiceAppointment
    ){

        WorkType workType = new WorkType(
                Name = WorkTypeName,
                Description = Description,
                EstimatedDuration = EstimatedDuration,
                DurationType = DurationType,
                ShouldAutoCreateSvcAppt = ServiceAppointment
        );

        try {
            insert workType;
        } catch (Exception e){
            throw new AuraHandledException('Something went wrong. Contact with Admin : '
                    + e.getMessage());
        }

        return workType;

    }

}