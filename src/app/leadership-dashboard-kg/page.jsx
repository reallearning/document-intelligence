"use client";
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const AvaRetailDataKnowledgeGraph = () => {
  const svgRef = useRef();

  useEffect(() => {
    // Clear any existing visualization
    d3.select(svgRef.current).selectAll("*").remove();

    // Create the visualization
    createGraph();
  }, []);

  const createGraph = () => {
    // SVG dimensions
    const width = 1100;
    const height = 800;

    // Create SVG
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(0, 0)");

    // Define markers for arrows
    svg
      .append("defs")
      .selectAll("marker")
      .data(["hasInventory", "soldAt", "belongsTo", "variant", "transaction"])
      .enter()
      .append("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", (d) => {
        if (d === "transaction") return "#4CAF50";
        if (d === "hasInventory") return "#FF9800";
        if (d === "variant") return "#9C27B0";
        return "#666";
      });

    // Define actual data entities with many more data points
    const nodes = [
      // Stores - West Region
      {
        id: "store_dlf",
        name: "DLF Emporio",
        type: "store",
        group: 1,
        size: 20,
        details: {
          storeId: "ST001",
          location: "Delhi",
          region: "West",
          area: "2500 sqft",
          dailyFootfall: 180,
          staff: 8,
          rentPerMonth: "₹4.5L",
        },
      },

      {
        id: "store_citywalk",
        name: "Select Citywalk",
        type: "store",
        group: 1,
        size: 20,
        details: {
          storeId: "ST002",
          location: "Delhi",
          region: "West",
          area: "2200 sqft",
          dailyFootfall: 45,
          staff: 6,
          rentPerMonth: "₹3.8L",
        },
      },

      {
        id: "store_phoenix_mumbai",
        name: "Phoenix Mumbai",
        type: "store",
        group: 1,
        size: 18,
        details: {
          storeId: "ST003",
          location: "Mumbai",
          region: "West",
          area: "2800 sqft",
          dailyFootfall: 220,
          staff: 10,
          rentPerMonth: "₹6.2L",
        },
      },

      {
        id: "store_palladium",
        name: "Palladium Mall",
        type: "store",
        group: 1,
        size: 18,
        details: {
          storeId: "ST004",
          location: "Mumbai",
          region: "West",
          area: "2400 sqft",
          dailyFootfall: 195,
          staff: 8,
          rentPerMonth: "₹5.5L",
        },
      },

      // Stores - North Region
      {
        id: "store_ambience",
        name: "Ambience Mall",
        type: "store",
        group: 1,
        size: 18,
        details: {
          storeId: "ST005",
          location: "Gurgaon",
          region: "North",
          area: "2600 sqft",
          dailyFootfall: 165,
          staff: 7,
          rentPerMonth: "₹4.1L",
        },
      },

      {
        id: "store_elante",
        name: "Elante Mall",
        type: "store",
        group: 1,
        size: 16,
        details: {
          storeId: "ST006",
          location: "Chandigarh",
          region: "North",
          area: "2100 sqft",
          dailyFootfall: 140,
          staff: 6,
          rentPerMonth: "₹3.2L",
        },
      },

      // Stores - South Region
      {
        id: "store_forum",
        name: "Forum Mall",
        type: "store",
        group: 1,
        size: 18,
        details: {
          storeId: "ST007",
          location: "Bangalore",
          region: "South",
          area: "2300 sqft",
          dailyFootfall: 195,
          staff: 7,
          rentPerMonth: "₹3.9L",
        },
      },

      {
        id: "store_express",
        name: "Express Avenue",
        type: "store",
        group: 1,
        size: 16,
        details: {
          storeId: "ST008",
          location: "Chennai",
          region: "South",
          area: "2000 sqft",
          dailyFootfall: 175,
          staff: 6,
          rentPerMonth: "₹3.5L",
        },
      },

      // Product SKUs - Ethnic Wear
      {
        id: "sku_et001",
        name: "Kurta ET-001",
        type: "sku",
        group: 2,
        size: 16,
        details: {
          skuCode: "ET-001",
          category: "Ethnic Wear",
          price: "₹4,200",
          cost: "₹2,100",
          supplier: "Vendor A",
          season: "All Season",
        },
      },

      {
        id: "sku_et002",
        name: "Lehenga ET-002",
        type: "sku",
        group: 2,
        size: 16,
        details: {
          skuCode: "ET-002",
          category: "Ethnic Wear",
          price: "₹8,500",
          cost: "₹4,250",
          supplier: "Vendor B",
          season: "Festive",
        },
      },

      {
        id: "sku_et003",
        name: "Saree ET-003",
        type: "sku",
        group: 2,
        size: 16,
        details: {
          skuCode: "ET-003",
          category: "Ethnic Wear",
          price: "₹6,800",
          cost: "₹3,400",
          supplier: "Vendor A",
          season: "Wedding",
        },
      },

      {
        id: "sku_et004",
        name: "Palazzo Set ET-004",
        type: "sku",
        group: 2,
        size: 14,
        details: {
          skuCode: "ET-004",
          category: "Ethnic Wear",
          price: "₹3,800",
          cost: "₹1,900",
          supplier: "Vendor C",
          season: "Summer",
        },
      },

      // Product SKUs - Fusion Collection
      {
        id: "sku_fu001",
        name: "Fusion Top FU-001",
        type: "sku",
        group: 2,
        size: 14,
        details: {
          skuCode: "FU-001",
          category: "Fusion",
          price: "₹3,200",
          cost: "₹1,600",
          supplier: "Vendor A",
          season: "All Season",
        },
      },

      {
        id: "sku_fu002",
        name: "Indo-Western FU-002",
        type: "sku",
        group: 2,
        size: 14,
        details: {
          skuCode: "FU-002",
          category: "Fusion",
          price: "₹4,500",
          cost: "₹2,250",
          supplier: "Vendor B",
          season: "Party",
        },
      },

      {
        id: "sku_fu003",
        name: "Tunic FU-003",
        type: "sku",
        group: 2,
        size: 14,
        details: {
          skuCode: "FU-003",
          category: "Fusion",
          price: "₹2,800",
          cost: "₹1,400",
          supplier: "Vendor C",
          season: "Casual",
        },
      },

      // Product SKUs - Western Wear
      {
        id: "sku_we001",
        name: "Dress WE-001",
        type: "sku",
        group: 2,
        size: 14,
        details: {
          skuCode: "WE-001",
          category: "Western",
          price: "₹3,500",
          cost: "₹1,750",
          supplier: "Vendor D",
          season: "Summer",
        },
      },

      {
        id: "sku_we002",
        name: "Blazer WE-002",
        type: "sku",
        group: 2,
        size: 14,
        details: {
          skuCode: "WE-002",
          category: "Western",
          price: "₹5,200",
          cost: "₹2,600",
          supplier: "Vendor D",
          season: "Formal",
        },
      },

      // Product SKUs - Accessories
      {
        id: "sku_ac001",
        name: "Earrings AC-001",
        type: "sku",
        group: 2,
        size: 12,
        details: {
          skuCode: "AC-001",
          category: "Accessories",
          price: "₹850",
          cost: "₹340",
          supplier: "Vendor E",
          season: "All Season",
        },
      },

      {
        id: "sku_ac002",
        name: "Necklace AC-002",
        type: "sku",
        group: 2,
        size: 12,
        details: {
          skuCode: "AC-002",
          category: "Accessories",
          price: "₹1,200",
          cost: "₹480",
          supplier: "Vendor E",
          season: "Festive",
        },
      },

      {
        id: "sku_ac003",
        name: "Handbag AC-003",
        type: "sku",
        group: 2,
        size: 12,
        details: {
          skuCode: "AC-003",
          category: "Accessories",
          price: "₹2,400",
          cost: "₹960",
          supplier: "Vendor F",
          season: "All Season",
        },
      },

      // Size Variants
      {
        id: "size_xs",
        name: "Size XS",
        type: "size",
        group: 3,
        size: 10,
        details: {
          sizeCode: "XS",
          measurements: "30-32",
          fitType: "Regular",
        },
      },

      {
        id: "size_s",
        name: "Size S",
        type: "size",
        group: 3,
        size: 12,
        details: {
          sizeCode: "S",
          measurements: "32-34",
          fitType: "Regular",
        },
      },

      {
        id: "size_m",
        name: "Size M",
        type: "size",
        group: 3,
        size: 14,
        details: {
          sizeCode: "M",
          measurements: "36-38",
          fitType: "Regular",
        },
      },

      {
        id: "size_l",
        name: "Size L",
        type: "size",
        group: 3,
        size: 14,
        details: {
          sizeCode: "L",
          measurements: "40-42",
          fitType: "Regular",
        },
      },

      {
        id: "size_xl",
        name: "Size XL",
        type: "size",
        group: 3,
        size: 12,
        details: {
          sizeCode: "XL",
          measurements: "44-46",
          fitType: "Regular",
        },
      },

      // Inventory Records - DLF Emporio
      {
        id: "inv_dlf_et001_s",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 10,
        details: {
          store: "DLF Emporio",
          sku: "ET-001",
          size: "S",
          quantity: 25,
          reorderLevel: 5,
          lastRestocked: "15-Apr-2025",
        },
      },

      {
        id: "inv_dlf_et001_m",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 12,
        details: {
          store: "DLF Emporio",
          sku: "ET-001",
          size: "M",
          quantity: 8,
          reorderLevel: 5,
          lastRestocked: "15-Apr-2025",
        },
      },

      {
        id: "inv_dlf_et002_s",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 10,
        details: {
          store: "DLF Emporio",
          sku: "ET-002",
          size: "S",
          quantity: 18,
          reorderLevel: 3,
          lastRestocked: "10-Apr-2025",
        },
      },

      {
        id: "inv_dlf_fu001_m",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 12,
        details: {
          store: "DLF Emporio",
          sku: "FU-001",
          size: "M",
          quantity: 12,
          reorderLevel: 4,
          lastRestocked: "20-Apr-2025",
        },
      },

      // Inventory Records - Citywalk
      {
        id: "inv_citywalk_et001_s",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 10,
        details: {
          store: "Citywalk",
          sku: "ET-001",
          size: "S",
          quantity: 22,
          reorderLevel: 5,
          lastRestocked: "12-Apr-2025",
        },
      },

      {
        id: "inv_citywalk_et003_m",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 10,
        details: {
          store: "Citywalk",
          sku: "ET-003",
          size: "M",
          quantity: 3,
          reorderLevel: 5,
          lastRestocked: "05-Apr-2025",
        },
      },

      // Inventory Records - Phoenix Mumbai
      {
        id: "inv_phoenix_et001_l",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 12,
        details: {
          store: "Phoenix Mumbai",
          sku: "ET-001",
          size: "L",
          quantity: 15,
          reorderLevel: 6,
          lastRestocked: "18-Apr-2025",
        },
      },

      {
        id: "inv_phoenix_we001_s",
        name: "Inventory Record",
        type: "inventory",
        group: 4,
        size: 10,
        details: {
          store: "Phoenix Mumbai",
          sku: "WE-001",
          size: "S",
          quantity: 8,
          reorderLevel: 4,
          lastRestocked: "22-Apr-2025",
        },
      },

      // Sales Transactions - Recent
      {
        id: "txn_001",
        name: "Sale TXN-001",
        type: "transaction",
        group: 5,
        size: 10,
        details: {
          txnId: "TXN-001",
          date: "27-Apr-2025",
          time: "14:30",
          amount: "₹4,200",
          paymentMode: "Card",
          customerId: "CUST-1001",
        },
      },

      {
        id: "txn_002",
        name: "Sale TXN-002",
        type: "transaction",
        group: 5,
        size: 12,
        details: {
          txnId: "TXN-002",
          date: "27-Apr-2025",
          time: "16:45",
          amount: "₹8,500",
          paymentMode: "UPI",
          customerId: "CUST-1002",
        },
      },

      {
        id: "txn_003",
        name: "Sale TXN-003",
        type: "transaction",
        group: 5,
        size: 8,
        details: {
          txnId: "TXN-003",
          date: "27-Apr-2025",
          time: "11:20",
          amount: "₹850",
          paymentMode: "Cash",
          customerId: "CUST-1003",
        },
      },

      {
        id: "txn_004",
        name: "Sale TXN-004",
        type: "transaction",
        group: 5,
        size: 10,
        details: {
          txnId: "TXN-004",
          date: "27-Apr-2025",
          time: "18:15",
          amount: "₹6,800",
          paymentMode: "Card",
          customerId: "CUST-1004",
        },
      },

      {
        id: "txn_005",
        name: "Sale TXN-005",
        type: "transaction",
        group: 5,
        size: 8,
        details: {
          txnId: "TXN-005",
          date: "26-Apr-2025",
          time: "13:45",
          amount: "₹3,200",
          paymentMode: "UPI",
          customerId: "CUST-1005",
        },
      },

      {
        id: "txn_006",
        name: "Sale TXN-006",
        type: "transaction",
        group: 5,
        size: 10,
        details: {
          txnId: "TXN-006",
          date: "26-Apr-2025",
          time: "19:30",
          amount: "₹4,500",
          paymentMode: "Card",
          customerId: "CUST-1006",
        },
      },

      // Customer Records
      {
        id: "cust_1001",
        name: "Priya Sharma",
        type: "customer",
        group: 6,
        size: 12,
        details: {
          customerId: "CUST-1001",
          name: "Priya Sharma",
          tier: "Gold",
          totalSpend: "₹85,000",
          lastVisit: "27-Apr-2025",
          loyaltyPoints: 850,
          phone: "+91-98xxxxxxxx",
        },
      },

      {
        id: "cust_1002",
        name: "Anjali Gupta",
        type: "customer",
        group: 6,
        size: 12,
        details: {
          customerId: "CUST-1002",
          name: "Anjali Gupta",
          tier: "Silver",
          totalSpend: "₹45,000",
          lastVisit: "27-Apr-2025",
          loyaltyPoints: 450,
          phone: "+91-97xxxxxxxx",
        },
      },

      {
        id: "cust_1003",
        name: "Kavya Reddy",
        type: "customer",
        group: 6,
        size: 10,
        details: {
          customerId: "CUST-1003",
          name: "Kavya Reddy",
          tier: "Bronze",
          totalSpend: "₹12,000",
          lastVisit: "27-Apr-2025",
          loyaltyPoints: 120,
          phone: "+91-96xxxxxxxx",
        },
      },

      {
        id: "cust_1004",
        name: "Meera Singh",
        type: "customer",
        group: 6,
        size: 12,
        details: {
          customerId: "CUST-1004",
          name: "Meera Singh",
          tier: "Gold",
          totalSpend: "₹92,000",
          lastVisit: "27-Apr-2025",
          loyaltyPoints: 920,
          phone: "+91-95xxxxxxxx",
        },
      },

      {
        id: "cust_1005",
        name: "Ritu Agarwal",
        type: "customer",
        group: 6,
        size: 10,
        details: {
          customerId: "CUST-1005",
          name: "Ritu Agarwal",
          tier: "Silver",
          totalSpend: "₹38,000",
          lastVisit: "26-Apr-2025",
          loyaltyPoints: 380,
          phone: "+91-94xxxxxxxx",
        },
      },

      {
        id: "cust_1006",
        name: "Deepika Jain",
        type: "customer",
        group: 6,
        size: 12,
        details: {
          customerId: "CUST-1006",
          name: "Deepika Jain",
          tier: "Gold",
          totalSpend: "₹76,000",
          lastVisit: "26-Apr-2025",
          loyaltyPoints: 760,
          phone: "+91-93xxxxxxxx",
        },
      },

      // Return Records
      {
        id: "ret_001",
        name: "Return RET-001",
        type: "return",
        group: 7,
        size: 10,
        details: {
          returnId: "RET-001",
          originalTxn: "TXN-045",
          date: "25-Apr-2025",
          reason: "Size issue",
          refundAmount: "₹4,200",
          status: "Processed",
          sku: "ET-001",
        },
      },

      {
        id: "ret_002",
        name: "Return RET-002",
        type: "return",
        group: 7,
        size: 10,
        details: {
          returnId: "RET-002",
          originalTxn: "TXN-078",
          date: "26-Apr-2025",
          reason: "Quality issue",
          refundAmount: "₹8,500",
          status: "Processing",
          sku: "ET-002",
        },
      },

      {
        id: "ret_003",
        name: "Return RET-003",
        type: "return",
        group: 7,
        size: 8,
        details: {
          returnId: "RET-003",
          originalTxn: "TXN-089",
          date: "24-Apr-2025",
          reason: "Color mismatch",
          refundAmount: "₹3,800",
          status: "Processed",
          sku: "ET-004",
        },
      },

      {
        id: "ret_004",
        name: "Return RET-004",
        type: "return",
        group: 7,
        size: 8,
        details: {
          returnId: "RET-004",
          originalTxn: "TXN-092",
          date: "23-Apr-2025",
          reason: "Damaged item",
          refundAmount: "₹2,800",
          status: "Processed",
          sku: "FU-003",
        },
      },

      // Supplier/Vendor Data
      {
        id: "vendor_a",
        name: "Mumbai Textiles",
        type: "vendor",
        group: 8,
        size: 16,
        details: {
          vendorId: "VEN-001",
          name: "Mumbai Textiles",
          category: "Ethnic Wear",
          paymentTerms: "30 days",
          rating: "4.2/5",
          location: "Mumbai",
        },
      },

      {
        id: "vendor_b",
        name: "Delhi Designers",
        type: "vendor",
        group: 8,
        size: 14,
        details: {
          vendorId: "VEN-002",
          name: "Delhi Designers",
          category: "Premium Wear",
          paymentTerms: "45 days",
          rating: "4.5/5",
          location: "Delhi",
        },
      },

      {
        id: "vendor_c",
        name: "Jaipur Crafts",
        type: "vendor",
        group: 8,
        size: 14,
        details: {
          vendorId: "VEN-003",
          name: "Jaipur Crafts",
          category: "Ethnic & Fusion",
          paymentTerms: "30 days",
          rating: "4.1/5",
          location: "Jaipur",
        },
      },

      {
        id: "vendor_d",
        name: "Bangalore Fashion",
        type: "vendor",
        group: 8,
        size: 12,
        details: {
          vendorId: "VEN-004",
          name: "Bangalore Fashion",
          category: "Western Wear",
          paymentTerms: "21 days",
          rating: "4.3/5",
          location: "Bangalore",
        },
      },

      {
        id: "vendor_e",
        name: "Kolkata Jewelry",
        type: "vendor",
        group: 8,
        size: 12,
        details: {
          vendorId: "VEN-005",
          name: "Kolkata Jewelry",
          category: "Accessories",
          paymentTerms: "15 days",
          rating: "4.4/5",
          location: "Kolkata",
        },
      },

      {
        id: "vendor_f",
        name: "Chennai Leather",
        type: "vendor",
        group: 8,
        size: 10,
        details: {
          vendorId: "VEN-006",
          name: "Chennai Leather",
          category: "Bags & Accessories",
          paymentTerms: "30 days",
          rating: "4.0/5",
          location: "Chennai",
        },
      },

      // Category Data
      {
        id: "cat_ethnic",
        name: "Ethnic Wear",
        type: "category",
        group: 9,
        size: 18,
        details: {
          categoryId: "CAT-001",
          name: "Ethnic Wear",
          margin: "50%",
          seasonality: "High",
          targetDemographic: "25-45",
          avgPrice: "₹5,200",
        },
      },

      {
        id: "cat_fusion",
        name: "Fusion",
        type: "category",
        group: 9,
        size: 16,
        details: {
          categoryId: "CAT-002",
          name: "Fusion",
          margin: "48%",
          seasonality: "Medium",
          targetDemographic: "22-35",
          avgPrice: "₹3,500",
        },
      },

      {
        id: "cat_western",
        name: "Western Wear",
        type: "category",
        group: 9,
        size: 14,
        details: {
          categoryId: "CAT-003",
          name: "Western Wear",
          margin: "45%",
          seasonality: "Low",
          targetDemographic: "20-40",
          avgPrice: "₹4,100",
        },
      },

      {
        id: "cat_accessories",
        name: "Accessories",
        type: "category",
        group: 9,
        size: 12,
        details: {
          categoryId: "CAT-004",
          name: "Accessories",
          margin: "60%",
          seasonality: "Medium",
          targetDemographic: "18-50",
          avgPrice: "₹1,400",
        },
      },

      // Staff Records
      {
        id: "staff_001",
        name: "Manager Rajesh",
        type: "staff",
        group: 10,
        size: 12,
        details: {
          employeeId: "EMP-001",
          name: "Rajesh Kumar",
          role: "Store Manager",
          store: "DLF Emporio",
          salary: "₹45,000",
          experience: "8 years",
        },
      },

      {
        id: "staff_002",
        name: "Sales Assoc. Neha",
        type: "staff",
        group: 10,
        size: 10,
        details: {
          employeeId: "EMP-002",
          name: "Neha Verma",
          role: "Sales Associate",
          store: "DLF Emporio",
          salary: "₹22,000",
          experience: "3 years",
        },
      },

      {
        id: "staff_003",
        name: "Manager Suresh",
        type: "staff",
        group: 10,
        size: 12,
        details: {
          employeeId: "EMP-003",
          name: "Suresh Patel",
          role: "Store Manager",
          store: "Phoenix Mumbai",
          salary: "₹48,000",
          experience: "10 years",
        },
      },
    ];

    // Define relationships between data entities - many more now
    const links = [
      // Store-Inventory relationships
      {
        source: "store_dlf",
        target: "inv_dlf_et001_s",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_dlf",
        target: "inv_dlf_et001_m",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_dlf",
        target: "inv_dlf_et002_s",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_dlf",
        target: "inv_dlf_fu001_m",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_citywalk",
        target: "inv_citywalk_et001_s",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_citywalk",
        target: "inv_citywalk_et003_m",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_phoenix_mumbai",
        target: "inv_phoenix_et001_l",
        type: "HAS_INVENTORY",
        label: "HAS",
      },
      {
        source: "store_phoenix_mumbai",
        target: "inv_phoenix_we001_s",
        type: "HAS_INVENTORY",
        label: "HAS",
      },

      // SKU-Inventory relationships
      {
        source: "sku_et001",
        target: "inv_dlf_et001_s",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_et001",
        target: "inv_dlf_et001_m",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_et001",
        target: "inv_citywalk_et001_s",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_et001",
        target: "inv_phoenix_et001_l",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_et002",
        target: "inv_dlf_et002_s",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_et003",
        target: "inv_citywalk_et003_m",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_fu001",
        target: "inv_dlf_fu001_m",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },
      {
        source: "sku_we001",
        target: "inv_phoenix_we001_s",
        type: "STOCKED_AS",
        label: "STOCKED AS",
      },

      // Size-Inventory relationships
      {
        source: "size_s",
        target: "inv_dlf_et001_s",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_s",
        target: "inv_citywalk_et001_s",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_s",
        target: "inv_dlf_et002_s",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_s",
        target: "inv_phoenix_we001_s",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_m",
        target: "inv_dlf_et001_m",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_m",
        target: "inv_dlf_fu001_m",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_m",
        target: "inv_citywalk_et003_m",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },
      {
        source: "size_l",
        target: "inv_phoenix_et001_l",
        type: "SIZE_VARIANT",
        label: "SIZE",
      },

      // Transaction-Store relationships
      {
        source: "txn_001",
        target: "store_dlf",
        type: "OCCURRED_AT",
        label: "AT STORE",
      },
      {
        source: "txn_002",
        target: "store_dlf",
        type: "OCCURRED_AT",
        label: "AT STORE",
      },
      {
        source: "txn_003",
        target: "store_phoenix_mumbai",
        type: "OCCURRED_AT",
        label: "AT STORE",
      },
      {
        source: "txn_004",
        target: "store_citywalk",
        type: "OCCURRED_AT",
        label: "AT STORE",
      },
      {
        source: "txn_005",
        target: "store_phoenix_mumbai",
        type: "OCCURRED_AT",
        label: "AT STORE",
      },
      {
        source: "txn_006",
        target: "store_forum",
        type: "OCCURRED_AT",
        label: "AT STORE",
      },

      // Transaction-SKU relationships
      {
        source: "txn_001",
        target: "sku_et001",
        type: "CONTAINS_SKU",
        label: "SOLD",
      },
      {
        source: "txn_002",
        target: "sku_et002",
        type: "CONTAINS_SKU",
        label: "SOLD",
      },
      {
        source: "txn_003",
        target: "sku_ac001",
        type: "CONTAINS_SKU",
        label: "SOLD",
      },
      {
        source: "txn_004",
        target: "sku_et003",
        type: "CONTAINS_SKU",
        label: "SOLD",
      },
      {
        source: "txn_005",
        target: "sku_fu001",
        type: "CONTAINS_SKU",
        label: "SOLD",
      },
      {
        source: "txn_006",
        target: "sku_fu002",
        type: "CONTAINS_SKU",
        label: "SOLD",
      },

      // Customer-Transaction relationships
      {
        source: "cust_1001",
        target: "txn_001",
        type: "MADE_PURCHASE",
        label: "PURCHASED",
      },
      {
        source: "cust_1002",
        target: "txn_002",
        type: "MADE_PURCHASE",
        label: "PURCHASED",
      },
      {
        source: "cust_1003",
        target: "txn_003",
        type: "MADE_PURCHASE",
        label: "PURCHASED",
      },
      {
        source: "cust_1004",
        target: "txn_004",
        type: "MADE_PURCHASE",
        label: "PURCHASED",
      },
      {
        source: "cust_1005",
        target: "txn_005",
        type: "MADE_PURCHASE",
        label: "PURCHASED",
      },
      {
        source: "cust_1006",
        target: "txn_006",
        type: "MADE_PURCHASE",
        label: "PURCHASED",
      },

      // Return-Transaction relationships
      {
        source: "ret_001",
        target: "txn_001",
        type: "RETURNS_FROM",
        label: "RETURN OF",
      },
      {
        source: "ret_002",
        target: "txn_002",
        type: "RETURNS_FROM",
        label: "RETURN OF",
      },
      {
        source: "ret_003",
        target: "sku_et004",
        type: "RETURNED_SKU",
        label: "RETURNED",
      },
      {
        source: "ret_004",
        target: "sku_fu003",
        type: "RETURNED_SKU",
        label: "RETURNED",
      },

      // SKU-Category relationships
      {
        source: "sku_et001",
        target: "cat_ethnic",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_et002",
        target: "cat_ethnic",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_et003",
        target: "cat_ethnic",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_et004",
        target: "cat_ethnic",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_fu001",
        target: "cat_fusion",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_fu002",
        target: "cat_fusion",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_fu003",
        target: "cat_fusion",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_we001",
        target: "cat_western",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_we002",
        target: "cat_western",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_ac001",
        target: "cat_accessories",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_ac002",
        target: "cat_accessories",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },
      {
        source: "sku_ac003",
        target: "cat_accessories",
        type: "BELONGS_TO",
        label: "CATEGORY",
      },

      // Vendor-SKU relationships
      {
        source: "vendor_a",
        target: "sku_et001",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_a",
        target: "sku_et003",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_a",
        target: "sku_fu001",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_b",
        target: "sku_et002",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_b",
        target: "sku_fu002",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_c",
        target: "sku_et004",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_c",
        target: "sku_fu003",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_d",
        target: "sku_we001",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_d",
        target: "sku_we002",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_e",
        target: "sku_ac001",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_e",
        target: "sku_ac002",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },
      {
        source: "vendor_f",
        target: "sku_ac003",
        type: "SUPPLIES",
        label: "SUPPLIES",
      },

      // Size-SKU relationships (which SKUs come in which sizes)
      {
        source: "sku_et001",
        target: "size_xs",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et001",
        target: "size_s",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et001",
        target: "size_m",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et001",
        target: "size_l",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et001",
        target: "size_xl",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et002",
        target: "size_s",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et002",
        target: "size_m",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_et002",
        target: "size_l",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_fu001",
        target: "size_s",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_fu001",
        target: "size_m",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_fu001",
        target: "size_l",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_we001",
        target: "size_s",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },
      {
        source: "sku_we001",
        target: "size_m",
        type: "AVAILABLE_IN",
        label: "SIZE",
      },

      // Staff-Store relationships
      {
        source: "staff_001",
        target: "store_dlf",
        type: "WORKS_AT",
        label: "WORKS AT",
      },
      {
        source: "staff_002",
        target: "store_dlf",
        type: "WORKS_AT",
        label: "WORKS AT",
      },
      {
        source: "staff_003",
        target: "store_phoenix_mumbai",
        type: "WORKS_AT",
        label: "WORKS AT",
      },
    ];

    // Set up force simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-600))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collision",
        d3.forceCollide().radius((d) => d.size + 8)
      )
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    // Draw links
    const link = svg.selectAll(".link").data(links).enter().append("g");

    // Add path for links
    const linkPath = link
      .append("path")
      .attr("class", "link")
      .attr("stroke", (d) => {
        if (d.type === "HAS_INVENTORY" || d.type === "STOCKED_AS")
          return "#FF9800";
        if (d.type === "OCCURRED_AT" || d.type === "CONTAINS_SKU")
          return "#4CAF50";
        if (d.type === "MADE_PURCHASE") return "#2196F3";
        if (d.type === "RETURNS_FROM") return "#F44336";
        if (d.type === "SUPPLIES") return "#9C27B0";
        return "#666";
      })
      .attr("stroke-width", (d) => {
        if (d.type === "CONTAINS_SKU" || d.type === "MADE_PURCHASE") return 2;
        return 1;
      })
      .attr("fill", "none")
      .attr("opacity", 0.6)
      .attr("marker-end", (d) => {
        if (d.type === "CONTAINS_SKU" || d.type === "MADE_PURCHASE")
          return "url(#transaction)";
        if (d.type === "HAS_INVENTORY" || d.type === "STOCKED_AS")
          return "url(#hasInventory)";
        return "url(#belongsTo)";
      });

    // Draw nodes
    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add circles for nodes
    node
      .append("circle")
      .attr("r", (d) => d.size)
      .attr("fill", (d) => {
        switch (d.type) {
          case "store":
            return "#2196F3";
          case "sku":
            return "#4CAF50";
          case "size":
            return "#FF9800";
          case "inventory":
            // Color by inventory level
            if (d.details.quantity > 15) return "#FF5722"; // Overstocked
            if (d.details.quantity < 8) return "#FFC107"; // Low stock
            return "#8BC34A"; // Normal
          case "transaction":
            return "#9C27B0";
          case "customer":
            if (d.details.tier === "Gold") return "#FFD700";
            if (d.details.tier === "Silver") return "#C0C0C0";
            return "#CD7F32"; // Bronze
          case "return":
            return "#F44336";
          case "vendor":
            return "#607D8B";
          case "category":
            return "#009688";
          case "staff":
            return "#795548";
          default:
            return "#999";
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .attr("opacity", 0.9);

    // Add labels for nodes
    node
      .append("text")
      .attr("dx", 0)
      .attr("dy", (d) => -d.size - 5)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .attr("fill", "#333")
      .text((d) => d.name);

    // Add key data as text
    node
      .filter((d) => d.details)
      .append("text")
      .attr("dy", (d) => -d.size + 8)
      .attr("text-anchor", "middle")
      .attr("font-size", "7px")
      .attr("fill", "#555")
      .each(function (d) {
        const detailsText = d3.select(this);
        let yOffset = 0;

        if (d.type === "store") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 8)
            .text(`${d.details.storeId}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 8)
            .text(`${d.details.dailyFootfall} visitors`);
        } else if (d.type === "sku") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 8)
            .text(`${d.details.skuCode}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 8)
            .text(`${d.details.price}`);
        } else if (d.type === "inventory") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 8)
            .attr(
              "fill",
              d.details.quantity < 8
                ? "#F44336"
                : d.details.quantity > 15
                ? "#FF5722"
                : "#4CAF50"
            )
            .text(`Qty: ${d.details.quantity}`);
        } else if (d.type === "transaction") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 8)
            .text(`${d.details.date}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 8)
            .text(`${d.details.amount}`);
        } else if (d.type === "customer") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 8)
            .text(`${d.details.tier}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 8)
            .text(`${d.details.totalSpend}`);
        } else if (d.type === "staff") {
          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", yOffset + 8)
            .text(`${d.details.role}`);

          detailsText
            .append("tspan")
            .attr("x", 0)
            .attr("dy", 8)
            .text(`${d.details.salary}`);
        }
      });

    // Add titles for hover details
    node.append("title").text((d) => {
      let details = `${d.name}\nType: ${
        d.type.charAt(0).toUpperCase() + d.type.slice(1)
      }`;

      if (d.details) {
        Object.entries(d.details).forEach(([key, value]) => {
          details += `\n${key}: ${value}`;
        });
      }

      return details;
    });

    // Add simulation tick function
    simulation.on("tick", () => {
      // Keep nodes within bounds
      nodes.forEach((d) => {
        d.x = Math.max(d.size + 10, Math.min(width - d.size - 10, d.x));
        d.y = Math.max(d.size + 10, Math.min(height - d.size - 10, d.y));
      });

      linkPath.attr("d", (d) => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy) * 0.3;

        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    // Functions to handle dragging
    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Add legend
    const legend = svg.append("g").attr("transform", "translate(20, 20)");

    const legendData = [
      { type: "store", color: "#2196F3", label: "Store" },
      { type: "sku", color: "#4CAF50", label: "Product SKU" },
      {
        type: "inventory-normal",
        color: "#8BC34A",
        label: "Inventory (Normal)",
      },
      {
        type: "inventory-low",
        color: "#FFC107",
        label: "Inventory (Low Stock)",
      },
      {
        type: "inventory-over",
        color: "#FF5722",
        label: "Inventory (Overstocked)",
      },
      { type: "transaction", color: "#9C27B0", label: "Sales Transaction" },
      { type: "customer-gold", color: "#FFD700", label: "Customer (Gold)" },
      { type: "customer-silver", color: "#C0C0C0", label: "Customer (Silver)" },
      { type: "customer-bronze", color: "#CD7F32", label: "Customer (Bronze)" },
      { type: "return", color: "#F44336", label: "Return Record" },
      { type: "vendor", color: "#607D8B", label: "Vendor/Supplier" },
      { type: "category", color: "#009688", label: "Product Category" },
      { type: "size", color: "#FF9800", label: "Size Variant" },
      { type: "staff", color: "#795548", label: "Staff Member" },
    ];

    const legendItems = legend
      .selectAll(".legend-item")
      .data(legendData)
      .enter()
      .append("g")
      .attr("class", "legend-item")
      .attr("transform", (d, i) => `translate(0, ${i * 16})`);

    legendItems
      .append("circle")
      .attr("r", 4)
      .attr("fill", (d) => d.color);

    legendItems
      .append("text")
      .attr("x", 10)
      .attr("y", 3)
      .text((d) => d.label)
      .attr("font-size", "10px")
      .attr("fill", "#333");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-screen overflow-auto">
      <h2 className="text-xl font-bold mb-4">
        Ava Retail - Base Data Entity Graph
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        This shows the actual underlying data entities in the retail system -
        stores, inventory records, sales transactions, customer data, and
        product information. Each node represents a real data record that feeds
        into analytics.
      </p>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <svg ref={svgRef} className="w-full"></svg>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <span className="font-semibold">Data Entity Relationships:</span>
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>
            <span className="font-medium">Stores</span> contain multiple
            inventory records for different SKUs and sizes
          </li>
          <li>
            <span className="font-medium">Sales transactions</span> link
            customers to specific products at specific stores
          </li>
          <li>
            <span className="font-medium">Inventory records</span> track
            quantity per SKU per size per store
          </li>
          <li>
            <span className="font-medium">Return records</span> reference
            original transactions and affect inventory
          </li>
          <li>
            <span className="font-medium">Size S</span> shows high inventory but
            low sales (visible in overstocked nodes)
          </li>
          <li>
            <span className="font-medium">Customer tiers</span> (Gold/Silver)
            affect purchasing patterns and loyalty
          </li>
        </ul>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
          <p className="font-semibold text-blue-800">Raw Data Insight:</p>
          <p className="text-blue-700 text-sm mt-1">
            This graph shows the actual data tables and records that generate
            dashboard insights. For example, the "Size S imbalance" insight
            comes from aggregating inventory quantities across all Size S
            records and comparing them to transaction records containing Size S
            purchases.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvaRetailDataKnowledgeGraph;
