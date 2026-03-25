---
title: "Decision Table Outcome | Industries Common Resources Developer Guide | Salesforce Developers"
url: "https://developer.salesforce.com/docs/atlas.en-us.industries_reference.meta/industries_reference/connect_responses_decision_table_outcome.htm"
fetched_at: "2026-03-25T16:09:46.885Z"
---

# Decision Table Outcome

Output representation of the decision table execution.

JSON example

```
1{
2  "errorCode" : null,
3  "errorMessage" : null,
4  "outcomeList" : [ {
5    "values" : {
6      "amount__c" : "399",
7      "Name" : "MH 005"
8    }
9  }, {
10    "values" : {
11      "amount__c" : "499",
12      "Name" : "MH 006"
13    }
14  }, {
15    "values" : {
16      "amount__c" : "379",
17      "Name" : "MH 007"
18    }
19  }, {
20    "values" : {
21      "amount__c" : "1498",
22      "Name" : "MH 008"
23    }
24  }, {
25    "values" : {
26      "amount__c" : "98",
27      "Name" : "MH 009"
28    }
29  }, {
30    "values" : {
31      "amount__c" : "251",
32      "Name" : "MH 010"
33    }
34  } ],
35  "outcomeType" : "Multiple Matches",
36  "successStatus" : true
37}
```

| Property Name | Type | Description | Filter Group and Version | Available Version |
| --- | --- | --- | --- | --- |
| errorCode | Integer | The error code if transaction fails for any reason. | Small, 55.0 | 55.0 |
| errorMessage | String | The error message if transaction fails for any reason. | Small, 55.0 | 55.0 |
| outcomeList | [Decision Table Outcome Item](https://developer.salesforce.com/docs/atlas.en-us.industries_reference.meta/industries_reference/connect_responses_decision_table_outcome_item.htm)\[\] | Outcome list that stores two or more outcomes provided by the decision table. | Small, 55.0 | 55.0 |
| outcomeType | String | The outcome type after the request is successful. | Small, 55.0 | 55.0 |
| successStatus | Boolean | Indicates the status of the decision table execution. | Small, 55.0 | 55.0 |