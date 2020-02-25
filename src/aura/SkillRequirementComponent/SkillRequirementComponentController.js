/**
 * Created by aliaksei on 24.2.20.
 */
({
    submitButton : function(component, event, helper) {

        var workTypeObj = component.get("v.selectedLookUpRecordWorkType");
        var skillObj    = component.get("v.selectedLookUpRecordSkills");
        var skillLevel  = component.get("v.SkillLevel");

        if (workTypeObj.Id == undefined || skillObj.Id == undefined) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:  'Warning',
                type:   'warning',
                message: 'Please, fill empty fields! '
            });
            toastEvent.fire();
        } else {

            var navService = component.find("navService");
            component.set("v.HideSpinner", true);

            var action = component.get('c.newSkillRequirement');

            action.setParams({
                "workTypeObj": workTypeObj,
                "skillObj"   : skillObj,
                "skillLevel" : skillLevel
            });

            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {
                    console.log(actionResult.getReturnValue())

                    var pageReference = {
                        type: 'standard__component',
                        attributes: {
                            "componentName": "c__ProductRequiredComponent"
                        }
                    };
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