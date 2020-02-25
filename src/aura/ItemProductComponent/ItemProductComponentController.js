/**
 * Created by aliaksei on 24.2.20.
 */

({
    doInit: function (component, event, helper) {

        var pageReference = component.get('v.pageReference');
        component.set('v.idValueWorkType', pageReference.state.c__idValue);
        component.set('v.nameValueWorkType', pageReference.state.c__nameValue);

        var action = component.get('c.newNewItemProductInit');

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
        helper.submitButton(component, event, helper, false)
    },
    toProductItems : function(component, event, helper) {
        helper.submitButton(component, event, helper, true)
    }
})