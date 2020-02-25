/**
 * Created by aliaksei on 24.2.20.
 */

public class NewSkillRequirement {

        @AuraEnabled
        public static SkillRequirement newSkillRequirement(
                WorkType workTypeObj,
                Skill skillObj,
                Integer skillLevel
        ){


            SkillRequirement skillRequirement = new SkillRequirement(
                    SkillLevel = skillLevel,
                    SkillId = skillObj.id,
                    RelatedRecordId = workTypeObj.id
            );

            insert skillRequirement;

            return skillRequirement;

        }

}