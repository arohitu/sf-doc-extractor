---
title: "ExpressionSetDefinition | Metadata API Developer Guide | Salesforce Developers"
url: "https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_expressionsetdefinition.htm"
fetched_at: "2026-03-20T11:33:26.456Z"
---

# ExpressionSetDefinition

Represents an expression set definition.

Note

## Parent Type

This type extends the [Metadata](https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/metadata.htm) metadata type and inherits its fullName field.

## File Suffix and Directory Location

ExpressionSetDefinition components have the suffix .expressionSetDefinition and are stored in the expressionSetDefinition folder.

## Version

ExpressionSetDefinition components are available in API version 55.0 and later.

## Fields

> **Supported Editions:**<br><br><br>description<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The description of an expression set definition.
> 
> <br>executionScale<br>
> 
> Field Type
> 
> ExpsSetExecutionScale (enumeration of type string)
> 
> Description
> 
> Specifies the scale of the inputs that an expression set processes. The scale determines where the expression set is executed.
> 
> Valid values are:
> 
> *   High
> *   Low
> 
> Available in API version 61.0 and later.
> 
> <br>interfaceSourceType<br>
> 
> Field Type
> 
> ExpsSetInterfaceSourceType (enumeration of type string)
> 
> Description
> 
> The interface source type designed by the consuming cloud that's making a customized expression set builder available to its users.
> 
> Valid values are:
> 
> *   Constraint (Available in API version 62.0 and later).
> *   DiscoveryProcedure (Available in API version 61.0 and later).
> *   EventOrchestration (Available in API version 61.0 and later).
> *   ItServiceManagement (Available in API version 65.0 and later).
> *   PricingProcedure
> *   QualificationProcedure
> *   RatingDiscoveryProcedure (Available in API version 61.0 and later).
> *   Sample
> 
> Available in API version 59.0 and later.
> 
> <br>label<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The UI label of an expression set definition.
> 
> <br>processType<br>
> 
> Field Type
> 
> ExpsSetProcessType (enumeration of type string)
> 
> Description
> 
> The process type that uses the expression set rule.
> 
> Valid values are:
> 
> *   Bre
> *   GpaCalculation
> *   InsuranceClaimProcessing—Available in API version 65.0 and later.
> *   ItServiceManagement—Available in API version 65.0 and later.
> *   PlanCostCalculation
> *   RatingDiscovery
> *   StudentInformationSystem—Available in API version 65.0 and later.
> *   StudentSuccess
> 
> When Business Rules Engine is enabled for a Salesforce instance, the default value is 'Bre’. Other process types are available to you depending on your industry solution and permission sets.
> 
> <br>resourceInitializationType<br>
> 
> Field Type
> 
> ResourceInitializationType (enumeration of type string)
> 
> Description
> 
> Indicates whether the initial value of expression set variables and context tags is null or a default value.
> 
> Valid values are:
> 
> *   Default
> *   Off
> 
> Available in API version 64.0 and later.
> 
> <br>template<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Defines whether an expression set is a template or not.
> 
> <br>usageSubType<br>
> 
> Field Type
> 
> ExpsSetUsageSubType (enumeration of type string)
> 
> Description
> 
> The subtype of the industry that's using the expression set definition. If no value is specified, the field defaults to null.
> 
> <br>versions<br>
> 
> Field Type
> 
> [ExpressionSetDefinitionVersion](#ExpSetDefVer)\[\]
> 
> Description
> 
> Represents an array of expression set version definitions in an expression set.
> 
> This array must contain at least one version.

## ExpressionSetDefinitionVersion​​

Represents a definition of an expression set version.

> **Supported Editions:**<br>decimalScale<br>
> 
> Field Type
> 
> integer
> 
> Description
> 
> Number of decimal places to be used in the results of calculation steps that involve context variables.
> 
> <br>description<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Describes the version of an expression set definition.
> 
> <br>endDate<br>
> 
> Field Type
> 
> dateTime
> 
> Description
> 
> The date until which the expression set definition is available for use.
> 
> <br>expressionSetDefinition<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The full name of an expression set definition.
> 
> <br>label<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The UI label of an expression set definition.
> 
> <br>rank<br>
> 
> Field Type
> 
> int
> 
> Description
> 
> The rank of the Expression Set Definition Version. When more than one enabled version matches an expression set call, and the start date time to end date time spans overlap, the version with the highest rank is chosen. Available in API version 62.0 and later.
> 
> <br>shouldShowExplExternally<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the decision explanation is exposed to external users (true) or not (false). The default value is false. Available in API version 56.0 and later.
> 
> <br>startDate<br>
> 
> Field Type
> 
> dateTime
> 
> Description
> 
> Required.
> 
> The date from when the expression set definition is available for use.
> 
> <br>status<br>
> 
> Field Type
> 
> ExpsSetStatus (enumeration of type string)
> 
> Description
> 
> Required.
> 
> The status of an expression set definition.
> 
> Possible values are:
> 
> *   Active
> *   Draft
> *   Inactive
> *   InvalidDraft
> *   Obsolete
> 
> <br>steps<br>
> 
> Field Type
> 
> [ExpressionSetStep](#ExpSetStep)\[\]
> 
> Description
> 
> Represents an array of steps created in an expression set version.
> 
> <br>uiTier<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the API call originated from the design time builder or a package.
> 
> Note
> 
> <br>variables<br>
> 
> Field Type
> 
> [ExpressionSet​​Variable](#ExpSetVar)\[\]
> 
> Description
> 
> Represents an array of variables in an expression set version.
> 
> <br>versionNumber<br>
> 
> Field Type
> 
> int
> 
> Description
> 
> Required.
> 
> The version number of an expression set definition.

## ExpressionSet​​Step

Represents a step in an expression set version.

> **Supported Editions:**<br>actionType<br>
> 
> Field Type
> 
> BusinessKnowledgeModel (enumeration of type string)
> 
> Description
> 
> Specifies the type of action this step executes.
> 
> Valid values are:
> 
> *   AiAcceleratorSubscriberChurnPrediction
> *   ApexAction
> *   ApexListAction (Available in API version 64.0 and later.)
> *   AssetDiscovery
> *   AssignBadgeToMember
> *   AssignParameterValues
> *   AssignmentElement
> *   AssignmentRuleCustomUser (Available in API version 65.0 and later.)
> *   AssignmentRuleCustomQueue (Available in API version 65.0 and later.)
> *   AteprlRecordCreator (Available in API version 65.0 and later.)
> *   BaseRate
> *   BindingObjectRateAdjustmentResolution (Available in API version 64.0 and later.)
> *   BindingObjectRateCardEntryResolution (Available in API version 64.0 and later.)
> *   BreAggregator
> *   BreAggregatorAssignment
> *   BreakdownLineMapping (Available in API version 64.0 and later.)
> *   CalculateQuantity (Available in API version 64.0 and later.)
> *   ChangeMemberTier
> *   CheckMemberBadgeAssignment
> *   CommercePricing (Available in API version 62.0 and later.)
> *   CommitmentAdjustment (Available in API version 65.0 and later.)
> *   ComplianceCheck
> *   ComplianceControlLog (Available in API version 62.0 and later.)
> *   Constraint (Available in API version 64.0 and later.)
> *   CreditPoints
> *   Crud
> *   DebitPoints
> *   DerivedPricing
> *   DiscountDistributionService
> *   DiscoverySettings (Available in API version 64.0 and later.)
> *   DynamicRulesExecutor (Available in API version 65.0 and later.)
> *   EvaluateCategoryDisqualification (Available in API version 62.0 and later.)
> *   EvaluateCategoryQualification (Available in API version 62.0 and later.)
> *   FormulaBasedRating (Available in API version 62.0 and later.)
> *   FormulaBasedPricing
> *   GetCustomerPromotionAttrValue (Available in API version 64.0 and later.)
> *   GetMemberAttributesValues
> *   GetMemberPointBalance
> *   GetMemberPromotions
> *   GetMemberTier
> *   GetOutputsFromDecisionMatrix
> *   GetOutputsFromDecisionTable
> *   GroupingAndAggregateRating (Available in API version 62.0 and later.)
> *   IncreaseUsageForCumulativePromotion
> *   IntegrationOrchestration
> *   IssueExtendedReward (Available in API version 64.0 and later.)
> *   IssueVoucher
> *   ManualRatingDiscount (Available in API version 62.0 and later.)
> *   MapProduct
> *   MinimumPrice (Available in API version 62.0 and later.)
> *   MultiRecipientProductQualification (Available in API version 64.0 and later.)
> *   NegotiatedBaseRate (Available in API version 64.0 and later.)
> *   NegotiatedRateCardEntryResolution (Available in API version 64.0 and later.)
> *   NegotiatedTierAdjustment (Available in API version 64.0 and later.)
> *   NegotiatedVolumeAdjustment (Available in API version 64.0 and later.)
> *   PriceGuidance (Available in API version 64.0 and later.)
> *   PriceRevision (Available in API version 65.0 and later.)
> *   PricingPropagation (Available in API version 65.0 and later.)
> *   PricingSettings
> *   PromotionsDiscount
> *   PromotionExecution (Available in API version 65.0 and later.)
> *   RateAdjustmentByAttributeResolution (Available in API version 62.0 and later.)
> *   RateAdjustmentByTierResolution (Available in API version 62.0 and later.)
> *   RateAdjustmentMatrix (Available in API version 62.0 and later.)
> *   RateAssignment (Available in API version 62.0 and later.)
> *   RateCardEntryResolution (Available in API version 62.0 and later.)
> *   RateCardResolution (Available in API version 62.0 and later.)
> *   RatingAttributeDiscount
> *   RatingBreakdownLineMapping (Available in API version 65.0 and later.)
> *   RatingRoundingValues (Available in API version 62.0 and later.)
> *   RatingSetting
> *   RatingTierDiscount
> *   RatingVolumeDiscount
> *   RecordAction
> *   RoundingValues
> *   RuleFetch
> *   RunFlow
> *   RunProgramProcess
> *   SampleCustomElementWithExpressionAndListFilter
> *   StopPricing
> *   StopRating (Available in API version 62.0 and later.)
> *   TermGpaCalculation (Available in API version 64.0 and later.)
> *   TermGpaReporting (Available in API version 64.0 and later.)
> *   TestCustomElement
> *   UpdateCurrentValueForMemberAttribute
> *   UpdateCustomerPromotionAttrValue (Available in API version 64.0 and later.)
> *   UpdatePointBalance
> *   UpdateUsageForCumulativePromotion
> *   UpsertRecord (Available in API version 64.0 and later.)
> *   VolumeTierDiscount
> 
> <br>advancedCondition<br>
> 
> Field Type
> 
> [ExpressionSetAdvancedCondition](#ExpSetAdvCon)
> 
> Description
> 
> Represents an advanced condition step.
> 
> <br>aggregation<br>
> 
> Field Type
> 
> [ExpressionSetAggregation](#ExpSetAggregate)
> 
> Description
> 
> Represents an aggregation step.
> 
> <br>assignment<br>
> 
> Field Type
> 
> [ExpressionSetAssignment](#ExpSetAssignment)
> 
> Description
> 
> Represents an assignment step.
> 
> <br>conditionExpression<br>
> 
> Field Type
> 
> [ExpressionSetConditionExpression](#ExpSetConExp)
> 
> Description
> 
> Represents a condition step.
> 
> <br>customElement<br>
> 
> Field Type
> 
> [ExpressionSetCustomElement](#ExpSetCustomElement)
> 
> Description
> 
> Represents a custom element step that contains the input and output mappings. Available in API version 56.0 and later.
> 
> <br>decisionTable<br>
> 
> Field Type
> 
> [ExpressionSetDecisionTable](#ExpSetDecisionTbl)
> 
> Description
> 
> Represents a decision matrix or decision table step.
> 
> <br>description<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Describes an expression set definition version step.
> 
> <br>failedExplainerTemplate<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The explainability message template that’s used when the result type of a condition step in an expression set is Failed.
> 
> <br>failedMessageTokenMappings<br>
> 
> Field Type
> 
> ExplainabilityMessageTemplateTokenMapping (enumeration of type string)
> 
> Description
> 
> List of the token resource mappings of the failed explainability message template. Valid values are:
> 
> *   expressionSetMessageToken
> *   resourceReference
> 
> Available in API version 59.0 and later.
> 
> <br>label<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The UI label of an expression set definition version step.
> 
> <br>name<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The full name of an expression set definition version step.
> 
> <br>noResultExplainerTemplate<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The explainability message template that’s used when the result type of a condition step in an expression set is No Result. Available in API version 59.0 and later.
> 
> <br>noResultMessageTokenMappings<br>
> 
> Field Type
> 
> ExplainabilityMessageTemplateTokenMapping (enumeration of type string)
> 
> Description
> 
> List of the token resource mappings of the no result explainability message template. Valid values are:
> 
> *   expressionSetMessageToken
> *   resourceReference
> 
> Available in API version 59.0 and later.
> 
> <br>parentStep<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The name of the parent step in an expression set definition version that’s associated with a step.
> 
> <br>passedExplainerTemplate<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The explainability message template that’s used when the result type of a condition step in an expression set is Passed.
> 
> <br>passedMessageTokenMappings<br>
> 
> Field Type
> 
> ExplainabilityMessageTemplateTokenMapping (enumeration of type string)
> 
> Description
> 
> List of the token resource mappings of the passed explainability message template. Valid values are:
> 
> *   expressionSetMessageToken
> *   resourceReference
> 
> Available in API version 59.0 and later.
> 
> <br>resultIncluded<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the step output must be included in the expression result (true) or not (false).
> 
> <br>sequenceNumber<br>
> 
> Field Type
> 
> int
> 
> Description
> 
> Required.
> 
> The sequence number of a step in an expression set definition version.
> 
> <br>shouldExposExecPathMsgOnly<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the message in the explainability message template is exposed for only the branch path that was run.
> 
> <br>shouldExposeConditionDetails<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the details of the condition are shown in the decision explanation.
> 
> <br>shouldShowExplExternally<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the decision explanations are shown to external users.
> 
> <br>stepType<br>
> 
> Field Type
> 
> ExpsSetStepType (enumeration of type string)
> 
> Description
> 
> Required.
> 
> Specifies the type of step in an expression set definition version.
> 
> Valid values are:
> 
> *   AdvancedCondition
> *   Branch
> *   BusinessKnowledgeModel
> *   Condition
> *   DefaultPath
> *   SubExpression
> 
> <br>subExpression<br>
> 
> Field Type
> 
> [ExpressionSetSubExpression](#ExpSetSubExp)
> 
> Description
> 
> Represents a sub expression step.

## ExpressionSetAdvancedCondition

Represents an advanced condition step.

| Field Name | Description |
| --- | --- |
| conditionLogic | **Field Type:** string<br>**Description:** Required.<br>The condition that’s defined for an advanced condition.<br> |
| criteria | **Field Type:** [ExpressionSetConditionCriteria](#ExpSetConCriteria) \[\]<br>**Description:** Represents an array of criteria defined in the advanced condition.<br> |
| errorMessage | **Field Type:** string<br>**Description:** An error message for a failed advanced condition.<br> |
| resultParameter | **Field Type:** string<br>**Description:** An expression set definition version variable associated with the result of a step.<br> |
| successMessage | **Field Type:** string<br>**Description:** A success message for a successful advanced condition.<br> |

## ExpressionSetConditionCriteria

Represents a criterion defined in an advanced condition.

| Field Name | Description |
| --- | --- |
| operator | **Field Type:** ExpsSetConditionOperator (enumeration of type string)<br>**Description:** Required.<br>Specifies the operator for evaluating an expression.<br>Valid values are: • Contains<br>• DoesNotContain<br>• Equals<br>• GreaterThan<br>• GreaterThanOrEquals<br>• IsNull<br>• IsNotNull<br>• LessThan<br>• LessThanOrEquals<br>• NoEquals<br><br> |
| sequenceNumber | **Field Type:** int<br>**Description:** Required.<br>The position of the condition in a step that contains multiple conditions.<br> |
| sourceFieldName | **Field Type:** string<br>**Description:** Required.<br>The expression set definition version variable associated with the result of a condition criterion.<br><br> |
| value | **Field Type:** string<br>**Description:** Specifies the condition of a criterion.<br> |
| valueType | **Field Type:** ExpsSetValueType (enumeration of type string)<br>**Description:** Specifies the type of value.<br>Valid values are: • Formula<br>• Literal<br>• Lookup<br>• Parameter<br>• Picklist<br><br> |

## ExpressionSetAggregation

Represents an aggregation step.

| Field Name | Description |
| --- | --- |
| aggregatedParameter | **Field Type:** string<br>**Description:** Required.<br>The expression set definition version variable associated with the result of a condition criterion.<br><br> |
| aggregateFunction | **Field Type:** ExpsSetAggregationFunction (enumeration of type string)<br>**Description:** Required.<br>Specifies the aggregation function used in a step.<br>Valid values are: • Avg<br>• Max<br>• Min<br>• Sum<br><br> |
| expression | **Field Type:** string<br>**Description:** Required.<br>Specifies the expression of an aggregation.<br> |

## ExpressionSetAssignment

Represents an assignment step.

| Field Name | Description |
| --- | --- |
| aggregatedParameter | **Field Type:** string<br>**Description:** Required.<br>The expression set definition version variable associated with a step detail.<br> |
| expression | **Field Type:** string<br>**Description:** Required.<br>The expression that’s defined for a step.<br> |

## ExpressionSetConditionExpression

Represents a condition in a condition step.

| Field Name | Description |
| --- | --- |
| errorMessage | **Field Type:** string<br>**Description:** An error message for a failed condition.<br> |
| expression | **Field Type:** string<br>**Description:** Required.<br>The expression that’s defined for a step.<br> |
| resultParameter | **Field Type:** string<br>**Description:** The expression set definition version variable associated with the result of a step.<br> |
| successMessage | **Field Type:** string<br>**Description:** A success message for a successful condition.<br> |

## ExpressionSetCustomElement

Represents a custom element in an expression set. Available in API version 56.0 and later.

| Field Name | Description |
| --- | --- |
| parameters | **Field Type:** [ExpressionSetElementParameter](#ExpressionSetElementParameter)\[\]<br>**Description:** Represents the list of parameters in the custom element.<br> |

## ExpressionSetElementParameter

Represents a parameter within a custom element of an expression set. Available in API version 56.0 and later.

| Field Name | Description |
| --- | --- |
| input | **Field Type:** boolean<br>**Description:** Required.<br>Indicates whether the custom element parameter is input (true) or not (false).<br>The default value is true.<br> |
| name | **Field Type:** string<br>**Description:** Required.<br>The name of the custom element parameter.<br> |
| output | **Field Type:** boolean<br>**Description:** Required.<br>Indicates whether the custom element parameter is output (true) or not (false).<br>The default value is true.<br> |
| type | **Field Type:** ExpsSetValueType (enumeration of type string)<br>**Description:** The type of custom element parameter.Values are:<br>• Formula<br>• Literal<br>• Lookup<br>• Parameter<br>• PickList<br><br>The default value is Parameter.<br> |
| value | **Field Type:** string<br>**Description:** Required.<br>The name of the expression set variable.<br> |

## ExpressionSetDecisionTable

Represents a decision table or decision matrix in a step.

> **Supported Editions:**<br>decisionTableName<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The decision matrix or decision table name used in a step.
> 
> <br>mappings<br>
> 
> Field Type
> 
> [ExpressionSetElementParameter\[\]](#ExpressionSetElementParameter)
> 
> Description
> 
> The mapping information between various parameters in an ExpressionSetDecisionTable.
> 
> Available in API version 59.0 and later.
> 
> <br>type<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The type in a step. It can be a decision table or decision matrix.

## ExpressionSetSubExpression

Represents a sub expression in a step.

> **Supported Editions:**<br>expressionSet<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The sub expression name used in a step.
> 
> <br>mappings<br>
> 
> Field Type
> 
> [ExpressionSetElementParameter\[\]](#ExpressionSetElementParameter)
> 
> Description
> 
> The mapping information between various parameters in an ExpressionSetDecisionTable.
> 
> Available in API version 61.0 and later.

## ExpressionSet​​Variable

Represents a definition of an expression set variable.

> **Supported Editions:**<br>collection<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether a variable stores a collection of values (true) or not (false).
> 
> <br>dataType<br>
> 
> Field Type
> 
> ExpsSetDataType (enumeration of type string)
> 
> Description
> 
> Required.
> 
> The data type of an expression set variable.
> 
> Valid values are:
> 
> *   ActionOutput
> *   Boolean
> *   Currency
> *   Date
> *   DateTime
> *   DecisionMatrix
> *   DecisionTable
> *   Numeric
> *   Percent
> *   Sobject
> *   SubExpression
> *   Text
> 
> <br>decimalPlaces<br>
> 
> Field Type
> 
> int
> 
> Description
> 
> The decimal digits in the currency, number, or percent data type for an expression set variable.
> 
> <br>description<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The description of the variable used in an expression set.
> 
> <br>fields<br>
> 
> Field Type
> 
> [ExpressionSetVariableField](#ExpSetVarFld) \[\]
> 
> Description
> 
> Represents an array of fields in an object that is used as a variable in an expression set.
> 
> <br>input<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether an expression set variable is used as an input (true) in an expression or not (false).
> 
> <br>lookupName<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The API name of a decision matrix, a decision table, or a sub expression.
> 
> <br>lookupType<br>
> 
> Field Type
> 
> ExpsSetVariableLookupType (enumeration of type string)
> 
> Description
> 
> The type of the lookup used in an expression set definition.
> 
> Valid values are:
> 
> *   DecisionMatrix
> *   DecisionTable
> *   SubExpression
> 
> <br>name<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> The full name of the variable used in an expression set definition.
> 
> <br>objectName<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The name of the sObject.
> 
> <br>output<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether an expression set variable is used as an output in an expression(true) or not (false).
> 
> <br>resultStep<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The step that produces the expression set variable.
> 
> <br>type<br>
> 
> Field Type
> 
> ExpsSetVariableType (enumeration of type string)
> 
> Description
> 
> Required.
> 
> The type of variable in an expression set definition.
> 
> Valid values are:
> 
> *   Constant
> *   ContextDynamicAttributeTag (Available in API version 62.0 and later.)
> *   ExecutableContextDefinitionTag (Available in API version 62.0 and later.)
> *   Formula
> *   Variable
> 
> <br>value<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Represents a constant value or a formula.
> 
> Note

## ExpressionSetVariableField

Represents a definition of a field in an object that is used as a variable in an expression set.

| Field Name | Description |
| --- | --- |
| dataType | **Field Type:** ExpsSetDataType (enumeration of type string)<br>**Description:** Required.<br>Specifies the type of data stored in an expression set variable.<br>Valid values are: • ActionOutput<br>• Boolean<br>• Currency<br>• Date<br>• DateTime<br>• DecisionMatrix<br>• DecisionTable<br>• Numeric<br>• Percent<br>• Sobject<br>• SubExpression<br>• Text<br><br> |
| decimalPlaces | **Field Type:** int<br>**Description:** The decimal digits in the currency, number, or percent data type for an expression set variable.<br> |
| fields | **Field Type:** [ExpressionSetVariableField](#ExpSetVarFld) \[\]<br>**Description:** Represents an array of fields in an object that is used as a variable in an expression set.<br> |
| lookupName | **Field Type:** string<br>**Description:** The API name of a decision matrix, a decision table, or a sub expression.<br> |
| lookupType | **Field Type:** ExpsSetVariableLookupType (enumeration of type string)<br>**Description:** Required.<br>The type of lookup used in an expression set definition.<br>Valid values are: • DecisionMatrix<br>• DecisionTable<br>• SubExpression<br><br> |
| name | **Field Type:** string<br>**Description:** Required.<br>The full name of the field used in an expression set variable.<br> |
| objectName | **Field Type:** string<br>**Description:** The name of the sObject.<br> |

## Declarative Metadata Sample Definition

The following is an example of an ExpressionSetDefinition component.

```
1<?xml version="1.0" encoding="UTF-8"?>
2<ExpressionSetDefinition xmlns="http://soap.sforce.com/2006/04/metadata">
3    <label>ExpSetWithAllSteps</label>
4    <processType>Bre</processType>
5    <template>false</template>
6    <description></description>
7    <interfaceSourceType>Sample</interfaceSourceType>
8    <executionScale>Low</executionScale>
9    <versions>
10        <fullName>ExpSetWithAllSteps_V1</fullName>
11        <expressionSetDefinition>ExpSetWithAllSteps</expressionSetDefinition>
12        <label>ExpSetWithAllSteps V1</label>
13        <shouldShowExplExternally>false</shouldShowExplExternally>
14        <startDate>2022-08-09T22:04:56.000Z</startDate>
15        <endDate>2023-08-09T22:04:56.000Z</endDate>
16        <status>Draft</status>
17        <uiTier>false</uiTier>
18        <rank>1</rank>
19        <description>ExpSetWithAllSteps_V1</description>
20        <steps>
21            <description>Aggregate</description>
22            <actionType>BreAggregator</actionType>
23            <aggregation>
24                <aggergatedParameter>result</aggergatedParameter>
25                <aggregateFunction>Avg</aggregateFunction>
26                <expression>AVG ( result )</expression>
27            </aggregation>
28            <label>Aggregate</label>
29            <name>Aggregate</name>
30            <resultIncluded>true</resultIncluded>
31            <sequenceNumber>5</sequenceNumber>
32            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
33            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
34            <shouldShowExplExternally>false</shouldShowExplExternally>
35            <stepType>BusinessKnowledgeModel</stepType>
36        </steps>
37        <steps>
38            <label>Branch</label>
39            <name>Branch</name>
40            <resultIncluded>false</resultIncluded>
41            <sequenceNumber>4</sequenceNumber>
42            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
43            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
44            <shouldShowExplExternally>false</shouldShowExplExternally>
45            <stepType>Branch</stepType>
46        </steps>
47        <steps>
48            <actionType>AssignParameterValues</actionType>
49            <assignment>
50                <assignedParameter>b</assignedParameter>
51                <expression>SUM ( a , 10 )</expression>
52            </assignment>
53            <label>Calculation</label>
54            <name>Calculation</name>
55            <resultIncluded>true</resultIncluded>
56            <sequenceNumber>1</sequenceNumber>
57            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
58            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
59            <shouldShowExplExternally>false</shouldShowExplExternally>
60            <stepType>BusinessKnowledgeModel</stepType>
61        </steps>
62        <steps>
63            <actionType>AssignParameterValues</actionType>
64            <assignment>
65                <assignedParameter>result</assignedParameter>
66                <expression>b * 100</expression>
67            </assignment>
68            <label>Calculation</label>
69            <name>Calculation10</name>
70            <parentStep>DefaultLane</parentStep>
71            <resultIncluded>false</resultIncluded>
72            <sequenceNumber>1</sequenceNumber>
73            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
74            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
75            <shouldShowExplExternally>false</shouldShowExplExternally>
76            <stepType>BusinessKnowledgeModel</stepType>
77        </steps>
78        <steps>
79            <actionType>AssignParameterValues</actionType>
80            <assignment>
81                <assignedParameter>result</assignedParameter>
82                <expression>b * 1</expression>
83            </assignment>
84            <label>Calculation</label>
85            <name>Calculation3</name>
86            <parentStep>Condition</parentStep>
87            <resultIncluded>false</resultIncluded>
88            <sequenceNumber>1</sequenceNumber>
89            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
90            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
91            <shouldShowExplExternally>false</shouldShowExplExternally>
92            <stepType>BusinessKnowledgeModel</stepType>
93        </steps>
94        <steps>
95            <actionType>AssignParameterValues</actionType>
96            <assignment>
97                <assignedParameter>result</assignedParameter>
98                <expression>SUM ( b , 10 )</expression>
99            </assignment>
100            <label>Calculation</label>
101            <name>Calculation5</name>
102            <parentStep>Condition4</parentStep>
103            <resultIncluded>false</resultIncluded>
104            <sequenceNumber>1</sequenceNumber>
105            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
106            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
107            <shouldShowExplExternally>false</shouldShowExplExternally>
108            <stepType>BusinessKnowledgeModel</stepType>
109        </steps>
110        <steps>
111            <actionType>AssignParameterValues</actionType>
112            <assignment>
113                <assignedParameter>result</assignedParameter>
114                <expression>b * 10</expression>
115            </assignment>
116            <label>Calculation</label>
117            <name>Calculation8</name>
118            <parentStep>Condition7</parentStep>
119            <resultIncluded>false</resultIncluded>
120            <sequenceNumber>1</sequenceNumber>
121            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
122            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
123            <shouldShowExplExternally>false</shouldShowExplExternally>
124            <stepType>BusinessKnowledgeModel</stepType>
125        </steps>
126        <steps>
127            <conditionExpression>
128                <successMessage>success</successMessage>
129                <errorMessage>error</errorMessage>
130                <expression>IS10 == b</expression>
131                <resultParameter>condition_output__1</resultParameter>
132            </conditionExpression>
133            <label>Condition</label>
134            <name>Condition</name>
135            <resultIncluded>false</resultIncluded>
136            <sequenceNumber>2</sequenceNumber>
137            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
138            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
139            <shouldShowExplExternally>false</shouldShowExplExternally>
140            <stepType>Condition</stepType>
141        </steps>
142        <steps>
143            <advancedCondition>
144                <successMessage>success</successMessage>
145                <errorMessage>error</errorMessage>
146                <conditionLogic>1</conditionLogic>
147                <criteria>
148                    <operator>Equals</operator>
149                    <sequenceNumber>1</sequenceNumber>
150                    <sourceFieldName>condition_output__1</sourceFieldName>
151                    <value>true</value>
152                    <valueType>Literal</valueType>
153                </criteria>
154                <resultParameter>condition_output__3</resultParameter>
155            </advancedCondition>
156            <label>Condition</label>
157            <name>Condition4</name>
158            <resultIncluded>false</resultIncluded>
159            <sequenceNumber>3</sequenceNumber>
160            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
161            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
162            <shouldShowExplExternally>false</shouldShowExplExternally>
163            <stepType>AdvancedCondition</stepType>
164        </steps>
165        <steps>
166            <conditionExpression>
167                <expression>IS10 == b</expression>
168                <resultParameter>condition_output__2</resultParameter>
169            </conditionExpression>
170            <label>Condition</label>
171            <name>Condition7</name>
172            <parentStep>Branch</parentStep>
173            <resultIncluded>false</resultIncluded>
174            <sequenceNumber>1</sequenceNumber>
175            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
176            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
177            <shouldShowExplExternally>false</shouldShowExplExternally>
178            <stepType>Condition</stepType>
179        </steps>
180        <steps>
181            <label>Default Lane</label>
182            <name>DefaultLane</name>
183            <parentStep>Branch</parentStep>
184            <resultIncluded>false</resultIncluded>
185            <sequenceNumber>2</sequenceNumber>
186            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
187            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
188            <shouldShowExplExternally>false</shouldShowExplExternally>
189            <stepType>DefaultPath</stepType>
190        </steps>
191        <steps>
192            <actionType>AssignParameterValues</actionType>
193            <assignment>
194                <assignedParameter>a</assignedParameter>
195                <expression>3</expression>
196            </assignment>
197            <failedExplainerTemplate>CalculationFailure</failedExplainerTemplate>
198            <failedMessageTokenMappings>
199                <expressionSetMessageToken>y2</expressionSetMessageToken>
200                <resourceReference>a</resourceReference>
201            </failedMessageTokenMappings>
202            <label>CalculationStepWithTokensAndMappings</label>
203            <name>CalculationStepWithTokensAndMappings</name>
204            <passedExplainerTemplate>CalculationSuccess</passedExplainerTemplate>
205            <passedMessageTokenMappings>
206                <expressionSetMessageToken>y1</expressionSetMessageToken>
207                <resourceReference>a</resourceReference>
208            </passedMessageTokenMappings>
209            <resultIncluded>false</resultIncluded>
210            <sequenceNumber>1</sequenceNumber>
211            <shouldExposExecPathMsgOnly>true</shouldExposExecPathMsgOnly>
212            <shouldExposeConditionDetails>false</shouldExposeConditionDetails>
213            <shouldShowExplExternally>true</shouldShowExplExternally>
214            <stepType>BusinessKnowledgeModel</stepType>
215        </steps>
216        <variables>
217            <collection>false</collection>
218            <dataType>Boolean</dataType>
219            <description>condition_output__3</description>
220            <input>false</input>
221            <name>condition_output__3</name>
222            <output>false</output>
223            <resultStep>Condition4</resultStep>
224            <type>Variable</type>
225            <value>False</value>
226        </variables>
227        <variables>
228            <collection>false</collection>
229            <dataType>Numeric</dataType>
230            <decimalPlaces>2</decimalPlaces>
231            <description>a</description>
232            <input>true</input>
233            <name>a</name>
234            <output>false</output>
235            <type>Variable</type>
236            <value>10</value>
237        </variables>
238        <variables>
239            <collection>false</collection>
240            <dataType>Boolean</dataType>
241            <description>condition_output__1</description>
242            <input>false</input>
243            <name>condition_output__1</name>
244            <output>false</output>
245            <resultStep>Condition</resultStep>
246            <type>Variable</type>
247            <value>False</value>
248        </variables>
249        <variables>
250            <collection>false</collection>
251            <dataType>Boolean</dataType>
252            <description>condition_output__2</description>
253            <input>false</input>
254            <name>condition_output__2</name>
255            <output>false</output>
256            <resultStep>Condition7</resultStep>
257            <type>Variable</type>
258            <value>False</value>
259        </variables>
260        <variables>
261            <collection>false</collection>
262            <dataType>Numeric</dataType>
263            <decimalPlaces>2</decimalPlaces>
264            <description>IS10</description>
265            <input>false</input>
266            <name>IS10</name>
267            <output>false</output>
268            <type>Constant</type>
269            <value>10</value>
270        </variables>
271        <variables>
272            <collection>false</collection>
273            <dataType>Numeric</dataType>
274            <decimalPlaces>2</decimalPlaces>
275            <description>b</description>
276            <input>false</input>
277            <name>b</name>
278            <output>true</output>
279            <type>Variable</type>
280        </variables>
281        <variables>
282            <collection>false</collection>
283            <dataType>Numeric</dataType>
284            <decimalPlaces>2</decimalPlaces>
285            <description>result</description>
286            <input>false</input>
287            <name>result</name>
288            <output>true</output>
289            <type>Variable</type>
290        </variables>
291        <versionNumber>1</versionNumber>
292    </versions>
293</ExpressionSetDefinition>
```

The following is an example package.xml that references the previous definition.

```
1<?xml version="1.0" encoding="UTF-8"?>
2<Package
3	xmlns="http://soap.sforce.com/2006/04/metadata">
4	<types>
5		<members>*</members>
6		<name>ExpressionSetDefinition</name>
7	</types>
8	<version>66.0</version>
9</Package>
```

## Wildcard Support in the Manifest File

This metadata type supports the wildcard character \* (asterisk) in the package.xml manifest file. For information about using the manifest file, see [Deploying and Retrieving Metadata with the Zip File](https://developer.salesforce.com/docs/atlas.en-us.260.0.api_meta.meta/api_meta/file_based.htm).