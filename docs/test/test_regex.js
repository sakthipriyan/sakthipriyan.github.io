const txnRegex = /(\d{2}-[A-Za-z]{3}-\d{4})\s+([\d,().-]+)\s+([\d,().]+)?\s+([\d,().]+)?\s+(.*)/;
const match1 = "01-Dec-2023 49,997.50 258.599 193.3398".match(txnRegex);
console.log("match1:", match1);
const match2 = "03-Feb-2025 69,996.50 2,631.368 26.6008".match(txnRegex);
console.log("match2:", match2);
