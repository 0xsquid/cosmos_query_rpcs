import axios from "axios";
// Function to make Axios GET requests
const makeGetRequest = async (chain: any) => {
  const requests = chain.rpcList.map((rpc) =>
    axios
      .get(`${rpc}/status?`)
      .then(() => console.log(`Success for ${rpc}`))
      .catch(() => console.error(`!!!!!!!!!!!!! Error for ${rpc} !!!!!!!!`))
  );

  try {
    await Promise.all(requests);
    // All requests have finished
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("An error occurred during the requests");
  }
};

// Loop through the array of API endpoints and make GET requests
async function loopAndRequest() {
  const chains = await axios.get("https://api.squidrouter.com/v1/chains");
  for (const chain of chains.data.chains) {
    if (chain.chainType == "cosmos") {
      console.log(`\nChain: ${chain.chainName}`);
      await makeGetRequest(chain);
    }
  }
}
loopAndRequest();