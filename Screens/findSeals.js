function getValues(spreadsheetId, range) {
    return new Promise((resolve, reject) => {
      gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: range,
      }).then((response) => {
        const result = response.result;
        const numRows = result.values ? result.values.length : 0;
        console.log(`${numRows} rows retrieved.`);
        resolve(response);
      }).catch((err) => {
        document.getElementById('content').innerText = err.message;
        reject(err);
      });
    });
  }
  