import 'package:area_mobile/widgets/settings.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:area_mobile/main.dart';

Future<String> getToken(String code) async {
  const String username = 'B4jjSHqhYnNU0Ql1YzQvGw';
  const String password = 'rBnzD9uKXJY8qK6ljuyiB4qSR5KGxQ';
  String basicAuth =
      'Basic ' + base64Encode(utf8.encode('$username:$password'));

  var r = await http.post(
    Uri.parse("https://www.reddit.com/api/v1/access_token"),
    headers: <String, String>{'authorization': basicAuth},
    body: <String, String>{
      'code': code,
      'redirect_uri': 'http://localhost:8080/auth/reddit',
      'grant_type': 'authorization_code'
    },
  );
  if (r.statusCode == 200) {
    return r.body;
  } else {
    throw 'Can\'t get Spotify Token';
  }
}

class Autorization2 extends StatefulWidget {
  const Autorization2({Key? key}) : super(key: key);
  @override
  _Autorization2State createState() => _Autorization2State();
}

class _Autorization2State extends State<Autorization2> {
  final Completer<WebViewController> _controller =
      Completer<WebViewController>();
  final FirebaseAuth auth = FirebaseAuth.instance;

  @override
  Widget build(BuildContext context) {
    return SafeArea(
        child: Scaffold(
      body: SizedBox(
          height: double.infinity,
          child: WebView(
            onWebViewCreated: (WebViewController c) {
              _controller.complete(c);
            },
            initialUrl:
                'https://www.reddit.com/api/v1/authorize?client_id=B4jjSHqhYnNU0Ql1YzQvGw&response_type=code&state=area&redirect_uri=http://localhost:8080/auth/reddit&duration=permanent&scope=identity mysubreddits vote read submit subscribe account',
            javascriptMode: JavascriptMode.unrestricted,
            navigationDelegate: (NavigationRequest request) {
              if (request.url.startsWith('http://localhost:8080')) {
                final Map<String, dynamic> _result =
                    Uri.splitQueryString(request.url);
                if (_result.containsKey('code')) {
                  var res =
                      _result['code'].substring(0, _result['code'].length - 2);
                  getToken(res).then((String result) {
                    var tok = jsonDecode(result);
                    final User? user = auth.currentUser;
                    var toke = tok['access_token'];
                    var uid = user!.uid;
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              AddKey(uid: uid, token: toke, service: 'reddit')),
                    );
                  });
                } else {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const IpInput()),
                  );
                }
                return NavigationDecision.prevent;
              }
              return NavigationDecision.navigate;
            },
          )),
    ));
  }
}

class AddKey extends StatefulWidget {
  const AddKey(
      {Key? key, required this.uid, required this.service, required this.token})
      : super(key: key);

  final String uid;
  final String service;
  final String token;

  @override
  _AddKeyState createState() => _AddKeyState();
}

class _AddKeyState extends State<AddKey> {
  @override
  void initState() {
    super.initState();
    Future(() async {
      await http.get(Uri.parse(
          "$ip/set-key?uid=${widget.uid}&service=${widget.service}&key=${widget.token}"));
    });
    Future(() {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const Settings()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
