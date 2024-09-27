const CONFIG_KEY = "elephantConfig";

export const saveConfig = (config) =>
  localStorage.set(CONFIG_KEY, JSON.stringify(config));

export const readConfig = () => JSON.parse(localStorage.get(CONFIG_KEY));
