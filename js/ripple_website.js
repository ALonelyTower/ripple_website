function generateKeys() {
  var api = new ripple.RippleAPI();
  var account = api.generateAddress();
  document.getElementById("public_key").innerHTML = account.address;
  document.getElementById("private_key").innerHTML = account.secret;
}

function createTransaction() {
    _createTransaction().then(function(txJSON){
        var transaction = JSON.parse(txJSON['txJSON']);
        document.getElementById("create_transaction_transtype").innerHTML = "Transaction Type: " + transaction.TransactionType;
        document.getElementById("create_transaction_account").innerHTML = "Account: " + transaction.Account;
        document.getElementById("create_transaction_destination").innerHTML = "Destination: " + transaction.Destination;
        document.getElementById("create_transaction_amount").innerHTML = "Amount: " + transaction.Amount + " drops (1000000 drops per 1 XRP)";
        document.getElementById("create_transaction_flags").innerHTML = "Flags: " + transaction.Flags;
        document.getElementById("create_transaction_lastledgersequence").innerHTML = "Last Ledger Sequence: " + transaction.LastLedgerSequence;
        document.getElementById("create_transaction_fee").innerHTML = "Fee: " + transaction.Fee;
        document.getElementById("create_transaction_sequences").innerHTML = "Sequences: " + transaction.Sequence;
        document.getElementById("create_transaction_raw_txjson_object").innerHTML = txJSON['txJSON'];
    }).catch(console.error);
}

function signTransaction() {
    const signed_tx_object = _signTransaction();
    document.getElementById("signed_transaction_hash").innerHTML = signed_tx_object.signedTransaction;
    document.getElementById("signed_transaction_id").innerHTML = signed_tx_object.id;

}

function submitSignedTransaction() {
    const signed_txjson_string = document.getElementById("submit_signed_txjson_hash")

    // Boilerplate code taken from Ripple API reference site
    const api = new ripple.RippleAPI({
        server: 'wss://s1.ripple.com' // Public rippled server hosted by Ripple, Inc.
    });
    api.on('error', (errorCode, errorMessage) => {
        console.log(errorCode + ': ' + errorMessage);
    });
    api.on('connected', () => {
        console.log('connected');
    });
    api.on('disconnected', (code) => {
        // code - [close code](https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent) sent by the server
        // will be 1000 if this was normal closure
        console.log('disconnected, code:', code);
    });
    api.connect().then(() => {
        console.log("Hello, World!");
        api.sign(signed_tx_string).then(function(resultCode, resultMessage){
            document.getElementById("submit_result_code").innerHTML = resultCode;
            document.getElementById("submit_result_message").innerHTML = resultMessage;
        }).catch(console.error);
    }).then(() => {
        return api.disconnect();
    }).catch(console.error);
}

function _createTransaction() {
    var send_address = document.getElementById("form_sending_wallet_address").value;
    var receive_address = document.getElementById("form_receiving_wallet_address").value;
    var transfer_value_in_xrp = document.getElementById("trans_xrp_value").value;
    var payment = _createPayment(send_address, receive_address, transfer_value_in_xrp);
    const instructions = _createInstructions();
    var api = new ripple.RippleAPI();
    return api.preparePayment(send_address, payment, instructions);
}

function _signTransaction() {
    var secret_key = document.getElementById("sign_transaction_secret_key").value;
    var txjson_object = document.getElementById("sign_transaction_txjson_object").value;
    var api = new ripple.RippleAPI();

    return api.sign(txjson_object, secret_key);
}


function _createPayment(source_address, destination_address, xrp_amount) {
    var payment = {};
    payment['source'] = {};
    payment['source']['address'] = source_address;
    payment['source']['amount'] = {};
    payment['source']['amount']['value'] = xrp_amount.toString();
    payment['source']['amount']['currency'] = 'XRP';
    payment['destination'] = {};
    payment['destination']['address'] = destination_address;
    payment['destination']['minAmount'] = {};
    payment['destination']['minAmount']['value'] = xrp_amount.toString();
    payment['destination']['minAmount']['currency'] = 'XRP';
    return payment;
}

function _createInstructions() {
    var instructions = {};
    instructions['fee'] = "0.00001";
    instructions['sequence'] = 10;
    instructions['maxLedgerVersion'] = 53421;
    return instructions;
}
