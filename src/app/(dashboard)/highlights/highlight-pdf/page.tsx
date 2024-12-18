"use client";
import "./app.css";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  PdfLoader,
  PdfHighlighter,
  Highlight,
  AreaHighlight,
  Popup,
  Tip,
} from "react-pdf-highlighter";
import type {
  IHighlight,
  NewHighlight,
  Content,
  ScaledPosition,
} from "react-pdf-highlighter";
import "react-pdf-highlighter/dist/style.css";
import { Spinner } from "./spinner";
import { useDocumentData } from "@/context/document-data-context";
import useGlobalHideScrollbar from "@/hooks/use-global-hide-scrolbar";
import Sidebar from "./sidebar";

const PRIMARY_PDF_URL = "/acme-contract.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480";

const exampleData = {
  doc_url:
    "https://storage.googleapis.com/morrie-resources/demo/PO-4250-240116044_20816.pdf",
  type: "invoice",
  format: "pdf",
  data: {
    supplier: {
      name: {
        value: "CAREFINE WOODWORKS PVT LTD",
        flag: null,
        highlight: {
          id: "1884866887157528",
          content: {
            text: "CAREFINE WOODWORKS PVT LTD",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 161.9496307373047,
              x2: 206.0313262939453,
              y2: 171.8095245361328,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 161.9496307373047,
                x2: 206.0313262939453,
                y2: 171.8095245361328,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 372.2228088378906,
                y1: 624.9229736328125,
                x2: 526.5790405273438,
                y2: 634.1925048828125,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 331.7998352050781,
                y1: 686.4013671875,
                x2: 487.42218017578125,
                y2: 694.9502563476562,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "CAREFINE WOODWORKS PVT LTD",
            emoji: "",
          },
        },
      },
      address: {
        value:
          "906/8, Village Sanaswadi Tal. Shirur, Dist. Pune - 412208 Reg.Office:18,Aganagar Hsg Society, Nagar Road Pune-411014",
        flag: null,
        highlight: {
          id: "1723217984813352",
          content: {
            text: "906/8, Village Sanaswadi",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 173.4617156982422,
              x2: 149.93124389648438,
              y2: 183.3216094970703,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 173.4617156982422,
                x2: 149.93124389648438,
                y2: 183.3216094970703,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 184.7417449951172,
                x2: 177.61788940429688,
                y2: 194.6016387939453,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 196.0217742919922,
                x2: 206.16909790039062,
                y2: 205.8816680908203,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 207.3018035888672,
                x2: 154.69790649414062,
                y2: 217.1616973876953,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "906/8, Village Sanaswadi",
            emoji: "",
          },
        },
      },
      gstin: {
        value: "27AAACC7579H1ZC",
        flag: null,
        highlight: {
          id: "7284286708069165",
          content: {
            text: "GSTIN/UIN: 27AAACC7579H1ZC",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 229.8618621826172,
              x2: 187.55130004882812,
              y2: 239.7217559814453,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 229.8618621826172,
                x2: 187.55130004882812,
                y2: 239.7217559814453,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "GSTIN/UIN: 27AAACC7579H1ZC",
            emoji: "",
          },
        },
      },
      state: {
        value: "Maharashtra",
        flag: null,
        highlight: {
          id: "1970827057290003",
          content: {
            text: "State Name : Maharashtra, Code : 27",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 241.1418914794922,
              x2: 206.53797912597656,
              y2: 251.0017852783203,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 241.1418914794922,
                x2: 206.53797912597656,
                y2: 251.0017852783203,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "State Name : Maharashtra, Code : 27",
            emoji: "",
          },
        },
      },
      state_code: {
        value: "27",
        flag: null,
        highlight: {
          id: "1970827057290003",
          content: {
            text: "State Name : Maharashtra, Code : 27",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 241.1418914794922,
              x2: 206.53797912597656,
              y2: 251.0017852783203,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 241.1418914794922,
                x2: 206.53797912597656,
                y2: 251.0017852783203,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "State Name : Maharashtra, Code : 27",
            emoji: "",
          },
        },
      },
      pan_number: {
        value: "AAACC7579H",
        flag: null,
        highlight: {
          id: "5420337814916328",
          content: {
            text: "AAACC7579H",
          },
          position: {
            boundingRect: {
              x1: 149.86215209960938,
              y1: 713.7229614257812,
              x2: 212.05844116210938,
              y2: 722.9924926757812,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 149.86215209960938,
                y1: 713.7229614257812,
                x2: 212.05844116210938,
                y2: 722.9924926757812,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "AAACC7579H",
            emoji: "",
          },
        },
      },
      contact_details: {
        value: {
          phone: "9582959234",
          email: "pune@carefine.co.in",
        },
        flag: null,
        highlight: {
          id: "3750062531697420",
          content: {
            text: "E-Mail : pune@carefine.co.in",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 252.4219207763672,
              x2: 166.09793090820312,
              y2: 262.2818298339844,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 252.4219207763672,
                x2: 166.09793090820312,
                y2: 262.2818298339844,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "E-Mail : pune@carefine.co.in",
            emoji: "",
          },
        },
      },
      bank_account_number: {
        value: "0261257005090",
        flag: null,
        highlight: {
          id: "2874201675791066",
          content: {
            text: "0261257005090",
          },
          position: {
            boundingRect: {
              x1: 373.6628112792969,
              y1: 646.282958984375,
              x2: 442.6449890136719,
              y2: 655.5525512695312,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 373.6628112792969,
                y1: 646.282958984375,
                x2: 442.6449890136719,
                y2: 655.5525512695312,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "0261257005090",
            emoji: "",
          },
        },
      },
      bank_name: {
        value: "CANARA BANK",
        flag: null,
        highlight: {
          id: "1486723792131498",
          content: {
            text: "CANARA BANK",
          },
          position: {
            boundingRect: {
              x1: 373.6628112792969,
              y1: 635.60302734375,
              x2: 443.8990173339844,
              y2: 644.87255859375,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 373.6628112792969,
                y1: 635.60302734375,
                x2: 443.8990173339844,
                y2: 644.87255859375,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "CANARA BANK",
            emoji: "",
          },
        },
      },
      branch: {
        value: "Ramwadi Pune",
        flag: null,
        highlight: {
          id: "1784152888029251",
          content: {
            text: "Ramwadi Pune & CNRB0000261",
          },
          position: {
            boundingRect: {
              x1: 373.6628723144531,
              y1: 656.9630126953125,
              x2: 513.3250122070312,
              y2: 666.2325439453125,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 373.6628723144531,
                y1: 656.9630126953125,
                x2: 513.3250122070312,
                y2: 666.2325439453125,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "Ramwadi Pune & CNRB0000261",
            emoji: "",
          },
        },
      },
      ifsc_code: {
        value: "CNRB0000261",
        flag: null,
        highlight: {
          id: "1784152888029251",
          content: {
            text: "Ramwadi Pune & CNRB0000261",
          },
          position: {
            boundingRect: {
              x1: 373.6628723144531,
              y1: 656.9630126953125,
              x2: 513.3250122070312,
              y2: 666.2325439453125,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 373.6628723144531,
                y1: 656.9630126953125,
                x2: 513.3250122070312,
                y2: 666.2325439453125,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "Ramwadi Pune & CNRB0000261",
            emoji: "",
          },
        },
      },
      flag: null,
    },
    buyer: {
      name: {
        value: "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD",
        flag: null,
        highlight: {
          id: "1631666621789759",
          content: {
            text: "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 348.0695495605469,
              x2: 281.6314392089844,
              y2: 357.9294738769531,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 348.0695495605469,
                x2: 281.6314392089844,
                y2: 357.9294738769531,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 277.74957275390625,
                x2: 281.6314392089844,
                y2: 287.6094970703125,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD",
            emoji: "",
          },
        },
      },
      address: {
        value:
          "Equinox Business Park, 4th Floor Tower 1, No. 83, 83/1 to 4 Village Kurla, Taluka Kurla, LBS-Marg, Kurla West, Mumbai-400070, Maharashtra",
        flag: null,
        highlight: {
          id: "2499655691128413",
          content: {
            text: "Equinox Business Park, 4th Floor Tower 1,",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 359.58160400390625,
              x2: 226.44912719726562,
              y2: 369.4415283203125,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 359.58160400390625,
                x2: 226.44912719726562,
                y2: 369.4415283203125,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 370.8229675292969,
                x2: 192.2583465576172,
                y2: 380.7329406738281,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 382.1029357910156,
                x2: 203.5294952392578,
                y2: 392.0129089355469,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 393.3829345703125,
                x2: 176.17823791503906,
                y2: 403.29290771484375,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "Equinox Business Park, 4th Floor Tower 1,",
            emoji: "",
          },
        },
      },
      gstin: {
        value: "27AADCH4222R2Z8",
        flag: null,
        highlight: {
          id: "4813485341023974",
          content: {
            text: ": 27AADCH4222R2Z8",
          },
          position: {
            boundingRect: {
              x1: 121.20005798339844,
              y1: 416.3415832519531,
              x2: 221.0579071044922,
              y2: 426.2015075683594,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 121.20005798339844,
                y1: 416.3415832519531,
                x2: 221.0579071044922,
                y2: 426.2015075683594,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 121.20005798339844,
                y1: 311.94158935546875,
                x2: 221.0579071044922,
                y2: 321.801513671875,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: ": 27AADCH4222R2Z8",
            emoji: "",
          },
        },
      },
      contact_details: {
        value: {
          phone: null,
          email: null,
        },
        flag: null,
        highlight: null,
      },
      flag: null,
    },
    consignee: {
      name: {
        value: "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD",
        flag: null,
        highlight: {
          id: "1628050068616905",
          content: {
            text: "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 277.74957275390625,
              x2: 281.6314392089844,
              y2: 287.6094970703125,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 277.74957275390625,
                x2: 281.6314392089844,
                y2: 287.6094970703125,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 348.0695495605469,
                x2: 281.6314392089844,
                y2: 357.9294738769531,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "HOME INTERIOR DESIGNS E-COMMERCE PVT LTD",
            emoji: "",
          },
        },
      },
      address: {
        value: "S3 lifestyle Apartment, Pimple Saudagar, Pune - 411045",
        flag: null,
        highlight: {
          id: "2952026685464625",
          content: {
            text: "S3 lifestyle Apartment, Pimple Saudagar, Pune -",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 289.2616271972656,
              x2: 254.1691436767578,
              y2: 299.1215515136719,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 289.2616271972656,
                x2: 254.1691436767578,
                y2: 299.1215515136719,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 300.5416259765625,
                x2: 71.77779388427734,
                y2: 310.40155029296875,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "S3 lifestyle Apartment, Pimple Saudagar, Pune -",
            emoji: "",
          },
        },
      },
      gstin: {
        value: "27AADCH4222R2Z8",
        flag: null,
        highlight: {
          id: "2576080414956808",
          content: {
            text: ": 27AADCH4222R2Z8",
          },
          position: {
            boundingRect: {
              x1: 121.20005798339844,
              y1: 311.94158935546875,
              x2: 221.0579071044922,
              y2: 321.801513671875,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 121.20005798339844,
                y1: 311.94158935546875,
                x2: 221.0579071044922,
                y2: 321.801513671875,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 121.20005798339844,
                y1: 416.3415832519531,
                x2: 221.0579071044922,
                y2: 426.2015075683594,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: ": 27AADCH4222R2Z8",
            emoji: "",
          },
        },
      },
      flag: null,
    },
    gst_details: {
      cgst: {
        value: 212.53,
        flag: null,
        highlight: {
          id: "2336776307969801",
          content: {
            text: "212.53",
          },
          position: {
            boundingRect: {
              x1: 502.6797790527344,
              y1: 514.8695068359375,
              x2: 533.0575561523438,
              y2: 524.7293701171875,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 502.6797790527344,
                y1: 514.8695068359375,
                x2: 533.0575561523438,
                y2: 524.7293701171875,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "212.53",
            emoji: "",
          },
        },
      },
      sgst: {
        value: 212.53,
        flag: null,
        highlight: {
          id: "2728885085888296",
          content: {
            text: "212.53",
          },
          position: {
            boundingRect: {
              x1: 502.6797790527344,
              y1: 526.6295166015625,
              x2: 533.0575561523438,
              y2: 536.4893798828125,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 502.6797790527344,
                y1: 526.6295166015625,
                x2: 533.0575561523438,
                y2: 536.4893798828125,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "212.53",
            emoji: "",
          },
        },
      },
      igst: {
        value: 0,
        flag: null,
        highlight: null,
      },
      utgst: {
        value: 0,
        flag: null,
        highlight: null,
      },
      cess: {
        value: 0,
        flag: null,
        highlight: null,
      },
      round_off: {
        value: 0,
        flag: null,
        highlight: null,
      },
      flag: null,
    },
    invoice_details: {
      number: {
        value: "20816",
        flag: null,
        highlight: {
          id: "2533164001579709",
          content: {
            text: "20816",
          },
          position: {
            boundingRect: {
              x1: 290.639892578125,
              y1: 172.74961853027344,
              x2: 318.25775146484375,
              y2: 182.60951232910156,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 290.639892578125,
                y1: 172.74961853027344,
                x2: 318.25775146484375,
                y2: 182.60951232910156,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "20816",
            emoji: "",
          },
        },
      },
      date: {
        value: "5-Feb-24",
        flag: null,
        highlight: {
          id: "5302253515873912",
          content: {
            text: "5-Feb-24",
          },
          position: {
            boundingRect: {
              x1: 88.9019546508789,
              y1: 133.81338500976562,
              x2: 131.00396728515625,
              y2: 143.17337036132812,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 88.9019546508789,
                y1: 133.81338500976562,
                x2: 131.00396728515625,
                y2: 143.17337036132812,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 413.87982177734375,
                y1: 172.74961853027344,
                x2: 454.69775390625,
                y2: 182.60951232910156,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 413.87982177734375,
                y1: 248.7096405029297,
                x2: 454.69775390625,
                y2: 258.5695495605469,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "5-Feb-24",
            emoji: "",
          },
        },
      },
      due_date: {
        value: null,
        flag: null,
        highlight: null,
      },
      place_of_supply: {
        value: "Maharashtra",
        flag: null,
        highlight: {
          id: "1970827057290003",
          content: {
            text: "State Name : Maharashtra, Code : 27",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 241.1418914794922,
              x2: 206.53797912597656,
              y2: 251.0017852783203,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 241.1418914794922,
                x2: 206.53797912597656,
                y2: 251.0017852783203,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "State Name : Maharashtra, Code : 27",
            emoji: "",
          },
        },
      },
      reverse_charge_applicable: {
        value: false,
        flag: null,
        highlight: null,
      },
      order_number: {
        value: "PO-4250-240116044",
        flag: null,
        highlight: {
          id: "1137345971037615",
          content: {
            text: "PO-4250-240116044",
          },
          position: {
            boundingRect: {
              x1: 290.639892578125,
              y1: 248.7096405029297,
              x2: 383.4179382324219,
              y2: 258.5695495605469,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 290.639892578125,
                y1: 248.7096405029297,
                x2: 383.4179382324219,
                y2: 258.5695495605469,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "PO-4250-240116044",
            emoji: "",
          },
        },
      },
      terms_of_delivery: {
        value: null,
        flag: null,
        highlight: null,
      },
      flag: null,
    },
    sez_details: {
      declaration: {
        value: "NA",
        flag: null,
        highlight: null,
      },
      lut_number: {
        value: "NA",
        flag: null,
        highlight: null,
      },
      lut_validity: {
        value: "NA",
        flag: null,
        highlight: null,
      },
      flag: null,
    },
    tds_details: {
      lower_deduction_applicable: {
        value: "NA",
        flag: null,
        highlight: null,
      },
      flag: null,
    },
    line_items: [
      {
        item_number: {
          value: 1,
          flag: null,
          matching_ids: [],
        },
        hsn_code: {
          value: "94034000",
          flag: null,
          matching_ids: ["3281290881896864"],
        },
        description: {
          value: "Modular Works1",
          flag: null,
          matching_ids: ["1300366024638273"],
        },
        unit: {
          value: "Nos",
          flag: null,
          matching_ids: ["3343925337355779"],
        },
        quantity: {
          value: 1.0,
          flag: null,
          matching_ids: ["5494569530784507"],
        },
        unit_price: {
          value: 2361.49,
          flag: null,
          matching_ids: ["2938699729972056"],
        },
        taxable_value: {
          value: 2361.49,
          flag: null,
          matching_ids: ["3226533789981540"],
        },
        tax_rate: {
          value: "9%",
          flag: null,
          matching_ids: [],
        },
        tax_amount: {
          value: 425.06,
          flag: null,
          matching_ids: [],
        },
        total_value: {
          value: 2786.55,
          flag: null,
          matching_ids: ["3152326830079715"],
        },
        flag: null,
      },
    ],
    totals: {
      taxable_value: {
        value: 2361.49,
        flag: null,
        highlight: {
          id: "3226533789981540",
          content: {
            text: "2,361.49",
          },
          position: {
            boundingRect: {
              x1: 404.5198059082031,
              y1: 480.0758972167969,
              x2: 439.163818359375,
              y2: 488.9854431152344,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 404.5198059082031,
                y1: 480.0758972167969,
                x2: 439.163818359375,
                y2: 488.9854431152344,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "2,361.49",
            emoji: "",
          },
        },
      },
      tax_amount: {
        value: 425.06,
        flag: null,
        highlight: null,
      },
      rounding: {
        value: 0,
        flag: null,
        highlight: null,
      },
      invoice_total: {
        value: 2786.55,
        flag: null,
        highlight: {
          id: "3152326830079715",
          content: {
            text: "2,786.55",
          },
          position: {
            boundingRect: {
              x1: 483.35980224609375,
              y1: 590.9039916992188,
              x2: 533.1117553710938,
              y2: 602.8438110351562,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 483.35980224609375,
                y1: 590.9039916992188,
                x2: 533.1117553710938,
                y2: 602.8438110351562,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "2,786.55",
            emoji: "",
          },
        },
      },
      amount_in_words: {
        value:
          "INR Two Thousand Seven Hundred Eighty Six and Fifty Five paise Only",
        flag: null,
        highlight: {
          id: "2350686869564283",
          content: {
            text: "INR Two Thousand Seven Hundred Eighty Six and Fifty",
          },
          position: {
            boundingRect: {
              x1: 38.639984130859375,
              y1: 617.533203125,
              x2: 277.181884765625,
              y2: 626.533203125,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 38.639984130859375,
                y1: 617.533203125,
                x2: 277.181884765625,
                y2: 626.533203125,
                width: 612.0,
                height: 792.0,
              },
              {
                x1: 38.639984130859375,
                y1: 628.3331298828125,
                x2: 104.84394836425781,
                y2: 637.3331298828125,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "INR Two Thousand Seven Hundred Eighty Six and Fifty",
            emoji: "",
          },
        },
      },
      subtotal: {
        value: 2361.49,
        flag: null,
        highlight: {
          id: "3226533789981540",
          content: {
            text: "2,361.49",
          },
          position: {
            boundingRect: {
              x1: 404.5198059082031,
              y1: 480.0758972167969,
              x2: 439.163818359375,
              y2: 488.9854431152344,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 404.5198059082031,
                y1: 480.0758972167969,
                x2: 439.163818359375,
                y2: 488.9854431152344,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "2,361.49",
            emoji: "",
          },
        },
      },
      flag: null,
    },
    signature: {
      authorized_signatory: {
        value: "Authorised Signatory",
        flag: null,
        highlight: {
          id: "2657235654138616",
          content: {
            text: "Autherised Signatory",
          },
          position: {
            boundingRect: {
              x1: 368.15985107421875,
              y1: 747.84130859375,
              x2: 452.0868225097656,
              y2: 756.3901977539062,
              width: 612.0,
              height: 792.0,
            },
            rects: [
              {
                x1: 368.15985107421875,
                y1: 747.84130859375,
                x2: 452.0868225097656,
                y2: 756.3901977539062,
                width: 612.0,
                height: 792.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "Autherised Signatory",
            emoji: "",
          },
        },
      },
      flag: null,
    },
    remarks: {
      remarks: {
        value: null,
        flag: null,
        highlight: null,
      },
      flag: null,
    },
    additional_fields: {
      shipment_tracking_number: {
        value: null,
        flag: null,
        highlight: null,
      },
      delivery_date: {
        value: null,
        flag: null,
        highlight: null,
      },
      delivery_terms: {
        value: null,
        flag: null,
        highlight: null,
      },
      payment_terms: {
        value: null,
        flag: null,
        highlight: null,
      },
      flag: null,
    },
  },
};

// Utility functions
const getNextId = () => String(Math.random()).slice(2);
const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);
const resetHash = () => {
  document.location.hash = "";
};

// Convert JSON data to IHighlight format
const convertJsonToHighlights = (jsonData: any): Array<IHighlight> => {
  const highlights: IHighlight[] = [];
  const stack: any[] = [jsonData]; // Use a stack to avoid recursion

  while (stack.length > 0) {
    const current = stack.pop();

    if (typeof current === "object" && current !== null) {
      if ("highlight" in current && current.highlight !== null) {
        highlights.push(current.highlight);
      }

      // Push child objects onto the stack
      for (const key in current) {
        if (current.hasOwnProperty(key)) {
          stack.push(current[key]);
        }
      }
    }
  }

  return highlights;
};

interface HighlightPopupProps {
  comment: {
    text: string;
    emoji: string;
  };
}

const HighlightPopup = ({ comment }: HighlightPopupProps) =>
  comment.text ? <div className="Highlight__popup">{comment.text}</div> : null;

export default function HighlightPdf() {
  const { highlightsData } = useDocumentData();

  const [url, setUrl] = useState<string>("");
  const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
  const scrollViewerTo = useRef<(highlight: IHighlight) => void>(() => {});

  const getHighlightById = useCallback(
    (id: string) => highlights.find((highlight) => highlight.id === id),
    [highlights]
  );

  const scrollToHighlightFromHash = useCallback(() => {
    const highlight = getHighlightById(parseIdFromHash());
    if (highlight && scrollViewerTo.current) {
      scrollViewerTo.current(highlight);
    }
  }, [getHighlightById]);

  useEffect(() => {
    window.addEventListener("hashchange", scrollToHighlightFromHash, false);
    return () => {
      window.removeEventListener(
        "hashchange",
        scrollToHighlightFromHash,
        false
      );
    };
  }, [scrollToHighlightFromHash]);

  const resetHighlights = useCallback(() => {
    setHighlights([]);
  }, []);

  const toggleDocument = useCallback(() => {
    setUrl(url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL);
  }, [url]);

  const addHighlight = useCallback((highlight: NewHighlight) => {
    setHighlights((prevHighlights) => [
      { ...highlight, id: getNextId() },
      ...prevHighlights,
    ]);
  }, []);

  const updateHighlight = useCallback(
    (
      highlightId: string,
      position: Partial<ScaledPosition>,
      content: Partial<Content>
    ) => {
      setHighlights((prevHighlights) =>
        prevHighlights.map((h) => {
          const {
            id,
            position: originalPosition,
            content: originalContent,
            ...rest
          } = h;
          return id === highlightId
            ? {
                id,
                position: { ...originalPosition, ...position },
                content: { ...originalContent, ...content },
                ...rest,
              }
            : h;
        })
      );
    },
    []
  );

  useGlobalHideScrollbar();

  // Load and process JSON data
  useEffect(() => {
    const processHighlights = () => {
      if (highlightsData) {
        setUrl(highlightsData.doc_url);
        const convertedHighlights = convertJsonToHighlights(highlightsData);
        setHighlights(convertedHighlights);
      }
    };

    processHighlights();
  }, []);

  useEffect(() => {
    document.body.classList.add("scrollable");
  }, []);

  return (
    <div
      className="App scrollable"
      style={{ display: "flex", height: "100vh" }}
    >
      <Sidebar
        highlightsContent={highlightsData!.data}
        resetHighlights={resetHighlights}
        toggleDocument={toggleDocument}
      />

      <div
        style={{
          height: "100vh",
          width: `70vw`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
            <div className="scrollable">
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={(event) => event.altKey}
                onScrollChange={resetHash}
                scrollRef={(scrollTo) => {
                  scrollViewerTo.current = scrollTo;
                  scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={(comment) => {
                      addHighlight({ content, position, comment });
                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !highlight.content?.image;

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      isScrolledTo={isScrolledTo}
                      highlight={highlight}
                      onChange={(boundingRect) => {
                        updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={(popupContent) =>
                        setTip(highlight, () => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                    >
                      {component}
                    </Popup>
                  );
                }}
                highlights={highlights}
              />
            </div>
          )}
        </PdfLoader>
      </div>
    </div>
  );
}