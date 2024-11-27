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
import { Sidebar } from "./sidebar";
import { Spinner } from "./spinner";

const PRIMARY_PDF_URL = "/acme-contract.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480";

// Utility functions
const getNextId = () => String(Math.random()).slice(2);
const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);
const resetHash = () => {
  document.location.hash = "";
};

// Convert JSON data to IHighlight format
const convertJsonToHighlights = (jsonData: any): Array<IHighlight> => {
  if (!jsonData || !Array.isArray(jsonData[Object.keys(jsonData)[0]])) {
    console.error("Invalid JSON data format");
    return [];
  }

  const highlights = jsonData[Object.keys(jsonData)[0]].map((item: any) => ({
    id: item.id,
    content: {
      text: item.content?.text || "",
    },
    position: {
      boundingRect: item.position?.boundingRect || {},
      rects: item.position?.rects || [],
      pageNumber: item.position?.pageNumber || 1,
    },
    comment: {
      text: item.comment?.text || "",
      emoji: item.comment?.emoji || "",
    },
  }));

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

const jsonData = {
  "/acme-contract.pdf": [
    {
      content: {
        text: "Service Provider",
      },
      position: {
        boundingRect: {
          x1: 509.33758544921875,
          y1: 271.59417724609375,
          x2: 539.687744140625,
          y2: 283.77581787109375,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 509.33758544921875,
            y1: 271.59417724609375,
            x2: 539.687744140625,
            y2: 283.77581787109375,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 286.14044189453125,
            x2: 121.07513427734375,
            y2: 298.32208251953125,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 1,
      },
      comment: {
        text: "Test Comment",
        emoji: "",
      },
      id: "5857598817309578",
    },
    {
      content: {
        text: "Client",
      },
      position: {
        boundingRect: {
          x1: 179.7085418701172,
          y1: 300.68670654296875,
          x2: 277.32464599609375,
          y2: 312.86834716796875,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 179.7085418701172,
            y1: 300.68670654296875,
            x2: 277.32464599609375,
            y2: 312.86834716796875,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 277.3203125,
            y1: 300.68670654296875,
            x2: 539.7155151367188,
            y2: 312.86834716796875,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 315.23297119140625,
            x2: 268.2381591796875,
            y2: 327.41461181640625,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 1,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "1368647160146813",
    },
    {
      content: {
        text: "Scope of Services",
      },
      position: {
        boundingRect: {
          x1: 36.0,
          y1: 563.8084106445312,
          x2: 538.8409423828125,
          y2: 575.9900512695312,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 36.0,
            y1: 563.8084106445312,
            x2: 538.8409423828125,
            y2: 575.9900512695312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 588.5056762695312,
            x2: 155.7481231689453,
            y2: 600.6873168945312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 601.2029418945312,
            x2: 453.534912109375,
            y2: 613.3845825195312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 639.2947387695312,
            x2: 191.97738647460938,
            y2: 651.4763793945312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 651.9920043945312,
            x2: 331.1717224121094,
            y2: 664.1736450195312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 690.0838012695312,
            x2: 157.58865356445312,
            y2: 702.2654418945312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 702.7810668945312,
            x2: 403.5280456542969,
            y2: 714.9627075195312,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 1,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "1258341228712847",
    },
    {
      content: {
        text: "Deliverables",
      },
      position: {
        boundingRect: {
          x1: 72.0,
          y1: 134.55908203125,
          x2: 432.20538330078125,
          y2: 146.74072265625,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 72.0,
            y1: 134.55908203125,
            x2: 432.20538330078125,
            y2: 146.74072265625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 147.25634765625,
            x2: 373.59466552734375,
            y2: 159.43798828125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 159.95361328125,
            x2: 341.165283203125,
            y2: 172.13525390625,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 2,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "1561262037736507",
    },
    {
      content: {
        text: "Agreement Term",
      },
      position: {
        boundingRect: {
          x1: 36.0,
          y1: 237.900390625,
          x2: 525.0587768554688,
          y2: 250.08203125,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 36.0,
            y1: 237.900390625,
            x2: 525.0587768554688,
            y2: 250.08203125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 250.54931640625,
            x2: 280.1916809082031,
            y2: 262.73095703125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 213.25146484375,
            x2: 149.6724395751953,
            y2: 225.43310546875,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 2,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "5941875759556376",
    },
    {
      content: {
        text: "Payment Terms",
      },
      position: {
        boundingRect: {
          x1: 72.0,
          y1: 613.9002075195312,
          x2: 138.5572967529297,
          y2: 626.0818481445312,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 72.0,
            y1: 613.9002075195312,
            x2: 138.5572967529297,
            y2: 626.0818481445312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 664.6892700195312,
            x2: 138.5572967529297,
            y2: 676.8709106445312,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 72.515625,
            x2: 138.5572967529297,
            y2: 84.697265625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 478.7305908203125,
            x2: 249.21160888671875,
            y2: 490.9122314453125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 395.282958984375,
            x2: 505.0561218261719,
            y2: 407.464599609375,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 424.486572265625,
            x2: 519.3116455078125,
            y2: 436.668212890625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 453.6904296875,
            x2: 425.58819580078125,
            y2: 465.8720703125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 482.89404296875,
            x2: 372.36083984375,
            y2: 495.07568359375,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 1,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "1871080829726040",
    },
    {
      content: {
        text: "Confidentiality",
      },
      position: {
        boundingRect: {
          x1: 36.0,
          y1: 457.115234375,
          x2: 529.616455078125,
          y2: 469.296875,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 36.0,
            y1: 457.115234375,
            x2: 529.616455078125,
            y2: 469.296875,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 471.66162109375,
            x2: 206.92831420898438,
            y2: 483.84326171875,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 4,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "1269461942461249",
    },
    {
      content: {
        text: "Intellectual Property",
      },
      position: {
        boundingRect: {
          x1: 72.0,
          y1: 331.1728515625,
          x2: 500.446044921875,
          y2: 343.3544921875,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 72.0,
            y1: 331.1728515625,
            x2: 500.446044921875,
            y2: 343.3544921875,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 345.7265625,
            x2: 75.27383422851562,
            y2: 357.908203125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 360.3212890625,
            x2: 511.8453369140625,
            y2: 372.5029296875,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 389.46923828125,
            x2: 508.3718566894531,
            y2: 401.65087890625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 404.022705078125,
            x2: 251.22447204589844,
            y2: 416.204345703125,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 4,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "3311074813036039",
    },
    {
      content: {
        text: "Termination Clauses",
      },
      position: {
        boundingRect: {
          x1: 36.0,
          y1: 275.1982421875,
          x2: 158.9510040283203,
          y2: 287.3798828125,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 36.0,
            y1: 275.1982421875,
            x2: 158.9510040283203,
            y2: 287.3798828125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 337.14501953125,
            x2: 190.0865936279297,
            y2: 349.32666015625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 652.142822265625,
            x2: 327.3646240234375,
            y2: 664.324462890625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 705.2353515625,
            x2: 404.551513671875,
            y2: 717.4169921875,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 2,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "2929640261928540",
    },
    {
      content: {
        text: "Indemnification",
      },
      position: {
        boundingRect: {
          x1: 72.0,
          y1: 524.802490234375,
          x2: 530.80419921875,
          y2: 536.984130859375,
          width: 612.0,
          height: 792.0,
        },
        rects: [
          {
            x1: 72.0,
            y1: 524.802490234375,
            x2: 530.80419921875,
            y2: 536.984130859375,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 539.35595703125,
            x2: 175.803466796875,
            y2: 551.53759765625,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 72.0,
            y1: 553.950439453125,
            x2: 518.5924072265625,
            y2: 566.132080078125,
            width: 612.0,
            height: 792.0,
          },
          {
            x1: 36.0,
            y1: 568.50390625,
            x2: 231.3548126220703,
            y2: 580.685546875,
            width: 612.0,
            height: 792.0,
          },
        ],
        pageNumber: 4,
      },
      comment: {
        text: "",
        emoji: "",
      },
      id: "2388983245324624",
    },
  ],
};

// const jsonData = undefined;

export function App() {
  const [url, setUrl] = useState<string>(PRIMARY_PDF_URL);
  const [highlights, setHighlights] = useState<Array<IHighlight>>([]);
  const scrollViewerTo = useRef<(highlight: IHighlight) => void>(() => {});

  // Load and process JSON data
  useEffect(() => {
    const processHighlights = () => {
      // If you have local JSON data
      if (typeof jsonData !== "undefined") {
        const convertedHighlights = convertJsonToHighlights(jsonData);
        setHighlights(convertedHighlights);
      } else {
        // If you need to fetch JSON data
        fetch("/highlights.json")
          .then((response) => response.json())
          .then((data) => {
            const convertedHighlights = convertJsonToHighlights(data);
            setHighlights(convertedHighlights);
          })
          .catch((error) => {
            console.error("Error loading highlights:", error);
          });
      }
    };

    processHighlights();
  }, [url]);

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

  return (
    <div className="App" style={{ display: "flex", height: "100vh" }}>
      <Sidebar
        highlights={highlights}
        resetHighlights={resetHighlights}
        toggleDocument={toggleDocument}
      />

      <div
        style={{
          height: "100vh",
          width: "75vw",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <PdfLoader url={url} beforeLoad={<Spinner />}>
          {(pdfDocument) => (
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
          )}
        </PdfLoader>
      </div>
    </div>
  );
}

export default App;

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
