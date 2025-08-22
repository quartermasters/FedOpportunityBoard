// Chart initialization and management
window.dashboardCharts = {
    charts: {},

    initAgencyChart() {
        const ctx = document.getElementById('agencyChart');
        if (!ctx) return;

        this.charts.agency = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: window.marketData.agencySpending.labels,
                datasets: [{
                    data: window.marketData.agencySpending.data,
                    backgroundColor: window.marketData.agencySpending.colors,
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
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: $${context.parsed}B (${Math.round(context.parsed / window.marketData.agencySpending.data.reduce((a, b) => a + b, 0) * 100)}%)`;
                            }
                        }
                    }
                },
                cutout: '60%'
            }
        });
    },

    initTimelineChart() {
        const ctx = document.getElementById('timelineChart');
        if (!ctx) return;

        this.charts.timeline = new Chart(ctx, {
            type: 'line',
            data: {
                labels: window.marketData.contractTimeline.labels,
                datasets: window.marketData.contractTimeline.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Contract Awards ($B)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Opportunities Posted'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            }
        });
    },

    initCostChart() {
        const ctx = document.getElementById('costChart');
        if (!ctx) return;

        this.charts.cost = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: window.marketData.costBreakdown.labels,
                datasets: [{
                    label: 'Cost Distribution (%)',
                    data: window.marketData.costBreakdown.data,
                    backgroundColor: window.marketData.costBreakdown.colors,
                    borderColor: window.marketData.costBreakdown.colors,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: 'Percentage (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Cost Categories'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        });
    },

    // Update charts when data changes
    updateCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    },

    // Destroy all charts
    destroyCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.destroy();
            }
        });
        this.charts = {};
    }
};

// Responsive chart handling
window.addEventListener('resize', () => {
    window.dashboardCharts.updateCharts();
});
