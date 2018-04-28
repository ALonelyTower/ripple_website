function generateKeys() {
  var api = new ripple.RippleAPI();
  var account = api.generateAddress();
  document.getElementById("public_key").innerHTML = account.address;
  document.getElementById("private_key").innerHTML = account.secret;
}