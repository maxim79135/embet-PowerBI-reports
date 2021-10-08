import React, { useState } from "react";
import { models, Report, Embed, service, Page } from "powerbi-client";
import { PowerBIEmbed } from "powerbi-client-react";
import "powerbi-report-authoring";
import "./DemoApp.css";

// Root Component to demonstrate usage of wrapper component
function DemoApp(): JSX.Element {
  // PowerBI Report object (to be received via callback)
  const [report, setReport] = useState<Report>();

  // Report config useState hook
  // Values for properties like embedUrl, accessToken and settings will be set on click of buttons below
  const [sampleReportConfig, setReportConfig] =
    useState<models.IReportEmbedConfiguration>({
        type: "report",
        embedUrl:
          "http://report.vyatsu.ru/Reports/powerbi/Test1/Аналитика преподавателя?rc:toolbar=false",
        tokenType: models.TokenType.Embed,
        accessToken: undefined,
        settings: undefined,
    });

  // Map of event handlers to be applied to the embedding report
  const eventHandlersMap = new Map([
    [
      "loaded",
      function () {
        console.log("Report has loaded");
      },
    ],
    [
      "rendered",
      function () {
        console.log("Report has rendered");
      },
    ],
    [
      "error",
      function (event?: service.ICustomEvent<any>) {
        if (event) {
          console.error(event.detail);
        }
      },
    ],
  ]);

  const header = (
    <div className="header">
      <div className="title">Power BI React component demo</div>
    </div>
  );

  return (
    <div>
      {header}

      <PowerBIEmbed
        embedConfig={sampleReportConfig}
        eventHandlers={eventHandlersMap}
        cssClassName={"report-style-class"}
        getEmbeddedComponent={(embedObject: Embed) => {
          console.log(
            `Embedded object of type "${embedObject.embedtype}" received`
          );
          setReport(embedObject as Report);
        }}
      />
    </div>
  );
}

export default DemoApp;
