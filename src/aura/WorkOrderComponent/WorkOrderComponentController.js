/**
 * Created by aliaksei on 24.2.20.
 */
({
    doInit: function (component, event, helper) {
    // подумать нужны ли

        var action = component.get('c.newWorkOrderInit');

        action.setCallback(this, function (actionResult) {
            var state = actionResult.getState();

            if (state === 'SUCCESS') {
                var returnValue = actionResult.getReturnValue();
                console.log(returnValue);
                component.set('v.statusList', returnValue.statusList);
                component.set('v.priorityList', returnValue.priorityList);

            }

        });
        $A.enqueueAction(action);

    },
    submitButton : function(component, event, helper) {

        var status = component.get("v.status");
        var priority  = component.get("v.priority");
        var workTypeId= component.get("v.selectedLookUpRecordWorkType").Id;
        var subject = component.get("v.subject");
        var description = component.get("v.description");

        var navService = component.find("navService");
        //component.set("v.HideSpinner", true);

        var action = component.get('c.newWorkOrder');

        action.setParams({
            "status" : status,
            "priority" : priority,
            "workTypeId" : workTypeId,
            "subject" : subject,
            "description" : description
        });

        console.log(priority)
        console.log(workTypeId)
        console.log(subject)
        console.log(description)

        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                console.log(actionResult.getReturnValue())

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
})