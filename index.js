const api_url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";
async function getapi(url) {
  const response = await fetch(url);
  var data = await response.json();
  let transaction = data.transactions;
  const apiData = sortTransactions(data);
  const groupedData = grouped(apiData);
  displayBox(groupedData);
}

getapi(api_url);
function sortTransactions(data) {
  const sortTranscations = data.transactions.sort((a, b) => {
    let date = new Date(a.startDate),
      db = new Date(b.startDate);
    return date - db;
  });

  return sortTranscations;
}
function grouped(sortTransactions = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortTransactions.forEach((el) => {
    const key = getDate(el.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(el);
    } else {
      newData[key].push(el);
    }
  });
  return newData;
}
function displayBox(groupedData) {
  for (let dataKey in groupedData) {
    document.getElementById(
      "box"
    ).innerHTML += `<div class="box-wrap"><div class="card-date">
            <div class="lapping">
                <p >${new Date(dataKey).toDateString()}</p>
                </div
            </div></div>`;
    ``;
    for (let i = 0; i < groupedData[dataKey].length; i++) {
      let type = groupedData[dataKey][i].type;
      let direction = groupedData[dataKey][i].direction;

      if (type === 1 && direction === 1) {
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-right"><div class="card">
                     <p class="ammount">
                      &#8377; ${groupedData[dataKey][i].amount}
                    </p>
                    <p class="message"><span class="tick">&#10004</span> You paid</p>
                    <div class="transaction-id">
                    <p>Transaction ID</p>
                     <p>${groupedData[dataKey][i].id}</p>
                    </div>
                    </div>
                    </div>
                    <div class="date-time-right">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
     else if (type === 1 && direction === 2) {
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-left"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
             <p class="message"><span class="tick">&#10004</span> You received</p>
             <div class="transaction-id">
             <p>Transaction ID</p>
              <p>${groupedData[dataKey][i].id}</p>
             </div>
             </div>
             </div>
              <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
      else if (type === 2 && direction === 1) {
         document.getElementById(
           "box"
         ).innerHTML += `<div class="alignment-right"><div class="card">
               <p class="ammount">
                &#8377; ${groupedData[dataKey][i].amount}
              </p>
              <p class="message"><span class="sign">&#8734</span> You requested</p>
              <div class="transaction-id">
               <button>Cancel</button>
              </div>
              </div>
              </div>
              <div class="date-time-right">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
           groupedData[dataKey][i].startDate
         ).toLocaleTimeString()}</p>
            </div>`;
       }

     else if (type === 2 && direction === 2) {
        document.getElementById(
          "box"
        ).innerHTML += `<div class="alignment-left"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
             </p>
             <p class="received"><span class="sign">&#8734</span> Request received</p>
              <button>Pay</button>
              <button>Decline</button>
             </div>
             </div>
             <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }

    }
  }
}
