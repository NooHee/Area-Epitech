import 'package:area_mobile/widgets/settings.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:area_mobile/main.dart';

Future<String> getToken(String code) async {
  const String username = 'af8bbeca37274f82bf1234b019db122b';
  const String password = 'd28e0dd80a1c4c36b2720613cf656ebb';
  String basicAuth =
      'Basic ' + base64Encode(utf8.encode('$username:$password'));

  var r = await http.post(
    Uri.parse("https://accounts.spotify.com/api/token?"),
    headers: <String, String>{'authorization': basicAuth},
    body: <String, String>{
      'code': code,
      'redirect_uri': 'http://localhost:8080/auth/spotify',
      'grant_type': 'authorization_code'
    },
  );
  if (r.statusCode == 200) {
    return r.body;
  } else {
    throw 'Can\'t get Spotify Token';
  }
}

class Autorization extends StatefulWidget {
  const Autorization({Key? key}) : super(key: key);
  @override
  _AutorizationState createState() => _AutorizationState();
}

class _AutorizationState extends State<Autorization> {
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
                'https://accounts.spotify.com/authorize?client_id=af8bbeca37274f82bf1234b019db122b&redirect_uri=http://localhost:8080/auth/spotify&response_type=code&scope=user-read-private%20user-read-email&show_dialog=true',
            javascriptMode: JavascriptMode.unrestricted,
            navigationDelegate: (NavigationRequest request) {
              if (request.url.startsWith('http://localhost:8080')) {
                final Map<String, dynamic> _result =
                    Uri.splitQueryString(request.url);
                if (_result
                    .containsKey('http://localhost:8080/auth/spotify?code')) {
                  var res = _result['http://localhost:8080/auth/spotify?code']
                      .substring(
                          0,
                          _result['http://localhost:8080/auth/spotify?code']
                              .length);
                  getToken(res).then((String result) {
                    var tok = jsonDecode(result);
                    final User? user = auth.currentUser;
                    var toke = tok['access_token'];
                    var uid = user!.uid;
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                          builder: (context) => AddKey(
                              uid: uid, token: toke, service: 'spotify')),
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
    Future(() {
      http.get(Uri.parse(
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
