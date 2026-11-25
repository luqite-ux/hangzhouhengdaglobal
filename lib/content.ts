export const FACTORY_METRICS = [
  {
    value: '2001',
    label: 'Founded',
    detail: '25+ years of cylindrical worm gear speed reducer manufacturing',
  },
  {
    value: '2,700 m²',
    label: '3 Workshops · 3 Lines',
    detail: 'Direct factory facility in Xiaoshan, Hangzhou',
  },
  {
    value: '4,000',
    label: 'Units / Month',
    detail: 'Monthly production capacity',
  },
  {
    value: '10 Days',
    label: 'Regular Lead Time',
    detail: '30-day cycle for bulk and custom orders',
  },
] as const

export const APPLICATIONS = [
  {
    icon: 'route',
    title: 'Belt Conveyors',
    text: 'Right-angle worm drives that turn motor speed into steady belt torque on conveyor drive stations.',
    series: ['NMRV', 'WP', 'WD'],
  },
  {
    icon: 'package-check',
    title: 'Packaging & Sorting Lines',
    text: 'Compact, low-noise drives for packaging, sorting and transfer conveyors where footprint matters.',
    series: ['NMRV', 'WP'],
  },
  {
    icon: 'boxes',
    title: 'Material Handling',
    text: 'Cast-iron housings for roller, chain and accumulation conveyors moving cartons, bags and parts.',
    series: ['WP', 'WD'],
  },
  {
    icon: 'cog',
    title: 'OEM Continuous-Duty Drives',
    text: 'Custom size, material, color and process for machine builders who need a repeatable drive supplied in volume.',
    series: ['WD', 'WP', 'NMRV'],
  },
] as const

export const WORKFLOW_STEPS = [
  {
    title: 'Specification Match',
    text: 'Send your series (WD, WP or NMRV), mounting model and quantity. We match the request to our standard range.',
    meta: 'MOQ 50 units',
  },
  {
    title: 'Custom Size, Color & Material',
    text: 'Need a different size, housing material, color or process? OEM and ODM changes are agreed before production starts.',
    meta: 'OEM / ODM supported',
  },
  {
    title: 'Production',
    text: 'Regular orders ship from a 10-day cycle. Bulk and custom orders run on a 30-day cycle. Expedited production is available on request.',
    meta: '10-day regular · 30-day bulk',
  },
  {
    title: 'Outgoing Inspection & Dispatch',
    text: 'Every order passes outgoing factory inspection before it leaves our Hangzhou factory for dispatch.',
    meta: 'Factory inspection',
  },
] as const

export const FAQS = [
  {
    q: 'Which reducer models do you manufacture?',
    a: 'We manufacture three worm gear speed reducer series: WD cylindrical (army-yellow / olive cast-iron housing), WP cast-iron (WPA / WPO / WPX / WPS mounting configurations, Zhenyu-green housing) and NMRV aluminum (silver die-cast housing, compact right-angle mounting).',
  },
  {
    q: 'Do you accept OEM and ODM orders?',
    a: 'Yes. We supply OEM and ODM orders directly from our Hangzhou factory. Send your drawing or specification with the quantity and we will confirm what is possible.',
  },
  {
    q: 'What can be customized?',
    a: 'Size, material, color and process can all be customized. Tell us what you need in the RFQ message and our sales team will reply with the details.',
  },
  {
    q: 'What is your minimum order quantity?',
    a: 'The MOQ is 50 units for every series: WD, WP and NMRV.',
  },
  {
    q: 'Do you offer bulk pricing?',
    a: 'Yes. We offer bulk cooperation pricing for larger and repeat orders. Include your target quantity in the RFQ and we will quote accordingly.',
  },
  {
    q: 'What are your lead times?',
    a: 'Regular orders have a 10-day lead time. Bulk and custom production runs on a 30-day cycle. Monthly capacity is 4,000 units across 3 production lines.',
  },
  {
    q: 'Can production be expedited?',
    a: 'Yes, expedited production is supported. Add your required date to the RFQ message and we will confirm what the schedule allows.',
  },
  {
    q: 'Are products inspected before shipment?',
    a: 'Yes. Orders go through outgoing factory inspection before they are dispatched from our Hangzhou factory.',
  },
] as const

export const RFQ_MODELS = [
  { value: 'WD', label: 'WD Series — Cylindrical Worm Gear' },
  { value: 'WPA', label: 'WP Series — WPA' },
  { value: 'WPO', label: 'WP Series — WPO' },
  { value: 'WPX', label: 'WP Series — WPX' },
  { value: 'WPS', label: 'WP Series — WPS' },
  { value: 'NMRV', label: 'NMRV Series — Aluminum Worm Gear' },
  { value: 'Custom', label: 'Custom / OEM / ODM' },
  { value: 'Not sure', label: 'Not sure — please advise' },
] as const
