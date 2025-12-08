module.exports = {
  process: async (data) => {
    console.log("File processing started");
    console.log("Data:", data);

    // TODO later:
    // - clean CSV
    // - normalize
    // - anomaly detection

    return { success: true };
  }
};
