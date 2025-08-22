// Main application controller
class FederalDashboard {
    constructor() {
        this.currentSection = 'about-us';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTimestamp();
        this.loadSection('about-us');
        this.initializeCharts();
        this.populateContractVehicles();
        this.populatePrimeContractors();
        this.populateStrategicToolkit();
        this.populateCostStrategy();
        
        // Initialize Feather icons
        feather.replace();
    }

    setupEventListeners() {
        // Sidebar navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.getAttribute('href').substring(1);
                this.loadSection(section);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const sidebar = document.getElementById('sidebar');
        
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth < 1024) {
                if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    sidebar.classList.add('-translate-x-full');
                }
            }
        });

        // Search and filter functionality
        this.setupSearchAndFilter();

        // Window resize handler
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1024) {
                sidebar.classList.remove('-translate-x-full');
            }
        });
    }

    setupSearchAndFilter() {
        // Contract vehicles search and filter
        const vehicleSearch = document.getElementById('vehicle-search');
        const vehicleFilter = document.getElementById('vehicle-filter');
        
        if (vehicleSearch && vehicleFilter) {
            vehicleSearch.addEventListener('input', () => this.filterVehicles());
            vehicleFilter.addEventListener('change', () => this.filterVehicles());
        }

        // Prime contractors search and filter
        const primeSearch = document.getElementById('prime-search');
        const primeFilter = document.getElementById('prime-filter');
        
        if (primeSearch && primeFilter) {
            primeSearch.addEventListener('input', () => this.filterPrimes());
            primeFilter.addEventListener('change', () => this.filterPrimes());
        }
    }

    loadSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[href="#${sectionId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });

        const targetSection = document.getElementById(`${sectionId}-section`);
        if (targetSection) {
            targetSection.classList.remove('hidden');
        }

        // Update page title
        const titles = {
            'market-overview': { 
                title: 'Market Overview', 
                subtitle: 'Federal subcontracting market analysis and insights' 
            },
            'contract-vehicles': { 
                title: 'Contract Vehicles', 
                subtitle: 'Available contract vehicles for federal opportunities' 
            },
            'prime-contractors': { 
                title: 'Prime Contractors', 
                subtitle: 'Leading prime contractors in federal market' 
            },
            'strategic-toolkit': { 
                title: 'Strategic Toolkit', 
                subtitle: 'Tools and resources for competitive positioning' 
            },
            'cost-strategy': { 
                title: 'Cost Strategy', 
                subtitle: 'Cost analysis and optimization recommendations' 
            },
            'about-us': {
                title: 'About Us',
                subtitle: 'Partnership structure and organizational overview'
            }
        };

        const titleInfo = titles[sectionId];
        if (titleInfo) {
            document.getElementById('page-title').textContent = titleInfo.title;
            document.getElementById('page-subtitle').textContent = titleInfo.subtitle;
        }

        this.currentSection = sectionId;

        // Initialize section-specific functionality
        if (sectionId === 'market-overview') {
            setTimeout(() => this.initializeCharts(), 100);
        } else if (sectionId === 'about-us') {
            setTimeout(() => this.initializeAboutUs(), 100);
        }

        // Close mobile sidebar after navigation
        if (window.innerWidth < 1024) {
            document.getElementById('sidebar').classList.add('-translate-x-full');
        }
    }

    updateTimestamp() {
        const now = new Date();
        const timestamp = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('last-updated').textContent = timestamp;
    }

    initializeCharts() {
        // Initialize charts when the page loads
        setTimeout(() => {
            window.dashboardCharts.initAgencyChart();
            window.dashboardCharts.initTimelineChart();
            window.dashboardCharts.initCostChart();
        }, 100);
    }

    initializeAboutUs() {
        // Add any About Us specific initialization
        const partnerCircles = document.querySelectorAll('.partner-circle');
        const partnerDetails = document.querySelectorAll('.partner-detail');
        
        partnerCircles.forEach(circle => {
            circle.addEventListener('mouseenter', () => {
                const partnerId = circle.getAttribute('data-partner');
                const targetDetail = document.getElementById(`${partnerId}-details`);
                if (targetDetail) {
                    targetDetail.style.transform = 'scale(1.02)';
                    targetDetail.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                }
            });
            
            circle.addEventListener('mouseleave', () => {
                partnerDetails.forEach(detail => {
                    detail.style.transform = 'scale(1)';
                    detail.style.boxShadow = '';
                });
            });
        });

        // Initialize value contribution charts
        this.initValueContributionCharts();
    }

    initValueContributionCharts() {
        // Ensure Chart.js is loaded
        if (typeof Chart === 'undefined') {
            console.error('Chart.js not loaded');
            return;
        }

        // Partner Value Distribution Chart
        const partnerValueCtx = document.getElementById('partnerValueChart');
        if (partnerValueCtx) {
            new Chart(partnerValueCtx, {
                type: 'doughnut',
                data: {
                    labels: ['St Michael Enterprises', 'Republic Capital Access', 'Aliff Capital'],
                    datasets: [{
                        data: [45, 30, 25],
                        backgroundColor: ['#0a3161', '#b31942', '#10B981'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: { size: 12 }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.label + ': ' + context.parsed + '%';
                                }
                            }
                        }
                    }
                }
            });
        }

        // Capability Coverage Chart
        const capabilityCtx = document.getElementById('capabilityChart');
        if (capabilityCtx) {
            new Chart(capabilityCtx, {
                type: 'radar',
                data: {
                    labels: ['Technical Execution', 'Financial Resources', 'Strategy & Planning', 'Market Access', 'Compliance', 'Innovation'],
                    datasets: [
                        {
                            label: 'St Michael Enterprises',
                            data: [95, 40, 60, 85, 90, 70],
                            backgroundColor: 'rgba(10, 49, 97, 0.2)',
                            borderColor: '#0a3161',
                            borderWidth: 2,
                            pointBackgroundColor: '#0a3161'
                        },
                        {
                            label: 'Republic Capital Access',
                            data: [30, 95, 70, 80, 85, 60],
                            backgroundColor: 'rgba(179, 25, 66, 0.2)',
                            borderColor: '#b31942',
                            borderWidth: 2,
                            pointBackgroundColor: '#b31942'
                        },
                        {
                            label: 'Aliff Capital',
                            data: [60, 50, 90, 75, 65, 85],
                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            borderColor: '#10B981',
                            borderWidth: 2,
                            pointBackgroundColor: '#10B981'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 15,
                                usePointStyle: true,
                                font: { size: 11 }
                            }
                        }
                    },
                    scales: {
                        r: {
                            angleLines: { display: true },
                            suggestedMin: 0,
                            suggestedMax: 100,
                            ticks: {
                                stepSize: 20,
                                font: { size: 10 }
                            },
                            pointLabels: {
                                font: { size: 10 }
                            }
                        }
                    }
                }
            });
        }
    }

    populateContractVehicles() {
        const vehiclesList = document.getElementById('vehicles-list');
        if (!vehiclesList) return;

        vehiclesList.innerHTML = window.contractVehicles.map(vehicle => `
            <div class="vehicle-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" 
                 data-type="${vehicle.type}" data-name="${vehicle.name.toLowerCase()}">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h4 class="text-lg font-semibold text-gray-800">${vehicle.name}</h4>
                        <span class="status-badge status-${vehicle.status.toLowerCase()}">${vehicle.status}</span>
                    </div>
                    <button class="expand-btn text-gray-400 hover:text-gray-600" data-target="details-${vehicle.id}">
                        <i data-feather="chevron-down" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div><strong>Type:</strong> ${vehicle.type}</div>
                    <div><strong>Value:</strong> ${vehicle.value}</div>
                    <div><strong>Period:</strong> ${vehicle.period}</div>
                </div>
                
                <p class="text-gray-600 mb-3">${vehicle.description}</p>
                
                <div class="expandable-content" id="details-${vehicle.id}">
                    <div class="border-t pt-3 mt-3">
                        <h5 class="font-semibold text-gray-800 mb-2">Key Features:</h5>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                            ${vehicle.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                        <div class="mt-3 pt-3 border-t">
                            <strong class="text-gray-700">Prime Opportunities:</strong>
                            <p class="text-sm text-gray-600 mt-1">${vehicle.opportunities}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Add expand/collapse functionality
        this.setupExpandableCards();
        feather.replace();
    }

    populatePrimeContractors() {
        const primesList = document.getElementById('primes-list');
        if (!primesList) return;

        primesList.innerHTML = window.primeContractors.map(prime => `
            <div class="prime-card border rounded-lg p-4 md:p-6 hover:shadow-md transition-shadow cursor-pointer" 
                 data-category="${prime.category}" data-name="${prime.name.toLowerCase()}">
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <div class="flex-1">
                        <h4 class="text-lg font-semibold text-gray-800 mb-1">${prime.name}</h4>
                        <p class="text-blue-600 font-medium text-sm">${prime.category}</p>
                    </div>
                    <button class="expand-btn text-gray-400 hover:text-gray-600 self-start sm:self-auto" data-target="prime-details-${prime.id}">
                        <i data-feather="chevron-down" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600 mb-4">
                    <div class="flex flex-col">
                        <span class="font-semibold text-gray-700">Contract Value</span>
                        <span>${prime.contractValue}</span>
                    </div>
                    <div class="flex flex-col">
                        <span class="font-semibold text-gray-700">Active Projects</span>
                        <span>${prime.activeProjects}</span>
                    </div>
                    <div class="flex flex-col sm:col-span-2 lg:col-span-1">
                        <span class="font-semibold text-gray-700">Rating</span>
                        <span class="text-yellow-500">${'★'.repeat(prime.rating)}${'☆'.repeat(5-prime.rating)}</span>
                    </div>
                </div>
                
                <div class="mb-4">
                    <a href="${prime.vendorPortalUrl}" target="_blank" rel="noopener noreferrer" 
                       class="vendor-portal-btn w-full justify-center">
                        <i data-feather="external-link" class="w-4 h-4 mr-2"></i>
                        Access Vendor Portal
                    </a>
                </div>
                
                <div class="expandable-content" id="prime-details-${prime.id}">
                    <div class="border-t pt-3 mt-3">
                        <h5 class="font-semibold text-gray-800 mb-2">Core Capabilities:</h5>
                        <div class="flex flex-wrap gap-2 mb-3">
                            ${prime.capabilities.map(cap => `
                                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">${cap}</span>
                            `).join('')}
                        </div>
                        <h5 class="font-semibold text-gray-800 mb-2">Recent Contracts:</h5>
                        <ul class="list-disc list-inside space-y-1 text-sm text-gray-600">
                            ${prime.recentContracts.map(contract => `<li>${contract}</li>`).join('')}
                        </ul>
                        <div class="mt-3 pt-3 border-t">
                            <strong class="text-gray-700">Subcontracting Opportunities:</strong>
                            <p class="text-sm text-gray-600 mt-1">${prime.subcontractingOpportunities}</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.setupExpandableCards();
        feather.replace();
    }

    populateStrategicToolkit() {
        const capabilityTools = document.getElementById('capability-tools');
        const intelligenceTools = document.getElementById('intelligence-tools');
        const actionPlan = document.getElementById('action-plan');

        if (capabilityTools) {
            capabilityTools.innerHTML = window.strategicToolkit.capabilityTools.map((tool, index) => `
                <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex items-center">
                        <i data-feather="${tool.icon}" class="w-5 h-5 text-blue-600 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-gray-800">${tool.name}</h4>
                            <p class="text-sm text-gray-600">${tool.description}</p>
                        </div>
                    </div>
                    <button class="launch-tool-btn text-blue-600 hover:text-blue-800 font-medium text-sm" data-tool-id="capability-${index}">
                        Launch Tool
                    </button>
                </div>
            `).join('');
        }

        if (intelligenceTools) {
            intelligenceTools.innerHTML = window.strategicToolkit.intelligenceTools.map((tool, index) => `
                <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex items-center">
                        <i data-feather="${tool.icon}" class="w-5 h-5 text-green-600 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-gray-800">${tool.name}</h4>
                            <p class="text-sm text-gray-600">${tool.description}</p>
                        </div>
                    </div>
                    <button class="access-tool-btn text-green-600 hover:text-green-800 font-medium text-sm" data-tool-id="intelligence-${index}">
                        Access
                    </button>
                </div>
            `).join('');
        }

        if (actionPlan) {
            actionPlan.innerHTML = window.strategicToolkit.actionPlan.map((step, index) => `
                <div class="flex items-start p-4 border rounded-lg">
                    <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4">
                        ${index + 1}
                    </div>
                    <div class="flex-1">
                        <h4 class="font-semibold text-gray-800 mb-1">${step.title}</h4>
                        <p class="text-gray-600 text-sm mb-2">${step.description}</p>
                        <div class="text-xs text-gray-500">
                            <span class="font-medium">Timeline:</span> ${step.timeline} | 
                            <span class="font-medium">Priority:</span> ${step.priority}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Add event listeners for tool buttons
        this.setupToolkitEventListeners();
        feather.replace();
    }

    setupToolkitEventListeners() {
        // Capability tool buttons
        document.querySelectorAll('.launch-tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const toolId = btn.getAttribute('data-tool-id');
                this.launchCapabilityTool(toolId);
            });
        });

        // Intelligence tool buttons
        document.querySelectorAll('.access-tool-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const toolId = btn.getAttribute('data-tool-id');
                this.accessIntelligenceTool(toolId);
            });
        });
    }

    launchCapabilityTool(toolId) {
        const toolIndex = parseInt(toolId.split('-')[1]);
        const tool = window.strategicToolkit.capabilityTools[toolIndex];
        
        if (!tool) return;

        // Create modal for the tool
        this.showToolModal(tool.name, this.getCapabilityToolContent(tool));
    }

    accessIntelligenceTool(toolId) {
        const toolIndex = parseInt(toolId.split('-')[1]);
        const tool = window.strategicToolkit.intelligenceTools[toolIndex];
        
        if (!tool) return;

        // Create modal for the tool
        this.showToolModal(tool.name, this.getIntelligenceToolContent(tool));
    }

    getCapabilityToolContent(tool) {
        const toolContents = {
            'DLA TLS Prime Vendor Analysis': `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">DLA TLS Prime Vendors</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="bg-white p-3 rounded border">
                                <strong>ADS Inc.</strong><br>
                                <span class="text-sm text-gray-600">Focus: SOE contracts ($33B ceiling)</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>Federal Resources</strong><br>
                                <span class="text-sm text-gray-600">Focus: F&ESE contracts ($7B ceiling)</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>Noble Supply & Logistics</strong><br>
                                <span class="text-sm text-gray-600">Focus: MRO services ($1.9B ceiling)</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>SupplyCore</strong><br>
                                <span class="text-sm text-gray-600">Focus: Multi-category support</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-800 mb-2">Subcontracting Strategy</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Target small business set-asides within DLA TLS contracts</li>
                            <li>Focus on specialized capabilities these primes need</li>
                            <li>Build relationships through vendor days and industry events</li>
                            <li>Prepare for SOE requirements in government facilities</li>
                        </ul>
                    </div>
                </div>
            `,
            'Contract Vehicle Alignment Tool': `
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Contract Vehicle Matching</h4>
                        <div class="space-y-3">
                            <div class="bg-white p-3 rounded border">
                                <strong>OASIS+</strong> - Professional Services<br>
                                <span class="text-sm text-gray-600">Continuous on-ramping starting FY2025</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>SEWP V</strong> - IT Products & Services<br>
                                <span class="text-sm text-gray-600">Best for hardware/software solutions</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>STARS III</strong> - IT Services<br>
                                <span class="text-sm text-gray-600">Focus on enterprise IT solutions</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">Capability Assessment</h4>
                        <p class="text-sm">Review your core capabilities against vehicle requirements to identify the best fit for your business.</p>
                    </div>
                </div>
            `,
            'CMMC Compliance Readiness': `
                <div class="space-y-4">
                    <div class="bg-red-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-red-800 mb-2">CMMC Requirements</h4>
                        <div class="space-y-2">
                            <div><strong>Level 1:</strong> Basic cyber hygiene (17 practices)</div>
                            <div><strong>Level 2:</strong> Advanced cybersecurity (110 practices)</div>
                            <div><strong>Level 3:</strong> Expert cybersecurity (58 additional practices)</div>
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Preparation Steps</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Conduct initial cybersecurity assessment</li>
                            <li>Implement required security controls</li>
                            <li>Document policies and procedures</li>
                            <li>Schedule third-party assessment</li>
                            <li>Maintain ongoing compliance program</li>
                        </ul>
                    </div>
                </div>
            `,
            'Small Business Set-Aside Maximizer': `
                <div class="space-y-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-purple-800 mb-2">Set-Aside Categories</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="bg-white p-3 rounded border">
                                <strong>8(a) Program</strong><br>
                                <span class="text-sm text-gray-600">Socially & economically disadvantaged</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>SDVOSB</strong><br>
                                <span class="text-sm text-gray-600">Service-disabled veteran owned</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>WOSB</strong><br>
                                <span class="text-sm text-gray-600">Women-owned small business</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>HUBZone</strong><br>
                                <span class="text-sm text-gray-600">Historically underutilized zones</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Opportunity Strategy</h4>
                        <p class="text-sm">Target contracts specifically set aside for your certifications to maximize win probability and reduce competition.</p>
                    </div>
                </div>
            `,
            'Past Performance Portfolio': `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">CPARS Preparation</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Document all contract deliverables and milestones</li>
                            <li>Maintain records of customer satisfaction</li>
                            <li>Track cost and schedule performance</li>
                            <li>Prepare narrative descriptions of achievements</li>
                        </ul>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Best Practices</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Focus on quantifiable results and metrics</li>
                            <li>Highlight problem-solving and innovation</li>
                            <li>Include customer testimonials where possible</li>
                            <li>Show continuous improvement over time</li>
                        </ul>
                    </div>
                </div>
            `
        };

        return toolContents[tool.name] || `
            <div class="text-center py-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">${tool.name}</h4>
                <p class="text-gray-600">${tool.description}</p>
                <div class="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-800">This tool is currently being developed. Check back soon for full functionality.</p>
                </div>
            </div>
        `;
    }

    getIntelligenceToolContent(tool) {
        const toolContents = {
            'OASIS+ On-Ramp Tracker': `
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">OASIS+ Continuous On-Ramping</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="bg-white p-3 rounded border">
                                <strong>Start Date:</strong> FY2025<br>
                                <span class="text-sm text-gray-600">Annual on-ramping opportunities</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>Domains:</strong> Multiple<br>
                                <span class="text-sm text-gray-600">Professional services focus</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">Preparation Strategy</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Monitor GSA announcements for application periods</li>
                            <li>Prepare capability statements and past performance</li>
                            <li>Build relationships with current OASIS+ contractors</li>
                            <li>Focus on specific domain expertise</li>
                        </ul>
                    </div>
                </div>
            `,
            'Prime Contractor Subcontracting Plans': `
                <div class="space-y-4">
                    <div class="bg-purple-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-purple-800 mb-2">Major Prime Contractors</h4>
                        <div class="space-y-2">
                            <div class="bg-white p-3 rounded border">
                                <strong>Lockheed Martin:</strong> $62.8B in federal contracts<br>
                                <span class="text-sm text-gray-600">Strong subcontracting program for small businesses</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>Raytheon Technologies:</strong> $29.1B in federal contracts<br>
                                <span class="text-sm text-gray-600">Focus on technology and engineering services</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Subcontracting Opportunities</h4>
                        <p class="text-sm">Review prime contractor subcontracting plans to identify specific opportunities aligned with your capabilities.</p>
                    </div>
                </div>
            `,
            'Federal Spending Intelligence': `
                <div class="space-y-4">
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">FY2024 Federal Spending</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="bg-white p-3 rounded border text-center">
                                <strong class="text-2xl text-blue-600">$773.68B</strong><br>
                                <span class="text-sm text-gray-600">Total Federal Spending</span>
                            </div>
                            <div class="bg-white p-3 rounded border text-center">
                                <strong class="text-2xl text-green-600">$176.11B</strong><br>
                                <span class="text-sm text-gray-600">Small Business Awards</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-yellow-800 mb-2">Market Trends</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>DoD accounts for 60% of total federal spending</li>
                            <li>Small business awards increased by $4B from FY2023</li>
                            <li>Technology services show strongest growth</li>
                        </ul>
                    </div>
                </div>
            `,
            'Best-in-Class Vehicle Monitor': `
                <div class="space-y-4">
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">OMB Best-in-Class Vehicles</h4>
                        <div class="space-y-2">
                            <div class="bg-white p-3 rounded border">
                                <strong>STARS III:</strong> IT Services<br>
                                <span class="text-sm text-gray-600">$20B ceiling, enterprise solutions</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>SEWP V:</strong> IT Products<br>
                                <span class="text-sm text-gray-600">$20B ceiling, hardware/software</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>Alliant 2:</strong> Professional Services<br>
                                <span class="text-sm text-gray-600">$65B ceiling, consulting</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-blue-800 mb-2">BIC Advantages</h4>
                        <p class="text-sm">Best-in-Class vehicles offer streamlined procurement, reduced duplication, and preferred use by agencies.</p>
                    </div>
                </div>
            `,
            'TLS Competition Analysis': `
                <div class="space-y-4">
                    <div class="bg-red-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-red-800 mb-2">DLA TLS Competitive Landscape</h4>
                        <div class="space-y-2">
                            <div class="bg-white p-3 rounded border">
                                <strong>SOE (Support Operations Equipment):</strong><br>
                                <span class="text-sm text-gray-600">$33B ceiling - Highest competition</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>F&ESE (Facilities & Environmental):</strong><br>
                                <span class="text-sm text-gray-600">$7B ceiling - Moderate competition</span>
                            </div>
                            <div class="bg-white p-3 rounded border">
                                <strong>MRO (Maintenance, Repair, Operations):</strong><br>
                                <span class="text-sm text-gray-600">$1.9B ceiling - Specialized opportunities</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg">
                        <h4 class="font-semibold text-green-800 mb-2">Strategy Recommendations</h4>
                        <ul class="list-disc list-inside text-sm space-y-1">
                            <li>Focus on niche specializations within TLS categories</li>
                            <li>Build relationships with current prime vendors</li>
                            <li>Target small business set-asides within TLS contracts</li>
                        </ul>
                    </div>
                </div>
            `
        };

        return toolContents[tool.name] || `
            <div class="text-center py-8">
                <h4 class="text-lg font-semibold text-gray-800 mb-2">${tool.name}</h4>
                <p class="text-gray-600">${tool.description}</p>
                <div class="mt-4 p-4 bg-green-50 rounded-lg">
                    <p class="text-sm text-green-800">This intelligence tool is currently being developed. Check back soon for full functionality.</p>
                </div>
            </div>
        `;
    }

    showToolModal(title, content) {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
        
        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden';
        
        modal.innerHTML = `
            <div class="flex items-center justify-between p-6 border-b" style="background-color: #0a3161;">
                <h3 class="text-xl font-semibold text-white">${title}</h3>
                <button class="close-modal text-white hover:text-gray-200" style="color: white;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="p-6 overflow-y-auto max-h-[70vh]">
                ${content}
            </div>
            <div class="border-t p-4 flex justify-end">
                <button class="close-modal px-4 py-2 text-white rounded-lg" style="background-color: #0a3161;">
                    Close
                </button>
            </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Add close functionality
        overlay.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(overlay);
            });
        });
        
        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    populateCostStrategy() {
        const costPhases = document.getElementById('cost-phases');
        const costRecommendations = document.getElementById('cost-recommendations');

        if (costPhases) {
            // Add monthly operating cost summary at the top
            const monthlyCostSummary = `
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 class="font-semibold text-blue-800 mb-2">Monthly Operating Cost Structure</h4>
                    <div class="mb-3 text-sm text-blue-700 bg-blue-100 rounded p-2">
                        <strong>Cost Responsibility:</strong> ${window.costStrategy.monthlyOperatingCost.responsibleParty} bears all business process and operational expenses
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div class="text-center">
                            <span class="text-2xl font-bold text-blue-600">$${window.costStrategy.monthlyOperatingCost.total.toLocaleString()}</span>
                            <p class="text-gray-600">Total Monthly</p>
                        </div>
                        <div class="text-center">
                            <span class="text-xl font-bold text-green-600">$${window.costStrategy.monthlyOperatingCost.breakdown.directCosts.toLocaleString()}</span>
                            <p class="text-gray-600">Direct Costs</p>
                        </div>
                        <div class="text-center">
                            <span class="text-xl font-bold text-orange-600">$${window.costStrategy.monthlyOperatingCost.breakdown.indirectCosts.toLocaleString()}</span>
                            <p class="text-gray-600">Indirect Costs</p>
                        </div>
                    </div>
                </div>
            `;

            costPhases.innerHTML = monthlyCostSummary + window.costStrategy.phases.map(phase => `
                <div class="border rounded-lg p-4">
                    <div class="flex justify-between items-center mb-2">
                        <h4 class="font-semibold text-gray-800">${phase.name}</h4>
                        <span class="text-lg font-bold text-blue-600">${phase.percentage}%</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">${phase.description}</p>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <strong class="text-gray-700">Budget:</strong>
                            <p class="text-gray-600">${phase.budget}</p>
                        </div>
                        <div>
                            <strong class="text-gray-700">Duration:</strong>
                            <p class="text-gray-600">${phase.duration}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // Populate detailed cost breakdown
        const detailedCosts = document.getElementById('detailed-costs');
        if (detailedCosts) {
            detailedCosts.innerHTML = Object.entries(window.costStrategy.monthlyOperatingCost.details).map(([item, detail]) => `
                <div class="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <span class="text-sm font-bold text-gray-600">$</span>
                    </div>
                    <div class="flex-1">
                        <div class="flex justify-between items-start">
                            <h4 class="font-medium text-gray-800">${item}</h4>
                            <span class="text-lg font-bold text-blue-600">$${detail.amount.toLocaleString()}</span>
                        </div>
                        <p class="text-sm text-gray-600 mt-1">${detail.description}</p>
                        <span class="inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${detail.type === 'Labor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}">${detail.type}</span>
                    </div>
                </div>
            `).join('');
        }

        if (costRecommendations) {
            costRecommendations.innerHTML = window.costStrategy.recommendations.map(rec => `
                <div class="flex items-start p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <i data-feather="check" class="w-4 h-4 text-green-600"></i>
                    </div>
                    <div>
                        <h4 class="font-medium text-gray-800">${rec.title}</h4>
                        <p class="text-sm text-gray-600 mt-1">${rec.description}</p>
                        <div class="text-xs text-gray-500 mt-2">
                            <span class="font-medium">Impact:</span> ${rec.impact} | 
                            <span class="font-medium">Difficulty:</span> ${rec.difficulty}
                        </div>
                    </div>
                </div>
            `).join('');
        }

        feather.replace();
    }

    initializeAboutUs() {
        // Add interactive functionality to partnership diagram
        const partnerNodes = document.querySelectorAll('.partner-node');
        const partnerDetails = document.querySelectorAll('.partner-detail');

        partnerNodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                const partnerId = node.getAttribute('data-partner');
                const detailElement = document.getElementById(`${partnerId}-details`);
                
                // Reset all details
                partnerDetails.forEach(detail => {
                    detail.classList.remove('highlighted');
                });
                
                // Highlight corresponding detail
                if (detailElement) {
                    detailElement.classList.add('highlighted');
                }
            });

            node.addEventListener('mouseleave', () => {
                partnerDetails.forEach(detail => {
                    detail.classList.remove('highlighted');
                });
            });

            node.addEventListener('click', () => {
                const partnerId = node.getAttribute('data-partner');
                const detailElement = document.getElementById(`${partnerId}-details`);
                
                if (detailElement) {
                    detailElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    
                    // Add temporary highlight
                    detailElement.classList.add('highlighted');
                    setTimeout(() => {
                        detailElement.classList.remove('highlighted');
                    }, 2000);
                }
            });
        });

        // Re-initialize feather icons for the new section
        feather.replace();
    }

    setupExpandableCards() {
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const targetId = btn.getAttribute('data-target');
                const content = document.getElementById(targetId);
                const icon = btn.querySelector('i');
                
                if (content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                    icon.style.transform = 'rotate(0deg)';
                } else {
                    content.classList.add('expanded');
                    icon.style.transform = 'rotate(180deg)';
                }
            });
        });
    }

    filterVehicles() {
        const searchTerm = document.getElementById('vehicle-search').value.toLowerCase();
        const filterType = document.getElementById('vehicle-filter').value;
        const cards = document.querySelectorAll('.vehicle-card');

        cards.forEach(card => {
            const name = card.getAttribute('data-name');
            const type = card.getAttribute('data-type');
            
            const matchesSearch = name.includes(searchTerm);
            const matchesFilter = !filterType || type === filterType;
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    filterPrimes() {
        const searchTerm = document.getElementById('prime-search').value.toLowerCase();
        const filterCategory = document.getElementById('prime-filter').value;
        const cards = document.querySelectorAll('.prime-card');

        cards.forEach(card => {
            const name = card.getAttribute('data-name');
            const category = card.getAttribute('data-category');
            
            const matchesSearch = name.includes(searchTerm);
            const matchesFilter = !filterCategory || category === filterCategory;
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new FederalDashboard();
});
