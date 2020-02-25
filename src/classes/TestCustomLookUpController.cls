/**
 * Created by aliaksei on 25.2.20.
 */

@IsTest
public class TestCustomLookUpController {
    public static testMethod void testLookup(){

        WorkType workType = new WorkType(
                Name = 'Test',
                EstimatedDuration = 2,
                DurationType = 'Hours'
        );
        WorkOrder workOrder = new WorkOrder(
                Subject = 'Test'
        );

        insert workType;
        insert workOrder;

        List<workOrder> testListWorkOrder = CustomLookUpController.fetchLookUpValues('','WorkOrder');
        List<WorkType> testListWorkType = CustomLookUpController.fetchLookUpValues('','WorkType');

        System.assertEquals('Test',  testListWorkOrder[0].Subject);
        System.assertEquals('Test',  testListWorkType[0].Name);

    }
}