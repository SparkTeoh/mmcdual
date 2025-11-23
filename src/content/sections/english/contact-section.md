---
enable: true # Control the visibility of this section across all pages where it is used
title: "Ready to Transform Your Business?"
description: "Whether you need to optimize your profits, structure your team, or prepare for an exit, our consultants are ready to guide you."
subtitle: "Contact Us"

contactList:
  enable: true
  list:
    # For icon names, see [Lucide Icons](https://lucide.dev/icons/?search=) (remember to capitalize the icon name)
    - icon: "Phone"
      label: "Call / WhatsApp"
      value: "+6011-27368039"
    - icon: "Mail"
      label: "Email us"
      value: "admin@mmcfin.com"
    - icon: "MapPin"
      label: "Visit Us"
      value: "MMC FP Sdn Bhd, Kuala Lumpur, Malaysia"

social:
  enable: true
  title: "Follow us for updates"
  # # uncomment below list if you want to override `src/config/social.json` data
  # list:
  #   - enable: true
  #     label: "facebook"
  #     icon: "/images/icons/social/facebook.svg"
  #     url: "/"

# Check config.toml file for form action related settings
form:
  emailSubject: "New Inquiry from MMC Website" # Customized email subject
  submitButton:
    label: "Get Your Free Strategy Session"
    showIcon: "true"
    variant: "fill" # "fill", "outline", "outline-white", "text"
    hoverEffect: "magnetic" # "text-flip", "creative-fill", "magnetic", "magnetic-text-flip"
  # This note will show at the end of form
  # note: |
  #   Your data is safe with us. We respect your privacy and never share your information. <br /> Read our [Privacy Policy](/privacy-policy/).
  inputs:
    - label: ""
      placeholder: "Your Full Name"
      name: "Full Name"
      required: true
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Work Email Address"
      name: "Email Address"
      required: true
      type: "email"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Phone Number (WhatsApp)"
      name: "Phone Number"
      required: true
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "Company Name"
      name: "Company"
      required: true
      type: "text"
      halfWidth: true
      defaultValue: ""
    - label: ""
      placeholder: "I am interested in..."
      name: "Service Interest"
      required: true
      halfWidth: true
      dropdown:
        type: "select" # select | search - default is select
        search: # if type is search then it will work
          placeholder: ""
        items:
          - label: "Profit Budgeting Course (3 Days)"
            value: "Course"
          - label: "Corporate Consulting (System Implementation)"
            value: "Consulting"
          - label: "Valuation & Exit Planning"
            value: "Exit Planning"
          - label: "Others / General Inquiry"
            value: "General"
    - label: ""
      placeholder: "How did you hear about us?"
      name: "Source"
      required: true
      halfWidth: true
      dropdown:
        type: "select"
        items:
          - label: "Google Search"
            value: "Google"
          - label: "Social Media (Facebook/Instagram/LinkedIn)"
            value: "Social Media"
          - label: "Referral from Friend/Partner"
            value: "Referral"
          - label: "Webinar / Event"
            value: "Event"
          - label: "Other"
            value: "Other"
    - label: ""
      tag: "textarea"
      defaultValue: ""
      rows: "4"
      placeholder: "Briefly describe your biggest business challenge right now (Optional)"
      name: "Message"
      required: false
      halfWidth: false
    - label: "I agree to the terms and conditions and [privacy policy](/privacy-policy/)." 
      name: "Agreed Privacy"
      value: "Agreed"
      checked: false
      required: true
      type: "checkbox"
      halfWidth: false
      defaultValue: ""
    - note: success
      parentClass: "hidden text-sm message success"
      content: Thank you! We have received your inquiry. Our consultant will contact you via WhatsApp/Email shortly.
    - note: deprecated
      parentClass: "hidden text-sm message error"
      content: Something went wrong! Please try again or email us directly at admin@mmcfin.com.
---