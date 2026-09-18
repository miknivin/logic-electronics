import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Cctv,
  Cpu,
  Database,
  Droplets,
  Globe,
  HardDrive,
  Mail,
  Megaphone,
  Network,
  PencilRuler,
  Phone,
  Printer,
  RefreshCcw,
  Repeat,
  Server,
  ShieldCheck,
  ShoppingBag,
  Wrench,
  ClipboardCheck,
} from "lucide-react";

export type ServiceCategory = {
  key: string;
  title: string;
  description: string;
  /** Shown on the home page category cards, and anywhere else a category
   *  needs a glyph, so the icon is defined once rather than per component. */
  icon: LucideIcon;
};

export type Service = {
  slug: string;
  title: string;
  category: string;
  icon: LucideIcon;
  /** Short line used on cards and as the page sub-heading. */
  tagline: string;
  /** One-sentence summary for listings and meta descriptions. */
  summary: string;
  /** Body paragraphs for the detail page. */
  overview: string[];
  /** What is actually included in the service. */
  offerings: { title: string; description: string }[];
  /** Quick reasons to choose Logic Electronics for this service. */
  highlights: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    key: "print-copier",
    title: "Printing & Copier Solutions",
    description:
      "Sales, rental, repair and consumables for every major copier and printer brand in the UAE.",
    icon: Printer,
  },
  {
    key: "it-infrastructure",
    title: "IT Infrastructure & Support",
    description:
      "Managed IT, datacenter, networking, security and backup services that keep your business running.",
    icon: Cpu,
  },
  {
    key: "security-communication",
    title: "Security & Communication",
    description:
      "CCTV, access control and unified communication systems for offices and facilities.",
    icon: Cctv,
  },
  {
    key: "digital",
    title: "Digital Solutions",
    description:
      "Websites, digital marketing and design that put your business in front of the right customers.",
    icon: Globe,
  },
  {
    key: "office-supplies",
    title: "Office Supplies & Equipment",
    description:
      "Stationery, electronics and genuine spare parts delivered to your door across the Emirates.",
    icon: ShoppingBag,
  },
];

export const services: Service[] = [
  /* ---------------------------------------------------------------- print */
  {
    slug: "copier-sales-and-service",
    title: "Copier Sales & Service",
    category: "print-copier",
    icon: Printer,
    tagline: "New and reconditioned multifunction copiers",
    summary:
      "We supply, install and service multifunction copiers from all the leading brands, new or professionally reconditioned.",
    overview: [
      "Most offices run on their copier, and when it goes down everybody notices. We help you pick a machine that matches what you actually print, install it, and look after it from there. The point is that you are not paying for capacity you will never use, and not fighting a machine that cannot keep up either.",
      "We cover everything from small desktop MFPs up to high volume production devices, including Canon, Konica Minolta, Kyocera, Ricoh, Sharp, Triumph-Adler, UTAX and Develop. Every machine we install gets configured, put on your network, and handed over with training for your team.",
    ],
    offerings: [
      {
        title: "New multifunction devices",
        description:
          "Current generation A3 and A4 colour and mono MFPs, chosen around your monthly volume and any finishing you need.",
      },
      {
        title: "Reconditioned office copiers",
        description:
          "Fully refurbished machines tested against manufacturer spec. A cheaper way into enterprise grade hardware.",
      },
      {
        title: "Installation and network setup",
        description:
          "We handle the physical install, driver rollout, scan to email, scan to folder and secure print release.",
      },
      {
        title: "Print volume assessment",
        description:
          "We look at what you print now and what it costs you before recommending anything, so the advice sits on real numbers.",
      },
      {
        title: "User training and handover",
        description:
          "A walkthrough on site covering day to day use, finishing options and the basic troubleshooting your team will need.",
      },
    ],
    highlights: [
      "All the major brands supplied and serviced",
      "New or certified reconditioned",
      "Free pickup and delivery",
      "Trade in your existing machines",
    ],
  },
  {
    slug: "printer-sales-and-repair",
    title: "Printer Sales & Repair",
    category: "print-copier",
    icon: Wrench,
    tagline: "Same day repair for any printer brand",
    summary:
      "We diagnose and repair laser, inkjet and multifunction printers, in warranty or out, whatever the brand.",
    overview: [
      "Printers never break at a convenient moment. Jams, feed failures, streaky prints, error codes, machines that quietly drop off the network. Our technicians look for what is actually causing the fault rather than clearing the error and hoping, and we fit branded parts so the repair holds.",
      "We will work on any brand: laser, colour laser, inkjet, designjet and multifunction. Out of warranty is not a problem. Send us the model and a description of what it is doing and we will come back with a quote before we touch anything.",
    ],
    offerings: [
      {
        title: "On site printer repair",
        description:
          "An engineer comes to your office and diagnoses it there. They carry the common spares, so most faults are done on the first visit.",
      },
      {
        title: "Workshop repair",
        description:
          "For bigger jobs we collect the machine, repair it at our service centre and bring it back. Collection and return cost you nothing.",
      },
      {
        title: "Common faults",
        description:
          "Paper feed problems, jams, print quality issues, fuser and drum faults, error codes and driver conflicts.",
      },
      {
        title: "Printer installation and setup",
        description:
          "Setting up new printers on individual PCs or across a whole office, including drivers and print queues.",
      },
      {
        title: "Printer sales",
        description:
          "New laser, inkjet and multifunction printers from HP, Brother, Canon, Epson, Kyocera and others.",
      },
    ],
    highlights: [
      "Any brand, no warranty restrictions",
      "You get a quote before we start",
      "Branded replacement parts",
      "Free collection and return",
    ],
  },
  {
    slug: "printer-and-copier-rental",
    title: "Printer & Copier Rental",
    category: "print-copier",
    icon: Repeat,
    tagline: "Short and long term rental with servicing included",
    summary:
      "Rent printers and copiers on flexible terms, with maintenance, toner and support all inside the monthly cost.",
    overview: [
      "Renting turns office printing from a capital purchase into a predictable monthly bill. It also moves the risk over to us, because maintenance, consumables and replacements become our problem rather than yours.",
      "Short term rental suits exhibitions, site offices, audits and busy spells. Long term suits offices that would rather not own hardware losing value every year. Either way you get the right machine, kept in good order, for as long as you need it.",
    ],
    offerings: [
      {
        title: "Short term rental",
        description:
          "Daily, weekly or monthly hire for events, temporary offices, project sites and seasonal peaks.",
      },
      {
        title: "Long term rental and leasing",
        description:
          "Contracts from a year upwards with a fixed monthly cost, scheduled servicing and an agreed page allowance.",
      },
      {
        title: "Everything included",
        description:
          "Toner, spare parts, preventive maintenance and breakdown support all sit inside the rental price. No unexpected invoices.",
      },
      {
        title: "Free replacement units",
        description:
          "If we cannot fix a rented machine on site, we swap it out, so your team is never left sitting without one.",
      },
      {
        title: "A fleet that scales",
        description:
          "Add, remove or upgrade machines as your headcount and print volume change through the contract.",
      },
    ],
    highlights: [
      "No money up front",
      "Toner and servicing included",
      "Terms from a few days to several years",
      "Free replacement if a machine fails",
    ],
  },
  {
    slug: "printer-amc",
    title: "Printer & Copier AMC",
    category: "print-copier",
    icon: ClipboardCheck,
    tagline: "Annual maintenance contracts that head off downtime",
    summary:
      "Annual maintenance contracts covering scheduled servicing, priority response and parts across your whole print fleet.",
    overview: [
      "An AMC is essentially insurance for your office equipment. Rather than waiting for something to break, we service your machines on a schedule: cleaning, calibrating, swapping worn parts and updating firmware before any of it turns into a fault.",
      "Customers on contract get priority response, agreed service levels and a cost they can budget for. Finance teams like it because repair spend stops arriving as a surprise. IT teams like it because a whole category of tickets simply goes away.",
    ],
    offerings: [
      {
        title: "Scheduled preventive maintenance",
        description:
          "Planned visits at agreed intervals for cleaning, calibration, worn part replacement and firmware updates.",
      },
      {
        title: "Priority breakdown response",
        description:
          "Contract customers go to the front of the queue, with same day response targets written into the agreement.",
      },
      {
        title: "Parts and labour cover",
        description:
          "Contract options that include parts and labour, so a big fault does not turn into a big invoice.",
      },
      {
        title: "Remote help desk",
        description:
          "Driver, queue and connection problems sorted out remotely, without waiting for somebody to travel to you.",
      },
      {
        title: "Fleet reporting",
        description:
          "A clear view of usage, service history and toner consumption across every machine on the contract.",
      },
    ],
    highlights: [
      "A fixed annual cost you can budget for",
      "Same day response for contract customers",
      "24/7 technical support line",
      "One contract covers mixed brand fleets",
    ],
  },
  {
    slug: "toner-and-cartridges",
    title: "Toner & Ink Cartridges",
    category: "print-copier",
    icon: Droplets,
    tagline: "Original, compatible and remanufactured consumables",
    summary:
      "Genuine, compatible and remanufactured toner, ink, ribbon and drum units for every printer and copier brand.",
    overview: [
      "Consumables are where print budgets quietly disappear. We stock original manufacturer cartridges for when you need guaranteed results, and good compatible or remanufactured ones for when the budget matters more. Both get tested on the machines we service.",
      "Set up a standing order and you stop running out halfway through a job. We keep an eye on how much you are getting through and deliver before you hit empty.",
    ],
    offerings: [
      {
        title: "Original toner cartridges",
        description:
          "Genuine manufacturer consumables for HP, Canon, Kyocera, Ricoh, Konica Minolta, Brother, Epson and more.",
      },
      {
        title: "Compatible and remanufactured",
        description:
          "Good quality alternatives that bring your cost per page down noticeably without hurting print quality.",
      },
      {
        title: "Ribbons and drum units",
        description:
          "Drums, developer units, transfer belts, fusers and ribbons for dot matrix and production machines.",
      },
      {
        title: "Scheduled replenishment",
        description:
          "We track usage across your fleet and send replacements out before anything runs dry.",
      },
      {
        title: "Bulk supply contracts",
        description:
          "Volume pricing for organisations running large or multi site print fleets.",
      },
    ],
    highlights: [
      "Originals and cheaper alternatives both stocked",
      "Consumables for every brand we service",
      "Free delivery across Abu Dhabi",
      "Standing orders so you never run out",
    ],
  },
  {
    slug: "refurbished-printers",
    title: "Refurbished Printers",
    category: "print-copier",
    icon: RefreshCcw,
    tagline: "Enterprise hardware for a lot less",
    summary:
      "Properly refurbished printers and copiers, fully tested and warranted. Enterprise capability on a smaller budget.",
    overview: [
      "A refurbished machine from a proper service centre is nothing like a second hand one off a classifieds site. Everything we sell gets stripped down, cleaned, fitted with new wear parts, rebuilt to manufacturer spec and test printed under load before it leaves us.",
      "What you end up with is serious hardware, often models that would be well out of reach when new, for a lot less money. It comes with a warranty, and it is backed by the same team that refurbished it.",
    ],
    offerings: [
      {
        title: "Certified refurbishment",
        description:
          "Full strip down, deep clean, wear part replacement, rebuild to spec and load testing before anything is sold.",
      },
      {
        title: "Warranty backed",
        description:
          "Every refurbished machine comes with a warranty, and you can add it to an AMC if you want ongoing cover.",
      },
      {
        title: "Enterprise models",
        description:
          "High volume A3 colour MFPs and production machines at a fraction of what they cost new.",
      },
      {
        title: "Trade in your old fleet",
        description:
          "We value your existing equipment, take it away and offset it against the replacements.",
      },
      {
        title: "Consumables you can rely on",
        description:
          "We only refurbish models we can keep supplying toner and spare parts for over the long run.",
      },
    ],
    highlights: [
      "Tested against manufacturer spec",
      "Warranty included",
      "Well below the price of new",
      "Trade ins accepted",
    ],
  },

  /* ------------------------------------------------------- infrastructure */
  {
    slug: "managed-it-services",
    title: "Managed IT Services",
    category: "it-infrastructure",
    icon: Cpu,
    tagline: "Your IT department, without hiring one",
    summary:
      "IT support covering AMC, on site and remote help, new office setup, consultation and relocation.",
    overview: [
      "Plenty of businesses do not need a full in house IT team, but all of them need IT that works. Our managed services put a certified team on call: handling the day to day tickets, keeping your infrastructure healthy, and telling you what is worth spending money on next.",
      "You can put us on an annual contract with set response times, or just call when something breaks. Either way you deal with the same engineers, so you are not explaining your setup from scratch every visit.",
    ],
    offerings: [
      {
        title: "IT AMC service",
        description:
          "Annual contracts covering your servers, workstations, network and peripherals, with agreed response times.",
      },
      {
        title: "On call and on site support",
        description:
          "A remote help desk for whatever can be fixed from here, and engineers on site for whatever cannot.",
      },
      {
        title: "New office IT setup",
        description:
          "The full build out for new premises: cabling, network, servers, workstations, printers and phones, working on day one.",
      },
      {
        title: "IT consultation",
        description:
          "Straight advice on infrastructure planning, when to refresh hardware, licensing and what to budget.",
      },
      {
        title: "Office shifting and datacenter relocation",
        description:
          "Planned decommissioning, transport and recommissioning of your IT, with as little downtime as we can manage.",
      },
      {
        title: "Structured cabling",
        description:
          "Certified data and voice cabling, patch panels, containment and labelling, done to a standard you can maintain.",
      },
    ],
    highlights: [
      "24/7 support with a remote help desk",
      "Certified engineers across the UAE",
      "Fixed monthly or annual pricing",
      "One provider for IT, print and security",
    ],
  },
  {
    slug: "datacenter-solutions",
    title: "IT Datacenter Solutions",
    category: "it-infrastructure",
    icon: Server,
    tagline: "Servers, storage and the room they sit in",
    summary:
      "Server and storage deployment, virtualisation, UPS, environmental control and raised flooring for your server room.",
    overview: [
      "Your server room is the one thing everything else depends on. We design, supply and commission the whole environment: compute, storage, power protection, cooling and the physical infrastructure, as a single system rather than a pile of separate parts.",
      "Whether you are fitting out a comms room in a new office or consolidating ageing servers onto a virtual platform, we size it around the work it actually has to do and leave you room to grow.",
    ],
    offerings: [
      {
        title: "Servers and storage",
        description:
          "Rack and tower servers, SAN and DAS storage sized to your workload, supplied, racked and commissioned.",
      },
      {
        title: "NAS storage",
        description:
          "Network attached storage for shared files, departmental drives and backup targets.",
      },
      {
        title: "Virtualisation",
        description:
          "Consolidating physical servers onto a virtual platform for better use of hardware, simpler backups and quicker recovery.",
      },
      {
        title: "UPS solutions",
        description:
          "Uninterruptible power supplies sized for your load, with battery replacement and monitoring.",
      },
      {
        title: "Environmental control",
        description:
          "Precision cooling plus temperature and humidity monitoring that alerts you before conditions start damaging hardware.",
      },
      {
        title: "Raised floor systems",
        description:
          "Raised access flooring for tidy cable runs, proper airflow and safe access when something needs work.",
      },
    ],
    highlights: [
      "We design the room, not just supply boxes",
      "Recommendations are not tied to one vendor",
      "Capacity planned with growth in mind",
      "Commissioning and documentation included",
    ],
  },
  {
    slug: "networking-and-switching",
    title: "Networking & Switching",
    category: "it-infrastructure",
    icon: Network,
    tagline: "Connectivity you do not have to think about",
    summary:
      "Design and installation of routers, switches, business Wi-Fi, VPN and structured cabling.",
    overview: [
      "A good network is one nobody talks about. We build networks that stay that way: properly segmented, sized correctly, documented and monitored, so traffic moves and problems get found quickly when they do turn up.",
      "That runs from a switch and Wi-Fi refresh in a single office to multi site connectivity with VPN and WAN optimisation. We do the design, supply the hardware, configure it and support it afterwards.",
    ],
    offerings: [
      {
        title: "Firewalls and routers",
        description:
          "Business grade edge devices set up for secure internet access, traffic policy and remote connections.",
      },
      {
        title: "Switching",
        description:
          "Managed switches with VLAN segmentation, PoE for phones and cameras, and redundant links.",
      },
      {
        title: "Wi-Fi services",
        description:
          "Wireless designed off a proper site survey, with controller managed access points, guest networks and roaming that works.",
      },
      {
        title: "VPN solutions",
        description:
          "Site to site and remote access VPN, so branch offices and people working from home connect securely.",
      },
      {
        title: "WAN optimisation",
        description:
          "Traffic shaping, link aggregation and failover, so you get more out of the bandwidth you already pay for.",
      },
      {
        title: "Structured cabling",
        description:
          "Certified Cat6 and fibre with patch panels, containment, labelling and test results.",
      },
    ],
    highlights: [
      "Site survey before we design anything",
      "Everything documented and labelled",
      "Certified cabling with test results",
      "Ongoing monitoring and support available",
    ],
  },
  {
    slug: "cybersecurity-services",
    title: "Cybersecurity Services",
    category: "it-infrastructure",
    icon: ShieldCheck,
    tagline: "Practical protection for your business data",
    summary:
      "Next generation firewalls, endpoint protection, encryption, email security and vulnerability management.",
    overview: [
      "Security is not something you install once and forget about. It works in layers: at the perimeter, on the endpoint, in the mailbox, and in how your staff behave day to day. We put those layers in sensibly and keep them current.",
      "We start by working out what actually needs protecting and what you are obliged to comply with, then put in controls that match. We are not going to sell you things you will never switch on.",
    ],
    offerings: [
      {
        title: "Next generation firewall",
        description:
          "Application aware perimeter security with intrusion prevention, content filtering and threat intelligence.",
      },
      {
        title: "Endpoint security",
        description:
          "Centrally managed protection for workstations, laptops and servers, with detection and response built in.",
      },
      {
        title: "Device encryption",
        description:
          "Full disk encryption on laptops and removable media, so a lost device does not turn into a data breach.",
      },
      {
        title: "Email security",
        description:
          "Secure mail gateways filtering phishing, spoofing, malware and business email compromise attempts.",
      },
      {
        title: "Vulnerability management",
        description:
          "Regular scans of your estate, with the findings prioritised and explained in plain language.",
      },
      {
        title: "Security awareness training",
        description:
          "Staff training and simulated phishing, so your people become part of the defence rather than the weak point.",
      },
      {
        title: "Privileged access management",
        description:
          "PAM to control, monitor and audit administrator access to your critical systems.",
      },
    ],
    highlights: [
      "Layers that match your actual risk",
      "Centrally managed and monitored",
      "Staff training included",
      "Findings reported in plain language",
    ],
  },
  {
    slug: "data-backup-and-protection",
    title: "Data Backup & Protection",
    category: "it-infrastructure",
    icon: Database,
    tagline: "Backups that actually restore",
    summary:
      "Cloud and on premise backup for servers, workstations, virtual machines, databases and NAS, plus DLP.",
    overview: [
      "A backup nobody has ever restored from is a hope, not a safety net. We build backup around two questions: how quickly you need to be running again, and how much data you could stand to lose. Then we test the restores so you know the answer holds.",
      "Most businesses land on a mix. Local copies for quick restores, cloud copies for disaster recovery and ransomware. We set both up, watch them, and check they are still working.",
    ],
    offerings: [
      {
        title: "Cloud data backup",
        description:
          "Encrypted off site backup, with retention set to match your compliance and recovery requirements.",
      },
      {
        title: "On premise backup",
        description:
          "Local backup appliances and targets for fast, large restores that do not depend on your internet connection.",
      },
      {
        title: "Workstation and NAS backup",
        description:
          "Cover for the data living outside the server room, on laptops, desktops and network storage.",
      },
      {
        title: "Virtual machine backup",
        description:
          "Image level VM backup with instant recovery, so a whole server can come back in minutes.",
      },
      {
        title: "Database backup",
        description:
          "Application aware backup for SQL and other databases, with point in time recovery.",
      },
      {
        title: "Data loss prevention",
        description:
          "Policies that stop sensitive data leaving through email, USB drives or cloud storage.",
      },
    ],
    highlights: [
      "Recovery targets agreed before we start",
      "Restores tested, not assumed",
      "Local and cloud working together",
      "Checked daily, with alerts when something fails",
    ],
  },
  {
    slug: "business-email-solutions",
    title: "Business Email Solutions",
    category: "it-infrastructure",
    icon: Mail,
    tagline: "Professional email, set up properly",
    summary:
      "Microsoft 365 and Google Workspace licensing, hosted email, migration, secure gateways and signature management.",
    overview: [
      "Email is still how most business gets done, and it is still the most common way attackers get in. We licence it, set it up, move you across and secure it, so it is both professional and defensible.",
      "Migration is the part most people dread. We plan it properly. Mailboxes, calendars, contacts, shared folders and archives all come across, without losing mail and without wrecking anyone's working day.",
    ],
    offerings: [
      {
        title: "Microsoft 365 business plans",
        description:
          "Licensing, tenant setup, mailboxes and configuration for Teams, SharePoint and OneDrive.",
      },
      {
        title: "Google Workspace",
        description:
          "Domain setup, user accounts, Drive structure and administrative policies.",
      },
      {
        title: "Business email hosting",
        description:
          "Reliable mailboxes on your own domain, with webmail, mobile sync and plenty of storage.",
      },
      {
        title: "Email server migration",
        description:
          "Moving mailboxes, calendars, contacts and archives off your current platform without losing anything.",
      },
      {
        title: "Secure mail gateway",
        description:
          "Filtering in both directions against spam, phishing, malware and impersonation.",
      },
      {
        title: "Automated email signatures",
        description:
          "Consistent, centrally managed signatures applied to every user and device automatically.",
      },
    ],
    highlights: [
      "Nothing lost in the migration",
      "SPF, DKIM and DMARC set up correctly",
      "Security in place from the start",
      "Ongoing administration if you want it",
    ],
  },

  /* ------------------------------------------------ security & comms */
  {
    slug: "cctv-surveillance",
    title: "CCTV & Surveillance",
    category: "security-communication",
    icon: Cctv,
    tagline: "HD surveillance for homes and businesses",
    summary:
      "Design, supply and installation of HD CCTV for homes and commercial premises, with remote viewing.",
    overview: [
      "We do HD CCTV for homes and businesses. It starts with a walk around the site to work out what you actually need to see: entrances, tills, stockrooms, perimeters, car parks, and where a camera will give you footage worth having.",
      "From there we pick cameras with the right resolution, lens and low light performance, size the recorder and storage for how long you need to keep footage, and set up secure remote viewing so you can check any camera from your phone.",
    ],
    offerings: [
      {
        title: "Site survey and design",
        description:
          "Coverage planning that finds the blind spots and specifies the camera, position and lens for each one.",
      },
      {
        title: "Camera supply and installation",
        description:
          "Indoor, outdoor, dome, bullet and PTZ cameras from Hikvision and others, installed properly.",
      },
      {
        title: "Recording and storage",
        description:
          "NVR and DVR systems sized so footage lasts as long as your policy or your regulator requires.",
      },
      {
        title: "Remote and mobile viewing",
        description:
          "Secure live and recorded access from a phone, tablet or desktop, wherever you happen to be.",
      },
      {
        title: "Maintenance and support",
        description:
          "Scheduled cleaning, focus checks, firmware updates and recorder health checks on an annual contract.",
      },
    ],
    highlights: [
      "Residential and commercial",
      "Coverage planned before we quote",
      "View it from any device",
      "Maintenance contracts available",
    ],
  },
  {
    slug: "communication-and-lv-systems",
    title: "Communication & LV Systems",
    category: "security-communication",
    icon: Phone,
    tagline: "Phones, door access and low current systems",
    summary:
      "IP telephony, conference room systems, access control, biometric attendance and intercom installation.",
    overview: [
      "Low current systems are the quiet infrastructure that makes a building work: the phones, the door readers, the attendance terminals, the meeting room kit. We install and integrate all of it, usually over the same cabling we run for your network.",
      "Because the network and the LV systems are done by one team, everything is designed to live together. PoE budgets that add up, VLANs that keep voice traffic clean, and one number to call when something needs attention.",
    ],
    offerings: [
      {
        title: "IP phone solutions",
        description:
          "IP PBX and handsets with extensions, call routing, voicemail, IVR and call recording.",
      },
      {
        title: "Conference solutions",
        description:
          "Meeting room audio and video that connects to Teams, Zoom and Google Meet without a fight.",
      },
      {
        title: "Access control",
        description:
          "Card, fob and PIN entry with permissions per person, time schedules and a full audit log.",
      },
      {
        title: "Biometric attendance",
        description:
          "Fingerprint and face recognition terminals, with reports that export straight into payroll.",
      },
      {
        title: "Intercom systems",
        description:
          "Audio and video intercom for reception, gates and residential entrances, answerable from a phone.",
      },
    ],
    highlights: [
      "Installed and integrated by one team",
      "Shares your structured cabling",
      "Attendance data exports to payroll",
      "Support contracts across every system",
    ],
  },

  /* ------------------------------------------------------------- digital */
  {
    slug: "website-design-and-development",
    title: "Website Design & Development",
    category: "digital",
    icon: Globe,
    tagline: "Websites that pull their weight",
    summary:
      "Domain, hosting, design, development, maintenance, security and migration for business websites.",
    overview: [
      "For a lot of customers your website is the first thing they see of you. We build sites that load quickly, read properly on a phone, and are easy for your own team to update without calling a developer every time a price changes.",
      "We can take on as much of it as you want: domain and hosting, design and build, ongoing maintenance, security, or moving you off a provider you have outgrown.",
    ],
    offerings: [
      {
        title: "Domain and web hosting",
        description:
          "Domain registration and monitored hosting, with SSL certificates and daily backups included.",
      },
      {
        title: "Design and development",
        description:
          "Responsive, accessible, search friendly sites built around what your customers are actually trying to do.",
      },
      {
        title: "Website maintenance",
        description:
          "Annual cover for updates, plugin patching, content changes, uptime monitoring and backups.",
      },
      {
        title: "Website security",
        description:
          "Hardening, malware scanning, a web application firewall, and a fast response if a site does get hit.",
      },
      {
        title: "Website audit",
        description:
          "A technical, performance, SEO and accessibility review, with a list of what to fix first.",
      },
      {
        title: "Website migration",
        description:
          "Changing host or platform without downtime, broken links or losing your search rankings.",
      },
    ],
    highlights: [
      "Built for phones first, and fast",
      "Your own team can edit it",
      "SSL, backups and monitoring included",
      "Set up to be found in search",
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "digital",
    icon: Megaphone,
    tagline: "Get found by people already looking",
    summary:
      "Search engine optimisation, Google Ads and social media marketing, measured on the enquiries they bring in.",
    overview: [
      "Marketing money is only worth spending if you can see what came back. We concentrate on the channels where people are already looking for what you sell, and we report on enquiries and cost per lead rather than likes and impressions.",
      "If you want to build organic rankings over time, we will do that. If you need enquiries starting tomorrow, paid search will get you there. We build the campaign, run it, and show you exactly what it produced.",
    ],
    offerings: [
      {
        title: "Search engine optimisation",
        description:
          "Technical fixes, on page work, local SEO and content that builds visibility that lasts.",
      },
      {
        title: "Google Ads management",
        description:
          "Campaign build, keyword research, ad copy, landing pages and ongoing work on bids and budget.",
      },
      {
        title: "Social media marketing",
        description:
          "Content planning, scheduling and paid campaigns on the platforms your customers actually use.",
      },
      {
        title: "Local search presence",
        description:
          "Google Business Profile and directory listings sorted out, so you turn up in local map results.",
      },
      {
        title: "Reporting and analytics",
        description:
          "Monthly reporting on traffic, rankings, enquiries and cost per lead, written in plain language.",
      },
    ],
    highlights: [
      "Judged on enquiries, not impressions",
      "We know local UAE search",
      "Clear monthly reporting",
      "No long lock in",
    ],
  },
  {
    slug: "graphic-design-and-printing",
    title: "Graphic Design & Offset Printing",
    category: "digital",
    icon: PencilRuler,
    tagline: "Design and print in one place",
    summary:
      "Company profiles, brochures, flyers, business cards, letterheads, roll ups and branded gift items.",
    overview: [
      "We design and we print, so artwork turns up at the press ready to go: right bleed, right colour space, right stock. There is none of the back and forth between a designer who does not print and a printer who did not design it.",
      "It can be a single box of business cards or a full company profile with exhibition roll ups and branded giveaways. All from one place, and all looking like they belong together.",
    ],
    offerings: [
      {
        title: "Profiles and brochures",
        description:
          "Company profiles, product catalogues and brochures, designed and printed to a proper finish.",
      },
      {
        title: "Flyers, posters and roll ups",
        description:
          "Promotional print and exhibition material, including pull up banners and display graphics.",
      },
      {
        title: "Business stationery",
        description:
          "Visiting cards, letterheads, envelopes, invoice books and official document printing.",
      },
      {
        title: "Offset and digital printing",
        description:
          "Offset for long runs, digital for short runs and quick turnaround.",
      },
      {
        title: "Branded gift items",
        description:
          "Pens, bags, caps, notebooks and corporate giveaways with your branding on them.",
      },
      {
        title: "Social media graphics",
        description:
          "Post and story templates that keep everything looking consistent online.",
      },
    ],
    highlights: [
      "Design and print under one roof",
      "Artwork always press ready",
      "Short runs and long runs",
      "Your branding applied consistently",
    ],
  },

  /* ------------------------------------------------------------ supplies */
  {
    slug: "office-stationery",
    title: "Office & School Stationery",
    category: "office-supplies",
    icon: ShoppingBag,
    tagline: "Everything the office runs on, delivered",
    summary:
      "Office, school and laboratory stationery, art and craft supplies and paper products, on scheduled delivery.",
    overview: [
      "Alongside the service side of the business we supply the everyday things that keep offices, schools and labs going. One supplier, one account and one delivery, instead of chasing five different vendors every month.",
      "Set up a standing order and we deliver on whatever schedule suits you. Most orders in Abu Dhabi arrive the next working day.",
    ],
    offerings: [
      {
        title: "Office stationery",
        description:
          "Paper, files, folders, pens, desk accessories and the printing paper you get through every week.",
      },
      {
        title: "School and educational supplies",
        description:
          "Notebooks, exercise books, classroom materials and bulk supply for schools and institutions.",
      },
      {
        title: "Laboratory equipment",
        description:
          "Lab consumables, glassware and equipment for schools, colleges and commercial laboratories.",
      },
      {
        title: "Art and craft supplies",
        description:
          "Drawing, painting and craft materials for classrooms, studios and activity programmes.",
      },
      {
        title: "Scheduled replenishment",
        description:
          "Standing orders delivered weekly or monthly, so nothing quietly runs out on you.",
      },
    ],
    highlights: [
      "One supplier for the whole office",
      "Next working day in Abu Dhabi",
      "Bulk and contract pricing",
      "Standing order accounts",
    ],
  },
  {
    slug: "computers-and-electronics",
    title: "Computers & Office Electronics",
    category: "office-supplies",
    icon: Boxes,
    tagline: "Hardware supplied, set up and supported",
    summary:
      "Laptops, desktops, tablets, monitors, TVs and peripherals from the leading brands, supplied and configured.",
    overview: [
      "We supply the full range of office electronics: laptops, desktops, tablets, monitors, LED and LCD displays, keyboards, mice and accessories, from Dell, HP, Lenovo, ASUS, Logitech and NEC among others.",
      "Since we are a service centre first, hardware does not just arrive in a box. It comes imaged, joined to your domain, with the software already on it, ready for someone to sign in.",
    ],
    offerings: [
      {
        title: "Laptops and desktops",
        description:
          "Business machines from Dell, HP, Lenovo and ASUS, specified for the work they will actually be doing.",
      },
      {
        title: "Monitors and displays",
        description:
          "Desktop monitors and large format LED and LCD screens for meeting rooms, receptions and signage.",
      },
      {
        title: "Tablets and mobile accessories",
        description:
          "Tablets, cases, chargers, docks and accessories for people working away from a desk.",
      },
      {
        title: "Peripherals and accessories",
        description:
          "Keyboards, mice, headsets, webcams, docking stations, cables and adapters.",
      },
      {
        title: "Deployment and configuration",
        description:
          "Machines imaged, joined to the domain, loaded with software and with data moved over before they reach the desk.",
      },
    ],
    highlights: [
      "Supplied through authorised channels",
      "Configured before it arrives",
      "Data moved off the old machine",
      "Covered by your IT AMC",
    ],
  },
  {
    slug: "genuine-spare-parts",
    title: "Genuine Spare Parts",
    category: "office-supplies",
    icon: HardDrive,
    tagline: "The right part, on the shelf",
    summary:
      "Genuine batteries, adapters, RAM, hard drives, SSDs and replacement components for laptops and office equipment.",
    overview: [
      "Most hardware faults are one failed component away from a working machine. We keep genuine spares in stock, so a repair usually gets finished on the same visit instead of waiting weeks on a special order.",
      "Upgrades work much the same way. Adding memory, or moving a laptop from a spinning drive to an SSD, is usually the cheapest speed improvement going. We do the swap and move your data across.",
    ],
    offerings: [
      {
        title: "Laptop batteries and adapters",
        description:
          "Genuine replacement batteries and power adapters for all the major laptop brands.",
      },
      {
        title: "Memory upgrades",
        description:
          "Compatible memory supplied and fitted, to get more life out of the machines you already have.",
      },
      {
        title: "Hard drives and SSDs",
        description:
          "Mechanical drives and solid state drives supplied, fitted and cloned with your data intact.",
      },
      {
        title: "Printer and copier spares",
        description:
          "Fusers, rollers, drums, transfer belts and mechanical parts for the machines we service.",
      },
      {
        title: "Component level repair",
        description:
          "Diagnosis down to the part that failed, so you replace a component instead of a whole machine.",
      },
    ],
    highlights: [
      "Genuine parts, not grey market",
      "Common spares kept in stock",
      "Data moved when we replace a drive",
      "Fitting included",
    ],
  },
];

/* ----------------------------------------------------------------- helpers */

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(categoryKey: string): Service[] {
  return services.filter((service) => service.category === categoryKey);
}

export function getCategory(key: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.key === key);
}

/** Services shown on the home page, one flagship from each area of the business. */
export const featuredServiceSlugs = [
  "copier-sales-and-service",
  "printer-sales-and-repair",
  "printer-amc",
  "managed-it-services",
  "networking-and-switching",
  "cybersecurity-services",
  "cctv-surveillance",
  "office-stationery",
] as const;

export const featuredServices = featuredServiceSlugs
  .map((slug) => getService(slug))
  .filter((service): service is Service => Boolean(service));
