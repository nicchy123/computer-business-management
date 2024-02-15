# Computer Item Management App

Welcome to the Computer Item Management App! This React project utilizes RTK Query and Redux Toolkit to manage computer items, including functionalities for creating, selling, ordering, duplicating, updating, and deleting products. Additionally, the app provides insights into daily, monthly, weekly, and yearly sales. Implemented a custom authentication system for users


## Techs Used:
1. React js
2. Redux Toolkit
3. Rtk Query



## Authentication:

## User Registration and Login:
Users have to register and log in to access the dashboard.
Use JWT (JSON Web Tokens) for secure authentication.

## Functionality:

Computer Items Management:

## CRUD Operations:
1 Add a new computer item to the inventory.

2 Delete existing computer items from the inventory.

3 Update computer item details.

4 Read and view the list of computer items in the inventory.

5 Implemented a robust filtering system to effectively narrow down computer item selections based on various criteria.


## Sales Management:

#### Users can search for a product to sell, and upon finding it, they can click the "Sell" button. On clicking the sell button a form will pop up. The form will have the following fields:

    1.Quantity of the product to be sold (Input quantity cannot exceed the current available stock of the product)
    2.Name of the buyer
    3.Date of the sale
####  If the quantity reaches zero, the product will be removed from the inventory.

## Sales History:

### View sales history categorized by:
    1. Weekly
    2. Daily
    3. Monthly
    4. Yearly


## Computer Items Filtering (Implement on the computer items management page)

Implemented a comprehensive computer items filter system to optimize inventory management. The filter options should cater specifically to computer accessories and hardware:

Filter by Category: Allow users to set a filter for specific computer item categories (e.g., monitors, RAM, graphics cards).

Filter by Brand: Implement a real-time search functionality for computer item brands to quickly find items by a specific manufacturer.

Filter by Compatibility: Enable searching by compatibility with different systems (e.g., Windows, Mac).

Filter by Price Range: Implement a price range filter for computer items.
Filter by Interface: Allow users to filter computer items based on interface types (e.g., USB, HDMI, Thunderbolt).

Filter by Condition: Implement a filter for new or used items.
Filter by Capacity: Include a filter for items with varying capacities (e.g., storage capacity for hard drives).

Additional Relevant Filter Parameters: Introduce other relevant filter parameters such as color, form factor, or any custom attributes associated with the computer items.
User Interface Features:

Gracefully update the UI in real-time when changes occur (e.g., product updates, sales, etc.).

Utilize RTK Query for efficient CRUD operations.
Implement Re-fetching functionality to ensure data accuracy and consistency.
State Management:

Utilize Redux for state management to maintain a consistent application state.
Bulk Delete Product Options:

Enable users to efficiently manage their inventory by implementing a bulk delete feature for the computer items.

Provide a user-friendly interface to select and delete multiple computer item options simultaneously.

Implement a feature within the product list that includes a button. Upon clicking this button, users will be redirected to a form where product data is pre-filled.

 Users can then make modifications as needed to create a new product based on the existing one. The button could be named "Duplicate & Edit" or "Create Variant" to convey the idea that users can duplicate an existing product and make modifications to create a new one.



    ### Installation
1. Clone the repository:
   ```bash
        git clone

2. Clone the repository:
   ```bash
         npm install

2. Clone the repository:
   ```bash
         npm run dev