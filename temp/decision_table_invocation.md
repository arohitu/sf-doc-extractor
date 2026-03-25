# Decision Table Invocation (POST)

Invoke a decision table by passing multiple input conditions within the same request.

Resource

```
1/connect/business-rules/decision-table/lookup/${decisionTableId}
```

Resource example

```
1https://yourInstance.salesforce.com/services/data/v66.0/connect
2/business-rules/decision-table/lookup/${0lDD2000000004NMAQ}
```

Available version

58.0

Requires Chatter

No

HTTP methods

POST

Request body for POST

JSON example

```
1{
2   "datasetLinkName" : "transactionMapping",
3   “conditions” :[
4      {
5        “conditionsList”: [
6          {
7              "fieldName": "Product__c",
8              "value": "Nike",
9              "operator": "Matches" //Operator is optional
10          },
11          {
12              "fieldName": "Price__c",
13              "value": 1000,
14              "operator": "GreaterThan"
15          }
16        ]
17      },
18      {
19        “conditionsList”: [
20          {
21              "fieldName": "Product__c",
22              "value": "Adidas",
23              "operator": "Matches" //Operator is optional
24          },
25          {
26              "fieldName": "Price__c",
27              "value": 1500,
28              "operator": "GreaterThan"
29          }
30        ]
```

Properties

| Name | Type | Description | Required or Optional | Available Version |
| --- | --- | --- | --- | --- |
| conditions | [Decision Table Condition List](https://developer.salesforce.com/docs/atlas.en-us.industries_reference.meta/industries_reference/connect_requests_decision_table_condition_list_input.htm) | The list of decision table conditions on which the decision table executes and provides outcomes. | Required | 58.0 |
| datasetLinkName | String | The API name of the dataset link provided as an input for the decision table execution. | Optional | 58.0 |

Response body for POST

[Decision Table Bulk Outcome](https://developer.salesforce.com/docs/atlas.en-us.industries_reference.meta/industries_reference/connect_responses_decision_table_bulk_outcome.htm)