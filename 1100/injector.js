function execute(PLfile) {
    var req = new XMLHttpRequest();
    req.open("POST", "http://" + localStorage.ipaddress + ":9090/status");
    req.send();
    req.onerror = function () {
        alert("Cannot Load Payload Because The BinLoader Server Is Not Running");//<<If server is not running, alert message.
        return;
    };
    req.onload = function () {
        var responseJson = JSON.parse(req.responseText);
        if (responseJson.status == "ready") {
            getPayload(PLfile, function (req) {
                sendPayload("http://" + localStorage.ipaddress + ":9090", req.response, function (req) {
                    if (req.status === 200) {
                        allset();
                    } else { msgs.innerHTML = 'Cannot send payload'; return; }
                })
            });
        }
        else {
            alert("Cannot Load Payload Because The BinLoader Server Is Busy");
            return;
        }
    };
}

var getPayload = function (payload, onLoadEndCallback) {
    var req = new XMLHttpRequest();
    req.open('GET', payload);
    req.send();
    req.responseType = "arraybuffer";
    req.onload = function (event) {
        if (onLoadEndCallback) onLoadEndCallback(req, event);
    };
};

var sendPayload = function (url, data, onLoadEndCallback) {
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.send(data);
    req.onload = function (event) {
        if (onLoadEndCallback) onLoadEndCallback(req, event);
    };
};

function allset() {
    ShowMSG = "You're all Set!";
    loadmsg();
}

function checkbinserverstatus() {
    var req = new XMLHttpRequest();
    req.open("POST", "http://" + localStorage.ipaddress + ":9090/status");
    req.send();
    req.onerror = function () {
        alert("GoldHEN Bin Server Not Detected!!!")
        sessionStorage.isbinserver = "no";
    };
    req.onload = function () {
        var responseJson = JSON.parse(req.responseText);
        if (responseJson.status == "ready") {
            sessionStorage.isbinserver = "yes";
        }
    };
} 