---
title: "Assign Product Classifications to a Product Configuration Flow"
url: "https://help.salesforce.com/s/articleView?id=ind.product_configurator_assign_product_classifications_to_a_product_configuration_flow.htm&type=5"
fetched_at: "2025-11-25T09:39:19.213Z"
---

You are here:

1.  [Salesforce Help](https://help.salesforce.com/s/?language=en_US)
2.  [Docs](https://help.salesforce.com/s/products?language=en_US)
3.  [Revenue Cloud](https://help.salesforce.com/s/articleView?id=ind.revenue_lifecycle_management.htm&language=en_US&type=5)

# Assign Product Classifications to a Product Configuration Flow

The product configuration flow provides a simple layout for defining attribute-level details, ensuring a smooth buying experience for your customers. For product classifications assigned to a flow, verify the product configuration experience seen during run time.

### Required Editions

Confirm that:

*   You created a product configuration flow.
*   You created a product classification.

<table class="slds-table slds-table_bordered slds-m-bottom_small edition" lwc-3eigj2skqo3=""><colgroup lwc-3eigj2skqo3=""><col lwc-3eigj2skqo3=""></colgroup><tbody lwc-3eigj2skqo3=""><tr class="" lwc-3eigj2skqo3=""><td style="vertical-align:top;" class="slds-cell-wrap" lwc-3eigj2skqo3="">Available in: Lightning Experience</td></tr><tr class="" lwc-3eigj2skqo3=""><td style="vertical-align:top;" class="slds-cell-wrap" lwc-3eigj2skqo3="">Available in: <strong lwc-3eigj2skqo3="">Enterprise</strong>, <strong lwc-3eigj2skqo3="">Unlimited</strong>, and <strong lwc-3eigj2skqo3="">Developer</strong> Editions of Revenue Cloud where Product Configurator is enabled</td></tr></tbody></table>

| User Permissions Needed |
| --- |
| To assign a product classification to a product configuration flow: | Product Configurator |

1.  From the App Launcher, find and select **Product Configuration Flows**.
2.  Click the product configuration flow for which you want to assign the product classifications.
3.  On the Related tab, in the Product Configuration Flow Assignment related list, click **New**.
4.  Find and select the product classification that you want to assign to the product configuration flow.
5.  Select the assignment type as **Configurator** to set the selected product configuration flow as the flow for the primary product or classification. Select **Dynamic Component** if you want to set it as the flow for only the dynamic components within a bundle.
6.  Save your changes.
    
    Similarly, assign more product classifications to the product configuration flow. To unassign a product from the product configuration flow, delete the product from the Product Configuration Flow Assignment related list.
    
    ![Note](https://sf-zdocs-cdn-prod.zoominsoftware.com/tdta-revenue-258-0-1-production-enus/007da4f3-af43-463e-8665-2703f111f184/images/icon_note.png)
    
    Note You can assign only one product configuration flow to a product classification.
    

*   [Clone the Default Product Configurator Flow](https://help.salesforce.com/s/articleView?id=ind.product_configurator_clone_the_default_product_configurator_flow.htm&language=en_US&type=5 "Use the Default Product Configurator Flow as a template to design a product configurator flow that determines the layout for presenting customizable product-related information in the user interface.")
*   [Create a Product Configuration Flow](https://help.salesforce.com/s/articleView?id=ind.product_configurator_create_a_product_configuration_flow.htm&language=en_US&type=5 "The product configuration flow provides a layout for configuring the products and previewing the user experience in real-time.")