/**
 * Created by aliaksei on 24.2.20.
 */

({
    doInit: function (component, event, helper) {
        var action = component.get('c.newProductRequirementInit');
            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {
                    var returnValue = actionResult.getReturnValue();
                    component.set('v.quantityUnitList', returnValue);
                }
            });
            $A.enqueueAction(action);

    },
    submitButton : function(component, event, helper) {

        var workTypeObj      = component.get("v.selectedLookUpRecordWorkType");
        var productObj       = component.get("v.selectedLookUpRecordProduct");
        var quantityUnit     = component.get("v.quantityUnit");
        var quantityRequired = component.get("v.quantityRequired");

        var navService = component.find("navService");

        if (workTypeObj.Id == undefined || productObj.Id == undefined) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Warning',
                type: 'warning',
                message: 'Please, fill empty fields! '
            });
            toastEvent.fire();
        } else {
            component.set("v.HideSpinner", true);

            var action = component.get('c.newProductRequirement');

            action.setParams({
                "workTypeObj"       : workTypeObj,
                "productObj"        : productObj,
                "quantityUnit"      : quantityUnit,
                "quantityRequired"  : quantityRequired
            });

            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {

                    var pageReference = {
                        type: 'standard__component',
                        attributes: {
                            "componentName": "c__ItemProductComponent"
                        }
                    };
                    component.set("v.pageReference", pageReference);
                    event.preventDefault();
                    navService.navigate(pageReference);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title:   'Success',
                        type:    'success',
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