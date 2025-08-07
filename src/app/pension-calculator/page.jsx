"use client"
import React, { useState, useEffect } from 'react';
import { Search, User, Calculator, FileText, Send, Save, Clock, CheckCircle, AlertCircle, DollarSign, Calendar, Briefcase, TrendingUp, Eye, Download } from 'lucide-react';

const PensionCalculator = () => {
  const [memberData, setMemberData] = useState(null);
  const [memberId, setMemberId] = useState('');
  const [calculationResults, setCalculationResults] = useState(null);
  const [selectedScheme, setSelectedScheme] = useState('');
  const [manualInputs, setManualInputs] = useState({
    retirementAge: '',
    commutationPercentage: '',
    pensionStartDate: ''
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  // Mock member database
  const memberDatabase = {
    'EMP001': {
      memberID: 'EMP001',
      firstName: 'John',
      lastName: 'Smith',
      dateOfBirth: '1968-03-15',
      dateOfJoining: '1995-06-01',
      currentAge: 56,
      yearsOfService: 29,
      currentSalary: 85000,
      finalAverageSalary: 82500,
      gender: 'Male',
      maritalStatus: 'Married',
      department: 'Engineering',
      schemes: ['401(k)', 'Traditional DB'],
      pensionAccrued: 45000,
      contributionHistory: 325000,
      status: 'Active'
    },
    'EMP002': {
      memberID: 'EMP002',
      firstName: 'Sarah',
      lastName: 'Johnson',
      dateOfBirth: '1975-11-20',
      dateOfJoining: '2000-02-15',
      currentAge: 49,
      yearsOfService: 24,
      currentSalary: 75000,
      finalAverageSalary: 73000,
      gender: 'Female',
      maritalStatus: 'Single',
      department: 'Finance',
      schemes: ['Traditional DB'],
      pensionAccrued: 35000,
      contributionHistory: 285000,
      status: 'Active'
    },
    'EMP003': {
      memberID: 'EMP003',
      firstName: 'Robert',
      lastName: 'Chen',
      dateOfBirth: '1963-08-10',
      dateOfJoining: '1988-09-01',
      currentAge: 61,
      yearsOfService: 36,
      currentSalary: 95000,
      finalAverageSalary: 92000,
      gender: 'Male',
      maritalStatus: 'Married',
      department: 'Management',
      schemes: ['Traditional DB', 'Cash Balance'],
      pensionAccrued: 65000,
      contributionHistory: 450000,
      status: 'Pre-Retirement'
    }
  };

  // Mock approved calculation logics from Actuary Dashboard
  const approvedLogics = {
    'Traditional DB + Normal Retirement': {
      formula: 'Final_Average_Salary * 0.015 * Years_Of_Service + Annual_Increase_Adjustment',
      factors: {
        accrualRate: 0.015,
        annualIncrease: 0.03
      }
    },
    '401(k) + Early Retirement': {
      formula: 'Base_Pension * 0.85 * min(Service_Years / 30, 1.0) * (1 - Age_Reduction)',
      factors: {
        earlyRetirementFactor: 0.85,
        ageReductionRate: 0.005
      }
    },
    'Cash Commutation': {
      formula: 'Lump_Sum = Annual_Pension * 12.5 * Commutation_Percentage',
      factors: {
        commutationFactor: 12.5,
        maxCommutation: 0.25
      }
    }
  };

  const fetchMemberData = () => {
    if (memberDatabase[memberId]) {
      setMemberData(memberDatabase[memberId]);
      setSelectedScheme(memberDatabase[memberId].schemes[0]);
    } else {
      setMemberData(null);
      alert('Member not found');
    }
  };

  const calculatePension = () => {
    if (!memberData) return;

    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const retirementAge = parseInt(manualInputs.retirementAge) || 65;
      const commutationPercentage = parseFloat(manualInputs.commutationPercentage) || 0;
      
      let results = {};

      // Determine applicable scenarios
      const scenarios = [];
      let primaryScenario = '';
      let isEarlyRetirement = retirementAge < 65;
      let isLateRetirement = retirementAge > 65;
      let isDisability = memberData.status === 'Disability';
      let isPreGMP = new Date(memberData.dateOfJoining) < new Date('2006-04-06');

      if (selectedScheme === 'Traditional DB') {
        // Determine primary scenario
        if (isDisability) {
          primaryScenario = 'Traditional DB + Disability Retirement';
          scenarios.push('Disability enhancement applied', 'Medical allowance included');
        } else if (isEarlyRetirement) {
          primaryScenario = 'Traditional DB + Early Retirement';
          scenarios.push('Early retirement penalty applied', `${65 - retirementAge} years before normal retirement`);
        } else if (isLateRetirement) {
          primaryScenario = 'Traditional DB + Late Retirement';
          scenarios.push('Late retirement enhancement applied');
        } else {
          primaryScenario = 'Traditional DB + Normal Retirement';
          scenarios.push('Standard accrual rate applied');
        }

        if (isPreGMP) {
          scenarios.push('Pre-2006 joiner enhanced benefits', 'GMP top-up applicable');
        }

        // Base calculation
        let accrualRate = isPreGMP ? 0.0167 : 0.015;
        let baseAnnualPension = memberData.finalAverageSalary * accrualRate * memberData.yearsOfService;
        
        // Apply scenario-specific adjustments
        let adjustedPension = baseAnnualPension;
        let adjustments = [];

        if (isEarlyRetirement) {
          const earlyRetirementReduction = (65 - retirementAge) * 0.005;
          adjustedPension *= (1 - earlyRetirementReduction);
          adjustments.push({
            factor: 'Early Retirement Reduction',
            value: `-${(earlyRetirementReduction * 100).toFixed(1)}%`,
            amount: -(baseAnnualPension * earlyRetirementReduction),
            description: `0.5% reduction per year before age 65`
          });
        }

        if (isLateRetirement) {
          const lateRetirementBonus = (retirementAge - 65) * 0.008;
          adjustedPension *= (1 + lateRetirementBonus);
          adjustments.push({
            factor: 'Late Retirement Enhancement',
            value: `+${(lateRetirementBonus * 100).toFixed(1)}%`,
            amount: baseAnnualPension * lateRetirementBonus,
            description: `0.8% enhancement per year after age 65`
          });
        }

        if (isPreGMP) {
          const gmpTopUp = 2500; // Annual GMP top-up
          adjustedPension += gmpTopUp;
          adjustments.push({
            factor: 'GMP Top-Up',
            value: '+$2,500',
            amount: gmpTopUp,
            description: 'Guaranteed Minimum Pension enhancement for pre-2006 joiners'
          });
        }

        // Annual increase adjustment
        const annualIncrease = adjustedPension * 0.03;
        adjustments.push({
          factor: 'Annual Increase Provision',
          value: '+3.0%',
          amount: annualIncrease,
          description: 'Built-in annual pension increase'
        });

        results.option1 = {
          type: 'Traditional DB Pension',
          scenario: primaryScenario,
          applicableScenarios: scenarios,
          annualAmount: adjustedPension,
          monthlyAmount: adjustedPension / 12,
          calculationSteps: [
            {
              step: 1,
              description: 'Base Pension Calculation',
              formula: 'Final Average Salary × Accrual Rate × Years of Service',
              calculation: `${memberData.finalAverageSalary.toLocaleString()} × ${(accrualRate * 100).toFixed(2)}% × ${memberData.yearsOfService}`,
              result: baseAnnualPension
            },
            ...adjustments.map((adj, index) => ({
              step: index + 2,
              description: adj.factor,
              formula: adj.description,
              calculation: adj.value,
              result: adj.amount
            })),
            {
              step: adjustments.length + 2,
              description: 'Final Annual Pension',
              formula: 'Base Pension + All Adjustments',
              calculation: 'See breakdown above',
              result: adjustedPension
            }
          ],
          factors: {
            finalAverageSalary: memberData.finalAverageSalary,
            accrualRate: `${(accrualRate * 100).toFixed(2)}%`,
            yearsOfService: memberData.yearsOfService,
            retirementAge: retirementAge,
            memberStatus: memberData.status,
            joiningDate: memberData.dateOfJoining,
            preGMPMember: isPreGMP ? 'Yes' : 'No'
          },
          adjustments: adjustments,
          logicVersion: isPreGMP ? 'Pre-2006 Joiner Benefits v2.3' : 'Traditional DB Normal Retirement v3.1'
        };

        // Cash commutation option
        if (commutationPercentage > 0) {
          const commutationFactor = 12.5;
          const maxCommutation = 25;
          const actualCommutation = Math.min(commutationPercentage, maxCommutation);
          const lumpSum = adjustedPension * commutationFactor * (actualCommutation / 100);
          const remainingPension = adjustedPension * (1 - actualCommutation / 100);
          
          const commutationSteps = [
            {
              step: 1,
              description: 'Commutable Amount',
              formula: 'Annual Pension × Commutation %',
              calculation: `${adjustedPension.toFixed(0)} × ${actualCommutation}%`,
              result: adjustedPension * (actualCommutation / 100)
            },
            {
              step: 2,
              description: 'Lump Sum Calculation',
              formula: 'Commutable Amount × Actuarial Factor',
              calculation: `${(adjustedPension * (actualCommutation / 100)).toFixed(0)} × ${commutationFactor}`,
              result: lumpSum
            },
            {
              step: 3,
              description: 'Remaining Annual Pension',
              formula: 'Original Pension - Commuted Portion',
              calculation: `${adjustedPension.toFixed(0)} × ${(100 - actualCommutation)}%`,
              result: remainingPension
            }
          ];

          results.option2 = {
            type: 'Partial Cash Commutation',
            scenario: 'Cash Commutation Calculation v2.0',
            applicableScenarios: [
              'Standard actuarial commutation factor applied',
              `${actualCommutation}% of pension converted to lump sum`,
              commutationPercentage > maxCommutation ? `Capped at maximum ${maxCommutation}%` : 'Within allowable limits'
            ],
            lumpSum: lumpSum,
            annualAmount: remainingPension,
            monthlyAmount: remainingPension / 12,
            commutationPercentage: actualCommutation,
            calculationSteps: commutationSteps,
            factors: {
              commutationFactor: commutationFactor,
              commutationPercentage: `${actualCommutation}%`,
              maxAllowedCommutation: `${maxCommutation}%`,
              taxThreshold: '$100,000',
              taxStatus: lumpSum > 100000 ? 'Tax applicable on excess' : 'No additional tax',
              remainingPensionPercentage: `${(100 - actualCommutation)}%`
            },
            adjustments: [],
            logicVersion: 'Cash Commutation Calculation v2.0'
          };
        }

      } else if (selectedScheme === '401(k)') {
        // 401(k) scenario determination
        if (isEarlyRetirement) {
          primaryScenario = '401(k) + Early Retirement';
          scenarios.push('Early retirement factor applied', 'Service factor adjustment', 'Age reduction penalty');
        } else {
          primaryScenario = '401(k) + Normal Distribution';
          scenarios.push('Standard withdrawal rate applied');
        }

        const basePension = memberData.contributionHistory * 0.05;
        const earlyRetirementFactor = 0.85;
        const serviceFactor = Math.min(memberData.yearsOfService / 30, 1.0);
        let adjustedPension = basePension * earlyRetirementFactor * serviceFactor;
        
        let adjustments = [
          {
            factor: 'Early Retirement Factor',
            value: '85%',
            amount: basePension * (earlyRetirementFactor - 1),
            description: 'Standard early retirement reduction for 401(k) plans'
          },
          {
            factor: 'Service Factor',
            value: serviceFactor.toFixed(3),
            amount: basePension * earlyRetirementFactor * (serviceFactor - 1),
            description: `Service years (${memberData.yearsOfService}) divided by maximum (30)`
          }
        ];

        if (isEarlyRetirement) {
          const ageReduction = (65 - retirementAge) * 0.005;
          adjustedPension *= (1 - ageReduction);
          adjustments.push({
            factor: 'Age Reduction',
            value: `-${(ageReduction * 100).toFixed(1)}%`,
            amount: -(basePension * earlyRetirementFactor * serviceFactor * ageReduction),
            description: `0.5% reduction per year before age 65`
          });
        }

        results.option1 = {
          type: '401(k) Distribution',
          scenario: primaryScenario,
          applicableScenarios: scenarios,
          annualAmount: adjustedPension,
          monthlyAmount: adjustedPension / 12,
          totalBalance: memberData.contributionHistory,
          calculationSteps: [
            {
              step: 1,
              description: 'Base Annual Distribution',
              formula: 'Total Balance × 5% Withdrawal Rate',
              calculation: `${memberData.contributionHistory.toLocaleString()} × 5%`,
              result: basePension
            },
            {
              step: 2,
              description: 'Apply Early Retirement Factor',
              formula: 'Base Distribution × Early Retirement Factor',
              calculation: `${basePension.toFixed(0)} × 85%`,
              result: basePension * earlyRetirementFactor
            },
            {
              step: 3,
              description: 'Apply Service Factor',
              formula: 'Adjusted Distribution × Service Factor',
              calculation: `${(basePension * earlyRetirementFactor).toFixed(0)} × ${serviceFactor.toFixed(3)}`,
              result: basePension * earlyRetirementFactor * serviceFactor
            }
          ],
          factors: {
            totalBalance: memberData.contributionHistory,
            withdrawalRate: '5.0%',
            earlyRetirementFactor: '85%',
            serviceFactor: serviceFactor.toFixed(3),
            yearsOfService: memberData.yearsOfService,
            maxServiceYears: 30,
            retirementAge: retirementAge,
            ageReduction: isEarlyRetirement ? `${((65 - retirementAge) * 0.5).toFixed(1)}%` : '0%'
          },
          adjustments: adjustments,
          logicVersion: '401(k) Early Retirement - Age 55-60 v1.2'
        };
      }

      setCalculationResults(results);
      setIsCalculating(false);

      // Add to calculation history
      const newCalculation = {
        id: Date.now(),
        memberID: memberData.memberID,
        memberName: `${memberData.firstName} ${memberData.lastName}`,
        scheme: selectedScheme,
        calculationDate: new Date().toISOString().split('T')[0],
        retirementAge: retirementAge,
        results: results,
        status: 'Draft'
      };
      setCalculationHistory(prev => [newCalculation, ...prev]);
    }, 2000);
  };

  const sendToChecker = () => {
    if (calculationHistory.length > 0) {
      const updatedHistory = [...calculationHistory];
      updatedHistory[0].status = 'Pending Review';
      updatedHistory[0].submittedDate = new Date().toISOString().split('T')[0];
      setCalculationHistory(updatedHistory);
      alert('Calculation sent to checker for approval');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="h-screen overflow-auto bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pension Calculator</h1>
              <p className="text-gray-600 mt-1">Calculate individual pension benefits and scenarios</p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
                <Save className="w-4 h-4" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'calculator', label: 'Calculator', icon: Calculator },
              { id: 'history', label: 'Calculation History', icon: FileText }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {activeTab === 'calculator' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Member Lookup & Data */}
            <div className="lg:col-span-1 space-y-6">
              {/* Member Search */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Member Lookup</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Member/Employee ID</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter Member ID (e.g., EMP001)"
                      />
                      <button
                        onClick={fetchMemberData}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Search className="w-4 h-4" />
                        <span>Fetch</span>
                      </button>
                    </div>
                  </div>
                  
                  {memberData && (
                    <div className="border-t pt-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{memberData.firstName} {memberData.lastName}</h3>
                          <p className="text-sm text-gray-600">{memberData.memberID}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Age:</span>
                          <span className="ml-2 font-medium">{memberData.currentAge}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Service:</span>
                          <span className="ml-2 font-medium">{memberData.yearsOfService} years</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Department:</span>
                          <span className="ml-2 font-medium">{memberData.department}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Status:</span>
                          <span className="ml-2 font-medium">{memberData.status}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">Final Avg Salary:</span>
                          <span className="ml-2 font-medium">{formatCurrency(memberData.finalAverageSalary)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Manual Inputs */}
              {memberData && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Calculation Parameters</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pension Scheme</label>
                      <select
                        value={selectedScheme}
                        onChange={(e) => setSelectedScheme(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {memberData.schemes.map(scheme => (
                          <option key={scheme} value={scheme}>{scheme}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Retirement Age</label>
                      <input
                        type="number"
                        value={manualInputs.retirementAge}
                        onChange={(e) => setManualInputs({...manualInputs, retirementAge: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="65"
                        min="55"
                        max="70"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cash Commutation %</label>
                      <input
                        type="number"
                        value={manualInputs.commutationPercentage}
                        onChange={(e) => setManualInputs({...manualInputs, commutationPercentage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                        min="0"
                        max="25"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Pension Start Date</label>
                      <input
                        type="date"
                        value={manualInputs.pensionStartDate}
                        onChange={(e) => setManualInputs({...manualInputs, pensionStartDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <button
                      onClick={calculatePension}
                      disabled={isCalculating}
                      className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2 disabled:opacity-50"
                    >
                      {isCalculating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Calculating...</span>
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4" />
                          <span>Calculate Pension</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Panel - Calculation Results */}
            <div className="lg:col-span-2">
              {calculationResults ? (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Calculation Results</h2>
                        <button
                          onClick={sendToChecker}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <Send className="w-4 h-4" />
                          <span>Send to Checker</span>
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Scenario Overview */}
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-blue-900 mb-2">Applied Calculation Scenarios</h3>
                        <div className="space-y-2">
                          {calculationResults.option1?.applicableScenarios?.map((scenario, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                              <span className="text-sm text-blue-800">{scenario}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 text-xs text-blue-700">
                          <strong>Logic Version:</strong> {calculationResults.option1?.logicVersion}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {/* Option 1 */}
                        {calculationResults.option1 && (
                          <div className="border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                              <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="text-blue-600 font-bold">1</span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{calculationResults.option1.type}</h3>
                                  <p className="text-sm text-gray-600">{calculationResults.option1.scenario}</p>
                                </div>
                              </div>
                              
                              <div className="bg-green-50 p-4 rounded-lg">
                                <div className="text-center">
                                  <p className="text-sm text-green-600 mb-1">Annual Pension</p>
                                  <p className="text-2xl font-bold text-green-800">{formatCurrency(calculationResults.option1.annualAmount)}</p>
                                  <p className="text-sm text-green-600">Monthly: {formatCurrency(calculationResults.option1.monthlyAmount)}</p>
                                </div>
                              </div>
                            </div>

                            {/* Calculation Steps */}
                            <div className="p-6 border-b border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-4">Step-by-Step Calculation</h4>
                              <div className="space-y-3">
                                {calculationResults.option1.calculationSteps?.map((step, index) => (
                                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center space-x-2">
                                        <span className="w-6 h-6 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                          {step.step}
                                        </span>
                                        <span className="font-medium text-gray-900">{step.description}</span>
                                      </div>
                                      <span className="font-bold text-gray-900">{formatCurrency(step.result)}</span>
                                    </div>
                                    <div className="ml-8">
                                      <p className="text-sm text-gray-600 mb-1">{step.formula}</p>
                                      <p className="text-sm font-mono text-gray-800">{step.calculation}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Adjustments Applied */}
                            {calculationResults.option1.adjustments && calculationResults.option1.adjustments.length > 0 && (
                              <div className="p-6 border-b border-gray-200">
                                <h4 className="font-semibold text-gray-900 mb-4">Adjustments Applied</h4>
                                <div className="space-y-2">
                                  {calculationResults.option1.adjustments.map((adjustment, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                      <div>
                                        <span className="font-medium text-sm">{adjustment.factor}</span>
                                        <p className="text-xs text-gray-600">{adjustment.description}</p>
                                      </div>
                                      <div className="text-right">
                                        <span className={`font-bold text-sm ${adjustment.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                          {adjustment.value}
                                        </span>
                                        <p className="text-xs text-gray-600">{formatCurrency(Math.abs(adjustment.amount))}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Detailed Factors */}
                            <div className="p-6">
                              <h4 className="font-semibold text-gray-900 mb-3">Calculation Factors</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {Object.entries(calculationResults.option1.factors).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="font-medium">{typeof value === 'number' ? formatCurrency(value) : value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Option 2 */}
                        {calculationResults.option2 && (
                          <div className="border border-gray-200 rounded-lg">
                            <div className="p-6 border-b border-gray-200">
                              <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                  <span className="text-purple-600 font-bold">2</span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900">{calculationResults.option2.type}</h3>
                                  <p className="text-sm text-gray-600">{calculationResults.option2.scenario}</p>
                                </div>
                              </div>
                              
                              <div className="bg-purple-50 p-4 rounded-lg">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                  <div>
                                    <p className="text-sm text-purple-600 mb-1">Lump Sum</p>
                                    <p className="text-xl font-bold text-purple-800">{formatCurrency(calculationResults.option2.lumpSum)}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-purple-600 mb-1">Annual Pension</p>
                                    <p className="text-xl font-bold text-purple-800">{formatCurrency(calculationResults.option2.annualAmount)}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-purple-600 text-center mt-2">
                                  Monthly: {formatCurrency(calculationResults.option2.monthlyAmount)}
                                </p>
                              </div>

                              {/* Commutation Scenarios */}
                              <div className="mt-4">
                                <h5 className="font-medium text-gray-900 mb-2">Commutation Scenarios Applied</h5>
                                <div className="space-y-1">
                                  {calculationResults.option2.applicableScenarios?.map((scenario, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <CheckCircle className="w-3 h-3 text-purple-600" />
                                      <span className="text-xs text-purple-800">{scenario}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Commutation Calculation Steps */}
                            <div className="p-6 border-b border-gray-200">
                              <h4 className="font-semibold text-gray-900 mb-4">Commutation Calculation</h4>
                              <div className="space-y-3">
                                {calculationResults.option2.calculationSteps?.map((step, index) => (
                                  <div key={index} className="bg-purple-50 p-3 rounded-lg">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="flex items-center space-x-2">
                                        <span className="w-6 h-6 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
                                          {step.step}
                                        </span>
                                        <span className="font-medium text-gray-900">{step.description}</span>
                                      </div>
                                      <span className="font-bold text-gray-900">{formatCurrency(step.result)}</span>
                                    </div>
                                    <div className="ml-8">
                                      <p className="text-sm text-gray-600 mb-1">{step.formula}</p>
                                      <p className="text-sm font-mono text-gray-800">{step.calculation}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Commutation Details */}
                            <div className="p-6">
                              <h4 className="font-semibold text-gray-900 mb-3">Commutation Details</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {Object.entries(calculationResults.option2.factors).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Tax Warning */}
                              {calculationResults.option2.factors.taxStatus?.includes('Tax applicable') && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                  <div className="flex items-center space-x-2">
                                    <AlertCircle className="w-4 h-4 text-yellow-600" />
                                    <span className="font-medium text-yellow-800">Tax Implication</span>
                                  </div>
                                  <p className="text-sm text-yellow-700 mt-1">{calculationResults.option2.factors.taxStatus}</p>
                                </div>
                              )}

                              <div className="mt-4 text-xs text-purple-700">
                                <strong>Logic Version:</strong> {calculationResults.option2.logicVersion}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Summary Comparison */}
                      {calculationResults.option1 && calculationResults.option2 && (
                        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-4">Option Comparison</h3>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Option 1 - Total Annual Value</p>
                              <p className="text-lg font-bold text-blue-600">{formatCurrency(calculationResults.option1.annualAmount)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Option 2 - Lump Sum</p>
                              <p className="text-lg font-bold text-purple-600">{formatCurrency(calculationResults.option2.lumpSum)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Option 2 - Remaining Annual</p>
                              <p className="text-lg font-bold text-purple-600">{formatCurrency(calculationResults.option2.annualAmount)}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Calculate</h3>
                  <p className="text-gray-600">Enter member details and calculation parameters to generate pension scenarios</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Calculation History Tab */
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Calculation History</h2>
            </div>
            <div className="p-6">
              {calculationHistory.length > 0 ? (
                <div className="space-y-4">
                  {calculationHistory.map(calc => (
                    <div key={calc.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{calc.memberName}</h3>
                            <p className="text-sm text-gray-600">ID: {calc.memberID} • {calc.scheme}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            calc.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                            calc.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {calc.status}
                          </span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Calculation Date:</span>
                          <span className="ml-2">{calc.calculationDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Retirement Age:</span>
                          <span className="ml-2">{calc.retirementAge}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Annual Pension:</span>
                          <span className="ml-2 font-medium">{formatCurrency(calc.results.option1?.annualAmount || 0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Calculations Yet</h3>
                  <p className="text-gray-600">Completed calculations will appear here</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PensionCalculator;