// https://nextjs.org/docs/app/guides/custom-server
// https://blog.yagyaraj.com/running-cron-jobs-in-nextjs-guide-for-serverful-and-stateless-server-542dd0db0c4c
export async function register() {
  // only run the the runtime is nodejs
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { initCronJobs } = await import("./app/server");
    // start cron jobs / server
    initCronJobs();
  }
}
