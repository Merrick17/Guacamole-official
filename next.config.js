/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "arweave.net",
      "raw.githubusercontent.com",
      "storage.googleapis.com",
      "icons.llama.fi"
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/",
          outputPath: "static/",
        },
      },
    });
    // wav files
    config.module.rules.push({
      test: /\.wav$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/",
          outputPath: "static/",
        },
      },
    });
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/",
          outputPath: "static/",
        },
      },
    });
    // fs

    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  serverRuntimeConfig: {
    AUTHORITY_KEY_PAIR: process.env.AUTHORITY_KEY_PAIR,
    GOOGLE_SERVICE_ACCOUNT_EMAIL: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY,
    GOOGLE_WHITELIST_SHEET_ID: process.env.GOOGLE_WHITELIST_SHEET_ID,
    GOOGLE_BLACKLIST_SHEET_ID: process.env.GOOGLE_BLACKLIST_SHEET_ID,
    IP_STACK_API_KEY: process.env.IP_STACK_API_KEY,
    GEO_BLOCKING: process.env.GEO_BLOCKING !== "false",
    SOLANA_CLUSTER_URL: process.env.SOLANA_CLUSTER_URL,
  },
  publicRuntimeConfig: {
    APP_ENV: process.env.APP_ENV,
    PYTH_ORACLE: process.env.PYTH_ORACLE,
    SOLANA_CLUSTER_URL: process.env.SOLANA_CLUSTER_URL,
  },
};

module.exports = nextConfig;
