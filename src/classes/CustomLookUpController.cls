/**
 * Created by aliaksei on 24.2.20.
 */

public class CustomLookUpController {
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchKeyWord, String ObjectName) {

        String searchKey = searchKeyWord + '%';

        List < sObject > returnList = new List < sObject > ();

        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 10
        String sQuery;

        if(ObjectName == 'workOrder') {
            sQuery = 'select id, subject from ' + ObjectName + ' order by createdDate DESC limit 5';
        }
        if(ObjectName == 'skill') {
            sQuery = 'select id, Description from ' + ObjectName + ' order by createdDate DESC limit 5';
        }
        if (ObjectName != 'skill' && ObjectName != 'workOrder'){
            sQuery = 'select id, Name from ' + ObjectName + ' where Name LIKE: searchKey order by createdDate DESC limit 5';
        }
            List <sObject> listOfRecords = Database.query(sQuery);

            for (sObject obj : listOfRecords) {
                returnList.add(obj);
            }

        return returnList;
    }
}