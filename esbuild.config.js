require("dotenv").config();
const args = process.argv;

const config = {
  logLevel: "info",
  entryPoints: ["./src/index.tsx"],
  outdir: "public/build",
  bundle: true,
  define: {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || "production"),
    "process.env.REACT_APP_PROXY_URL": JSON.stringify(
      "http://localhost:5000/api"
    ),
    "process.env.REACT_APP_SECRET_KEY": JSON.stringify(
      "DCHIUQW$^&$&^$&^BCI189374619647091279#$%^"
    ),
  },
  loader: {
    ".ts": "ts",
    ".js": "jsx",
    ".locale.json": "file",
    ".json": "json",
    ".png": "dataurl",
    ".jpeg": "dataurl",
    ".jpg": "dataurl",
    ".svg": "dataurl",
    ".gif": "dataurl",
  },
  assetNames: "assets/[name]",
  allowOverwrite: true,
  entryNames: "js/[name]",
};

if (args.includes("--build")) {
  (esbuild = require("esbuild"))
    .build({
      ...config,
      minify: true,
      sourcemap: false,
      // watch: {
      //   onRebuild(error, result) {
      //     if (error) console.error("watch build failed:", error);
      //     else {
      //       console.log("watch build succeeded:", result);
      //       // HERE: somehow restart the server from here, e.g., by sending a signal that you trap and react to inside the server.
      //     }
      //   },
      // },
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}

if (args.includes("--start")) {
  (esbuild = require("esbuild"))
    .context({
      ...config,
      minify: false,
      sourcemap: true,
    })
    .then(async (ctx) => {
      await ctx.watch(); // this is needed only if live reloading will be used
      await ctx.serve({
        host: "localhost",
        port: 8000,
        servedir: "public",
        onRequest: ({ remoteAddress, method, path, status, timeInMS }) => {
          console.info(
            remoteAddress,
            status,
            `"${method} ${path}" [${timeInMS}ms]`
          );
        },
      });
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
}
