import React, { useRef, useLayoutEffect, useState } from "react";
import LivePreview from "./LivePreview";
import { ColorRoles } from "../types";

interface ResponsiveMobilePreviewProps {
  device: "iphone" | "pixel" | "galaxy";
  deviceSizes: Record<string, { w: number; h: number; label: string }>;
  previewRoute: string;
  setPreviewRoute: (route: string) => void;

  projectName: string;
  previewLoading: boolean;
  mobileView: boolean;
  fileContents: Record<string, { display: string; preview?: string }>;
  colors: ColorRoles;
}

export function ResponsiveMobilePreview({
  device,
  deviceSizes,
  previewRoute,
  setPreviewRoute,
  projectName,
  mobileView,
  fileContents,
  colors,
}: ResponsiveMobilePreviewProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Compute scale so the device fits within the panel
  useLayoutEffect(() => {
    const updateScale = () => {
      if (!outerRef.current) return;
      const parent = outerRef.current.parentElement;
      if (!parent) return;
      const maxW = parent.clientWidth - 24; // some padding
      const maxH = parent.clientHeight - 24;
      const { w, h } = deviceSizes[device];
      const scaleW = maxW / (w + 32); // include device frame/padding
      const scaleH = maxH / (h + 32);
      const newScale = Math.min(scaleW, scaleH, 1); // allow any small scale!
      setScale(newScale > 0 ? newScale : 0.1);
    };
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [device, deviceSizes]);

  return (
    <div
      ref={outerRef}
      className="w-full h-full"
      style={{
        position: "relative",
        marginTop: 10,
        padding: 0,
        display: "flex",
        alignItems: "flex-start", // vertical align top
        justifyContent: "center", // horizontal align center
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          width: deviceSizes[device].w + 32,
          height: deviceSizes[device].h + 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="bg-black rounded-3xl shadow-2xl p-2"
          style={{
            width: deviceSizes[device].w + 32,
            height: deviceSizes[device].h + 32,
          }}
        >
          <div
            className="bg-white/90 dark:bg-zinc-900/80 rounded-2xl overflow-hidden relative h-full"
            style={{
              width: deviceSizes[device].w,
              height: deviceSizes[device].h,
            }}
          >
            <LivePreview
              isMobilePreview={mobileView}
              route={previewRoute}
              onRouteChange={setPreviewRoute}
              projectName={projectName}
              fileContents={fileContents}
              colors={colors}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
