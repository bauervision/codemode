/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LiveProvider,
  LivePreview as LiveReactPreview,
  LiveError,
} from "react-live";
import React from "react";

export function DemoPageRenderer({
  code,
  scope,
}: {
  code: string;
  scope: Record<string, any>;
}) {
  return (
    <LiveProvider code={code} scope={scope}>
      <LiveReactPreview />
      <LiveError />
    </LiveProvider>
  );
}
