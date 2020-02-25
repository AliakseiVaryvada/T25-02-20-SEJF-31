/**
 * Created by aliaksei on 25.2.20.
 */
({
    doInit: function (component, event, helper) {
        component.set("v.HideSpinner", true);
        var action = component.get('c.newLimitWorkOrderInit');

        action.setCallback(this, function (actionResult) {
            var state = actionResult.getState();
            if (state === 'SUCCESS') {
                var returnValue = actionResult.getReturnValue();
                console.log(returnValue);
                component.set('v.statusList', returnValue);
            }
            component.set("v.HideSpinner", false);
        });
        $A.enqueueAction(action);

    },
    submitButton : function(component, event, helper) {
        helper.submitButton(component, event, helper, false)
    },
    toProductItems : function(component, event, helper) {
        helper.submitButton(component, event, helper, true)
    }
})