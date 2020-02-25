/**
 * Created by aliaksei on 24.2.20.
 */

public class NewWorkType {

    //init function for page
    @AuraEnabled
    public static List<String> newWorkTypeInit(){

        List<String> durationTypeList = new List<String>();
        Schema.DescribeFieldResult fieldResult = WorkType.DurationType.getDescribe();
        List<Schema.PicklistEntry> elements = fieldResult.getPicklistValues();

        for( Schema.PicklistEntry pickListValue : elements){
            durationTypeList.add(pickListValue.getLabel());
        }

        return durationTypeList;
    }

    @AuraEnabled
    public static WorkType newWorkType(
            String WorkTypeName,
            String Description,
            Integer EstimatedDuration,
            String DurationType,
            Boolean ServiceAppointment
    ){

        system.debug(WorkTypeName);
        system.debug(Description);
        system.debug(EstimatedDuration);
        system.debug(DurationType);
        system.debug(ServiceAppointment);

        WorkType workType = new WorkType(
                Name = WorkTypeName,
                Description = Description,
                EstimatedDuration = EstimatedDuration,
                DurationType = DurationType,
                ShouldAutoCreateSvcAppt = ServiceAppointment
        );

        insert workType;

        return workType;

    }

}