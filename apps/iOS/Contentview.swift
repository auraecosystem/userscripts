// Inside your Swift ViewController / WKWebView configuration
let javascriptCode = "window.updatePlaygroundState('network_connected')"
webView.evaluateJavaScript(javascriptCode) { (result, error) in
    if let error = error {
        print("Bridge injection failed: \(error)")
    }
}
