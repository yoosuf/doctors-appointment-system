module.exports = {
  apps: [
    {
      name: "snapcrack-api",
      script: "npm",
      args: "run dev",
      cwd: "server", // Set the working directory to the backend folder
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        // NODE_ENV: 'production',
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "logs/backend-error.log",
      out_file: "logs/backend-out.log",
      merge_logs: true,
    },
    {
      name: "snapcrack-client",
      script: "npm",
      args: "run dev",
      cwd: "client", // Set the working directory to the frontend folder
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        // NODE_ENV: 'production',
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      error_file: "logs/frontend-error.log",
      out_file: "logs/frontend-out.log",
      merge_logs: true,
    },
  ],
};
