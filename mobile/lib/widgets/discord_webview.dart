import 'package:area_mobile/widgets/settings.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:webview_flutter/webview_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:area_mobile/main.dart';

class AutorizationDiscord extends StatefulWidget {
  const AutorizationDiscord({Key? key}) : super(key: key);
  @override
  _AutorizationDiscordState createState() => _AutorizationDiscordState();
}

class _AutorizationDiscordState extends State<AutorizationDiscord> {
  final Completer<WebViewController> _controller =
      Completer<WebViewController>();

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
                'https://discord.com/api/oauth2/authorize',
            javascriptMode: JavascriptMode.unrestricted,
            navigationDelegate: (NavigationRequest request) {
              if (request.url == 'https://discord.com/oauth2/authorized' ||
                  request.url ==
                      'https://discord.com/oauth2/error?error=access_denied') {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const Settings()),
                );
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
