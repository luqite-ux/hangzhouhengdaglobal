# Homepage Media Slot Plan & Buyer Conversion Path — 杭州恒达减速机械厂

## 1. Buyer Decision Coverage Matrix
| Buyer Role Question | Status | Verified Fact Source | Homepage Slot | Next CTA / Inner Route |
|---|---|---|---|---|
| 卖什么 / 如何选 (What & How to Select) | COVERED | 产品信息!R4-R6, FAQ!D4 | `core-reducer-series` + `interactive-3d-worm-gear-explorer` | Compare All Series (`/products`), Individual Series Detail |
| 适合谁或什么应用 (Applications) | COVERED | 产品信息!F4-F6, FAQ!D8,D10 | `conveyor-industrial-applications` | Conveyor & OEM Drive Fit -> `/products` / `/contact` |
| 为什么可信 (Why Trust) | COVERED | 企业资料!C15,C16,C18, 公司图片/1-8.jpeg | `factory-metrics-bar` + `manufacturing-workshop-evidence` | Tour Our Factory (`/manufacturing`), About (`/about`) |
| 如何合作 / 交付 (Cooperation & Delivery) | COVERED | FAQ!D5,D9,D11,D14,D21,D24,D28 | `oem-customization-workflow` + `procurement-faq-section` | OEM/ODM Process & FAQ -> `/contact` |
| 如何发起询盘 (How to Inquire) | COVERED | 企业资料!C4,C6 + info@hangzhouhengdaglobal.com | `direct-rfq-contact-section` | Request a Quote (`/contact`) with 4-digit CAPTCHA |

## 2. Existing Evidence Domains Check
- **Product Lines (WD, WP, NMRV)**: Covered on Home (`core-reducer-series`) + `/products` + 3 dedicated detail pages.
- **Applications (Conveyors & Machinery)**: Covered on Home (`conveyor-industrial-applications`) + product detail pages.
- **Factory, CNC Machining, Assembly, Inventory, Dispatch (8 real photos)**: Covered on Home (`manufacturing-workshop-evidence`) + full gallery on `/manufacturing` & `/about`.
- **OEM/ODM, MOQ 50, Lead Time, Outgoing Inspection, FAQ**: Covered on Home (`oem-customization-workflow`, `procurement-faq-section`) + `/contact`.
- **Video Decision**: `VIDEO-DEFAULT-OFF` (no videos supplied or enabled).
- **Certificates / Case Studies / Client Logos**: None supplied in customer materials; zero fabricated.

## 3. Section Logic & Media Slot Table
| section_id | Buyer Decision Info | Media Source & Slot | Desktop / 390px Layout | CTA Destination |
|---|---|---|---|---|
| `hero-banner-carousel` | Brand positioning & 3 core purchasing pillars | `banner背景图/1.jpg`, `2.jpg`, `3.jpg` (all 3 required) | Slide 1 dark text right; Slide 2-3 light text left; 390px stacked | `/products/nmrv-series-worm-gear-reducer`, `/products`, `/manufacturing` |
| `factory-metrics-bar` | Scale proof: 2001, 2,700 m², 4,000/mo, 10-day regular | Precision typography & icon strip | 4-col desktop / 2x2 mobile | `/about` |
| `core-reducer-series` | Compare WD vs WP vs NMRV | `产品（修改）/*.jpg` (2000x2000 clean white stage) | 3-col equal-height cards / 1-col mobile | `/products/[slug]` |
| `interactive-3d-worm-gear-explorer` | Interactive 3D right-angle worm-and-wheel meshing | Three.js PBR WebGL procedural 3D worm gearbox | 60/40 split desktop / stacked mobile | `/contact` |
| `conveyor-industrial-applications` | Conveyor & OEM machinery drive suitability | Semantic industrial vector diagrams + badges | 4-card grid / stacked mobile | `/products` |
| `manufacturing-workshop-evidence` | Real Hangzhou workshop, CNC, assembly & stock | `公司图片/1-8.jpeg` (curated primary + secondary) | Editorial bento grid / 2-col mobile | `/manufacturing` |
| `oem-customization-workflow` | OEM/ODM customization & 10/30-day delivery steps | Numbered engineering step rail | 4-col horizontal / vertical mobile | `/contact` |
| `procurement-faq-section` | Models, MOQ 50, custom, bulk pricing, inspection | Accessible 2-col accordion | 2-col balanced / 1-col mobile | `/contact` |
| `direct-rfq-contact-section` | Direct factory contact & structured quote request | Balanced left company/contact card + right RFQ form | 5:7 balanced split / stacked mobile | `/api/inquiries` |
