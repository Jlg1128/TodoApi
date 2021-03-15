const config = {
  development: {
    host: "localhost",
    port: 8089,
  },
  production: {
    host: '175.24.120.38',
    port: 8089,
  },
};

function getConfig(config) {
  const env = process.env.NODE_ENV.toString();
  return config[env];
}

export default getConfig(config);