/**
 * Created by aliaksei on 25.2.20.
 */
({
    submitButton : function(component, event, helper, exitValue) {

        var locationObj      = component.get("v.selectedLookUpRecordLocation");
        var productObj       = component.get("v.selectedLookUpRecordProduct");
        var quantityUnit     = component.get("v.quantityUnit");
        var quantityOnHand   = component.get("v.quantityOnHand");
        var serialNumber     = component.get("v.serialNumber");

        var navService = component.find("navService");

        if (locationObj.Id == undefined || productObj.Id == undefined || quantityOnHand == undefined) {
            var errorMsg = 'Please, select Location and Product !'
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:  'Warning',
                type:   'warning',
                message: errorMsg
            });
            toastEvent.fire();
        } else {
            component.set("v.HideSpinner", true);

            var action = component.get('c.newItemProduct');

            action.setParams({
                "locationId":       locationObj.Id,
                "productId":        productObj.Id,
                "quantityUnit":     quantityUnit,
                "quantityOnHand":   quantityOnHand,
                "serialNumber":     serialNumber
            });

            action.setCallback(this, function (actionResult) {
                var state = actionResult.getState();
                if (state === 'SUCCESS') {
                    if (exitValue == false) {
                        var pageReference = {
                            type: 'standard__component',
                            attributes: {
                                "componentName": "c__WorkTypeComponent"
                            }
                        };
                    } else {
                        window.location.assign("https://cheny-city-task4-dev-ed.lightning.force.com/" +
                                "lightning/o/ProductItem/list?filterName=Recent");
                    }
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
                        title:   'Error',
                        type:    'error',
                        message:  errorMsg
                    });
                    toastEvent.fire();
                }
                component.set("v.HideSpinner", false);
            });
            $A.enqueueAction(action);
        }
    }

})