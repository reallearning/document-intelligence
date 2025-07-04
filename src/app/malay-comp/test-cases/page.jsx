"use client";
import React, { useState } from "react";
import { Eye, Play, Code, FileText } from "lucide-react";
import Link from "next/link";

const TestCaseDashboard = () => {
  const [activeTab, setActiveTab] = useState("Unit & Component");
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [modalView, setModalView] = useState("steps"); // 'steps' or 'script'

  // Test cases data parsed from the document
  const testCases = {
    Functional: [
      {
        id: "F-01",
        area: "Employee Management",
        objective: "Add salary entry for Sarah Johnson",
        alignment: "BRD",
        steps: [
          "Open Employee Management",
          'Search "Sarah Johnson" & click result',
          "Open Salary History tab",
          "Click Add Salary Entry",
          'Set Amount = 98,000 MYR, Effective Date = 2024-07-01, Reason = "Performance bonus"',
          "Click Save",
          "Verify new row appears in salary table",
          'Return to profile → "Current Salary" shows 98,000 MYR',
        ],
        expected: "New entry stored; profile salary updated.",
      },
      {
        id: "F-02",
        area: "Benefits",
        objective: "Vacation purchase ≤ 5 days (valid)",
        alignment: "BRD",
        steps: [
          "Login as E12345 on 2025-09-02",
          "Navigate Benefits ▶ Vacation Buy",
          "Select 3 days",
          "Click Submit",
          "Observe success toast",
          "Open Credits widget",
        ],
        expected: "Success toast; credits decrease by cost.",
      },
      {
        id: "F-03",
        area: "Benefits",
        objective: "Vacation purchase > 5 days blocked",
        alignment: "BRD",
        steps: [
          "Login E12345 on 2025-09-02",
          "Open Vacation Buy",
          "Select 6 days",
          "Click Submit",
        ],
        expected: 'Error "Max 5 days"; no BenefitCost row.',
      },
      {
        id: "F-04",
        area: "Dependents",
        objective: "Working-couple spouse blocked",
        alignment: "BRD",
        steps: [
          "Login E20001 (non-exempt)",
          "Open Dependents",
          "Click Add Spouse",
          "Set Working at MalayComp = Yes",
          "Save",
        ],
        expected: 'Form error "Spouse working at MalayComp – cannot enrol".',
      },
      {
        id: "F-05",
        area: "Dependents",
        objective: "Working-couple exemption passes",
        alignment: "BRD",
        steps: ["Login ZZ037I778", "Repeat F-04 steps"],
        expected: "Spouse saved without error.",
      },
      {
        id: "F-06",
        area: "Medical Benefits",
        objective: "Medical card shows Pending UW for age 76",
        alignment: "BRD",
        steps: ["Login AGE76", "Open Benefits list", "Click Medical card"],
        expected: 'Badge "Pending Underwriting"; cost 0 MYR.',
      },
      {
        id: "F-07",
        area: "Dental Benefits",
        objective: "Dental hidden (DOJ 2020)",
        alignment: "BRD",
        steps: ["Login E_NEW2020", "Open Benefits list"],
        expected: "No Dental card visible.",
      },
      {
        id: "F-08",
        area: "Life Insurance",
        objective: "Vol GTL capped at 4M",
        alignment: "BRD",
        steps: [
          "Login SAL150K",
          "Open Life Insurance page",
          "Choose Vol plan 26× salary",
          "Save",
        ],
        expected: "Coverage field displays 4,000,000 MYR.",
      },
      {
        id: "F-09",
        area: "Beneficiaries",
        objective: "Beneficiary split validation",
        alignment: "BRD",
        steps: [
          "Login E12345",
          "Open Beneficiaries",
          "Add 70% primary + 20% contingent",
          "Save",
        ],
        expected: 'Error "Total must equal 100%".',
      },
      {
        id: "F-10",
        area: "Medical Disability",
        objective: "Submit Medical Disability request",
        alignment: "BRD",
        steps: [
          "Login E12345",
          "Open Apply for Medical Disability",
          "Confirm pop-up",
        ],
        expected:
          'Toast "Request submitted"; benefits list shows MED DIS – Pending.',
      },
    ],
    API: [
      {
        id: "A-01",
        area: "Vacation API",
        objective: "API – Vacation 6 days validation",
        alignment: "Code",
        steps: ['POST /vacation-buy {"days":6} with token'],
        expected: 'HTTP 400 + JSON "Max 5 days".',
      },
      {
        id: "A-02",
        area: "Vacation API",
        objective: "API – Valid Vacation purchase",
        alignment: "Code",
        steps: ['POST /vacation-buy {"days":3} on 2025-09-02', "GET /credits"],
        expected: "HTTP 200; JSON payroll_deduct ≤ 0.",
      },
      {
        id: "A-03",
        area: "Benefits API",
        objective: "API – Dental Not Eligible",
        alignment: "Code",
        steps: ["Login token DOJ 2020", "GET /benefits/dental"],
        expected: "HTTP 404 Not Eligible.",
      },
      {
        id: "A-04",
        area: "Events API",
        objective: "API – Med Disability event",
        alignment: "Code",
        steps: ["POST /events/medical-disability", "GET /benefits"],
        expected: 'MED_DIS row exists, uw_status="PENDING".',
      },
    ],
    "Unit & Component": [
      {
        id: "U-01",
        area: "Credits calculation",
        objective: "Unit – Credits math",
        alignment: "Code",
        steps: ["Call monthly_pool() for EE + 1 dep"],
        expected: 'Returns Decimal "305.43".',
      },
      {
        id: "U-02",
        area: "Eligibility logic",
        objective: "Unit – Dental cutoff",
        alignment: "Both",
        steps: ['Call eligibility.is_eligible(emp2020,"DEN")'],
        expected: "Returns False.",
      },
      {
        id: "U-03",
        area: "Insurance calculation",
        objective: "Unit – GTL cap logic",
        alignment: "Code",
        steps: ["Call Vol GTL calc with salary 150k, mult 26×"],
        expected: "Cover capped 4M.",
      },
      {
        id: "U-04",
        area: "Cost calculation",
        objective: "Unit – Vacation divisor 12 for FTH",
        alignment: "Code",
        steps: ["Call cost for FTH EE, 2 days"],
        expected: "Uses divisor 12.",
      },
    ],
    "Backend Integration": [
      {
        id: "B-01",
        area: "Salary processing",
        objective: "Batch – Salary-freeze",
        alignment: "Code",
        steps: [
          "Run cron/freeze_salary.sh",
          "SQL: SELECT COUNT(*) WHERE frozen_salary3 IS NULL",
        ],
        expected: "Count = 0.",
      },
      {
        id: "B-02",
        area: "Export system",
        objective: "Batch – Payroll credits CSV",
        alignment: "Code",
        steps: ["Run exporter script", "List /exports/*credits.csv"],
        expected: "File exists & > 0 bytes.",
      },
      {
        id: "B-03",
        area: "Underwriting",
        objective: "Batch – UW sweep",
        alignment: "Code",
        steps: ["Run annual_uw_sweep.py", "Query underwriting_queue"],
        expected: "Rows ≥ 1 for age ≥ 64.",
      },
    ],
    Performance: [
      {
        id: "P-01",
        area: "Vacation API",
        objective: "Perf – Vacation 200 rps",
        alignment: "Code",
        steps: ["bash perf/run_jmeter.sh (200 threads 60s)"],
        expected: "p95 < 300ms; 0% errors.",
        script: {
          type: "jmeter",
          content: `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Vacation API Performance Test">
      <stringProp name="TestPlan.comments">Performance test for vacation purchase API - 200 RPS for 60 seconds</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="BASE_URL" elementType="Argument">
            <stringProp name="Argument.name">BASE_URL</stringProp>
            <stringProp name="Argument.value">\\$\\{__P(api.baseurl,https://api.MalayComp.com)}</stringProp>
          </elementProp>
          <elementProp name="AUTH_TOKEN" elementType="Argument">
            <stringProp name="Argument.name">AUTH_TOKEN</stringProp>
            <stringProp name="Argument.value">\\$\\{__P(auth.token,test_token_here)}</stringProp>
          </elementProp>
        </collectionProp>
      </elementProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Vacation API Load Test">
        <stringProp name="ThreadGroup.on_MalayComp_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <intProp name="LoopController.loops">-1</intProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">200</stringProp>
        <stringProp name="ThreadGroup.ramp_time">10</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">60</stringProp>
        <stringProp name="ThreadGroup.delay">0</stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPMalayComprProxy guiclass="HttpTestMalayCompGui" testclass="HTTPMalayComprProxy" testname="POST Vacation Purchase">
          <elementProp name="HTTPMalayCompr.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPMalayCompr.domain">\\$\\{BASE_URL}</stringProp>
          <stringProp name="HTTPMalayCompr.port"></stringProp>
          <stringProp name="HTTPMalayCompr.protocol">https</stringProp>
          <stringProp name="HTTPMalayCompr.contentEncoding">UTF-8</stringProp>
          <stringProp name="HTTPMalayCompr.path">/vacation-buy</stringProp>
          <stringProp name="HTTPMalayCompr.method">POST</stringProp>
          <boolProp name="HTTPMalayCompr.follow_redirects">true</boolProp>
          <boolProp name="HTTPMalayCompr.auto_redirects">false</boolProp>
          <boolProp name="HTTPMalayCompr.use_keepalive">true</boolProp>
          <boolProp name="HTTPMalayCompr.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPMalayCompr.embedded_url_re"></stringProp>
          <stringProp name="HTTPMalayCompr.connect_timeout"></stringProp>
          <stringProp name="HTTPMalayCompr.response_timeout"></stringProp>
          <stringProp name="HTTPMalayCompr.postBodyRaw">true</stringProp>
          <elementProp name="HTTPMalayCompr.postBodyRaw" elementType="Arguments">
            <collectionProp name="Arguments.arguments">
              <elementProp name="" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">{"days": 3, "employee_id": "E12345"}</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
        </HTTPMalayComprProxy>
        <hashTree>
          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
            <collectionProp name="HeaderManager.headers">
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Content-Type</stringProp>
                <stringProp name="Header.value">application/json</stringProp>
              </elementProp>
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Authorization</stringProp>
                <stringProp name="Header.value">Bearer \\$\\{AUTH_TOKEN}</stringProp>
              </elementProp>
            </collectionProp>
          </HeaderManager>
          <hashTree/>
          
          <!-- Response Assertions -->
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
          
          <!-- Duration Assertion (under 300ms) -->
          <DurationAssertion guiclass="DurationAssertionGui" testclass="DurationAssertion" testname="Duration Assertion" enabled="true">
            <stringProp name="DurationAssertion.duration">300</stringProp>
          </DurationAssertion>
          <hashTree/>
        </hashTree>
      </hashTree>
      
      <!-- Results Collectors -->
      <ResultCollector guiclass="StatVisualizer" testclass="ResultCollector" testname="Aggregate Report" enabled="true">
        <boolProp name="ResultCollector.error_logging">false</boolProp>
        <objProp>
          <name>saveConfig</name>
          <value class="MalayCompSaveConfiguration">
            <time>true</time>
            <latency>true</latency>
            <timestamp>true</timestamp>
            <success>true</success>
            <label>true</label>
            <code>true</code>
            <message>true</message>
            <threadName>true</threadName>
            <dataType>true</dataType>
            <encoding>false</encoding>
            <assertions>true</assertions>
            <subresults>true</subresults>
            <responseData>false</responseData>
            <MalayComprData>false</MalayComprData>
            <xml>false</xml>
            <fieldNames>true</fieldNames>
            <responseHeaders>false</responseHeaders>
            <requestHeaders>false</requestHeaders>
            <responseDataOnError>false</responseDataOnError>
            <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
            <assertionsResultsToSave>0</assertionsResultsToSave>
            <bytes>true</bytes>
            <sentBytes>true</sentBytes>
            <url>true</url>
            <threadCounts>true</threadCounts>
            <idleTime>true</idleTime>
            <connectTime>true</connectTime>
          </value>
        </objProp>
        <stringProp name="filename">vacation_api_results.jtl</stringProp>
      </ResultCollector>
      <hashTree/>
    </hashTree>
  </hashTree>
</jmeterTestPlan>

# Execution Script (run_jmeter.sh):
#!/bin/bash
# Performance Test Execution Script

JMETER_HOME="/opt/jmeter"
TEST_PLAN="vacation_api_performance.jmx"
RESULTS_FILE="vacation_results_\$(date +%Y%m%d_%H%M%S).jtl"

echo "Starting performance test: 200 RPS for 60 seconds"

\$JMETER_HOME/bin/jmeter -n -t \$TEST_PLAN \\
  -l \$RESULTS_FILE \\
  -Japi.baseurl=https://api.MalayComp.com \\
  -Jauth.token=\$AUTH_TOKEN

# Analyze results for p95
echo "Analyzing results..."
awk -F',' 'NR>1 {sum+=\$2; count++; if(\$2>max) max=\$2} END {print "Avg:", sum/count "ms"; print "Max:", max "ms"}' \$RESULTS_FILE

# Calculate p95
echo "Calculating p95..."
tail -n +2 \$RESULTS_FILE | cut -d',' -f2 | sort -n | awk '{a[NR]=\$1} END {print "p95:", a[int(NR*0.95)] "ms"}'

# Check error rate
ERROR_COUNT=\$(awk -F',' 'NR>1 && \$8=="false" {count++} END {print count+0}' \$RESULTS_FILE)
TOTAL_COUNT=\$(awk -F',' 'NR>1 {count++} END {print count}' \$RESULTS_FILE)
ERROR_RATE=\$(echo "scale=2; \$ERROR_COUNT * 100 / \$TOTAL_COUNT" | bc)

echo "Error rate: \$ERROR_RATE%"
echo "Expected: p95 < 300ms, Error rate = 0%"`,
        },
      },
      {
        id: "P-02",
        area: "Credits system",
        objective: "Perf – Credits bulk 20k",
        alignment: "Code",
        steps: ["pytest tests/perf/test_bulk.py (timeit)"],
        expected: "< 2s runtime.",
        script: {
          type: "python",
          content: `#!/usr/bin/env python3
"""
Performance Test - Credits Bulk Processing
Expected: Process 20,000 credit operations in under 2 seconds
"""

import pytest
import time
import threading
from concurrent.futures import ThreadPoolExecutor, as_completed
from decimal import Decimal
from unittest.mock import Mock

from benefits.credits import CreditProcessor
from employees.models import Employee

class TestCreditsBulkPerformance:
    
    @pytest.fixture
    def credit_processor(self):
        """Setup credit processor with optimized settings"""
        processor = CreditProcessor(
            batch_size=1000,
            max_workers=10,
            use_bulk_operations=True
        )
        return processor
    
    @pytest.fixture
    def test_employees(self):
        """Generate 20k test employees"""
        employees = []
        for i in range(20000):
            emp = Employee(
                employee_id=f"E{str(i).zfill(6)}",
                base_salary=Decimal("50000"),
                employment_type="FULL_TIME",
                benefit_eligible=True
            )
            employees.append(emp)
        return employees
    
    def test_bulk_credit_processing_performance(self, credit_processor, test_employees):
        """Test bulk processing of 20k credit operations"""
        
        print(f"\\nStarting bulk performance test with {len(test_employees)} employees")
        
        # Prepare credit operations
        operations = []
        for emp in test_employees:
            operations.append({
                'employee_id': emp.employee_id,
                'operation': 'monthly_allocation',
                'amount': Decimal("305.43"),
                'reason': 'Monthly benefits allocation'
            })
        
        # Time the bulk operation
        start_time = time.perf_counter()
        
        # Execute bulk processing
        results = credit_processor.process_bulk(operations)
        
        end_time = time.perf_counter()
        execution_time = end_time - start_time
        
        # Performance metrics
        ops_per_second = len(operations) / execution_time
        
        print(f"Execution time: {execution_time:.3f} seconds")
        print(f"Operations processed: {len(results)}")
        print(f"Operations per second: {ops_per_second:.0f}")
        print(f"Success rate: {(results.success_count / len(operations)) * 100:.1f}%")
        
        # Assertions
        assert execution_time < 2.0, f"Performance requirement failed: {execution_time:.3f}s > 2.0s"
        assert results.success_count == len(operations), "Not all operations succeeded"
        assert ops_per_second >= 10000, f"Throughput too low: {ops_per_second:.0f} ops/s"
        
        print("✓ Performance test PASSED")
    
    def test_concurrent_credit_updates(self, credit_processor):
        """Test concurrent credit updates performance"""
        
        num_concurrent_ops = 5000
        max_workers = 20
        
        def credit_operation(employee_id):
            """Single credit operation"""
            return credit_processor.update_balance(
                employee_id=f"E{employee_id:06d}",
                amount=Decimal("100.00"),
                operation_type="debit"
            )
        
        print(f"\\nTesting {num_concurrent_ops} concurrent operations with {max_workers} workers")
        
        start_time = time.perf_counter()
        
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = [
                executor.submit(credit_operation, i) 
                for i in range(num_concurrent_ops)
            ]
            
            results = []
            for future in as_completed(futures):
                try:
                    result = future.result(timeout=5)
                    results.append(result)
                except Exception as e:
                    print(f"Operation failed: {e}")
        
        end_time = time.perf_counter()
        execution_time = end_time - start_time
        
        print(f"Concurrent execution time: {execution_time:.3f} seconds")
        print(f"Successful operations: {len(results)}")
        
        # Should handle concurrent operations efficiently
        assert execution_time < 1.0, f"Concurrent processing too slow: {execution_time:.3f}s"
        assert len(results) >= num_concurrent_ops * 0.95, "Too many failed operations"

if __name__ == "__main__":
    # Direct execution for performance testing
    import sys
    
    processor = CreditProcessor()
    test_instance = TestCreditsBulkPerformance()
    
    # Mock employees for direct test
    employees = test_instance.test_employees()
    
    try:
        test_instance.test_bulk_credit_processing_performance(processor, employees)
        print("\\n🎉 All performance tests PASSED")
        sys.exit(0)
    except AssertionError as e:
        print(f"\\n❌ Performance test FAILED: {e}")
        sys.exit(1)`,
        },
      },
    ],
    Reporting: [
      {
        id: "R-01",
        area: "Credits reporting",
        objective: "Report – Credits utilisation",
        alignment: "Code",
        steps: ["psql -f reports/credits_utilisation.sql"],
        expected: "Cash-out & deduct sums equal live Credits table.",
      },
    ],
    Security: [
      {
        id: "S-01",
        area: "Authentication",
        objective: "Security – Un-auth vacation request",
        alignment: "Code",
        steps: ["curl POST /vacation-buy (no token)"],
        expected: "HTTP 401 Unauthorized.",
      },
    ],
  };

  const tabs = [
    { name: "Unit & Component", count: 4 },
    { name: "Backend Integration", count: 3 },
    { name: "API", count: 4 },
    { name: "Functional", count: 10 },
    { name: "Performance", count: 2 },
    { name: "Security", count: 1 },
    { name: "Reporting", count: 1 },
  ];

  const getTotalStats = () => {
    const allTests = Object.values(testCases).flat();
    const total = allTests.length;
    const brdAligned = allTests.filter(
      (test) => test.alignment === "BRD"
    ).length;
    const codeAligned = allTests.filter(
      (test) => test.alignment === "Code"
    ).length;
    const both = allTests.filter((test) => test.alignment === "Both").length;
    return { total, brdAligned, codeAligned, both };
  };

  const stats = getTotalStats();
  const currentTests = testCases[activeTab] || [];

  const getAlignmentColor = (alignment) => {
    switch (alignment) {
      case "BRD":
        return "bg-blue-100 text-blue-800";
      case "Code":
        return "bg-gray-100 text-gray-800";
      case "Both":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const showTestSteps = (testCase) => {
    setSelectedTestCase(testCase);
    setModalView("steps");
  };

  const showTestScript = (testCase) => {
    setSelectedTestCase(testCase);
    setModalView("script");
  };

  const closeModal = () => {
    setSelectedTestCase(null);
    setModalView("steps");
  };

  const getScriptLanguage = (scriptType) => {
    const languageMap = {
      bash: "Shell Script",
      python: "Python",
      sql: "SQL",
      jmeter: "JMeter XML",
    };
    return languageMap[scriptType] || scriptType;
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50 p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              MalayComp Test Cases
            </h1>
            <p className="text-gray-600">
              Comprehensive test coverage for tenant onboarding
            </p>
          </div>
          <Link href={"/malay-comp/tests-execution"}>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Play size={16} />
              Run Test Cases
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Tests</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {stats.brdAligned}
            </div>
            <div className="text-sm text-gray-600">BRD Aligned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-600">
              {stats.codeAligned}
            </div>
            <div className="text-sm text-gray-600">Code Aligned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {stats.both}
            </div>
            <div className="text-sm text-gray-600">Both</div>
          </div>
        </div>

        {/* Alignment Legend */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Alignment Legend:
          </h3>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                BRD
              </span>
              <span className="text-gray-600">
                Business Requirements Document validation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                Code
              </span>
              <span className="text-gray-600">
                Implementation & plumbing protection
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                Both
              </span>
              <span className="text-gray-600">
                BRD requirement + implementation concern
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`pb-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.name
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}{" "}
                <span className="ml-1 text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Test Cases Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTab} Tests
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {currentTests.length} test cases in this category
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Objective
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTests.map((testCase) => (
                <tr key={testCase.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {testCase.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {testCase.area}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {testCase.objective}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getAlignmentColor(
                        testCase.alignment
                      )}`}
                    >
                      {testCase.alignment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button
                        onClick={() => showTestSteps(testCase)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-1"
                      >
                        <Eye size={12} />
                        View Steps
                      </button>
                      {testCase.script && (
                        <button
                          onClick={() => showTestScript(testCase)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-medium flex items-center gap-1"
                        >
                          <Code size={12} />
                          View Script
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Test Steps and Scripts */}
      {selectedTestCase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedTestCase.id}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedTestCase.objective}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Tab switcher if script is available */}
              {selectedTestCase.script && (
                <div className="flex gap-4 mt-4 border-b border-gray-200">
                  <button
                    onClick={() => setModalView("steps")}
                    className={`pb-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      modalView === "steps"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <FileText size={16} />
                    Test Steps
                  </button>
                  <button
                    onClick={() => setModalView("script")}
                    className={`pb-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                      modalView === "script"
                        ? "border-green-500 text-green-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Code size={16} />
                    Script (
                    {selectedTestCase.script &&
                      getScriptLanguage(selectedTestCase.script.type)}
                    )
                  </button>
                </div>
              )}
            </div>

            <div className="p-6">
              {modalView === "steps" ? (
                <>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Test Steps:
                    </h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedTestCase.steps.map((step, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Expected Output:
                    </h4>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedTestCase.expected}
                    </p>
                  </div>
                </>
              ) : modalView === "script" && selectedTestCase.script ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">
                      {getScriptLanguage(selectedTestCase.script.type)} Script
                    </h4>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        selectedTestCase.script.type === "bash"
                          ? "bg-green-100 text-green-800"
                          : selectedTestCase.script.type === "python"
                          ? "bg-blue-100 text-blue-800"
                          : selectedTestCase.script.type === "sql"
                          ? "bg-purple-100 text-purple-800"
                          : selectedTestCase.script.type === "jmeter"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {selectedTestCase.script.type.toUpperCase()}
                    </span>
                  </div>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {selectedTestCase.script.content}
                    </pre>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Expected Result:</strong>{" "}
                      {selectedTestCase.expected}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCaseDashboard;
