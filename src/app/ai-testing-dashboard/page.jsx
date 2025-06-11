"use client";
import React, { useState } from "react";
import {
  FileText,
  GitBranch,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Copy,
  MessageSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PullRequestView = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(
    "frontend/src/components/EmployeeForm.jsx"
  );
  const [expandedFiles, setExpandedFiles] = useState({
    "frontend/src/components/EmployeeForm.jsx": true,
    "backend/routes/employee.js": false,
    "frontend/src/pages/PayrollDashboard.jsx": false,
    "backend/models/Employee.js": false,
    "database/migrations/add_salary_history.sql": false,
    "backend/controllers/payrollController.js": false,
    "frontend/src/utils/salaryCalculations.js": false,
    "backend/middleware/auth.js": false,
  });

  const files = [
    {
      name: "frontend/src/components/EmployeeForm.jsx",
      status: "M",
      additions: 23,
      deletions: 8,
      type: "jsx",
    },
    {
      name: "backend/routes/employee.js",
      status: "M",
      additions: 45,
      deletions: 12,
      type: "js",
    },
    {
      name: "frontend/src/pages/PayrollDashboard.jsx",
      status: "A",
      additions: 156,
      deletions: 0,
      type: "jsx",
    },
    {
      name: "backend/models/Employee.js",
      status: "M",
      additions: 18,
      deletions: 5,
      type: "js",
    },
    {
      name: "database/migrations/add_salary_history.sql",
      status: "A",
      additions: 28,
      deletions: 0,
      type: "sql",
    },
    {
      name: "backend/controllers/payrollController.js",
      status: "A",
      additions: 67,
      deletions: 0,
      type: "js",
    },
    {
      name: "frontend/src/utils/salaryCalculations.js",
      status: "M",
      additions: 12,
      deletions: 3,
      type: "js",
    },
    {
      name: "backend/middleware/auth.js",
      status: "M",
      additions: 15,
      deletions: 3,
      type: "js",
    },
  ];

  const getFileContent = (fileName) => {
    switch (fileName) {
      case "frontend/src/components/EmployeeForm.jsx":
        return [
          {
            type: "context",
            content: 'import { useState, useEffect } from "react";',
            lineNum: 15,
          },
          {
            type: "context",
            content: "// Standard validation functions",
            lineNum: 16,
          },
          { type: "context", content: "", lineNum: 17 },
          {
            type: "context",
            content: "const EmployeeForm = ({ employee, onSubmit }) => {",
            lineNum: 18,
          },
          {
            type: "removed",
            content:
              '  const [salary, setSalary] = useState(employee?.salary || "");',
            lineNum: 19,
          },
          {
            type: "added",
            content:
              '  const [baseSalary, setBaseSalary] = useState(employee?.baseSalary || "");',
            lineNum: 19,
          },
          {
            type: "added",
            content:
              "  const [salaryHistory, setSalaryHistory] = useState([]);",
            lineNum: 20,
          },
          {
            type: "context",
            content:
              '  const [department, setDepartment] = useState(employee?.department || "");',
            lineNum: 21,
          },
          { type: "context", content: "", lineNum: 22 },
          { type: "added", content: "  useEffect(() => {", lineNum: 23 },
          { type: "added", content: "    if (employee?.id) {", lineNum: 24 },
          {
            type: "added",
            content: "      fetchSalaryHistory(employee.id);",
            lineNum: 25,
          },
          { type: "added", content: "    }", lineNum: 26 },
          { type: "added", content: "  }, [employee?.id]);", lineNum: 27 },
          { type: "context", content: "", lineNum: 28 },
          {
            type: "added",
            content: "  const fetchSalaryHistory = async (employeeId) => {",
            lineNum: 29,
          },
          { type: "added", content: "    try {", lineNum: 30 },
          {
            type: "added",
            content:
              "      const response = await fetch(`/api/employees/${employeeId}/salary-history`);",
            lineNum: 31,
          },
          {
            type: "added",
            content: "      const history = await response.json();",
            lineNum: 32,
          },
          {
            type: "added",
            content: "      setSalaryHistory(history);",
            lineNum: 33,
          },
          { type: "added", content: "    } catch (error) {", lineNum: 34 },
          {
            type: "added",
            content:
              '      console.error("Error fetching salary history:", error);',
            lineNum: 35,
          },
          { type: "added", content: "    }", lineNum: 36 },
          { type: "added", content: "  };", lineNum: 37 },
          { type: "context", content: "", lineNum: 38 },
          {
            type: "context",
            content: "  const handleSubmit = (e) => {",
            lineNum: 39,
          },
          { type: "context", content: "    e.preventDefault();", lineNum: 40 },
          {
            type: "removed",
            content: "    onSubmit({ ...employee, salary, department });",
            lineNum: 41,
          },
          {
            type: "added",
            content:
              "    onSubmit({ ...employee, baseSalary, department, salaryHistory });",
            lineNum: 41,
          },
          { type: "context", content: "  };", lineNum: 42 },
          { type: "context", content: "", lineNum: 43 },
          { type: "context", content: "  return (", lineNum: 44 },
          {
            type: "context",
            content: "    <form onSubmit={handleSubmit}>",
            lineNum: 45,
          },
          {
            type: "removed",
            content:
              '      <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />',
            lineNum: 46,
          },
          {
            type: "added",
            content:
              '      <input type="number" value={baseSalary} onChange={(e) => setBaseSalary(e.target.value)} />',
            lineNum: 46,
          },
          {
            type: "added",
            content: "      {salaryHistory.length > 0 && (",
            lineNum: 47,
          },
          {
            type: "added",
            content: '        <div className="salary-history">',
            lineNum: 48,
          },
          {
            type: "added",
            content: "          <h3>Salary History</h3>",
            lineNum: 49,
          },
          {
            type: "added",
            content: "          {salaryHistory.map(entry => (",
            lineNum: 50,
          },
          {
            type: "added",
            content:
              "            <div key={entry.id}>{entry.baseSalary} - {entry.effectiveDate}</div>",
            lineNum: 51,
          },
          { type: "added", content: "          ));}", lineNum: 52 },
          { type: "added", content: "        </div>", lineNum: 53 },
          { type: "added", content: "      )}", lineNum: 54 },
          { type: "context", content: "    </form>", lineNum: 55 },
          { type: "context", content: "  );", lineNum: 56 },
          { type: "context", content: "};", lineNum: 57 },
        ];

      case "backend/routes/employee.js":
        return [
          {
            type: "context",
            content: 'router.get("/employees", async (req, res) => {',
            lineNum: 45,
          },
          {
            type: "removed",
            content:
              '  const employees = await db.query("SELECT * FROM employees");',
            lineNum: 46,
          },
          {
            type: "added",
            content: "  const employees = await db.query(`",
            lineNum: 46,
          },
          {
            type: "added",
            content: "    SELECT e.*, sh.base_salary, sh.effective_date",
            lineNum: 47,
          },
          { type: "added", content: "    FROM employees e", lineNum: 48 },
          {
            type: "added",
            content: "    LEFT JOIN salary_history sh ON e.id = sh.employee_id",
            lineNum: 49,
          },
          {
            type: "added",
            content: "    WHERE sh.effective_date = (",
            lineNum: 50,
          },
          {
            type: "added",
            content: "      SELECT MAX(effective_date) FROM salary_history",
            lineNum: 51,
          },
          {
            type: "added",
            content: "      WHERE employee_id = e.id",
            lineNum: 52,
          },
          { type: "added", content: "    )", lineNum: 53 },
          { type: "added", content: "  `);", lineNum: 54 },
          { type: "context", content: "  res.json(employees);", lineNum: 55 },
          { type: "context", content: "});", lineNum: 56 },
          { type: "context", content: "", lineNum: 57 },
          {
            type: "added",
            content:
              'router.post("/employees/:id/salary", async (req, res) => {',
            lineNum: 58,
          },
          {
            type: "added",
            content:
              "  const { baseSalary, effectiveDate, reason } = req.body;",
            lineNum: 59,
          },
          { type: "added", content: "  await db.query(`", lineNum: 60 },
          {
            type: "added",
            content:
              "    INSERT INTO salary_history (employee_id, base_salary, effective_date, reason)",
            lineNum: 61,
          },
          {
            type: "added",
            content:
              "    VALUES (?, ?, ?, ?)`, [req.params.id, baseSalary, effectiveDate, reason]",
            lineNum: 62,
          },
          { type: "added", content: "  );", lineNum: 63 },
          {
            type: "added",
            content: '  res.json({ message: "Salary updated successfully" });',
            lineNum: 64,
          },
          { type: "added", content: "});", lineNum: 65 },
        ];

      case "frontend/src/pages/PayrollDashboard.jsx":
        return [
          {
            type: "added",
            content: 'import React, { useState, useEffect } from "react";',
            lineNum: 1,
          },
          {
            type: "added",
            content: "// Chart components would be imported here",
            lineNum: 2,
          },
          { type: "added", content: "", lineNum: 3 },
          {
            type: "added",
            content: "const PayrollDashboard = () => {",
            lineNum: 4,
          },
          {
            type: "added",
            content: "  const [payrollData, setPayrollData] = useState([]);",
            lineNum: 5,
          },
          {
            type: "added",
            content: "  const [totalGrossPay, setTotalGrossPay] = useState(0);",
            lineNum: 6,
          },
          {
            type: "added",
            content: "  const [totalNetPay, setTotalNetPay] = useState(0);",
            lineNum: 7,
          },
          { type: "added", content: "", lineNum: 8 },
          {
            type: "added",
            content: "  const calculatePayroll = (employee) => {",
            lineNum: 9,
          },
          {
            type: "added",
            content: "    const grossPay = employee.baseSalary;",
            lineNum: 10,
          },
          {
            type: "added",
            content: "    const taxes = grossPay * 0.25; // 25% tax rate",
            lineNum: 11,
          },
          {
            type: "added",
            content: "    const deductions = grossPay * 0.08; // 8% deductions",
            lineNum: 12,
          },
          {
            type: "added",
            content:
              "    return { grossPay, taxes, deductions, netPay: grossPay - taxes - deductions };",
            lineNum: 13,
          },
          { type: "added", content: "  };", lineNum: 14 },
          { type: "added", content: "", lineNum: 15 },
          { type: "added", content: "  useEffect(() => {", lineNum: 16 },
          { type: "added", content: "    fetchPayrollData();", lineNum: 17 },
          { type: "added", content: "  }, []);", lineNum: 18 },
          { type: "added", content: "", lineNum: 19 },
          {
            type: "added",
            content: "  const fetchPayrollData = async () => {",
            lineNum: 20,
          },
          { type: "added", content: "    try {", lineNum: 21 },
          {
            type: "added",
            content:
              '      const response = await fetch("/api/payroll/current");',
            lineNum: 22,
          },
          {
            type: "added",
            content: "      const data = await response.json();",
            lineNum: 23,
          },
          {
            type: "added",
            content: "      setPayrollData(data);",
            lineNum: 24,
          },
          { type: "added", content: "      ", lineNum: 25 },
          {
            type: "added",
            content: "      const totals = data.reduce((acc, curr) => ({",
            lineNum: 26,
          },
          {
            type: "added",
            content: "        gross: acc.gross + curr.grossPay,",
            lineNum: 27,
          },
          {
            type: "added",
            content: "        net: acc.net + curr.netPay",
            lineNum: 28,
          },
          {
            type: "added",
            content: "      }), { gross: 0, net: 0 });",
            lineNum: 29,
          },
          { type: "added", content: "      ", lineNum: 30 },
          {
            type: "added",
            content: "      setTotalGrossPay(totals.gross);",
            lineNum: 31,
          },
          {
            type: "added",
            content: "      setTotalNetPay(totals.net);",
            lineNum: 32,
          },
          { type: "added", content: "    } catch (error) {", lineNum: 33 },
          {
            type: "added",
            content:
              '      console.error("Error fetching payroll data:", error);',
            lineNum: 34,
          },
          { type: "added", content: "    }", lineNum: 35 },
          { type: "added", content: "  };", lineNum: 36 },
          { type: "added", content: "", lineNum: 37 },
          { type: "added", content: "  return (", lineNum: 38 },
          {
            type: "added",
            content: '    <div className="payroll-dashboard">',
            lineNum: 39,
          },
          {
            type: "added",
            content: '      <div className="dashboard-header">',
            lineNum: 40,
          },
          {
            type: "added",
            content: "        <h1>Payroll Management</h1>",
            lineNum: 41,
          },
          {
            type: "added",
            content: '        <div className="payroll-stats">',
            lineNum: 42,
          },
          {
            type: "added",
            content: '          <div className="stat-card">',
            lineNum: 43,
          },
          {
            type: "added",
            content: "            <h3>Total Gross Pay</h3>",
            lineNum: 44,
          },
          {
            type: "added",
            content: "            <p>${totalGrossPay.toLocaleString()}</p>",
            lineNum: 45,
          },
          { type: "added", content: "          </div>", lineNum: 46 },
          {
            type: "added",
            content: '          <div className="stat-card">',
            lineNum: 47,
          },
          {
            type: "added",
            content: "            <h3>Total Net Pay</h3>",
            lineNum: 48,
          },
          {
            type: "added",
            content: "            <p>${totalNetPay.toLocaleString()}</p>",
            lineNum: 49,
          },
          { type: "added", content: "          </div>", lineNum: 50 },
          { type: "added", content: "        </div>", lineNum: 51 },
          { type: "added", content: "      </div>", lineNum: 52 },
          { type: "added", content: "    </div>", lineNum: 53 },
          { type: "added", content: "  );", lineNum: 54 },
          { type: "added", content: "};", lineNum: 55 },
          { type: "added", content: "", lineNum: 56 },
          {
            type: "added",
            content: "export default PayrollDashboard;",
            lineNum: 57,
          },
        ];

      case "backend/models/Employee.js":
        return [
          {
            type: "context",
            content: "// Employee model definition",
            lineNum: 1,
          },
          {
            type: "context",
            content: 'const db = require("../config/database");',
            lineNum: 2,
          },
          { type: "context", content: "", lineNum: 3 },
          { type: "context", content: "const Employee = {", lineNum: 4 },
          { type: "context", content: '  tableName: "employees",', lineNum: 5 },
          { type: "context", content: "  fields: {", lineNum: 6 },
          {
            type: "context",
            content:
              '    firstName: { type: "VARCHAR(255)", allowNull: false },',
            lineNum: 7,
          },
          {
            type: "context",
            content:
              '    lastName: { type: "VARCHAR(255)", allowNull: false },',
            lineNum: 8,
          },
          {
            type: "context",
            content: '    email: { type: "VARCHAR(255)", unique: true },',
            lineNum: 9,
          },
          {
            type: "removed",
            content: '    salary: { type: "DECIMAL(10, 2)" },',
            lineNum: 10,
          },
          {
            type: "added",
            content: '    baseSalary: { type: "DECIMAL(10, 2)" },',
            lineNum: 10,
          },
          {
            type: "context",
            content: '    department: { type: "VARCHAR(255)" },',
            lineNum: 11,
          },
          {
            type: "context",
            content: '    position: { type: "VARCHAR(255)" },',
            lineNum: 12,
          },
          {
            type: "added",
            content:
              '    status: { type: "ENUM", values: ["Active", "On Leave", "Terminated"] },',
            lineNum: 13,
          },
          { type: "context", content: "  }", lineNum: 14 },
          { type: "context", content: "};", lineNum: 15 },
          { type: "context", content: "", lineNum: 16 },
          { type: "added", content: "// Define relationships", lineNum: 17 },
          { type: "added", content: "Employee.relationships = {", lineNum: 18 },
          { type: "added", content: "  salaryHistory: {", lineNum: 19 },
          { type: "added", content: '    type: "hasMany",', lineNum: 20 },
          {
            type: "added",
            content: '    foreignKey: "employee_id",',
            lineNum: 21,
          },
          {
            type: "added",
            content: '    table: "salary_history"',
            lineNum: 22,
          },
          { type: "added", content: "  }", lineNum: 23 },
          { type: "added", content: "};", lineNum: 24 },
          { type: "added", content: "", lineNum: 25 },
          { type: "added", content: "module.exports = Employee;", lineNum: 26 },
        ];

      case "database/migrations/add_salary_history.sql":
        return [
          {
            type: "added",
            content: "CREATE TABLE salary_history (",
            lineNum: 1,
          },
          { type: "added", content: "  id SERIAL PRIMARY KEY,", lineNum: 2 },
          {
            type: "added",
            content: "  employee_id INTEGER NOT NULL,",
            lineNum: 3,
          },
          {
            type: "added",
            content: "  base_salary DECIMAL(10,2) NOT NULL,",
            lineNum: 4,
          },
          {
            type: "added",
            content: "  effective_date DATE NOT NULL,",
            lineNum: 5,
          },
          { type: "added", content: "  reason VARCHAR(255),", lineNum: 6 },
          {
            type: "added",
            content: "  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,",
            lineNum: 7,
          },
          {
            type: "added",
            content: "  FOREIGN KEY (employee_id) REFERENCES employees(id)",
            lineNum: 8,
          },
          { type: "added", content: ");", lineNum: 9 },
          { type: "added", content: "", lineNum: 10 },
          {
            type: "added",
            content:
              "CREATE INDEX idx_salary_history_employee_id ON salary_history(employee_id);",
            lineNum: 11,
          },
          {
            type: "added",
            content:
              "CREATE INDEX idx_salary_history_effective_date ON salary_history(effective_date);",
            lineNum: 12,
          },
          { type: "added", content: "", lineNum: 13 },
          { type: "added", content: "-- Add some sample data", lineNum: 14 },
          {
            type: "added",
            content:
              "INSERT INTO salary_history (employee_id, base_salary, effective_date, reason)",
            lineNum: 15,
          },
          { type: "added", content: "VALUES ", lineNum: 16 },
          {
            type: "added",
            content:
              '  (1, 95000.00, "2024-01-01", "Annual salary adjustment"),',
            lineNum: 17,
          },
          {
            type: "added",
            content:
              '  (2, 75000.00, "2024-01-01", "Annual salary adjustment"),',
            lineNum: 18,
          },
          {
            type: "added",
            content:
              '  (3, 65000.00, "2024-01-01", "Annual salary adjustment");',
            lineNum: 19,
          },
        ];

      case "backend/controllers/payrollController.js":
        return [
          {
            type: "added",
            content: 'const express = require("express");',
            lineNum: 1,
          },
          {
            type: "added",
            content: "const router = express.Router();",
            lineNum: 2,
          },
          { type: "added", content: "", lineNum: 3 },
          {
            type: "added",
            content: "const calculateTaxes = (grossPay) => {",
            lineNum: 4,
          },
          {
            type: "added",
            content: "  // Progressive tax calculation",
            lineNum: 5,
          },
          {
            type: "added",
            content: "  if (grossPay <= 50000) return grossPay * 0.15;",
            lineNum: 6,
          },
          {
            type: "added",
            content:
              "  if (grossPay <= 100000) return 7500 + (grossPay - 50000) * 0.20;",
            lineNum: 7,
          },
          {
            type: "added",
            content: "  return 17500 + (grossPay - 100000) * 0.25;",
            lineNum: 8,
          },
          { type: "added", content: "};", lineNum: 9 },
          { type: "added", content: "", lineNum: 10 },
          {
            type: "added",
            content: "const calculateDeductions = (employee) => {",
            lineNum: 11,
          },
          {
            type: "added",
            content: "  const healthInsurance = employee.baseSalary * 0.03;",
            lineNum: 12,
          },
          {
            type: "added",
            content: "  const retirement401k = employee.baseSalary * 0.05;",
            lineNum: 13,
          },
          {
            type: "added",
            content: "  return healthInsurance + retirement401k;",
            lineNum: 14,
          },
          { type: "added", content: "};", lineNum: 15 },
          { type: "added", content: "", lineNum: 16 },
          {
            type: "added",
            content: "const getCurrentPayroll = async (req, res) => {",
            lineNum: 17,
          },
          { type: "added", content: "  try {", lineNum: 18 },
          {
            type: "added",
            content: "    const employees = await db.query(`",
            lineNum: 19,
          },
          {
            type: "added",
            content: "      SELECT e.*, sh.base_salary FROM employees e",
            lineNum: 20,
          },
          {
            type: "added",
            content:
              "      LEFT JOIN salary_history sh ON e.id = sh.employee_id",
            lineNum: 21,
          },
          { type: "added", content: "    `);", lineNum: 22 },
          { type: "added", content: "    ", lineNum: 23 },
          {
            type: "added",
            content: "    const payrollData = employees.map(employee => {",
            lineNum: 24,
          },
          {
            type: "added",
            content: "      const grossPay = employee.base_salary;",
            lineNum: 25,
          },
          {
            type: "added",
            content: "      const taxes = calculateTaxes(grossPay);",
            lineNum: 26,
          },
          {
            type: "added",
            content: "      const deductions = calculateDeductions(employee);",
            lineNum: 27,
          },
          {
            type: "added",
            content: "      const netPay = grossPay - taxes - deductions;",
            lineNum: 28,
          },
          {
            type: "added",
            content:
              "      return { employee, grossPay, taxes, deductions, netPay };",
            lineNum: 29,
          },
          { type: "added", content: "    });", lineNum: 30 },
          { type: "added", content: "    ", lineNum: 31 },
          { type: "added", content: "    res.json(payrollData);", lineNum: 32 },
          { type: "added", content: "  } catch (error) {", lineNum: 33 },
          {
            type: "added",
            content: "    res.status(500).json({ error: error.message });",
            lineNum: 34,
          },
          { type: "added", content: "  }", lineNum: 35 },
          { type: "added", content: "};", lineNum: 36 },
          { type: "added", content: "", lineNum: 37 },
          {
            type: "added",
            content:
              "module.exports = { getCurrentPayroll, calculateTaxes, calculateDeductions };",
            lineNum: 38,
          },
        ];

      case "frontend/src/utils/salaryCalculations.js":
        return [
          {
            type: "added",
            content: "// Salary calculation utilities",
            lineNum: 1,
          },
          { type: "added", content: "", lineNum: 2 },
          {
            type: "added",
            content:
              "export const calculateGrossPay = (baseSalary, overtime = 0, bonuses = 0) => {",
            lineNum: 3,
          },
          {
            type: "added",
            content: "  return baseSalary + overtime + bonuses;",
            lineNum: 4,
          },
          { type: "added", content: "};", lineNum: 5 },
          { type: "added", content: "", lineNum: 6 },
          {
            type: "removed",
            content: "export const calculateTaxes = (grossPay) => {",
            lineNum: 7,
          },
          {
            type: "removed",
            content: "  return grossPay * 0.25; // Simple 25% tax",
            lineNum: 8,
          },
          { type: "removed", content: "};", lineNum: 9 },
          {
            type: "added",
            content: "export const calculateTaxes = (grossPay) => {",
            lineNum: 7,
          },
          {
            type: "added",
            content: "  // Progressive tax calculation",
            lineNum: 8,
          },
          {
            type: "added",
            content: "  if (grossPay <= 50000) return grossPay * 0.15;",
            lineNum: 9,
          },
          {
            type: "added",
            content:
              "  if (grossPay <= 100000) return 7500 + (grossPay - 50000) * 0.20;",
            lineNum: 10,
          },
          {
            type: "added",
            content: "  return 17500 + (grossPay - 100000) * 0.25;",
            lineNum: 11,
          },
          { type: "added", content: "};", lineNum: 12 },
          { type: "added", content: "", lineNum: 13 },
          {
            type: "added",
            content: "export const calculateDeductions = (employee) => {",
            lineNum: 14,
          },
          {
            type: "added",
            content: "  const healthInsurance = employee.baseSalary * 0.03;",
            lineNum: 15,
          },
          {
            type: "added",
            content: "  const retirement401k = employee.baseSalary * 0.05;",
            lineNum: 16,
          },
          {
            type: "added",
            content: "  return healthInsurance + retirement401k;",
            lineNum: 17,
          },
          { type: "added", content: "};", lineNum: 18 },
        ];

      case "backend/middleware/auth.js":
        return [
          {
            type: "context",
            content: 'const jwt = require("jsonwebtoken");',
            lineNum: 1,
          },
          { type: "context", content: "", lineNum: 2 },
          {
            type: "context",
            content: "const authenticateToken = (req, res, next) => {",
            lineNum: 3,
          },
          {
            type: "context",
            content: '  const authHeader = req.headers["authorization"];',
            lineNum: 4,
          },
          {
            type: "context",
            content: '  const token = authHeader && authHeader.split(" ")[1];',
            lineNum: 5,
          },
          { type: "context", content: "", lineNum: 6 },
          {
            type: "removed",
            content: "  if (!token) return res.sendStatus(401);",
            lineNum: 7,
          },
          { type: "added", content: "  if (!token) {", lineNum: 7 },
          {
            type: "added",
            content:
              '    return res.status(401).json({ error: "Access token required" });',
            lineNum: 8,
          },
          { type: "added", content: "  }", lineNum: 9 },
          { type: "context", content: "", lineNum: 10 },
          {
            type: "context",
            content:
              "  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {",
            lineNum: 11,
          },
          {
            type: "removed",
            content: "    if (err) return res.sendStatus(403);",
            lineNum: 12,
          },
          { type: "added", content: "    if (err) {", lineNum: 12 },
          {
            type: "added",
            content:
              '      return res.status(403).json({ error: "Invalid or expired token" });',
            lineNum: 13,
          },
          { type: "added", content: "    }", lineNum: 14 },
          { type: "context", content: "    req.user = user;", lineNum: 15 },
          { type: "context", content: "    next();", lineNum: 16 },
          { type: "context", content: "  });", lineNum: 17 },
          { type: "context", content: "};", lineNum: 18 },
          { type: "context", content: "", lineNum: 19 },
          {
            type: "added",
            content: "const authorizeRole = (allowedRoles) => {",
            lineNum: 20,
          },
          {
            type: "added",
            content: "  return (req, res, next) => {",
            lineNum: 21,
          },
          {
            type: "added",
            content: "    if (!allowedRoles.includes(req.user.role)) {",
            lineNum: 22,
          },
          {
            type: "added",
            content:
              '      return res.status(403).json({ error: "Insufficient permissions" });',
            lineNum: 23,
          },
          { type: "added", content: "    }", lineNum: 24 },
          { type: "added", content: "    next();", lineNum: 25 },
          { type: "added", content: "  };", lineNum: 26 },
          { type: "added", content: "};", lineNum: 27 },
        ];

      default:
        return [
          { type: "context", content: `// File: ${fileName}`, lineNum: 1 },
          {
            type: "context",
            content: "// This file has changes but content is not yet defined",
            lineNum: 2,
          },
          {
            type: "added",
            content: "// TODO: Add specific code changes for this file",
            lineNum: 3,
          },
          { type: "context", content: "", lineNum: 4 },
          {
            type: "context",
            content: "// Available files in switch statement:",
            lineNum: 5,
          },
          {
            type: "context",
            content: "// - frontend/src/components/EmployeeForm.jsx",
            lineNum: 6,
          },
          {
            type: "context",
            content: "// - backend/routes/employee.js",
            lineNum: 7,
          },
          {
            type: "context",
            content: "// - frontend/src/pages/PayrollDashboard.jsx",
            lineNum: 8,
          },
          {
            type: "context",
            content: "// - backend/models/Employee.js",
            lineNum: 9,
          },
          {
            type: "context",
            content: "// - database/migrations/add_salary_history.sql",
            lineNum: 10,
          },
          {
            type: "context",
            content: "// - backend/controllers/payrollController.js",
            lineNum: 11,
          },
          {
            type: "context",
            content: "// - frontend/src/utils/salaryCalculations.js",
            lineNum: 12,
          },
          {
            type: "context",
            content: "// - backend/middleware/auth.js",
            lineNum: 13,
          },
        ];
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "A":
        return "text-green-600 bg-green-100";
      case "M":
        return "text-yellow-600 bg-yellow-100";
      case "D":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "A":
        return "Added";
      case "M":
        return "Modified";
      case "D":
        return "Deleted";
      default:
        return "Unknown";
    }
  };

  const toggleFile = (fileName) => {
    setExpandedFiles((prev) => ({
      ...prev,
      [fileName]: !prev[fileName],
    }));
  };

  const handleClick = () => {
    router.push("/ai-test-result");
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center space-x-4">
              <GitBranch className="w-6 h-6 text-gray-600" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  feat: Add salary history tracking and payroll dashboard
                </h1>
                <p className="text-sm text-gray-600">
                  Pull request #341 • wanting to merge 12 commits into main from
                  feature/salary-history
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-700">8 checks passing</span>
                </div>
                <div className="text-gray-600">
                  <span className="text-green-600 font-medium">+364</span>
                  <span className="mx-1">additions</span>
                  <span className="text-red-600 font-medium">-31</span>
                  <span className="mx-1">deletions</span>
                </div>
              </div>
              <button
                onClick={handleClick}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                Execute test cases
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* File Tree */}
          <div className="w-80 bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900">
                Changed Files ({files.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {files.map((file) => (
                <div
                  key={file.name}
                  className={`p-3 cursor-pointer hover:bg-gray-50 ${
                    selectedFile === file.name
                      ? "bg-blue-50 border-r-2 border-blue-500"
                      : ""
                  }`}
                  onClick={() => setSelectedFile(file.name)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span className="text-sm text-gray-900 truncate">
                        {file.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getStatusColor(
                          file.status
                        )}`}
                      >
                        {file.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                    {file.additions > 0 && (
                      <span className="text-green-600">+{file.additions}</span>
                    )}
                    {file.deletions > 0 && (
                      <span className="text-red-600">-{file.deletions}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code Diff */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleFile(selectedFile)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-900"
                  >
                    {expandedFiles[selectedFile] ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <span>{selectedFile}</span>
                  </button>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                      files.find((f) => f.name === selectedFile)?.status
                    )}`}
                  >
                    {getStatusText(
                      files.find((f) => f.name === selectedFile)?.status
                    )}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {expandedFiles[selectedFile] && (
              <div className="bg-gray-50">
                <div className="p-4">
                  <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 border-b border-gray-200">
                      {selectedFile}
                    </div>
                    <div className="font-mono text-sm">
                      {(() => {
                        const content = getFileContent(selectedFile);
                        console.log(
                          "Selected file:",
                          selectedFile,
                          "Content length:",
                          content.length
                        );

                        if (!content || content.length === 0) {
                          return (
                            <div className="p-4 text-gray-500 text-center">
                              <p>No content available for: "{selectedFile}"</p>
                              <p className="text-xs mt-1">
                                Debug: File content empty
                              </p>
                            </div>
                          );
                        }

                        return content.map((line, index) => (
                          <div
                            key={index}
                            className={`flex ${
                              line.type === "added"
                                ? "bg-green-50"
                                : line.type === "removed"
                                ? "bg-red-50"
                                : ""
                            }`}
                          >
                            <div className="bg-gray-50 px-3 py-1 text-gray-400 text-right w-12 border-r border-gray-200">
                              {line.lineNum}
                            </div>
                            <div className="flex-1 px-4 py-1">
                              {line.type === "added" && (
                                <span className="text-green-700">+ </span>
                              )}
                              {line.type === "removed" && (
                                <span className="text-red-700">- </span>
                              )}
                              {line.type === "context" && (
                                <span className="text-gray-600"> </span>
                              )}
                              <span>{line.content}</span>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PullRequestView;
