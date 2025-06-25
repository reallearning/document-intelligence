"use client";
import React, { useState } from "react";
import {
  CheckCircle,
  Clock,
  FileText,
  Play,
  Download,
  Eye,
  ChevronRight,
  BarChart3,
  Code,
  Globe,
  Zap,
  Target,
  Shield,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

const TestCasesResults = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTest, setExpandedTest] = useState(null);
  const [showScript, setShowScript] = useState({});

  const testSummary = {
    functionalTests: 24,
    performanceTests: 8,
    unitTests: 45,
    totalCoverage: 87,
    estimatedRunTime: "12m 34s",
    riskScore: "Medium",
  };

  const functionalTests = [
    {
      id: "FT001",
      title: "Employee Salary History - Add New Entry",
      priority: "High",
      type: "Selenium WebDriver",
      source: "brd",
      status: "new",
      category: "business-workflow",
      description:
        "Verify that users can successfully add new salary history entries for employees",
      steps: [
        "Navigate to Employee Management page",
        'Search and select employee "Sarah Johnson"',
        'Click on "Salary History" tab',
        'Click "Add Salary Entry" button',
        'Fill in new salary: $98,000, effective date: 2024-07-01, reason: "Performance bonus"',
        'Click "Save" button',
        "Verify new entry appears in salary history table",
        "Verify current salary is updated in employee profile",
      ],
      expectedResult:
        "New salary entry is saved and visible in history with correct values",
      testData:
        "Employee ID: EMP001, Previous Salary: $95,000, New Salary: $98,000",
      automation: "selenium",
      script: `// Selenium WebDriver Script - Java
package com.hr.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

public class EmployeeSalaryHistoryTest extends BaseTest {
    
    @Test
    public void testAddNewSalaryEntry() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        
        // Step 1: Navigate to Employee Management page
        driver.get(baseUrl + "/employees");
        
        // Step 2: Search and select employee "Sarah Johnson"
        WebElement searchBox = wait.until(ExpectedConditions.elementToBeClickable(
            By.id("employee-search")));
        searchBox.clear();
        searchBox.sendKeys("Sarah Johnson");
        
        WebElement searchResult = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//div[@data-testid='employee-card'][contains(.,'Sarah Johnson')]")));
        searchResult.click();
        
        // Step 3: Click on "Salary History" tab
        WebElement salaryHistoryTab = wait.until(ExpectedConditions.elementToBeClickable(
            By.xpath("//button[contains(text(),'Salary History')]")));
        salaryHistoryTab.click();
        
        // Step 4: Click "Add Salary Entry" button
        WebElement addSalaryButton = wait.until(ExpectedConditions.elementToBeClickable(
            By.id("add-salary-entry-btn")));
        addSalaryButton.click();
        
        // Step 5: Fill in new salary details
        WebElement salaryInput = wait.until(ExpectedConditions.elementToBeClickable(
            By.id("salary-amount")));
        salaryInput.clear();
        salaryInput.sendKeys("98000");
        
        WebElement effectiveDateInput = driver.findElement(By.id("effective-date"));
        effectiveDateInput.clear();
        effectiveDateInput.sendKeys("2024-07-01");
        
        WebElement reasonInput = driver.findElement(By.id("salary-reason"));
        reasonInput.clear();
        reasonInput.sendKeys("Performance bonus");
        
        // Step 6: Click "Save" button
        WebElement saveButton = driver.findElement(By.id("save-salary-btn"));
        saveButton.click();
        
        // Step 7: Verify new entry appears in salary history table
        WebElement salaryHistoryTable = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.id("salary-history-table")));
        WebElement newEntry = salaryHistoryTable.findElement(
            By.xpath(".//tr[contains(.,'$98,000') and contains(.,'2024-07-01')]"));
        Assert.assertTrue(newEntry.isDisplayed(), "New salary entry should be visible in table");
        
        // Step 8: Verify current salary is updated in employee profile
        WebElement profileTab = driver.findElement(By.xpath("//button[contains(text(),'Profile')]"));
        profileTab.click();
        
        WebElement currentSalary = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//span[@data-testid='current-salary']")));
        Assert.assertEquals(currentSalary.getText(), "$98,000", 
            "Current salary should be updated to new amount");
    }
}`,
    },
    {
      id: "FT002",
      title: "Payroll Dashboard - Calculate Total Payroll",
      priority: "High",
      type: "End-to-End",
      source: "brd",
      status: "new",
      category: "business-logic",
      description:
        "Verify payroll dashboard correctly calculates and displays total payroll amounts",
      steps: [
        "Navigate to Payroll Dashboard",
        'Verify "Total Employees" count displays 3',
        'Verify "Total Gross Pay" shows $21,783.34',
        'Verify "Total Net Pay" shows $16,337.50',
        'Verify "Total Taxes" shows $5,445.84',
        "Check individual employee payroll calculations",
        "Verify Sarah Johnson: Gross $9,416.67, Net $7,062.50",
        "Verify payroll status indicators are correct",
      ],
      expectedResult:
        "All payroll calculations are accurate and match expected values",
      testData: "December 2024 payroll data",
      automation: "selenium",
      script: `// Selenium WebDriver Script - Java
package com.hr.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

public class PayrollDashboardTest extends BaseTest {
    
    @Test
    public void testPayrollCalculations() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        
        // Step 1: Navigate to Payroll Dashboard
        driver.get(baseUrl + "/payroll");
        
        // Wait for dashboard to load
        wait.until(ExpectedConditions.presenceOfElementLocated(
            By.id("payroll-dashboard")));
        
        // Step 2: Verify "Total Employees" count displays 3
        WebElement totalEmployees = driver.findElement(
            By.xpath("//div[@data-testid='total-employees']//span[@class='metric-value']"));
        Assert.assertEquals(totalEmployees.getText(), "3", 
            "Total employees should be 3");
        
        // Step 3: Verify "Total Gross Pay" shows $21,783.34
        WebElement totalGrossPay = driver.findElement(
            By.xpath("//div[@data-testid='total-gross-pay']//span[@class='metric-value']"));
        Assert.assertEquals(totalGrossPay.getText(), "$21,783.34", 
            "Total gross pay calculation incorrect");
        
        // Step 4: Verify "Total Net Pay" shows $16,337.50
        WebElement totalNetPay = driver.findElement(
            By.xpath("//div[@data-testid='total-net-pay']//span[@class='metric-value']"));
        Assert.assertEquals(totalNetPay.getText(), "$16,337.50", 
            "Total net pay calculation incorrect");
        
        // Step 5: Verify "Total Taxes" shows $5,445.84
        WebElement totalTaxes = driver.findElement(
            By.xpath("//div[@data-testid='total-taxes']//span[@class='metric-value']"));
        Assert.assertEquals(totalTaxes.getText(), "$5,445.84", 
            "Total taxes calculation incorrect");
        
        // Step 6-7: Check individual employee payroll calculations
        WebElement employeeTable = driver.findElement(By.id("employee-payroll-table"));
        
        // Verify Sarah Johnson's calculations
        WebElement sarahRow = employeeTable.findElement(
            By.xpath(".//tr[contains(.,'Sarah Johnson')]"));
        
        WebElement sarahGross = sarahRow.findElement(
            By.xpath(".//td[@data-column='gross-pay']"));
        Assert.assertEquals(sarahGross.getText(), "$9,416.67", 
            "Sarah Johnson gross pay calculation incorrect");
        
        WebElement sarahNet = sarahRow.findElement(
            By.xpath(".//td[@data-column='net-pay']"));
        Assert.assertEquals(sarahNet.getText(), "$7,062.50", 
            "Sarah Johnson net pay calculation incorrect");
        
        // Step 8: Verify payroll status indicators are correct
        WebElement statusIndicator = driver.findElement(
            By.xpath("//div[@data-testid='payroll-status']"));
        Assert.assertTrue(statusIndicator.getAttribute("class").contains("status-ready"), 
            "Payroll status should indicate ready for processing");
    }
}`,
    },
    {
      id: "FT003",
      title: "Employee Form - Salary Field Validation",
      priority: "Medium",
      type: "UI Validation",
      source: "brd",
      status: "new",
      category: "validation",
      description: "Verify salary input validation in employee form",
      steps: [
        "Navigate to Employee Form",
        "Attempt to enter negative salary value",
        "Verify error message appears",
        "Attempt to enter non-numeric characters",
        "Verify validation prevents submission",
        "Enter valid salary amount",
        "Verify form accepts valid input",
      ],
      expectedResult:
        "Form validates salary input correctly and shows appropriate error messages",
      testData: "Invalid: -1000, abc123; Valid: 75000",
      automation: "selenium",
      script: `// Selenium WebDriver Script - Java
package com.hr.tests;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.testng.Assert;
import org.testng.annotations.Test;

public class EmployeeFormValidationTest extends BaseTest {
    
    @Test
    public void testSalaryFieldValidation() {
        WebDriverWait wait = new WebDriverWait(driver, 10);
        
        // Step 1: Navigate to Employee Form
        driver.get(baseUrl + "/employees/new");
        
        WebElement salaryInput = wait.until(ExpectedConditions.elementToBeClickable(
            By.id("salary-input")));
        
        // Step 2: Attempt to enter negative salary value
        salaryInput.clear();
        salaryInput.sendKeys("-1000");
        
        // Trigger validation by clicking outside or tab
        WebElement nameInput = driver.findElement(By.id("employee-name"));
        nameInput.click();
        
        // Step 3: Verify error message appears
        WebElement errorMessage = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//div[@data-testid='salary-error']")));
        Assert.assertTrue(errorMessage.isDisplayed(), 
            "Error message should appear for negative salary");
        Assert.assertTrue(errorMessage.getText().contains("must be positive"), 
            "Error message should indicate salary must be positive");
        
        // Step 4: Attempt to enter non-numeric characters
        salaryInput.clear();
        salaryInput.sendKeys("abc123");
        nameInput.click(); // Trigger validation
        
        // Step 5: Verify validation prevents submission
        WebElement submitButton = driver.findElement(By.id("submit-employee-btn"));
        Assert.assertFalse(submitButton.isEnabled(), 
            "Submit button should be disabled with invalid salary");
        
        // Verify error message for non-numeric input
        WebElement alphaErrorMessage = wait.until(ExpectedConditions.presenceOfElementLocated(
            By.xpath("//div[@data-testid='salary-error']")));
        Assert.assertTrue(alphaErrorMessage.getText().contains("numeric"), 
            "Error message should indicate salary must be numeric");
        
        // Step 6: Enter valid salary amount
        salaryInput.clear();
        salaryInput.sendKeys("75000");
        nameInput.sendKeys("Test Employee"); // Fill required field
        nameInput.click(); // Trigger validation
        
        // Step 7: Verify form accepts valid input
        wait.until(ExpectedConditions.invisibilityOfElementLocated(
            By.xpath("//div[@data-testid='salary-error']")));
        
        Assert.assertTrue(submitButton.isEnabled(), 
            "Submit button should be enabled with valid salary");
        
        // Verify no error styling on input
        Assert.assertFalse(salaryInput.getAttribute("class").contains("error"), 
            "Salary input should not have error styling with valid value");
    }
}`,
    },
    {
      id: "FT004",
      title: "Database Migration - Salary History Table",
      priority: "High",
      type: "Database Integration",
      source: "code",
      status: "new",
      category: "integration",
      description: "Verify salary history table migration and data integrity",
      steps: [
        "Run database migration script",
        "Verify salary_history table is created",
        "Check table schema matches requirements",
        "Insert test salary history records",
        "Verify foreign key constraints work",
        "Test indexes are created correctly",
      ],
      expectedResult:
        "Salary history table is properly created with correct structure",
      testData: "Migration SQL and test data inserts",
      automation: "database",
      script: `// Database Integration Test - Java with JDBC
package com.hr.tests;

import java.sql.*;
import org.testng.Assert;
import org.testng.annotations.Test;

public class SalaryHistoryMigrationTest extends BaseDBTest {
    
    @Test
    public void testSalaryHistoryTableMigration() throws SQLException {
        Connection connection = getDBConnection();
        
        // Step 1: Run database migration script
        executeMigrationScript("V1.1__Create_Salary_History_Table.sql");
        
        // Step 2: Verify salary_history table is created
        DatabaseMetaData metaData = connection.getMetaData();
        ResultSet tables = metaData.getTables(null, null, "salary_history", null);
        Assert.assertTrue(tables.next(), "salary_history table should exist");
        
        // Step 3: Check table schema matches requirements
        ResultSet columns = metaData.getColumns(null, null, "salary_history", null);
        
        boolean hasIdColumn = false;
        boolean hasEmployeeIdColumn = false;
        boolean hasSalaryAmountColumn = false;
        boolean hasEffectiveDateColumn = false;
        boolean hasReasonColumn = false;
        boolean hasCreatedAtColumn = false;
        
        while (columns.next()) {
            String columnName = columns.getString("COLUMN_NAME");
            switch (columnName) {
                case "id":
                    hasIdColumn = true;
                    Assert.assertEquals(columns.getString("TYPE_NAME"), "BIGINT");
                    break;
                case "employee_id":
                    hasEmployeeIdColumn = true;
                    Assert.assertEquals(columns.getString("TYPE_NAME"), "BIGINT");
                    break;
                case "salary_amount":
                    hasSalaryAmountColumn = true;
                    Assert.assertEquals(columns.getString("TYPE_NAME"), "DECIMAL");
                    break;
                case "effective_date":
                    hasEffectiveDateColumn = true;
                    Assert.assertEquals(columns.getString("TYPE_NAME"), "DATE");
                    break;
                case "reason":
                    hasReasonColumn = true;
                    Assert.assertEquals(columns.getString("TYPE_NAME"), "VARCHAR");
                    break;
                case "created_at":
                    hasCreatedAtColumn = true;
                    Assert.assertEquals(columns.getString("TYPE_NAME"), "TIMESTAMP");
                    break;
            }
        }
        
        Assert.assertTrue(hasIdColumn, "Table should have id column");
        Assert.assertTrue(hasEmployeeIdColumn, "Table should have employee_id column");
        Assert.assertTrue(hasSalaryAmountColumn, "Table should have salary_amount column");
        Assert.assertTrue(hasEffectiveDateColumn, "Table should have effective_date column");
        Assert.assertTrue(hasReasonColumn, "Table should have reason column");
        Assert.assertTrue(hasCreatedAtColumn, "Table should have created_at column");
        
        // Step 4: Insert test salary history records
        String insertSQL = "INSERT INTO salary_history (employee_id, salary_amount, effective_date, reason) VALUES (?, ?, ?, ?)";
        PreparedStatement stmt = connection.prepareStatement(insertSQL);
        stmt.setLong(1, 1);
        stmt.setBigDecimal(2, new BigDecimal("75000.00"));
        stmt.setDate(3, Date.valueOf("2024-01-01"));
        stmt.setString(4, "Initial salary");
        
        int rowsInserted = stmt.executeUpdate();
        Assert.assertEquals(rowsInserted, 1, "Should insert one salary history record");
        
        // Step 5: Verify foreign key constraints work
        // Try to insert with invalid employee_id (should fail)
        PreparedStatement invalidStmt = connection.prepareStatement(insertSQL);
        invalidStmt.setLong(1, 999999); // Non-existent employee
        invalidStmt.setBigDecimal(2, new BigDecimal("50000.00"));
        invalidStmt.setDate(3, Date.valueOf("2024-01-01"));
        invalidStmt.setString(4, "Test");
        
        try {
            invalidStmt.executeUpdate();
            Assert.fail("Should throw foreign key constraint violation");
        } catch (SQLException e) {
            Assert.assertTrue(e.getMessage().contains("foreign key"), 
                "Should be foreign key constraint error");
        }
        
        // Step 6: Test indexes are created correctly
        ResultSet indexes = metaData.getIndexInfo(null, null, "salary_history", false, false);
        boolean hasEmployeeIdIndex = false;
        boolean hasEffectiveDateIndex = false;
        
        while (indexes.next()) {
            String indexName = indexes.getString("INDEX_NAME");
            if (indexName.contains("employee_id")) {
                hasEmployeeIdIndex = true;
            }
            if (indexName.contains("effective_date")) {
                hasEffectiveDateIndex = true;
            }
        }
        
        Assert.assertTrue(hasEmployeeIdIndex, "Should have index on employee_id");
        Assert.assertTrue(hasEffectiveDateIndex, "Should have index on effective_date");
        
        connection.close();
    }
}`,
    },
  ];

  const performanceTests = [
    {
      id: "PT001",
      title: "Payroll Dashboard Load Performance",
      type: "Load Testing",
      tool: "JMeter",
      source: "brd",
      status: "new",
      category: "load-testing",
      scenario: "Concurrent users accessing payroll dashboard",
      users: 50,
      duration: "5 minutes",
      expectedResponse: "< 2 seconds",
      thresholds: {
        responseTime: "2000ms",
        throughput: "25 requests/sec",
        errorRate: "< 1%",
      },
      script: `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Payroll Dashboard Load Test" enabled="true">
      <stringProp name="TestPlan.comments">Load test for payroll dashboard with 50 concurrent users</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.arguments" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Payroll Users" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControllerGui" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <intProp name="LoopController.loops">-1</intProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">50</stringProp>
        <stringProp name="ThreadGroup.ramp_time">60</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">300</stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
      </ThreadGroup>
      <hashTree>
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Login Request" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments">
              <elementProp name="username" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">testuser\${__threadNum}</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                <stringProp name="Argument.name">username</stringProp>
              </elementProp>
              <elementProp name="password" elementType="HTTPArgument">
                <boolProp name="HTTPArgument.always_encode">false</boolProp>
                <stringProp name="Argument.value">password123</stringProp>
                <stringProp name="Argument.metadata">=</stringProp>
                <boolProp name="HTTPArgument.use_equals">true</boolProp>
                <stringProp name="Argument.name">password</stringProp>
              </elementProp>
            </collectionProp>
          </elementProp>
          <stringProp name="HTTPSampler.domain">localhost</stringProp>
          <stringProp name="HTTPSampler.port">3000</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/api/auth/login</stringProp>
          <stringProp name="HTTPSampler.method">POST</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout"></stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <JSONExtractor guiclass="JSONPostProcessorGui" testclass="JSONExtractor" testname="Extract Token" enabled="true">
            <stringProp name="JSONExtractor.referenceNames">auth_token</stringProp>
            <stringProp name="JSONExtractor.jsonPathExprs">$.token</stringProp>
            <stringProp name="JSONExtractor.match_numbers"></stringProp>
          </JSONExtractor>
          <hashTree/>
        </hashTree>
        
        <HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="Payroll Dashboard Request" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">localhost</stringProp>
          <stringProp name="HTTPSampler.port">3000</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"></stringProp>
          <stringProp name="HTTPSampler.path">/api/payroll/dashboard</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"></stringProp>
          <stringProp name="HTTPSampler.connect_timeout"></stringProp>
          <stringProp name="HTTPSampler.response_timeout">2000</stringProp>
        </HTTPSamplerProxy>
        <hashTree>
          <HeaderManager guiclass="HeaderPanel" testclass="HeaderManager" testname="HTTP Header Manager" enabled="true">
            <collectionProp name="HeaderManager.headers">
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Authorization</stringProp>
                <stringProp name="Header.value">Bearer \${auth_token}</stringProp>
              </elementProp>
              <elementProp name="" elementType="Header">
                <stringProp name="Header.name">Content-Type</stringProp>
                <stringProp name="Header.value">application/json</stringProp>
              </elementProp>
            </collectionProp>
          </HeaderManager>
          <hashTree/>
          
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Response Time Assertion" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="49586">200</stringProp>
            </collectionProp>
            <stringProp name="Assertion.custom_message">Response time should be under 2000ms</stringProp>
            <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">1</intProp>
          </ResponseAssertion>
          <hashTree/>
          
          <DurationAssertion guiclass="DurationAssertionGui" testclass="DurationAssertion" testname="Duration Assertion" enabled="true">
            <stringProp name="DurationAssertion.duration">2000</stringProp>
          </DurationAssertion>
          <hashTree/>
        </hashTree>
        
        <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Think Time" enabled="true">
          <stringProp name="ConstantTimer.delay">1000</stringProp>
          <stringProp name="RandomTimer.range">2000</stringProp>
        </UniformRandomTimer>
        <hashTree/>
      </hashTree>
      
      <ResultCollector guiclass="SummaryReport" testclass="ResultCollector" testname="Summary Report" enabled="true">
        <boolProp name="ResultCollector.error_logging">false</boolProp>
        <objProp>
          <name>saveConfig</name>
          <value class="SampleSaveConfiguration">
            &lt;time&gt;true&lt;/time&gt;
            &lt;latency&gt;true&lt;/latency&gt;
            &lt;timestamp&gt;true&lt;/timestamp&gt;
            &lt;success&gt;true&lt;/success&gt;
            &lt;label&gt;true&lt;/label&gt;
            &lt;code&gt;true&lt;/code&gt;
            &lt;message&gt;true&lt;/message&gt;
            &lt;threadName&gt;true&lt;/threadName&gt;
            &lt;dataType&gt;true&lt;/dataType&gt;
            &lt;encoding&gt;false&lt;/encoding&gt;
            &lt;assertions&gt;true&lt;/assertions&gt;
            &lt;subresults&gt;true&lt;/subresults&gt;
            &lt;responseData&gt;false&lt;/responseData&gt;
            &lt;samplerData&gt;false&lt;/samplerData&gt;
            &lt;xml&gt;false&lt;/xml&gt;
            &lt;fieldNames&gt;true&lt;/fieldNames&gt;
            &lt;responseHeaders&gt;false&lt;/responseHeaders&gt;
            &lt;requestHeaders&gt;false&lt;/requestHeaders&gt;
            &lt;responseDataOnError&gt;false&lt;/responseDataOnError&gt;
            &lt;saveAssertionResultsFailureMessage&gt;true&lt;/saveAssertionResultsFailureMessage&gt;
            &lt;assertionsResultsToSave&gt;0&lt;/assertionsResultsToSave&gt;
            &lt;bytes&gt;true&lt;/bytes&gt;
            &lt;sentBytes&gt;true&lt;/sentBytes&gt;
            &lt;url&gt;true&lt;/url&gt;
            &lt;threadCounts&gt;true&lt;/threadCounts&gt;
            &lt;idleTime&gt;true&lt;/idleTime&gt;
            &lt;connectTime&gt;true&lt;/connectTime&gt;
          &lt;/value&gt;
        &lt;/objProp&gt;
        <stringProp name="filename">payroll_load_test_results.jtl</stringProp>
      </ResultCollector>
      <hashTree/>
    </hashTree>
  </hashTree>
</jmeterTestPlan>`,
    },
    {
      id: "PT002",
      title: "Employee Search API Performance",
      type: "API Load Testing",
      tool: "JMeter",
      source: "code",
      status: "existing",
      category: "api-performance",
      scenario: "Multiple concurrent searches in employee directory",
      users: 100,
      duration: "10 minutes",
      expectedResponse: "< 500ms",
      thresholds: {
        responseTime: "500ms",
        throughput: "100 requests/sec",
        errorRate: "< 0.5%",
      },
      script: `// JMeter Java API Script for Employee Search Performance
package com.hr.performance;

import org.apache.jmeter.config.Arguments;
import org.apache.jmeter.config.gui.ArgumentsPanel;
import org.apache.jmeter.control.LoopController;
import org.apache.jmeter.control.gui.LoopControllerGui;
import org.apache.jmeter.engine.StandardJMeterEngine;
import org.apache.jmeter.protocol.http.control.Header;
import org.apache.jmeter.protocol.http.control.HeaderManager;
import org.apache.jmeter.protocol.http.control.gui.HttpTestSampleGui;
import org.apache.jmeter.protocol.http.gui.HeaderPanel;
import org.apache.jmeter.protocol.http.sampler.HTTPSamplerProxy;
import org.apache.jmeter.reporters.ResultCollector;
import org.apache.jmeter.reporters.Summariser;
import org.apache.jmeter.testelement.TestElement;
import org.apache.jmeter.testelement.TestPlan;
import org.apache.jmeter.threads.ThreadGroup;
import org.apache.jmeter.threads.gui.ThreadGroupGui;
import org.apache.jmeter.util.JMeterUtils;
import org.apache.jorphan.collections.HashTree;
import org.testng.annotations.Test;

import java.io.FileOutputStream;

public class EmployeeSearchPerformanceTest {
    
    @Test
    public void testEmployeeSearchAPIPerformance() throws Exception {
        // JMeter Engine
        StandardJMeterEngine jmeter = new StandardJMeterEngine();
        
        // Initialize Properties
        JMeterUtils.loadJMeterProperties("jmeter.properties");
        JMeterUtils.setJMeterHome("path/to/jmeter");
        JMeterUtils.initLocale();
        
        // Test Plan
        TestPlan testPlan = new TestPlan("Employee Search API Performance Test");
        testPlan.setProperty(TestElement.TEST_CLASS, TestPlan.class.getName());
        testPlan.setProperty(TestElement.GUI_CLASS, TestPlanGui.class.getName());
        testPlan.setUserDefinedVariables((Arguments) new ArgumentsPanel().createTestElement());
        
        // Thread Group
        ThreadGroup threadGroup = new ThreadGroup();
        threadGroup.setName("Employee Search Users");
        threadGroup.setNumThreads(100);
        threadGroup.setRampUp(30);
        threadGroup.setScheduler(true);
        threadGroup.setDuration(600); // 10 minutes
        threadGroup.setProperty(TestElement.TEST_CLASS, ThreadGroup.class.getName());
        threadGroup.setProperty(TestElement.GUI_CLASS, ThreadGroupGui.class.getName());
        
        // Loop Controller
        LoopController loopController = new LoopController();
        loopController.setLoops(-1); // Infinite loops within duration
        loopController.setFirst(true);
        loopController.setProperty(TestElement.TEST_CLASS, LoopController.class.getName());
        loopController.setProperty(TestElement.GUI_CLASS, LoopControllerGui.class.getName());
        loopController.initialize();
        threadGroup.setSamplerController(loopController);
        
        // HTTP Sampler for Employee Search
        HTTPSamplerProxy httpSampler = new HTTPSamplerProxy();
        httpSampler.setDomain("localhost");
        httpSampler.setPort(3000);
        httpSampler.setPath("/api/employees/search");
        httpSampler.setMethod("GET");
        httpSampler.setName("Employee Search Request");
        httpSampler.setProperty(TestElement.TEST_CLASS, HTTPSamplerProxy.class.getName());
        httpSampler.setProperty(TestElement.GUI_CLASS, HttpTestSampleGui.class.getName());
        
        // Add search parameters
        Arguments arguments = new Arguments();
        arguments.addArgument("query", "Sarah", "=");
        arguments.addArgument("department", "Engineering", "=");
        arguments.addArgument("limit", "50", "=");
        httpSampler.setArguments(arguments);
        
        // Header Manager
        HeaderManager headerManager = new HeaderManager();
        headerManager.add(new Header("Content-Type", "application/json"));
        headerManager.add(new Header("Authorization", "Bearer test-token"));
        headerManager.setName("HTTP Header Manager");
        headerManager.setProperty(TestElement.TEST_CLASS, HeaderManager.class.getName());
        headerManager.setProperty(TestElement.GUI_CLASS, HeaderPanel.class.getName());
        
        // Test Plan Tree
        HashTree testPlanTree = new HashTree();
        testPlanTree.add(testPlan);
        
        HashTree threadGroupTree = testPlanTree.add(testPlan, threadGroup);
        threadGroupTree.add(httpSampler, headerManager);
        
        // Result Collector
        Summariser summer = null;
        String summariserName = JMeterUtils.getPropDefault("summariser.name", "summary");
        if (summariserName.length() > 0) {
            summer = new Summariser(summariserName);
        }
        
        ResultCollector logger = new ResultCollector(summer);
        logger.setFilename("employee_search_performance_results.jtl");
        testPlanTree.add(testPlan, logger);
        
        // Configure and run the test
        jmeter.configure(testPlanTree);
        jmeter.run();
        
        System.out.println("Employee Search Performance Test completed!");
    }
}`,
    },
    {
      id: "PT003",
      title: "Salary History Query Performance",
      type: "Database Performance",
      tool: "JMeter + SQL",
      source: "brd",
      status: "new",
      category: "database-performance",
      scenario: "Heavy salary history queries with joins",
      users: 25,
      duration: "3 minutes",
      expectedResponse: "< 1 second",
      thresholds: {
        responseTime: "1000ms",
        throughput: "50 queries/sec",
        errorRate: "< 0.1%",
      },
      script: `<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.4.1">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Salary History DB Performance Test" enabled="true">
      <stringProp name="TestPlan.comments">Database performance test for salary history queries</stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="DB Query Users" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <intProp name="LoopController.loops">-1</intProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">25</stringProp>
        <stringProp name="ThreadGroup.ramp_time">30</stringProp>
        <boolProp name="ThreadGroup.scheduler">true</boolProp>
        <stringProp name="ThreadGroup.duration">180</stringProp>
      </ThreadGroup>
      <hashTree>
        <JDBCDataSource guiclass="TestBeanGUI" testclass="JDBCDataSource" testname="Database Connection" enabled="true">
          <boolProp name="autocommit">true</boolProp>
          <stringProp name="checkQuery">SELECT 1</stringProp>
          <stringProp name="connectionAge">5000</stringProp>
          <stringProp name="connectionProperties"></stringProp>
          <stringProp name="dataSource">hrDB</stringProp>
          <stringProp name="dbUrl">jdbc:postgresql://localhost:5432/hr_system</stringProp>
          <stringProp name="driver">org.postgresql.Driver</stringProp>
          <stringProp name="password">dbpassword</stringProp>
          <stringProp name="poolMax">10</stringProp>
          <stringProp name="timeout">10000</stringProp>
          <stringProp name="transactionIsolation">DEFAULT</stringProp>
          <stringProp name="trimInterval">60000</stringProp>
          <stringProp name="username">hr_user</stringProp>
        </JDBCDataSource>
        <hashTree/>
        
        <JDBCSampler guiclass="TestBeanGUI" testclass="JDBCSampler" testname="Salary History Complex Query" enabled="true">
          <stringProp name="dataSource">hrDB</stringProp>
          <stringProp name="query">
            SELECT 
              e.id,
              e.first_name,
              e.last_name,
              e.department,
              sh.salary_amount,
              sh.effective_date,
              sh.reason,
              LEAD(sh.effective_date) OVER (PARTITION BY e.id ORDER BY sh.effective_date) as next_effective_date,
              LAG(sh.salary_amount) OVER (PARTITION BY e.id ORDER BY sh.effective_date) as previous_salary,
              ROUND(
                (sh.salary_amount - LAG(sh.salary_amount) OVER (PARTITION BY e.id ORDER BY sh.effective_date)) 
                / LAG(sh.salary_amount) OVER (PARTITION BY e.id ORDER BY sh.effective_date) * 100, 2
              ) as salary_increase_percentage,
              COUNT(*) OVER (PARTITION BY e.id) as total_salary_changes,
              AVG(sh.salary_amount) OVER (PARTITION BY e.department) as dept_avg_salary
            FROM employees e
            INNER JOIN salary_history sh ON e.id = sh.employee_id
            LEFT JOIN departments d ON e.department_id = d.id
            WHERE sh.effective_date >= CURRENT_DATE - INTERVAL '2 years'
              AND e.status = 'ACTIVE'
              AND (\\$\\{__Random(1,1000)\\} % 10 = 0 OR e.department IN ('Engineering', 'Sales', 'Marketing'))
            ORDER BY e.last_name, sh.effective_date DESC
            LIMIT 100;
          </stringProp>
          <stringProp name="queryArguments"></stringProp>
          <stringProp name="queryTimeout">1000</stringProp>
          <stringProp name="queryType">Select Statement</stringProp>
          <stringProp name="resultVariable">salaryHistoryResult</stringProp>
          <stringProp name="variableNames">employee_id,salary_amount,increase_percentage</stringProp>
        </JDBCSampler>
        <hashTree>
          <DurationAssertion guiclass="DurationAssertionGui" testclass="DurationAssertion" testname="Query Duration Assertion" enabled="true">
            <stringProp name="DurationAssertion.duration">1000</stringProp>
          </DurationAssertion>
          <hashTree/>
          
          <ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion" testname="Results Count Assertion" enabled="true">
            <collectionProp name="Asserion.test_strings">
              <stringProp name="2800701">.*employee_id.*</stringProp>
            </collectionProp>
            <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
            <boolProp name="Assertion.assume_success">false</boolProp>
            <intProp name="Assertion.test_type">2</intProp>
            <stringProp name="Assertion.custom_message">Query should return employee data</stringProp>
          </ResponseAssertion>
          <hashTree/>
        </hashTree>
        
        <JDBCSampler guiclass="TestBeanGUI" testclass="JDBCSampler" testname="Salary Aggregation Query" enabled="true">
          <stringProp name="dataSource">hrDB</stringProp>
          <stringProp name="query">
            WITH salary_stats AS (
              SELECT 
                e.department_id,
                d.name as department_name,
                COUNT(DISTINCT e.id) as employee_count,
                AVG(sh.salary_amount) as avg_salary,
                MIN(sh.salary_amount) as min_salary,
                MAX(sh.salary_amount) as max_salary,
                STDDEV(sh.salary_amount) as salary_stddev,
                PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY sh.salary_amount) as median_salary
              FROM employees e
              INNER JOIN salary_history sh ON e.id = sh.employee_id
              INNER JOIN departments d ON e.department_id = d.id
              WHERE sh.effective_date = (
                SELECT MAX(sh2.effective_date) 
                FROM salary_history sh2 
                WHERE sh2.employee_id = e.id
              )
              AND e.status = 'ACTIVE'
              GROUP BY e.department_id, d.name
            )
            SELECT 
              *,
              RANK() OVER (ORDER BY avg_salary DESC) as salary_rank,
              ROUND((avg_salary - LAG(avg_salary) OVER (ORDER BY avg_salary DESC)) / LAG(avg_salary) OVER (ORDER BY avg_salary DESC) * 100, 2) as salary_gap_percentage
            FROM salary_stats
            ORDER BY avg_salary DESC;
          </stringProp>
          <stringProp name="queryTimeout">1000</stringProp>
          <stringProp name="queryType">Select Statement</stringProp>
        </JDBCSampler>
        <hashTree>
          <DurationAssertion guiclass="DurationAssertionGui" testclass="DurationAssertion" testname="Aggregation Duration Assertion" enabled="true">
            <stringProp name="DurationAssertion.duration">1000</stringProp>
          </DurationAssertion>
          <hashTree/>
        </hashTree>
        
        <UniformRandomTimer guiclass="UniformRandomTimerGui" testclass="UniformRandomTimer" testname="Query Think Time" enabled="true">
          <stringProp name="ConstantTimer.delay">500</stringProp>
          <stringProp name="RandomTimer.range">1000</stringProp>
        </UniformRandomTimer>
        <hashTree/>
      </hashTree>
      
      <ResultCollector guiclass="StatVisualizer" testclass="ResultCollector" testname="Aggregate Report" enabled="true">
        <boolProp name="ResultCollector.error_logging">false</boolProp>
        <objProp>
          <name>saveConfig</name>
          <value class="SampleSaveConfiguration">
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
            <samplerData>false</samplerData>
            <xml>false</xml>
            <fieldNames>true</fieldNames>
            <responseHeaders>false</responseHeaders>
            <requestHeaders>false</requestHeaders>
            <responseDataOnError>false</responseDataOnError>
            <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
            <assertionsResultsToSave>0</assertionsResultsToSave>
            <bytes>true</bytes>
            <url>true</url>
            <threadCounts>true</threadCounts>
            <idleTime>true</idleTime>
          &lt;/value&gt;
        &lt;/objProp&gt;
        <stringProp name="filename">salary_history_db_performance.jtl</stringProp>
      </ResultCollector>
      <hashTree/>
    </hashTree>
  </hashTree>
</jmeterTestPlan>`,
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case "business-workflow":
        return "text-blue-600 bg-blue-100";
      case "business-logic":
        return "text-indigo-600 bg-indigo-100";
      case "validation":
        return "text-orange-600 bg-orange-100";
      case "integration":
        return "text-purple-600 bg-purple-100";
      case "load-testing":
        return "text-red-600 bg-red-100";
      case "api-performance":
        return "text-green-600 bg-green-100";
      case "database-performance":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const unitTests = [
    {
      id: "UT001",
      file: "frontend/src/components/EmployeeForm.jsx",
      testCount: 8,
      coverage: 92,
      newTests: 3,
      existingTests: 5,
      tests: [
        {
          name: "should render employee form with all fields",
          source: "code",
          status: "existing",
          type: "component",
        },
        {
          name: "should handle salary state changes correctly",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should fetch salary history on employee load",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should validate required fields before submission",
          source: "code",
          status: "existing",
          type: "validation",
        },
        {
          name: "should display salary history when available",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should handle API errors gracefully",
          source: "code",
          status: "existing",
          type: "error",
        },
        {
          name: "should update baseSalary when props change",
          source: "code",
          status: "existing",
          type: "component",
        },
        {
          name: "should call onSubmit with correct data structure",
          source: "code",
          status: "existing",
          type: "component",
        },
      ],
      script: `// Jest Unit Tests - EmployeeForm.test.jsx
// This is example test code showing structure only
// Real implementation would require testing libraries

describe('EmployeeForm Component', () => {
  
  // EXISTING TEST - Code-based component rendering
  test('should render employee form with all fields', () => {
    // Implementation would render component and verify elements exist
    // Would check for employee name, email, department, salary, date fields
    // Would verify save button is present
  });

  // NEW TEST - BRD-based business requirement
  test('should handle salary state changes correctly', async () => {
    // Implementation would test user interactions
    // Would simulate typing in salary input field
    // Would verify salary formatting on blur (e.g., 85000 -> $85,000)
    // Would test validation for zero/negative values
    // Would check error styling and messages appear correctly
  });

  // NEW TEST - BRD-based business requirement  
  test('should fetch salary history on employee load', () => {
    // Implementation would mock API calls
    // Would verify salary history is requested when employee loads
    // Would test loading states and error handling
  });

  // EXISTING TEST - Code-based validation
  test('should validate required fields before submission', () => {
    // Implementation would test form validation
    // Would verify submit button is disabled with invalid data
    // Would check required field validation messages
  });

  // Additional test implementations would follow similar patterns
});`,
    },
    {
      id: "UT002",
      file: "backend/routes/employee.js",
      testCount: 12,
      coverage: 89,
      newTests: 8,
      existingTests: 4,
      tests: [
        {
          name: "GET /employees should return employees with salary history",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should join salary_history table correctly",
          source: "code",
          status: "new",
          type: "technical",
        },
        {
          name: "should filter for most recent salary entries",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "POST /employees/:id/salary should create new salary entry",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should validate required salary fields",
          source: "brd",
          status: "new",
          type: "validation",
        },
        {
          name: "should return 400 for invalid salary data",
          source: "brd",
          status: "new",
          type: "validation",
        },
        {
          name: "should return 404 for non-existent employee",
          source: "code",
          status: "existing",
          type: "error",
        },
        {
          name: "should update employee current salary reference",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should handle database connection errors",
          source: "code",
          status: "existing",
          type: "error",
        },
        {
          name: "should sanitize SQL injection attempts",
          source: "code",
          status: "existing",
          type: "security",
        },
        {
          name: "should require authentication for salary updates",
          source: "brd",
          status: "new",
          type: "security",
        },
        {
          name: "should log salary changes for audit trail",
          source: "brd",
          status: "new",
          type: "compliance",
        },
      ],
      script: `// Jest Unit Tests - employee.test.js
// This is example test code showing structure only
// Real implementation would require Node.js testing libraries

describe('Employee Routes', () => {
  
  beforeEach(() => {
    // Implementation would clear mocks and setup test environment
  });

  // NEW TEST - BRD-based business requirement
  describe('GET /employees should return employees with salary history', () => {
    test('should return employees with current and historical salary data', async () => {
      const mockEmployees = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          current_salary: 85000,
          salary_history: [
            { amount: 75000, effective_date: '2023-01-01', reason: 'Initial' },
            { amount: 85000, effective_date: '2024-01-01', reason: 'Annual review' }
          ]
        }
      ];
      
      // Implementation would mock database calls and test API response
      // Would verify correct SQL query structure
      // Would check response format and data accuracy
    });
  });

  // NEW TEST - Code-based technical requirement
  test('should join salary_history table correctly', async () => {
    // Implementation would test SQL query structure
    // Would verify LEFT JOIN syntax is correct
    // Would check ORDER BY clause for effective_date DESC
  });

  // NEW TEST - BRD-based business requirement
  test('should filter for most recent salary entries', async () => {
    // Implementation would test query filtering logic
    // Would verify subquery for MAX(effective_date) works correctly
    // Would check that only current salary data is returned when requested
  });

  // Additional test implementations would follow similar patterns
});`,
    },
    {
      id: "UT003",
      file: "frontend/src/utils/salaryCalculations.js",
      testCount: 15,
      coverage: 95,
      newTests: 15,
      existingTests: 0,
      tests: [
        {
          name: "calculateGrossPay should sum base salary, overtime, and bonuses",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "calculateTaxes should apply progressive tax rates correctly",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should calculate 15% tax for salaries <= $50,000",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should calculate tiered tax for salaries $50,001-$100,000",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should calculate highest tier for salaries > $100,000",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "calculateDeductions should compute health insurance at 3%",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "calculateDeductions should compute 401k at 5%",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should handle zero and negative salary inputs",
          source: "code",
          status: "new",
          type: "validation",
        },
        {
          name: "should round calculations to 2 decimal places",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should handle undefined/null input parameters",
          source: "code",
          status: "new",
          type: "error",
        },
        {
          name: "should validate input parameter types",
          source: "code",
          status: "new",
          type: "validation",
        },
        {
          name: "should return correct net pay calculation",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should handle edge cases at tax bracket boundaries",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should maintain precision for large salary amounts",
          source: "code",
          status: "new",
          type: "technical",
        },
        {
          name: "should export all calculation functions properly",
          source: "code",
          status: "new",
          type: "technical",
        },
      ],
      script: `// Jest Unit Tests - salaryCalculations.test.js
// This is example test code showing structure only
// Real implementation would import actual calculation functions

describe('Salary Calculations', () => {

  // NEW TEST - BRD-based business rule
  describe('calculateGrossPay', () => {
    test('should sum base salary, overtime, and bonuses', () => {
      const payrollData = {
        baseSalary: 80000,
        overtimeHours: 10,
        overtimeRate: 60,
        bonuses: 5000
      };

      // Implementation would call actual calculation function
      // Expected result: 80000 + (10 * 60) + 5000 = 85600
      // Would verify the calculation is accurate
    });

    test('should handle missing overtime and bonuses', () => {
      // Implementation would test with minimal input data
      // Would verify function handles undefined values gracefully
      // Expected to default missing values to zero
    });

    test('should calculate overtime at 1.5x rate for hours over 40', () => {
      // Implementation would test overtime multiplier logic
      // Would verify time-and-a-half calculation is correct
    });
  });

  // NEW TEST - BRD-based tax calculation rules
  describe('calculateTaxes', () => {
    test('should apply progressive tax rates correctly', () => {
      // Implementation would test all tax bracket scenarios
      // 15% for income <= $50,000
      // 25% for income $50,001-$100,000  
      // 35% for income > $100,000
    });

    test('should calculate correct tax for different salary ranges', () => {
      // Implementation would test edge cases at bracket boundaries
      // Would verify progressive calculation is accurate
    });
  });

  // NEW TEST - BRD-based deduction rules
  describe('calculateDeductions', () => {
    test('should compute health insurance at 3% of gross pay', () => {
      // Implementation would verify percentage calculation
      // Would test with various salary amounts
    });

    test('should compute 401k at 5% with annual limits', () => {
      // Implementation would test contribution limits
      // Would verify high earners hit the annual cap
    });
  });

  // NEW TEST - Code-based validation
  describe('Input Validation', () => {
    test('should handle invalid input gracefully', () => {
      // Implementation would test edge cases
      // Zero values, negative numbers, null/undefined
      // Non-numeric strings, etc.
    });
  });
});`,
    },
    {
      id: "UT004",
      file: "backend/controllers/payrollController.js",
      testCount: 10,
      coverage: 88,
      newTests: 10,
      existingTests: 0,
      tests: [
        {
          name: "getCurrentPayroll should fetch all employees with salary data",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should calculate taxes using progressive tax function",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should calculate deductions for each employee",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should compute net pay correctly (gross - taxes - deductions)",
          source: "brd",
          status: "new",
          type: "business",
        },
        {
          name: "should return proper JSON response structure",
          source: "code",
          status: "new",
          type: "technical",
        },
        {
          name: "should handle empty employee database",
          source: "code",
          status: "new",
          type: "edge",
        },
        {
          name: "should catch and handle database errors",
          source: "code",
          status: "new",
          type: "error",
        },
        {
          name: "should return 500 status on server errors",
          source: "code",
          status: "new",
          type: "error",
        },
        {
          name: "should validate employee salary data exists",
          source: "brd",
          status: "new",
          type: "validation",
        },
        {
          name: "should format currency values correctly",
          source: "brd",
          status: "new",
          type: "business",
        },
      ],
      script: `// Jest Unit Tests - payrollController.test.js
// This is example test code showing structure only
// Real implementation would require Express and database testing setup

// Mock Express request/response helpers for demonstration
const mockRequest = (body = {}, params = {}, query = {}) => ({
  body,
  params,
  query,
  user: { id: 1, role: 'admin' }
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Payroll Controller', () => {

  beforeEach(() => {
    // Implementation would clear mocks and setup test environment
    // Would mock tax and deduction calculation functions
  });

  // NEW TEST - BRD-based business requirement
  describe('getCurrentPayroll', () => {
    test('should fetch all employees with salary data', async () => {
      const mockEmployees = [
        {
          id: 1,
          first_name: 'John',
          last_name: 'Doe',
          department: 'Engineering',
          current_salary: 85000,
          overtime_hours: 5,
          bonuses: 2000
        },
        {
          id: 2,
          first_name: 'Jane',
          last_name: 'Smith',
          department: 'Sales',
          current_salary: 75000,
          overtime_hours: 0,
          bonuses: 5000
        }
      ];

      // Implementation would mock database queries
      // Would verify correct SQL query is executed
      // Would test response structure and data formatting
      
      const req = mockRequest();
      const res = mockResponse();

      // Implementation would call controller function and verify results
    });
  });

  // NEW TEST - BRD-based tax calculation
  test('should calculate taxes using progressive tax function', async () => {
    // Implementation would test tax calculation integration
    // Would verify progressive tax rates are applied correctly
    // Would check that tax amounts are included in response
  });

  // NEW TEST - BRD-based deduction calculation  
  test('should calculate deductions for each employee', async () => {
    // Implementation would test deduction calculation integration
    // Would verify health insurance and 401k percentages
    // Would check deduction breakdown in response
  });

  // NEW TEST - Code-based response structure
  test('should return proper JSON response structure', async () => {
    // Implementation would verify response format
    // Would check for required fields: employees, summary, timestamp
    // Would validate data types and structure
  });

  // Additional test implementations would follow similar patterns
});`,
    },
  ];

  const getTestTypeColor = (type) => {
    switch (type) {
      case "business":
        return "text-blue-600 bg-blue-100";
      case "validation":
        return "text-orange-600 bg-orange-100";
      case "security":
        return "text-red-600 bg-red-100";
      case "error":
        return "text-yellow-600 bg-yellow-100";
      case "technical":
        return "text-purple-600 bg-purple-100";
      case "compliance":
        return "text-indigo-600 bg-indigo-100";
      case "component":
        return "text-green-600 bg-green-100";
      case "edge":
        return "text-gray-600 bg-gray-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getSourceIcon = (source) => {
    return source === "brd" ? (
      <FileText className="w-3 h-3" />
    ) : (
      <Code className="w-3 h-3" />
    );
  };

  const toggleTestExpansion = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  const toggleScriptView = (testId) => {
    setShowScript((prev) => ({
      ...prev,
      [testId]: !prev[testId],
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100";
      case "Medium":
        return "text-yellow-600 bg-yellow-100";
      case "Low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back to Pull Request</span>
                </button>
                <div className="border-l border-gray-300 pl-4">
                  <h1 className="text-xl font-semibold text-gray-900">
                    AI Generated Test Cases
                  </h1>
                  <p className="text-sm text-gray-600">
                    PR #341: Salary history tracking and payroll dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4 inline mr-2" />
                  Export Tests
                </button>
                <div className="relative">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Run All Tests
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                    <Code className="w-4 h-4 inline mr-1" />
                    Export Selenium
                  </button>
                  <button className="px-3 py-2 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Export JMeter
                  </button>
                  <button className="px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                    <Target className="w-4 h-4 inline mr-1" />
                    Export Jest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("functional")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "functional"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              Functional Tests ({functionalTests.length})
            </button>
            <button
              onClick={() => setActiveTab("performance")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "performance"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Performance Tests ({performanceTests.length})
            </button>
            <button
              onClick={() => setActiveTab("unit")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "unit"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Unit Tests ({testSummary.unitTests})
            </button>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Functional Tests</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {testSummary.functionalTests}
                    </p>
                  </div>
                  <Globe className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Performance Tests</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {testSummary.performanceTests}
                    </p>
                  </div>
                  <Zap className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Unit Tests</p>
                    <p className="text-2xl font-bold text-green-600">
                      {testSummary.unitTests}
                    </p>
                  </div>
                  <Code className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Coverage</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      {testSummary.totalCoverage}%
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-indigo-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Est. Runtime</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {testSummary.estimatedRunTime}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Risk Score</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {testSummary.riskScore}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* AI Analysis Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Analysis Summary
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Code Changes Analyzed
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>
                      • 8 files modified across frontend, backend, and database
                    </li>
                    <li>• New salary history tracking functionality</li>
                    <li>• Payroll dashboard with complex calculations</li>
                    <li>• Database schema changes and migrations</li>
                    <li>• Authentication and authorization updates</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Test Strategy Recommendations
                  </h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Focus on salary calculation accuracy testing</li>
                    <li>• Validate database migration integrity</li>
                    <li>• Test performance under concurrent payroll access</li>
                    <li>• Verify security for salary data access</li>
                    <li>• Comprehensive UI testing for new dashboard</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Test Coverage Analysis */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Test Coverage Analysis
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Source Distribution
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                      <span className="text-sm text-blue-700 flex items-center">
                        <FileText className="w-4 h-4 mr-1" />
                        BRD-Based Tests
                      </span>
                      <span className="text-sm font-medium text-blue-900">
                        {functionalTests.filter((t) => t.source === "brd")
                          .length +
                          performanceTests.filter((t) => t.source === "brd")
                            .length +
                          unitTests.reduce(
                            (sum, test) =>
                              sum +
                              test.tests.filter((t) => t.source === "brd")
                                .length,
                            0
                          )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                      <span className="text-sm text-purple-700 flex items-center">
                        <Code className="w-4 h-4 mr-1" />
                        Code-Based Tests
                      </span>
                      <span className="text-sm font-medium text-purple-900">
                        {functionalTests.filter((t) => t.source === "code")
                          .length +
                          performanceTests.filter((t) => t.source === "code")
                            .length +
                          unitTests.reduce(
                            (sum, test) =>
                              sum +
                              test.tests.filter((t) => t.source === "code")
                                .length,
                            0
                          )}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Test Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-green-700">
                        New Tests Generated
                      </span>
                      <span className="text-sm font-medium text-green-900">
                        {functionalTests.filter((t) => t.status === "new")
                          .length +
                          performanceTests.filter((t) => t.status === "new")
                            .length +
                          unitTests.reduce(
                            (sum, test) => sum + test.newTests,
                            0
                          )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">
                        Existing Tests
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {functionalTests.filter((t) => t.status === "existing")
                          .length +
                          performanceTests.filter(
                            (t) => t.status === "existing"
                          ).length +
                          unitTests.reduce(
                            (sum, test) => sum + test.existingTests,
                            0
                          )}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Priority Assessment
                  </h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm text-red-700">
                        High Priority
                      </span>
                      <span className="text-sm font-medium text-red-900">
                        {
                          functionalTests.filter((t) => t.priority === "High")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm text-yellow-700">
                        Medium Priority
                      </span>
                      <span className="text-sm font-medium text-yellow-900">
                        {
                          functionalTests.filter((t) => t.priority === "Medium")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm text-green-700">
                        Business Logic Focus
                      </span>
                      <span className="text-sm font-medium text-green-900">
                        {unitTests.reduce(
                          (sum, test) =>
                            sum +
                            test.tests.filter((t) => t.type === "business")
                              .length,
                          0
                        )}
                        %
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Functional Tests Tab */}
        {activeTab === "functional" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Functional Test Cases
              </h2>
              <span className="text-sm text-gray-600">
                End-to-end Selenium automation scripts
              </span>
            </div>

            {/* Test Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">BRD-Based Tests</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {
                        functionalTests.filter((test) => test.source === "brd")
                          .length
                      }
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Code-Based Tests</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {
                        functionalTests.filter((test) => test.source === "code")
                          .length
                      }
                    </p>
                  </div>
                  <Code className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">New Tests</p>
                    <p className="text-2xl font-bold text-green-700">
                      {
                        functionalTests.filter((test) => test.status === "new")
                          .length
                      }
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-red-600">High Priority</p>
                    <p className="text-2xl font-bold text-red-700">
                      {
                        functionalTests.filter(
                          (test) => test.priority === "High"
                        ).length
                      }
                    </p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>

            {functionalTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleTestExpansion(test.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500">
                        {test.id}
                      </span>
                      <h3 className="font-medium text-gray-900">
                        {test.title}
                      </h3>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                          test.priority
                        )}`}
                      >
                        {test.priority}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {test.type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                          test.category
                        )}`}
                      >
                        {test.category}
                      </span>
                      <span
                        className={`text-xs px-1 py-0.5 rounded flex items-center ${
                          test.source === "brd"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {getSourceIcon(test.source)}
                        <span className="ml-1">
                          {test.source.toUpperCase()}
                        </span>
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          test.status === "new"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {test.status}
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedTest === test.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {test.description}
                  </p>
                </div>

                {expandedTest === test.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">
                          Test Steps
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                          {test.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Expected Result
                          </h4>
                          <p className="text-sm text-gray-600">
                            {test.expectedResult}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Test Data
                          </h4>
                          <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                            {test.testData}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Test Classification
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                test.source === "brd"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              Source:{" "}
                              {test.source === "brd"
                                ? "Business Requirements"
                                : "Code Analysis"}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                                test.category
                              )}`}
                            >
                              Category:{" "}
                              {test.category
                                .replace("-", " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded ${
                                test.status === "new"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              Status:{" "}
                              {test.status === "new"
                                ? "Newly Generated"
                                : "Existing Test"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Script Section */}
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          Automation Script
                        </h4>
                        <button
                          onClick={() => toggleScriptView(test.id)}
                          className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                        >
                          <Code className="w-4 h-4" />
                          <span>
                            {showScript[test.id]
                              ? "Hide Script"
                              : "View Script"}
                          </span>
                        </button>
                      </div>

                      {showScript[test.id] && (
                        <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-gray-400">
                              {test.automation === "selenium"
                                ? "Selenium WebDriver (Java)"
                                : test.automation === "database"
                                ? "Database Integration Test (Java + JDBC)"
                                : "Test Script"}
                            </span>
                            <button
                              onClick={() =>
                                navigator.clipboard.writeText(test.script)
                              }
                              className="text-xs text-blue-400 hover:text-blue-300"
                            >
                              Copy Script
                            </button>
                          </div>
                          <pre className="text-xs overflow-x-auto">
                            <code>{test.script}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Performance Tests Tab */}
        {activeTab === "performance" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Performance Test Scripts
              </h2>
              <span className="text-sm text-gray-600">
                JMeter load testing scenarios
              </span>
            </div>

            {/* Test Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">BRD-Based Tests</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {
                        performanceTests.filter((test) => test.source === "brd")
                          .length
                      }
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Code-Based Tests</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {
                        performanceTests.filter(
                          (test) => test.source === "code"
                        ).length
                      }
                    </p>
                  </div>
                  <Code className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">New Tests</p>
                    <p className="text-2xl font-bold text-green-700">
                      {
                        performanceTests.filter((test) => test.status === "new")
                          .length
                      }
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Existing Tests</p>
                    <p className="text-2xl font-bold text-gray-700">
                      {
                        performanceTests.filter(
                          (test) => test.status === "existing"
                        ).length
                      }
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            {performanceTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="font-mono text-sm text-gray-500">
                        {test.id}
                      </span>
                      <h3 className="font-medium text-gray-900">
                        {test.title}
                      </h3>
                      <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                        {test.tool}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                          test.category
                        )}`}
                      >
                        {test.category}
                      </span>
                      <span
                        className={`text-xs px-1 py-0.5 rounded flex items-center ${
                          test.source === "brd"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {getSourceIcon(test.source)}
                        <span className="ml-1">
                          {test.source.toUpperCase()}
                        </span>
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          test.status === "new"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {test.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{test.scenario}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Concurrent Users</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.users}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.duration}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Expected Response</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.expectedResponse}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {test.type}
                    </p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Performance Thresholds
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">
                        Response Time
                      </span>
                      <span className="text-sm font-medium">
                        {test.thresholds.responseTime}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Throughput</span>
                      <span className="text-sm font-medium">
                        {test.thresholds.throughput}
                      </span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-600">Error Rate</span>
                      <span className="text-sm font-medium">
                        {test.thresholds.errorRate}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Test Classification
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        test.source === "brd"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      Source:{" "}
                      {test.source === "brd"
                        ? "Performance SLA Requirements"
                        : "Code Performance Analysis"}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getCategoryColor(
                        test.category
                      )}`}
                    >
                      Category:{" "}
                      {test.category
                        .replace("-", " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        test.status === "new"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      Status:{" "}
                      {test.status === "new"
                        ? "Newly Generated"
                        : "Existing Test"}
                    </span>
                  </div>
                </div>

                {/* JMeter Script Section */}
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">
                      Performance Test Script
                    </h4>
                    <button
                      onClick={() => toggleScriptView(test.id)}
                      className="flex items-center space-x-2 px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700"
                    >
                      <Zap className="w-4 h-4" />
                      <span>
                        {showScript[test.id]
                          ? "Hide Script"
                          : "View JMeter Script"}
                      </span>
                    </button>
                  </div>

                  {showScript[test.id] && (
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">
                          {test.tool} - {test.type}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(test.script)
                            }
                            className="text-xs text-blue-400 hover:text-blue-300"
                          >
                            Copy Script
                          </button>
                          <span className="text-xs text-gray-500">|</span>
                          <span className="text-xs text-orange-400">
                            Save as: {test.id.toLowerCase()}
                            _performance_test.jmx
                          </span>
                        </div>
                      </div>
                      <pre className="text-xs overflow-x-auto">
                        <code>{test.script}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Unit Tests Tab */}
        {activeTab === "unit" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Unit Test Cases
              </h2>
              <span className="text-sm text-gray-600">
                Code-level testing with coverage analysis
              </span>
            </div>

            {/* Test Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600">BRD-Based Tests</p>
                    <p className="text-2xl font-bold text-blue-700">
                      {unitTests.reduce(
                        (sum, test) =>
                          sum +
                          test.tests.filter((t) => t.source === "brd").length,
                        0
                      )}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600">Code-Based Tests</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {unitTests.reduce(
                        (sum, test) =>
                          sum +
                          test.tests.filter((t) => t.source === "code").length,
                        0
                      )}
                    </p>
                  </div>
                  <Code className="w-8 h-8 text-purple-500" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">New Tests</p>
                    <p className="text-2xl font-bold text-green-700">
                      {unitTests.reduce((sum, test) => sum + test.newTests, 0)}
                    </p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Existing Tests</p>
                    <p className="text-2xl font-bold text-gray-700">
                      {unitTests.reduce(
                        (sum, test) => sum + test.existingTests,
                        0
                      )}
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-gray-500" />
                </div>
              </div>
            </div>

            {unitTests.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <div
                  className="p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleTestExpansion(test.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="font-mono text-sm text-gray-500">
                        {test.id}
                      </span>
                      <h3 className="font-medium text-gray-900">{test.file}</h3>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        {test.testCount} tests
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          test.coverage >= 90
                            ? "text-green-600 bg-green-100"
                            : test.coverage >= 80
                            ? "text-yellow-600 bg-yellow-100"
                            : "text-red-600 bg-red-100"
                        }`}
                      >
                        {test.coverage}% coverage
                      </span>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        {test.newTests} new
                      </span>
                      <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {test.existingTests} existing
                      </span>
                    </div>
                    <ChevronRight
                      className={`w-5 h-5 text-gray-400 transform transition-transform ${
                        expandedTest === test.id ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                </div>

                {expandedTest === test.id && (
                  <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-900 mb-3">
                        Test Case Analysis
                      </h4>

                      {/* Test categorization */}
                      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <h5 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
                            <FileText className="w-4 h-4 mr-1" />
                            BRD-Based Tests (
                            {
                              test.tests.filter((t) => t.source === "brd")
                                .length
                            }
                            )
                          </h5>
                          <p className="text-xs text-blue-700">
                            Tests derived from business requirements
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <h5 className="text-sm font-medium text-purple-900 mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-1" />
                            Code-Based Tests (
                            {
                              test.tests.filter((t) => t.source === "code")
                                .length
                            }
                            )
                          </h5>
                          <p className="text-xs text-purple-700">
                            Tests derived from code analysis
                          </p>
                        </div>
                      </div>

                      <ul className="space-y-2 mb-6">
                        {test.tests.map((testCase, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-3 text-sm p-2 hover:bg-gray-50 rounded"
                          >
                            <div className="flex items-center space-x-2">
                              {testCase.status === "new" ? (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              ) : (
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              )}
                              <span
                                className={`text-xs px-1 py-0.5 rounded ${
                                  testCase.source === "brd"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-purple-100 text-purple-700"
                                }`}
                              >
                                {getSourceIcon(testCase.source)}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${getTestTypeColor(
                                  testCase.type
                                )}`}
                              >
                                {testCase.type}
                              </span>
                              <span
                                className={`text-xs px-1 py-0.5 rounded ${
                                  testCase.status === "new"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {testCase.status}
                              </span>
                            </div>
                            <span className="text-gray-700 flex-1">
                              {testCase.name}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Unit Test Script Section */}
                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">
                            Unit Test Suite
                          </h4>
                          <button
                            onClick={() => toggleScriptView(test.id)}
                            className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                          >
                            <Code className="w-4 h-4" />
                            <span>
                              {showScript[test.id]
                                ? "Hide Tests"
                                : "View Test Code"}
                            </span>
                          </button>
                        </div>

                        {showScript[test.id] && (
                          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-auto max-h-96">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-gray-400">
                                Jest Unit Tests - {test.file}
                              </span>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    navigator.clipboard.writeText(test.script)
                                  }
                                  className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                  Copy Tests
                                </button>
                                <span className="text-xs text-gray-500">|</span>
                                <span className="text-xs text-orange-400">
                                  Coverage: {test.coverage}%
                                </span>
                              </div>
                            </div>
                            <pre className="text-xs overflow-x-auto">
                              <code>{test.script}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesResults;
