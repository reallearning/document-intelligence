import React from 'react';

export default function QuesttImplementationFlow() {
  return (
    <div className="h-screen overflow-auto bg-gray-50 p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif text-gray-800 mb-2">How it really works</h1>
          <p className="text-gray-600">Consultant/SI Partner Implementation on Questt Platform</p>
        </div>

        {/* Phase 1: Discovery - Consultant uses Platform tools */}
        <div className="mb-20">
          <div className="flex items-center gap-6">
            {/* Inputs */}
            <div className="space-y-3 w-48">
              <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Business context</div>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Industry vertical</div>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Stakeholder access</div>
              </div>
            </div>

            {/* Connectors */}
            <div className="relative w-24 h-40">
              <svg className="absolute inset-0 w-full h-full" style={{overflow: 'visible'}}>
                <path d="M 0 20 Q 48 20, 96 70" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <path d="M 0 70 Q 48 70, 96 70" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <path d="M 0 120 Q 48 120, 96 70" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Process */}
            <div className="bg-white border-2 border-blue-500 rounded-lg p-4 w-96">
              <div className="text-xs font-bold text-blue-700 uppercase mb-3">Phase 1: Client Onboarding & Discovery</div>
              
              <div className="bg-teal-50 border border-teal-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">1. PLATFORM PROVIDES:</div>
                <div className="text-xs text-gray-700">Pre-built questionnaires, templates, documentation system</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded p-2">
                <div className="text-xs font-semibold text-blue-700 mb-1">2. CONSULTANT USES TOOLS:</div>
                <div className="text-xs text-gray-700">• Create workspace • Run interviews • Document operations</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-20">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 80 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <polygon points="80,6 72,2 72,10" fill="#cbd5e1" />
              </svg>
            </div>

            {/* Output */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 w-56">
              <div className="text-xs font-semibold text-green-700 uppercase mb-2">Output</div>
              <div className="text-sm font-bold text-gray-800">Business Discovery Document</div>
            </div>
          </div>
        </div>

        {/* Connector Down */}
        <div className="flex justify-end mb-6 pr-56">
          <svg width="30" height="40">
            <path d="M 15 0 L 15 40" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <polygon points="15,40 11,32 19,32" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Phase 2: Ontology - Platform generates, Consultant refines */}
        <div className="mb-20">
          <div className="flex items-center gap-6">
            {/* Input */}
            <div className="w-48">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Discovery Document</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-24">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 96 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Process */}
            <div className="bg-white border-2 border-purple-500 rounded-lg p-4 w-96">
              <div className="text-xs font-bold text-purple-700 uppercase mb-3">Phase 2: Business Ontology Design</div>
              
              <div className="bg-teal-50 border border-teal-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">1. PLATFORM AUTO-GENERATES:</div>
                <div className="text-xs text-gray-700">Ontology graph from discovery inputs with pre-built templates</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded p-2">
                <div className="text-xs font-semibold text-blue-700 mb-1">2. CONSULTANT REFINES:</div>
                <div className="text-xs text-gray-700">• Review & edit relationships • Add custom entities • Define semantics</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-20">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 80 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <polygon points="80,6 72,2 72,10" fill="#cbd5e1" />
              </svg>
            </div>

            {/* Output */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 w-56">
              <div className="text-xs font-semibold text-green-700 uppercase mb-2">Output</div>
              <div className="text-sm font-bold text-gray-800">Validated Business Ontology</div>
            </div>
          </div>
        </div>

        {/* Connector Down */}
        <div className="flex justify-end mb-6 pr-56">
          <svg width="30" height="40">
            <path d="M 15 0 L 15 40" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <polygon points="15,40 11,32 19,32" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Phase 3: Questions - Consultant selects from Platform library */}
        <div className="mb-20">
          <div className="flex items-center gap-6">
            {/* Input */}
            <div className="w-48">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Business Ontology</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-24">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 96 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Process */}
            <div className="bg-white border-2 border-indigo-500 rounded-lg p-4 w-96">
              <div className="text-xs font-bold text-indigo-700 uppercase mb-3">Phase 3: Question & Decision Framework</div>
              
              <div className="bg-teal-50 border border-teal-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">1. PLATFORM PROVIDES:</div>
                <div className="text-xs text-gray-700">39+ pre-built questions in 15+ categories with decision factors</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded p-2">
                <div className="text-xs font-semibold text-blue-700 mb-1">2. CONSULTANT SELECTS & CUSTOMIZES:</div>
                <div className="text-xs text-gray-700">• Pick relevant questions • Customize logic • Add custom • Configure parameters</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-20">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 80 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <polygon points="80,6 72,2 72,10" fill="#cbd5e1" />
              </svg>
            </div>

            {/* Output */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 w-56">
              <div className="text-xs font-semibold text-green-700 uppercase mb-2">Output</div>
              <div className="text-sm font-bold text-gray-800">Question Library + Decision Networks</div>
            </div>
          </div>
        </div>

        {/* Connector Down */}
        <div className="flex justify-end mb-6 pr-56">
          <svg width="30" height="40">
            <path d="M 15 0 L 15 40" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <polygon points="15,40 11,32 19,32" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Phase 4: Data Mapping - Platform generates requirements, Consultant maps */}
        <div className="mb-20">
          <div className="flex items-center gap-6">
            {/* Inputs */}
            <div className="space-y-3 w-48">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Question Library</div>
              </div>
              <div className="bg-white border-2 border-gray-300 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Client's data systems</div>
              </div>
            </div>

            {/* Connectors */}
            <div className="relative w-24 h-32">
              <svg className="absolute inset-0 w-full h-full">
                <path d="M 0 20 Q 48 20, 96 65" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <path d="M 0 100 Q 48 100, 96 65" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Process */}
            <div className="bg-white border-2 border-teal-500 rounded-lg p-4 w-96">
              <div className="text-xs font-bold text-teal-700 uppercase mb-3">Phase 4: Data Source Mapping</div>
              
              <div className="bg-teal-50 border border-teal-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">1. PLATFORM AUTO-GENERATES:</div>
                <div className="text-xs text-gray-700">Data requirements list from selected questions + 100+ connectors ready</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-blue-700 mb-1">2. CONSULTANT MAPS:</div>
                <div className="text-xs text-gray-700">• Identify systems • Map to ontology • Configure auth • Validate</div>
              </div>

              <div className="bg-teal-50 border border-teal-300 rounded p-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">3. PLATFORM ASSISTS:</div>
                <div className="text-xs text-gray-700">Visual mapper, Morrie AI asks clarification questions</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-20">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 80 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <polygon points="80,6 72,2 72,10" fill="#cbd5e1" />
              </svg>
            </div>

            {/* Output */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 w-56">
              <div className="text-xs font-semibold text-green-700 uppercase mb-2">Output</div>
              <div className="text-sm font-bold text-gray-800">Connected & Validated Data Sources</div>
            </div>
          </div>
        </div>

        {/* Connector Down */}
        <div className="flex justify-end mb-6 pr-56">
          <svg width="30" height="40">
            <path d="M 15 0 L 15 40" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <polygon points="15,40 11,32 19,32" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Phase 5: KG Ingestion - Platform automates, Consultant monitors */}
        <div className="mb-20">
          <div className="flex items-center gap-6">
            {/* Input */}
            <div className="w-48">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700">Connected Data Sources</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-24">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 96 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Process */}
            <div className="bg-white border-2 border-emerald-500 rounded-lg p-4 w-96">
              <div className="text-xs font-bold text-emerald-700 uppercase mb-3">Phase 5: Knowledge Graph Ingestion</div>
              
              <div className="bg-teal-50 border border-teal-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">1. PLATFORM AUTOMATES:</div>
                <div className="text-xs text-gray-700">Automated pipeline processes data → Neo4j Knowledge Graph</div>
              </div>
              
              <div className="bg-blue-50 border border-blue-300 rounded p-2 mb-2">
                <div className="text-xs font-semibold text-blue-700 mb-1">2. CONSULTANT MONITORS:</div>
                <div className="text-xs text-gray-700">• Watch ingestion • Answer Morrie's questions • Validate resolution</div>
              </div>

              <div className="bg-teal-50 border border-teal-300 rounded p-2">
                <div className="text-xs font-semibold text-teal-700 mb-1">3. PLATFORM VALIDATES:</div>
                <div className="text-xs text-gray-700">Visual validation dashboard, status tracking</div>
              </div>
            </div>

            {/* Arrow */}
            <div className="relative w-20">
              <svg className="absolute inset-0 w-full h-12">
                <path d="M 0 6 L 80 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                <polygon points="80,6 72,2 72,10" fill="#cbd5e1" />
              </svg>
            </div>

            {/* Output */}
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 w-56">
              <div className="text-xs font-semibold text-green-700 uppercase mb-2">Output</div>
              <div className="text-sm font-bold text-gray-800">Populated Digital Brain (Neo4j KG)</div>
            </div>
          </div>
        </div>

        {/* Connector Down */}
        <div className="flex justify-end mb-6 pr-56">
          <svg width="30" height="40">
            <path d="M 15 0 L 15 40" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            <polygon points="15,40 11,32 19,32" fill="#cbd5e1" />
          </svg>
        </div>

        {/* Phases 6-8 Horizontal */}
        <div className="flex items-center gap-4">
          <div className="w-48">
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
              <div className="text-sm font-medium text-gray-700">Digital Brain Ready</div>
            </div>
          </div>

          <div className="flex-1 flex items-center gap-3">
            <svg className="w-6 h-12">
              <path d="M 0 6 L 24 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            </svg>

            <div className="bg-white border-2 border-orange-500 rounded-lg p-3 flex-1">
              <div className="text-xs font-bold text-orange-700 mb-1">6. Agent Configuration</div>
              <div className="text-xs text-teal-600">Platform: Multi-agentic framework</div>
              <div className="text-xs text-blue-600">Consultant: Configure & test workflows</div>
            </div>

            <svg className="w-6 h-12">
              <path d="M 0 6 L 24 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            </svg>

            <div className="bg-white border-2 border-rose-500 rounded-lg p-3 flex-1">
              <div className="text-xs font-bold text-rose-700 mb-1">7. Dashboard & Delivery</div>
              <div className="text-xs text-teal-600">Platform: Templates & builders</div>
              <div className="text-xs text-blue-600">Consultant: Customize & train users</div>
            </div>

            <svg className="w-6 h-12">
              <path d="M 0 6 L 24 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            </svg>

            <div className="bg-white border-2 border-violet-500 rounded-lg p-3 flex-1">
              <div className="text-xs font-bold text-violet-700 mb-1">8. Post-Deployment</div>
              <div className="text-xs text-teal-600">Platform: Analytics & learning</div>
              <div className="text-xs text-blue-600">Consultant: Monitor & optimize</div>
            </div>

            <svg className="w-6 h-12">
              <path d="M 0 6 L 24 6" stroke="#cbd5e1" strokeWidth="2" fill="none" />
              <polygon points="24,6 16,2 16,10" fill="#cbd5e1" />
            </svg>

            <div className="bg-green-100 border-2 border-green-600 rounded-lg p-3">
              <div className="text-xs font-bold text-green-800 uppercase mb-1">Production</div>
              <div className="text-sm font-bold text-gray-800">Live Platform</div>
              <div className="text-xs text-gray-600">4-8 weeks</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 text-white text-center">
          <div className="text-2xl font-bold mb-2">Timeline: 4-8 weeks (vs 6-12 months traditional BI)</div>
          <div className="text-sm opacity-90">Configuration, Not Coding • Platform Auto-Generates → Consultant Refines</div>
        </div>
      </div>
    </div>
  );
}