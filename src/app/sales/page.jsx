"use client"
import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Home, BarChart3, Users, Package, Settings, Bell, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, X, GitBranch, Sparkles, Activity, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';

export default function ExecutiveOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q4 FY25');
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [expandedIssue, setExpandedIssue] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentView, setCurrentView] = useState('overview');
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [showDecisionTrail, setShowDecisionTrail] = useState(false);
  const [expandedTrailQuery, setExpandedTrailQuery] = useState(null);
  const [trendView, setTrendView] = useState('weekly'); // 'weekly', 'monthly', 'yearly'
  const [showComparison, setShowComparison] = useState(true);

  const heroData = {
    targetAchievement: 87,
    absoluteGap: -2.4,
    confidence: 'At Risk',
    target: 185,
    actual: 161
  };

  const trendDataByView = {
    weekly: {
      current: [
        { label: 'W1', value: 78 },
        { label: 'W2', value: 82 },
        { label: 'W3', value: 85 },
        { label: 'W4', value: 89 },
        { label: 'W5', value: 91 },
        { label: 'W6', value: 88 },
        { label: 'W7', value: 87 }
      ],
      previous: [
        { label: 'W1', value: 82 },
        { label: 'W2', value: 84 },
        { label: 'W3', value: 86 },
        { label: 'W4', value: 88 },
        { label: 'W5', value: 90 },
        { label: 'W6', value: 89 },
        { label: 'W7', value: 91 }
      ]
    },
    monthly: {
      current: [
        { label: 'Oct', value: 82 },
        { label: 'Nov', value: 86 },
        { label: 'Dec', value: 89 },
        { label: 'Jan', value: 87 }
      ],
      previous: [
        { label: 'Jun', value: 85 },
        { label: 'Jul', value: 87 },
        { label: 'Aug', value: 89 },
        { label: 'Sep', value: 91 }
      ]
    },
    yearly: {
      current: [
        { label: 'FY22', value: 78 },
        { label: 'FY23', value: 82 },
        { label: 'FY24', value: 88 },
        { label: 'FY25', value: 87 }
      ],
      previous: []
    }
  };

  const regionalBreakdown = [
    { region: 'TG', achievement: 94, target: 28, actual: 26.32 },
    { region: 'TN', achievement: 91, target: 42, actual: 38.22 },
    { region: 'AP', achievement: 89, target: 22, actual: 19.58 },
    { region: 'KA', achievement: 88, target: 38, actual: 33.44 },
    { region: 'KL', achievement: 86, target: 10, actual: 8.6 },
    { region: 'MH', achievement: 82, target: 45, actual: 36.9 }
  ];

  const decisionTrailData = [
    {
      time: '08:23:14',
      agent: 'Orchestrator',
      agentColor: '#85A383',
      action: 'Initiated Analysis',
      database: null,
      query: null,
      thinking: 'Detected inventory alert for Ayurvedic Wellness range at Maharashtra Modern Trade outlets. Stock age exceeds 45 days threshold. Triggering multi-agent analysis to generate clearance recommendation.',
      next: 'Inventory Agent'
    },
    {
      time: '08:23:18',
      agent: 'Inventory Agent',
      agentColor: '#D4AF37',
      action: 'Query Current Stock',
      database: 'Warehouse Management',
      query: 'SELECT product_id, location, stock_quantity, stock_age_days, last_movement_date FROM inventory WHERE product_line = "Ayurvedic Wellness" AND region = "Maharashtra" AND stock_age_days > 45',
      queryResult: '847 units aged 45-62 days across 12 Modern Trade outlets in Pune and Mumbai. Last significant movement was 18 days ago.',
      thinking: 'Current stock is critically high at 847 units across Maharashtra Modern Trade. Stock age ranges 45-62 days with minimal movement. Average shelf life for this category is 90 days, leaving only 28-45 days to clear. This is blocking ₹1.2Cr and preventing Q1 Herbal Glow placement.',
      next: 'Sales Agent'
    },
    {
      time: '08:23:22',
      agent: 'Sales Agent',
      agentColor: '#DF7649',
      action: 'Query Sales Velocity',
      database: 'POS System',
      query: 'SELECT AVG(daily_units_sold), sell_through_rate, price_elasticity FROM sales_data WHERE product_line = "Ayurvedic Wellness" AND region = "Maharashtra" AND channel = "Modern Trade" AND date_range = LAST_60_DAYS',
      queryResult: 'Current velocity: 8 units/day. Historical velocity at full price: 12 units/day. At 15% discount: 28 units/day. At 20% discount: 35 units/day.',
      thinking: 'At current velocity of 8 units/day, clearing 847 units would take 106 days - well past expiry. Historical data shows 15% markdown increases velocity to 28 units/day, clearing stock in 30 days. 20% discount clears in 24 days but erodes margin further. Bundle strategy could accelerate without deep discounting.',
      next: 'Pricing Agent'
    },
    {
      time: '08:23:26',
      agent: 'Pricing Agent',
      agentColor: '#878B87',
      action: 'Calculate Optimal Markdown',
      database: 'Pricing Engine',
      query: 'CALCULATE optimal_markdown(current_price=₹450, stock_age=45-62, days_to_expiry=28-45, target_clearance_days=30, margin_floor=12%)',
      queryResult: 'Optimal markdown: 15% (₹383 per unit). Projected margin: 14.2%. Bundle option: Pair with fast-moving Natural Radiance at 10% off both, projects 32 units/day velocity.',
      thinking: 'A 15% straight markdown achieves clearance in 30 days with acceptable 14.2% margin. However, bundling with Natural Radiance (which moves at 45 units/day) at 10% discount on both products projects 32 units/day for Ayurvedic Wellness while maintaining 18% margin and boosting Natural Radiance sales. Bundle strategy is financially superior.',
      next: 'Channel Agent'
    },
    {
      time: '08:23:31',
      agent: 'Channel Agent',
      agentColor: '#85A383',
      action: 'Assess Channel Execution',
      database: 'Retail Execution',
      query: 'SELECT outlet_compliance, shelf_space_availability, promotion_capacity FROM retail_execution WHERE channel = "Modern Trade" AND region = "Maharashtra"',
      queryResult: '12 outlets confirmed. All have promotional end-cap availability. Big Bazaar and Reliance Fresh can execute within 48 hours. More requires 72 hours for merchandising team.',
      thinking: 'All 12 Modern Trade outlets can execute bundle promotion. Pune outlets (Big Bazaar, Reliance Fresh) have fastest turnaround at 48 hours. Mumbai outlets need 72 hours for merchandising setup. Phased rollout recommended: Pune Day 1-2, Mumbai Day 3-4. This allows monitoring and adjustment.',
      next: 'Financial Agent'
    },
    {
      time: '08:23:35',
      agent: 'Financial Agent',
      agentColor: '#D4AF37',
      action: 'Project Financial Impact',
      database: 'Financial Planning',
      query: 'CALCULATE impact_analysis(scenario="bundle_promotion", markdown=10%, projected_velocity=32, clearance_days=30, opportunity_cost="Q1_Herbal_Glow")',
      queryResult: 'Bundle strategy recovers ₹97L of ₹1.2Cr locked inventory. Saves ₹15L in potential write-offs. Frees shelf space worth ₹40L in Q1 Herbal Glow opportunity. Net positive impact: ₹1.52Cr vs ₹1.2Cr loss.',
      thinking: 'Bundle promotion recovers 81% of locked capital (₹97L) while avoiding write-offs (₹15L savings). More importantly, clearing shelf space enables Q1 Herbal Glow placement projected at ₹40L incremental revenue. Total financial benefit of ₹1.52Cr vs current ₹1.2Cr loss. ROI justifies immediate execution.',
      next: 'Orchestrator'
    },
    {
      time: '08:23:39',
      agent: 'Orchestrator',
      agentColor: '#85A383',
      action: 'Generate Recommendation',
      database: null,
      query: null,
      thinking: 'All agents converge on bundle promotion strategy: Pair Ayurvedic Wellness with Natural Radiance at 10% off both. Execute in phases - Pune (48hrs), Mumbai (72hrs). Projected clearance in 26-30 days, recovering ₹97L and enabling ₹40L Q1 opportunity. Assign to Priya Sharma (Pune) and Amit Desai (Mumbai) for immediate execution. Timeline: 3-5 days.',
      next: 'Human Decision'
    }
  ];

  const criticalIssues = [
    {
      id: 1,
      title: 'Maharashtra inventory buildup blocking shelf space',
      severity: 'high',
      impact: '₹1.2Cr',
      quickAction: 'Execute 15% markdown + bundle strategy within 3-5 days',
      dimensions: {
        region: 'Maharashtra (Pune, Mumbai)',
        product: 'Ayurvedic Wellness range - 45-60 day aged stock',
        channel: 'Modern Trade (Big Bazaar, More, Reliance Fresh)',
        financial: '₹1.2Cr locked + ₹40L opportunity cost',
        ripple: 'Delaying Q1 Herbal Glow launch shelf allocation',
        rootCause: 'Festival season overstock + slower than expected offtake in premium segment',
        action: 'Immediate markdown (15%) + bundle offers with fast-movers',
        owner: 'Priya Sharma (Pune) + Amit Desai (Mumbai)',
        timeline: '3-5 days'
      }
    },
    {
      id: 2,
      title: 'Karnataka festive launch window missed',
      severity: 'medium',
      impact: '₹80L',
      quickAction: 'Extend promotional period + activate distributor confidence scheme',
      dimensions: {
        region: 'Karnataka (Bangalore, Mysore)',
        product: 'Herbal Glow - New launch delayed by 2 weeks',
        channel: 'General Trade (4,500+ outlets)',
        financial: '₹80L revenue gap for quarter',
        ripple: 'Distributors now hesitant for Q1 commitments',
        rootCause: 'Manufacturing delay + regulatory approval for new ingredients',
        action: 'Extend promotional period + distributor confidence scheme',
        owner: 'Ramesh Kumar (Bangalore)',
        timeline: '1 week'
      }
    },
    {
      id: 3,
      title: 'Tamil Nadu quick commerce pricing pressure',
      severity: 'medium',
      impact: '₹40L',
      quickAction: 'Launch limited period counter-offer within 48 hours',
      dimensions: {
        region: 'Tamil Nadu (Chennai, Coimbatore)',
        product: 'Natural Radiance - Hero SKU facing 20% price gap',
        channel: 'E-commerce (Blinkit, Zepto, Swiggy Instamart)',
        financial: '₹40L revenue gap + margin erosion',
        ripple: 'Modern Trade asking for price parity, could cascade',
        rootCause: 'Competitor flash sale + aggressive quick commerce discounting',
        action: 'Limited period counter-offer + exclusive bundle for quick commerce',
        owner: 'Lakshmi Iyer (Chennai)',
        timeline: '48 hours'
      }
    }
  ];

  const regionData = [
    { 
      id: 'MH', 
      name: 'Maharashtra', 
      performance: 82, 
      status: 'at-risk', 
      target: 45, 
      actual: 36.9, 
      gap: -8.1,
      totalDistributors: 12,
      activeDistributors: 10,
      summary: 'Maharashtra is underperforming due to aged Ayurvedic Wellness inventory blocking premium retail shelf space. The issue is concentrated in Pune and Mumbai Modern Trade outlets where 45-60 day old stock is preventing new product placement.',
      actions: 'Priya and Amit need to execute immediate markdown strategy (15% off) combined with bundle offers. Clear aged inventory within 3-5 days to make room for Q1 Herbal Glow launch. Consider distributor buyback if markdown does not move stock fast enough.',
      team: [
        { 
          name: 'Priya Sharma', 
          territory: 'Pune', 
          achievement: 78, 
          target: 18, 
          actual: 14.04,
          gm: 21.5,
          creditHealth: 'At Risk',
          distributors: 3,
          activeDistributors: 3,
          distributorDetails: [
            { name: 'Shah Enterprises', outlets: 45, achievement: 72, creditUtil: 95, dso: 42 },
            { name: 'Patil Distribution', outlets: 38, achievement: 81, creditUtil: 88, dso: 38 },
            { name: 'Kulkarni Trading', outlets: 42, achievement: 79, creditUtil: 92, dso: 40 }
          ],
          topSKUs: ['Ayurvedic Wellness', 'Natural Radiance', 'Herbal Glow'], 
          channelMix: { modernTrade: 65, generalTrade: 25, ecommerce: 10 },
          tsrTeam: [
            { name: 'Arjun Mehta', area: 'Kothrud', achievement: 72, outlets: 45, activeOutlets: 42, target: 6, actual: 4.32 },
            { name: 'Deepak Patil', area: 'Hinjewadi', achievement: 81, outlets: 38, activeOutlets: 36, target: 5, actual: 4.05 },
            { name: 'Anita Joshi', area: 'Pimpri', achievement: 79, outlets: 42, activeOutlets: 38, target: 7, actual: 5.53 }
          ]
        },
        { 
          name: 'Amit Desai', 
          territory: 'Mumbai', 
          achievement: 85, 
          target: 27, 
          actual: 22.95,
          gm: 23.8,
          creditHealth: 'Healthy',
          distributors: 5,
          activeDistributors: 5,
          distributorDetails: [
            { name: 'Mumbai Trade Corp', outlets: 52, achievement: 88, creditUtil: 78, dso: 35 },
            { name: 'Western Distributors', outlets: 48, achievement: 84, creditUtil: 82, dso: 37 },
            { name: 'Coastal Suppliers', outlets: 55, achievement: 83, creditUtil: 85, dso: 39 },
            { name: 'Metro Sales Ltd', outlets: 45, achievement: 86, creditUtil: 80, dso: 36 },
            { name: 'City Distribution', outlets: 40, achievement: 84, creditUtil: 83, dso: 38 }
          ],
          topSKUs: ['Natural Radiance', 'Herbal Glow', 'Ayurvedic Wellness'], 
          channelMix: { modernTrade: 58, generalTrade: 30, ecommerce: 12 },
          tsrTeam: [
            { name: 'Rahul Khanna', area: 'Andheri', achievement: 88, outlets: 52, activeOutlets: 50, target: 9, actual: 7.92 },
            { name: 'Sanjay Iyer', area: 'Bandra', achievement: 84, outlets: 48, activeOutlets: 46, target: 8, actual: 6.72 },
            { name: 'Meera Shah', area: 'Thane', achievement: 83, outlets: 55, activeOutlets: 51, target: 10, actual: 8.3 }
          ]
        },
        { 
          name: 'Rahul Patil', 
          territory: 'Nagpur', 
          achievement: 91, 
          target: 8, 
          actual: 7.28,
          gm: 24.2,
          creditHealth: 'Healthy',
          distributors: 2,
          activeDistributors: 2,
          distributorDetails: [
            { name: 'Vidarbha Traders', outlets: 28, achievement: 93, creditUtil: 72, dso: 32 },
            { name: 'Central India Dist', outlets: 24, achievement: 89, creditUtil: 75, dso: 34 }
          ],
          topSKUs: ['Herbal Glow', 'Ayurvedic Wellness', 'Natural Radiance'], 
          channelMix: { modernTrade: 45, generalTrade: 45, ecommerce: 10 },
          tsrTeam: [
            { name: 'Vijay Kumar', area: 'Sitabuldi', achievement: 93, outlets: 28, activeOutlets: 27, target: 4, actual: 3.72 },
            { name: 'Pooja Deshmukh', area: 'Dharampeth', achievement: 89, outlets: 24, activeOutlets: 23, target: 4, actual: 3.56 }
          ]
        },
        { 
          name: 'Sneha Kulkarni', 
          territory: 'Nashik', 
          achievement: 82, 
          target: 6, 
          actual: 4.92,
          gm: 22.1,
          creditHealth: 'On Track',
          distributors: 2,
          activeDistributors: 2,
          distributorDetails: [
            { name: 'Wine City Suppliers', outlets: 32, achievement: 84, creditUtil: 86, dso: 38 },
            { name: 'North MH Trading', outlets: 28, achievement: 80, creditUtil: 88, dso: 40 }
          ],
          topSKUs: ['Natural Radiance', 'Ayurvedic Wellness', 'Herbal Glow'], 
          channelMix: { modernTrade: 40, generalTrade: 50, ecommerce: 10 },
          tsrTeam: [
            { name: 'Suresh Rane', area: 'College Road', achievement: 84, outlets: 32, activeOutlets: 30, target: 3, actual: 2.52 },
            { name: 'Kavita More', area: 'Panchavati', achievement: 80, outlets: 28, activeOutlets: 26, target: 3, actual: 2.4 }
          ]
        }
      ]
    },
    { 
      id: 'KA', 
      name: 'Karnataka', 
      performance: 88, 
      status: 'on-track', 
      target: 38, 
      actual: 33.44, 
      gap: -4.56,
      totalDistributors: 9,
      activeDistributors: 9,
      summary: 'Karnataka is tracking reasonably well at 88% despite the Herbal Glow launch delay. General Trade network remains strong with good distributor relationships, though the missed festive window created a ₹80L shortfall.',
      actions: 'Ramesh should extend the promotional period by 2 weeks and activate the distributor confidence scheme to rebuild momentum. Focus on recovering General Trade confidence for Q1 commitments. The 4.56Cr gap is recoverable with focused effort.',
      team: [
        { 
          name: 'Ramesh Kumar', 
          territory: 'Bangalore', 
          achievement: 89, 
          target: 28, 
          actual: 24.92,
          gm: 25.3,
          creditHealth: 'Healthy',
          distributors: 6,
          activeDistributors: 6,
          distributorDetails: [
            { name: 'Silicon Valley Dist', outlets: 48, achievement: 91, creditUtil: 75, dso: 33 },
            { name: 'Garden City Traders', outlets: 42, achievement: 88, creditUtil: 78, dso: 35 },
            { name: 'Tech Park Suppliers', outlets: 38, achievement: 88, creditUtil: 80, dso: 36 },
            { name: 'Whitefield Distribution', outlets: 35, achievement: 89, creditUtil: 76, dso: 34 },
            { name: 'HSR Layout Trading', outlets: 32, achievement: 90, creditUtil: 74, dso: 32 },
            { name: 'Electronic City Sales', outlets: 28, achievement: 87, creditUtil: 79, dso: 35 }
          ],
          topSKUs: ['Natural Radiance', 'Herbal Glow', 'Ayurvedic Wellness'], 
          channelMix: { modernTrade: 70, generalTrade: 20, ecommerce: 10 },
          tsrTeam: [
            { name: 'Kiran Rao', area: 'Koramangala', achievement: 91, outlets: 48, activeOutlets: 46, target: 10, actual: 9.1 },
            { name: 'Pradeep Gowda', area: 'Whitefield', achievement: 88, outlets: 42, activeOutlets: 40, target: 9, actual: 7.92 },
            { name: 'Sahana Reddy', area: 'Jayanagar', achievement: 88, outlets: 38, activeOutlets: 36, target: 9, actual: 7.92 }
          ]
        },
        { 
          name: 'Deepa Rao', 
          territory: 'Mysore', 
          achievement: 86, 
          target: 10, 
          actual: 8.6,
          gm: 23.7,
          creditHealth: 'Healthy',
          distributors: 3,
          activeDistributors: 3,
          distributorDetails: [
            { name: 'Palace City Dist', outlets: 35, achievement: 87, creditUtil: 81, dso: 36 },
            { name: 'Heritage Suppliers', outlets: 30, achievement: 85, creditUtil: 83, dso: 37 },
            { name: 'Chamundi Traders', outlets: 28, achievement: 86, creditUtil: 82, dso: 36 }
          ],
          topSKUs: ['Ayurvedic Wellness', 'Natural Radiance', 'Herbal Glow'], 
          channelMix: { modernTrade: 50, generalTrade: 40, ecommerce: 10 },
          tsrTeam: [
            { name: 'Harish Shetty', area: 'Vijayanagar', achievement: 87, outlets: 35, activeOutlets: 33, target: 5, actual: 4.35 },
            { name: 'Lakshmi Kumari', area: 'Hebbal', achievement: 85, outlets: 30, activeOutlets: 28, target: 5, actual: 4.25 }
          ]
        }
      ]
    },
    { 
      id: 'TN', 
      name: 'Tamil Nadu', 
      performance: 91, 
      status: 'healthy', 
      target: 42, 
      actual: 38.22, 
      gap: -3.78,
      totalDistributors: 11,
      activeDistributors: 11,
      summary: 'Tamil Nadu is performing strongly at 91% achievement, though facing pricing pressure in quick commerce channels. Natural Radiance SKU is the primary concern with competitors undercutting by 20% on flash sales.',
      actions: 'Lakshmi should launch a limited-period counter-offer (48-72 hours) specifically for quick commerce platforms. Consider exclusive bundles to differentiate from competitor flash sales. Monitor Modern Trade for price parity requests to prevent cascade effect.',
      team: [
        { 
          name: 'Lakshmi Iyer', 
          territory: 'Chennai', 
          achievement: 93, 
          target: 30, 
          actual: 27.9,
          gm: 24.8,
          creditHealth: 'Healthy',
          distributors: 7,
          activeDistributors: 7,
          distributorDetails: [
            { name: 'Marina Distributors', outlets: 55, achievement: 95, creditUtil: 72, dso: 30 },
            { name: 'T Nagar Traders', outlets: 48, achievement: 92, creditUtil: 74, dso: 31 },
            { name: 'Adyar Suppliers', outlets: 42, achievement: 92, creditUtil: 76, dso: 32 },
            { name: 'Velachery Sales', outlets: 38, achievement: 94, creditUtil: 73, dso: 31 },
            { name: 'Anna Nagar Dist', outlets: 35, achievement: 93, creditUtil: 75, dso: 32 },
            { name: 'Mylapore Trading', outlets: 32, achievement: 91, creditUtil: 77, dso: 33 },
            { name: 'Nungambakkam Sales', outlets: 28, achievement: 94, creditUtil: 74, dso: 31 }
          ],
          topSKUs: ['Natural Radiance', 'Herbal Glow', 'Ayurvedic Wellness'], 
          channelMix: { modernTrade: 60, generalTrade: 25, ecommerce: 15 },
          tsrTeam: [
            { name: 'Rajesh Sundaram', area: 'T Nagar', achievement: 95, outlets: 55, activeOutlets: 53, target: 12, actual: 11.4 },
            { name: 'Priya Ramesh', area: 'Velachery', achievement: 92, outlets: 48, activeOutlets: 46, target: 10, actual: 9.2 },
            { name: 'Kumar Swamy', area: 'Anna Nagar', achievement: 92, outlets: 42, activeOutlets: 40, target: 8, actual: 7.36 }
          ]
        },
        { 
          name: 'Karthik Venkat', 
          territory: 'Coimbatore', 
          achievement: 86, 
          target: 12, 
          actual: 10.32,
          gm: 22.9,
          creditHealth: 'Healthy',
          distributors: 4,
          activeDistributors: 4,
          distributorDetails: [
            { name: 'Manchester Traders', outlets: 38, achievement: 88, creditUtil: 79, dso: 35 },
            { name: 'RS Puram Suppliers', outlets: 34, achievement: 84, creditUtil: 82, dso: 36 },
            { name: 'Gandhipuram Dist', outlets: 30, achievement: 86, creditUtil: 80, dso: 35 },
            { name: 'Saibaba Colony Sales', outlets: 28, achievement: 86, creditUtil: 81, dso: 36 }
          ],
          topSKUs: ['Ayurvedic Wellness', 'Natural Radiance', 'Herbal Glow'], 
          channelMix: { modernTrade: 50, generalTrade: 40, ecommerce: 10 },
          tsrTeam: [
            { name: 'Senthil Kumar', area: 'RS Puram', achievement: 88, outlets: 38, activeOutlets: 36, target: 6, actual: 5.28 },
            { name: 'Divya Krishnan', area: 'Gandhipuram', achievement: 84, outlets: 34, activeOutlets: 32, target: 6, actual: 5.04 }
          ]
        }
      ]
    },
    { 
      id: 'AP', 
      name: 'Andhra Pradesh', 
      performance: 89, 
      status: 'on-track', 
      target: 22, 
      actual: 19.58, 
      gap: -2.42,
      totalDistributors: 7,
      activeDistributors: 7,
      summary: 'Andhra Pradesh is performing well at 89% with steady momentum across channels. No major issues flagged. The region has maintained consistent performance throughout the quarter.',
      actions: 'Srinivas should maintain current momentum and focus on closing the remaining 2.42Cr gap through consistent execution. Consider replicating successful tactics from Telangana at 94% achievement.',
      team: [
        { 
          name: 'Srinivas Reddy', 
          territory: 'Vijayawada', 
          achievement: 90, 
          target: 15, 
          actual: 13.5,
          gm: 23.5,
          creditHealth: 'Healthy',
          distributors: 4,
          activeDistributors: 4,
          distributorDetails: [
            { name: 'Krishna Delta Dist', outlets: 42, achievement: 91, creditUtil: 76, dso: 33 },
            { name: 'Benz Circle Traders', outlets: 38, achievement: 89, creditUtil: 78, dso: 34 },
            { name: 'Gandhi Nagar Sales', outlets: 35, achievement: 90, creditUtil: 77, dso: 33 },
            { name: 'Governorpet Suppliers', outlets: 32, achievement: 89, creditUtil: 79, dso: 35 }
          ],
          topSKUs: ['Natural Radiance', 'Herbal Glow', 'Ayurvedic Wellness'], 
          channelMix: { modernTrade: 55, generalTrade: 35, ecommerce: 10 },
          tsrTeam: [
            { name: 'Venkat Rao', area: 'Benz Circle', achievement: 91, outlets: 42, activeOutlets: 40, target: 8, actual: 7.28 },
            { name: 'Madhavi Devi', area: 'Gandhi Nagar', achievement: 89, outlets: 38, activeOutlets: 36, target: 7, actual: 6.23 }
          ]
        },
        { 
          name: 'Venkat Rao', 
          territory: 'Visakhapatnam', 
          achievement: 87, 
          target: 7, 
          actual: 6.09,
          gm: 22.8,
          creditHealth: 'Healthy',
          distributors: 3,
          activeDistributors: 3,
          distributorDetails: [
            { name: 'Port City Distributors', outlets: 32, achievement: 88, creditUtil: 80, dso: 35 },
            { name: 'Beach Road Traders', outlets: 28, achievement: 86, creditUtil: 82, dso: 36 },
            { name: 'MVP Suppliers', outlets: 25, achievement: 87, creditUtil: 81, dso: 35 }
          ],
          topSKUs: ['Ayurvedic Wellness', 'Natural Radiance', 'Herbal Glow'], 
          channelMix: { modernTrade: 50, generalTrade: 40, ecommerce: 10 },
          tsrTeam: [
            { name: 'Krishna Murthy', area: 'Dwaraka Nagar', achievement: 88, outlets: 32, activeOutlets: 30, target: 4, actual: 3.52 },
            { name: 'Sailaja Reddy', area: 'MVP Colony', achievement: 86, outlets: 28, activeOutlets: 26, target: 3, actual: 2.58 }
          ]
        }
      ]
    },
    { 
      id: 'TG', 
      name: 'Telangana', 
      performance: 94, 
      status: 'healthy', 
      target: 28, 
      actual: 26.32, 
      gap: -1.68,
      totalDistributors: 8,
      activeDistributors: 8,
      summary: 'Telangana has exceeded expectations at 94% achievement, the highest performing region this quarter. Strong execution across all channels with particularly good Modern Trade performance in Hyderabad.',
      actions: 'Nisha should document successful strategies and tactics for replication in other regions. Consider case study for Maharashtra team to learn from. Push for 100% achievement in final 2 weeks - well within reach.',
      team: [
        { 
          name: 'Nisha Patel', 
          territory: 'Hyderabad', 
          achievement: 94, 
          target: 20, 
          actual: 18.8,
          gm: 26.1,
          creditHealth: 'Healthy',
          distributors: 6,
          activeDistributors: 6,
          distributorDetails: [
            { name: 'Cyberabad Distributors', outlets: 45, achievement: 96, creditUtil: 68, dso: 28 },
            { name: 'Banjara Traders', outlets: 42, achievement: 94, creditUtil: 70, dso: 29 },
            { name: 'Jubilee Sales', outlets: 38, achievement: 92, creditUtil: 72, dso: 30 },
            { name: 'Hitech City Dist', outlets: 35, achievement: 95, creditUtil: 69, dso: 28 },
            { name: 'Gachibowli Suppliers', outlets: 32, achievement: 94, creditUtil: 71, dso: 29 },
            { name: 'Madhapur Trading', outlets: 28, achievement: 93, creditUtil: 73, dso: 30 }
          ],
          topSKUs: ['Natural Radiance', 'Herbal Glow', 'Ayurvedic Wellness'], 
          channelMix: { modernTrade: 65, generalTrade: 25, ecommerce: 10 },
          tsrTeam: [
            { name: 'Anil Kumar', area: 'Banjara Hills', achievement: 96, outlets: 45, activeOutlets: 44, target: 8, actual: 7.68 },
            { name: 'Swathi Rao', area: 'Jubilee Hills', achievement: 94, outlets: 42, activeOutlets: 41, target: 7, actual: 6.58 },
            { name: 'Ravi Teja', area: 'Hitech City', achievement: 92, outlets: 38, activeOutlets: 37, target: 5, actual: 4.6 }
          ]
        },
        { 
          name: 'Arjun Reddy', 
          territory: 'Warangal', 
          achievement: 93, 
          target: 8, 
          actual: 7.44,
          gm: 24.5,
          creditHealth: 'Healthy',
          distributors: 2,
          activeDistributors: 2,
          distributorDetails: [
            { name: 'Kakatiya Distributors', outlets: 30, achievement: 94, creditUtil: 74, dso: 31 },
            { name: 'Kazipet Traders', outlets: 26, achievement: 92, creditUtil: 76, dso: 32 }
          ],
          topSKUs: ['Ayurvedic Wellness', 'Natural Radiance', 'Herbal Glow'], 
          channelMix: { modernTrade: 50, generalTrade: 40, ecommerce: 10 },
          tsrTeam: [
            { name: 'Naresh Goud', area: 'Hanamkonda', achievement: 94, outlets: 30, activeOutlets: 29, target: 4, actual: 3.76 },
            { name: 'Padma Devi', area: 'Kazipet', achievement: 92, outlets: 26, activeOutlets: 25, target: 4, actual: 3.68 }
          ]
        }
      ]
    },
    { 
      id: 'KL', 
      name: 'Kerala', 
      performance: 86, 
      status: 'on-track', 
      target: 10, 
      actual: 8.6, 
      gap: -1.4,
      totalDistributors: 3,
      activeDistributors: 3,
      summary: 'Kerala is tracking at 86% with solid performance across channels. The market remains stable with no critical issues. Regional preferences for natural and ayurvedic products continue to drive steady demand.',
      actions: 'Suresh should maintain current approach and focus on last-mile execution to close the 1.4Cr gap. Consider promotional push in final weeks to boost performance to 90% or higher.',
      team: [
        { 
          name: 'Suresh Menon', 
          territory: 'Kochi', 
          achievement: 86, 
          target: 10, 
          actual: 8.6,
          gm: 23.2,
          creditHealth: 'Healthy',
          distributors: 3,
          activeDistributors: 3,
          distributorDetails: [
            { name: 'Marine Drive Dist', outlets: 36, achievement: 87, creditUtil: 79, dso: 34 },
            { name: 'Edappally Traders', outlets: 32, achievement: 85, creditUtil: 81, dso: 35 },
            { name: 'MG Road Suppliers', outlets: 28, achievement: 86, creditUtil: 80, dso: 34 }
          ],
          topSKUs: ['Ayurvedic Wellness', 'Natural Radiance', 'Herbal Glow'], 
          channelMix: { modernTrade: 55, generalTrade: 35, ecommerce: 10 },
          tsrTeam: [
            { name: 'Ramachandran Nair', area: 'Edappally', achievement: 87, outlets: 36, activeOutlets: 34, target: 5, actual: 4.35 },
            { name: 'Deepa Menon', area: 'Marine Drive', achievement: 85, outlets: 32, activeOutlets: 30, target: 5, actual: 4.25 }
          ]
        }
      ]
    }
  ];

  const navItems = [
    { icon: Home, label: 'Overview', href: "/sales" },
    { icon: BarChart3, label: 'Trade Intelligence', href: "/sales/trade-intelligence" },
    { icon: Package, label: 'New Product Analysis', href: "/sales/new-product-analysis" },
    { icon: Settings, label: 'Settings' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'healthy': return '#85A383';
      case 'on-track': return '#D4AF37';
      case 'at-risk': return '#DF7649';
      default: return '#878B87';
    }
  };

  const handleTeamMemberClick = (member) => {
    setSelectedTeamMember(member);
    setCurrentView('person-detail');
  };

  const handleBackToOverview = () => {
    setCurrentView('overview');
    setSelectedTeamMember(null);
  };

  const currentTrendData = trendDataByView[trendView].current;
  const previousTrendData = trendDataByView[trendView].previous;

  return (
    <div className="h-screen overflow-auto bg-[#F5F1E8] flex">
      {/* Left Navigation */}
      <div 
        className={`transition-all duration-300 ${navCollapsed ? 'w-20' : 'w-64'} flex flex-col`}
        style={{ backgroundColor: '#0C2C18' }}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(133, 163, 131, 0.3)' }}>
          {navCollapsed ? (
            <div className="text-2xl font-light text-center" style={{ fontFamily: 'Georgia, serif', color: '#85A383' }}>
              M
            </div>
          ) : (
            <div className="text-3xl font-light tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#85A383' }}>
              MORRiE
            </div>
          )}
        </div>

        <nav className="flex-1 pt-8 px-2">
          {navItems.map((item, index) => (
            <Link href={item.href ?? ""} key={index}>
            <div
              className={`cursor-pointer w-full hover:bg-[#85a383] flex items-center gap-4 px-6 py-4 text-left transition-colors ${
                item.active ? 'border-l-2' : ''
              }`}
            >
              <item.icon size={20} strokeWidth={1} />
              {!navCollapsed && (
                <span className="text-sm tracking-wide" style={{ fontFamily: 'sans-serif' }}>
                  {item.label}
                </span>
              )}
            </div></Link>
          ))}
        </nav>

        <button
          onClick={() => setNavCollapsed(!navCollapsed)}
          className="p-6 flex items-center justify-center border-t"
          style={{ color: '#878B87', borderColor: 'rgba(133, 163, 131, 0.3)' }}
        >
          {navCollapsed ? <ChevronRight size={20} strokeWidth={1} /> : <ChevronLeft size={20} strokeWidth={1} />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {currentView === 'overview' ? (
          <>
            {/* Morning Summary */}
            <div className="px-12 py-10" style={{ backgroundColor: '#85A383' }}>
              <div className="max-w-7xl mx-auto">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-sm tracking-widest mb-3" style={{ fontFamily: 'sans-serif', letterSpacing: '0.15em', color: '#F5F1E8' }}>
                      GOOD MORNING
                    </h3>
                    <h2 className="text-4xl font-light mb-6" style={{ fontFamily: 'Georgia, serif', color: '#FFFFFF' }}>
                      Rajesh
                    </h2>
                    <div className="space-y-4 max-w-3xl">
                      <p className="text-base leading-relaxed" style={{ fontFamily: 'sans-serif', color: '#F5F1E8' }}>
                        You're at <strong style={{ color: '#FFFFFF' }}>87% of your ₹185Cr quarterly target</strong> with two weeks remaining. Current pace projects a <strong style={{ color: '#FFFFFF' }}>₹2.4Cr shortfall</strong>, but three focused interventions can close this gap.
                      </p>
                      <p className="text-base leading-relaxed" style={{ fontFamily: 'sans-serif', color: '#F5F1E8' }}>
                        <strong style={{ color: '#FFFFFF' }}>Maharashtra needs immediate attention</strong> — aged Ayurvedic Wellness inventory is blocking shelf space for new launches, creating a ₹1.2Cr impact. Priya and Amit need to execute markdown strategy within 3-5 days.
                      </p>
                      <p className="text-base leading-relaxed" style={{ fontFamily: 'sans-serif', color: '#F5F1E8' }}>
                        Good news: Karnataka and Tamil Nadu are tracking well. <strong style={{ color: '#FFFFFF' }}>Telangana exceeded target at 94%</strong> — worth studying their approach for replication.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-8">
                    <div className="px-5 py-3 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                      <span className="text-sm font-medium" style={{ fontFamily: 'sans-serif', color: '#FFFFFF' }}>
                        3 critical issues
                      </span>
                    </div>
                    <button className="p-3 rounded-full hover:bg-white/20 transition-colors" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)' }}>
                      <Bell size={18} strokeWidth={1} style={{ color: '#FFFFFF' }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12">
              {/* Header */}
              <div className="max-w-7xl mx-auto mb-12">
                <div className="flex items-center justify-between">
                  <h1 className="text-5xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                    Executive Overview
                  </h1>
                  <select 
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-4 py-2 text-sm tracking-wide bg-transparent"
                    style={{ fontFamily: 'sans-serif', border: '1px solid #85A383', color: '#0C2C18' }}
                  >
                    <option>Q4 FY25</option>
                    <option>Q3 FY25</option>
                    <option>Q2 FY25</option>
                  </select>
                </div>
              </div>

              {/* Hero Metrics */}
              <div className="max-w-7xl mx-auto mb-16">
                <div className="p-12" style={{ backgroundColor: '#0C2C18' }}>
                  <div className="grid grid-cols-3 gap-16">
                    <div>
                      <p className="text-xs tracking-widest mb-4" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#85A383' }}>
                        TARGET ACHIEVEMENT
                      </p>
                      <div className="text-7xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#E7DDCA' }}>
                        {heroData.targetAchievement}%
                      </div>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#85A383' }}>
                        ₹{heroData.actual}Cr of ₹{heroData.target}Cr target
                      </p>
                    </div>

                    <div>
                      <p className="text-xs tracking-widest mb-4" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#85A383' }}>
                        GAP TO TARGET
                      </p>
                      <div className="text-7xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#DF7649' }}>
                        {heroData.absoluteGap}Cr
                      </div>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#85A383' }}>
                        13% below quarterly goal
                      </p>
                    </div>

                    <div>
                      <p className="text-xs tracking-widest mb-4" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#85A383' }}>
                        CONFIDENCE LEVEL
                      </p>
                      <div className="flex items-center gap-3 mb-2">
                        <AlertCircle size={32} strokeWidth={1} style={{ color: '#DF7649' }} />
                        <span className="text-4xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#E7DDCA' }}>
                          {heroData.confidence}
                        </span>
                      </div>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#85A383' }}>
                        Intervention recommended
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Visuals */}
              <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-3xl font-light mb-8" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                  Performance Analytics
                </h2>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Achievement Trend with Toggle */}
                  <div className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-sm tracking-wider" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                        ACHIEVEMENT TREND
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setTrendView('weekly')}
                          className="px-3 py-1 text-xs transition-colors"
                          style={{
                            backgroundColor: trendView === 'weekly' ? '#0C2C18' : 'transparent',
                            color: trendView === 'weekly' ? '#E7DDCA' : '#878B87',
                            border: '1px solid #85A383',
                            fontFamily: 'sans-serif'
                          }}
                        >
                          Weekly
                        </button>
                        <button
                          onClick={() => setTrendView('monthly')}
                          className="px-3 py-1 text-xs transition-colors"
                          style={{
                            backgroundColor: trendView === 'monthly' ? '#0C2C18' : 'transparent',
                            color: trendView === 'monthly' ? '#E7DDCA' : '#878B87',
                            border: '1px solid #85A383',
                            fontFamily: 'sans-serif'
                          }}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={() => setTrendView('yearly')}
                          className="px-3 py-1 text-xs transition-colors"
                          style={{
                            backgroundColor: trendView === 'yearly' ? '#0C2C18' : 'transparent',
                            color: trendView === 'yearly' ? '#E7DDCA' : '#878B87',
                            border: '1px solid #85A383',
                            fontFamily: 'sans-serif'
                          }}
                        >
                          Yearly
                        </button>
                      </div>
                    </div>

                    <div className="relative" style={{ height: '280px' }}>
                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between" style={{ width: '40px' }}>
                        {[100, 75, 50, 25, 0].map((val) => (
                          <span key={val} className="text-xs text-right" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                            {val}%
                          </span>
                        ))}
                      </div>

                      {/* Chart area */}
                      <div className="absolute left-12 right-0 top-0 bottom-8">
                        <svg className="w-full h-full" viewBox="0 0 600 256" preserveAspectRatio="none">
                          {/* Grid lines */}
                          {[0, 64, 128, 192, 256].map((y) => (
                            <line
                              key={y}
                              x1="0"
                              y1={y}
                              x2="600"
                              y2={y}
                              stroke="#E7DDCA"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Previous period line (if comparison is on) */}
                          {showComparison && previousTrendData.length > 0 && (
                            <polyline
                              points={previousTrendData.map((d, i) => 
                                `${(i * 600) / (previousTrendData.length - 1)},${256 - (d.value * 2.56)}`
                              ).join(' ')}
                              fill="none"
                              stroke="#D4AF37"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                              opacity="0.5"
                            />
                          )}

                          {/* Current period line */}
                          <polyline
                            points={currentTrendData.map((d, i) => 
                              `${(i * 600) / (currentTrendData.length - 1)},${256 - (d.value * 2.56)}`
                            ).join(' ')}
                            fill="none"
                            stroke="#85A383"
                            strokeWidth="3"
                          />

                          {/* Current period points */}
                          {currentTrendData.map((d, i) => (
                            <circle
                              key={i}
                              cx={(i * 600) / (currentTrendData.length - 1)}
                              cy={256 - (d.value * 2.56)}
                              r="5"
                              fill="#0C2C18"
                            />
                          ))}
                        </svg>

                        {/* X-axis labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between" style={{ transform: 'translateY(24px)' }}>
                          {currentTrendData.map((d, i) => (
                            <span key={i} className="text-xs" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                              {d.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E7DDCA' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-0.5" style={{ backgroundColor: '#85A383' }}></div>
                            <span className="text-xs" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>Current Period</span>
                          </div>
                          {showComparison && previousTrendData.length > 0 && (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-0.5" style={{ backgroundColor: '#D4AF37', opacity: 0.5, borderTop: '2px dashed #D4AF37' }}></div>
                              <span className="text-xs" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>Previous Period</span>
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setShowComparison(!showComparison)}
                          className="text-xs px-3 py-1"
                          style={{
                            color: '#85A383',
                            border: '1px solid #85A383',
                            fontFamily: 'sans-serif'
                          }}
                        >
                          {showComparison ? 'Hide' : 'Show'} Comparison
                        </button>
                      </div>
                      {trendView === 'weekly' && (
                        <p className="text-sm mt-3" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                          Performance declined 4 points from W5 peak of 91%. Recovery needed in final 2 weeks.
                        </p>
                      )}
                      {trendView === 'monthly' && (
                        <p className="text-sm mt-3" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                          Monthly trend shows 3-point decline from December peak. January tracking 2 points behind previous quarter.
                        </p>
                      )}
                      {trendView === 'yearly' && (
                        <p className="text-sm mt-3" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                          Year-over-year growth slowed in FY25 after strong FY24 performance of 88%.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Regional Breakdown */}
                  <div className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                    <h3 className="text-sm tracking-wider mb-6" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                      REGIONAL ACHIEVEMENT BREAKDOWN
                    </h3>
                    <div className="space-y-4">
                      {regionalBreakdown.map((region, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#0C2C18', fontWeight: 500 }}>
                              {region.region}
                            </span>
                            <div className="flex items-center gap-3">
                              <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#878B87' }}>
                                ₹{region.actual}Cr / ₹{region.target}Cr
                              </span>
                              <span style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: region.achievement >= 90 ? '#85A383' : region.achievement >= 85 ? '#D4AF37' : '#DF7649' }}>
                                {region.achievement}%
                              </span>
                            </div>
                          </div>
                          <div className="w-full h-2" style={{ backgroundColor: '#E7DDCA' }}>
                            <div 
                              className="h-2" 
                              style={{ 
                                width: `${region.achievement}%`, 
                                backgroundColor: region.achievement >= 90 ? '#85A383' : region.achievement >= 85 ? '#D4AF37' : '#DF7649'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Critical Business Issues */}
              <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-3xl font-light mb-8" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                  Critical Business Issues
                </h2>
                <div className="space-y-6">
                  {criticalIssues.map((issue, index) => (
                    <div key={issue.id}>
                      <div 
                        className="p-8 cursor-pointer transition-all"
                        style={{ 
                          backgroundColor: '#FFFFFF', 
                          border: `1px solid ${expandedIssue === issue.id ? '#0C2C18' : '#85A383'}`
                        }}
                        onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-sm tracking-widest" style={{ fontFamily: 'sans-serif', letterSpacing: '0.15em', color: '#878B87' }}>
                                {String(index + 1).padStart(2, '0')}
                              </span>
                              <span className="text-xl" style={{ fontFamily: 'sans-serif', fontWeight: 500, color: '#0C2C18' }}>
                                {issue.title}
                              </span>
                              <span 
                                className="px-3 py-1 text-xs tracking-wider"
                                style={{ 
                                  backgroundColor: issue.severity === 'high' ? 'rgba(223, 118, 73, 0.15)' : 'rgba(212, 175, 55, 0.15)',
                                  color: issue.severity === 'high' ? '#DF7649' : '#D4AF37',
                                  fontFamily: 'sans-serif',
                                  letterSpacing: '0.1em'
                                }}
                              >
                                {issue.severity.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="ml-12 p-4" style={{ backgroundColor: '#F5F1E8' }}>
                              <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                RECOMMENDED ACTION
                              </p>
                              <p className="text-base" style={{ fontFamily: 'sans-serif', color: '#0C2C18', fontWeight: 500 }}>
                                {issue.quickAction}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 ml-8">
                            <div className="text-right">
                              <div className="text-3xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: '#DF7649' }}>
                                {issue.impact}
                              </div>
                              <p className="text-xs tracking-wider" style={{ fontFamily: 'sans-serif', letterSpacing: '0.1em', color: '#878B87' }}>
                                IMPACT
                              </p>
                            </div>
                            {expandedIssue === issue.id ? 
                              <ChevronUp size={24} strokeWidth={1} style={{ color: '#878B87' }} /> : 
                              <ChevronDown size={24} strokeWidth={1} style={{ color: '#878B87' }} />
                            }
                          </div>
                        </div>

                        {expandedIssue === issue.id && (
                          <div className="mt-6 pt-6" style={{ borderTop: '1px solid #E7DDCA' }}>
                            <div className="grid grid-cols-2 gap-6 mb-6">
                              <div>
                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  REGION & TERRITORY
                                </p>
                                <p className="text-base mb-4" style={{ fontFamily: 'sans-serif', color: '#0C2C18' }}>
                                  {issue.dimensions.region}
                                </p>

                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  PRODUCT LINE
                                </p>
                                <p className="text-base mb-4" style={{ fontFamily: 'sans-serif', color: '#0C2C18' }}>
                                  {issue.dimensions.product}
                                </p>

                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  CHANNEL
                                </p>
                                <p className="text-base mb-4" style={{ fontFamily: 'sans-serif', color: '#0C2C18' }}>
                                  {issue.dimensions.channel}
                                </p>

                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  FINANCIAL IMPACT
                                </p>
                                <p className="text-base" style={{ fontFamily: 'sans-serif', color: '#0C2C18' }}>
                                  {issue.dimensions.financial}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  ROOT CAUSE
                                </p>
                                <p className="text-base mb-4" style={{ fontFamily: 'sans-serif', color: '#0C2C18' }}>
                                  {issue.dimensions.rootCause}
                                </p>

                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  RIPPLE EFFECT
                                </p>
                                <p className="text-base mb-4" style={{ fontFamily: 'sans-serif', color: '#DF7649' }}>
                                  {issue.dimensions.ripple}
                                </p>

                                <div className="p-4 mt-4" style={{ backgroundColor: '#F5F1E8' }}>
                                  <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                    ACTION DETAILS
                                  </p>
                                  <p className="text-base mb-3" style={{ fontFamily: 'sans-serif', color: '#0C2C18', fontWeight: 500 }}>
                                    {issue.dimensions.action}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                                      Owner: {issue.dimensions.owner}
                                    </span>
                                    <span className="text-sm" style={{ fontFamily: 'sans-serif', color: '#DF7649', fontWeight: 500 }}>
                                      Timeline: {issue.dimensions.timeline}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid #E7DDCA' }}>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowDecisionTrail(true);
                                }}
                                className="flex items-center gap-2 px-6 py-3 transition-colors hover:opacity-80"
                                style={{ 
                                  backgroundColor: '#0C2C18', 
                                  color: '#E7DDCA',
                                  fontFamily: 'sans-serif',
                                  fontSize: '14px'
                                }}
                              >
                                <GitBranch size={16} strokeWidth={1} />
                                View Decision Trail
                              </button>
                              <button 
                                className="flex items-center gap-2 px-6 py-3 transition-colors hover:opacity-80"
                                style={{ 
                                  backgroundColor: 'transparent',
                                  border: '1px solid #85A383',
                                  color: '#0C2C18',
                                  fontFamily: 'sans-serif',
                                  fontSize: '14px'
                                }}
                              >
                                <Sparkles size={16} strokeWidth={1} />
                                Run What-If Scenarios
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Region Performance Snapshot */}
              <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-light mb-8" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                  Region Performance Snapshot
                </h2>
                
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-3 p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                    <svg viewBox="0 0 500 600" className="w-full h-auto">
                      <path
                        d="M 150 280 L 180 250 L 210 260 L 220 290 L 200 320 L 165 330 Z"
                        fill={getStatusColor(regionData[0].status)}
                        stroke="#E7DDCA"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedRegion(regionData[0])}
                      />
                      <text x="185" y="295" fontSize="16" fontWeight="500" fill="#FFFFFF" fontFamily="sans-serif" className="pointer-events-none">MH</text>

                      <path
                        d="M 220 280 L 250 270 L 270 295 L 260 320 L 230 325 Z"
                        fill={getStatusColor(regionData[4].status)}
                        stroke="#E7DDCA"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedRegion(regionData[4])}
                      />
                      <text x="245" y="302" fontSize="16" fontWeight="500" fill="#FFFFFF" fontFamily="sans-serif" className="pointer-events-none">TG</text>

                      <path
                        d="M 230 330 L 260 325 L 280 345 L 275 370 L 245 375 L 225 360 Z"
                        fill={getStatusColor(regionData[3].status)}
                        stroke="#E7DDCA"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedRegion(regionData[3])}
                      />
                      <text x="250" y="355" fontSize="16" fontWeight="500" fill="#FFFFFF" fontFamily="sans-serif" className="pointer-events-none">AP</text>

                      <path
                        d="M 160 340 L 195 330 L 220 350 L 220 385 L 190 400 L 160 385 Z"
                        fill={getStatusColor(regionData[1].status)}
                        stroke="#E7DDCA"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedRegion(regionData[1])}
                      />
                      <text x="185" y="368" fontSize="16" fontWeight="500" fill="#FFFFFF" fontFamily="sans-serif" className="pointer-events-none">KA</text>

                      <path
                        d="M 195 410 L 220 395 L 240 415 L 235 445 L 210 450 L 190 435 Z"
                        fill={getStatusColor(regionData[2].status)}
                        stroke="#E7DDCA"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedRegion(regionData[2])}
                      />
                      <text x="213" y="428" fontSize="16" fontWeight="500" fill="#FFFFFF" fontFamily="sans-serif" className="pointer-events-none">TN</text>

                      <path
                        d="M 150 400 L 170 395 L 180 420 L 175 450 L 155 455 L 145 430 Z"
                        fill={getStatusColor(regionData[5].status)}
                        stroke="#E7DDCA"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedRegion(regionData[5])}
                      />
                      <text x="160" y="428" fontSize="16" fontWeight="500" fill="#FFFFFF" fontFamily="sans-serif" className="pointer-events-none">KL</text>
                    </svg>

                    <div className="flex items-center justify-center gap-8 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5" style={{ backgroundColor: '#85A383' }}></div>
                        <span className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>Healthy (90%+)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5" style={{ backgroundColor: '#D4AF37' }}></div>
                        <span className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>On Track (85-89%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5" style={{ backgroundColor: '#DF7649' }}></div>
                        <span className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>At Risk (below 85%)</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2 p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                    {selectedRegion ? (
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                              {selectedRegion.name}
                            </h3>
                            <div className="flex items-center gap-3 mb-3">
                              <span 
                                className="px-3 py-1 text-xs tracking-wider"
                                style={{ 
                                  backgroundColor: `${getStatusColor(selectedRegion.status)}20`,
                                  color: getStatusColor(selectedRegion.status),
                                  fontFamily: 'sans-serif'
                                }}
                              >
                                {selectedRegion.status.toUpperCase().replace('-', ' ')}
                              </span>
                              <span className="text-3xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                {selectedRegion.performance}%
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm" style={{ color: '#878B87', fontFamily: 'sans-serif' }}>
                              <Users size={14} />
                              <span>{selectedRegion.activeDistributors} of {selectedRegion.totalDistributors} distributors active</span>
                            </div>
                          </div>
                          <button 
                            onClick={() => setSelectedRegion(null)}
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                          >
                            <X size={20} strokeWidth={1} style={{ color: '#878B87' }} />
                          </button>
                        </div>

                        <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #E7DDCA' }}>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-xs tracking-wider mb-1" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                                TARGET
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                ₹{selectedRegion.target}Cr
                              </p>
                            </div>
                            <div>
                              <p className="text-xs tracking-wider mb-1" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                                ACTUAL
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                ₹{selectedRegion.actual}Cr
                              </p>
                            </div>
                            <div>
                              <p className="text-xs tracking-wider mb-1" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                                GAP
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#DF7649' }}>
                                ₹{selectedRegion.gap}Cr
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mb-6 pb-6" style={{ borderBottom: '1px solid #E7DDCA' }}>
                          <h4 className="text-sm tracking-wider mb-3" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                            SITUATION
                          </h4>
                          <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'sans-serif', color: '#0C2C18' }}>
                            {selectedRegion.summary}
                          </p>
                          <h4 className="text-sm tracking-wider mb-3" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                            RECOMMENDED ACTIONS
                          </h4>
                          <p className="text-sm leading-relaxed" style={{ fontFamily: 'sans-serif', color: '#0C2C18', fontWeight: 500 }}>
                            {selectedRegion.actions}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-sm tracking-wider mb-4" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                            TEAM PERFORMANCE
                          </h4>
                          <div className="space-y-3">
                            {selectedRegion.team.map((member, idx) => (
                              <div 
                                key={idx} 
                                className="p-4 cursor-pointer hover:bg-opacity-70 transition-colors" 
                                style={{ backgroundColor: '#F5F1E8' }}
                                onClick={() => handleTeamMemberClick(member)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-base" style={{ fontFamily: 'sans-serif', color: '#0C2C18', fontWeight: 500 }}>
                                    {member.name}
                                  </span>
                                  <span className="text-lg font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                    {member.achievement}%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                                    {member.territory}
                                  </span>
                                  <span style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                                    ₹{member.actual}Cr / ₹{member.target}Cr
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs" style={{ color: '#878B87', fontFamily: 'sans-serif' }}>
                                  <Users size={12} />
                                  <span>{member.activeDistributors} distributors</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-center text-base" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                          Click on a region to view details and team performance
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Person Detail Page */
          <div>
            <div className="px-12 py-6" style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E7DDCA' }}>
              <div className="max-w-7xl mx-auto flex items-center gap-4">
                <button 
                  onClick={handleBackToOverview}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded transition-colors"
                  style={{ color: '#0C2C18', fontFamily: 'sans-serif' }}
                >
                  <ArrowLeft size={20} strokeWidth={1} />
                  Back to Overview
                </button>
              </div>
            </div>

            {selectedTeamMember && (
              <div className="p-12">
                <div className="max-w-7xl mx-auto">
                  <div className="mb-12">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-5xl font-light mb-3" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                          {selectedTeamMember.name}
                        </h1>
                        <p className="text-xl mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                          Territory Sales Manager • {selectedTeamMember.territory}
                        </p>
                        <div className="flex items-center gap-4 mt-4">
                          <span 
                            className="px-4 py-2 text-sm tracking-wider"
                            style={{ 
                              backgroundColor: selectedTeamMember.achievement >= 90 ? 'rgba(133, 163, 131, 0.15)' : selectedTeamMember.achievement >= 85 ? 'rgba(212, 175, 55, 0.15)' : 'rgba(223, 118, 73, 0.15)',
                              color: selectedTeamMember.achievement >= 90 ? '#85A383' : selectedTeamMember.achievement >= 85 ? '#D4AF37' : '#DF7649',
                              fontFamily: 'sans-serif'
                            }}
                          >
                            {selectedTeamMember.achievement >= 90 ? 'HEALTHY' : selectedTeamMember.achievement >= 85 ? 'ON TRACK' : 'AT RISK'}
                          </span>
                          <span className="px-4 py-2 text-sm" style={{ backgroundColor: '#F5F1E8', color: '#0C2C18', fontFamily: 'sans-serif' }}>
                            Credit Health: {selectedTeamMember.creditHealth}
                          </span>
                          <span className="px-4 py-2 text-sm" style={{ backgroundColor: '#F5F1E8', color: '#0C2C18', fontFamily: 'sans-serif' }}>
                            {selectedTeamMember.activeDistributors} of {selectedTeamMember.distributors} Distributors Active
                          </span>
                        </div>
                      </div>
                      <button 
                        className="flex items-center gap-2 px-6 py-3"
                        style={{ 
                          backgroundColor: '#0C2C18', 
                          color: '#E7DDCA',
                          fontFamily: 'sans-serif',
                          fontSize: '14px'
                        }}
                      >
                        <Activity size={16} strokeWidth={1} />
                        Analyze Performance
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-6 mb-12">
                    <div className="p-6" style={{ backgroundColor: '#0C2C18' }}>
                      <p className="text-xs tracking-widest mb-3" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#85A383' }}>
                        ACHIEVEMENT
                      </p>
                      <p className="text-5xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#E7DDCA' }}>
                        {selectedTeamMember.achievement}%
                      </p>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#85A383' }}>
                        Target: ₹{selectedTeamMember.target}Cr
                      </p>
                    </div>

                    <div className="p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                      <p className="text-xs tracking-widest mb-3" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#878B87' }}>
                        ACTUAL SALES
                      </p>
                      <p className="text-5xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        ₹{selectedTeamMember.actual}Cr
                      </p>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                        of ₹{selectedTeamMember.target}Cr
                      </p>
                    </div>

                    <div className="p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                      <p className="text-xs tracking-widest mb-3" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#878B87' }}>
                        GROSS MARGIN
                      </p>
                      <p className="text-5xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        {selectedTeamMember.gm}%
                      </p>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                        Portfolio avg
                      </p>
                    </div>

                    <div className="p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                      <p className="text-xs tracking-widest mb-3" style={{ fontFamily: 'sans-serif', letterSpacing: '0.2em', color: '#878B87' }}>
                        TEAM SIZE
                      </p>
                      <p className="text-5xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        {selectedTeamMember.tsrTeam.length}
                      </p>
                      <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                        TSRs reporting
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                      <h3 className="text-xl font-light mb-6" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        Channel Mix
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#0C2C18' }}>Modern Trade</span>
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#878B87' }}>{selectedTeamMember.channelMix.modernTrade}%</span>
                          </div>
                          <div className="w-full h-3" style={{ backgroundColor: '#E7DDCA' }}>
                            <div className="h-3" style={{ width: `${selectedTeamMember.channelMix.modernTrade}%`, backgroundColor: '#85A383' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#0C2C18' }}>General Trade</span>
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#878B87' }}>{selectedTeamMember.channelMix.generalTrade}%</span>
                          </div>
                          <div className="w-full h-3" style={{ backgroundColor: '#E7DDCA' }}>
                            <div className="h-3" style={{ width: `${selectedTeamMember.channelMix.generalTrade}%`, backgroundColor: '#D4AF37' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#0C2C18' }}>E-commerce</span>
                            <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#878B87' }}>{selectedTeamMember.channelMix.ecommerce}%</span>
                          </div>
                          <div className="w-full h-3" style={{ backgroundColor: '#E7DDCA' }}>
                            <div className="h-3" style={{ width: `${selectedTeamMember.channelMix.ecommerce}%`, backgroundColor: '#DF7649' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                      <h3 className="text-xl font-light mb-6" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        Top Performing SKUs
                      </h3>
                      <div className="space-y-3">
                        {selectedTeamMember.topSKUs.map((sku, idx) => (
                          <div key={idx} className="p-4" style={{ backgroundColor: '#F5F1E8' }}>
                            <div className="flex items-center justify-between">
                              <span style={{ fontFamily: 'sans-serif', fontSize: '15px', color: '#0C2C18', fontWeight: 500 }}>{sku}</span>
                              <span className="text-xs tracking-wider" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                RANK {idx + 1}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Distributor Performance */}
                  {selectedTeamMember.distributorDetails && selectedTeamMember.distributorDetails.length > 0 && (
                    <div className="mb-12">
                      <h2 className="text-3xl font-light mb-8" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                        Distributor Performance
                      </h2>
                      <div className="grid grid-cols-1 gap-6">
                        {selectedTeamMember.distributorDetails.map((dist, idx) => (
                          <div key={idx} className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                            <div className="flex items-start justify-between mb-6">
                              <div>
                                <h3 className="text-2xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                  {dist.name}
                                </h3>
                                <p style={{ fontFamily: 'sans-serif', fontSize: '15px', color: '#878B87' }}>
                                  Distributor Partner • {dist.outlets} outlets covered
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-4xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: dist.achievement >= 90 ? '#85A383' : dist.achievement >= 85 ? '#D4AF37' : '#DF7649' }}>
                                  {dist.achievement}%
                                </p>
                                <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#878B87' }}>
                                  Achievement
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                              <div>
                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  OUTLETS COVERED
                                </p>
                                <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                  {dist.outlets}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  CREDIT UTILIZATION
                                </p>
                                <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: dist.creditUtil >= 90 ? '#DF7649' : dist.creditUtil >= 80 ? '#D4AF37' : '#85A383' }}>
                                  {dist.creditUtil}%
                                </p>
                              </div>
                              <div>
                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  DSO (DAYS)
                                </p>
                                <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                  {dist.dso}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TSR Team Performance */}
                  <div>
                    <h2 className="text-3xl font-light mb-8" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                      TSR Team Performance
                    </h2>
                    <div className="space-y-6">
                      {selectedTeamMember.tsrTeam.map((tsr, idx) => (
                        <div key={idx} className="p-8" style={{ backgroundColor: '#FFFFFF', border: '1px solid #85A383' }}>
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="text-2xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                {tsr.name}
                              </h3>
                              <p style={{ fontFamily: 'sans-serif', fontSize: '15px', color: '#878B87' }}>
                                Territory Sales Representative • {tsr.area}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-4xl font-light mb-1" style={{ fontFamily: 'Georgia, serif', color: tsr.achievement >= 90 ? '#85A383' : tsr.achievement >= 85 ? '#D4AF37' : '#DF7649' }}>
                                {tsr.achievement}%
                              </p>
                              <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#878B87' }}>
                                Achievement
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-6">
                            <div>
                              <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                TARGET
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                ₹{tsr.target}Cr
                              </p>
                            </div>
                            <div>
                              <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                ACTUAL
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                ₹{tsr.actual}Cr
                              </p>
                            </div>
                            <div>
                              <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                OUTLETS COVERED
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                {tsr.outlets}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                ACTIVE OUTLETS
                              </p>
                              <p className="text-xl font-light" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                                {tsr.activeOutlets}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <div className="w-full h-3" style={{ backgroundColor: '#E7DDCA' }}>
                              <div 
                                className="h-3" 
                                style={{ 
                                  width: `${tsr.achievement}%`, 
                                  backgroundColor: tsr.achievement >= 90 ? '#85A383' : tsr.achievement >= 85 ? '#D4AF37' : '#DF7649'
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Decision Trail Modal */}
      {showDecisionTrail && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-8"
          style={{ backgroundColor: 'rgba(12, 44, 24, 0.8)', zIndex: 50 }}
          onClick={() => setShowDecisionTrail(false)}
        >
          <div 
            className="w-full max-w-7xl max-h-[90vh] overflow-auto"
            style={{ backgroundColor: '#FFFFFF' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 border-b" style={{ borderColor: '#E7DDCA' }}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-4xl font-light mb-2" style={{ fontFamily: 'Georgia, serif', color: '#0C2C18' }}>
                    Decision Trail
                  </h2>
                  <p className="text-base" style={{ fontFamily: 'sans-serif', color: '#878B87' }}>
                    Multi-agent system analysis for Maharashtra inventory issue
                  </p>
                </div>
                <button 
                  onClick={() => setShowDecisionTrail(false)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={24} strokeWidth={1} style={{ color: '#878B87' }} />
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full" style={{ minWidth: '1400px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E7DDCA' }}>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500, width: '100px' }}>
                        TIME
                      </th>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500, width: '140px' }}>
                        AGENT
                      </th>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500, width: '180px' }}>
                        ACTION
                      </th>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500, width: '150px' }}>
                        DATABASE
                      </th>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500, width: '120px' }}>
                        QUERY / DATA
                      </th>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500 }}>
                        AGENT THINKING
                      </th>
                      <th className="text-left pb-4 px-4" style={{ fontFamily: 'sans-serif', color: '#878B87', fontSize: '12px', letterSpacing: '0.1em', fontWeight: 500, width: '140px' }}>
                        NEXT
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisionTrailData.map((step, index) => (
                      <React.Fragment key={index}>
                        <tr style={{ borderBottom: '1px solid #F5F1E8' }}>
                          <td className="py-4 px-4" style={{ fontFamily: 'monospace', fontSize: '13px', color: '#878B87' }}>
                            {step.time}
                          </td>
                          <td className="py-4 px-4">
                            <div className="px-3 py-1 inline-block" style={{ backgroundColor: `${step.agentColor}20`, color: step.agentColor, fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 500 }}>
                              {step.agent}
                            </div>
                          </td>
                          <td className="py-4 px-4" style={{ fontFamily: 'sans-serif', fontSize: '14px', color: '#0C2C18' }}>
                            {step.action}
                          </td>
                          <td className="py-4 px-4" style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#878B87' }}>
                            {step.database || '—'}
                          </td>
                          <td className="py-4 px-4">
                            {step.query ? (
                              <button
                                onClick={() => setExpandedTrailQuery(expandedTrailQuery === index ? null : index)}
                                className="flex items-center gap-2 text-sm hover:opacity-70"
                                style={{ color: '#85A383', fontFamily: 'sans-serif' }}
                              >
                                {expandedTrailQuery === index ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                View Query
                              </button>
                            ) : (
                              <span style={{ color: '#878B87' }}>—</span>
                            )}
                          </td>
                          <td className="py-4 px-4" style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#0C2C18', lineHeight: '1.6' }}>
                            {step.thinking}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <Activity size={14} strokeWidth={1} style={{ color: '#85A383' }} />
                              <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: '#0C2C18' }}>
                                {step.next}
                              </span>
                            </div>
                          </td>
                        </tr>
                        {expandedTrailQuery === index && step.query && (
                          <tr>
                            <td colSpan="7" className="px-4 py-4" style={{ backgroundColor: '#F5F1E8' }}>
                              <div className="mb-3">
                                <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                  QUERY
                                </p>
                                <pre className="p-3 overflow-x-auto" style={{ backgroundColor: '#0C2C18', color: '#85A383', fontFamily: 'monospace', fontSize: '12px', lineHeight: '1.6' }}>
                                  {step.query}
                                </pre>
                              </div>
                              {step.queryResult && (
                                <div>
                                  <p className="text-xs tracking-wider mb-2" style={{ fontFamily: 'sans-serif', color: '#878B87', letterSpacing: '0.1em' }}>
                                    RESULT
                                  </p>
                                  <p className="text-sm" style={{ fontFamily: 'sans-serif', color: '#0C2C18', lineHeight: '1.6' }}>
                                    {step.queryResult}
                                  </p>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}