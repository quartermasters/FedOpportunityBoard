// Main application controller
class FederalDashboard {
    constructor() {
        this.currentSection = 'market-overview';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTimestamp();
        this.loadSection('market-overview');
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
            }
        };

        const titleInfo = titles[sectionId];
        if (titleInfo) {
            document.getElementById('page-title').textContent = titleInfo.title;
            document.getElementById('page-subtitle').textContent = titleInfo.subtitle;
        }

        this.currentSection = sectionId;

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
            <div class="prime-card border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer" 
                 data-category="${prime.category}" data-name="${prime.name.toLowerCase()}">
                <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                        <h4 class="text-lg font-semibold text-gray-800">${prime.name}</h4>
                        <p class="text-blue-600 font-medium">${prime.category}</p>
                    </div>
                    <button class="expand-btn text-gray-400 hover:text-gray-600" data-target="prime-details-${prime.id}">
                        <i data-feather="chevron-down" class="w-5 h-5"></i>
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                    <div><strong>Contract Value:</strong> ${prime.contractValue}</div>
                    <div><strong>Projects:</strong> ${prime.activeProjects}</div>
                    <div><strong>Rating:</strong> ${'★'.repeat(prime.rating)}${'☆'.repeat(5-prime.rating)}</div>
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
            capabilityTools.innerHTML = window.strategicToolkit.capabilityTools.map(tool => `
                <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex items-center">
                        <i data-feather="${tool.icon}" class="w-5 h-5 text-blue-600 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-gray-800">${tool.name}</h4>
                            <p class="text-sm text-gray-600">${tool.description}</p>
                        </div>
                    </div>
                    <button class="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        Launch Tool
                    </button>
                </div>
            `).join('');
        }

        if (intelligenceTools) {
            intelligenceTools.innerHTML = window.strategicToolkit.intelligenceTools.map(tool => `
                <div class="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div class="flex items-center">
                        <i data-feather="${tool.icon}" class="w-5 h-5 text-green-600 mr-3"></i>
                        <div>
                            <h4 class="font-medium text-gray-800">${tool.name}</h4>
                            <p class="text-sm text-gray-600">${tool.description}</p>
                        </div>
                    </div>
                    <button class="text-green-600 hover:text-green-800 font-medium text-sm">
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

        feather.replace();
    }

    populateCostStrategy() {
        const costPhases = document.getElementById('cost-phases');
        const costRecommendations = document.getElementById('cost-recommendations');

        if (costPhases) {
            costPhases.innerHTML = window.costStrategy.phases.map(phase => `
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
