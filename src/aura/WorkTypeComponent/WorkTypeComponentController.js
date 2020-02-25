
({
    doInit: function (component, event, helper) {

        var action = component.get('c.newWorkType');

        action.setCallback(this, function (actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                var returnValue = actionResult.getReturnValue();
                console.log(returnValue);
                component.set('v.DurationTypeList', returnValue);

            }

        });
        $A.enqueueAction(action);

    },
    submitButton : function(component, event, helper) {
        //login method
        var WorkTypeName = component.get("v.WorkTypeName");
        var Description = component.get("v.Description");
        var EstimatedDuration = component.get("v.EstimatedDuration");
        var DurationType = component.get("v.DurationType");
        var ServiceAppointment = component.get("v.ServiceAppointment");

        var navService = component.find("navService");


        var action = component.get('c.newWorkTypeAdd');

        action.setParams({
            "WorkTypeName": WorkTypeName,
            "Description": Description,
            "EstimatedDuration": EstimatedDuration,
            "DurationType": DurationType,
            "ServiceAppointment": ServiceAppointment
        });

        if (WorkTypeName == undefined || EstimatedDuration == undefined) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Warning',
                type: 'warning',
                message: 'Please, fill empty fields! '
            });
            toastEvent.fire();
        } else {
            component.set("v.HideSpinner", true);
            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {

                    var idValue = actionResult.getReturnValue().Id
                    var nameValue = actionResult.getReturnValue().Name

                    var pageReference = {
                        type: 'standard__component',
                        attributes: {
                            "componentName": "c__SkillRequirementComponent"
                        },
                        state: {
                            'c__idValue': idValue,
                            'c__nameValue': nameValue
                        }
                    };
                    component.set("v.pageReference", pageReference);
                    event.preventDefault();
                    navService.navigate(pageReference);
                    console.log(actionResult.getReturnValue());
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