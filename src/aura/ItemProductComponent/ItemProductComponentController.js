/**
 * Created by aliaksei on 24.2.20.
 */

({
    doInit: function (component, event, helper) {
// подумать нужны ли
        var pageReference = component.get('v.pageReference');
        component.set('v.idValueWorkType', pageReference.state.c__idValue);
        component.set('v.nameValueWorkType', pageReference.state.c__nameValue);

        var action = component.get('c.newNewItemProductInit');

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

        var locationObj = component.get("v.selectedLookUpRecordLocation");
        var productObj  = component.get("v.selectedLookUpRecordProduct");
        var quantityUnit= component.get("v.quantityUnit");
        var quantityOnHand = component.get("v.quantityOnHand");
        var serialNumber = component.get("v.serialNumber");

        var navService = component.find("navService");
        //component.set("v.HideSpinner", true);

        var action = component.get('c.newItemProduct');

        action.setParams({
            "locationId" : locationObj.Id,
            "productId" : productObj.Id,
            "quantityUnit" : quantityUnit,
            "quantityOnHand" : quantityOnHand,
            "serialNumber" : serialNumber
        });

        console.log(locationObj)
        console.log(productObj)
        console.log(quantityUnit)
        console.log(quantityOnHand)

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