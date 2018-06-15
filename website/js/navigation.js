(function() {
    injectHeaderHTML();
    injectNavigationHTML();
})();

function injectHeaderHTML() {
    var header = document.createElement("header");
    var jumbotron = document.createElement("div");
    var jumbo_header_one = document.createElement("h1");
    var jumbo_header_txt = document.createTextNode("Ripple API Browser");

    header.setAttribute("class", "container");
    jumbotron.setAttribute("class", "jumbotron");

    header.appendChild(jumbotron);
    jumbotron.appendChild(jumbo_header_one);
    jumbo_header_one.appendChild(jumbo_header_txt);
    document.body.appendChild(header);
}

function injectNavigationHTML() {
    var outerDiv = document.createElement("div");
    var navUnorderedList = document.createElement("ul");
    var navItemArray = ["Home", "Create Wallet", "Create Transaction", "Sign Transaction", "Help"];
    var navAddrArray = ["index.html", "create_wallet.html", "create_transaction.html", "sign_transaction.html", "help.html"];
    var listItemArray = [];
    var linkItemArray = [];

    outerDiv.setAttribute("class", "container");

    navUnorderedList.setAttribute("class", "nav nav-tabs")

    for (var navItem in navItemArray) {
        listItemArray.push(document.createElement("li"));
        linkItemArray.push(document.createElement("a"));
    }

    for (var listItem in listItemArray) {
        listItemArray[listItem].setAttribute("class", "nav-item");
    }

    for (var linkItem in linkItemArray) {
        linkItemArray[linkItem].setAttribute("class", "nav-link");
        linkItemArray[linkItem].setAttribute("href", navAddrArray[linkItem]);
        linkItemArray[linkItem].innerHTML = navItemArray[linkItem];
    }

    for (var listItem in listItemArray) {
        listItemArray[listItem].appendChild(linkItemArray[listItem]);
    }

    for (var listItem in listItemArray) {
        navUnorderedList.appendChild(listItemArray[listItem]);
    }

    outerDiv.appendChild(navUnorderedList);
    document.body.appendChild(outerDiv);
}
