import 'dart:convert';

import 'package:area_mobile/widgets/board.dart';
import 'package:area_mobile/widgets/discord_webview.dart';
import 'package:area_mobile/widgets/reddit_webview.dart';
import 'package:area_mobile/widgets/spotify_webview.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:area_mobile/main.dart';

Future<List> getServicesSub() async {
  final FirebaseAuth auth = FirebaseAuth.instance;
  final User? user = auth.currentUser;
  var r = await http.get(
    Uri.parse("$ip/get-keys?uid=${user!.uid}"),
  );
  if (r.statusCode == 200) {
    var res = jsonDecode(r.body);
    return [res['spotify']['key'], res['reddit']['key']];
  } else {
    throw 'Can\'t get Spotify Token';
  }
}

Future deleteKey(String key) async {
  final FirebaseAuth auth = FirebaseAuth.instance;
  final User? user = auth.currentUser;
  var r = await http.get(
    Uri.parse("$ip/clear-key?uid=${user!.uid}&service=$key"),
  );
  if (r.statusCode == 200) {
    return;
  } else {
    throw 'Can\'t get Spotify Token';
  }
}

Padding getButton(int index, String key, BuildContext context) {
  if (index == 0) {
    if (key == '') {
      return (Padding(
        padding: const EdgeInsets.all(20),
        child: ElevatedButton(
          style: ButtonStyle(
            backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
          ),
          onPressed: () async {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (context) => const Autorization()),
            );
          },
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: const [
              Text('Sub Spotify'),
              SizedBox(
                width: 45,
              ),
              Icon(
                Icons.login,
                size: 24.0,
              ),
            ],
          ),
        ),
      ));
    } else {
      return (Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(
                  const Color.fromARGB(255, 46, 120, 48)),
            ),
            onPressed: () async {
              await deleteKey('spotify');
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const Settings()),
              );
            },
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Text('Unsub Spotify'),
                SizedBox(
                  width: 45,
                ),
                Icon(
                  Icons.close,
                  size: 24.0,
                ),
              ],
            ),
          )));
    }
  } else {
    if (key == '') {
      return (Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(Colors.blue),
            ),
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const Autorization2()),
              );
            },
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Text('Sub Reddit'),
                SizedBox(
                  width: 45,
                ),
                Icon(
                  Icons.login,
                  size: 24.0,
                ),
              ],
            ),
          )));
    } else {
      return (Padding(
          padding: const EdgeInsets.all(20),
          child: ElevatedButton(
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(
                  const Color.fromARGB(255, 25, 108, 176)),
            ),
            onPressed: () async {
              await deleteKey('reddit');
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const Settings()),
              );
            },
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: const [
                Text('Unsub Reddit'),
                SizedBox(
                  width: 45,
                ),
                Icon(
                  Icons.close,
                  size: 24.0,
                ),
              ],
            ),
          )));
    }
  }
}

class Settings extends StatefulWidget {
  const Settings({Key? key}) : super(key: key);

  @override
  _SettingsState createState() => _SettingsState();
}

class _SettingsState extends State<Settings> {
  final FirebaseAuth auth = FirebaseAuth.instance;
  late Future<List> subs;

  @override
  void initState() {
    super.initState();
    subs = getServicesSub();
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Builder(
        builder: (context) => Scaffold(
          appBar: AppBar(
            title: const Text('Settings'),
            backgroundColor: Colors.grey[850],
            elevation: 5,
            actions: [
              IconButton(
                icon: const Icon(Icons.analytics),
                tooltip: 'Panel',
                onPressed: () async {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const Board()),
                  );
                },
              ),
              IconButton(
                icon: const Icon(Icons.power_settings_new),
                tooltip: 'Logout',
                onPressed: () async {
                  await auth.signOut();
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const IpInput()),
                  );
                },
              )
            ],
          ),
          body: Column(
            children: [
              ElevatedButton(
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(
                        const Color(0xff7289DA)),
                  ),
                  onPressed: (() => Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const AutorizationDiscord()),
                      )),
                  child: const Text('Add Discord Bot')),
              FutureBuilder<List>(
                  future: subs,
                  builder: (BuildContext context, snapshot) {
                    if (snapshot.hasData) {
                      final servicesSub = snapshot.data;
                      return ListView.builder(
                          shrinkWrap: true,
                          itemCount: servicesSub!.length,
                          itemBuilder: (context, index) {
                            return getButton(
                                index, servicesSub[index], context);
                          });
                    } else if (snapshot.hasError) {
                      return (const Center(
                        child: Text('Error while fetching user widgets'),
                      ));
                    } else {
                      return const Center(child: CircularProgressIndicator());
                    }
                  }),
            ],
          ),
        ),
      ),
    );
  }
}
