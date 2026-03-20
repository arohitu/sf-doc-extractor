---
title: "Add Context Mapping"
url: "https://help.salesforce.com/s/articleView?id=ind.context_service_add_context_mapping.htm&type=5"
fetched_at: "2026-03-20T14:23:06.838Z"
---

# Add Context Mapping

To make sure that your nodes and attributes are updated with the right input data, Salesforce objects, or context definition objects, create a mapping structure for your context definition.

### Required Editions

> **Supported Editions:**<br>Available in: Lightning Experience<br>Available in: **Developer**, **Enterprise**, **Professional**, and **Unlimited** editions for Industries clouds where Context Service is enabled

| User Permissions Needed |
| --- |
| To create context mappings: | Context Service Admin |

![Important](https://sf-zdocs-cdn-prod.zoominsoftware.com/tdta-context_service-260-0-0-production-enus/bf57d2cc-0b93-43e2-9011-53585c6884a7/images/icon_important.png)

Important

*   You can add a mapping to only an inactive context definition. We recommend that you create a context definition, define its structure, set its mapping, and only then make the context definition active.
*   To make a context definition active, you must set up a default mapping.
*   You must map the nodes first and then map all the attributes.
*   To save a context map, map at least one attribute and a node.
*   The Profile, UserRole, RecordType, and Permission Set Assignment entities aren’t available for mapping.

1.  From Setup, in the Quick Find box, find and select Context Definitions.
2.  On the Custom Definitions tab, select the context definition that you want to add a mapping to.
3.  On the Context Definition Details page, select the **Map Data** tab.
4.  Click **Add Mapping**.
5.  Specify the mapping details.
    
    1.  Give your mapping a name.
    2.  Provide a description. Enter additional details about the context mapping, if necessary.
    3.  To automatically map your definition to standard objects, select **Automatic Salesforce Object Mapping**.
    4.  To set this mapping as your default mapping, select **Mark as default**.
    
    Note To manually map your context definition, deselect the Automatic Salesforce Object Mapping checkbox.
    
6.  Click **Next**.
7.  On the Mapping Intent Details tile, select at least one Mapping Intent operation. For more information, see [Mapping Intent Types](https://help.salesforce.com/s/articleView?id=ind.context_service_mapping_intent_type.htm&language=en_US&type=5).
    
    ![Option to select mapping intent.](https://sf-zdocs-cdn-prod.zoominsoftware.com/tdta-context_service-260-0-0-production-enus/bf57d2cc-0b93-43e2-9011-53585c6884a7/context_service/images/context_service_mapping_intent.png)
    
8.  To begin the mapping, click **Map**.
    
    Note The Context Mapping’s builder page opens so you can begin to map your nodes and attributes.
    
9.  To map a node to an object, click **Select Object**.
10.  To select an sObject or to retrieve data from a Data Model Object (DMO),
     1.  Click the **sObjects & DMO** tab, then search for the object or DMO you want to connect with the node.
     2.  Select the objects you want to connect with the node, then click **Save**.
         
         Note You can map to only one type of object in a single context mapping.
         
11.  To select a context definition,
     
     1.  Click the **Context Definition** tab, then click Proceed.
     2.  Select a definition from the list of available context definitions for mapping.
     3.  Click **Confirm**.
         
         The mapped reference context definition is displayed in the attribute mapping screen for all nodes.
         
     4.  To change the mapped reference context definition, click **Change**.
     
     ![Change the mapped reference context definition](https://sf-zdocs-cdn-prod.zoominsoftware.com/tdta-context_service-260-0-0-production-enus/bf57d2cc-0b93-43e2-9011-53585c6884a7/context_service/images/ctx_change_mapped_ctx_def.png)
     
     Note You can map to only one type of object in a single context mapping.
     
12.  To map an attribute,
     1.  In **Select Fields**, search for the field you want to map it to.
     2.  Select the fields and save your changes.
         
         Note You can map attributes to fields that have a matching or supported data type.
         
13.  After you create all your mappings, save your changes.
     
     ![Context mapping page](https://sf-zdocs-cdn-prod.zoominsoftware.com/tdta-context_service-260-0-0-production-enus/bf57d2cc-0b93-43e2-9011-53585c6884a7/context_service/images/ctx_mapping_UI.png)
     

After you define your context definition, its structure, and its mapping, activate it. Your consuming application can now use the context definition to perform application processes with improved performance.

To remove a mapping, select the node, click the mapped object, click **Clear All**, and save your changes.

To remove an attribute mapping, click the mapped field, click **Clear All**, and save your changes.