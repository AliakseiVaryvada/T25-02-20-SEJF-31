@IsTest
private class TestInsertsClasses {
    @IsTest
    static void testNewWorkType() {
        System.assertNotEquals(0, NewWorkType.newWorkType().size());
        System.assertEquals('WorkTypeName',
                NewWorkType.newWorkTypeAdd('WorkTypeName', 'Description', 5, 'Hours', false).Name);
    }
    @IsTest
    static void testNewWorkOrder() {
        System.assertNotEquals(0, NewWorkOrder.newWorkOrderInit().priorityList.size());
        System.assertNotEquals(0, NewWorkOrder.newWorkOrderInit().statusList.size());
        System.assertEquals('WorkOrderSubject',
                NewWorkOrder.newWorkOrder('New', 'Low', null, 'WorkOrderSubject', 'test').Subject);
    }
    @IsTest
    static void testNewSkillRequirement() {
        List <Skill> skl = [SELECT id FROM Skill];

        WorkType workType = new WorkType(
                Name = 'TestTest',
                EstimatedDuration = 2,
                DurationType = 'Hours'
        );
        insert workType;
        System.assertEquals(7, NewSkillRequirement.newSkillRequirement(workType, skl[0], 7).SkillLevel);

        WorkOrder workOrder = new WorkOrder(
                Subject = 'Test'
        );
    }

    @IsTest
    static void testNewProductRequirement() {
        System.assertNotEquals(0, NewProductRequirement.newProductRequirementInit().size());
        WorkType workType = new WorkType(
                Name = 'TestTest',
                EstimatedDuration = 2,
                DurationType = 'Hours'
        );
        insert workType;
        Product2 product = new Product2(name = 'product');
        insert product;
        System.assertEquals(5,
                NewProductRequirement.newProductRequirement(workType, product,'Each', 5).QuantityRequired);
    }
    @IsTest
    static void testNewLimitWorkOrderInit() {
        System.assertNotEquals(0, NewLimitWorkOrder.newLimitWorkOrderInit().size());
        WorkType workType = new WorkType(
                Name = 'TestTest',
                EstimatedDuration = 2,
                DurationType = 'Hours'
        );
        insert workType;

        WorkOrder workOrder = new WorkOrder(
                Subject = 'Test'
        );
        insert workOrder;

        System.assertEquals('Test',
                NewLimitWorkOrder.newWorkOrderLineItem( workType.id, workOrder.id,'New','Test').Description);
    }

    @IsTest
    static void testNewItemProduct() {
        System.assertNotEquals(0, NewItemProduct.newNewItemProductInit().size());

        schema.Location loc = new schema.Location(
                name = 'test',
                IsInventoryLocation = true
        );
        insert loc;

        system.debug(loc);
        Product2 product = new Product2(name = 'product');
        insert product;

        System.assertEquals('serial',
                NewItemProduct.newItemProduct(
                        loc.id, product.id, 'Each', 5, 'serial').SerialNumber);
    }

}