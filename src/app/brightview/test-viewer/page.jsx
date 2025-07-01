"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export default function TestCasesViewer() {
  const [activeTab, setActiveTab] = useState("unit");
  const [expandedTest, setExpandedTest] = useState(null);
  const [showScript, setShowScript] = useState(null);

  const tabs = [
    { id: "unit", label: "Unit & Component", count: 7 },
    { id: "backend", label: "Backend Integration", count: 7 },
    { id: "frontend", label: "Frontend UI", count: 7 },
    { id: "e2e", label: "End-to-End", count: 6 },
    { id: "regression", label: "Regression", count: 3 },
    { id: "performance", label: "Performance", count: 4 },
    { id: "security", label: "Security", count: 4 },
    { id: "negative", label: "Edge Cases", count: 4 },
    { id: "accessibility", label: "Accessibility", count: 3 },
    { id: "migration", label: "Data Migration", count: 2 },
    { id: "observability", label: "Observability", count: 3 },
  ];

  const jmeterScripts = {
    "P-API-01": `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Benefits API Load Test" enabled="true">
      <stringProp name="TestPlan.comments">Load test for /benefits endpoint - 100 RPS</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="BASE_URL" elementType="Argument">
            <stringProp name="Argument.name">BASE_URL</stringProp>
            <stringProp name="Argument.value">https://api.brightwave.staging.com</stringProp>
          </elementProp>
        </collectionProp>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Benefits Load Test" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">100</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">100</stringProp>
        <stringProp name="ThreadGroup.ramp_time">60</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">300</stringProp>
        <stringProp name="ThreadGroup.delay">0</stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="GET /benefits" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments">
              <elementProp name="tenantId" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">brightwave</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <stringProp name="Argument.name">tenantId</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain">\${BASE_URL}</stringProp>
          <stringProp name="HTTPSampler.port">443</stringProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.path">/benefits</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Response Code Assertion" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="49586">200</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message"></stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">1</intProp>
          </ResponseAssertion>
          <hashTree/>
        </hashTree>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>`,
    "P-UP-01": `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="File Upload Performance Test" enabled="true">
      <stringProp name="TestPlan.comments">10MB file upload performance test</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Upload Test Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">10</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">5</stringProp>
        <stringProp name="ThreadGroup.ramp_time">30</stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="POST /claims/upload" enabled="true">
          <boolProp name="HTTPSampler.postBodyRaw">false</boolProp>
          <elementProp name="HTTPsampler.Files" elementType="HTTPFileArgs">
            <collectionProp name="HTTPFileArgs.files">
              <elementProp name="" elementType="HTTPFileArg">
                <stringProp name="File.path">/path/to/10mb_test_file.pdf</stringProp>
                <stringProp name="File.paramname">claimDocument</stringProp>
                <stringProp name="File.mimetype">application/pdf</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain">api.brightwave.staging.com</stringProp>
          <stringProp name="HTTPSampler.port">443</stringProp>
          <stringProp name="HTTPSampler.protocol">https</stringProp>
          <stringProp name="HTTPSampler.path">/claims/upload</stringProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
        </HTTPSamplerProxy>
      </hashTree>
    </hashTree>
  </hashTree>
</jmeterTestPlan>`,
  };

  const testSteps = {
    "U-CFG-01": {
      title: "BrightWave Config Loading Test",
      preconditions: [
        "Node.js environment set up",
        "Test database initialized",
        "brightwave.json config file exists in backend/config/tenants/",
      ],
      steps: [
        "Import the tenant registry module",
        "Call tenantRegistry['brightwave'].config()",
        "Assert that config loads without throwing errors",
        "Verify returned object contains required fields: tenantId, displayName, primaryColor, etc.",
        "Validate that tenantId === 'brightwave'",
        "Check that hris.provider === 'keka'",
      ],
      expected:
        "Config object loads successfully with all BrightWave-specific properties",
      tools: ["Jest", "Node.js"],
      passCriteria: "All assertions pass, no exceptions thrown",
      failConditions:
        "Missing config file, malformed JSON, or missing required fields",
    },
    "B-CAT-01": {
      title: "Benefits Catalog Custom Benefits Test",
      preconditions: [
        "API server running",
        "Database seeded with BrightWave catalog migration",
        "Valid JWT token for BrightWave tenant",
      ],
      steps: [
        "Send GET request to /benefits with tenantId=brightwave header",
        "Parse response JSON array",
        "Assert response status code is 200",
        "Verify CRIT_ILL benefit exists with type='HEALTH'",
        "Verify GADGET_INS benefit exists with type='PROPERTY'",
        "Assert DENTAL benefit is NOT present in the list",
        "Validate response time < 500ms",
      ],
      expected: "API returns BrightWave-specific benefits excluding DENTAL",
      tools: ["Postman", "Newman", "Jest"],
      passCriteria:
        "Correct benefits returned, DENTAL excluded, response time acceptable",
      failConditions:
        "DENTAL present, missing custom benefits, or slow response",
    },
    "E2E-ONB-01": {
      title: "Employer Onboarding End-to-End Flow",
      preconditions: [
        "Clean test environment",
        "BrightWave tenant configured",
        "Email service mocked/configured",
        "Test employer credentials ready",
      ],
      steps: [
        "Navigate to employer signup page",
        "Fill employer registration form (company: BrightWave Test Corp)",
        "Submit and verify email verification sent",
        "Click verification link from email",
        "Complete company profile setup",
        "Navigate to plan builder",
        "Add Critical Illness and Gadget Insurance benefits",
        "Configure eligibility rules (L1-L2: Basic, L3: Advanced, etc.)",
        "Set plan pricing and publish",
        "Verify employees can see the published plan",
        "Test plan activation workflow",
      ],
      expected:
        "Complete employer can successfully onboard and publish benefit plans",
      tools: ["Cypress", "Selenium", "Playwright"],
      passCriteria:
        "All workflow steps complete without errors, plan visible to employees",
      failConditions:
        "Any step fails, plan not published, or employees cannot access",
    },
    "P-API-01": {
      title: "Benefits API Load Test - 100 RPS",
      preconditions: [
        "JMeter 5.4+ installed",
        "Staging environment scaled appropriately",
        "Test data seeded",
        "Monitoring dashboards ready",
      ],
      steps: [
        "Configure JMeter test plan for 100 concurrent users",
        "Set ramp-up period to 60 seconds",
        "Configure loop count for 5-minute test duration",
        "Add HTTP request for GET /benefits?tenantId=brightwave",
        "Include authorization headers",
        "Add response time assertions (P95 ≤ 250ms)",
        "Configure result collectors for detailed metrics",
        "Execute load test",
        "Monitor system resources during test",
        "Collect and analyze results",
      ],
      expected: "API maintains P95 response time ≤ 250ms under 100 RPS load",
      tools: ["JMeter", "Grafana", "New Relic"],
      passCriteria: "P95 ≤ 250ms, zero errors, stable resource utilization",
      failConditions: "P95 > 250ms, errors > 1%, resource exhaustion",
    },
    "S-AUTH-01": {
      title: "JWT Authentication Security Test",
      preconditions: [
        "Security testing tools set up",
        "Valid JWT tokens available",
        "Test endpoints identified",
      ],
      steps: [
        "Attempt API access without JWT token",
        "Verify 401 Unauthorized response",
        "Try with malformed JWT token",
        "Test with expired JWT token",
        "Attempt JWT token manipulation/tampering",
        "Test with valid JWT but wrong tenant scope",
        "Verify that modified signature fails validation",
        "Test token replay attacks",
        "Validate proper CORS headers",
      ],
      expected:
        "All unauthorized attempts are properly blocked with appropriate error codes",
      tools: ["OWASP ZAP", "Burp Suite", "Custom scripts"],
      passCriteria: "All invalid requests return 401/403, no data leakage",
      failConditions:
        "Any unauthorized access succeeds or reveals sensitive data",
    },
  };

  // Add test steps for all test cases (abbreviated for brevity - in real implementation, all would be detailed)
  const allTestSteps = {
    ...testSteps,
    "U-CFG-02": {
      title: "Theme Map SCSS Resolution",
      preconditions: ["SCSS compiler available"],
      steps: [
        "Load theme map",
        "Resolve brightwave theme",
        "Verify CSS variables",
      ],
      expected: "Theme loads correctly",
      tools: ["Jest", "SASS"],
      passCriteria: "No compilation errors",
      failConditions: "Missing variables or compilation failure",
    },
    "F-LOGIN-01": {
      title: "Mobile Login Brand Validation",
      preconditions: ["Mobile device/emulator"],
      steps: [
        "Open login page on mobile",
        "Verify logo displays",
        "Check color scheme",
      ],
      expected: "Branding consistent on mobile",
      tools: ["Cypress Mobile"],
      passCriteria: "Logo visible, colors correct",
      failConditions: "Branding inconsistent",
    },
    // ... (would include all test cases in real implementation)
  };

  const testData = {
    unit: [
      {
        id: "U-CFG-01",
        area: "Tenant registry",
        objective: "BrightWave config loads.",
        alignment: "Code",
      },
      {
        id: "U-CFG-02",
        area: "Theme map",
        objective: "SCSS theme resolves.",
        alignment: "Code",
      },
      {
        id: "U-ENUM-01",
        area: "GraphQL enum",
        objective: "New benefit codes present.",
        alignment: "Both",
      },
      {
        id: "U-DB-01",
        area: "Migration",
        objective: "Catalog migration up/down.",
        alignment: "Code",
      },
      {
        id: "U-ELIG-01",
        area: "Eligibility parser",
        objective: "YAML role→plan mapping.",
        alignment: "BRD",
      },
      {
        id: "U-API-01",
        area: "Money util",
        objective: "INR formatting helper.",
        alignment: "Code",
      },
      {
        id: "U-THEME-01",
        area: "SCSS vars",
        objective: "Button colour & radius.",
        alignment: "Code",
      },
    ],
    backend: [
      {
        id: "B-TEN-01",
        endpoint: "/tenants/brightwave",
        objective: "Return tenant meta.",
        alignment: "Code",
      },
      {
        id: "B-CAT-01",
        endpoint: "/benefits",
        objective: "Catalog reflects CRIT_ILL & GADGET_INS; no DENTAL.",
        alignment: "BRD",
      },
      {
        id: "B-ELIG-01",
        endpoint: "/eligibility/evaluate",
        objective: 'L4 → plan "pro".',
        alignment: "BRD",
      },
      {
        id: "B-INV-01",
        endpoint: "/invoices/generate",
        objective: "Invoice with custom benefits.",
        alignment: "BRD",
      },
      {
        id: "B-HRIS-01",
        endpoint: "Keka webhook",
        objective: "Roster delta in < 30 s.",
        alignment: "BRD",
      },
      {
        id: "B-CLAIM-01",
        endpoint: "/claims",
        objective: "Reimbursement claim submit.",
        alignment: "BRD",
      },
      {
        id: "B-PDPA-01",
        endpoint: "/legal/consent",
        objective: "PDPA text retrieval.",
        alignment: "BRD",
      },
    ],
    frontend: [
      {
        id: "F-THEME-01",
        page: "Global shell",
        objective: "Brand colours render.",
        alignment: "Code",
      },
      {
        id: "F-LOGIN-01",
        page: "Login",
        objective: "Logo & palette mobile.",
        alignment: "BRD",
      },
      {
        id: "F-DASH-01",
        page: "Employer dashboard",
        objective: "Tile widgets.",
        alignment: "BRD",
      },
      {
        id: "F-PLAN-01",
        page: "Plan Designer",
        objective: "Drag CI tile → cost update.",
        alignment: "BRD",
      },
      {
        id: "F-WAL-01",
        page: "Wallet",
        objective: "Coverage ring & e-card.",
        alignment: "BRD",
      },
      {
        id: "F-CLAIM-01",
        page: "Claims wizard",
        objective: "Upload guardrails.",
        alignment: "BRD",
      },
      {
        id: "F-A11Y-01",
        page: "Buttons",
        objective: "Keyboard / aria.",
        alignment: "BRD",
      },
    ],
    e2e: [
      {
        id: "E2E-ONB-01",
        flow: "Employer onboarding",
        objective: "Invite → publish plan.",
        alignment: "BRD",
      },
      {
        id: "E2E-EMP-01",
        flow: "Employee day-0",
        objective: "Wallet visible.",
        alignment: "BRD",
      },
      {
        id: "E2E-CLA-CASH",
        flow: "Cashless claim pre-auth",
        objective: "End-to-end cashless flow.",
        alignment: "BRD",
      },
      {
        id: "E2E-CLA-REM",
        flow: "Reimbursement claim loop",
        objective: "Complete reimbursement cycle.",
        alignment: "BRD",
      },
      {
        id: "E2E-INV-01",
        flow: "Invoice cycle & payment",
        objective: "Full billing workflow.",
        alignment: "BRD",
      },
      {
        id: "E2E-THEME-01",
        flow: "Theme fallback safety",
        objective: "Graceful theme degradation.",
        alignment: "Code",
      },
    ],
    regression: [
      {
        id: "R-ENUM-01",
        area: "GraphQL",
        objective: "Legacy tenant with old codes.",
        alignment: "Code",
      },
      {
        id: "R-THEME-01",
        area: "Theme loader",
        objective: "Other theme unaffected.",
        alignment: "Code",
      },
      {
        id: "R-INV-01",
        area: "Invoice totals",
        objective: "Unchanged calculations.",
        alignment: "Code",
      },
    ],
    performance: [
      {
        id: "P-API-01",
        scenario: "100 RPS benefits list",
        metric: "P95 ≤ 250 ms",
        alignment: "BRD",
        hasScript: true,
      },
      {
        id: "P-DB-01",
        scenario: "10k invoice run",
        metric: "≤ 3 min",
        alignment: "BRD",
        hasScript: false,
      },
      {
        id: "P-FE-01",
        scenario: "Wallet FCP mobile",
        metric: "≤ 2 s",
        alignment: "BRD",
        hasScript: false,
      },
      {
        id: "P-UP-01",
        scenario: "10 MB file upload",
        metric: "≥ 1 MB/s",
        alignment: "BRD",
        hasScript: true,
      },
    ],
    security: [
      {
        id: "S-AUTH-01",
        test: "JWT spoof blocked",
        objective: "Authentication security.",
        alignment: "BRD",
      },
      {
        id: "S-TEN-01",
        test: "Tenant isolation",
        objective: "Data segregation.",
        alignment: "Code",
      },
      {
        id: "S-PDPA-01",
        test: "Consent enforcement",
        objective: "Compliance validation.",
        alignment: "BRD",
      },
      {
        id: "S-XSS-01",
        test: "Theme CSS injection",
        objective: "XSS prevention.",
        alignment: "Code",
      },
    ],
    negative: [
      {
        id: "N-FILE-01",
        case: "Oversize claim file",
        objective: "File size validation.",
        alignment: "BRD",
      },
      {
        id: "N-CODE-01",
        case: "Invalid benefit code",
        objective: "Error handling.",
        alignment: "Code",
      },
      {
        id: "N-ROLE-01",
        case: "Unknown career level",
        objective: "Graceful degradation.",
        alignment: "BRD",
      },
      {
        id: "N-INV-01",
        case: "Webhook missing salary",
        objective: "Data validation.",
        alignment: "Code",
      },
    ],
    accessibility: [
      {
        id: "A-COLOR-01",
        element: "Contrast ratio",
        objective: "WCAG compliance.",
        alignment: "BRD",
      },
      {
        id: "A-ARIA-01",
        element: "Wizard step labels",
        objective: "Screen reader support.",
        alignment: "BRD",
      },
      {
        id: "A-TAB-01",
        element: "Modal focus trap",
        objective: "Keyboard navigation.",
        alignment: "BRD",
      },
    ],
    migration: [
      {
        id: "M-UP-01",
        task: "Apply migration",
        objective: "Database schema update.",
        alignment: "Code",
      },
      {
        id: "M-DOWN-01",
        task: "Undo migration",
        objective: "Rollback capability.",
        alignment: "Code",
      },
    ],
    observability: [
      {
        id: "O-LOG-01",
        probe: "Config load errors",
        objective: "Error monitoring.",
        alignment: "Code",
      },
      {
        id: "O-MET-01",
        probe: "TenantId label on latency metric",
        objective: "Performance tracking.",
        alignment: "Code",
      },
      {
        id: "O-ALERT-01",
        probe: "Consent alert fires",
        objective: "Compliance monitoring.",
        alignment: "BRD",
      },
    ],
  };

  const getAlignmentBadge = (alignment) => {
    const styles = {
      BRD: "bg-blue-100 text-blue-800 border-blue-200",
      Code: "bg-gray-100 text-gray-800 border-gray-200",
      Both: "bg-purple-100 text-purple-800 border-purple-200",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[alignment]}`}
      >
        {alignment}
      </span>
    );
  };

  const renderTestSteps = (testId) => {
    const steps = allTestSteps[testId] || testSteps[testId];
    if (!steps) return null;

    return (
      <div className="mt-4 p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg">
        <h4 className="font-semibold text-gray-900 mb-3">{steps.title}</h4>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-gray-800 mb-2">Pre-conditions:</h5>
            <ul className="text-gray-600 space-y-1">
              {(steps.preconditions || []).map((pre, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {pre}
                </li>
              ))}
            </ul>

            <h5 className="font-medium text-gray-800 mb-2 mt-4">
              Tools Required:
            </h5>
            <div className="flex flex-wrap gap-1">
              {(steps.tools || []).map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-medium text-gray-800 mb-2">Expected Result:</h5>
            <p className="text-gray-600 bg-green-50 p-2 rounded text-sm">
              {steps.expected}
            </p>

            <h5 className="font-medium text-gray-800 mb-2 mt-3">
              Pass Criteria:
            </h5>
            <p className="text-gray-600 text-xs">{steps.passCriteria}</p>

            <h5 className="font-medium text-gray-800 mb-2 mt-3">
              Fail Conditions:
            </h5>
            <p className="text-red-600 text-xs">{steps.failConditions}</p>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-medium text-gray-800 mb-2">
            Test Execution Steps:
          </h5>
          <ol className="text-gray-600 space-y-1">
            {(steps.steps || []).map((step, idx) => (
              <li key={idx} className="flex items-start">
                <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                  {idx + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  const renderScript = (testId) => {
    const script = jmeterScripts[testId];
    if (!script) return null;

    return (
      <div className="mt-4 p-4 bg-gray-900 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-white">JMeter Test Script</h4>
          <button
            onClick={() => navigator.clipboard.writeText(script)}
            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
          >
            Copy Script
          </button>
        </div>
        <pre className="text-green-400 text-xs overflow-x-auto max-h-96">
          <code>{script}</code>
        </pre>
      </div>
    );
  };

  const renderTable = (data, type) => {
    const headers = {
      unit: ["ID", "Area", "Objective", "Alignment", "Actions"],
      backend: ["ID", "Endpoint", "Objective", "Alignment", "Actions"],
      frontend: ["ID", "Page", "Objective", "Alignment", "Actions"],
      e2e: ["ID", "Flow", "Objective", "Alignment", "Actions"],
      regression: ["ID", "Area", "Objective", "Alignment", "Actions"],
      performance: ["ID", "Scenario", "Metric", "Alignment", "Actions"],
      security: ["ID", "Test", "Objective", "Alignment", "Actions"],
      negative: ["ID", "Case", "Objective", "Alignment", "Actions"],
      accessibility: ["ID", "Element", "Objective", "Alignment", "Actions"],
      migration: ["ID", "Task", "Objective", "Alignment", "Actions"],
      observability: ["ID", "Probe", "Objective", "Alignment", "Actions"],
    };

    const getSecondColumn = (item, type) => {
      switch (type) {
        case "backend":
          return item.endpoint;
        case "frontend":
          return item.page;
        case "e2e":
          return item.flow;
        case "performance":
          return item.scenario;
        case "security":
          return item.test;
        case "negative":
          return item.case;
        case "accessibility":
          return item.element;
        case "migration":
          return item.task;
        case "observability":
          return item.probe;
        default:
          return item.area;
      }
    };

    const getThirdColumn = (item, type) => {
      return type === "performance" ? item.metric : item.objective;
    };

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers[type].map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-4 font-semibold text-gray-900 text-sm"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={item.id}>
                <tr
                  className={`border-b border-gray-100 hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-25"
                  }`}
                >
                  <td className="py-3 px-4 font-mono text-sm font-medium text-gray-900">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 max-w-xs">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {getSecondColumn(item, type)}
                    </code>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700 max-w-md">
                    {getThirdColumn(item, type)}
                  </td>
                  <td className="py-3 px-4">
                    {getAlignmentBadge(item.alignment)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          setExpandedTest(
                            expandedTest === item.id ? null : item.id
                          )
                        }
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        {expandedTest === item.id ? "Hide" : "View"} Steps
                      </button>
                      {item.hasScript && (
                        <button
                          onClick={() =>
                            setShowScript(
                              showScript === item.id ? null : item.id
                            )
                          }
                          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                        >
                          {showScript === item.id ? "Hide" : "View"} Script
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                {expandedTest === item.id && (
                  <tr>
                    <td colSpan={5} className="p-0">
                      {renderTestSteps(item.id)}
                    </td>
                  </tr>
                )}
                {showScript === item.id && (
                  <tr>
                    <td colSpan={5} className="p-0">
                      {renderScript(item.id)}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const currentData = testData[activeTab] || [];
  const totalTests = Object.values(testData).flat().length;
  const brdTests = Object.values(testData)
    .flat()
    .filter((t) => t.alignment === "BRD").length;
  const codeTests = Object.values(testData)
    .flat()
    .filter((t) => t.alignment === "Code").length;
  const bothTests = Object.values(testData)
    .flat()
    .filter((t) => t.alignment === "Both").length;

  return (
    <div className="mx-auto p-6 bg-white overflow-y-auto h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              BrightWave Test Cases
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive test coverage for tenant onboarding
            </p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {totalTests}
              </div>
              <div className="text-gray-500">Total Tests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{brdTests}</div>
              <div className="text-gray-500">BRD Aligned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {codeTests}
              </div>
              <div className="text-gray-500">Code Aligned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {bothTests}
              </div>
              <div className="text-gray-500">Both</div>
            </div>
            <Link href="/brightview/run-tests">
              <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-2 ml-6 cursor-pointer">
                Run Test Cases
              </div>
            </Link>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            Alignment Legend:
          </h3>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              {getAlignmentBadge("BRD")}
              <span className="text-gray-600">
                Business Requirements Document validation
              </span>
            </div>
            <div className="flex items-center gap-2">
              {getAlignmentBadge("Code")}
              <span className="text-gray-600">
                Implementation & plumbing protection
              </span>
            </div>
            <div className="flex items-center gap-2">
              {getAlignmentBadge("Both")}
              <span className="text-gray-600">
                BRD requirement + implementation concern
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {tabs.find((t) => t.id === activeTab)?.label} Tests
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {currentData.length} test case{currentData.length !== 1 ? "s" : ""}{" "}
            in this category
          </p>
        </div>

        {renderTable(currentData, activeTab)}
      </div>

      {/* Summary Footer */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Test Coverage Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">
              BRD-aligned tests:
            </span>
            <span className="text-blue-700 ml-2">
              Validate every functional & non-functional requirement in the
              BrightWave BRD
            </span>
          </div>
          <div>
            <span className="font-medium text-blue-800">
              Code-aligned tests:
            </span>
            <span className="text-blue-700 ml-2">
              Protect implementation plumbing and ensure tenant isolation
            </span>
          </div>
          <div>
            <span className="font-medium text-blue-800">Coverage mapping:</span>
            <span className="text-blue-700 ml-2">
              Every requirement traces to at least one executable test
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
