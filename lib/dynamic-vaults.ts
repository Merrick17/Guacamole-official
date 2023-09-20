import axios from "axios";

const apiUrl = "https://merv2-api.mercurial.finance/vault_info";

const fetchVaultInfo = async () => {
  try {
    const response = await axios.get(apiUrl);
    const vaultInfoData = response.data;
    return vaultInfoData;
  } catch (error) {
    return null;
  }
};

export { fetchVaultInfo };
