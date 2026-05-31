"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";

const geoUrl = "/benin-departments.topojson";

export default function InteractiveMap() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 4000,
          center: [2.5, 9.5] // Coordinates roughly centering Benin
        }}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup center={[2.5, 9.5]} zoom={1} minZoom={1} maxZoom={4}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // The name of the department is usually in geo.properties.shapeName
                const departmentName = geo.properties.shapeName;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(departmentName);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    onClick={() => {
                      // Optional: handle click
                    }}
                    style={{
                      default: {
                        fill: "#EAEAEC",
                        stroke: "#005DAA",
                        strokeWidth: 0.5,
                        outline: "none"
                      },
                      hover: {
                        fill: "#005DAA",
                        stroke: "#FFF",
                        strokeWidth: 1,
                        outline: "none",
                        cursor: "pointer"
                      },
                      pressed: {
                        fill: "#004080",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Custom Tooltip */}
      {tooltipContent && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(0, 93, 170, 0.9)",
            color: "white",
            padding: "8px 16px",
            borderRadius: "4px",
            pointerEvents: "none",
            fontWeight: "bold",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}
