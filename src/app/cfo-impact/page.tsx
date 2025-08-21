"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  Area,
  AreaChart,
} from "recharts";
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  Shield,
  DollarSign,
  Users,
  Target,
  Brain,
  Lightbulb,
  ArrowRight,
  Filter,
  Calendar,
  MapPin,
  Building,
  ChevronDown,
  Play,
  Pause,
  RotateCcw,
  TrendingDown,
} from "lucide-react";

type Insight = {
  title: string;
  reasoning: string[];
  recommendations: string[];
  impact: string;
};

const TABS = ["delays", "procurement", "contractors", "compliance"] as const;
type Tab = (typeof TABS)[number];

const QuesttCFODemo = () => {
  const [activeTab, setActiveTab] = useState<Tab>("delays");
  const [selectedProject, setSelectedProject] = useState(
    "Mumbai Metro Phase 3"
  );
  const [aiInsight, setAiInsight] = useState<Insight | null>(null);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Filter states
  const [timeFilter, setTimeFilter] = useState("YTD");
  const [regionFilter, setRegionFilter] = useState("All");
  const [buFilter, setBuFilter] = useState("All");
  const [showDrillDown, setShowDrillDown] = useState(false);

  // AI Scenario sliders - only negative impact scenarios
  const [aiScenarios, setAiScenarios] = useState({
    weatherDelay: 0, // 0-60 days
    materialInflation: 0, // 0-30%
  });

  // Add CSS styles for slider
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
    .slider { -webkit-appearance: none; appearance: none; }
    .slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 20px; width: 20px; border-radius: 50%;
      background: #dc2626; cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .slider::-moz-range-thumb {
      height: 20px; width: 20px; border-radius: 50%;
      background: #dc2626; cursor: pointer; border: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
  `;
    document.head.appendChild(style);

    return () => {
      // either:
      style.remove(); // returns void
      // or: if (style.parentNode) style.parentNode.removeChild(style);
      // or: void document.head.removeChild(style);
    };
  }, []);

  // Business Units
  const businessUnits = [
    "All",
    "Transportation",
    "Urban Development",
    "Energy & Power",
    "Water Infrastructure",
  ];
  const regions = ["All", "North", "South", "East", "West"];
  const timePeriods = ["Month", "Quarter", "YTD", "Full Year"];

  // Expanded project data with 10 projects and RAG status
  const projectHealthData = [
    {
      project: "Mumbai Metro Phase 3",
      bu: "Transportation",
      region: "West",
      delayRisk: 85,
      financialExposure: 135,
      ragStatus: "Red",
      completion: 67,
      budget: 2450,
      spent: 1893,
      projectManager: "Rajesh Kumar",
      timeline: "Mar 2025",
    },
    {
      project: "Bangalore Outer Ring Road",
      bu: "Transportation",
      region: "South",
      delayRisk: 72,
      financialExposure: 96,
      ragStatus: "Red",
      completion: 78,
      budget: 1890,
      spent: 1567,
      projectManager: "Anitha Reddy",
      timeline: "Jan 2025",
    },
    {
      project: "Delhi Airport Terminal 4",
      bu: "Transportation",
      region: "North",
      delayRisk: 38,
      financialExposure: 45,
      ragStatus: "Green",
      completion: 89,
      budget: 3200,
      spent: 2756,
      projectManager: "Vikram Singh",
      timeline: "Dec 2024",
    },
    {
      project: "Chennai Port Expansion",
      bu: "Transportation",
      region: "South",
      delayRisk: 45,
      financialExposure: 54,
      ragStatus: "Amber",
      completion: 82,
      budget: 1560,
      spent: 1234,
      projectManager: "Priya Nair",
      timeline: "Feb 2025",
    },
    {
      project: "Hyderabad Metro Extension",
      bu: "Transportation",
      region: "South",
      delayRisk: 68,
      financialExposure: 84,
      ragStatus: "Red",
      completion: 71,
      budget: 2100,
      spent: 1687,
      projectManager: "Satish Gupta",
      timeline: "Apr 2025",
    },
    {
      project: "Kolkata Smart City",
      bu: "Urban Development",
      region: "East",
      delayRisk: 52,
      financialExposure: 69,
      ragStatus: "Amber",
      completion: 75,
      budget: 1800,
      spent: 1423,
      projectManager: "Debojit Das",
      timeline: "Mar 2025",
    },
    {
      project: "Pune Water Treatment",
      bu: "Water Infrastructure",
      region: "West",
      delayRisk: 34,
      financialExposure: 36,
      ragStatus: "Green",
      completion: 91,
      budget: 890,
      spent: 756,
      projectManager: "Madhuri Joshi",
      timeline: "Dec 2024",
    },
    {
      project: "Gurgaon Power Grid",
      bu: "Energy & Power",
      region: "North",
      delayRisk: 41,
      financialExposure: 48,
      ragStatus: "Amber",
      completion: 85,
      budget: 1200,
      spent: 978,
      projectManager: "Arjun Malhotra",
      timeline: "Jan 2025",
    },
    {
      project: "Ahmedabad Metro Phase 2",
      bu: "Transportation",
      region: "West",
      delayRisk: 59,
      financialExposure: 72,
      ragStatus: "Amber",
      completion: 73,
      budget: 1650,
      spent: 1289,
      projectManager: "Neha Patel",
      timeline: "May 2025",
    },
    {
      project: "Bhubaneswar Smart Highway",
      bu: "Transportation",
      region: "East",
      delayRisk: 47,
      financialExposure: 57,
      ragStatus: "Amber",
      completion: 79,
      budget: 1340,
      spent: 1045,
      projectManager: "Ravi Mohanty",
      timeline: "Feb 2025",
    },
  ];

  // Filter projects based on selected filters
  const getFilteredProjects = () => {
    return projectHealthData.filter((project) => {
      const regionMatch =
        regionFilter === "All" || project.region === regionFilter;
      const buMatch = buFilter === "All" || project.bu === buFilter;
      return regionMatch && buMatch;
    });
  };

  const procurementData = [
    {
      material: "Steel",
      currentPrice: 75000,
      budgetPrice: 68000,
      variance: 10.3,
      exposure: 37,
    },
    {
      material: "Cement",
      currentPrice: 420,
      budgetPrice: 380,
      variance: 10.5,
      exposure: 27,
    },
    {
      material: "Fuel",
      currentPrice: 98,
      budgetPrice: 85,
      variance: 15.3,
      exposure: 47,
    },
    {
      material: "Concrete",
      currentPrice: 6500,
      budgetPrice: 6200,
      variance: 4.8,
      exposure: 20,
    },
  ];

  const teamPerformanceData = [
    {
      team: "North Region Team",
      reliability: 92,
      qualityScore: 88,
      delayIncidents: 2,
      marginImpact: -1.2,
      projects: 2,
    },
    {
      team: "South Region Team",
      reliability: 87,
      qualityScore: 91,
      delayIncidents: 3,
      marginImpact: -2.1,
      projects: 3,
    },
    {
      team: "West Region Team",
      reliability: 81,
      qualityScore: 85,
      delayIncidents: 5,
      marginImpact: -3.1,
      projects: 3,
    },
    {
      team: "East Region Team",
      reliability: 76,
      qualityScore: 79,
      delayIncidents: 4,
      marginImpact: -2.8,
      projects: 2,
    },
  ];

  const buMarginData = [
    {
      bu: "Transportation",
      marginImpact: -2.8,
      projectCount: 6,
      portfolioValue: 12450,
      keyIssues: "Contractor delays, material cost overruns",
      riskLevel: "High",
    },
    {
      bu: "Urban Development",
      marginImpact: -1.5,
      projectCount: 1,
      portfolioValue: 1800,
      keyIssues: "Regulatory compliance delays",
      riskLevel: "Medium",
    },
    {
      bu: "Energy & Power",
      marginImpact: -0.8,
      projectCount: 1,
      portfolioValue: 1200,
      keyIssues: "Equipment delivery delays",
      riskLevel: "Low",
    },
    {
      bu: "Water Infrastructure",
      marginImpact: +0.3,
      projectCount: 1,
      portfolioValue: 890,
      keyIssues: "Ahead of schedule",
      riskLevel: "Green",
    },
  ];

  const complianceData = [
    { category: "Safety Standards", score: 94, risk: "Low", penalties: 0 },
    { category: "Environmental", score: 78, risk: "Medium", penalties: 2.5 },
    { category: "Labor Laws", score: 89, risk: "Low", penalties: 0.8 },
    {
      category: "Quality Assurance",
      score: 82,
      risk: "Medium",
      penalties: 1.2,
    },
  ];

  const cashFlowData = [
    { month: "Oct 2024", planned: 1200, actual: 1180, projected: 1150 },
    { month: "Nov 2024", planned: 1350, actual: 1320, projected: 1280 },
    { month: "Dec 2024", planned: 1450, actual: 0, projected: 1380 },
    { month: "Jan 2025", planned: 1500, actual: 0, projected: 1420 },
    { month: "Feb 2025", planned: 1400, actual: 0, projected: 1350 },
    { month: "Mar 2025", planned: 1600, actual: 0, projected: 1480 },
  ];

  // Calculate negative impact based on scenario intensities
  const calculateNegativeImpact = () => {
    const weatherImpact = aiScenarios.weatherDelay * 0.5; // ₹0.5 Cr per day delay
    const materialImpact = aiScenarios.materialInflation * 2.3; // ₹2.3 Cr per 1% inflation
    const totalImpact = weatherImpact + materialImpact;

    return {
      weatherImpact,
      materialImpact,
      totalImpact,
      marginImpact: (totalImpact / 16340) * 100, // Percentage of total portfolio
    };
  };

  const aiRecommendations = {
    delays: {
      title: "AI Analysis: Weather-Related Delay Impact Assessment",
      reasoning: [
        "Historical weather data analysis shows 67% correlation between monsoon intensity and project delays",
        `Current scenario predicts ${aiScenarios.weatherDelay} additional delay days across active projects`,
        "Critical path analysis identifies 4 projects with weather-exposed activities in Q1 2025",
      ],
      recommendations: [
        "Implement weather monitoring alerts for projects in Red/Amber status",
        "Pre-position critical materials before monsoon season to minimize exposure",
        "Negotiate weather-conditional clauses with contractors for high-risk projects",
        "Consider temporary project suspension during extreme weather periods",
      ],
      impact: `Estimated negative impact: ₹${calculateNegativeImpact().weatherImpact.toFixed(
        1
      )} Cr (${calculateNegativeImpact().marginImpact.toFixed(
        2
      )}% margin erosion)`,
    },
    procurement: {
      title: "AI Analysis: Material Cost Inflation Impact",
      reasoning: [
        `Material cost inflation of ${aiScenarios.materialInflation}% will directly impact project margins`,
        "Steel and cement represent 65% of total material costs across portfolio",
        "Current contracts lack adequate price escalation protection for rapid inflation",
      ],
      recommendations: [
        "Immediate renegotiation of material contracts with price caps",
        "Accelerate bulk procurement before further price increases",
        "Implement dynamic hedging strategies for commodity price risks",
        "Review project pricing models to reflect current cost environment",
      ],
      impact: `Estimated cost overrun: ₹${calculateNegativeImpact().materialImpact.toFixed(
        1
      )} Cr due to material inflation`,
    },
    contractors: {
      title: "AI Analysis: Team Performance Optimization",
      reasoning: [
        "Performance correlation analysis across regional teams and project outcomes",
        "Quality incidents directly impact project margins by 2.8% on average",
        "Resource reallocation benefits justified when performance gap >15%",
      ],
      recommendations: [
        "Reallocate resources from West Region team to North Region team for Q2 projects",
        "Implement cross-regional knowledge sharing for best practices",
        "Establish performance-based incentives for teams achieving >85% quality scores",
      ],
      impact: "Project margin improvement of 3.2% (₹47 Cr value creation)",
    },
    compliance: {
      title: "AI Analysis: Compliance Risk Management",
      reasoning: [
        "Environmental compliance gaps correlate with 78% of penalty incidents",
        "Safety score improvements show exponential cost reduction benefits",
        "Regulatory change prediction model indicates 3 new requirements in 2025",
      ],
      recommendations: [
        "Immediate environmental audit for projects scoring <80%",
        "Implement real-time safety monitoring IoT systems",
        "Pre-compliance preparation for anticipated 2025 regulatory changes",
      ],
      impact: "Penalty avoidance of ₹4 Cr + reputation protection value",
    },
  };

  const runSimulation = () => {
    const hasActiveScenarios = Object.values(aiScenarios).some(
      (value) => value > 0
    );
    if (!hasActiveScenarios) {
      alert(
        "Please adjust at least one scenario intensity before running simulation"
      );
      return;
    }

    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      setAiInsight(aiRecommendations[activeTab]);
    }, 2000);
  };

  const getRagColor = (status: string) => {
    switch (status) {
      case "Red":
        return "#dc2626";
      case "Amber":
        return "#f59e0b";
      case "Green":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "#dc2626";
      case "High":
        return "#ea580c";
      case "Medium":
        return "#ca8a04";
      case "Low":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  const TabButton = ({
    id,
    label,
    icon: Icon,
    isActive,
    onClick,
  }: {
    id: string;
    label: string;
    icon: any;
    isActive: boolean;
    onClick: (id: Tab) => void;
  }) => (
    <button
      onClick={() => onClick(id as Tab)}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const PlatformBadge = ({
    platform,
    description,
  }: {
    platform: string;
    description: string;
  }) => {
    const colors = {
      Neo: "bg-purple-100 text-purple-800 border-purple-200",
      Cortex: "bg-blue-100 text-blue-800 border-blue-200",
      "Cortex X": "bg-green-100 text-green-800 border-green-200",
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
          colors[platform as keyof typeof colors]
        }`}
      >
        <span className="font-semibold">{platform}</span>
        <span className="ml-2 text-xs opacity-80">{description}</span>
      </div>
    );
  };

  const FilterButton = ({
    value,
    currentValue,
    onChange,
    options,
  }: {
    value: string;
    currentValue: string;
    onChange: (value: string) => void;
    options: string[];
  }) => (
    <div className="relative inline-block">
      <select
        value={currentValue}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={16}
      />
    </div>
  );

  const SliderControl = ({
    id,
    label,
    value,
    max,
    unit,
    onChange,
    description,
  }: {
    id: string;
    label: string;
    value: number;
    max: number;
    unit: string;
    onChange: (id: string, value: number) => void;
    description: string;
  }) => (
    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-red-600">
          {value}
          {unit}
        </span>
      </div>
      <div className="text-xs text-gray-600 mb-3">{description}</div>
      <div className="relative">
        <input
          type="range"
          min="0"
          max={max}
          value={value}
          onChange={(e) => onChange(id, parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #dc2626 0%, #dc2626 ${
              (value / max) * 100
            }%, #e5e7eb ${(value / max) * 100}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      </div>
    </div>
  );

  const ProjectHealthCard = ({
    project,
    onClick,
  }: {
    project: any;
    onClick: (project: any) => void;
  }) => (
    <div
      onClick={() => onClick(project)}
      className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800 truncate">
          {project.project}
        </h4>
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: getRagColor(project.ragStatus) }}
        />
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>BU: {project.bu}</div>
        <div>Region: {project.region}</div>
        <div>Progress: {project.completion}%</div>
        <div>Timeline: {project.timeline}</div>
        <div>Budget: ₹{project.budget} Cr</div>
        <div>Spent: ₹{project.spent} Cr</div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        PM: {project.projectManager}
      </div>
    </div>
  );

  const negativeImpact = calculateNegativeImpact();

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white p-8 rounded-xl mb-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Questt Platform Suite</h1>
            <p className="text-xl text-blue-100 mb-4">
              AI-Driven Risk Impact Analysis for Infrastructure CFOs
            </p>
            <div className="flex space-x-4">
              <PlatformBadge platform="Neo" description="Data Consolidation" />
              <PlatformBadge
                platform="Cortex"
                description="Real-time Analytics"
              />
              <PlatformBadge
                platform="Cortex X"
                description="AI Risk Simulation"
              />
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">₹16,340 Cr</div>
            <div className="text-blue-200">Portfolio Value</div>
            <div className="text-sm text-blue-300 mt-2">10 Active Projects</div>
            {negativeImpact.totalImpact > 0 && (
              <div className="mt-2 p-2 bg-red-500 bg-opacity-20 rounded border border-red-300">
                <div className="text-red-200 text-sm">Risk Exposure</div>
                <div className="text-red-100 font-bold">
                  ₹{negativeImpact.totalImpact.toFixed(1)} Cr
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
        <div className="flex items-center space-x-6 flex-wrap">
          <div className="flex items-center space-x-2">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Time Period:
            </span>
            <FilterButton
              value={timeFilter}
              currentValue={timeFilter}
              onChange={setTimeFilter}
              options={timePeriods}
            />
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Region:</span>
            <FilterButton
              value={regionFilter}
              currentValue={regionFilter}
              onChange={setRegionFilter}
              options={regions}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Building size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              Business Unit:
            </span>
            <FilterButton
              value={buFilter}
              currentValue={buFilter}
              onChange={setBuFilter}
              options={businessUnits}
            />
          </div>
          <button
            onClick={() => setShowDrillDown(!showDrillDown)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter size={16} />
            <span>Project Details</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-8 overflow-x-auto">
        <TabButton
          id="delays"
          label="Weather Impact"
          icon={Clock}
          isActive={activeTab === "delays"}
          onClick={setActiveTab}
        />
        <TabButton
          id="procurement"
          label="Material Inflation"
          icon={TrendingDown}
          isActive={activeTab === "procurement"}
          onClick={setActiveTab}
        />
        <TabButton
          id="contractors"
          label="Team Performance"
          icon={Users}
          isActive={activeTab === "contractors"}
          onClick={setActiveTab}
        />
        <TabButton
          id="compliance"
          label="Compliance Risk"
          icon={Shield}
          isActive={activeTab === "compliance"}
          onClick={setActiveTab}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Health Overview - Always visible */}
          {showDrillDown && (
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Project Health Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {getFilteredProjects().map((project, index) => (
                  <ProjectHealthCard
                    key={index}
                    project={project}
                    onClick={(p) => setSelectedProject(p.project)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Weather Impact Tab */}
          {activeTab === "delays" && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Weather-Related Delay Risk Analysis
                  </h2>
                  <div className="flex space-x-2">
                    <PlatformBadge platform="Neo" description="Schedule Data" />
                    <PlatformBadge
                      platform="Cortex"
                      description="Weather Tracking"
                    />
                  </div>
                </div>

                {negativeImpact.weatherImpact > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <AlertTriangle className="text-red-600 mr-2" size={20} />
                      <div>
                        <div className="font-semibold text-red-800">
                          Weather Impact Detected
                        </div>
                        <div className="text-red-700">
                          Projected cost impact: ₹
                          {negativeImpact.weatherImpact.toFixed(1)} Cr from{" "}
                          {aiScenarios.weatherDelay} days of weather delays
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={getFilteredProjects()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="project"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="delayRisk"
                      fill="#3b82f6"
                      name="Delay Risk %"
                    />
                    <Bar
                      dataKey="financialExposure"
                      fill="#ef4444"
                      name="Financial Exposure (₹Cr)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Cash Flow Impact Analysis - {timeFilter}
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="planned"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      name="Planned (₹Cr)"
                    />
                    <Area
                      type="monotone"
                      dataKey="projected"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      fillOpacity={0.3}
                      name="AI Projected (₹Cr)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </>
          )}

          {/* Material Inflation Tab */}
          {activeTab === "procurement" && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Material Cost Inflation Impact
                  </h2>
                  <div className="flex space-x-2">
                    <PlatformBadge platform="Neo" description="Price Data" />
                    <PlatformBadge
                      platform="Cortex"
                      description="Inflation Tracking"
                    />
                  </div>
                </div>

                {negativeImpact.materialImpact > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <TrendingDown className="text-red-600 mr-2" size={20} />
                      <div>
                        <div className="font-semibold text-red-800">
                          Material Inflation Impact
                        </div>
                        <div className="text-red-700">
                          Projected cost overrun: ₹
                          {negativeImpact.materialImpact.toFixed(1)} Cr from{" "}
                          {aiScenarios.materialInflation}% inflation
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {procurementData.map((item, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{item.material}</h4>
                        <span
                          className={`px-2 py-1 rounded text-sm ${
                            item.variance > 10
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          +{item.variance}%
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>
                          Current: ₹{item.currentPrice.toLocaleString()}
                        </div>
                        <div>Budget: ₹{item.budgetPrice.toLocaleString()}</div>
                        <div className="font-medium text-red-600">
                          Exposure: ₹{item.exposure} Cr
                        </div>
                        {aiScenarios.materialInflation > 0 && (
                          <div className="font-medium text-red-700 mt-1">
                            Impact: ₹
                            {(
                              item.exposure *
                              (aiScenarios.materialInflation / 10)
                            ).toFixed(1)}{" "}
                            Cr
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Team Performance Tab */}
          {activeTab === "contractors" && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Regional Team Performance Matrix
                  </h2>
                  <div className="flex space-x-2">
                    <PlatformBadge
                      platform="Neo"
                      description="Performance Data"
                    />
                    <PlatformBadge
                      platform="Cortex"
                      description="Team Scorecards"
                    />
                  </div>
                </div>

                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={teamPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="reliability"
                      domain={[65, 95]}
                      name="Reliability Score"
                    />
                    <YAxis
                      dataKey="qualityScore"
                      domain={[70, 95]}
                      name="Quality Score"
                    />
                    <Tooltip
                      formatter={(value, name) => [value, name]}
                      labelFormatter={(label) =>
                        `${
                          teamPerformanceData.find(
                            (c) => c.reliability === label
                          )?.team || "Team"
                        }`
                      }
                    />
                    <Scatter dataKey="reliability" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Margin Impact Analysis - By Business Unit
                </h3>
                <div className="space-y-4">
                  {buMarginData.map((bu, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-lg">{bu.bu}</div>
                          <div className="text-sm text-gray-600">
                            {bu.projectCount} projects • ₹{bu.portfolioValue} Cr
                            portfolio
                          </div>
                        </div>
                        <div
                          className={`text-xl font-bold ${
                            bu.marginImpact > 0
                              ? "text-green-600"
                              : bu.marginImpact > -2
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {bu.marginImpact > 0 ? "+" : ""}
                          {bu.marginImpact}%
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                          Key Issues: {bu.keyIssues}
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            bu.riskLevel === "Green"
                              ? "bg-green-100 text-green-800"
                              : bu.riskLevel === "Low"
                              ? "bg-green-100 text-green-800"
                              : bu.riskLevel === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {bu.riskLevel} Risk
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Compliance Tab */}
          {activeTab === "compliance" && (
            <>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Compliance Risk Dashboard
                  </h2>
                  <div className="flex space-x-2">
                    <PlatformBadge
                      platform="Neo"
                      description="Compliance Data"
                    />
                    <PlatformBadge
                      platform="Cortex"
                      description="Risk Monitoring"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={complianceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="score"
                        label={({ name, score }) => `${name}: ${score}%`}
                      >
                        {complianceData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              entry.score > 85
                                ? "#10b981"
                                : entry.score > 75
                                ? "#f59e0b"
                                : "#ef4444"
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="space-y-4">
                    {complianceData.map((item, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{item.category}</h4>
                          <span
                            className={`px-2 py-1 rounded text-sm ${
                              item.risk === "Low"
                                ? "bg-green-100 text-green-800"
                                : item.risk === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item.risk} Risk
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <div>Score: {item.score}%</div>
                          <div>Penalties: ₹{item.penalties} Cr</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* AI Risk Simulation Panel */}
        <div className="space-y-6">
          {/* Risk Scenario Controls */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 text-red-600" />
              Risk Impact Simulation
            </h3>
            <div className="space-y-4">
              <SliderControl
                id="weatherDelay"
                label="Weather Delay Impact"
                value={aiScenarios.weatherDelay}
                max={60}
                unit=" days"
                description="Simulate monsoon/extreme weather delays across active projects"
                onChange={(id, value) =>
                  setAiScenarios((prev) => ({ ...prev, [id]: value }))
                }
              />
              <SliderControl
                id="materialInflation"
                label="Material Cost Inflation"
                value={aiScenarios.materialInflation}
                max={30}
                unit="%"
                description="Simulate commodity price increases affecting project costs"
                onChange={(id, value) =>
                  setAiScenarios((prev) => ({ ...prev, [id]: value }))
                }
              />
            </div>

            {/* Impact Summary */}
            {negativeImpact.totalImpact > 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">
                  Combined Risk Impact
                </h4>
                <div className="text-sm text-red-700 space-y-1">
                  <div>
                    Weather Impact: ₹{negativeImpact.weatherImpact.toFixed(1)}{" "}
                    Cr
                  </div>
                  <div>
                    Material Impact: ₹{negativeImpact.materialImpact.toFixed(1)}{" "}
                    Cr
                  </div>
                  <div className="font-semibold pt-1 border-t border-red-300">
                    Total Risk: ₹{negativeImpact.totalImpact.toFixed(1)} Cr (
                    {negativeImpact.marginImpact.toFixed(2)}% of portfolio)
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={runSimulation}
              disabled={simulationRunning}
              className="w-full mt-4 bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:from-red-700 hover:to-orange-700 transition-all disabled:opacity-50 flex items-center justify-center"
            >
              {simulationRunning ? (
                <>
                  <Pause className="mr-2" size={16} />
                  Running Risk Analysis...
                </>
              ) : (
                <>
                  <Play className="mr-2" size={16} />
                  Run Impact Simulation
                </>
              )}
            </button>
          </div>

          {/* AI Risk Analysis Results */}
          {aiInsight && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-red-800">
                <Lightbulb className="mr-2" />
                {aiInsight.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    AI Risk Assessment:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {aiInsight.reasoning.map((reason: any, index: any) => (
                      <li key={index} className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">
                    Risk Mitigation Actions:
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    {aiInsight.recommendations.map((rec: any, index: any) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight
                          className="text-orange-500 mr-2 mt-0.5 flex-shrink-0"
                          size={14}
                        />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                  <h4 className="font-medium text-red-800 mb-1">
                    Financial Impact:
                  </h4>
                  <p className="text-sm text-red-700">{aiInsight.impact}</p>
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Health by BU */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Portfolio Health by BU
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Transportation</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">
                    ₹12,450 Cr
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Urban Development</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">₹1,800 Cr</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Energy & Power</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">₹1,200 Cr</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Water Infrastructure</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-800">₹890 Cr</span>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">
                  Portfolio Health
                </span>
                <span className="font-semibold text-red-600">
                  {negativeImpact.totalImpact > 0
                    ? `${(72 - negativeImpact.marginImpact).toFixed(
                        0
                      )}% At Risk`
                    : "72% On Track"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>
          Questt Platform Suite - AI-Powered Risk Management for Infrastructure
          Finance
        </p>
        <p className="mt-1">Proactive Risk Detection & Impact Assessment</p>
      </div>
    </div>
  );
};

export default QuesttCFODemo;
