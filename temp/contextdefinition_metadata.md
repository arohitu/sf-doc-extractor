---
title: "ContextDefinition | Metadata API Developer Guide | Salesforce Developers"
url: "https://developer.salesforce.com/docs/atlas.en-us.api_meta.meta/api_meta/meta_contextdefinition.htm"
fetched_at: "2026-03-20T14:21:08.765Z"
---

# ContextDefinition

Represents the details of a context definition that describe the relationship between the node structures within a context.

Important

## Parent Type

This type extends the [Metadata](https://developer.salesforce.com/docs/atlas.en-us.260.0.api_meta.meta/api_meta/metadata.htm) metadata type and inherits its fullName field.

## File Suffix and Directory Location

ContextDefinition components have the suffix .contextDefinition and are stored in the contextDefinitions folder.

## Version

ContextDefinition components are available in API version 59.0 and later.

## Special Access Rules

Enable the organization preference ContextDefinitionsEnabled to access the ContextDefinition metadata type.

## Fields

> **Supported Editions:**<br>canBeReferenceDefinition<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the context definition can be referred by other context definitions (true) or not (false). Available in API version 63.0 and later.
> 
> The default value is false.
> 
> <br>clonedFrom<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> The name of the context definition that's used to clone the current context definition.
> 
> <br>contextDefinitionReferences<br>
> 
> Field Type
> 
> [ContextDefinitionReference](#ContextDefinitionReference)\[\]
> 
> Description
> 
> References of the context definition.
> 
> <br>contextDefinitionVersions<br>
> 
> Field Type
> 
> [ContextDefinitionVersion\[\]](#ContextDefinitionVersion)
> 
> Description
> 
> Version of the context definition.
> 
> <br>contextTtl<br>
> 
> Field Type
> 
> int
> 
> Description
> 
> Duration to persist the data, which is loaded in the run-time context instances created by this context definition, in the cache.
> 
> The default value is 10 minutes.
> 
> <br>description<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Description of the context definition.
> 
> <br>hasSystemTags<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the context definition has system tags (true) or not (false). Available in API version 63.0 and later.
> 
> The default value is false.
> 
> <br>inheritedFrom<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Name of the parent context definition that's used to derive the current context definition.
> 
> <br>inheritedFromVersion<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Version number of the parent definition that's used to derive the current context definition.
> 
> <br>isProtected<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Auto-generated value that doesn’t impact the behavior of the metadata type.
> 
> <br>masterLabel<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> User-friendly name for the context definition, which is defined when the context definition is created.
> 
> <br>title<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> Name of the context definition.

## ContextDefinitionReference

Represents details about the context definition reference.

| Field Name | Description |
| --- | --- |
| inheritedFrom | **Field Type:** string<br>**Description:** ID of the parent context definition reference that's used to derive the current context definition reference.<br> |
| referenceContextDefinition | **Field Type:** string<br>**Description:** Required.<br>ID or name of the referred context definition.<br><br> |

## ContextDefinitionVersion

Represents details about the context definition version. Only one version can be active at a time.

| Field Name | Description |
| --- | --- |
| contextMappings | **Field Type:** [ContextMapping\[\]](#ContextMapping)<br>**Description:** Mapping of attributes and nodes to related objects.<br> |
| contextNodes | **Field Type:** [ContextNode\[\]](#ContextNode)<br>**Description:** Details of the structure of the nodes within the context.<br> |
| endDate | **Field Type:** string<br>**Description:** Date and time when the context definition version becomes inactive.<br> |
| isActive | **Field Type:** boolean<br>**Description:** Indicates whether the context definition version is active (true) or not (false).<br>The default value is false.<br> |
| startDate | **Field Type:** string<br>**Description:** Required.<br>Date and time when the context definition version becomes active.<br> |
| versionNumber | **Field Type:** int<br>**Description:** Required.<br>Version number of the context definition.<br> |

## ContextMapping

Represents the mapping of attributes and nodes to related objects.

| Field Name | Description |
| --- | --- |
| contextMappingIntents | **Field Type:** [ContextMappingIntent\[\]](#ContextMappingIntent)<br>**Description:** Purpose associated to a context mapping.<br> |
| contextNodeMappings | **Field Type:** [ContextNodeMapping\[\]](#ContextNodeMapping)<br>**Description:** Mapping of the node in the context and values in the input schema.<br> |
| default | **Field Type:** boolean<br>**Description:** Indicates whether the mapping for a context definition version is default (true) or not (false).<br>The default value is false.<br> |
| description | **Field Type:** string<br>**Description:** Description of the context mapping.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent mapping that's used to derive the current mapping.<br> |
| title | **Field Type:** string<br>**Description:** Required.<br>Name of the context mapping.<br> |

## ContextMappingIntent

Represents the purpose associated to a context mapping.

| Field Name | Description |
| --- | --- |
| mappingIntent | **Field Type:** ContextMappingIntentType (enumeration of type string)<br>**Description:** Required.<br>Specifies the purpose that's used to identify the type of context mapping required.<br>Valid values are:<br>• hydration<br>• association<br>• persistence<br>• translation<br><br> |

## ContextNodeMapping

Represents the relationship between the node in the context and values in the input schema.

| Field Name | Description |
| --- | --- |
| contextAttributeMappings | **Field Type:** [ContextAttributeMapping\[\]](#ContextAttributeMapping)<br>**Description:** Mapping of the attribute defined in the context and the values in the related objects.<br> |
| contextNode | **Field Type:** string<br>**Description:** Context node record associated with the context node mapping.<br> |
| contextNodeAttrDictionaries | **Field Type:** [ContextNodeAttrDictionary\[\]](#ContextNodeAttrDictionary)<br>**Description:** Facilitates relationships between context node mapping and context dictionary. Additionally, it records the relationship between context node and context dictionary.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent context node mapping that's used to derive the current context node mapping.<br> |
| mappedContextDefinition | **Field Type:** string<br>**Description:** API name of the context definition for existing context-to-context mappings.<br> |
| object | **Field Type:** string<br>**Description:** Name of the object used for the mapping.<br> |

## ContextAttributeMapping

Represents the relationship between the attributes defined in the context and the values in the related objects.

| Field Name | Description |
| --- | --- |
| contextAttrHydrationDetails | **Field Type:** [ContextAttrHydrationDetail\[\]](#ContextAttrHydrationDetail)<br>**Description:** Details of the SOQL (database) queries that fetch data for a chosen attribute from the input schema.<br> |
| contextAttribute | **Field Type:** string<br>**Description:** Context attribute record associated with the context attribute mapping.<br> |
| contextInputAttributeName | **Field Type:** string<br>**Description:** Required.<br>Name of the input attribute.<br> |
| ctxAttrHydrationCtxs | **Field Type:** [CtxAttrHydrationCtx\[\]](#CtxAttrHydrationCtx)<br>**Description:** Query that fetches data for a chosen attribute from the input schema for context-to-context mapping.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent context attribute mapping that's used to derive the current context attribute mapping.<br> |

## ContextAttrHydrationDetail

Represents the SOQL (database) queries that fetch data for a chosen attribute from the input schema.

| Field Name | Description |
| --- | --- |
| contextAttrHydrationDetails | **Field Type:** [ContextAttrHydrationDetail\[\]](#ContextAttrHydrationDetail)<br>**Description:** Details of the query that fetches the data for the specific query attribute.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent context attribute hydration detail that's used to derive the current context attribute hydration detail.<br> |
| objectName | **Field Type:** string<br>**Description:** Required.<br>Name of the object used for the attribute hydration detail.<br> |
| queryAttribute | **Field Type:** string<br>**Description:** Required.<br>The SOQL query that is the source of the hydration.<br> |

## CtxAttrHydrationCtx

Represents the queries that fetch data for a chosen attribute from the input schema for context-to-context mapping.

| Field Name | Description |
| --- | --- |
| contextQueryAttribute | **Field Type:** string<br>**Description:** Required.<br>Attribute in context definition that's the source of context hydration.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent context attribute hydration detail that's used to derive the current context attribute.<br> |

## ContextNodeAttrDictionary

Represents the relationship between a context node and the context attribute dictionary.

| Field Name | Description |
| --- | --- |
| contextAttrDictIdentifier | **Field Type:** string<br>**Description:** Required.<br>Developer name of the context attribute dictionary.<br> |
| contextNodeTagPrefix | **Field Type:** string<br>**Description:** Required.<br>Tag prefix of the context node that's used to create the unique identifier of the parent context node.<br> |

## ContextNode

Represents details of the structure of the nodes within the context. Each node can have other nodes related to them and attributes to describe the object. You can also define a hierarchy for the nodes.

| Field Name | Description |
| --- | --- |
| canonicalNode | **Field Type:** string<br>**Description:** Canonical node that's associated with the context node.<br> |
| contextAttributes | **Field Type:** [ContextAttribute\[\]](#ContextAttribute)<br>**Description:** Details of the attribute used to describe the context node.<br> |
| contextNodeAttrDictionaries | **Field Type:** [ContextNodeAttrDictionary\[\]](#ContextNodeAttrDictionary)<br>**Description:** Facilitates relationships between context node and context dictionary. Additionally, it records the relationship between context node and context dictionary.<br> |
| contextTags | **Field Type:** [ContextTag\[\]](#ContextTag)<br>**Description:** Unique identifier of the attribute or node.<br> |
| displayName | **Field Type:** string<br>**Description:** Display name of the context node.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent context node that's used to derive the current context node.<br> |
| title | **Field Type:** string<br>**Description:** Required.<br>Name of the context node.<br> |
| transposable | **Field Type:** boolean<br>**Description:** Indicates whether the data in the Context Node record can be converted to field names (true) or not (false).<br>The default value is false.<br> |

## ContextAttribute

Represents details of an attribute used to describe a context node. Each node can have one or many associated attributes.

> **Supported Editions:**<br>contextTags<br>
> 
> Field Type
> 
> [ContextTag\[\]](#ContextTag)
> 
> Description
> 
> Shortened name of the attribute or node.
> 
> <br>dataType<br>
> 
> Field Type
> 
> ContextAttributeDataType (enumeration of type string)
> 
> Description
> 
> Required.
> 
> Type of data that's stored in the context attribute.
> 
> Valid values are:
> 
> *   boolean
> *   currency
> *   date
> *   datetime
> *   number
> *   percent
> *   picklist
> *   reference
> *   string
> *   selfreference—Available in API version 63.0 and later.
> 
> <br>description<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Description of the context attribute.
> 
> <br>displayName<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Display name of the context attribute.
> 
> <br>domainSet<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> List of node references to show the parent-child relationship between the nodes in a definition.
> 
> <br>fieldType<br>
> 
> Field Type
> 
> ContextAttributeFieldType (enumeration of type string)
> 
> Description
> 
> Required.
> 
> List of node references to depict the parent-child relation between the nodes in a definition.
> 
> Valid values are:
> 
> *   aggregate
> *   input
> *   inputoutput
> *   output
> 
> <br>inheritedFrom<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Name of the parent attribute that's used to derive the current attribute.
> 
> <br>key<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the attribute is a key attribute in the node (true) or not (false).
> 
> The default value is false.
> 
> <br>title<br>
> 
> Field Type
> 
> string
> 
> Description
> 
> Required.
> 
> Name of the context attribute.
> 
> <br>transient<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates if an attribute is skipped in context persistence (true) or not (false). Available in API version 63.0 and later.
> 
> The default value is false.
> 
> <br>value<br>
> 
> Field Type
> 
> boolean
> 
> Description
> 
> Indicates whether the attribute identifies as a value in a node (true) or not (false).
> 
> The default value is false.

## ContextTag

Represents a unique identifier of an attribute or node instead of a fully qualified tag structure name.

| Field Name | Description |
| --- | --- |
| title | **Field Type:** string<br>**Description:** Required.<br>Name of the context tag.<br> |
| inheritedFrom | **Field Type:** string<br>**Description:** Name of the parent context tag that's used to derive the current context tag.<br> |

## Declarative Metadata Sample Definition

The following is an example of a ContextDefinition component.

```
1<?xml version="1.0" encoding="UTF-8"?>
2<ContextDefinition xmlns="http://soap.sforce.com/2006/04/metadata">
3    <fullName>Test</fullName>
4    <contextDefinitionVersions>
5        <contextMappings>
6            <contextNodeMappings>
7                <contextNodeAttrDictionaries>
8                    <contextAttrDictIdentifier>Context Attribute Dictionary Name</contextAttrDictIdentifier>
9                    <contextNodeTagPrefix>Context Node Tag Prefix</contextNodeTagPrefix>
10                </contextNodeAttrDictionaries>
11                <contextAttributeMappings>
12                    <contextAttrHydrationDetails>
13                        <objectName>CustomAccount__c</objectName>
14                        <queryAttribute>Name</queryAttribute>
15                        <inheritedFrom>StandardDefinition/version/CustomAccountMapping/Praneeth/AccountName/hydrationInfo-1</inheritedFrom>
16                    </contextAttrHydrationDetails>
17                    <ctxAttrHydrationCtxs>
18                        <contextQueryAttribute>StandardDefinition</contextQueryAttribute>
19                        <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/AccountName/ctxToCtxhydrationInfo-1</inheritedFrom>
20                    </ctxAttrHydrationCtxs>
21                    <contextAttribute>AccountName</contextAttribute>
22                    <contextInputAttributeName>AccountName</contextInputAttributeName>
23                    <inheritedFrom>StandardDefinition/version/CustomAccountMapping/Praneeth/AccountName</inheritedFrom>
24                </contextAttributeMappings>
25                <contextAttributeMappings>
26                    <contextAttrHydrationDetails>
27                        <objectName>CustomAccount__c</objectName>
28                        <queryAttribute>CustomAccountName__c</queryAttribute>
29                        <inheritedFrom>StandardDefinition/version/CustomAccountMapping/Praneeth/CustomAccountName/hydrationInfo-1</inheritedFrom>
30                    </contextAttrHydrationDetails>
31                    <ctxAttrHydrationCtxs>
32                        <contextQueryAttribute>StandardDefinition</contextQueryAttribute>
33                        <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/AccountName/ctxToCtxhydrationInfo-1</inheritedFrom>
34                    </ctxAttrHydrationCtxs>
35                    <contextAttribute>CustomAccountName</contextAttribute>
36                    <contextInputAttributeName>CustomAccountName</contextInputAttributeName>
37                    <inheritedFrom>StandardDefinition/version/CustomAccountMapping/Praneeth/CustomAccountName</inheritedFrom>
38                </contextAttributeMappings>
39                <contextNode>Praneeth</contextNode>
40                <object>CustomAccount__c</object>
41                <inheritedFrom>StandardDefinition/version/CustomAccountMapping/Praneeth</inheritedFrom>
42                <mappedContextDefinition>CustomContextDefinition</mappedContextDefinition>
43            </contextNodeMappings>
44            <contextMappingIntents>
45                <mappingIntent>hydration</mappingIntent>
46            </contextMappingIntents>
47            <default>true</default>
48            <title>CustomAccountMapping</title>
49            <inheritedFrom>StandardDefinition/version/CustomAccountMapping</inheritedFrom>
50        </contextMappings>
51        <contextMappings>
52            <contextNodeMappings>
53                <contextNodeAttrDictionaries>
54                    <contextAttrDictIdentifier>Context Attribute Dictionary Name</contextAttrDictIdentifier>
55                    <contextNodeTagPrefix>Context Node Tag Prefix</contextNodeTagPrefix>
56                </contextNodeAttrDictionaries>
57                <contextAttributeMappings>
58                    <contextAttrHydrationDetails>
59                        <objectName>Account</objectName>
60                        <queryAttribute>Name</queryAttribute>
61                        <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/CustomAccountName/AccountName/hydrationInfo-1</inheritedFrom>
62                    </contextAttrHydrationDetails>
63                    <ctxAttrHydrationCtxs>
64                        <contextQueryAttribute>StandardDefinition</contextQueryAttribute>
65                        <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/AccountName/ctxToCtxhydrationInfo-1</inheritedFrom>
66                    </ctxAttrHydrationCtxs>
67                    <contextAttribute>AccountName</contextAttribute>
68                    <contextInputAttributeName>AccountName</contextInputAttributeName>
69                    <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/CustomAccountName/AccountName</inheritedFrom>
70                </contextAttributeMappings>
71                <contextAttributeMappings>
72                    <contextAttrHydrationDetails>
73                        <objectName>Account</objectName>
74                        <queryAttribute>CustomAccountName__c</queryAttribute>
75                        <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/CustomAccountName/hydrationInfo-1</inheritedFrom>
76                    </contextAttrHydrationDetails>
77                    <ctxAttrHydrationCtxs>
78                        <contextQueryAttribute>StandardDefinition</contextQueryAttribute>
79                        <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/AccountName/ctxToCtxhydrationInfo-1</inheritedFrom>
80                    </ctxAttrHydrationCtxs>
81                    <contextAttribute>CustomAccountName</contextAttribute>
82                    <contextInputAttributeName>CustomAccountName</contextInputAttributeName>
83                    <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth/CustomAccountName</inheritedFrom>
84                </contextAttributeMappings>
85                <contextNode>Praneeth</contextNode>
86                <object>Account</object>
87                <inheritedFrom>StandardDefinition/version/AccountMapping/Praneeth</inheritedFrom>
88                <mappedContextDefinition>CustomContextDefinition</mappedContextDefinition>
89            </contextNodeMappings>
90             <contextMappingIntents>
91                <mappingIntent>persistence</mappingIntent>
92             </contextMappingIntents>
93            <description>Account Mapping</description>
94            <default>false</default>
95            <title>AccountMapping</title>
96            <inheritedFrom>StandardDefinition/version/AccountMapping</inheritedFrom>
97        </contextMappings>
98        <contextNodes>
99            <contextNodeAttrDictionaries>
100                <contextAttrDictIdentifier>Context Attribute Dictionary Name</contextAttrDictIdentifier>
101                <contextNodeTagPrefix>Context Node Tag Prefix</contextNodeTagPrefix>
102            </contextNodeAttrDictionaries>
103            <contextAttributes>
104                <contextTags>
105                    <title>AccountName</title>
106                    <inheritedFrom>StandardDefinition/version/Praneeth/AccountName/AccountName</inheritedFrom>
107                </contextTags>
108                <dataType>string</dataType>
109                <fieldType>inputoutput</fieldType>
110                <key>false</key>
111                <title>AccountName</title>
112                <displayName>AccountName</displayName>
113                <description>Test Description</description>
114                <value>false</value>
115                <inheritedFrom>StandardDefinition/version/Praneeth/AccountName</inheritedFrom>
116            </contextAttributes>
117            <contextAttributes>
118                <dataType>string</dataType>
119                <fieldType>inputoutput</fieldType>
120                <key>false</key>
121                <title>CustomAccountName</title>
122                <value>false</value>
123                <displayName>CustomAccountName</displayName>
124                <description>Test Description</description>
125                <inheritedFrom>StandardDefinition/version/Praneeth/CustomAccountName</inheritedFrom>
126            </contextAttributes>
127            <contextTags>
128                <title>Praneeth</title>
129                <inheritedFrom>StandardDefinition/version/Praneeth/Praneeth</inheritedFrom>
130            </contextTags>
131            <title>Praneeth</title>
132            <transposable>false</transposable>
133            <inheritedFrom>StandardDefinition/version/Praneeth</inheritedFrom>
134            <canonicalNode></canonicalNode>
135            <displayName>Praneeth</displayName>
136        </contextNodes>
137        <endDate>2097-05-10 00:00:00</endDate>
138        <startDate>2023-05-10 00:00:00</startDate>
139        <versionNumber>1</versionNumber>
140        <isActive>true</isActive>
141    </contextDefinitionVersions>
142    <description>Test Description</description>
143    <contextTtl>10</contextTtl>
144    <inheritedFrom>StandardDefinition</inheritedFrom>
145    <inheritedFromVersion>1.0</inheritedFromVersion>
146    <clonedFrom>OriginalDefinition</clonedFrom>
147    <isProtected>false</isProtected>
148    <masterLabel>Test Label</masterLabel>
149    <title>TestTitle</title>
150    <displayName>TestTitle</displayName>
151</ContextDefinition>
```

The following is an example package.xml that references the previous definition.

```
1<Package xmlns="http://soap.sforce.com/2006/04/metadata">
2    <types>
3        <members>Test</members>
4        <name>ContextDefinition</name>
5    </types>
6    <types>
7        <members>Account.CustomAccountName__c</members>
8        <name>CustomField</name>
9    </types>
10    <types>
11        <members>CustomAccount__c</members>
12        <name>CustomObject</name>
13    </types>
14    <version>64.0</version>
15</Package>
```

## Wildcard Support in the Manifest File

This metadata type supports the wildcard character \* (asterisk) in the package.xml manifest file. For information about using the manifest file, see [Deploying and Retrieving Metadata with the Zip File](https://developer.salesforce.com/docs/atlas.en-us.260.0.api_meta.meta/api_meta/file_based_zip_file.htm).