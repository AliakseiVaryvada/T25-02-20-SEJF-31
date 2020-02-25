/**
 * Created by aliaksei on 24.2.20.
 */

({
    doInit: function (component, event, helper) {
// подумать нужны ли
        var pageReference = component.get('v.pageReference');
        component.set('v.idValueWorkType', pageReference.state.c__idValue);
        component.set('v.nameValueWorkType', pageReference.state.c__nameValue);

        var action = component.get('c.newProductRequirementInit');

            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    console.log(returnValue);
                    component.set('v.quantityUnitList', returnValue);

                }

            });
            $A.enqueueAction(action);

    },
    submitButton : function(component, event, helper) {

        var workTypeObj = component.get("v.selectedLookUpRecordWorkType");
        var productObj  = component.get("v.selectedLookUpRecordProduct");
        var quantityUnit= component.get("v.quantityUnit");
        var quantityRequired = component.get("v.quantityRequired");

        var navService = component.find("navService");
        //component.set("v.HideSpinner", true);

        var action = component.get('c.newProductRequirement');

        action.setParams({
            "workTypeObj" : workTypeObj,
            "productObj" : productObj,
            "quantityUnit" : quantityUnit,
            "quantityRequired" : quantityRequired
        });

        console.log(workTypeObj)
        console.log(productObj)
        console.log(quantityUnit)
        console.log(quantityRequired)

        action.setCallback(this, function(actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                console.log(actionResult.getReturnValue())
                //check admin case and generate url
                var idValue = actionResult.getReturnValue()

                var pageReference = {
                    type: 'standard__component',
                    attributes: {
                        "componentName": "c__ItemProductComponent"
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