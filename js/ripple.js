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
    _signTransaction().then(function(signed_tx_object){
        document.getElementById("signed_transfer_object").innerHTML = signed_tx_object;
    }).catch(console.error);
}

function _signTransaction() {
    var secret_key = document.getElementById("sign_transaction_secret_key");
    var txjson_object = document.getElementById("sign_transaction_txjson_object");
    var api = new ripple.RippleAPI();
    return api.sign(txjson_object, secret_key);
}

function _createTransaction() {
    var send_address = document.getElementById("form_sending_wallet_address").value;
    var receive_address = document.getElementById("form_receiving_wallet_address").value;
    var transfer_value_in_xrp = document.getElementById("trans_xrp_value").value;
    var payment = createPayment(send_address, receive_address, transfer_value_in_xrp);
    const instructions = createInstructions();
    var api = new ripple.RippleAPI();
    return api.preparePayment(send_address, payment, instructions);
}

function createPayment(source_address, destination_address, xrp_amount) {
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

function createInstructions() {
    var instructions = {};
    instructions['fee'] = "0.00001";
    instructions['sequence'] = 10;
    instructions['maxLedgerVersion'] = 53421;
    return instructions;
}
