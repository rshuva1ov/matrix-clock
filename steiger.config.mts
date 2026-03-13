import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ["./src/**"],
    rules: {
      "fsd/forbidden-imports": [
        "error",
        {
          allow: [
            { from: "shared", to: ["entities"] },
            { from: "entities", to: ["entities"] },

            { from: "shared", to: ["features"] },
            { from: "entities", to: ["features"] },

            { from: "shared", to: ["widgets"] },
            { from: "entities", to: ["widgets"] },
            { from: "features", to: ["widgets"] },

            { from: "shared", to: ["pages"] },
            { from: "entities", to: ["pages"] },
            { from: "features", to: ["pages"] },
            { from: "widgets", to: ["pages"] },
            { from: "app", to: ["pages"] }
          ]
        }
      ],
      "fsd/inconsistent-naming": "error",
      "fsd/insignificant-slice": "warn",
      "fsd/no-layer-public-api": "off",
      "fsd/no-public-api-sidestep": "off"
    }
  }
]);

