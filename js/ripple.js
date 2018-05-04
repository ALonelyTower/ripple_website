function generateKeys() {
  var api = new ripple.RippleAPI();
  var account = api.generateAddress();
  document.getElementById("public_key").innerHTML = account.address;
  document.getElementById("private_key").innerHTML = account.secret;
}


function createTransaction() {
    _createTransaction().then(function(txJSON){
        var transaction = txJSON['txJSON'];
        console.log(transaction);
        console.log(transaction['TransactionType']);
        document.getElementById("create_transaction_transtype").innerHTML = transaction.TransactionType;
    }).catch(console.error);
}

function _createTransaction() {
    var send_address = document.getElementById("form_sending_wallet_address").value;
    var receive_address = document.getElementById("form_receiving_wallet_address").value;
    var transfer_value_in_xrp = document.getElementById("trans_xrp_value").value;
    var payment = createPayment(send_address, receive_address, transfer_value_in_xrp);
    const instructions = createInstructions();
    var api = new ripple.RippleAPI();
    return api.preparePayment(send_address, payment, instructions);
    // return api.preparePayment(send_address, payment);
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
    instructions['sequence'] = 1;
    instructions['maxLedgerVersion'] = 53421;
    return instructions;
}
