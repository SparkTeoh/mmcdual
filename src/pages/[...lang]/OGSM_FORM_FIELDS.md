# OGSM Checkout Flow - Form Fields

This document lists all the input fields required from the user across the 4 steps of the OGSM checkout process.

### Step 1: Lead Information
*These fields are collected upfront before proceeding to participant selection.*

- **Name (姓名)**: Text input (Required)
- **Company (公司名称)**: Text input (Required)
- **Position (职位)**: Text input (Required)
- **Phone (联系电话)**: Phone number input (Required, auto-formatted)
- **Email (邮箱)**: Email input (Required)
- **Pre-course Diagnosis (课前诊断)**: Text area (Required)

### Step 2: Participant Information
*This step allows selecting the number of participants and collecting their details.*

- **Pax (报名人数)**: Number selector (Min: 1, Max: 20)
- **For each participant (动态增加/减少):**
  - **Full Name as per IC (姓名)**: Text input (Required) *Note: Attendee 1 is auto-filled with Name from Step 1*
  - **IC No. (身份证号)**: Text input (Required, auto-formatted to XXXXXX-XX-XXXX)
  - **Phone No. (联系电话)**: Phone number input (Required, auto-formatted) *Note: Attendee 1 is auto-filled with Phone from Step 1*

### Step 3: Invoice Details
*This step collects billing information for the invoice.*

- **Company Name (公司名称)**: Text input (Required) *Note: Auto-filled with Company from Step 1*
- **Company Address (公司地址)**: Text area (Required)
- **Phone (联系电话)**: Phone number input (Required) *Note: Auto-filled with Phone from Step 1*
- **Email (邮箱)**: Email input (Required) *Note: Auto-filled with Email from Step 1*

### Step 4: Checkout & Payment
*This is the final confirmation step before redirecting to the payment gateway.*

- **Summary Display (只读)**: Shows total pax, subtotal, SST (8%), and the final total amount.
- **Action**: "Pay Now (立即付款)" button which creates the order and opens the FIUU payment popup. 
- *No user input fields in this step.*
