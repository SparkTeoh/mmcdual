---
title: "财务规划服务 | MMC财务规划"
metaTitle: "财务规划服务 | MMC财务规划"
metaDescription: "通过MMC持牌财务规划服务转变您的业务。为马来西亚中小企业提供战略预算管理、现金流管理、KPI设定、企业估值和退出规划服务。自2008年获得大马证监会许可。立即开始。"
keywords: ["战略预算服务", "企业财务规划", "现金流管理", "KPI设定服务", "企业估值马来西亚", "退出规划", "IPO准备", "中小企业财务顾问", "外部CFO服务", "财务规划马来西亚"]
robots: "index, follow"
disableTagline: true
draft: false
hasCustomLineAnimationBg: true

# Override "Services Section" data located in services list page
indexServicesSection:
  enable: true # Control the visibility of this section across all services single
  # title: "延伸服务，最大化企业潜力"
  # subtitle: "我们的服务"

  creativeShape: # Background shape
    enable: true
    position: "top"

  # cta: "slider-nav" # "link" | "slider-nav" ( Define weather call to action button should be slider control or a link )
  # colorScheme: "light" # "dark" | "light"; (default "dark"); weather to show services in light or dark color scheme
  showServicesAs: "static" # "slider" | "static"; (default "slider"); weather to show services as slider or static list
  limit: false # number / false (default "3"); Limit the number of services to be displayed (Only work if showServicesAs is static)

  button:
    enable: false
    label: "查看所有服务"
    url: "/services"
    rel: ""
    target: ""
    showIcon: "true"
    variant: "outline" # "fill", "outline", "outline-white", "text"
    hoverEffect: "text-flip" # "text-flip", "creative-fill", "magnetic", "magnetic-text-flip"

# ----------------------------------------------------------------------------------------------------------------
# DATA FOR SERVICE SINGLE PAGES
# ----------------------------------------------------------------------------------------------------------------

# "Service Details" Section located in Services Single Page (Image Moving Animation Settings)
serviceDetailsMarquee:
  marqueeElementWidth: "26.5rem"
  marqueeElementWidthResponsive: "18.75rem"
  marqueeElementWidthAuto: true
  marqueePauseOnHover: true
  marqueeReverse: "" # reverse / ""
  marqueeDuration: "30s"

# "Services" Section located in Services Single Page (Override Default Content of `/sections/services-section.md`)
# Uncomment key values that you wan to override ()
servicesSection:
  enable: true # Control the visibility of this section across all services single
  title: "延伸服务，最大化企业潜力"
  # subtitle: "我们的服务"

  creativeShape: # Background shape
    enable: false
    position: "bottom"

  # cta: "link" # "link" | "slider-nav" ( Define weather call to action button should be slider control or a link )
  # colorScheme: "light" # "dark" | "light"; (default "dark"); weather to show services in light or dark color scheme
  # showServicesAs: "static" # "slider" | "static"; (default "slider"); weather to show services as slider or static list
  # limit: 3 # number / false (default "3"); Limit the number of services to be displayed (Only work if showServicesAs is static)

  button:
    enable: true
    label: "查看所有服务"
    url: "/services"
    rel: ""
    target: ""
    showIcon: "true"
    variant: "outline" # "fill", "outline", "outline-white", "text"
    hoverEffect: "text-flip" # "text-flip", "creative-fill", "magnetic", "magnetic-text-flip"

# "FAQ" Section located in Services Single Page
faqSection:
  enable: true # Control the visibility of this section across all services single
  title: "从基础预算到顶层退出规划，<br>我们都有答案"
  subtitle: "不知道从何开始？"
  sectionLayout: "horizontal"
  minimalFaqLayout: true
  faqLayoutOnly: false
  showCategories: false

  button:
    enable: true
    label: "查看客户的常见问题"
    url: "/faq"
    rel: ""
    target: ""
    showIcon: "true"
    variant: "outline" # "fill", "outline", "outline-white", "text"
    hoverEffect: "text-flip" # "text-flip", "creative-fill", "magnetic", "magnetic-text-flip"
---
