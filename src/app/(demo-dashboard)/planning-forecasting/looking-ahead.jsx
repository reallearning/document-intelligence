{
  /* Agent Welcome and Introduction */
}
<Card className="mb-8">
  <CardHeader className="border-b">
    <div className="flex justify-between items-center">
      <CardTitle className="text-xl">
        Looking Ahead: FY2025-26 Planning
      </CardTitle>
      <Badge variant="primary">Rolling Forecast Mode</Badge>
    </div>
  </CardHeader>
  <CardContent className="py-4">
    <ThoughtBubble className="mb-6">
      <p className="font-medium">
        Good morning, Priya! I've updated our rolling forecast with the latest
        March data.
      </p>
      <p className="mt-2">
        Here's what I'm seeing for the next quarter and beyond:
      </p>
      <ul className="mt-2 space-y-2 text-sm">
        <li className="flex items-start gap-2">
          <TrendingUp
            size={18}
            className="text-green-600 mt-0.5 flex-shrink-0"
          />
          <span>
            We're tracking{" "}
            <span className="font-semibold">
              5.2% above our original revenue plan
            </span>{" "}
            for the quarter, primarily due to strong SMB segment performance.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <TrendingDown
            size={18}
            className="text-amber-600 mt-0.5 flex-shrink-0"
          />
          <span>
            However,{" "}
            <span className="font-semibold">
              raw material costs are trending 8% higher
            </span>{" "}
            than our initial forecast, which is putting pressure on gross
            margins.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <AlertCircle
            size={18}
            className="text-teal-600 mt-0.5 flex-shrink-0"
          />
          <span>
            Based on these trends, I've created three updated scenarios for you
            to review. I recommend we adjust our Q2 forecast accordingly.
          </span>
        </li>
      </ul>
      <div className="mt-4 flex gap-2">
        <Button size="sm">View Updated Scenarios</Button>
        <Button variant="outline" size="sm">
          Keep Current Forecast
        </Button>
      </div>
    </ThoughtBubble>

    {/* Forecast Timeline */}
    <div className="bg-white p-4 rounded-lg border mb-6">
      <h3 className="font-medium mb-3">Rolling Forecast Timeline</h3>
      <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex">
          {/* Past months (locked) */}
          <div className="w-1/6 h-full bg-gray-200 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
            Jan
          </div>
          <div className="w-1/6 h-full bg-gray-200 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
            Feb
          </div>
          <div className="w-1/6 h-full bg-gray-200 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-gray-500">
            Mar
          </div>

          {/* Current month (in progress) */}
          <div className="w-1/6 h-full bg-teal-100 border-r border-gray-300 flex items-center justify-center text-sm font-medium text-teal-700 relative">
            Apr
            <div className="absolute -bottom-1 inset-x-0 h-1 bg-teal-600"></div>
          </div>

          {/* Future months (forecast) */}
          <div className="w-1/6 h-full bg-white border-r border-gray-300 flex items-center justify-center text-sm font-medium">
            May
          </div>
          <div className="w-1/6 h-full bg-white border-r border-gray-300 flex items-center justify-center text-sm font-medium">
            Jun
          </div>
        </div>

        {/* Timeline markers */}
        <div className="absolute -bottom-1 left-1/2 h-3 w-px bg-teal-600"></div>
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-teal-600 font-medium">
          We are here
        </div>
      </div>
      <div className="flex justify-between mt-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded"></div>
          <span>Locked Actuals</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-teal-100 rounded"></div>
          <span>Current Month</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-white border rounded"></div>
          <span>Forecast (Editable)</span>
        </div>
      </div>
    </div>

    <ThoughtBubble className="mb-6" variant="insight">
      <div className="flex items-start gap-2">
        <Settings size={20} className="text-indigo-500 mt-0.5" />
        <div>
          <p className="font-medium">
            I've noticed you usually revise marketing budgets quarterly.
          </p>
          <p className="mt-1 text-sm">
            Since we're outperforming in the SMB segment, would you like me to
            create a scenario where we increase SMB marketing spend by 10% in
            Q2, while keeping total marketing budget constant?
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm">Create This Scenario</Button>
            <Button variant="outline" size="sm">
              Not Now
            </Button>
          </div>
        </div>
      </div>
    </ThoughtBubble>
  </CardContent>
</Card>;
