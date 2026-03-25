# Decision Table Condition Input

Input representation of the decision table condition.

Note

Properties

| Name | Type | Description | Required or Optional | Available Version |
| --- | --- | --- | --- | --- |
| fieldName | String | The field name that is selected as an input for the decision table. | Required | 55.0 |
| value | String | The value of the data type that is selected as an input.<br>Specify the value of a decision table’s group-by field in double quotes, which is also applicable for numeric or integer type fields. For example, specify "value": "1000" for a Price numeric type field, and "value" : "102.0" for a Number integer type field.<br> | Required | 55.0 |
| operator | String | The operator used for the input field. Valid values are: • DoesNotExistIn—Use to check if the input value doesn’t exist in a multi-select picklist.<br>• Equals—Use to check if the input value equals to the configured value in the rule.<br>• ExistsIn—Use to check if the input value exists in a multi-select picklist.<br>• GreaterOrEqual—Use to check if the input value is greater than or equal to the configured value in the rule.<br>• GreaterThan—Use to check if the input value is greater than the configured value in the rule.<br>• LessOrEqual—Use to check if the input value is less than or equal to the configured value in the rule.<br>• LessThan—Use to check if the input value is less than the configured value in the rule.<br>• Matches—Use to check if the input value is a substring of the value in the rule.<br>• NotEquals—Use to check if the input value doesn’t equal to the configured value in the rule.<br>
Note

<br> | Optional | 55.0 |
| sourceObject | String | The name of the source object for the input field. If the dataset link is configured with a single source object, the source object field isn’t mandatory. | Optional

Note

<br> | 55.0 |