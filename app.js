var web3;
if (typeof window.web3 !== "undefined" && typeof window.web3.currentProvider !== "undefined") {
    web3 = new Web3(window.web3.currentProvider);
}

var accountAddress = web3.eth.accounts[0];

var _address = "0x90e7eef15d7503896c0d7f562165f2b17b640f78";
var _abi = [ { "constant": false, "inputs": [ { "name": "myid", "type": "bytes32" }, { "name": "result", "type": "string" }, { "name": "proof", "type": "bytes" } ], "name": "__callback", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "myid", "type": "bytes32" }, { "name": "result", "type": "string" } ], "name": "__callback", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "currency", "type": "string" } ], "name": "addNewCurrency", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "sourceCurrency", "type": "string" }, { "name": "destCurrency", "type": "string" }, { "name": "URL", "type": "string" } ], "name": "getRate", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "currency", "type": "string" }, { "name": "value", "type": "uint256" } ], "name": "getToken", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "sourceCurrency", "type": "string" }, { "name": "destCurrency", "type": "string" }, { "name": "rate", "type": "uint256" } ], "name": "TransferMoney", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "from", "type": "address" }, { "indexed": false, "name": "to", "type": "address" }, { "indexed": false, "name": "sourceCurrency", "type": "string" }, { "indexed": false, "name": "value", "type": "uint256" }, { "indexed": false, "name": "destCurrency", "type": "string" }, { "indexed": false, "name": "received", "type": "uint256" } ], "name": "Transferred", "type": "event" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "constant": false, "inputs": [ { "name": "p", "type": "uint256" } ], "name": "updatePricePosition", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "x", "type": "bytes32" } ], "name": "bytes32ToString", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [], "name": "called", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "currency", "type": "string" } ], "name": "getBalance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "source", "type": "string" } ], "name": "stringToBytes32", "outputs": [ { "name": "result", "type": "bytes32" } ], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [], "name": "uprice", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "viewCurrencies", "outputs": [ { "name": "", "type": "bytes32[]" } ], "payable": false, "stateMutability": "view", "type": "function" } ];

var CBMTContract = web3.eth.contract(_abi);
var _contracInstance = CBMTContract.at(_address);

function getToken() {

  var amount=document.getElementById("amount").value;
  var currency=document.getElementById("currency").value;

  if (!currency || !amount) {
    alert("please send currency and amount");
    return;

  }
  _contracInstance.getToken.sendTransaction(currency, amount, {
      from: accountAddress,
      gas: 400000
    }, function (err, result) {
      if (err != null) {
        alert(err);
      } else {
        alert('Your Transaction will be completed in a few seconds, please wait. And your transaction ID is '+result);
      }
      setTimeout(location.reload.bind(location), 10000);
      getBalance('INRT');
      getBalance('USDT');
      getBalance('EURT');
      getBalance('RUBT');
      // window.location.reload();
   });
}

function TransferMoney() {

  var to=document.getElementById("to").value;
  var value=document.getElementById("value").value;
  var sourceCurrency=document.getElementById("sourceCurrency").value;
  var destCurrency=document.getElementById("destCurrency").value;
  // var rate=document.getElementById("rate").value;

  // if (!to || !value || !sourceCurrency || !destCurrency || !rate) {
  //   alert("please give all info");
  //   return;
  // }

  if (!to || !value || !sourceCurrency || !destCurrency) {
    alert("please give all info");
    return;
  }

  _contracInstance.TransferMoney.sendTransaction(to, value, sourceCurrency, destCurrency, 67, {
    from: accountAddress,
    gas: 400000
  }, function (err, result) {
    if (err != null) {
      alert(err);
    } else {
      alert('Your Transaction will be completed in a few seconds, please wait. And your transaction ID is '+result);
      setTimeout(location.reload.bind(location), 10000);
    }
  });
}

function getBalance(currency) {
  if (!currency) {
    alert("please give all info");
    return;
  }

  _contracInstance.getBalance.call(currency, {
    from: accountAddress
  }, function (err, result) {
    // console.log("",err,result);
    if (err) {
      alert(err);
      return;
    }
      // alert(result);
      console.log(currency, result);
      if (currency == 'INRT') {
        document.getElementById("INRT-B").innerText = 'Balance : '+ result;
      }
      else if(currency == 'USDT'){
        document.getElementById("USDT-B").innerText = 'Balance : '+ result;
      }
      else if(currency == 'EURT'){
        document.getElementById("EURT-B").innerText = 'Balance : '+ result;
      }
      else if(currency == 'RUBT'){
        document.getElementById("RUBT-B").innerText = 'Balance : '+ result;
      }
  });
}

function updateTxTable() {
  _contracInstance.Transferred({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
    if (error)
      console.log('Error in myEvent event handler: ' + error);
    else {
      var event1;
      var tableBody = document.getElementById('TBODY');
      console.log(tableBody);
      for (var i = 0; i < eventResult.length; i++) {
        event1 = eventResult[i].args;
        console.log('myEvent: ' , event1);

        var tr = document.createElement('TR');


        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(event1.from));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(event1.to));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(event1.sourceCurrency));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(event1.value));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(event1.destCurrency));
        tr.appendChild(td);

        var td = document.createElement('TD');
        td.appendChild(document.createTextNode(event1.received));
        tr.appendChild(td);


        tableBody.appendChild(tr);
        // document.getElementById("TxAllEvents").innerHTML += event1;
        //JSON.stringify(eventResult.args));
      }
    }
  });
}
