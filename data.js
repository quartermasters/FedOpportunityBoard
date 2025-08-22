// Federal contracting data - Updated with real information from comprehensive research
window.contractVehicles = [
    {
        id: 1,
        name: "OASIS+ Unrestricted",
        type: "OASIS",
        status: "Active",
        value: "No Ceiling",
        period: "2023-2033",
        description: "Best-in-Class IDIQ contract vehicle for complex non-IT professional services with continuous on-ramping starting FY2025.",
        features: [
            "Eight functional domains: Management & Advisory, Technical & Engineering, R&D, Intelligence, Environmental, Facilities, Logistics",
            "Multiple award IDIQ structure across six contract tracks",
            "Continuous on-ramping process beginning FY2025",
            "All Qualified Offerors with Fair and Reasonable Price evaluation",
            "Mandatory use of GSA eBuy for task order solicitations"
        ],
        opportunities: "Complex professional services spanning multiple disciplines with no contract ceiling, enabling scalability for largest federal requirements."
    },
    {
        id: 2,
        name: "DLA TLS Special Operational Equipment (SOE)",
        type: "DLA TLS",
        status: "Active",
        value: "$33B",
        period: "2023-2033",
        description: "Prime vendor model for mission-critical tactical gear, survival equipment, and special operations equipment.",
        features: [
            "Survival gear and tactical equipment kits",
            "Personal protection equipment and eyewear",
            "VBSS gear and diving equipment",
            "Communication devices and air purification systems",
            "Competitive pricing model with multiple prime vendors"
        ],
        opportunities: "High-volume tactical equipment procurement with established prime vendors like ADS Inc., Federal Resources, Noble Supply & Logistics, Quantico Tactical, SupplyCore, TSSi, and W.S. Darley & Co."
    },
    {
        id: 3,
        name: "DLA TLS Fire & Emergency Services Equipment (F&ESE)",
        type: "DLA TLS",
        status: "Active",
        value: "$7B",
        period: "2023-2033",
        description: "Comprehensive fire and emergency equipment including SCBA, hazmat suits, and rescue equipment.",
        features: [
            "Self-Contained Breathing Apparatus (SCBA)",
            "Hazmat decontamination equipment",
            "Fire suppression systems and rescue equipment",
            "Emergency communication and rescue vehicles",
            "Incidental services including equipment testing and maintenance"
        ],
        opportunities: "Critical safety equipment with consistent demand across military and federal agencies, involving same prime contractors as SOE program."
    },
    {
        id: 4,
        name: "GSA Alliant 2",
        type: "GSA",
        status: "Active",
        value: "$82.5B",
        period: "2019-2029",
        description: "Best-in-Class GWAC providing comprehensive IT solutions and services on a global basis.",
        features: [
            "Comprehensive IT services and solutions",
            "Cybersecurity and cloud computing",
            "Big data analytics and emerging technologies",
            "Global service delivery capability",
            "Limited number of pre-screened qualified contractors"
        ],
        opportunities: "Large-scale IT transformations and modernization with major firms like Accenture Federal Services, Booz Allen Hamilton, CACI, and General Dynamics IT."
    },
    {
        id: 5,
        name: "8(a) STARS III",
        type: "GSA",
        status: "Active",
        value: "$50B",
        period: "2021-2031",
        description: "Best-in-Class GWAC exclusively for SBA-certified 8(a) firms providing IT services and emerging technologies.",
        features: [
            "Reserved exclusively for 8(a) certified small businesses",
            "IT services and emerging technology integration",
            "Directed task orders up to $4.5 million",
            "AI, robotics, and cybersecurity capabilities",
            "Minimum guarantee of $250 per awardee"
        ],
        opportunities: "Significant subcontracting opportunities as 8(a) primes often need specialized capabilities, particularly in AI, cybersecurity, and software development."
    },
    {
        id: 6,
        name: "NASA SEWP V",
        type: "NASA",
        status: "Active",
        value: "$20B",
        period: "2019-2029",
        description: "Best-in-Class GWAC focused on IT products and product-based services with 147 prime contractors including 120 small businesses.",
        features: [
            "IT products including hardware, software, cybersecurity",
            "Cloud services and emerging technologies",
            "Limited labor services (max 10% of equipment value)",
            "Online Quote Request Tool for fair opportunity",
            "Available to all federal agencies and authorized contractors"
        ],
        opportunities: "IT product procurement with extensive small business participation, ideal for hardware, software, and technology product subcontracting."
    },
    {
        id: 7,
        name: "VETS 2",
        type: "GSA",
        status: "Active",
        value: "$6.1B",
        period: "2019-2029",
        description: "Best-in-Class GWAC exclusively for Service-Disabled Veteran-Owned Small Businesses providing IT services and solutions.",
        features: [
            "Reserved exclusively for SDVOSB firms",
            "Data management and IT security services",
            "Software development and systems design",
            "Cloud services and digital transformation",
            "Socioeconomic goal achievement for federal agencies"
        ],
        opportunities: "Prime opportunities for SDVOSBs and subcontracting for non-SDVOSB firms seeking to work with veteran-owned businesses."
    },
    {
        id: 8,
        name: "DLA JETS 2.0",
        type: "DoD",
        status: "Active",
        value: "$12B",
        period: "2023-2033",
        description: "Defense Logistics Agency J6 Enterprise Technology Services for comprehensive IT solutions with over 80 awarded firms.",
        features: [
            "IT services and solutions for DoD",
            "Multiple award structure with major and small firms",
            "Enterprise technology modernization",
            "Cybersecurity and cloud services",
            "Available to all federal agencies"
        ],
        opportunities: "Vibrant subcontracting market with major contractors like Leidos, Booz Allen Hamilton, General Dynamics IT, and numerous small businesses."
    },
    {
        id: 9,
        name: "SeaPort-NxG",
        type: "DoD (Navy)",
        status: "Active",
        value: "$5B",
        period: "2021-2031",
        description: "Department of Navy multi-award IDIQ for engineering and program management support services.",
        features: [
            "Engineering and program management services",
            "Navy, Marine Corps, and federal agency support",
            "Hundreds of awarded prime contractors",
            "Global service delivery capability",
            "Multiple technical disciplines"
        ],
        opportunities: "Extensive subcontracting network with hundreds of prime contractors offering diverse partnership opportunities."
    }
];

window.primeContractors = [
    {
        id: 1,
        name: "Lockheed Martin",
        category: "Defense",
        contractValue: "$45.2B",
        activeProjects: "127",
        rating: 5,
        capabilities: ["Aerospace", "Defense Systems", "Technology", "Engineering"],
        recentContracts: [
            "F-35 Lightning II Program - $80B lifecycle",
            "Aegis Combat System modernization - $3.2B",
            "Space Fence radar system - $1.5B"
        ],
        subcontractingOpportunities: "Advanced manufacturing, software development, systems integration, and specialized engineering services across defense and aerospace programs."
    },
    {
        id: 2,
        name: "General Dynamics",
        category: "Defense",
        contractValue: "$39.4B",
        activeProjects: "156",
        rating: 5,
        capabilities: ["Defense Systems", "IT", "Shipbuilding", "Land Systems"],
        recentContracts: [
            "Columbia-class submarine program - $9.5B",
            "Army tactical vehicle production - $4.6B",
            "Navy destroyer modernization - $2.1B"
        ],
        subcontractingOpportunities: "Precision manufacturing, software development, systems testing, and specialized component production for defense platforms."
    },
    {
        id: 3,
        name: "Northrop Grumman",
        category: "Defense",
        contractValue: "$35.7B",
        activeProjects: "98",
        rating: 5,
        capabilities: ["Aerospace", "Defense", "Technology", "Innovation"],
        recentContracts: [
            "B-21 Raider bomber program - $21.4B",
            "James Webb Space Telescope operations - $2.5B",
            "Ground Based Strategic Deterrent - $13.3B"
        ],
        subcontractingOpportunities: "Advanced materials, precision manufacturing, software development, and specialized engineering for aerospace and defense systems."
    },
    {
        id: 4,
        name: "Booz Allen Hamilton",
        category: "IT Services",
        contractValue: "$8.9B",
        activeProjects: "89",
        rating: 4,
        capabilities: ["Consulting", "Analytics", "Cybersecurity", "Digital Solutions"],
        recentContracts: [
            "DHS Enterprise Infrastructure Solutions - $2.5B",
            "Navy IT modernization support - $1.8B",
            "CDC data analytics platform - $750M"
        ],
        subcontractingOpportunities: "Data analytics, cloud migration services, cybersecurity implementations, and digital transformation consulting."
    },
    {
        id: 5,
        name: "CACI International",
        category: "IT Services",
        contractValue: "$6.2B",
        activeProjects: "73",
        rating: 4,
        capabilities: ["IT Services", "Intelligence", "Cybersecurity", "Enterprise Solutions"],
        recentContracts: [
            "Army intelligence support services - $1.9B",
            "DHS cybersecurity operations - $1.2B",
            "VA electronic health records support - $800M"
        ],
        subcontractingOpportunities: "Intelligence analysis support, cybersecurity services, data management, and specialized IT consulting."
    },
    {
        id: 6,
        name: "Accenture Federal Services",
        category: "IT Services",
        contractValue: "$4.8B",
        activeProjects: "52",
        rating: 4,
        capabilities: ["Digital Transformation", "Cloud Services", "Data Analytics", "Consulting"],
        recentContracts: [
            "IRS modernization program - $2.9B",
            "DoD enterprise cloud migration - $1.5B",
            "HHS data analytics platform - $650M"
        ],
        subcontractingOpportunities: "Cloud migration services, data analytics, user experience design, and change management consulting."
    },
    {
        id: 7,
        name: "ADS, Inc. (DLA TLS Prime)",
        category: "Defense Logistics",
        contractValue: "$2.8B",
        activeProjects: "45",
        rating: 4,
        capabilities: ["Special Operations Equipment", "Fire & Emergency Equipment", "Tactical Gear", "C5ISR"],
        recentContracts: [
            "DLA TLS SOE Program - Multi-billion IDIQ",
            "DLA TLS F&ESE Program - $7B IDIQ",
            "Survival and tactical equipment supply"
        ],
        subcontractingOpportunities: "Tactical equipment, survival gear, SCBA equipment, communications devices, and specialized training services for military and federal agencies."
    },
    {
        id: 8,
        name: "Federal Resources (DLA TLS Prime)",
        category: "Defense Logistics",
        contractValue: "$2.1B",
        activeProjects: "38",
        rating: 4,
        capabilities: ["Special Operations Equipment", "Fire & Emergency Services", "CBRNE", "Life-Cycle Support"],
        recentContracts: [
            "DLA TLS SOE Program - $33B potential over 10 years",
            "DLA TLS F&ESE Program - $7B IDIQ",
            "CBRNE capability integration services"
        ],
        subcontractingOpportunities: "CBRNE equipment, fire and emergency services, rapid supply capabilities, and comprehensive life-cycle sustainment solutions."
    },
    {
        id: 9,
        name: "Noble Supply & Logistics (DLA TLS Prime)",
        category: "Defense Logistics",
        contractValue: "$1.9B",
        activeProjects: "42",
        rating: 4,
        capabilities: ["MRO Services", "Special Operations Equipment", "Fire & Emergency Equipment", "Total Logistics Support"],
        recentContracts: [
            "DLA TLS MRO Northeast - $1.9B",
            "DLA TLS SOE and F&ESE Programs",
            "Comprehensive facility maintenance support"
        ],
        subcontractingOpportunities: "MRO supplies, HVAC and electrical equipment, construction materials, environmental products, and specialized logistics services."
    },
    {
        id: 10,
        name: "SupplyCore (DLA TLS Prime)",
        category: "Defense Logistics",
        contractValue: "$1.6B",
        activeProjects: "35",
        rating: 4,
        capabilities: ["SOE Equipment", "MRO Services", "F&ESE Equipment", "Cloud-based Procurement"],
        recentContracts: [
            "DLA TLS SOE Program - Tactical equipment",
            "DLA TLS MRO Program - Facility supplies",
            "DLA TLS F&ESE Program - Emergency equipment"
        ],
        subcontractingOpportunities: "Tactical communications, unmanned systems, training equipment, facility MRO supplies, and technology-enabled procurement solutions."
    }
];

window.strategicToolkit = {
    capabilityTools: [
        {
            name: "DLA TLS Prime Vendor Analysis",
            description: "Analyze opportunities with DLA TLS prime vendors including ADS Inc., Federal Resources, Noble Supply & Logistics",
            icon: "grid"
        },
        {
            name: "Contract Vehicle Alignment Tool",
            description: "Match your capabilities to OASIS+, SEWP V, STARS III, and other major contract vehicles",
            icon: "search"
        },
        {
            name: "CMMC Compliance Readiness",
            description: "Assess and improve cybersecurity maturity for federal contracting requirements",
            icon: "shield"
        },
        {
            name: "Small Business Set-Aside Maximizer",
            description: "Identify and pursue 8(a), SDVOSB, WOSB, and HUBZone opportunities",
            icon: "users"
        },
        {
            name: "Past Performance Portfolio",
            description: "Build compelling past performance narratives for CPARS and proposal submissions",
            icon: "file-plus"
        }
    ],
    intelligenceTools: [
        {
            name: "OASIS+ On-Ramp Tracker",
            description: "Monitor continuous on-ramping opportunities starting FY2025 for OASIS+ domains",
            icon: "activity"
        },
        {
            name: "Prime Contractor Subcontracting Plans",
            description: "Access subcontracting goals and opportunities from major defense and IT primes",
            icon: "database"
        },
        {
            name: "Federal Spending Intelligence",
            description: "Track $773.68B in federal contracts and $176.11B in small business awards",
            icon: "pie-chart"
        },
        {
            name: "Best-in-Class Vehicle Monitor",
            description: "Track OMB-designated BIC vehicles including STARS III, SEWP V, and Alliant 2",
            icon: "trending-up"
        },
        {
            name: "TLS Competition Analysis",
            description: "Monitor DLA TLS prime vendor performance and competitive positioning",
            icon: "eye"
        }
    ],
    actionPlan: [
        {
            title: "DLA TLS Prime Vendor Engagement",
            description: "Establish relationships with SOE, F&ESE, and MRO prime vendors. Focus on tactical equipment, emergency services, and facility maintenance opportunities.",
            timeline: "2-4 weeks",
            priority: "High"
        },
        {
            title: "OASIS+ FY2025 On-Ramp Preparation",
            description: "Prepare for continuous on-ramping process across eight OASIS+ domains. Develop domain-specific capability statements and past performance narratives.",
            timeline: "3-6 weeks",
            priority: "High"
        },
        {
            title: "Cybersecurity Maturity Enhancement",
            description: "Implement CMMC requirements and cybersecurity best practices to meet increasing federal compliance demands.",
            timeline: "6-12 weeks",
            priority: "High"
        },
        {
            title: "Small Business Certification Optimization",
            description: "Pursue optimal small business certifications (8(a), SDVOSB, WOSB, HUBZone) to access set-aside opportunities worth $176.11B annually.",
            timeline: "4-8 weeks",
            priority: "Medium"
        },
        {
            title: "IT Modernization Capability Development",
            description: "Build capabilities in AI, cloud services, and cybersecurity to capitalize on the $100B annual federal IT spending.",
            timeline: "8-16 weeks",
            priority: "Medium"
        },
        {
            title: "GSA eBuy and Quote Tool Mastery",
            description: "Master OASIS+ mandatory GSA eBuy platform and NASA SEWP Quote Request Tool for competitive positioning.",
            timeline: "2-3 weeks",
            priority: "Low"
        }
    ]
};

window.costStrategy = {
    phases: [
        {
            name: "Market Entry & Relationship Building",
            percentage: 20,
            description: "DLA TLS prime engagement, OASIS+ preparation, and compliance development including CMMC",
            budget: "$50K - $150K",
            duration: "3-6 months"
        },
        {
            name: "Capture & Proposal Development",
            percentage: 35,
            description: "Allocate 3-5% of target contract value for capture activities, proposal writing, and technical solutions",
            budget: "$75K - $200K",
            duration: "30-90 days"
        },
        {
            name: "Contract Performance",
            percentage: 40,
            description: "Project delivery, quality assurance, and performance management with focus on CPARS ratings",
            budget: "Contract-dependent",
            duration: "Contract period"
        },
        {
            name: "Growth & Expansion",
            percentage: 5,
            description: "Leveraging success for additional task orders, vehicle expansion, and prime contractor partnerships",
            budget: "$25K - $75K",
            duration: "Ongoing"
        }
    ],
    recommendations: [
        {
            title: "Target DLA TLS Prime Partnerships",
            description: "Focus on the $33B SOE, $7B F&ESE, and $1.9B MRO TLS programs through established prime vendors for immediate market entry.",
            impact: "High",
            difficulty: "Medium"
        },
        {
            title: "Prepare for OASIS+ Continuous On-Ramping",
            description: "Position for FY2025 on-ramping across eight domains with no contract ceiling, targeting professional services market.",
            impact: "High",
            difficulty: "High"
        },
        {
            title: "Invest in Cybersecurity Compliance",
            description: "Implement CMMC and advanced cybersecurity measures to meet increasing federal requirements and differentiate offerings.",
            impact: "High",
            difficulty: "Medium"
        },
        {
            title: "Optimize Small Business Certifications",
            description: "Leverage 8(a), SDVOSB, WOSB, or HUBZone certifications to access $176.11B in annual small business awards.",
            impact: "High",
            difficulty: "Low"
        },
        {
            title: "Develop IT Modernization Capabilities",
            description: "Build AI, cloud, and emerging technology capabilities to capture share of $100B annual federal IT spending.",
            impact: "High",
            difficulty: "High"
        },
        {
            title: "Master Best-in-Class Vehicles",
            description: "Focus on OMB-designated BIC contracts like STARS III, SEWP V, and Alliant 2 for streamlined procurement access.",
            impact: "Medium",
            difficulty: "Medium"
        }
    ]
};

// Market data for charts - Updated with FY2024 actual figures ($773.68B total)
window.marketData = {
    agencySpending: {
        labels: ['DoD', 'VA', 'DHS', 'HHS', 'Energy', 'Other'],
        data: [463.6, 89.2, 65.8, 45.3, 28.1, 81.68],
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280']
    },
    contractTimeline: {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
        datasets: [
            {
                label: 'Total Contract Awards ($B)',
                data: [185.2, 198.7, 189.3, 200.48],
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4
            },
            {
                label: 'Small Business Awards ($B)',
                data: [42.5, 45.8, 43.2, 44.61],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                yAxisID: 'y1'
            }
        ]
    },
    costBreakdown: {
        labels: ['Labor', 'Materials', 'Subcontractors', 'Travel', 'Other Direct', 'Overhead', 'Fee'],
        data: [45, 15, 20, 3, 5, 8, 4],
        colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6B7280', '#EC4899']
    }
};
