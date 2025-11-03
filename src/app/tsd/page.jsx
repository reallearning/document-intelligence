"use client"
import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, FileText, Database, Code, Shield, TestTube, Upload, Clock, AlertCircle, CheckCircle, Info, Loader, FolderOpen, Eye, ArrowLeft, User, ExternalLink } from 'lucide-react';

export default function TSDPortalApp() {
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'document'
  const [selectedTSD, setSelectedTSD] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Mock existing TSDs
  const [existingTSDs, setExistingTSDs] = useState([
    {
      id: 'tsd-001',
      name: 'Payment Processing Service',
      repoName: 'payment-processing-service',
      version: 'v2.3.1',
      confidence: 87,
      lastUpdated: '2025-10-15',
      status: 'complete',
      fileCount: 234,
      linesOfCode: 15420
    },
    {
      id: 'tsd-002',
      name: 'User Authentication Service',
      repoName: 'auth-service',
      version: 'v1.8.2',
      confidence: 92,
      lastUpdated: '2025-10-10',
      status: 'complete',
      fileCount: 128,
      linesOfCode: 8930
    },
    {
      id: 'tsd-003',
      name: 'Analytics Engine',
      repoName: 'analytics-engine',
      version: 'v3.1.0',
      confidence: 78,
      lastUpdated: '2025-10-12',
      status: 'processing',
      fileCount: 312,
      linesOfCode: 22150,
      progress: 65
    }
  ]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Simulate upload and processing
    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setUploadProgress(0);
            // Add new TSD to list
            const newTSD = {
              id: `tsd-${Date.now()}`,
              name: file.name.replace(/\.(zip|tar|gz)$/, ''),
              repoName: file.name.replace(/\.(zip|tar|gz)$/, ''),
              version: 'v1.0.0',
              confidence: 0,
              lastUpdated: new Date().toISOString().split('T')[0],
              status: 'processing',
              fileCount: 0,
              linesOfCode: 0,
              progress: 0
            };
            setExistingTSDs(prev => [newTSD, ...prev]);
          }, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const viewTSD = (tsd) => {
    setSelectedTSD(tsd);
    setCurrentView('document');
  };

  if (currentView === 'home') {
    return <HomePage 
      existingTSDs={existingTSDs} 
      onFileUpload={handleFileUpload} 
      uploading={uploading} 
      uploadProgress={uploadProgress}
      onViewTSD={viewTSD}
    />;
  }

  return <DocumentViewer tsd={selectedTSD} onBack={() => setCurrentView('home')} />;
}

function HomePage({ existingTSDs, onFileUpload, uploading, uploadProgress, onViewTSD }) {
  const getStatusBadge = (status) => {
    if (status === 'complete') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-green-50 text-green-700 rounded">
          <CheckCircle className="w-3 h-3 mr-1" />
          Complete
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-amber-50 text-amber-700 rounded">
        <Loader className="w-3 h-3 mr-1 animate-spin" />
        Processing
      </span>
    );
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 75) return 'text-yellow-600 bg-yellow-50';
    if (confidence === 0) return 'text-gray-400 bg-gray-50';
    return 'text-orange-600 bg-orange-50';
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              T
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Technical System Documentation</h1>
              <p className="text-sm text-gray-500">Auto-generated documentation from your codebase</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/30 transition-all">
            <div className="p-8">
              {uploading ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                    <div>
                      <div className="font-medium text-gray-900">Processing repository...</div>
                      <div className="text-sm text-gray-600">Analyzing code structure and generating documentation</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 w-12 text-right">{uploadProgress}%</span>
                  </div>
                </div>
              ) : (
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Upload Repository</div>
                      <div className="text-sm text-gray-600">Drop a .zip, .tar.gz, or .tgz file to generate documentation</div>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors">
                    Choose File
                  </div>
                  <input
                    type="file"
                    accept=".zip,.tar,.gz,.tgz"
                    onChange={onFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* TSDs Table */}
        {existingTSDs.length > 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Documentation Library</h2>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      System
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Files
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Lines
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {existingTSDs.map((tsd) => (
                    <tr key={tsd.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{tsd.name}</div>
                            <div className="text-sm text-gray-500">{tsd.version}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(tsd.status)}
                        {tsd.status === 'processing' && (
                          <div className="mt-2">
                            <div className="w-32 bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-amber-500 h-1 rounded-full transition-all"
                                style={{ width: `${tsd.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {tsd.confidence > 0 ? (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(tsd.confidence)}`}>
                            {tsd.confidence}%
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{tsd.fileCount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{tsd.linesOfCode.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{tsd.lastUpdated}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => onViewTSD(tsd)}
                            disabled={tsd.status === 'processing'}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                              tsd.status === 'processing'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow'
                            }`}
                          >
                            View Documentation
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 py-16">
            <div className="text-center">
              <FolderOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No documentation yet</h3>
              <p className="text-gray-600 mb-6">Upload your first repository to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DocumentViewer({ tsd, onBack }) {
  const [selectedSection, setSelectedSection] = useState('master-overview');
  const [expandedSections, setExpandedSections] = useState({
    master: true,
    annexes: true
  });
  const [showEvidence, setShowEvidence] = useState(false);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigationItems = {
    master: {
      sections: [
        { id: 'master-overview', label: 'Executive Summary', confidence: 95 },
        { id: 'master-architecture', label: 'System Architecture', confidence: 88 },
        { id: 'master-workflows', label: 'Key Workflows', confidence: 82 }
      ]
    },
    annexes: {
      children: [
        { id: 'api-rest', label: 'REST API Endpoints', icon: Code, confidence: 96 },
        { id: 'data-schema', label: 'Database Schema', icon: Database, confidence: 85 },
        { id: 'tests', label: 'Quality & Tests', icon: TestTube, confidence: 73 },
        { id: 'risks', label: 'Risk Register', icon: Shield, confidence: 78 }
      ]
    }
  };

  const contentMap = {
    'master-overview': {
      title: tsd.name,
      subtitle: 'Executive Summary',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 95,
      content: `# Executive Summary

> **Note:** This documentation is auto-generated from the codebase and updated with each release. Last analysis: ${tsd.lastUpdated}.

## Overview

The ${tsd.name} is a mission-critical, cloud-native application that serves as the financial backbone of our e-commerce platform. Built with resilience and compliance at its core, this system orchestrates all monetary transactions between our customers and various payment providers.

Since going live in January 2023, the system has:
- Processed over **$2.3 billion** in transactions
- Maintained **99.97% uptime** over the past 90 days
- Handles **50,000 daily transactions** on average
- Peaks at **850 transactions/second** during major sales events

## Core Capabilities

The system provides the following critical business functions:

**Payment Processing**
- Multi-provider support (Stripe, PayPal, Apple Pay)
- Automatic provider selection based on cost optimization
- Real-time fraud detection with ML-based scoring
- Support for 45+ currencies worldwide

**Compliance & Security**
- PCI-DSS Level 1 certified
- End-to-end encryption for all card data
- Automatic key rotation every 90 days
- Comprehensive audit logging (7-year retention)

**Financial Operations**
- Daily automated reconciliation
- Real-time transaction monitoring
- Instant refund processing (< 90 days)
- Dispute and chargeback management

## Technology Stack

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Application | Java (Spring Boot) | 17 / 3.1 | Core business logic |
| API Gateway | Kong | 3.4 | Auth, rate limiting, routing |
| Database | PostgreSQL | 15.2 | Transactional data |
| Cache | Redis | 7.2 | Session & rate limits |
| Message Queue | RabbitMQ | 3.12 | Async event processing |
| Orchestration | Kubernetes (EKS) | 1.28 | Container management |
| Monitoring | Datadog | Latest | Observability |

## Critical Business Rules

> **Warning:** The following rules are enforced at the application level and require legal/compliance approval to modify.

- Transactions over **$10,000** require additional KYC verification
- Refunds must be processed within **90 days** of original transaction
- Failed payment attempts limited to **3 per card per 24 hours**
- Transaction data retained for **7 years** per regulatory requirements
- Credit card numbers **never stored** - only tokenized references

## Key Performance Metrics

- **Average Response Time:** 147ms (p95 < 200ms)
- **Daily Transaction Volume:** 50,000 average, 120,000 peak
- **Error Rate:** 0.12% (well within SLA of 0.5%)
- **Fraud Detection Accuracy:** 99.2%

## Repository Statistics

- **Total Files:** ${tsd.fileCount.toLocaleString()}
- **Lines of Code:** ${tsd.linesOfCode.toLocaleString()}
- **Last Updated:** ${tsd.lastUpdated}
- **Documentation Confidence:** ${tsd.confidence}%
`,
      evidence: [
        { file: 'PaymentService.java', lines: '23-45', author: 'sarah.chen', date: '2 days ago', snippet: '@Service\npublic class PaymentService {\n  @Autowired\n  private StripeClient stripeClient;\n  ...' },
        { file: 'application.yml', lines: '12-18', author: 'mike.johnson', date: '1 week ago', snippet: 'payment:\n  providers:\n    - stripe\n    - paypal\n    - applepay' },
        { file: 'pom.xml', lines: '45-67', author: 'system', date: '1 week ago', snippet: '<dependency>\n  <groupId>org.springframework.boot</groupId>\n  <artifactId>spring-boot-starter</artifactId>\n</dependency>' }
      ]
    },
    'master-architecture': {
      title: 'System Architecture',
      subtitle: 'Component design and infrastructure',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 88,
      content: `# System Architecture

## Architecture Overview

The ${tsd.name} employs a **microservices architecture** with event-driven communication. This design enables:
- Independent scaling of components
- Improved fault isolation
- Rapid feature deployment without system-wide risk
- Clear bounded contexts following Domain-Driven Design principles

## High-Level Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                        AWS Cloud (us-east-1)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  CloudFront CDN → Application LB → WAF               │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Kong API Gateway (EKS)                              │  │
│  │  • Authentication (JWT)                              │  │
│  │  • Rate Limiting (100 req/min per user)             │  │
│  │  • Request Routing                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Application Services (Kubernetes Pods)              │  │
│  │                                                       │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   Payment    │  │Reconciliation│  │Notification│ │  │
│  │  │   Service    │  │   Service    │  │  Service   │ │  │
│  │  │  (8-12 pods) │  │  (1 pod)     │  │ (3-6 pods) │ │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Data Layer                                          │  │
│  │  • PostgreSQL (RDS Multi-AZ)                         │  │
│  │  • Redis (ElastiCache)                               │  │
│  │  • RabbitMQ (Amazon MQ)                              │  │
│  │  • S3 (Document Storage)                             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
  ┌──────────┐         ┌──────────┐         ┌──────────┐
  │  Stripe  │         │  PayPal  │         │  Auth0   │
  │   API    │         │   API    │         │   SSO    │
  └──────────┘         └──────────┘         └──────────┘
\`\`\`

## Core Components

### API Gateway (Kong)
**Purpose:** Single entry point for all external requests  
**Technology:** Kong 3.4 on Kubernetes  
**Deployment:** 3 availability zones, auto-scaling (min: 3, max: 10 pods)

**Responsibilities:**
- JWT token validation and user authentication
- Rate limiting enforcement (100 req/min per user, 10K req/min per IP)
- Request/response logging for audit trails
- SSL/TLS termination (TLS 1.3)
- Dynamic routing based on API version headers

### Payment Service
**Purpose:** Core transaction processing engine  
**Technology:** Java 17, Spring Boot 3.1, Resilience4j  
**Deployment:** Horizontally scaled based on CPU (target: 70%), typically 8-12 pods

**Responsibilities:**
- Payment request validation (amount, currency, method)
- Provider selection algorithm with cost optimization
- Transaction state machine management (PENDING → PROCESSING → COMPLETED/FAILED)
- Idempotency enforcement using request IDs
- Real-time fraud detection integration
- Circuit breaker patterns for external API calls

**Key Metrics:**
- Average processing time: 85ms
- Throughput: 850 TPS peak
- Success rate: 99.88%

## Infrastructure Details

### Kubernetes Configuration
- **Cluster:** Amazon EKS 1.28
- **Node Groups:** 3 AZs (us-east-1a, us-east-1b, us-east-1c)
- **Node Types:** m5.xlarge (4 vCPU, 16GB RAM)
- **Auto-scaling:** 6-20 nodes based on CPU/memory

### Database
- **Primary:** PostgreSQL 15.2 on RDS
- **Instance:** db.r6g.xlarge (4 vCPU, 32GB RAM)
- **Storage:** 500GB GP3 SSD
- **Backups:** Daily automated, 30-day retention
`,
      evidence: [
        { file: 'ApiGateway.java', lines: '67-89', author: 'alex.rodriguez', date: '5 days ago', snippet: '@RestController\n@RequestMapping("/api/v1")\npublic class ApiGateway {\n  // Gateway logic\n}' },
        { file: 'kong.yml', lines: '12-45', author: 'devops', date: '1 week ago', snippet: 'plugins:\n  - name: rate-limiting\n    config:\n      minute: 100\n      policy: local' },
        { file: 'deployment.yaml', lines: '23-67', author: 'devops', date: '3 days ago', snippet: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: payment-service\nspec:\n  replicas: 8' }
      ]
    },
    'master-workflows': {
      title: 'Key Workflows',
      subtitle: 'Critical business processes',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 82,
      content: `# Key Workflows

## Overview

The ${tsd.name} orchestrates several critical workflows that directly impact customer experience and business revenue. Each workflow has been optimized for performance, reliability, and compliance.

## Standard Payment Processing

**Frequency:** ~48,000 transactions/day  
**Average Duration:** 850ms  
**Success Rate:** 99.88%

### Workflow Steps

**1. Customer Initiates Payment**
- User clicks "Pay Now" on checkout page
- Request includes: amount, currency, payment method, order ID
- Client-side validation for card format, expiry, CVV

**2. API Gateway Processing**
- Validates JWT token (expiry, signature, claims)
- Checks rate limits (100 requests/min per user)
- Logs request for audit trail
- Routes to Payment Service

**3. Payment Service Validation**
- Validates request payload (required fields, data types)
- Checks amount limits ($0.50 min, $50,000 max)
- Verifies currency is supported
- Generates idempotency key to prevent duplicates

**4. Fraud Detection**
- ML model scores transaction (0-100 risk score)
- Checks velocity rules (3 failed attempts per 24hrs)
- Validates billing address matches
- If score > 80: Flag for manual review

**5. Provider Selection**
- Route 85% to Stripe (primary)
- Route 15% to PayPal (cost optimization)
- If primary down: automatic failover to secondary
- Log provider selection reasoning

**6. External Provider Call**
- Call Stripe/PayPal API with encrypted card data
- Circuit breaker: fail fast after 3 consecutive failures
- Timeout: 5 seconds
- Retry logic: 2 attempts with exponential backoff

**7. Database Persistence**
- Insert transaction record with PENDING status
- Update to COMPLETED or FAILED based on provider response
- Store provider transaction ID for reconciliation
- Transaction wrapped in database transaction

**8. Event Publishing**
- Publish PaymentCompleted event to RabbitMQ
- Include transaction ID, amount, status
- Event consumed by: Notification, Analytics, Audit services

**9. Customer Notification**
- Notification Service consumes event
- Send confirmation email via SendGrid
- If amount > $1,000: Send SMS via Twilio
- Store notification delivery status

### Error Handling

- **Invalid Card:** Return 400 with clear error message
- **Insufficient Funds:** Return 402, log for retry
- **Provider Timeout:** Return 504, transaction marked as PENDING for reconciliation
- **Fraud Detected:** Return 403, flag account for review

---

## Refund Processing

**Frequency:** ~850 refunds/day  
**Average Duration:** 2.3 seconds  
**Approval Rate:** 94%

### Workflow Steps

**1. Refund Initiation**
Support agent initiates refund via admin dashboard with reason code

**2. Eligibility Validation**
- Check original transaction exists and is COMPLETED
- Verify refund window (< 90 days since purchase)
- Validate refund amount ≤ original amount
- Check for existing refunds on transaction

**3. Provider API Call**
- Call Stripe/PayPal refund API
- Pass original transaction ID
- Specify refund amount (full or partial)

**4. Database Update**
- Create refund record linked to transaction
- Update transaction status to REFUNDED
- Log refund reason and initiating user

**5. Customer Balance Adjustment**
If store credit option selected, credit customer account

**6. Notification**
- Send refund confirmation email
- Include estimated arrival time (5-10 business days)
- Provide refund reference number

**7. Reconciliation Logging**
Mark for inclusion in next reconciliation cycle

### Business Rules

- **Partial refunds** allowed (minimum $1.00)
- **Full refunds** return 100% of original amount
- **Processing time:** 5-10 business days to customer account
- **Chargebacks** handled separately by disputes team

---

## Daily Reconciliation

**Schedule:** Daily at 2:00 AM UTC  
**Duration:** 15-20 minutes  
**Volume:** ~50,000 transactions/day

### Workflow Steps

**1. File Download**
- Download settlement files from Stripe (CSV format)
- Download settlement files from PayPal (JSON format)
- Files contain all transactions from previous day

**2. Data Parsing**
- Parse CSV/JSON into standardized format
- Extract: transaction ID, amount, currency, timestamp, status
- Normalize data structure across providers

**3. Matching Logic**
\`\`\`
For each provider transaction:
  1. Find matching transaction in our database by reference ID
  2. Compare amounts (must match within $0.01 due to rounding)
  3. Compare status (COMPLETED in both systems)
  4. If match: Mark as reconciled
  5. If no match or mismatch: Flag for review
\`\`\`

**4. Discrepancy Classification**

- **Missing in our DB:** Transaction in provider file but not our records
  - Possible cause: Webhook failure, database write failure
  - Action: Create transaction record, investigate

- **Missing in provider:** Transaction in our DB but not provider file  
  - Possible cause: Provider processing delay, incorrect reference ID
  - Action: Query provider API, wait 24hrs, escalate if persists

- **Amount mismatch:** Amounts don't match
  - Possible cause: Currency conversion, partial refund, fee adjustment
  - Action: Manual review by finance team

- **Status mismatch:** We show COMPLETED, provider shows FAILED
  - Possible cause: Race condition, status update failure
  - Action: Update our status, refund customer if needed

**5. Report Generation**
- Generate daily reconciliation report (PDF)
- Include: total transactions, match rate, discrepancies by type
- Summary statistics: total volume, total amount, success rate

**6. Distribution**
- Email report to finance team (finance@company.com)
- Store in S3 for audit purposes (7-year retention)
- If discrepancies > $1,000: Send urgent alert to on-call

**7. Audit Trail**
- Log reconciliation run to audit_logs table
- Include: start time, end time, records processed, discrepancies found
- Store provider file copies in S3 with timestamp

### Success Metrics

- **Match Rate:** 99.95% (target: 99.9%)
- **Discrepancy Resolution Time:** < 24 hours average
- **False Positives:** < 0.1% (usually currency rounding)
- **Automated Resolution:** 98% (manual review: 2%)

### Failure Scenarios

**If reconciliation job fails:**
1. Retry automatically after 15 minutes
2. If still failing: Page on-call engineer
3. Manual reconciliation required if job fails 3 times

**If provider files unavailable:**
1. Wait up to 6 hours (files sometimes delayed)
2. Alert finance team if still unavailable
3. Manual download and processing required
`,
      evidence: [
        { file: 'PaymentWorkflow.java', lines: '45-120', author: 'sarah.chen', date: '1 week ago', snippet: 'public class PaymentWorkflow {\n  @Transactional\n  public PaymentResult processPayment() {\n    // Validation\n    // Fraud check\n    // Provider call\n  }' },
        { file: 'RefundService.java', lines: '23-78', author: 'mike.johnson', date: '2 weeks ago', snippet: '@Service\npublic class RefundService {\n  public Refund initiateRefund(RefundRequest req) {\n    validateEligibility(req);\n    // ...\n  }' },
        { file: 'ReconciliationJob.java', lines: '34-156', author: 'sarah.chen', date: '1 month ago', snippet: '@Scheduled(cron = "0 2 * * *")\npublic void runDailyReconciliation() {\n  // Download files\n  // Match transactions\n}' }
      ]
    },
    'api-rest': {
      title: 'REST API Documentation',
      subtitle: 'HTTP endpoints and contracts',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 96,
      content: `# REST API Documentation

## Authentication

All endpoints require a JWT bearer token in the Authorization header:

\`\`\`
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

**Token Details:**
- Issued by: Auth0
- Validity: 1 hour
- Required claims: \`sub\` (user ID), \`email\`, \`roles\`

## Base URL

- **Production:** \`https://api.payments.company.com/v1\`
- **Staging:** \`https://api-staging.payments.company.com/v1\`

## Rate Limits

| Limit Type | Rate | Response Header |
|------------|------|-----------------|
| Per User | 100 requests/minute | \`X-RateLimit-Remaining\` |
| Per IP | 10,000 requests/minute | \`X-RateLimit-Limit\` |
| Burst | 20 requests/second | \`X-RateLimit-Reset\` |

When rate limit exceeded: **429 Too Many Requests**

---

## Endpoints

### POST /payments
**Create a new payment transaction**

**Request Body:**
\`\`\`json
{
  "amount": 99.99,
  "currency": "USD",
  "paymentMethod": "stripe",
  "customerId": "cus_abc123",
  "orderId": "ord_xyz789",
  "idempotencyKey": "550e8400-e29b-41d4-a716-446655440000",
  "metadata": {
    "orderNumber": "12345",
    "source": "web"
  }
}
\`\`\`

**Required Fields:**
- \`amount\` (number, > 0.50, < 50000)
- \`currency\` (string, ISO 4217 code)
- \`paymentMethod\` (enum: "stripe" | "paypal" | "applepay")
- \`customerId\` (string, UUID)
- \`orderId\` (string, UUID)
- \`idempotencyKey\` (string, UUID v4)

**Optional Fields:**
- \`metadata\` (object, max 10 keys, each value < 500 chars)

**Success Response (201 Created):**
\`\`\`json
{
  "transactionId": "txn_abc123",
  "status": "COMPLETED",
  "amount": 99.99,
  "currency": "USD",
  "paymentMethod": "stripe",
  "providerTransactionId": "pi_abc123_stripe",
  "createdAt": "2025-10-15T14:30:00Z",
  "estimatedSettlement": "2025-10-17T00:00:00Z"
}
\`\`\`

**Status Values:**
- \`PENDING\` - Transaction initiated, awaiting provider
- \`PROCESSING\` - Being processed by payment provider
- \`COMPLETED\` - Successfully completed
- \`FAILED\` - Failed (see \`errorCode\`)

**Error Responses:**

| Code | Error | Description |
|------|-------|-------------|
| 400 | \`INVALID_REQUEST\` | Missing or invalid parameters |
| 400 | \`INVALID_AMOUNT\` | Amount outside allowed range |
| 400 | \`UNSUPPORTED_CURRENCY\` | Currency not supported |
| 402 | \`INSUFFICIENT_FUNDS\` | Card declined by bank |
| 403 | \`FRAUD_DETECTED\` | Transaction flagged as suspicious |
| 409 | \`DUPLICATE_REQUEST\` | Idempotency key already used |
| 429 | \`RATE_LIMIT_EXCEEDED\` | Too many requests |
| 500 | \`INTERNAL_ERROR\` | Server error |
| 503 | \`PROVIDER_UNAVAILABLE\` | Payment provider down |

**Example Error:**
\`\`\`json
{
  "error": "INSUFFICIENT_FUNDS",
  "message": "Card declined due to insufficient funds",
  "transactionId": "txn_abc123",
  "timestamp": "2025-10-15T14:30:00Z"
}
\`\`\`

---

### GET /payments/{transactionId}
**Retrieve payment transaction details**

**Path Parameters:**
- \`transactionId\` (string, required) - Transaction UUID

**Success Response (200 OK):**
\`\`\`json
{
  "transactionId": "txn_abc123",
  "amount": 99.99,
  "currency": "USD",
  "status": "COMPLETED",
  "paymentMethod": "stripe",
  "customerId": "cus_abc123",
  "orderId": "ord_xyz789",
  "providerTransactionId": "pi_abc123_stripe",
  "createdAt": "2025-10-15T14:30:00Z",
  "updatedAt": "2025-10-15T14:30:05Z",
  "metadata": {
    "orderNumber": "12345",
    "source": "web"
  },
  "refunds": [],
  "fraudScore": 15
}
\`\`\`

**Error Responses:**
- \`404 NOT_FOUND\` - Transaction does not exist
- \`403 FORBIDDEN\` - User not authorized to view transaction

---

### GET /payments
**List payments with filtering and pagination**

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| \`customerId\` | string | No | Filter by customer UUID |
| \`status\` | enum | No | Filter by status |
| \`startDate\` | ISO 8601 | No | Start date (inclusive) |
| \`endDate\` | ISO 8601 | No | End date (inclusive) |
| \`page\` | integer | No | Page number (default: 1) |
| \`pageSize\` | integer | No | Results per page (default: 20, max: 100) |

**Example Request:**
\`\`\`
GET /payments?customerId=cus_abc123&status=COMPLETED&page=1&pageSize=20
\`\`\`

**Success Response (200 OK):**
\`\`\`json
{
  "data": [
    {
      "transactionId": "txn_abc123",
      "amount": 99.99,
      "currency": "USD",
      "status": "COMPLETED",
      "createdAt": "2025-10-15T14:30:00Z"
    },
    {
      "transactionId": "txn_def456",
      "amount": 49.99,
      "currency": "USD",
      "status": "COMPLETED",
      "createdAt": "2025-10-14T10:15:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "totalPages": 5,
    "totalRecords": 95
  }
}
\`\`\`

---

### POST /refunds
**Initiate a refund for a completed payment**

**Request Body:**
\`\`\`json
{
  "transactionId": "txn_abc123",
  "amount": 50.00,
  "reason": "Customer requested partial refund",
  "notifyCustomer": true
}
\`\`\`

**Required Fields:**
- \`transactionId\` (string, UUID)
- \`reason\` (string, 10-500 chars)

**Optional Fields:**
- \`amount\` (number) - If omitted, full refund
- \`notifyCustomer\` (boolean, default: true)

**Success Response (200 OK):**
\`\`\`json
{
  "refundId": "ref_xyz789",
  "transactionId": "txn_abc123",
  "status": "PENDING",
  "refundedAmount": 50.00,
  "currency": "USD",
  "processedAt": "2025-10-15T15:00:00Z",
  "estimatedArrival": "2025-10-22T00:00:00Z"
}
\`\`\`

**Business Rules:**
- Refunds within **90 days** of original transaction
- Minimum refund: **$1.00**
- Maximum refund: Original transaction amount
- Takes **5-10 business days** to reach customer

**Error Responses:**
- \`400 INVALID_AMOUNT\` - Refund amount > original or < $1.00
- \`404 TRANSACTION_NOT_FOUND\` - Transaction doesn't exist
- \`409 ALREADY_REFUNDED\` - Transaction fully refunded
- \`422 REFUND_WINDOW_EXPIRED\` - More than 90 days elapsed

---

## Webhook Events

Configure webhook URLs in the admin dashboard to receive real-time notifications.

**Supported Events:**
- \`payment.completed\` - Payment successful
- \`payment.failed\` - Payment failed
- \`refund.processed\` - Refund completed
- \`refund.failed\` - Refund failed

**Webhook Payload:**
\`\`\`json
{
  "eventId": "evt_abc123",
  "eventType": "payment.completed",
  "timestamp": "2025-10-15T14:30:05Z",
  "data": {
    "transactionId": "txn_abc123",
    "amount": 99.99,
    "currency": "USD",
    "status": "COMPLETED",
    "customerId": "cus_abc123"
  }
}
\`\`\`

**Signature Verification:**

Each webhook includes \`X-Webhook-Signature\` header:
\`\`\`
X-Webhook-Signature: sha256=5d41402abc4b2a76b9719d911017c592
\`\`\`

Verify using HMAC-SHA256 with your webhook secret:
\`\`\`python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    expected = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, signature)
\`\`\`

**Retry Policy:**
- Webhook delivery retries up to 5 times
- Exponential backoff: 1s, 2s, 4s, 8s, 16s
- After 5 failures, webhook marked as failed
- Check webhook logs in admin dashboard
`,
      evidence: [
        { file: 'PaymentController.java', lines: '23-67', author: 'alex.rodriguez', date: '3 days ago', snippet: '@PostMapping("/api/v1/payments")\npublic ResponseEntity<PaymentResponse> createPayment(\n  @RequestBody PaymentRequest request\n) {\n  // Validation\n  // Process payment\n}' },
        { file: 'openapi.yaml', lines: '1-150', author: 'system', date: '1 week ago', snippet: 'openapi: 3.0.0\ninfo:\n  title: Payment API\n  version: 1.0.0\npaths:\n  /payments:\n    post:' },
        { file: 'RefundController.java', lines: '45-89', author: 'mike.johnson', date: '2 weeks ago', snippet: '@PostMapping("/api/v1/refunds")\npublic ResponseEntity<RefundResponse> createRefund(\n  @RequestBody RefundRequest request\n) {' }
      ]
    },
    'data-schema': {
      title: 'Database Schema',
      subtitle: 'Table structures and relationships',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 85,
      content: `# Database Schema

## Overview

The system uses **PostgreSQL 15.2** as the primary database with the following design principles:

- **Normalized to 3NF** to minimize data redundancy
- **UUID primary keys** for distributed system compatibility
- **Indexed foreign keys** for join performance
- **Timestamp tracking** (created_at, updated_at) on all tables
- **Soft deletes** where appropriate (deleted_at column)

## Entity Relationship Diagram

\`\`\`
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│   customers      │         │   transactions   │         │    refunds       │
├──────────────────┤         ├──────────────────┤         ├──────────────────┤
│ PK id (UUID)     │←───────┤│ FK customer_id   │←───────┤│ FK transaction_id│
│    email         │         ││    order_id      │         ││    amount        │
│    name          │         ││    amount        │         ││    reason        │
│    phone         │         ││    currency      │         ││    status        │
│    created_at    │         ││    status        │         ││    initiated_by  │
└──────────────────┘         ││    payment_method│         ││    processed_at  │
                             ││    provider_tx_id│         │└──────────────────┘
                             ││    fraud_score   │
                             ││    created_at    │         ┌──────────────────┐
                             ││    updated_at    │         │   audit_logs     │
                             │└──────────────────┘         ├──────────────────┤
                             │         │                   │ PK id (UUID)     │
                             └─────────┼──────────────────→│ FK transaction_id│
                                       │                   │    action        │
                                       │                   │    user_id       │
                                       │                   │    ip_address    │
                                       │                   │    timestamp     │
                                       │                   └──────────────────┘
                                       │
                                       │                   ┌──────────────────┐
                                       └──────────────────→│ reconciliation   │
                                                           ├──────────────────┤
                                                           │ PK id (UUID)     │
                                                           │ FK transaction_id│
                                                           │    provider_ref  │
                                                           │    matched       │
                                                           │    match_date    │
                                                           └──────────────────┘
\`\`\`

---

## Table: transactions

**Purpose:** Primary table storing all payment transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| \`id\` | UUID | PRIMARY KEY | Unique transaction identifier |
| \`customer_id\` | UUID | NOT NULL, FK, INDEXED | Reference to customers.id |
| \`order_id\` | UUID | NOT NULL, INDEXED | External order reference |
| \`amount\` | DECIMAL(10,2) | NOT NULL, > 0 | Transaction amount |
| \`currency\` | VARCHAR(3) | NOT NULL | ISO 4217 code (USD, EUR, GBP) |
| \`status\` | VARCHAR(20) | NOT NULL | PENDING, PROCESSING, COMPLETED, FAILED |
| \`payment_method\` | VARCHAR(20) | NOT NULL | stripe, paypal, applepay |
| \`provider_transaction_id\` | VARCHAR(255) | UNIQUE | Provider's reference ID |
| \`idempotency_key\` | UUID | UNIQUE, NOT NULL | Client deduplication key |
| \`fraud_score\` | INTEGER | CHECK (0-100) | ML fraud detection score |
| \`metadata\` | JSONB | NULL | Flexible key-value data |
| \`created_at\` | TIMESTAMP | NOT NULL | Creation timestamp (UTC) |
| \`updated_at\` | TIMESTAMP | NOT NULL | Last modification (UTC) |

**Indexes:**
\`\`\`sql
CREATE INDEX idx_transactions_customer ON transactions(customer_id);
CREATE INDEX idx_transactions_order ON transactions(order_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_created ON transactions(created_at);
CREATE INDEX idx_transactions_provider ON transactions(provider_transaction_id);
CREATE INDEX idx_transactions_idempotency ON transactions(idempotency_key);
\`\`\`

**Check Constraints:**
\`\`\`sql
ALTER TABLE transactions ADD CONSTRAINT chk_amount 
  CHECK (amount > 0);
  
ALTER TABLE transactions ADD CONSTRAINT chk_fraud_score 
  CHECK (fraud_score BETWEEN 0 AND 100);
  
ALTER TABLE transactions ADD CONSTRAINT chk_status 
  CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED'));
\`\`\`

**Partitioning:**
Table is partitioned by \`created_at\` (monthly) for query performance:
\`\`\`sql
CREATE TABLE transactions_2025_10 PARTITION OF transactions
  FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');
\`\`\`

**Typical Queries:**
\`\`\`sql
-- Get customer transactions
SELECT * FROM transactions 
WHERE customer_id = ? AND status = 'COMPLETED'
ORDER BY created_at DESC LIMIT 20;

-- Daily transaction volume
SELECT DATE(created_at), COUNT(*), SUM(amount)
FROM transactions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at);
\`\`\`

---

## Table: refunds

**Purpose:** Stores all refund transactions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| \`id\` | UUID | PRIMARY KEY | Unique refund identifier |
| \`transaction_id\` | UUID | NOT NULL, FK | Original transaction |
| \`amount\` | DECIMAL(10,2) | NOT NULL, > 0 | Refund amount |
| \`reason\` | TEXT | NOT NULL | Refund reason (customer service) |
| \`status\` | VARCHAR(20) | NOT NULL | PENDING, COMPLETED, FAILED |
| \`initiated_by\` | UUID | NOT NULL | User who initiated refund |
| \`provider_refund_id\` | VARCHAR(255) | UNIQUE | Provider's refund reference |
| \`processed_at\` | TIMESTAMP | NULL | When refund completed |
| \`created_at\` | TIMESTAMP | NOT NULL | Initiation timestamp |

**Indexes:**
\`\`\`sql
CREATE INDEX idx_refunds_transaction ON refunds(transaction_id);
CREATE INDEX idx_refunds_status ON refunds(status);
CREATE INDEX idx_refunds_created ON refunds(created_at);
\`\`\`

**Foreign Key:**
\`\`\`sql
ALTER TABLE refunds ADD CONSTRAINT fk_refunds_transaction
  FOREIGN KEY (transaction_id) REFERENCES transactions(id)
  ON DELETE RESTRICT;
\`\`\`

**Business Logic Validation:**
\`\`\`sql
-- Ensure refund amount doesn't exceed original transaction
CREATE OR REPLACE FUNCTION validate_refund_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT SUM(amount) FROM refunds WHERE transaction_id = NEW.transaction_id) + NEW.amount >
     (SELECT amount FROM transactions WHERE id = NEW.transaction_id) THEN
    RAISE EXCEPTION 'Refund amount exceeds original transaction';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_validate_refund 
  BEFORE INSERT ON refunds
  FOR EACH ROW EXECUTE FUNCTION validate_refund_amount();
\`\`\`

---

## Table: customers

**Purpose:** Customer information for billing and compliance

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| \`id\` | UUID | PRIMARY KEY | Unique customer identifier |
| \`email\` | VARCHAR(255) | UNIQUE, NOT NULL | Email address (login) |
| \`name\` | VARCHAR(255) | NOT NULL | Full name |
| \`phone\` | VARCHAR(20) | NULL | Phone number (E.164 format) |
| \`address_line1\` | VARCHAR(255) | NULL | Billing address |
| \`address_city\` | VARCHAR(100) | NULL | City |
| \`address_state\` | VARCHAR(100) | NULL | State/province |
| \`address_country\` | VARCHAR(2) | NULL | ISO 3166-1 alpha-2 code |
| \`address_postal_code\` | VARCHAR(20) | NULL | ZIP/Postal code |
| \`created_at\` | TIMESTAMP | NOT NULL | Account creation |
| \`updated_at\` | TIMESTAMP | NOT NULL | Last profile update |
| \`deleted_at\` | TIMESTAMP | NULL | Soft delete (GDPR) |

**Indexes:**
\`\`\`sql
CREATE UNIQUE INDEX idx_customers_email ON customers(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_customers_created ON customers(created_at);
\`\`\`

---

## Table: audit_logs

**Purpose:** Comprehensive audit trail for compliance (PCI-DSS, SOX)

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| \`id\` | UUID | PRIMARY KEY | Log entry ID |
| \`transaction_id\` | UUID | NULL, FK | Related transaction |
| \`action\` | VARCHAR(50) | NOT NULL | CREATE, UPDATE, DELETE, REFUND, VIEW |
| \`user_id\` | UUID | NULL | User who performed action |
| \`ip_address\` | INET | NULL | Source IP address |
| \`user_agent\` | TEXT | NULL | Browser/client info |
| \`request_payload\` | JSONB | NULL | API request data |
| \`response_payload\` | JSONB | NULL | API response data |
| \`timestamp\` | TIMESTAMP | NOT NULL | When action occurred (UTC) |

**Indexes:**
\`\`\`sql
CREATE INDEX idx_audit_transaction ON audit_logs(transaction_id);
CREATE INDEX idx_audit_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_user ON audit_logs(user_id);
\`\`\`

**Retention:** 7 years (regulatory requirement)

**Partitioning:** Monthly partitions, automatically created
\`\`\`sql
CREATE TABLE audit_logs_2025_10 PARTITION OF audit_logs
  FOR VALUES FROM ('2025-10-01') TO ('2025-11-01');
\`\`\`

---

## Data Retention & Archival

| Table | Hot Storage | Archive Storage | Deletion |
|-------|-------------|-----------------|----------|
| transactions | 2 years | S3 Glacier (7 years) | Never (compliance) |
| refunds | 2 years | S3 Glacier (7 years) | Never (compliance) |
| audit_logs | 1 year | S3 Glacier (7 years) | After 7 years |
| customers | Indefinite | N/A | On request (GDPR) |

**Archival Process:**
\`\`\`sql
-- Monthly cron job exports old data to S3
COPY (
  SELECT * FROM transactions 
  WHERE created_at < CURRENT_DATE - INTERVAL '2 years'
) TO '/tmp/transactions_archive.csv' WITH CSV HEADER;
\`\`\`

---

## Backup & Recovery

**Automated Backups:**
- **Frequency:** Daily at 3:00 AM UTC
- **Retention:** 30 days
- **Storage:** S3 with cross-region replication (us-west-2)
- **Encryption:** AES-256 at rest

**Point-in-Time Recovery:**
- Available for last 7 days
- RPO (Recovery Point Objective): < 15 minutes
- RTO (Recovery Time Objective): < 4 hours

**Disaster Recovery:**
\`\`\`
Primary DB (us-east-1) ─→ Streaming Replication ─→ Standby DB (us-west-2)
                             (< 1 second lag)
\`\`\`

---

## Database Performance

**Connection Pooling:**
- HikariCP with max 50 connections per service
- Connection timeout: 30 seconds
- Idle timeout: 10 minutes

**Query Performance:**
- Slow query logging: > 1 second → CloudWatch
- Explain analyze for queries > 100ms
- Weekly VACUUM and ANALYZE

**Monitoring:**
- Active connections
- Query execution time (p50, p95, p99)
- Deadlocks per hour
- Replication lag
- Disk usage
`,
      evidence: [
        { file: 'migrations/V001__initial_schema.sql', lines: '1-89', author: 'database', date: '3 months ago', snippet: 'CREATE TABLE transactions (\n  id UUID PRIMARY KEY,\n  customer_id UUID NOT NULL,\n  amount DECIMAL(10,2) NOT NULL,\n  ...\n);' },
        { file: 'Transaction.java', lines: '12-45', author: 'sarah.chen', date: '2 weeks ago', snippet: '@Entity\n@Table(name = "transactions")\npublic class Transaction {\n  @Id\n  private UUID id;\n  ...\n}' },
        { file: 'migrations/V012__add_partitioning.sql', lines: '1-34', author: 'database', date: '1 month ago', snippet: 'CREATE TABLE transactions_2025_10 PARTITION OF transactions\n  FOR VALUES FROM (\'2025-10-01\') TO (\'2025-11-01\');' }
      ]
    },
    'tests': {
      title: 'Quality & Test Coverage',
      subtitle: 'Testing strategy and metrics',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 73,
      content: `# Quality & Test Coverage

## Coverage Overview

**Overall Test Coverage:** 76%  
**Target:** 80% (incrementally improving)  
**Last Updated:** ${tsd.lastUpdated}

### Coverage by Service

| Service | Coverage | Lines Covered | Status | Trend |
|---------|----------|---------------|--------|-------|
| Payment Service | 84% | 2,340 / 2,786 | ✅ Good | ↑ +3% |
| API Gateway | 68% | 890 / 1,309 | ⚠️ Needs work | → Stable |
| Reconciliation Service | 71% | 456 / 642 | ⚠️ Needs work | ↑ +2% |
| Notification Service | 79% | 623 / 788 | ✅ Good | ↑ +5% |
| Fraud Detection | 91% | 412 / 453 | ✅ Excellent | ↑ +1% |

### Coverage Gaps

> **Warning:** The following areas need additional test coverage:

**Critical Gaps:**
- **Webhook error handling** (42% coverage) - Priority: High
  - Missing tests for retry logic
  - Signature verification edge cases
  - Concurrent webhook processing

**Medium Priority:**
- **Reconciliation edge cases** (55% coverage)
  - Currency conversion mismatches
  - Timezone handling
  - Leap year/daylight savings scenarios

- **Rate limiting edge cases** (60% coverage)
  - Distributed rate limit synchronization
  - Redis connection failure scenarios

- **Concurrent transaction handling** (65% coverage)
  - Race conditions in idempotency checks
  - Deadlock scenarios

---

## Testing Strategy

We follow the **Test Pyramid** approach with emphasis on fast, reliable unit tests.

\`\`\`
                   ▲
                  ╱ ╲
                 ╱   ╲
                ╱ E2E ╲           ~150 tests (10%)
               ╱───────╲          Full system, slow
              ╱         ╲         Run: Nightly + releases
             ╱───────────╲
            ╱             ╲
           ╱ Integration   ╲     ~450 tests (25%)
          ╱─────────────────╲    External dependencies
         ╱                   ╲   Run: Before merge
        ╱─────────────────────╲
       ╱                       ╲
      ╱      Unit Tests         ╲  ~1,200 tests (65%)
     ╱─────────────────────────── ╲ Fast, isolated
    ╱                             ╱ Run: Every commit
   ───────────────────────────────
\`\`\`

**Total:** ~1,800 automated tests

---

## Test Types

### Unit Tests (65% - ~1,200 tests)

**Purpose:** Fast, isolated tests for business logic  
**Framework:** JUnit 5, Mockito, AssertJ  
**Execution:** Every commit (< 2 minutes)  
**Failure Threshold:** 0 failures allowed

**Coverage Requirements:**
- All public methods must have tests
- All conditional branches (if/else) covered
- Edge cases explicitly tested (null, empty, boundary values)
- Exception scenarios validated

**Example Test Categories:**

**Payment Validation:**
\`\`\`java
@Test
void shouldRejectPaymentBelowMinimum() {
  PaymentRequest request = new PaymentRequest(0.49, "USD");
  assertThatThrownBy(() -> service.validatePayment(request))
    .isInstanceOf(InvalidAmountException.class)
    .hasMessage("Amount must be at least $0.50");
}

@Test
void shouldRejectPaymentAboveMaximum() {
  PaymentRequest request = new PaymentRequest(50001, "USD");
  assertThatThrownBy(() -> service.validatePayment(request))
    .isInstanceOf(InvalidAmountException.class)
    .hasMessage("Amount cannot exceed $50,000");
}
\`\`\`

**Fraud Score Calculation:**
\`\`\`java
@Test
void shouldReturnHighFraudScoreForSuspiciousPattern() {
  Transaction txn = createSuspiciousTransaction();
  int score = fraudDetector.calculateScore(txn);
  assertThat(score).isGreaterThan(80);
}
\`\`\`

**State Machine Transitions:**
\`\`\`java
@Test
void shouldTransitionFromPendingToCompleted() {
  Transaction txn = new Transaction(PENDING);
  txn.markCompleted("pi_123");
  assertThat(txn.getStatus()).isEqualTo(COMPLETED);
  assertThat(txn.getProviderTransactionId()).isEqualTo("pi_123");
}
\`\`\`

---

### Integration Tests (25% - ~450 tests)

**Purpose:** Test interactions with external systems  
**Framework:** JUnit 5, Testcontainers, WireMock  
**Execution:** Before merge to main (~5 minutes)  
**Failure Threshold:** 0 failures allowed

**Test Scenarios:**

**Database Operations:**
\`\`\`java
@Test
@Testcontainers
void shouldPersistAndRetrieveTransaction() {
  // Uses Testcontainers for real PostgreSQL
  Transaction txn = createTestTransaction();
  repository.save(txn);
  
  Transaction retrieved = repository.findById(txn.getId());
  assertThat(retrieved).isEqualTo(txn);
}
\`\`\`

**RabbitMQ Messaging:**
\`\`\`java
@Test
void shouldPublishPaymentEventToQueue() {
  PaymentEvent event = new PaymentCompleted(txn.getId());
  eventPublisher.publish(event);
  
  // Verify event received by consumer
  await().atMost(5, SECONDS)
    .until(() -> eventConsumer.hasReceived(event));
}
\`\`\`

**External API Integration (Mocked):**
\`\`\`java
@Test
void shouldHandleStripeAPITimeout() {
  // WireMock simulates Stripe API
  stubFor(post("/v1/charges")
    .willReturn(aResponse()
      .withFixedDelay(6000))); // Exceeds 5s timeout
  
  assertThatThrownBy(() -> stripeClient.createCharge(request))
    .isInstanceOf(TimeoutException.class);
}
\`\`\`

**Infrastructure:**
- **Testcontainers:** PostgreSQL, Redis, RabbitMQ
- **WireMock:** Stripe, PayPal, Auth0 API mocks
- **Separate test database** (cleared between tests)

---

### End-to-End Tests (10% - ~150 tests)

**Purpose:** Full system tests simulating user journeys  
**Framework:** REST Assured, Selenium (admin UI)  
**Execution:** Nightly at 2 AM UTC + before production releases  
**Duration:** 30-45 minutes for full suite

**Critical Paths Tested:**

**1. Complete Payment Flow (Happy Path)**
\`\`\`
1. User authentication via Auth0
2. Create payment request
3. Verify payment processed by Stripe
4. Confirm event published to RabbitMQ
5. Verify email sent via SendGrid
6. Check transaction persisted in database
7. Validate audit log created
\`\`\`

**2. Payment Failure Handling**
\`\`\`
1. Submit payment with declined card
2. Verify FAILED status returned
3. Confirm no charge to customer
4. Check error logged correctly
5. Verify retry limit enforced (3 attempts)
\`\`\`

**3. Refund Processing**
\`\`\`
1. Create successful payment
2. Initiate refund via admin UI
3. Verify refund processed by provider
4. Confirm customer notified
5. Check reconciliation updated
\`\`\`

**4. Daily Reconciliation Job**
\`\`\`
1. Trigger reconciliation manually
2. Verify provider files downloaded
3. Check transactions matched
4. Confirm report generated
5. Validate email sent to finance
\`\`\`

**Test Environment:**
- Staging environment (mirrors production)
- Synthetic test data
- Real external APIs (test mode)
- Isolated test accounts

**Data Cleanup:**
All test data deleted after each run

---

## Performance Tests

**Tool:** k6 (load testing framework)  
**Frequency:** Weekly + before major releases  
**Infrastructure:** Dedicated load test cluster

### Load Test Scenarios

**Baseline Load Test**
\`\`\`javascript
// k6 script
export let options = {
  vus: 100,           // 100 virtual users
  duration: '30m',    // 30 minutes
  thresholds: {
    http_req_duration: ['p(95)<200'],  // 95% < 200ms
    http_req_failed: ['rate<0.005'],   // < 0.5% errors
  }
};
\`\`\`

**Target:** 100 TPS sustained  
**Last Result:** ✅ p95: 147ms, errors: 0.12%

**Stress Test**
\`\`\`javascript
export let options = {
  stages: [
    { duration: '5m', target: 100 },   // Ramp to 100 TPS
    { duration: '5m', target: 500 },   // Ramp to 500 TPS
    { duration: '5m', target: 1000 },  // Ramp to 1000 TPS
    { duration: '10m', target: 1000 }, // Sustain
    { duration: '5m', target: 0 },     // Ramp down
  ]
};
\`\`\`

**Purpose:** Find breaking point  
**Last Result:** System degraded at 950 TPS

**Spike Test**
\`\`\`javascript
export let options = {
  stages: [
    { duration: '1m', target: 100 },  // Normal load
    { duration: '10s', target: 500 }, // Sudden spike
    { duration: '3m', target: 500 },  // Sustain spike
    { duration: '1m', target: 100 },  // Back to normal
  ]
};
\`\`\`

**Purpose:** Test auto-scaling responsiveness  
**Last Result:** Auto-scaling triggered in 90 seconds

### Performance Benchmarks

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Average Response Time | < 100ms | 85ms | ✅ |
| p95 Response Time | < 200ms | 147ms | ✅ |
| p99 Response Time | < 500ms | 380ms | ✅ |
| Error Rate | < 0.5% | 0.12% | ✅ |
| Throughput | 500 TPS | 650 TPS | ✅ |
| CPU Usage (avg) | < 70% | 52% | ✅ |
| Memory Usage (avg) | < 80% | 68% | ✅ |
| Database Connections | < 40 | 28 | ✅ |

---

## Test Data Management

### Test Fixtures

**Location:** \`src/test/resources/fixtures/\`

**Available Fixtures:**
- \`valid-payment-request.json\` - Standard payment
- \`invalid-payment-request.json\` - Missing fields
- \`high-value-payment.json\` - Transaction > $10,000
- \`fraud-suspicious-payment.json\` - High fraud score
- \`refund-request.json\` - Standard refund
- \`multiple-refunds.json\` - Partial refunds scenario

### Test Database

**Setup:**
- Flyway migrations run before each test suite
- Seeded with minimal reference data
- Isolated from production

**Teardown:**
- Database cleared after each test class
- Ensures test independence

**Data Generation:**
- Faker library for realistic test data
- Consistent seed for reproducibility

---

## Continuous Integration

### GitHub Actions Pipeline

**On Every Commit:**
\`\`\`yaml
- Run unit tests (2 minutes)
- Run linting & code style checks (1 minute)
- SonarQube code quality scan (2 minutes)
Total: ~5 minutes
\`\`\`

**On Pull Request:**
\`\`\`yaml
- Run unit tests
- Run integration tests (5 minutes)
- Run security scan - Snyk (2 minutes)
- Check test coverage (fails if < 75%)
Total: ~12 minutes
\`\`\`

**On Merge to Main:**
\`\`\`yaml
- Run full test suite
- Build Docker image
- Deploy to staging
- Run E2E tests (30 minutes)
- If all pass → Auto-deploy to production
Total: ~45 minutes
\`\`\`

### Quality Gates

**Pull Request CANNOT merge if:**
- Any test fails
- Test coverage drops below 75%
- Critical security vulnerabilities found (CVSS > 7.0)
- Code style violations
- Duplicate code > 5%
- Cognitive complexity > 15 for any method

---

## Test Improvement Roadmap

**Q4 2025 Goals:**

1. ✅ **Increase overall coverage to 80%**
   - Current: 76% → Target: 80%
   - Focus: API Gateway, Reconciliation Service

2. 🚧 **Add chaos engineering tests**
   - Randomly kill pods during load tests
   - Simulate network partitions
   - Test graceful degradation

3. 📋 **Implement mutation testing**
   - Use PIT (Pitest) to verify tests catch bugs
   - Target: 70% mutation coverage

4. 📋 **Add visual regression tests**
   - Backstop.js for admin dashboard
   - Catch UI regressions automatically

5. 📋 **Contract testing for microservices**
   - Pact for consumer-driven contracts
   - Ensure API compatibility

---

## Useful Commands

\`\`\`bash
# Run unit tests only
./mvnw test

# Run integration tests
./mvnw verify -Pintegration-tests

# Run with coverage report
./mvnw clean verify jacoco:report
# Report: target/site/jacoco/index.html

# Run specific test class
./mvnw test -Dtest=PaymentServiceTest

# Run load tests
k6 run tests/load/payment-flow.js

# Run E2E tests
./mvnw verify -Pe2e-tests -Denv=staging
\`\`\`

---

## Metrics Dashboard

**SonarQube:** https://sonar.company.com/dashboard?id=payment-service

**Key Metrics Tracked:**
- Test coverage (line, branch, condition)
- Code smells
- Technical debt ratio
- Duplicated code %
- Maintainability rating
- Reliability rating
- Security rating
`,
      evidence: [
        { file: 'coverage-report.xml', lines: '1-50', author: 'ci-system', date: '1 hour ago', snippet: '<coverage line-rate="0.76" branch-rate="0.68">\n  <package name="com.company.payment">\n    <class name="PaymentService" line-rate="0.84" />' },
        { file: 'PaymentServiceTest.java', lines: '1-234', author: 'sarah.chen', date: '3 days ago', snippet: '@Test\npublic void testSuccessfulPayment() {\n  PaymentRequest req = createValidRequest();\n  PaymentResult result = service.processPayment(req);\n  assertThat(result.getStatus()).isEqualTo(COMPLETED);\n}' },
        { file: '.github/workflows/ci.yml', lines: '23-67', author: 'devops', date: '1 month ago', snippet: 'name: CI Pipeline\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: mvn test' }
      ]
    },
    'risks': {
      title: 'Risk Register',
      subtitle: 'Security, compliance, and operational risks',
      version: tsd.version,
      updated: tsd.lastUpdated,
      confidence: 78,
      content: `# Risk Register

## Risk Assessment Overview

This register tracks identified risks across security, compliance, technical debt, and operational domains. Each risk is assigned an owner, mitigation plan, and review schedule.

**Last Updated:** ${tsd.lastUpdated}  
**Next Review:** January 15, 2026  
**Owner:** Security & Compliance Team

---

## Risk Priority Matrix

\`\`\`
Impact ↑
Critical│         │         │ 🔴 RISK-001 │
        │         │         │             │
   High │         │ 🟠 RISK-002 │         │
        │         │             │         │
 Medium │         │ 🟡 RISK-003 │         │
        │         │             │         │
    Low │ 🟢      │         │             │
        └─────────┴─────────┴─────────────┴→ Likelihood
            Low      Medium     High
\`\`\`

**Risk Levels:**
- 🔴 **Critical** - Immediate action required
- 🟠 **High** - Active mitigation in progress
- 🟡 **Medium** - Monitoring and planning
- 🟢 **Low** - Acceptable, periodic review

---

## Critical Risks

### 🔴 RISK-001: PCI-DSS Compliance Violation

**Risk ID:** RISK-001  
**Severity:** Critical  
**Likelihood:** Low  
**Category:** Compliance / Legal  
**Owner:** Security Team (security@company.com)  
**Status:** ✅ Mitigated  
**Last Reviewed:** October 2025

**Description:**

Accidental logging of credit card numbers (PAN - Primary Account Number) in application logs could violate PCI-DSS requirements. Even a single violation can result in:
- Loss of ability to process credit card payments
- Immediate suspension by card networks (Visa, Mastercard)
- Mandatory forensic investigation

**Potential Impact:**

| Impact Area | Description | Estimated Cost |
|-------------|-------------|----------------|
| Business Continuity | Complete payment processing shutdown | $500K/day revenue loss |
| Fines | Card network penalties | $50K - $500K |
| Forensic Investigation | Mandatory PCI forensic audit | $50K - $200K |
| Legal | Class-action lawsuits from affected customers | $1M+ |
| Reputation | Loss of customer trust, brand damage | Incalculable |

**Root Causes Identified:**

1. **Developer error** - Accidentally logging request payload containing card data
2. **Debugging code** - \`console.log()\` or \`System.out.println()\` left in production
3. **Error handling** - Exceptions including sensitive data in stack traces
4. **Third-party libraries** - Unvetted libraries logging request details

**Current Mitigations:**

✅ **1. Log Sanitization Filter (Layer 1)**
\`\`\`java
// Automatically redacts PAN from all log statements
public class LogSanitizer {
  private static final Pattern PAN_PATTERN = 
    Pattern.compile("\\b[0-9]{13,19}\\b");
  
  public String sanitize(String log) {
    return PAN_PATTERN.matcher(log)
      .replaceAll(match -> "****" + match.group().substring(12));
  }
}
\`\`\`

✅ **2. Code Review Checklist**
- Every PR must be approved by security team member
- Automated check scans for \`log.debug()\`, \`System.out\`, \`console.log\`
- Grep for keywords: "card", "cvv", "pan" in log statements

✅ **3. CI/CD Pipeline Scanning**
- Trufflehog scans for secrets and sensitive data patterns
- Fails build if PAN-like patterns detected in logs

✅ **4. Developer Training**
- Annual PCI-DSS awareness training (required)
- New hire onboarding includes security module
- Quarterly refresher emails with examples

✅ **5. Quarterly PCI Audit**
- Conducted by certified QSA (Qualified Security Assessor)
- Log file review (sample 10% of logs)
- Last audit: September 2025 - **No violations found**

✅ **6. Log Monitoring Alerts**
- Datadog alert triggers if PAN-like pattern detected
- Immediate notification to security team
- Automatic log file quarantine

**Residual Risk:** Low (with all mitigations in place)

**Evidence:**
- Last QSA Report: \`docs/compliance/QSA-Report-2025-Q3.pdf\`
- Log Sanitizer Tests: \`src/test/java/LogSanitizerTest.java\` (100% coverage)
- Training Records: \`hr/training-completion-2025.xlsx\`

---

### 🟠 RISK-002: Single Payment Provider Dependency

**Risk ID:** RISK-002  
**Severity:** High  
**Likelihood:** Medium  
**Category:** Business Continuity / Operational  
**Owner:** Engineering Lead (sarah.chen@company.com)  
**Status:** 🚧 In Progress (60% complete)  
**Target Completion:** Q1 2026

**Description:**

Stripe processes **85% of our transaction volume** (~42,500 transactions/day). A prolonged Stripe outage would severely impact revenue and customer experience.

**Historical Context:**
- March 2024: Stripe outage lasted 4 hours → Lost $600K revenue
- July 2024: Stripe API degradation → 15% error rate for 2 hours

**Potential Impact:**

| Duration | Revenue Loss | Customer Impact | Reputation Damage |
|----------|--------------|-----------------|-------------------|
| 1 hour | $150K | 2,000 failed checkouts | Low |
| 4 hours | $600K | 8,000 failed checkouts | Medium |
| 1 day | $3.6M | 48,000 failed checkouts | High |

**Additional Impacts:**
- Customer support ticket volume spike (300% increase)
- Social media complaints and negative reviews
- Potential loss of customers to competitors
- SLA violations with enterprise clients

**Current Mitigations:**

✅ **1. Automatic Failover to PayPal**
\`\`\`java
@Service
public class PaymentRouter {
  public PaymentResult processPayment(PaymentRequest req) {
    try {
      return stripeService.process(req);
    } catch (StripeUnavailableException e) {
      log.warn("Stripe unavailable, failing over to PayPal");
      return paypalService.process(req);
    }
  }
}
\`\`\`

✅ **2. Health Check Monitoring**
- Stripe API status checked every 30 seconds
- Circuit breaker opens after 3 consecutive failures
- Automatic recovery when Stripe returns

✅ **3. Monthly Failover Drills**
- Simulated Stripe outage in staging
- Last test: October 1, 2025
- Result: Failed over to PayPal in **45 seconds**
- PayPal successfully handled 500 TPS

✅ **4. Customer Communication Plan**
- Automated status page update
- Email notification to customers with pending transactions
- Social media updates (@companysupport)

**In Progress Mitigations:**

🚧 **5. Third Payment Provider Integration (60% complete)**
- Evaluating Adyen as tertiary provider
- Target: Handle 20% of volume
- Reduces Stripe dependency from 85% → 65%
- Timeline:
  - [ ] Provider selection complete - ✅ Done
  - [ ] Contract negotiation - 🚧 In progress
  - [ ] Integration development - 📋 Q4 2025
  - [ ] Load testing - 📋 Q1 2026
  - [ ] Production rollout - 📋 Q1 2026

🚧 **6. Load Distribution Algorithm (40% complete)**
- Intelligent routing based on:
  - Provider availability (real-time health)
  - Transaction cost (optimize fees)
  - Customer location (reduce latency)
- Target distribution: Stripe 60%, PayPal 20%, Adyen 20%

**Planned Mitigations:**

📋 **7. Multi-Cloud Failover**
- Deploy secondary cluster in different cloud (GCP)
- If AWS us-east-1 failure affects all providers
- Timeline: Q2 2026

**Residual Risk:** Medium (will be Low with 3rd provider)

**Next Review:** November 15, 2025

**Evidence:**
- Failover test results: \`docs/failover-test-results-2025-10.pdf\`
- Adyen evaluation: \`docs/provider-evaluation/adyen-assessment.pdf\`

---

### 🟡 RISK-003: Insufficient Rate Limiting

**Risk ID:** RISK-003  
**Severity:** Medium  
**Likelihood:** Medium  
**Category:** Security / Availability  
**Owner:** DevOps Team (devops@company.com)  
**Status:** 📋 Identified  
**Planned Remediation:** Q4 2025

**Description:**

Current rate limits may not adequately prevent sophisticated DDoS attacks or protect against API abuse from compromised credentials.

**Current Rate Limits:**
- Per User: 100 requests/minute
- Per IP: 10,000 requests/minute
- No adaptive/dynamic rate limiting

**Potential Impact:**

**Scenario 1: DDoS Attack**
- Attacker uses botnet (10,000+ IPs)
- Each IP sends 5,000 requests/minute (below per-IP limit)
- Total: 50M requests/minute → Database overwhelm

**Scenario 2: Credential Stuffing**
- Attacker has leaked credentials for 1,000 accounts
- Each account tries 100 payment attempts/minute
- Total: 100K fraudulent attempts/minute

**Cost Impact:**
- Infrastructure scaling costs: $5,000 - $20,000 per incident
- Legitimate users unable to transact
- Database connection pool exhaustion → complete outage

**Current Mitigations:**

✅ **1. Kong API Gateway Rate Limiting**
- Enforced at edge before reaching application
- Redis-backed for distributed counting
- Returns HTTP 429 when exceeded

✅ **2. CloudWatch Alarms**
- Alert when request rate > 2x baseline
- Auto-scaling triggered at 70% CPU
- On-call engineer paged

✅ **3. IP Blocklist**
- Manually maintained blocklist of known bad IPs
- Updated after each incident
- Applied at WAF level

**Proposed Improvements:**

📋 **1. Cloudflare DDoS Protection**
- **Cost:** $500/month
- **Benefits:**
  - Absorb DDoS attacks before reaching infrastructure
  - 1.5 Tbps global network capacity
  - Automatic bot detection and mitigation
  - WAF with OWASP rule sets

📋 **2. Adaptive Rate Limiting**
\`\`\`java
// Rate limit adjusts based on behavior
public class AdaptiveRateLimiter {
  public int getRateLimit(User user) {
    if (user.hasRecentFailures()) return 10;  // Suspicious
    if (user.isVerified()) return 200;        // Trusted
    return 100;                                // Default
  }
}
\`\`\`

📋 **3. IP Reputation Scoring**
- Integrate with threat intelligence feed (AbuseIPDB)
- Automatically throttle requests from low-reputation IPs
- Stricter limits for VPN/proxy/Tor exit nodes

📋 **4. CAPTCHA for Suspicious Traffic**
- Trigger CAPTCHA when:
  - Rapid succession of failed payments
  - Unusual geographic locations
  - Velocity anomalies detected

**Implementation Plan:**

| Milestone | Timeline | Budget | Owner |
|-----------|----------|--------|-------|
| Evaluate Cloudflare vs AWS Shield | Nov 2025 | $0 | DevOps |
| Present proposal to leadership | Nov 15, 2025 | $0 | DevOps |
| POC implementation (Cloudflare) | Dec 2025 | $500 | DevOps |
| Load testing | Jan 2026 | $1,000 | QA |
| Production rollout | Jan 2026 | $14,000/year | DevOps |

**Residual Risk:** Low (after implementation)

**Evidence:**
- Current rate limit config: \`config/kong/rate-limiting.yml\`
- DDoS incident post-mortem: \`docs/incidents/ddos-2024-08-15.pdf\`

---

## Medium Risks

### 🟡 RISK-004: Database Connection Pool Exhaustion

**Severity:** Medium | **Likelihood:** Low | **Owner:** Platform Team

**Description:**  
Under extreme load, database connection pool (max 50 connections/service) could be exhausted, causing cascading failures.

**Mitigation:**
- Read replicas for read-heavy queries
- Connection timeout: 30 seconds (prevents indefinite hold)
- Monitoring alerts when connections > 40

**Residual Risk:** Low

---

### 🟡 RISK-005: Insufficient Disaster Recovery Testing

**Severity:** Medium | **Likelihood:** Medium | **Owner:** Platform Team

**Description:**  
DR procedures exist but last full test was 8 months ago. May not recover within 4-hour RTO.

**Planned Action:**
- Quarterly DR drills scheduled
- Next drill: December 15, 2025
- Full database restore from backup
- Verify all services functional

**Residual Risk:** Medium

---

### 🟡 RISK-006: Third-Party API Dependency

**Severity:** Medium | **Likelihood:** Medium | **Owner:** Engineering

**Description:**  
Auth0, SendGrid, Twilio outages directly impact core functionality.

**Mitigation:**
- Circuit breakers prevent cascade failures
- Graceful degradation for non-critical features (email can be queued)
- Multi-region deployments for critical dependencies

**Residual Risk:** Low

---

## Low Risks

### 🟢 RISK-007: Log Storage Costs

**Severity:** Low  
**Impact:** Minimal financial ($2,000/month, 0.3% of infrastructure budget)

**Mitigation:** Acceptable cost, logs auto-archived to S3 Glacier after 30 days

---

### 🟢 RISK-008: Developer Laptop Compromise

**Severity:** Low  
**Mitigation:** 2FA required, secrets in AWS Secrets Manager (not in code), VPN required

---

## Risk Treatment Timeline

| Risk ID | Status | Target Date | Progress | Owner |
|---------|--------|-------------|----------|-------|
| RISK-001 | ✅ Mitigated | Complete | 100% | Security |
| RISK-002 | 🚧 In Progress | Q1 2026 | 60% | Engineering |
| RISK-003 | 📋 Identified | Q4 2025 | 20% | DevOps |
| RISK-004 | 📋 Monitoring | Q2 2026 | 10% | Platform |
| RISK-005 | 📋 Identified | Q4 2025 | 30% | Platform |

---

## Risk Review Process

**Frequency:** Quarterly  
**Participants:**
- Security Team Lead
- Engineering Manager
- Product Manager
- Finance (for business impact)
- Legal (for compliance risks)

**Next Review:** January 15, 2026

**Review Agenda:**
1. Review existing risk status
2. Identify new risks
3. Re-assess risk scores (likelihood, impact)
4. Approve mitigation plans and budgets
5. Update risk register

---

## Reporting New Risks

If you identify a new risk, report it immediately:

| Risk Type | Contact | Response Time |
|-----------|---------|---------------|
| **Security** | security@company.com | < 2 hours |
| **Operational** | engineering-leads@company.com | < 1 business day |
| **Compliance** | compliance@company.com | < 2 hours |

**Critical risks** (potential service outage or data breach) should be escalated to CTO immediately via Slack: \`@cto-urgent\`

---

## Risk Scoring Methodology

**Likelihood:**
- **Low:** < 10% chance in next 12 months
- **Medium:** 10-50% chance
- **High:** > 50% chance

**Impact:**
- **Low:** < $50K loss, minimal customer impact
- **Medium:** $50K-$500K loss, moderate disruption
- **High:** $500K-$5M loss, significant disruption
- **Critical:** > $5M loss or business-ending event

**Risk Score = Likelihood × Impact**
`,
      evidence: [
        { file: 'risk-assessment-2024-Q4.pdf', lines: 'n/a', author: 'security-team', date: '2 weeks ago', snippet: '[PDF Document: Quarterly Risk Assessment Report Q4 2024]' },
        { file: 'LogSanitizer.java', lines: '23-45', author: 'security-team', date: '1 month ago', snippet: 'public class LogSanitizer {\n  private static final Pattern PAN_PATTERN = Pattern.compile("\\\\b[0-9]{13,19}\\\\b");\n  \n  public String sanitize(String log) {\n    return PAN_PATTERN.matcher(log).replaceAll("****");\n  }\n}' },
        { file: 'docs/incidents/stripe-outage-2024-03.md', lines: '1-45', author: 'incident-team', date: '7 months ago', snippet: '# Stripe Outage Post-Mortem\nDate: 2024-03-12\nDuration: 4 hours\nRevenue Impact: $600K\nRoot Cause: Stripe infrastructure failure in us-east-1' }
      ]
    }
  };

  const currentContent = contentMap[selectedSection] || contentMap['master-overview'];

  const getConfidenceColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-orange-600';
  };

  const getConfidenceIcon = (score) => {
    if (score >= 90) return CheckCircle;
    if (score >= 75) return Info;
    return AlertCircle;
  };

  const renderMarkdown = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let currentList = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    let inTable = false;
    let tableRows = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc ml-6 space-y-2 my-4">
            {currentList.map((item, idx) => (
              <li key={idx} className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const flushCodeBlock = () => {
      if (codeBlockContent.length > 0) {
        elements.push(
          <pre key={`code-${elements.length}`} className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
            <code className="text-sm font-mono">{codeBlockContent.join('\n')}</code>
          </pre>
        );
        codeBlockContent = [];
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        const headers = tableRows[0];
        const rows = tableRows.slice(2);
        elements.push(
          <div key={`table-${elements.length}`} className="overflow-x-auto my-6">
            <table className="min-w-full border border-gray-300 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  {headers.map((header, i) => (
                    <th key={i} className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
    };

    const processBoldAndCode = (text) => {
      return text
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono">$1</code>');
    };

    lines.forEach((line, idx) => {
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          flushCodeBlock();
          inCodeBlock = false;
        } else {
          flushList();
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBlockContent.push(line);
        return;
      }

      if (line.trim().startsWith('|')) {
        if (!inTable) {
          flushList();
          inTable = true;
        }
        const cells = line.split('|').map(c => c.trim()).filter(c => c);
        if (!line.includes('---')) {
          tableRows.push(cells);
        }
        return;
      } else if (inTable) {
        flushTable();
        inTable = false;
      }

      if (line.startsWith('# ')) {
        flushList();
        elements.push(<h1 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-4">{line.replace('# ', '')}</h1>);
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(<h2 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b-2 border-gray-200">{line.replace('## ', '')}</h2>);
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(<h3 key={idx} className="text-xl font-semibold text-gray-800 mt-6 mb-3">{line.replace('### ', '')}</h3>);
      } else if (line.trim().startsWith('> ')) {
        flushList();
        const content = line.replace('> ', '');
        const isWarning = content.includes('**Warning:**');
        const isNote = content.includes('**Note:**');
        const bgColor = isWarning ? 'bg-yellow-50 border-yellow-300' : isNote ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-300';
        elements.push(
          <div key={idx} className={`border-l-4 p-4 my-4 ${bgColor}`}>
            <p className="text-sm text-gray-800" dangerouslySetInnerHTML={{ __html: processBoldAndCode(content) }} />
          </div>
        );
      } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const content = line.trim().substring(2);
        currentList.push(processBoldAndCode(content));
      } else if (line.trim() === '') {
        flushList();
      } else if (line.trim()) {
        flushList();
        elements.push(<p key={idx} className="text-gray-700 leading-relaxed my-4" dangerouslySetInnerHTML={{ __html: processBoldAndCode(line) }} />);
      }
    });

    flushList();
    flushCodeBlock();
    flushTable();
    return elements;
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">T</div>
            <div>
              <div className="font-semibold text-sm">{tsd.name}</div>
              <div className="text-xs text-gray-500">{tsd.version}</div>
            </div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input type="text" placeholder="Search docs..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-4">
            <div className="flex items-center justify-between py-2 px-2 rounded hover:bg-gray-50 cursor-pointer" onClick={() => toggleSection('master')}>
              <div className="flex items-center gap-2">
                {expandedSections.master ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Master TSD</span>
              </div>
            </div>
            {expandedSections.master && (
              <div className="ml-6 mt-1 space-y-1">
                {navigationItems.master.sections.map(section => (
                  <div key={section.id} onClick={() => setSelectedSection(section.id)}
                    className={`flex items-center justify-between py-1.5 px-2 rounded text-sm cursor-pointer ${selectedSection === section.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                    <span>{section.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between py-2 px-2 rounded hover:bg-gray-50 cursor-pointer" onClick={() => toggleSection('annexes')}>
              <div className="flex items-center gap-2">
                {expandedSections.annexes ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">Annexes</span>
              </div>
            </div>
            {expandedSections.annexes && (
              <div className="ml-6 mt-1 space-y-1">
                {navigationItems.annexes.children.map(annex => {
                  const Icon = annex.icon;
                  return (
                    <div key={annex.id} onClick={() => setSelectedSection(annex.id)}
                      className={`flex items-center justify-between py-1.5 px-2 rounded text-sm cursor-pointer ${selectedSection === annex.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-gray-500" />
                        <span>{annex.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
          <div className="flex items-center justify-between">
            <span>Confidence</span>
            <span className={`font-medium ${getConfidenceColor(currentContent.confidence)}`}>{currentContent.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-white">
        {/* Page Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentContent.title}</h1>
            <p className="text-gray-600 mb-3">{currentContent.subtitle}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Updated {currentContent.updated}</span>
              </div>
              <span className="text-gray-300">|</span>
              <span>Version {currentContent.version}</span>
              <span className="text-gray-300">|</span>
              <div className={`flex items-center gap-1.5 font-medium ${getConfidenceColor(currentContent.confidence)}`}>
                {React.createElement(getConfidenceIcon(currentContent.confidence), { className: 'w-4 h-4' })}
                <span>{currentContent.confidence}% Confidence</span>
              </div>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => setShowEvidence(!showEvidence)}
                className={`flex items-center gap-1.5 font-medium ${showEvidence ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Code className="w-4 h-4" />
                <span>{showEvidence ? 'Hide' : 'Show'} Evidence</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content + Evidence */}
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-5xl mx-auto px-8 py-8">
              {renderMarkdown(currentContent.content)}
            </div>
          </div>

          {showEvidence && (
            <div className="w-96 bg-gray-50 border-l border-gray-200 overflow-y-auto flex-shrink-0">
              <div className="sticky top-0 p-4 border-b border-gray-200 bg-white">
                <h3 className="font-semibold text-sm text-gray-900">Evidence Trail</h3>
                <p className="text-xs text-gray-500 mt-1">Source code backing this content</p>
              </div>
              <div className="p-4 space-y-4">
                {currentContent.evidence.map((evidence, idx) => (
                  <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900">{evidence.file}</span>
                      </div>
                      <ExternalLink className="w-3 h-3 text-gray-400 cursor-pointer hover:text-blue-600" />
                    </div>
                    <div className="text-xs text-gray-500 mb-2">Lines {evidence.lines}</div>
                    <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto font-mono">
                      <code>{evidence.snippet}</code>
                    </pre>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{evidence.author}</span>
                      </div>
                      <span>{evidence.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
