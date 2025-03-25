<TabsContent value="risk">
<div className="space-y-6">
  {/* Risk Overview */}
  <div className="grid grid-cols-3 gap-4">
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Transaction Risk Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">587</div>
        <div className="text-xs text-gray-500 mt-1">
          Total transactions analyzed
        </div>
        <div className="mt-3 flex gap-4">
          <div>
            <div className="text-sm font-medium text-green-600">
              531
            </div>
            <div className="text-xs text-gray-500">Low Risk</div>
          </div>
          <div>
            <div className="text-sm font-medium text-amber-600">
              48
            </div>
            <div className="text-xs text-gray-500">Medium Risk</div>
          </div>
          <div>
            <div className="text-sm font-medium text-red-600">
              8
            </div>
            <div className="text-xs text-gray-500">High Risk</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="link" className="p-0 h-auto">
          View Details
        </Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Policy Compliance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">97.4%</div>
        <div className="text-xs text-gray-500 mt-1">
          Transactions adhering to policy
        </div>
        <div className="mt-3 flex gap-4">
          <div>
            <div className="text-sm font-medium text-red-600">
              15
            </div>
            <div className="text-xs text-gray-500">
              Policy Violations
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">5</div>
            <div className="text-xs text-gray-500">
              Requiring Override
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="link" className="p-0 h-auto">
          Review Violations
        </Button>
      </CardFooter>
    </Card>

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          Vendor Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">382</div>
        <div className="text-xs text-gray-500 mt-1">
          Active vendors assessed
        </div>
        <div className="mt-3 flex gap-4">
          <div>
            <div className="text-sm font-medium text-green-600">
              325
            </div>
            <div className="text-xs text-gray-500">Low Risk</div>
          </div>
          <div>
            <div className="text-sm font-medium text-amber-600">
              42
            </div>
            <div className="text-xs text-gray-500">Medium Risk</div>
          </div>
          <div>
            <div className="text-sm font-medium text-red-600">
              15
            </div>
            <div className="text-xs text-gray-500">High Risk</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="link" className="p-0 h-auto">
          View Vendor Analysis
        </Button>
      </CardFooter>
    </Card>
  </div>

  {/* High Risk Transactions */}
  <Card>
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle>High Risk Transactions</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1"
          >
            <Filter size={14} /> Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs flex items-center gap-1"
          >
            <Download size={14} /> Export
          </Button>
        </div>
      </div>
      <CardDescription>
        Transactions flagged for potential policy violations or
        fraud
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-gray-600">
                Transaction
              </th>
              <th className="text-left px-4 py-2 font-medium text-gray-600">
                Risk Type
              </th>
              <th className="text-center px-4 py-2 font-medium text-gray-600">
                Risk Score
              </th>
              <th className="text-right px-4 py-2 font-medium text-gray-600">
                Amount
              </th>
              <th className="text-center px-4 py-2 font-medium text-gray-600">
                Date
              </th>
              <th className="text-center px-4 py-2 font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div>Payment - Sunrise Distributors</div>
                <div className="text-xs text-gray-500">
                  Invoice #SD-4587
                </div>
              </td>
              <td className="px-4 py-3 text-red-600">
                Potential Duplicate
              </td>
              <td className="px-4 py-3 text-center">
                <Badge className="bg-red-100 text-red-700">
                  High (87/100)
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">₹73,450</td>
              <td className="px-4 py-3 text-center">
                Mar 15, 2025
              </td>
              <td className="px-4 py-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Investigate
                </Button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div>Invoice - Quantum Supplies Ltd.</div>
                <div className="text-xs text-gray-500">
                  Invoice #QSL-9821
                </div>
              </td>
              <td className="px-4 py-3 text-red-600">
                Approval Policy Violation
              </td>
              <td className="px-4 py-3 text-center">
                <Badge className="bg-red-100 text-red-700">
                  High (82/100)
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">₹2,85,700</td>
              <td className="px-4 py-3 text-center">
                Mar 14, 2025
              </td>
              <td className="px-4 py-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Review
                </Button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <div>Payment - Techsmart Solutions</div>
                <div className="text-xs text-gray-500">
                  Invoice #TS-3325
                </div>
              </td>
              <td className="px-4 py-3 text-amber-600">
                Unusual Amount
              </td>
              <td className="px-4 py-3 text-center">
                <Badge className="bg-amber-100 text-amber-700">
                  Medium (65/100)
                </Badge>
              </td>
              <td className="px-4 py-3 text-right">₹1,24,850</td>
              <td className="px-4 py-3 text-center">
                Mar 12, 2025
              </td>
              <td className="px-4 py-3 text-center">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Verify
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
    <CardFooter className="border-t pt-3 pb-1">
      <p className="text-xs text-gray-500">
        Agent has flagged 8 high-risk transactions this month.
        Historical average: 5 per month.
      </p>
    </CardFooter>
  </Card>
</div>
</TabsContent>