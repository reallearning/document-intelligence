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

const data = {
  pdf_url:
    "https://storage.googleapis.com/morrie-resources/demo/PO-4613-240708223_HS-2-12928-24-25.pdf",
  format: "pdf",
  highlights: {
    supplier: {
      name: {
        value: "Hangerspace Interior Solutions",
        flag: null,
        highlight: {
          id: "1366790510873494",
          content: {
            text: "Hangerspace Interior Solutions",
          },
          position: {
            boundingRect: {
              x1: 94.0,
              y1: 132.44000244140625,
              x2: 223.08189392089844,
              y2: 143.45599365234375,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 94.0,
                y1: 132.44000244140625,
                x2: 223.08189392089844,
                y2: 143.45599365234375,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 375.0,
                y1: 717.2960205078125,
                x2: 499.1857604980469,
                y2: 727.2103881835938,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 31.0,
                y1: 222.29249572753906,
                x2: 145.9033203125,
                y2: 233.42190551757812,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      address: {
        value:
          "67/1, Vittasandra Main Road, Vittasandra Village, Bengaluru-560068",
        flag: null,
        highlight: {
          id: "1394347603384193",
          content: {
            text: "67/1,Vittasandra Main Road",
          },
          position: {
            boundingRect: {
              x1: 94.0,
              y1: 142.39999389648438,
              x2: 209.27357482910156,
              y2: 153.39199829101562,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 94.0,
                y1: 142.39999389648438,
                x2: 209.27357482910156,
                y2: 153.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 94.0,
                y1: 152.39999389648438,
                x2: 171.53414916992188,
                y2: 163.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 94.0,
                y1: 162.39999389648438,
                x2: 170.51113891601562,
                y2: 173.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 31.0,
                y1: 278.260009765625,
                x2: 251.98468017578125,
                y2: 288.1528015136719,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 31.0,
                y1: 288.260009765625,
                x2: 144.0619354248047,
                y2: 298.1528015136719,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      gstin: {
        value: "29AALFH4268C1Z8",
        flag: null,
        highlight: {
          id: "2640699184279780",
          content: {
            text: "GSTIN/UIN: 29AALFH4268C1Z8",
          },
          position: {
            boundingRect: {
              x1: 94.0,
              y1: 172.39999389648438,
              x2: 221.15924072265625,
              y2: 183.39199829101562,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 94.0,
                y1: 172.39999389648438,
                x2: 221.15924072265625,
                y2: 183.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 31.0,
                y1: 234.29249572753906,
                x2: 138.9227752685547,
                y2: 245.42190551757812,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 93.0,
                y1: 160.3330078125,
                x2: 169.74449157714844,
                y2: 171.4866943359375,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      state: {
        value: "Karnataka",
        flag: null,
        highlight: {
          id: "3420118345101160",
          content: {
            text: "State Name",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 258.3999938964844,
              x2: 83.68940734863281,
              y2: 269.3919982910156,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 258.3999938964844,
                x2: 83.68940734863281,
                y2: 269.3919982910156,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 31.0,
                y1: 246.29249572753906,
                x2: 69.15045928955078,
                y2: 257.4219055175781,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      state_code: {
        value: "29",
        flag: null,
        highlight: {
          id: "2897554285795379",
          content: {
            text: "State Name : Karnataka, Code : 29",
          },
          position: {
            boundingRect: {
              x1: 94.0,
              y1: 182.39999389648438,
              x2: 219.1517333984375,
              y2: 193.39199829101562,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 94.0,
                y1: 182.39999389648438,
                x2: 219.1517333984375,
                y2: 193.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 101.0,
                y1: 258.3999938964844,
                x2: 195.88507080078125,
                y2: 269.3919982910156,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      pan_number: {
        value: null,
        flag: null,
      },
      contact_details: {
        value: "hangerspaceinteriors@gmail.com",
        flag: null,
        highlight: {
          id: "2301123294522463",
          content: {
            text: "E-Mail : hangerspaceinteriors@gmail.com",
          },
          position: {
            boundingRect: {
              x1: 94.0,
              y1: 192.39999389648438,
              x2: 216.5950164794922,
              y2: 203.39199829101562,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 94.0,
                y1: 192.39999389648438,
                x2: 216.5950164794922,
                y2: 203.39199829101562,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      bank_account_number: {
        value: "39252050000082",
        flag: null,
        highlight: {
          id: "1120477014443561",
          content: {
            text: "395205000082",
          },
          position: {
            boundingRect: {
              x1: 375.0,
              y1: 735.2960205078125,
              x2: 430.8446044921875,
              y2: 745.2103881835938,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 375.0,
                y1: 735.2960205078125,
                x2: 430.8446044921875,
                y2: 745.2103881835938,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      bank_name: {
        value: "NA",
        flag: null,
        highlight: {
          id: "3310684961104905",
          content: {
            text: "ICICI BANK",
          },
          position: {
            boundingRect: {
              x1: 375.0,
              y1: 726.2960205078125,
              x2: 420.56640625,
              y2: 736.2103881835938,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 375.0,
                y1: 726.2960205078125,
                x2: 420.56640625,
                y2: 736.2103881835938,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      branch: {
        value: "Singasandra & ICIC0003952",
        flag: null,
        highlight: {
          id: "1913159853251931",
          content: {
            text: "Singasandra & ICIC0003952",
          },
          position: {
            boundingRect: {
              x1: 375.0,
              y1: 744.2960205078125,
              x2: 485.2497253417969,
              y2: 754.2103881835938,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 375.0,
                y1: 744.2960205078125,
                x2: 485.2497253417969,
                y2: 754.2103881835938,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      ifsc_code: {
        value: "ICIC0003952",
        flag: null,
        highlight: {
          id: "1913159853251931",
          content: {
            text: "Singasandra & ICIC0003952",
          },
          position: {
            boundingRect: {
              x1: 375.0,
              y1: 744.2960205078125,
              x2: 485.2497253417969,
              y2: 754.2103881835938,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 375.0,
                y1: 744.2960205078125,
                x2: 485.2497253417969,
                y2: 754.2103881835938,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      flag: null,
    },
    buyer: {
      name: {
        value: "Home Interior Designs E-Commerce Pvt. Ltd",
        flag: null,
        highlight: {
          id: "2610984906585511",
          content: {
            text: "Home Interior Designs E-Commerce Pvt. Ltd",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 283.44000244140625,
              x2: 219.43392944335938,
              y2: 294.45599365234375,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 283.44000244140625,
                x2: 219.43392944335938,
                y2: 294.45599365234375,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 310.0,
                y1: 222.29249572753906,
                x2: 475.58380126953125,
                y2: 233.42190551757812,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      address: {
        value:
          "283/58/7, 3 Floor, Aurbis Business Park, Outer ring road, Devarabisana Halli, Bellandur, Bengaluru (Bangalore) Urban, Karnataka, 560103",
        flag: null,
        highlight: {
          id: "6618518567977754",
          content: {
            text: "283/58/7,3 Floor, Aurbis Business Park",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 293.3999938964844,
              x2: 193.27130126953125,
              y2: 304.3919982910156,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 293.3999938964844,
                x2: 193.27130126953125,
                y2: 304.3919982910156,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 32.0,
                y1: 303.3999938964844,
                x2: 210.516845703125,
                y2: 314.3919982910156,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 32.0,
                y1: 313.3999938964844,
                x2: 212.94949340820312,
                y2: 324.3919982910156,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      gstin: {
        value: "29AADCH4222R3Z3",
        flag: null,
        highlight: {
          id: "3015830521765685",
          content: {
            text: ": 29AADCH4222R3Z3",
          },
          position: {
            boundingRect: {
              x1: 101.0,
              y1: 323.3999938964844,
              x2: 194.31333923339844,
              y2: 334.3919982910156,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 101.0,
                y1: 323.3999938964844,
                x2: 194.31333923339844,
                y2: 334.3919982910156,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 310.0,
                y1: 234.29249572753906,
                x2: 420.24139404296875,
                y2: 245.42190551757812,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      contact_details: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    consignee: {
      name: {
        value: "Jayanthi M",
        flag: null,
        highlight: {
          id: "2782066582955081",
          content: {
            text: "Jayanthi M-",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 218.44000244140625,
              x2: 83.15930938720703,
              y2: 229.45599365234375,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 218.44000244140625,
                x2: 83.15930938720703,
                y2: 229.45599365234375,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 454.0,
                y1: 179.44000244140625,
                x2: 505.1593017578125,
                y2: 190.45599365234375,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      address: {
        value:
          "Sai Samrudhi Layout, Site #26, Muthsandra Main Road, Behind Family Mall, Near GKY Tyre Shop, Varthur, Bengaluru - 560087",
        flag: null,
        highlight: {
          id: "8112169460870138",
          content: {
            text: "Sai Samruddhi Layout, Site #26, Muthsandra Main Road,",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 228.39999389648438,
              x2: 206.5009307861328,
              y2: 239.39199829101562,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 228.39999389648438,
                x2: 206.5009307861328,
                y2: 239.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 32.0,
                y1: 238.39999389648438,
                x2: 210.2476806640625,
                y2: 249.39199829101562,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 32.0,
                y1: 248.39999389648438,
                x2: 113.6819076538086,
                y2: 259.3919982910156,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 310.0,
                y1: 278.260009765625,
                x2: 552.082275390625,
                y2: 288.1528015136719,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 310.0,
                y1: 288.260009765625,
                x2: 550.6748046875,
                y2: 298.1528015136719,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      gstin: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    invoice_details: {
      number: {
        value: "HS/212928/24-25",
        flag: null,
        highlight: {
          id: "6163796486271222",
          content: {
            text: "HS-2/12928/24-25",
          },
          position: {
            boundingRect: {
              x1: 349.0,
              y1: 140.44000244140625,
              x2: 387.4035949707031,
              y2: 151.45599365234375,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 349.0,
                y1: 140.44000244140625,
                x2: 387.4035949707031,
                y2: 151.45599365234375,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 349.0,
                y1: 219.44000244140625,
                x2: 424.9903259277344,
                y2: 230.45599365234375,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 76.0,
                y1: 49.295997619628906,
                x2: 194.81228637695312,
                y2: 59.21039962768555,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      date: {
        value: "1-Aug-24",
        flag: null,
        highlight: {
          id: "2012913731797821",
          content: {
            text: "1-Aug-24",
          },
          position: {
            boundingRect: {
              x1: 87.0,
              y1: 104.33300018310547,
              x2: 122.80685424804688,
              y2: 115.48670196533203,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 87.0,
                y1: 104.33300018310547,
                x2: 122.80685424804688,
                y2: 115.48670196533203,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 454.0,
                y1: 139.44000244140625,
                x2: 493.7854309082031,
                y2: 150.45599365234375,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 76.0,
                y1: 58.295997619628906,
                x2: 111.80685424804688,
                y2: 68.21040344238281,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      due_date: {
        value: null,
        flag: null,
      },
      place_of_supply: {
        value: "Karnataka",
        flag: null,
        highlight: {
          id: "3420118345101160",
          content: {
            text: "State Name",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 258.3999938964844,
              x2: 83.68940734863281,
              y2: 269.3919982910156,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 258.3999938964844,
                x2: 83.68940734863281,
                y2: 269.3919982910156,
                width: 595.0,
                height: 841.0,
              },
              {
                x1: 31.0,
                y1: 246.29249572753906,
                x2: 69.15045928955078,
                y2: 257.4219055175781,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      reverse_charge_applicable: {
        value: false,
        flag: null,
      },
      order_number: {
        value: "PO-4613-240708223",
        flag: null,
        highlight: {
          id: "1051917948439261",
          content: {
            text: "PO-4613-240708223",
          },
          position: {
            boundingRect: {
              x1: 349.0,
              y1: 199.44000244140625,
              x2: 435.852783203125,
              y2: 210.45599365234375,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 349.0,
                y1: 199.44000244140625,
                x2: 435.852783203125,
                y2: 210.45599365234375,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      terms_of_delivery: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    sez_details: {
      declaration: {
        value: null,
        flag: null,
      },
      lut_number: {
        value: null,
        flag: null,
      },
      lut_validity: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    tds_details: {
      lower_deduction_applicable: {
        value: false,
        flag: null,
      },
      flag: null,
    },
    line_items: [
      {
        item_number: {
          value: 1,
          flag: null,
        },
        hsn_code: {
          value: "94034000",
          flag: null,
          matching_ids: ["7789746169803460", "2740780194117358"],
        },
        description: {
          value: "Modular Work",
          flag: null,
          matching_ids: ["2081924038231267", "3108352060116887"],
        },
        unit: {
          value: "No's",
          flag: null,
          matching_ids: ["1457427730451865", "2815801451333395"],
        },
        quantity: {
          value: 1,
          flag: null,
        },
        unit_price: {
          value: 1318.69,
          flag: null,
          matching_ids: ["1822831010820835"],
        },
        taxable_value: {
          value: 1318.69,
          flag: null,
          matching_ids: ["1081250020710654", "1886894524331160"],
        },
        tax_rate: {
          value: "9% CGST + 9% SGST",
          flag: null,
          matching_ids: ["2194265297413974"],
        },
        tax_amount: {
          value: 237.36,
          flag: null,
          matching_ids: ["4564718538457127"],
        },
        total_value: {
          value: 1556.05,
          flag: null,
          matching_ids: ["2973937906614212"],
        },
        flag: null,
      },
    ],
    totals: {
      taxable_value: {
        value: 1318.69,
        flag: null,
        highlight: {
          id: "1500672292769985",
          content: {
            text: "1,318.69",
          },
          position: {
            boundingRect: {
              x1: 289.0,
              y1: 669.260009765625,
              x2: 321.5760498046875,
              y2: 679.1527709960938,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 289.0,
                y1: 669.260009765625,
                x2: 321.5760498046875,
                y2: 679.1527709960938,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      tax_amount: {
        value: 237.36,
        flag: null,
        highlight: {
          id: "7057360385116607",
          content: {
            text: "237.36",
          },
          position: {
            boundingRect: {
              x1: 531.0,
              y1: 678.2589721679688,
              x2: 556.5955810546875,
              y2: 686.93408203125,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 531.0,
                y1: 678.2589721679688,
                x2: 556.5955810546875,
                y2: 686.93408203125,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      rounding: {
        value: 0,
        flag: null,
      },
      invoice_total: {
        value: 1556.05,
        flag: null,
        highlight: {
          id: "2251182865944875",
          content: {
            text: "1,556.05",
          },
          position: {
            boundingRect: {
              x1: 509.0,
              y1: 608.72802734375,
              x2: 555.5371704101562,
              y2: 621.9472045898438,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 509.0,
                y1: 608.72802734375,
                x2: 555.5371704101562,
                y2: 621.9472045898438,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      amount_in_words: {
        value: "INR One Thousand Five Hundred Fifty Six and Five paise Only",
        flag: null,
        highlight: {
          id: "1427749493875538",
          content: {
            text: "INR One Thousand Five Hundred Fifty Six and Five paise Only",
          },
          position: {
            boundingRect: {
              x1: 32.0,
              y1: 632.3699951171875,
              x2: 306.4244384765625,
              y2: 644.7630004882812,
              width: 595.0,
              height: 841.0,
            },
            rects: [
              {
                x1: 32.0,
                y1: 632.3699951171875,
                x2: 306.4244384765625,
                y2: 644.7630004882812,
                width: 595.0,
                height: 841.0,
              },
            ],
            pageNumber: 1,
          },
          comment: {
            text: "",
            emoji: "",
          },
        },
      },
      subtotal: {
        value: "NA",
        flag: null,
      },
      flag: null,
    },
    signature: {
      authorized_signatory: {
        value: "OLAYANKAR L OLAVAPPA MURALI",
        flag: null,
      },
      flag: null,
    },
    remarks: {
      remarks: {
        value: null,
        flag: null,
      },
      flag: null,
    },
    additional_fields: {
      shipment_tracking_number: {
        value: null,
        flag: null,
      },
      delivery_date: {
        value: null,
        flag: null,
      },
      delivery_terms: {
        value: null,
        flag: null,
      },
      payment_terms: {
        value: null,
        flag: null,
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
  // console.log(jsonData);
  // Check if jsonData contains highlights
  // if (!jsonData || !Array.isArray(jsonData.highlights)) {
  //   console.error("Invalid JSON data format: highlights array missing");
  //   return [];
  // }

  // // Map the highlights array to IHighlight objects
  // const highlights = jsonData.highlights.map((item: any) => ({
  //   id: item.id,
  //   content: {
  //     text: item.content?.text || "",
  //   },
  //   position: {
  //     boundingRect: item.position?.boundingRect || {},
  //     rects: item.position?.rects || [],
  //     pageNumber: item.position?.pageNumber || 1,
  //   },
  //   comment: {
  //     text: item.comment?.text || "",
  //     emoji: item.comment?.emoji || "",
  //   },
  // }));

  // return highlights;
  const highlights: IHighlight[] = [];
  const stack: any[] = [jsonData]; // Use a stack to avoid recursion

  while (stack.length > 0) {
    const current = stack.pop();

    if (typeof current === "object" && current !== null) {
      if ("highlight" in current) {
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

// const json = {
//   pdf_url:
//     "https://storage.googleapis.com/morrie-resources/documents/invoice-3.pdf",
//   highlights: [
//     {
//       content: {
//         text: "Identified the document title from the text 'SERVICE AGREEMENT' on page 1.",
//       },
//       position: {
//         boundingRect: {
//           x1: 212.28662109375,
//           y1: 239.84814453125,
//           x2: 363.71124267578125,
//           y2: 254.79833984375,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 212.28662109375,
//             y1: 239.84814453125,
//             x2: 363.71124267578125,
//             y2: 254.79833984375,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "Document Title",
//         emoji: "",
//       },
//       id: "4595170796264587",
//     },
//     {
//       content: {
//         text: "Extracted names of the parties involved in the agreement from page 1.",
//       },
//       position: {
//         boundingRect: {
//           x1: 509.33758544921875,
//           y1: 271.59417724609375,
//           x2: 539.687744140625,
//           y2: 283.77581787109375,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 509.33758544921875,
//             y1: 271.59417724609375,
//             x2: 539.687744140625,
//             y2: 283.77581787109375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 286.14044189453125,
//             x2: 121.07513427734375,
//             y2: 298.32208251953125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 179.7085418701172,
//             y1: 300.68670654296875,
//             x2: 277.32464599609375,
//             y2: 312.86834716796875,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "Involved Parties",
//         emoji: "",
//       },
//       id: "8003154071349245",
//     },
//     {
//       content: {
//         text: "Identified sections describing the scope of services provided in the agreement from page 1.",
//       },
//       position: {
//         boundingRect: {
//           x1: 36.0,
//           y1: 515.5105590820312,
//           x2: 159.00064086914062,
//           y2: 527.6921997070312,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 36.0,
//             y1: 515.5105590820312,
//             x2: 159.00064086914062,
//             y2: 527.6921997070312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 539.1594848632812,
//             x2: 143.76321411132812,
//             y2: 551.3411254882812,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 563.8084106445312,
//             x2: 538.8409423828125,
//             y2: 575.9900512695312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 588.5056762695312,
//             x2: 155.7481231689453,
//             y2: 600.6873168945312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 601.2029418945312,
//             x2: 453.534912109375,
//             y2: 613.3845825195312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 639.2947387695312,
//             x2: 191.97738647460938,
//             y2: 651.4763793945312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 651.9920043945312,
//             x2: 331.1717224121094,
//             y2: 664.1736450195312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 690.0838012695312,
//             x2: 157.58865356445312,
//             y2: 702.2654418945312,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 702.7810668945312,
//             x2: 403.5280456542969,
//             y2: 714.9627075195312,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "Scope of Services",
//         emoji: "",
//       },
//       id: "1431416514301449",
//     },
//     {
//       content: {
//         text: "Collected clauses relating to the term and termination of the agreement from page 2.",
//       },
//       position: {
//         boundingRect: {
//           x1: 36.0,
//           y1: 189.6025390625,
//           x2: 189.6970977783203,
//           y2: 201.7841796875,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 36.0,
//             y1: 189.6025390625,
//             x2: 189.6970977783203,
//             y2: 201.7841796875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 213.25146484375,
//             x2: 149.6724395751953,
//             y2: 225.43310546875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 237.900390625,
//             x2: 525.0587768554688,
//             y2: 250.08203125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 250.54931640625,
//             x2: 280.1916809082031,
//             y2: 262.73095703125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 275.1982421875,
//             x2: 158.9510040283203,
//             y2: 287.3798828125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 299.84716796875,
//             x2: 535.826416015625,
//             y2: 312.02880859375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 312.49609375,
//             x2: 260.3488464355469,
//             y2: 324.677734375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 337.14501953125,
//             x2: 190.0865936279297,
//             y2: 349.32666015625,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 361.7939453125,
//             x2: 526.6961669921875,
//             y2: 373.9755859375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 374.44287109375,
//             x2: 314.9930725097656,
//             y2: 386.62451171875,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 2,
//       },
//       comment: {
//         text: "Term and Termination",
//         emoji: "",
//       },
//       id: "3149165288237325",
//     },
//     {
//       content: {
//         text: "Extracted information about fees and payment terms stated in the agreement from page 2.",
//       },
//       position: {
//         boundingRect: {
//           x1: 36.0,
//           y1: 425.6380615234375,
//           x2: 199.37765502929688,
//           y2: 437.8197021484375,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 36.0,
//             y1: 425.6380615234375,
//             x2: 199.37765502929688,
//             y2: 437.8197021484375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 452.184326171875,
//             x2: 150.60952758789062,
//             y2: 464.365966796875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 478.7305908203125,
//             x2: 249.21160888671875,
//             y2: 490.9122314453125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 505.27685546875,
//             x2: 137.6811981201172,
//             y2: 517.45849609375,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 2,
//       },
//       comment: {
//         text: "Fees and Payment Terms",
//         emoji: "",
//       },
//       id: "1109267243650165",
//     },
//     {
//       content: {
//         text: "Listed invoice schedules and related details from page 3.",
//       },
//       position: {
//         boundingRect: {
//           x1: 36.0,
//           y1: 327.540283203125,
//           x2: 138.89956665039062,
//           y2: 339.721923828125,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 36.0,
//             y1: 327.540283203125,
//             x2: 138.89956665039062,
//             y2: 339.721923828125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 380.68115234375,
//             x2: 110.78250122070312,
//             y2: 392.86279296875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 395.282958984375,
//             x2: 505.0561218261719,
//             y2: 407.464599609375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 409.8848876953125,
//             x2: 110.78250122070312,
//             y2: 422.0665283203125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 424.486572265625,
//             x2: 519.3116455078125,
//             y2: 436.668212890625,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 439.088623046875,
//             x2: 110.78250122070312,
//             y2: 451.270263671875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 453.6904296875,
//             x2: 425.58819580078125,
//             y2: 465.8720703125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 468.292236328125,
//             x2: 110.78250122070312,
//             y2: 480.473876953125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 482.89404296875,
//             x2: 372.36083984375,
//             y2: 495.07568359375,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 3,
//       },
//       comment: {
//         text: "Invoices Schedule",
//         emoji: "",
//       },
//       id: "3709496930069282",
//     },
//     {
//       content: {
//         text: "Compiled sections on compliance and contractual terms from page 4.",
//       },
//       position: {
//         boundingRect: {
//           x1: 36.0,
//           y1: 279.0322265625,
//           x2: 280.59124755859375,
//           y2: 291.2138671875,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 36.0,
//             y1: 279.0322265625,
//             x2: 280.59124755859375,
//             y2: 291.2138671875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 304.578369140625,
//             x2: 183.5655059814453,
//             y2: 316.760009765625,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 331.1728515625,
//             x2: 500.446044921875,
//             y2: 343.3544921875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 345.7265625,
//             x2: 75.27383422851562,
//             y2: 357.908203125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 360.3212890625,
//             x2: 511.8453369140625,
//             y2: 372.5029296875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 374.87451171875,
//             x2: 154.42559814453125,
//             y2: 387.05615234375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 389.46923828125,
//             x2: 508.3718566894531,
//             y2: 401.65087890625,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 404.022705078125,
//             x2: 251.22447204589844,
//             y2: 416.204345703125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 430.569091796875,
//             x2: 123.33489990234375,
//             y2: 442.750732421875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 457.115234375,
//             x2: 529.616455078125,
//             y2: 469.296875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 471.66162109375,
//             x2: 206.92831420898438,
//             y2: 483.84326171875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 498.207763671875,
//             x2: 191.14553833007812,
//             y2: 510.389404296875,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 524.802490234375,
//             x2: 530.80419921875,
//             y2: 536.984130859375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 539.35595703125,
//             x2: 175.803466796875,
//             y2: 551.53759765625,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 72.0,
//             y1: 553.950439453125,
//             x2: 518.5924072265625,
//             y2: 566.132080078125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 568.50390625,
//             x2: 231.3548126220703,
//             y2: 580.685546875,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 4,
//       },
//       comment: {
//         text: "Compliance and Contractual Terms",
//         emoji: "",
//       },
//       id: "2844152029748828",
//     },
//     {
//       content: {
//         text: "Outlined the governing law and dispute resolution process from page 5.",
//       },
//       position: {
//         boundingRect: {
//           x1: 36.0,
//           y1: 72.46728515625,
//           x2: 296.80621337890625,
//           y2: 84.64892578125,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 36.0,
//             y1: 72.46728515625,
//             x2: 296.80621337890625,
//             y2: 84.64892578125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 98.013671875,
//             x2: 126.08468627929688,
//             y2: 110.1953125,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 124.5595703125,
//             x2: 298.5209045410156,
//             y2: 136.7412109375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 151.10595703125,
//             x2: 141.35867309570312,
//             y2: 163.28759765625,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 177.65234375,
//             x2: 501.20166015625,
//             y2: 189.833984375,
//             width: 612.0,
//             height: 792.0,
//           },
//           {
//             x1: 36.0,
//             y1: 192.198486328125,
//             x2: 266.0805969238281,
//             y2: 204.380126953125,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 5,
//       },
//       comment: {
//         text: "Governing Law and Dispute Resolution",
//         emoji: "",
//       },
//       id: "8706554812841314",
//     },
//   ],
// };
// const jsonData = undefined;

export default function HighlightPdf() {
  // const { highlightsData } = useDocumentData();

  const [url, setUrl] = useState<string>("");
  const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
  const scrollViewerTo = useRef<(highlight: IHighlight) => void>(() => {});
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(
    null
  );

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
      if (data) {
        setUrl(data.pdf_url);
        const convertedHighlights = convertJsonToHighlights(data);
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
        highlightsContent={data.highlights}
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

// "use client";

// import "./app.css";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   PdfLoader,
//   PdfHighlighter,
//   Highlight,
//   AreaHighlight,
//   Popup,
//   Tip,
// } from "react-pdf-highlighter";
// import type {
//   IHighlight,
//   NewHighlight,
//   Content,
//   ScaledPosition,
// } from "react-pdf-highlighter";
// import { testHighlights as _testHighlights } from "./test-highlights";
// import "react-pdf-highlighter/dist/style.css";
// import { Sidebar } from "./sidebar";
// import { Spinner } from "./spinner";
// import test from "node:test";

// const jsonData = {
//   "/acme-contract.pdf": [
//     {
//       content: {
//         text: "Tel: (555) 123-4567",
//       },
//       position: {
//         boundingRect: {
//           x1: 548.2,
//           y1: 203.71,
//           x2: 667.21,
//           y2: 219.77,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 548.2,
//             y1: 203.71,
//             x2: 667.21,
//             y2: 219.77,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "7b0c11a3-73c8-4",
//     },
//     {
//       content: {
//         text: "Software License: :selected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.29,
//           y1: 817.8499999999999,
//           x2: 216.8,
//           y2: 834.53,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.29,
//             y1: 817.8499999999999,
//             x2: 216.8,
//             y2: 834.53,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "b6e899a5-8198-4",
//     },
//     {
//       content: {
//         text: "License for proprietary software enabling data management and workflow automation. :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.41,
//           y1: 835.98,
//           x2: 629.38,
//           y2: 852.21,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.41,
//             y1: 835.98,
//             x2: 629.38,
//             y2: 852.21,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "f798bf83-2042-4",
//     },
//     {
//       content: {
//         text: "Value: $75,000 :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.29,
//           y1: 853.4599999999999,
//           x2: 192.04000000000002,
//           y2: 869.35,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.29,
//             y1: 853.4599999999999,
//             x2: 192.04000000000002,
//             y2: 869.35,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "874ab41b-ff9a-4",
//     },
//     {
//       content: {
//         text: "Recognition: Rateable over the contract term (36 months). :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.54,
//           y1: 870.8299999999999,
//           x2: 455.56,
//           y2: 888.5,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.54,
//             y1: 870.8299999999999,
//             x2: 455.56,
//             y2: 888.5,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "41ec4038-7fdf-4",
//     },
//     {
//       content: {
//         text: "Implementation Services: :selected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.41,
//           y1: 888.69,
//           x2: 265.58000000000004,
//           y2: 905.23,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.41,
//             y1: 888.69,
//             x2: 265.58000000000004,
//             y2: 905.23,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "a5829287-a653-4",
//     },
//     {
//       content: {
//         text: "Includes system setup, customization, and data integration. :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.54,
//           y1: 906.1600000000001,
//           x2: 458.90000000000003,
//           y2: 922.87,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.54,
//             y1: 906.1600000000001,
//             x2: 458.90000000000003,
//             y2: 922.87,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "91bc572f-7bfe-4",
//     },
//     {
//       content: {
//         text: "Value: $50,000 :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.54,
//           y1: 924.1099999999999,
//           x2: 192.04000000000002,
//           y2: 940.01,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.54,
//             y1: 924.1099999999999,
//             x2: 192.04000000000002,
//             y2: 940.01,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "b59116c4-e099-4",
//     },
//     {
//       content: {
//         text: "Recognition: Milestone-based, recognized over the first 6 months. :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.41,
//           y1: 941.97,
//           x2: 503.31,
//           y2: 958.6800000000001,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.41,
//             y1: 941.97,
//             x2: 503.31,
//             y2: 958.6800000000001,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "8bb5ac0f-3ace-4",
//     },
//     {
//       content: {
//         text: "Training Services: :selected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.160000000000004,
//           y1: 958.92,
//           x2: 219.73,
//           y2: 976.83,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.160000000000004,
//             y1: 958.92,
//             x2: 219.73,
//             y2: 976.83,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "bf2f33d7-7ca2-4",
//     },
//     {
//       content: {
//         text: "Comprehensive training sessions and training documentation for end-users. :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.54,
//           y1: 976.82,
//           x2: 560.62,
//           y2: 994.0099999999999,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.54,
//             y1: 976.82,
//             x2: 560.62,
//             y2: 994.0099999999999,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 1,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "c0721d4b-00ce-4",
//     },
//     {
//       content: {
//         text: "Value: $25,000 :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.54,
//           y1: 101.22,
//           x2: 192.44,
//           y2: 116.97,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.54,
//             y1: 101.22,
//             x2: 192.44,
//             y2: 116.97,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 2,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "3c522de7-9404-4",
//     },
//     {
//       content: {
//         text: "Recognition: Rateable over 12 months. :unselected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.29,
//           y1: 118.88000000000001,
//           x2: 337.61,
//           y2: 135.10999999999999,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.29,
//             y1: 118.88000000000001,
//             x2: 337.61,
//             y2: 135.10999999999999,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 2,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "d34586b2-a410-4",
//     },
//     {
//       content: {
//         text: "Quarterly Progress Reports detailing work completed and any issues encountered. :selected:",
//       },
//       position: {
//         boundingRect: {
//           x1: 50.41,
//           y1: 187.63,
//           x2: 600.25,
//           y2: 204.82,
//           width: 612.0,
//           height: 792.0,
//         },
//         rects: [
//           {
//             x1: 50.41,
//             y1: 187.63,
//             x2: 600.25,
//             y2: 204.82,
//             width: 612.0,
//             height: 792.0,
//           },
//         ],
//         pageNumber: 2,
//       },
//       comment: {
//         text: "",
//         emoji: "",
//       },
//       id: "15356698-b0e9-4",
//     },
//   ],
// };
// const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

// console.log(testHighlights, "testHighlights");

// const PRIMARY_PDF_URL = "/acme-contract.pdf";
// const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480";

// const getNextId = () => String(Math.random()).slice(2);
// const parseIdFromHash = () =>
//   document.location.hash.slice("#highlight-".length);
// const resetHash = () => {
//   document.location.hash = "";
// };

// interface HighlightPopupProps {
//   comment: {
//     text: string;
//     emoji: string;
//   };
// }

// const HighlightPopup = ({ comment }: HighlightPopupProps) =>
//   comment.text ? (
//     <div className="Highlight__popup">
//       {comment.emoji} {comment.text}
//     </div>
//   ) : null;

// export function App() {
//   const [initialUrl, setInitialUrl] = useState<string>(PRIMARY_PDF_URL);
//   const [url, setUrl] = useState<string>(initialUrl);
//   const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
//   const scrollViewerTo = useRef<(highlight: IHighlight) => void>(() => {});

//   // Initialize URL from search params
//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const urlFromParams = params.get("url") || PRIMARY_PDF_URL;
//     setInitialUrl(urlFromParams);
//     setUrl(urlFromParams);
//   }, []);

//   // Sync highlights when URL changes
//   useEffect(() => {
//     if (url) {
//       setHighlights(testHighlights[url] ? [...testHighlights[url]] : []);
//     }
//   }, [url]);

//   // Memoize getHighlightById to prevent unnecessary re-renders
//   const getHighlightById = useCallback(
//     (id: string) => {
//       return highlights.find((highlight) => highlight.id === id);
//     },
//     [highlights]
//   );

//   const scrollToHighlightFromHash = useCallback(() => {
//     const highlight = getHighlightById(parseIdFromHash());
//     if (highlight && scrollViewerTo.current) {
//       scrollViewerTo.current(highlight);
//     }
//   }, [getHighlightById]);

//   useEffect(() => {
//     window.addEventListener("hashchange", scrollToHighlightFromHash, false);
//     return () => {
//       window.removeEventListener(
//         "hashchange",
//         scrollToHighlightFromHash,
//         false
//       );
//     };
//   }, [scrollToHighlightFromHash]);

//   const resetHighlights = useCallback(() => {
//     setHighlights([]);
//   }, []);

//   const toggleDocument = useCallback(() => {
//     const newUrl =
//       url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;
//     setUrl(newUrl);
//   }, [url]);

//   const addHighlight = useCallback((highlight: NewHighlight) => {
//     setHighlights((prevHighlights) => [
//       { ...highlight, id: getNextId() },
//       ...prevHighlights,
//     ]);
//   }, []);

//   const updateHighlight = useCallback(
//     (
//       highlightId: string,
//       position: Partial<ScaledPosition>,
//       content: Partial<Content>
//     ) => {
//       setHighlights((prevHighlights) =>
//         prevHighlights.map((h) => {
//           const {
//             id,
//             position: originalPosition,
//             content: originalContent,
//             ...rest
//           } = h;
//           return id === highlightId
//             ? {
//                 id,
//                 position: { ...originalPosition, ...position },
//                 content: { ...originalContent, ...content },
//                 ...rest,
//               }
//             : h;
//         })
//       );
//     },
//     []
//   );

//   return (
//     <div className="App" style={{ display: "flex", height: "100vh" }}>
//       <Sidebar
//         highlights={highlights}
//         resetHighlights={resetHighlights}
//         toggleDocument={toggleDocument}
//       />

//       <div
//         style={{
//           height: "100vh",
//           width: "75vw",
//           position: "relative",
//           overflow: "hidden", // Prevent any potential scrolling issues
//         }}
//       >
//         <PdfLoader url={url} beforeLoad={<Spinner />}>
//           {(pdfDocument) => (
//             <PdfHighlighter
//               pdfDocument={pdfDocument}
//               enableAreaSelection={(event) => event.altKey}
//               onScrollChange={resetHash}
//               scrollRef={(scrollTo) => {
//                 scrollViewerTo.current = scrollTo;
//                 scrollToHighlightFromHash();
//               }}
//               onSelectionFinished={(
//                 position,
//                 content,
//                 hideTipAndSelection,
//                 transformSelection
//               ) => (
//                 <Tip
//                   onOpen={transformSelection}
//                   onConfirm={(comment) => {
//                     addHighlight({ content, position, comment });
//                     hideTipAndSelection();
//                   }}
//                 />
//               )}
//               highlightTransform={(
//                 highlight,
//                 index,
//                 setTip,
//                 hideTip,
//                 viewportToScaled,
//                 screenshot,
//                 isScrolledTo
//               ) => {
//                 const isTextHighlight = !highlight.content?.image;

//                 const component = isTextHighlight ? (
//                   <Highlight
//                     isScrolledTo={isScrolledTo}
//                     position={highlight.position}
//                     comment={highlight.comment}
//                   />
//                 ) : (
//                   <AreaHighlight
//                     isScrolledTo={isScrolledTo}
//                     highlight={highlight}
//                     onChange={(boundingRect) => {
//                       updateHighlight(
//                         highlight.id,
//                         { boundingRect: viewportToScaled(boundingRect) },
//                         { image: screenshot(boundingRect) }
//                       );
//                     }}
//                   />
//                 );

//                 return (
//                   <Popup
//                     popupContent={<HighlightPopup {...highlight} />}
//                     onMouseOver={(popupContent) =>
//                       setTip(highlight, () => popupContent)
//                     }
//                     onMouseOut={hideTip}
//                     key={index}
//                   >
//                     {component}
//                   </Popup>
//                 );
//               }}
//               highlights={highlights}
//             />
//           )}
//         </PdfLoader>
//       </div>
//     </div>
//   );
// }

// export default App;
// "use client";

// import React, { useState, useEffect, useCallback, useRef } from "react";
// import {
//   PdfLoader,
//   PdfHighlighter,
//   Highlight,
//   AreaHighlight,
//   Popup,
//   Tip,
// } from "react-pdf-highlighter";
// import type {
//   IHighlight,
//   NewHighlight,
//   Content,
//   ScaledPosition,
// } from "react-pdf-highlighter";
// import { testHighlights as _testHighlights } from "./test-highlights";
// import "react-pdf-highlighter/dist/style.css";
// import { Sidebar } from "./sidebar";
// import { Spinner } from "./spinner";
// import { convertAllKeyValuePairs } from "./document-intelligence-v2/highlight-converter";

// // Constants
// const PRIMARY_PDF_URL = "/data.pdf";
// const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480";

// // Utility functions
// const getNextId = () => String(Math.random()).slice(2);
// const parseIdFromHash = () =>
//   document.location.hash.slice("#highlight-".length);
// const resetHash = () => {
//   document.location.hash = "";
// };

// // Components
// interface HighlightPopupProps {
//   comment: {
//     text: string;
//     emoji: string;
//   };
// }

// const HighlightPopup = ({ comment }: HighlightPopupProps) =>
//   comment.text ? (
//     <div className="Highlight__popup">
//       {comment.emoji} {comment.text}
//     </div>
//   ) : null;

// // Main App Component
// export function App() {
//   const [url, setUrl] = useState<string>(PRIMARY_PDF_URL);
//   const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
//   const [jsonData, setJsonData] = useState<any>(null);
//   const scrollViewerTo = useRef<(highlight: IHighlight) => void>(() => {});

//   // Load JSON data
//   useEffect(() => {
//     const loadJsonData = async () => {
//       try {
//         const response = await fetch("/pdf.json");
//         const data = await response.json();
//         console.log("Loaded JSON data:", data);
//         setJsonData(data);
//       } catch (error) {
//         console.error("Failed to load JSON:", error);
//       }
//     };
//     loadJsonData();
//   }, []);

//   // Convert JSON to highlights
//   useEffect(() => {
//     if (jsonData?.analyzeResult?.keyValuePairs) {
//       try {
//         const newHighlights = convertAllKeyValuePairs(
//           jsonData.analyzeResult.keyValuePairs
//         );
//         console.log("Converted highlights:", newHighlights);
//         setHighlights(newHighlights);
//       } catch (error) {
//         console.error("Error converting highlights:", error);
//       }
//     }
//   }, [jsonData]);

//   // Get highlight by ID
//   const getHighlightById = useCallback(
//     (id: string) => highlights.find((h) => h.id === id),
//     [highlights]
//   );

//   // Scroll to highlight from hash
//   const scrollToHighlightFromHash = useCallback(() => {
//     const highlight = getHighlightById(parseIdFromHash());
//     console.log("Scrolling to highlight:", highlight);
//     if (highlight && scrollViewerTo.current) {
//       scrollViewerTo.current(highlight);
//     }
//   }, [getHighlightById]);

//   // Add hash change listener
//   useEffect(() => {
//     window.addEventListener("hashchange", scrollToHighlightFromHash, false);
//     return () => {
//       window.removeEventListener(
//         "hashchange",
//         scrollToHighlightFromHash,
//         false
//       );
//     };
//   }, [scrollToHighlightFromHash]);

//   // Highlight handlers
//   const resetHighlights = useCallback(() => setHighlights([]), []);

//   const addHighlight = useCallback((highlight: NewHighlight) => {
//     setHighlights((prev) => [{ ...highlight, id: getNextId() }, ...prev]);
//   }, []);

//   const updateHighlight = useCallback(
//     (
//       highlightId: string,
//       position: Partial<ScaledPosition>,
//       content: Partial<Content>
//     ) => {
//       setHighlights((prev) =>
//         prev.map((h) => {
//           if (h.id !== highlightId) return h;
//           return {
//             ...h,
//             position: { ...h.position, ...position },
//             content: { ...h.content, ...content },
//           };
//         })
//       );
//     },
//     []
//   );

//   return (
//     <div className="App" style={{ display: "flex", height: "100vh" }}>
//       <Sidebar
//         highlights={highlights}
//         resetHighlights={resetHighlights}
//         toggleDocument={() =>
//           setUrl(url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL)
//         }
//       />

//       <div
//         style={{
//           height: "100vh",
//           width: "75vw",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <PdfLoader url={url} beforeLoad={<Spinner />}>
//           {(pdfDocument) => (
//             <PdfHighlighter
//               pdfDocument={pdfDocument}
//               enableAreaSelection={(event) => event.altKey}
//               onScrollChange={resetHash}
//               scrollRef={(scrollTo) => {
//                 scrollViewerTo.current = scrollTo;
//                 scrollToHighlightFromHash();
//               }}
//               onSelectionFinished={(
//                 position,
//                 content,
//                 hideTipAndSelection,
//                 transformSelection
//               ) => (
//                 <Tip
//                   onOpen={transformSelection}
//                   onConfirm={(comment) => {
//                     addHighlight({ content, position, comment });
//                     hideTipAndSelection();
//                   }}
//                 />
//               )}
//               highlightTransform={(
//                 highlight,
//                 index,
//                 setTip,
//                 hideTip,
//                 viewportToScaled,
//                 screenshot,
//                 isScrolledTo
//               ) => {
//                 const isTextHighlight = !highlight.content?.image;
//                 const component = isTextHighlight ? (
//                   <Highlight
//                     isScrolledTo={isScrolledTo}
//                     position={highlight.position}
//                     comment={highlight.comment}
//                   />
//                 ) : (
//                   <AreaHighlight
//                     isScrolledTo={isScrolledTo}
//                     highlight={highlight}
//                     onChange={(boundingRect) => {
//                       updateHighlight(
//                         highlight.id,
//                         { boundingRect: viewportToScaled(boundingRect) },
//                         { image: screenshot(boundingRect) }
//                       );
//                     }}
//                   />
//                 );

//                 return (
//                   <Popup
//                     popupContent={<HighlightPopup {...highlight} />}
//                     onMouseOver={(popupContent) =>
//                       setTip(highlight, () => popupContent)
//                     }
//                     onMouseOut={hideTip}
//                     key={index}
//                   >
//                     {component}
//                   </Popup>
//                 );
//               }}
//               highlights={highlights}
//             />
//           )}
//         </PdfLoader>
//       </div>
//     </div>
//   );
// }

// export default App;
