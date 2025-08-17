// Dashboard data
const dashboardData = {
  "ai_visibility_scorecard": {
    "current_scores": {
      "ChatGPT": {
        "overall_score": 54,
        "brand_recognition": 8,
        "market_score": 6,
        "presence_quality": 20,
        "brand_sentiment": 9,
        "share_of_voice": 30
      },
      "Real_Time_AI": {
        "overall_score": 70,
        "brand_recognition": 13,
        "market_score": 10,
        "presence_quality": 20,
        "brand_sentiment": 15,
        "share_of_voice": 25
      },
      "Gemini_AI": {
        "overall_score": 50,
        "brand_recognition": 5,
        "market_score": 3,
        "presence_quality": 20,
        "brand_sentiment": 9,
        "share_of_voice": 26
      }
    },
    "trend_data": [
      {"month": "Jan 2025", "ChatGPT": 52, "Real_Time_AI": 68, "Gemini_AI": 48},
      {"month": "Feb 2025", "ChatGPT": 53, "Real_Time_AI": 69, "Gemini_AI": 49},
      {"month": "Mar 2025", "ChatGPT": 54, "Real_Time_AI": 70, "Gemini_AI": 50},
      {"month": "Apr 2025", "ChatGPT": 55, "Real_Time_AI": 71, "Gemini_AI": 51},
      {"month": "May 2025", "ChatGPT": 56, "Real_Time_AI": 72, "Gemini_AI": 52}
    ]
  },
  "content_performance": {
    "gap_analysis": [
      {"topic": "AI-driven payroll analytics", "competitor_mentions": 65, "neeyamo_mentions": 12, "opportunity_score": 85},
      {"topic": "Real-time payroll processing", "competitor_mentions": 48, "neeyamo_mentions": 18, "opportunity_score": 70},
      {"topic": "Employee self-service portals", "competitor_mentions": 52, "neeyamo_mentions": 15, "opportunity_score": 75},
      {"topic": "Mobile payroll applications", "competitor_mentions": 38, "neeyamo_mentions": 8, "opportunity_score": 65}
    ]
  },
  "competitor_benchmarking": {
    "market_share": {
      "ChatGPT": [
        {"company": "ADP", "share": 25, "score": 72},
        {"company": "Ceridian", "share": 20, "score": 68},
        {"company": "Neeyamo", "share": 15, "score": 54},
        {"company": "Workday", "share": 10, "score": 65},
        {"company": "Paychex", "share": 10, "score": 58}
      ],
      "Real_Time_AI": [
        {"company": "Neeyamo", "share": 28.5, "score": 70},
        {"company": "ADP", "share": 20, "score": 68},
        {"company": "Papaya Global", "share": 14, "score": 65},
        {"company": "Deel", "share": 12, "score": 72},
        {"company": "Multiplier", "share": 8, "score": 60}
      ],
      "Gemini_AI": [
        {"company": "Neeyamo", "share": 25, "score": 50},
        {"company": "ADP", "share": 20, "score": 62},
        {"company": "Papaya Global", "share": 15, "score": 58},
        {"company": "Deel", "share": 12, "score": 65},
        {"company": "Remote", "share": 5, "score": 55}
      ]
    }
  },
  "financial_model": {
    "scenarios": [
      {
        "name": "Conservative",
        "visibility_increase": 15,
        "lead_increase": 20,
        "monthly_new_customers": 2.5,
        "monthly_revenue": 125000,
        "monthly_profit": 95000,
        "roi_12_months": 190
      },
      {
        "name": "Moderate",
        "visibility_increase": 25,
        "lead_increase": 35,
        "monthly_new_customers": 4.2,
        "monthly_revenue": 210000,
        "monthly_profit": 163000,
        "roi_12_months": 326
      },
      {
        "name": "Optimistic",
        "visibility_increase": 40,
        "lead_increase": 55,
        "monthly_new_customers": 6.9,
        "monthly_revenue": 345000,
        "monthly_profit": 271000,
        "roi_12_months": 542
      }
    ],
    "payback_analysis": [
      {"month": 1, "investment": 5000, "revenue": 0, "cumulative_profit": -5000},
      {"month": 2, "investment": 5000, "revenue": 25000, "cumulative_profit": 15000},
      {"month": 3, "investment": 5000, "revenue": 50000, "cumulative_profit": 60000},
      {"month": 6, "investment": 5000, "revenue": 125000, "cumulative_profit": 315000},
      {"month": 12, "investment": 5000, "revenue": 210000, "cumulative_profit": 1260000}
    ]
  }
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Global chart references
let charts = {};
let currentPlatform = 'ChatGPT';
let currentScenario = 'Moderate';

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initializing...');
    initializeNavigation();
    initializeCharts();
    initializeInteractivity();
    console.log('Dashboard initialized');
});

function initializeNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.dashboard-section');

    console.log('Found nav tabs:', navTabs.length);
    console.log('Found sections:', sections.length);

    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = tab.dataset.section;
            console.log('Tab clicked:', targetSection);
            
            // Update active tab
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update active section
            sections.forEach(s => s.classList.remove('active'));
            const targetElement = document.getElementById(targetSection);
            if (targetElement) {
                targetElement.classList.add('active');
                console.log('Section activated:', targetSection);
            } else {
                console.error('Target section not found:', targetSection);
            }
        });
    });
}

function initializeCharts() {
    console.log('Initializing charts...');
    
    // Wait for DOM to be fully ready
    setTimeout(() => {
        createOverviewChart();
        createVisibilityGauges();
        createTrendsChart();
        createGapChart();
        createMarketShareChart();
        createROIChart();
        console.log('All charts initialized');
    }, 100);
}

function createOverviewChart() {
    const canvas = document.getElementById('overviewChart');
    if (!canvas) {
        console.error('Overview chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    charts.overview = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['ChatGPT', 'Real-Time AI', 'Gemini AI'],
            datasets: [{
                label: 'Overall Score',
                data: [54, 70, 50],
                backgroundColor: [chartColors[0], chartColors[1], chartColors[2]],
                borderRadius: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.parsed.y}/100`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createVisibilityGauges() {
    const platforms = [
        { id: 'chatgptGauge', score: 54 },
        { id: 'realtimeGauge', score: 70 },
        { id: 'geminiGauge', score: 50 }
    ];
    
    platforms.forEach((platform, index) => {
        const canvas = document.getElementById(platform.id);
        if (!canvas) {
            console.error(`Gauge canvas not found: ${platform.id}`);
            return;
        }
        
        const ctx = canvas.getContext('2d');
        
        charts[platform.id] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [platform.score, 100 - platform.score],
                    backgroundColor: [chartColors[index], 'rgba(0,0,0,0.1)'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            },
            plugins: [{
                id: 'centerText',
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
                    
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 24px Arial';
                    ctx.fillText(platform.score, centerX, centerY - 5);
                    ctx.font = '14px Arial';
                    ctx.fillText('/100', centerX, centerY + 15);
                    ctx.restore();
                }
            }]
        });
    });
}

function createTrendsChart() {
    const canvas = document.getElementById('trendsChart');
    if (!canvas) {
        console.error('Trends chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    
    charts.trends = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dashboardData.ai_visibility_scorecard.trend_data.map(d => d.month),
            datasets: [
                {
                    label: 'ChatGPT',
                    data: dashboardData.ai_visibility_scorecard.trend_data.map(d => d.ChatGPT),
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Real-Time AI',
                    data: dashboardData.ai_visibility_scorecard.trend_data.map(d => d.Real_Time_AI),
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Gemini AI',
                    data: dashboardData.ai_visibility_scorecard.trend_data.map(d => d.Gemini_AI),
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 40,
                    max: 80,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createGapChart() {
    const canvas = document.getElementById('gapChart');
    if (!canvas) {
        console.error('Gap chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const gapData = dashboardData.content_performance.gap_analysis;
    
    charts.gap = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: gapData.map(d => d.topic),
            datasets: [
                {
                    label: 'Competitor Mentions',
                    data: gapData.map(d => d.competitor_mentions),
                    backgroundColor: chartColors[2] + '80',
                    borderColor: chartColors[2],
                    borderWidth: 1
                },
                {
                    label: 'Neeyamo Mentions',
                    data: gapData.map(d => d.neeyamo_mentions),
                    backgroundColor: chartColors[0] + '80',
                    borderColor: chartColors[0],
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createMarketShareChart() {
    const canvas = document.getElementById('marketShareChart');
    if (!canvas) {
        console.error('Market share chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const initialData = dashboardData.competitor_benchmarking.market_share[currentPlatform];
    
    charts.marketShare = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: initialData.map(d => d.company),
            datasets: [{
                data: initialData.map(d => d.share),
                backgroundColor: chartColors.slice(0, initialData.length),
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]}%)`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].backgroundColor[i],
                                lineWidth: 0,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const score = initialData[context.dataIndex].score;
                            return `${context.label}: ${context.parsed}% (Score: ${score})`;
                        }
                    }
                }
            }
        }
    });
}

function createROIChart() {
    const canvas = document.getElementById('roiChart');
    if (!canvas) {
        console.error('ROI chart canvas not found');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const paybackData = dashboardData.financial_model.payback_analysis;
    
    charts.roi = new Chart(ctx, {
        type: 'line',
        data: {
            labels: paybackData.map(d => `Month ${d.month}`),
            datasets: [
                {
                    label: 'Investment',
                    data: paybackData.map(d => d.investment),
                    borderColor: chartColors[2],
                    backgroundColor: chartColors[2] + '20',
                    fill: false
                },
                {
                    label: 'Revenue',
                    data: paybackData.map(d => d.revenue),
                    borderColor: chartColors[0],
                    backgroundColor: chartColors[0] + '20',
                    fill: false
                },
                {
                    label: 'Cumulative Profit',
                    data: paybackData.map(d => d.cumulative_profit),
                    borderColor: chartColors[1],
                    backgroundColor: chartColors[1] + '20',
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 1000) + 'K';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function initializeInteractivity() {
    console.log('Initializing interactivity...');
    
    // Competitor platform tabs
    const competitorTabs = document.querySelectorAll('.competitor-tab');
    console.log('Found competitor tabs:', competitorTabs.length);
    
    competitorTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            currentPlatform = tab.dataset.platform;
            console.log('Platform changed to:', currentPlatform);
            
            competitorTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            updateMarketShareChart();
        });
    });

    // Financial scenario buttons
    const scenarioButtons = document.querySelectorAll('.scenario-btn');
    console.log('Found scenario buttons:', scenarioButtons.length);
    
    scenarioButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentScenario = btn.dataset.scenario;
            console.log('Scenario changed to:', currentScenario);
            
            scenarioButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            updateFinancialMetrics();
        });
    });

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', (e) => {
            e.preventDefault();
            exportData();
        });
    }
    
    console.log('Interactivity initialized');
}

function updateMarketShareChart() {
    if (!charts.marketShare) {
        console.error('Market share chart not found');
        return;
    }
    
    const data = dashboardData.competitor_benchmarking.market_share[currentPlatform];
    
    charts.marketShare.data.labels = data.map(d => d.company);
    charts.marketShare.data.datasets[0].data = data.map(d => d.share);
    charts.marketShare.data.datasets[0].backgroundColor = chartColors.slice(0, data.length);
    
    // Update tooltip data reference
    charts.marketShare.options.plugins.tooltip.callbacks.label = function(context) {
        const score = data[context.dataIndex].score;
        return `${context.label}: ${context.parsed}% (Score: ${score})`;
    };
    
    charts.marketShare.update();
}

function updateFinancialMetrics() {
    const scenario = dashboardData.financial_model.scenarios.find(s => s.name === currentScenario);
    
    const scenarioTitle = document.getElementById('scenarioTitle');
    const monthlyRevenue = document.getElementById('monthlyRevenue');
    const roiValue = document.getElementById('roiValue');
    
    if (scenarioTitle) scenarioTitle.textContent = `Monthly Revenue (${currentScenario})`;
    if (monthlyRevenue) monthlyRevenue.textContent = `$${scenario.monthly_revenue.toLocaleString()}`;
    if (roiValue) roiValue.textContent = `${scenario.roi_12_months}%`;
}

function exportData() {
    const dataToExport = {
        timestamp: new Date().toISOString(),
        dashboard_summary: {
            overall_ai_visibility: 58,
            content_mentions: 210,
            market_share: 22.8,
            roi_projection: 326
        },
        ai_visibility_scores: dashboardData.ai_visibility_scorecard.current_scores,
        content_gaps: dashboardData.content_performance.gap_analysis,
        competitor_data: dashboardData.competitor_benchmarking.market_share,
        financial_scenarios: dashboardData.financial_model.scenarios
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neeyamo-aeo-dashboard-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('Dashboard data exported successfully!');
}

// Responsive chart handling
window.addEventListener('resize', function() {
    Object.values(charts).forEach(chart => {
        if (chart && typeof chart.resize === 'function') {
            chart.resize();
        }
    });
});