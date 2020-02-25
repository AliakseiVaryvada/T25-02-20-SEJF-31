/**
 * Created by aliaksei on 24.2.20.
 */
({
    doInit: function (component, event, helper) {

        var pageReference = component.get('v.pageReference');
        component.set('v.idValueWorkType', pageReference.state.c__idValue);
        component.set('v.nameValueWorkType', pageReference.state.c__nameValue);

    },
    submitButton : function(component, event, helper) {

        var workTypeObj = component.get("v.selectedLookUpRecordWorkType");
        var skillObj    = component.get("v.selectedLookUpRecordSkills");
        var skillLevel  = component.get("v.SkillLevel");

        var navService = component.find("navService");
        //component.set("v.HideSpinner", true);

        var action = component.get('c.newSkillRequirement');
console.log('here1')
        action.setParams({
            "workTypeObj" : workTypeObj,
            "skillObj" : skillObj,
            "skillLevel" : skillLevel
        });
        console.log('here2')
        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                console.log(actionResult.getReturnValue())
                //check admin case and generate url
                var idValue = actionResult.getReturnValue()

                var pageReference = {
                    type: 'standard__component',
                    attributes: {
                        "componentName": "c__ProductRequiredComponent"
                    },
                    state: {
                        'c__idValue': idValue
                    }
                };
                component.set("v.pageReference", pageReference);
                event.preventDefault();
                navService.navigate(pageReference);

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