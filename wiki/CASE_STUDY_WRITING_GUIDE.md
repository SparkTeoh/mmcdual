# Case Study Writing Guide

This guide provides comprehensive instructions for writing SEO-optimized case studies using the available components and following best practices.

## Table of Contents

1. [File Structure](#file-structure)
2. [Frontmatter Requirements](#frontmatter-requirements)
3. [Image Selection Guide](#image-selection-guide)
4. [SEO Optimization](#seo-optimization)
5. [Content Structure](#content-structure)
6. [Available Components](#available-components)
7. [Writing Best Practices](#writing-best-practices)
8. [Complete Example](#complete-example)

---

## File Structure

### Location
Case studies should be created in:
```
src/content/case-studies/english/case-studies-XX.mdx
```

Replace `XX` with the next sequential number (e.g., `case-studies-03.mdx`).

### File Format
- **Extension**: `.mdx` (Markdown with JSX components)
- **Language**: Create separate files for different languages in respective folders
- **Naming**: Use kebab-case with descriptive names or sequential numbers

---

## Frontmatter Requirements

### Required Fields

```yaml
---
title: "Short, Compelling Title"
metaTitle: "SEO-Optimized Title (50-60 chars) | Brand"
metaDescription: "SEO description (150-160 chars) with key metrics"
date: YYYY-MM-DD
description: "Brief description for internal use"

keywords:
  - "keyword 1"
  - "keyword 2"
  - "keyword 3"

categories:
  - "Category Name"

information:
  - icon: "User"
    label: "Client -"
    value: "Client Name"
  - icon: "ChartNoAxesGantt"
    label: "Project Category -"
    value: "categories"
  - icon: "Timer"
    label: "Project Duration -"
    value: "Duration"
  - icon: "PanelsTopLeft"
    label: "Live Website -"
    value: "URL or Confidential"

image: "/images/portfolio/Growth_&_Scaling.webp"
imageAlt: "Descriptive alt text with keywords"
masonryImage: "/images/portfolio/Growth_&_Scaling.webp"
---
```

### Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | Display title (shown on page) | `"From Expansion Trap to Profitable Growth"` |
| `metaTitle` | Recommended | SEO title (50-60 chars) | `"F&B Case Study: 5% Profit Growth in 6 Months \| MMC"` |
| `metaDescription` | Recommended | SEO description (150-160 chars) | `"How MMC transformed a multi-brand F&B chain..."` |
| `date` | Yes | Publication date | `2022-09-19` |
| `description` | Yes | Internal description | Brief summary for content management |
| `keywords` | Recommended | SEO keywords array | `["F&B case study", "profit margin improvement"]` |
| `categories` | Yes | Category array | `["F&B"]` |
| `information` | Yes | Project metadata | See [Information Fields](#information-fields) |
| `image` | Yes | Main image path (choose from theme images) | `"/images/portfolio/Growth_&_Scaling.webp"` |
| `imageAlt` | Recommended | Image alt text | Descriptive text with keywords |
| `masonryImage` | Yes | Masonry layout image (same as image) | `"/images/portfolio/Growth_&_Scaling.webp"` |

### Information Fields

The `information` array displays project metadata. Available icons from [Lucide Icons](https://lucide.dev/icons/):

```yaml
information:
  - icon: "User"                    # Client icon
    label: "Client -"
    value: "Client Name"
  
  - icon: "ChartNoAxesGantt"        # Category icon
    label: "Project Category -"
    value: "categories"             # Special: pulls from categories field
  
  - icon: "Timer"                   # Duration icon
    label: "Project Duration -"
    value: "6 Months"
  
  - icon: "PanelsTopLeft"           # Website icon
    label: "Live Website -"
    value: "[example.com](https://example.com)"  # Markdown link supported
```

**Note**: Remember to capitalize icon names (e.g., `"User"`, not `"user"`).

---

## Image Selection Guide

Each case study should select **one image** from the available theme-based images based on the primary focus of the case study. All images are located in `src/assets/images/portfolio/` and should be referenced in the frontmatter.

### Available Theme Images

#### 1. Growth & Scaling (增长与上升)
- **Image**: `Growth_&_Scaling.webp`
- **Use Cases**: 
  - Performance growth cases
  - Profit doubling/improvement
  - Breaking through bottlenecks
  - Revenue expansion
- **Visual Description**: Abstract golden staircase or ascending columns extending upward in a clean space
- **Example**: "How we helped a company achieve 30% profit growth in 6 months"

#### 2. Structure & Organization (结构与重组)
- **Image**: `Structure_&_Organization.webp`
- **Use Cases**:
  - Organizational restructuring
  - KPI setting and implementation
  - Process optimization
  - System implementation
- **Visual Description**: Floating geometric blocks automatically aligning to form a perfect cube or structure
- **Example**: "Restructuring organizational silos and implementing accountability matrices"

#### 3. Flow & Circulation (现金流与循环)
- **Image**: `Flow_&_Circulation.webp`
- **Use Cases**:
  - Cash flow optimization
  - Working capital management
  - Cash conversion cycle improvement
  - Liquidity management
- **Visual Description**: Soft fluid or circular forms representing smooth capital flow
- **Example**: "Optimizing cash conversion cycle to unlock hidden capital"

#### 4. Precision & Focus (精准与聚焦)
- **Image**: `Precision_&_Focus.webp`
- **Use Cases**:
  - Strategic positioning
  - Market penetration
  - Targeted marketing
  - Focused initiatives
- **Visual Description**: An extremely sharp arrow or beam hitting a target or cutting through chaos
- **Example**: "Precision market entry strategy for niche market"

#### 5. Balance & Risk (平衡与风险)
- **Image**: `Balance_&_Risk.webp`
- **Use Cases**:
  - Risk control and management
  - Compliance and regulatory
  - Revenue-expense balance
  - Risk mitigation
- **Visual Description**: Zen-style balancing stones or abstract scale in perfect equilibrium
- **Example**: "Implementing risk controls while maintaining growth momentum"

#### 6. Connection & Teamwork (连接与协同)
- **Image**: `Connection_&_Teamwork.webp`
- **Use Cases**:
  - Team motivation
  - Department collaboration
  - Equity incentive schemes
  - Cross-functional alignment
- **Visual Description**: Multiple small spheres connected by glowing lines forming a network
- **Example**: "Building cross-functional collaboration through incentive alignment"

#### 7. Transformation (转型与蜕变)
- **Image**: `Transformation.webp`
- **Use Cases**:
  - Business transformation
  - Loss to profit turnaround
  - IPO preparation
  - Major strategic shifts
- **Visual Description**: Object transitioning from rough form (left) to smooth, perfect form (center)
- **Example**: "From expansion trap to profitable growth transformation"

#### 8. Vision & Future (愿景与未来)
- **Image**: `Vision_&_Future.webp`
- **Use Cases**:
  - Fundraising and investment
  - Exit planning
  - Long-term strategic planning
  - Future roadmap
- **Visual Description**: Distant horizon or an open door with light shining through
- **Example**: "Exit planning and valuation for strategic sale"

### How to Use Images in Frontmatter

**Important**: Images must be placed in the `public/images/portfolio/` directory to be accessible via the `/images/portfolio/` path.

```yaml
image: "/images/portfolio/Growth_&_Scaling.webp"
imageAlt: "[Descriptive alt text based on case study theme and content]"
masonryImage: "/images/portfolio/Growth_&_Scaling.webp"
```

**Notes**: 
- **File Location**: Place images in `public/images/portfolio/` (not `src/assets/images/portfolio/`)
- **Path Format**: Use `/images/portfolio/Filename.webp` in frontmatter
- **Same Image**: Use the same image for both `image` and `masonryImage` fields
- **Theme Selection**: Choose the image that best represents the **primary theme** of your case study
- **Multiple Themes**: If a case study covers multiple themes, choose the **dominant** one

### Image Selection Decision Tree

1. **Is the case about growth, scaling, or profit improvement?** → Use `Growth_&_Scaling.webp`
2. **Is it about organizational changes, KPI, or processes?** → Use `Structure_&_Organization.webp`
3. **Is it about cash flow or working capital?** → Use `Flow_&_Circulation.webp`
4. **Is it about strategic focus or market targeting?** → Use `Precision_&_Focus.webp`
5. **Is it about risk management or balance?** → Use `Balance_&_Risk.webp`
6. **Is it about team collaboration or incentives?** → Use `Connection_&_Teamwork.webp`
7. **Is it about major transformation or turnaround?** → Use `Transformation.webp`
8. **Is it about future planning, exit, or investment?** → Use `Vision_&_Future.webp`

---

## SEO Optimization

### Meta Title Best Practices

**Format**: `[Category] Case Study: [Key Metric] in [Timeframe] | [Brand]`

**Guidelines**:
- **Length**: 50-60 characters (including spaces)
- **Include**: Category, key metric, timeframe, brand name
- **Example**: `"F&B Case Study: 5% Profit Margin Growth in 6 Months | MMC"`

**Why**: Search engines truncate titles at ~60 characters. Include the most important information first.

### Meta Description Best Practices

**Format**: `[Problem] → [Solution] → [Result with Metrics]. [Credibility Indicator].`

**Guidelines**:
- **Length**: 150-160 characters (including spaces)
- **Include**: 
  - Problem statement
  - Solution approach
  - Key results with specific metrics
  - Credibility indicator (e.g., "SC Licensed since 2008")
- **Example**: `"How MMC transformed a multi-brand F&B chain from expansion losses to 5% profit margin growth. Strategic budgeting, unit economics, and organizational restructuring case study. SC Licensed since 2008."`

**Why**: This is your "ad copy" in search results. Make it compelling and informative.

### Keywords Strategy

**Guidelines**:
- **Quantity**: 8-12 keywords per case study
- **Types to include**:
  - Industry-specific terms (e.g., "F&B case study", "restaurant financial planning")
  - Service-related terms (e.g., "strategic budgeting Malaysia", "unit economics")
  - Location-specific (e.g., "Malaysia F&B financial advisory")
  - Outcome-focused (e.g., "profit margin improvement", "restaurant profit optimization")
  - Credibility terms (e.g., "SC licensed financial planner")

**Example**:
```yaml
keywords:
  - "F&B case study"
  - "profit margin improvement"
  - "strategic budgeting Malaysia"
  - "restaurant financial planning"
  - "unit economics"
  - "profit growth case study"
  - "F&B chain transformation"
  - "restaurant profit optimization"
  - "Malaysia F&B financial advisory"
  - "SC licensed financial planner"
```

### Image Alt Text

**Guidelines**:
- **Be descriptive**: Describe what the image shows
- **Include keywords naturally**: Don't keyword stuff
- **Format**: `"[Industry] [Type] case study - [Brand] [Service] [Outcome]"`
- **Example**: `"F&B chain profit transformation case study - MMC Financial Planning strategic budgeting success story showing 5% profit margin improvement"`

**Why**: Improves accessibility and helps with image search rankings.

---

## Content Structure

### Standard Structure

1. **Main Title** (H2)
   - Descriptive subtitle about the transformation

2. **Client Profile** (H3 with `.text-h4` class)
   - 2-3 sentences about the client
   - Highlight the paradox/challenge

3. **The Challenge** (H2 with `.text-h3` class)
   - Opening paragraph explaining the problem
   - Use `<ListCheck>` component with 4-6 bullet points

4. **The Solution** (H2 with `.text-h3` class)
   - Use `<Notice type="info">` for framework/methodology
   - Use `<Accordion>` components for phases/steps

5. **The Results** (H2 with `.text-h3` class)
   - Use `<ListCheck>` for key results
   - Use `<Notice type="success">` for key achievement/metrics

6. **Client Testimonial** (H2 with `.text-h3` class)
   - Use `<Testimonial>` component

### Example Structure

```markdown
## How a Leading F&B Chain Reinvented Its Financial Strategy

### Client Profile [.text-h4]

[2-3 sentences about the client and their challenge]

---

## The Challenge: The "Growth Paradox" [.text-h3]

[Opening paragraph]

<ListCheck>

- **Challenge 1**: [Description]
- **Challenge 2**: [Description]
- **Challenge 3**: [Description]

</ListCheck>

---

## The Solution: The MMC Profit Budgeting Transformation [.text-h3]

<Notice type="info" title="Framework Name">

[Framework description]

</Notice>

<Accordion label="Phase 1: [Name]" group="solution-phases" expanded="true">

[Phase content]

</Accordion>

---

## The Results: [Title] [.text-h3]

<ListCheck>

- **Result 1**: [Description with metrics]
- **Result 2**: [Description with metrics]

</ListCheck>

<Notice type="success" title="Key Achievement">

[Key metric highlight]

</Notice>

---

## Client Testimonial [.text-h3]

<Testimonial
  customerName="Name"
  customerRole="Role"
  customerCompanyName="Company"
>

[Testimonial text]

</Testimonial>
```

---

## Available Components

### ListCheck

**Use for**: Challenges and Results lists

**Syntax**:
```markdown
<ListCheck>

- **Bold Title**: Description text here
- **Another Title**: More description

</ListCheck>
```

**Best Practices**:
- Use bold for the main point/title
- Keep descriptions concise (1-2 sentences)
- 4-6 items per list

### Notice

**Use for**: Highlighting frameworks, achievements, warnings

**Types**:
- `type="info"` - For frameworks, methodologies, information
- `type="success"` - For achievements, metrics, wins
- `type="warning"` - For cautions, important notes
- `type="error"` - For problems, issues (rarely used)

**Syntax**:
```markdown
<Notice type="info" title="4-Step Profit Growth Framework">

Framework description here.

</Notice>

<Notice type="success" title="Key Achievement">

Within **6 months**, the consolidated Net Profit Margin improved by **5%**.

</Notice>
```

**Best Practices**:
- Use for key highlights that should stand out
- Include specific metrics in success notices
- Keep content concise (2-3 sentences)

### Accordion

**Use for**: Solution phases, steps, detailed breakdowns

**Syntax**:
```markdown
<Accordion label="Phase 1: Strategic Blueprinting" group="solution-phases" expanded="true">

Phase content here.

</Accordion>

<Accordion label="Phase 2: Implementation" group="solution-phases" expanded="false">

More content here.

</Accordion>
```

**Parameters**:
- `label`: The visible title of the accordion
- `group`: All accordions in the same group should share the same value (e.g., `"solution-phases"`)
- `expanded`: `"true"` for the first/default open accordion, `"false"` for others

**Best Practices**:
- First accordion should be `expanded="true"`
- Use consistent `group` names for related accordions
- Keep content focused (2-3 paragraphs per accordion)

### Testimonial

**Use for**: Client quotes and testimonials

**Syntax**:
```markdown
<Testimonial
  customerName="Founder"
  customerRole="CEO"
  customerCompanyName="Company Name"
>

Testimonial text here. This can be multiple sentences.

</Testimonial>
```

**Best Practices**:
- Use real quotes when possible
- Keep it authentic and specific
- 2-4 sentences typically work best

### Horizontal Rule

**Use for**: Visual separation between major sections

**Syntax**:
```markdown
---
```

**Best Practices**:
- Place between major sections (Challenge, Solution, Results)
- Don't overuse (2-3 per case study is typical)

---

## Writing Best Practices

### Content Guidelines

1. **Be Specific**: Include real numbers, timeframes, and metrics
   - ✅ "Within 6 months, profit margin improved by 5%"
   - ❌ "Profit margin improved significantly"

2. **Tell a Story**: Follow the problem → solution → result narrative
   - Start with the challenge
   - Explain the approach
   - Show the transformation

3. **Use Active Voice**: Make it engaging and direct
   - ✅ "We transformed the Central Kitchen into a profit center"
   - ❌ "The Central Kitchen was transformed into a profit center"

4. **Keep Paragraphs Short**: 2-3 sentences maximum
   - Improves readability
   - Better for mobile viewing

5. **Emphasize Key Points**: Use bold for important metrics and terms
   - ✅ "Net Profit Margin improved by **5%**"
   - ✅ "Within **6 months**"

### SEO Content Tips

1. **Include Keywords Naturally**: Don't keyword stuff, but naturally incorporate terms
2. **Use Headings Properly**: H2 for main sections, H3 for subsections
3. **Add Internal Links**: Link to related services, blog posts, or other case studies
4. **Optimize Images**: Use descriptive filenames and alt text
5. **Include Location**: Mention "Malaysia" or specific locations when relevant

### Formatting Guidelines

1. **Headings**: Use CSS classes for styling
   - `[.text-h3]` for main section headings
   - `[.text-h4]` for subsection headings

2. **Bold Text**: Use `**text**` for emphasis on:
   - Key metrics
   - Important terms
   - Section titles in lists

3. **Lists**: Use `<ListCheck>` for challenges and results
   - Format: `- **Title**: Description`

4. **Spacing**: Use horizontal rules (`---`) between major sections

---

## Complete Example

Here's a complete example of a well-structured, SEO-optimized case study:

```yaml
---
title: "From \"Expansion Trap\" to Profitable Growth"
metaTitle: "F&B Case Study: 5% Profit Margin Growth in 6 Months | MMC"
metaDescription: "How MMC transformed a multi-brand F&B chain from expansion losses to 5% profit margin growth. Strategic budgeting, unit economics, and organizational restructuring case study. SC Licensed since 2008."
date: 2022-09-19
description: "Discover how MMC transformed a multi-brand F&B chain from expansion-driven losses to profitable growth through strategic budgeting, unit economics, and organizational restructuring."

keywords:
  - "F&B case study"
  - "profit margin improvement"
  - "strategic budgeting Malaysia"
  - "restaurant financial planning"
  - "unit economics"
  - "profit growth case study"
  - "F&B chain transformation"
  - "restaurant profit optimization"
  - "Malaysia F&B financial advisory"
  - "SC licensed financial planner"

categories:
  - "F&B"

information:
  - icon: "User"
    label: "Client -"
    value: "Leading F&B Chain"
  - icon: "ChartNoAxesGantt"
    label: "Project Category -"
    value: "categories"
  - icon: "Timer"
    label: "Project Duration -"
    value: "6 Months"
  - icon: "PanelsTopLeft"
    label: "Live Website -"
    value: "Confidential"

image: "/images/portfolio/Transformation.webp"
imageAlt: "F&B chain profit transformation case study - MMC Financial Planning strategic budgeting success story showing 5% profit margin improvement"
masonryImage: "/images/portfolio/Transformation.webp"
---

## How a Leading F&B Chain Reinvented Its Financial Strategy

### Client Profile [.text-h4]

A well-established multi-brand F&B chain in Malaysia with over a decade of history. Despite significant revenue and a wide network of outlets, the company faced a critical paradox: aggressive expansion was eroding, rather than boosting, their bottom line.

---

## The Challenge: The "Growth Paradox" [.text-h3]

The client was caught in a classic "growth trap." While top-line revenue was impressive, net profit margins were shrinking dangerously. The core issues identified were:

<ListCheck>

- **Expansion without Strategy**: New outlets were opened based on gut feeling rather than data. Without a standardized "Unit Economic Model," many new locations were bleeding cash from day one, dragging down the profitable stores.

- **Eroding Margins**: A lack of centralized cost control meant that Cost of Goods Sold (COGS) and labor costs were spiraling. Purchasing power wasn't leveraged, and kitchen inefficiencies were rampant.

- **Organizational Silos**: The connection between the Central Kitchen (Production) and the Outlets (Sales) was broken. A blame culture existed where outlets complained about supply shortages while the kitchen cited poor forecasting. There was no clear ownership of the P&L.

- **Data Blindness**: The management team lacked real-time visibility into financial performance. Decisions were reactive, often made months after problems had already occurred.

- **Misaligned Incentives**: Staff were paid for attendance, not performance. There was no mechanism to reward efficiency or upselling, leading to a passive workforce.

</ListCheck>

---

## The Solution: The MMC Profit Budgeting Transformation [.text-h3]

<Notice type="info" title="4-Step Profit Growth Framework">

We implemented our proprietary 4-Step Profit Growth Framework to restructure the business from the ground up.

</Notice>

<Accordion label="Phase 1: Strategic Blueprinting & Modeling" group="solution-phases" expanded="true">

**The "Ideal Store" Model**: We didn't just look at the aggregate numbers. We dissected the P&L of their best-performing outlets to create a "Golden Standard" Unit Economic Model. This set strict benchmarks for rent, COGS, and labor for all future expansions.

**Central Kitchen Profit Center**: We transformed the Central Kitchen from a cost center into a profit center. By treating it as an internal supplier with its own P&L, we enforced efficiency and accountability in production.

</Accordion>

<Accordion label="Phase 2: Organizational Restructuring" group="solution-phases" expanded="false">

**Redefining Roles**: We clarified the blurred lines between HQ, Production, and Operations. A "Supply Chain Manager" role was established to bridge the gap between kitchen output and outlet demand, eliminating the "blame game."

**Accountability Matrices**: We introduced clear Job Descriptions (JDs) linked to specific financial outcomes. For example, the Purchasing Manager was now KPI-d on food cost savings, not just order fulfillment.

</Accordion>

<Accordion label="Phase 3: Incentive & Performance Engineering" group="solution-phases" expanded="false">

**Profit-Sharing Scheme**: We moved away from standard bonuses to a profit-sharing model for store managers. If their outlet exceeded the net profit target, they shared in the upside. This immediately shifted their mindset from "employee" to "business partner."

**Operational KPIs**: For frontline staff, we introduced simple, trackable metrics (e.g., upsell rate, wastage reduction) tied to monthly cash incentives.

</Accordion>

<Accordion label="Phase 4: The Rhythm of Execution" group="solution-phases" expanded="false">

**Monthly Management Reviews**: We instituted a disciplined monthly review cycle. Instead of just reporting numbers, these meetings focused on variance analysis (Budget vs. Actual) to identify and fix leaks immediately.

**Data-Driven Culture**: We implemented a dashboard that gave the founders real-time visibility into daily sales and weekly food costs, enabling proactive decision-making.

</Accordion>

---

## The Results: Clarity, Control, and Cash Flow [.text-h3]

<ListCheck>

- **Margin Recovery**: Within 6 months, the consolidated Net Profit Margin improved by **5%** through stricter cost controls and menu engineering.

- **Optimized Expansion**: The client closed 2 non-performing stores and opened 3 new ones that hit breakeven in record time, validating the new "Ideal Store" model.

- **Cultural Shift**: The toxic blame culture was replaced by a performance-driven culture. Store managers now actively manage their P&L, treating their outlets as their own businesses.

- **Strategic Confidence**: The founders moved from firefighting daily operations to focusing on strategic partnerships and long-term brand building.

</ListCheck>

<Notice type="success" title="Key Achievement">

Within **6 months**, the consolidated Net Profit Margin improved by **5%** through strategic implementation of our framework.

</Notice>

---

## Client Testimonial [.text-h3]

<Testimonial
  customerName="Founder"
  customerRole="Leading F&B Chain"
  customerCompanyName="Leading F&B Chain"
>

We used to think that 'more stores equals more money.' MMC showed us that 'more stores without a system equals more problems.' This transformation didn't just save us money; it gave us back our peace of mind. We now know exactly which levers to pull to drive profit.

</Testimonial>
```

---

## Quick Reference Checklist

Before publishing a case study, ensure:

### Frontmatter
- [ ] `title` is compelling and clear
- [ ] `metaTitle` is 50-60 characters with key metrics
- [ ] `metaDescription` is 150-160 characters with problem/solution/result
- [ ] `keywords` array has 8-12 relevant keywords
- [ ] Appropriate theme image selected based on case study focus
- [ ] `imageAlt` is descriptive and includes keywords naturally
- [ ] `date` is set correctly
- [ ] `categories` array is populated
- [ ] `information` fields are complete with proper icons

### Content
- [ ] Main title (H2) is descriptive
- [ ] Client Profile section included
- [ ] Challenge section uses `<ListCheck>` with 4-6 items
- [ ] Solution section uses `<Notice>` and `<Accordion>` components
- [ ] Results section uses `<ListCheck>` and `<Notice type="success">`
- [ ] Testimonial uses `<Testimonial>` component
- [ ] Horizontal rules (`---`) separate major sections
- [ ] Key metrics are bolded
- [ ] Specific numbers and timeframes included

### SEO
- [ ] Keywords naturally integrated in content
- [ ] Location mentioned when relevant
- [ ] Internal links to related content
- [ ] Images have descriptive alt text
- [ ] Content tells a clear story (problem → solution → result)

---

## Additional Resources

- **Component Examples**: See `src/content/pages/english/elements.mdx` for all available components
- **Icon Library**: Browse [Lucide Icons](https://lucide.dev/icons/) for available icons
- **Reference Case Study**: See `src/content/case-studies/english/case-studies-02.mdx` for a complete example

---

## Need Help?

If you need assistance writing a case study:
1. Review this guide
2. Check the reference case study (`case-studies-02.mdx`)
3. Use the component examples in `elements.mdx`
4. Follow the checklist above

Happy writing! 🚀

