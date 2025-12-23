declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
