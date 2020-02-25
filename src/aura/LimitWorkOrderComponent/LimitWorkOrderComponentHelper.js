/**
 * Created by aliaksei on 25.2.20.
 */
({
    submitButton : function(component, event, helper, exitValue) {

        var workTypeObj = component.get("v.selectedLookUpRecordWorkType");
        var workOrderObj = component.get("v.selectedLookUpRecordWorkOrder");
        var status = component.get("v.status");
        var description = component.get("v.description");

        var navService = component.find("navService");

        if (workOrderObj.Id == undefined) {
            var errorMsg = 'Please, select Work Order !'
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Warning',
                type: 'warning',
                message: errorMsg
            });
            toastEvent.fire();
        } else {

            var action = component.get('c.newWorkOrderLineItem');

            action.setParams({
                "workTypeId": workTypeObj.Id,
                "workOrderId": workOrderObj.Id,
                "status": status,
                "description": description
            });

            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {

                    component.set("v.HideSpinner", true);

                    if (exitValue == false) {
                        var pageReference = {
                            type: 'standard__component',
                            attributes: {
                                "componentName": "c__WorkOrderComponent"
                            }
                        };
                    } else {
                        window.location.assign("https://cheny-city-task4-dev-ed.lightning.force.com/" +
                            "lightning/o/WorkOrder/list?filterName=Recent");
                    }

                    component.set("v.pageReference", pageReference);
                    event.preventDefault();
                    navService.navigate(pageReference);

                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: 'Success',
                        type: 'success',
                        message: 'Operation Completed!'
                    });
                    toastEvent.fire();

                } else {
                    //error Case
                    var errorMsg = actionResult.getError()[0].message;
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: 'Error',
                        type: 'error',
                        message: errorMsg
                    });
                    toastEvent.fire();
                }
                component.set("v.HideSpinner", false);

            });
            $A.enqueueAction(action);
        }
    }

})