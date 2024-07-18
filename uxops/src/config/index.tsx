interface Config {
    SUPABASE_URL: string;
    SUPABASE_ANON_KEY: string;
    SITE_URL: string;
  }
  
  const config: Config = {
    SUPABASE_URL: "",
    SUPABASE_ANON_KEY: "",
    SITE_URL: "",
  };
  
  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      "http://localhost:3000/";
    // Make sure to include `https://` when not localhost.
    // url = url.includes("http") ? url : `https://${url}`;
    // // Make sure to include a trailing `/`.
    // url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
    return url;
  };
  
  //[TODO] Should make the /common/utils/env.tsx working
  config.SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  config.SUPABASE_ANON_KEY =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzbHlrdGpzeGFucHdpZ2J3cWZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzODM5MTQsImV4cCI6MjAxOTk1OTkxNH0.Eq2YBKp0r2dLt8-aRzN1awEeKwk-1EJjlIxs8T229ig";
  config.SITE_URL = getURL();
  //[TODO] None of the folowing 2 ways are not working in vite/ionic, will need to check further later
  // export default config;
  // module.exports = config;
  export const SUPABASE_URL = config.SUPABASE_URL;
  export const SUPABASE_ANON_KEY = config.SUPABASE_ANON_KEY;
  export const SITE_URL = config.SITE_URL;
  
  export const LOCALSTORAGE_KEY =
    process.env.NEXT_PUBLIC_LOCALSTORAGE_KEY ?? "UXOPS_DATA";
  
  export const SINGLE_PRODUCT_NAME =
    process.env.NEXT_PUBLIC_SINGLE_PRODUCT_KEY ?? "single";
  
  export const BUSINESS_PRODUCT_NAME =
    process.env.NEXT_PUBLIC_BUSINESS_PRODUCT_KEY ?? "business";
  
  export const STANDARD_PRODUCT_NAME =
    process.env.NEXT_PUBLIC_STANDARD_PRODUCT_KEY ?? "standard";
  
  export const ACCEPTED_RECURRING_PRODUCTS = [STANDARD_PRODUCT_NAME,BUSINESS_PRODUCT_NAME];