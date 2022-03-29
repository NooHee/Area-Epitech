import 'dart:async';
import 'dart:convert';
import 'package:area_mobile/firebase/auth.dart';
import 'package:area_mobile/main.dart';
import 'package:area_mobile/widgets/selector.dart';
import 'package:area_mobile/widgets/settings.dart';
import 'package:area_mobile/widgets/widget.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:area_mobile/models/getters/getters.dart';
import 'package:http/http.dart' as http;

class Board extends StatefulWidget {
  const Board({Key? key}) : super(key: key);

  @override
  _BoardState createState() => _BoardState();
}

class _BoardState extends State<Board> {
  final AuthService _auth = AuthService();
  final FirebaseAuth auth = FirebaseAuth.instance;

  Timer? timer;
  var disp = false;
  late Future<List> widgets;

  @override
  void initState() {
    super.initState();
    widgets = getWidgets();
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  void callback(List args) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(args[0]),
      ),
    );
  }

  void callbackCocktail(List args) async {
    if (!disp) {
      var json = jsonDecode(args[0]);
      disp = true;
      return showDialog<void>(
        context: context,
        barrierDismissible: true,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('You chose ' + json['ingredient']),
            content: Column(children: [
              Text('I suggest you: ' + json['name']),
              SizedBox(
                height: 128,
                width: 128,
                child: Image.network(json['img']),
              ),
              const Padding(padding: EdgeInsets.only(top: 2)),
              SizedBox(
                height: 200.0,
                width: 300.0,
                child: Center(
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: json['ingredients'].length,
                    itemBuilder: (context, index) {
                      if (json['ingredients'][index] != '') {
                        return Text(json['ingredients'][index]);
                      } else {
                        return Container();
                      }
                    },
                  ),
                ),
              ),
              const Padding(padding: EdgeInsets.only(top: 30)),
              Center(
                child: SizedBox(
                  child: Text(
                    json['instructions'],
                    maxLines: 4,
                    overflow: TextOverflow.ellipsis,
                    softWrap: false,
                  ),
                ),
              )
            ]),
            actions: [
              TextButton(
                child: const Text('Close'),
                onPressed: () {
                  disp = false;
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.grey[850],
        elevation: 5,
        actions: [
          IconButton(
            icon: const Icon(Icons.settings),
            tooltip: 'Settings',
            onPressed: () async {
              Navigator.pushReplacement<void, void>(
                context,
                MaterialPageRoute<void>(
                  builder: (BuildContext context) => const Settings(),
                ),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.power_settings_new),
            tooltip: 'Logout',
            onPressed: () async {
              await _auth.signOut();
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const IpInput()),
              );
            },
          )
        ],
      ),
      body: CustomScrollView(
        slivers: [
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (BuildContext context, int index) {
                return IconButton(
                    icon: const Icon(Icons.add_box_outlined,
                        size: 50, color: Color(0xff16DB93)),
                    onPressed: () async {
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const Selector()),
                      );
                    });
              },
              childCount: 1,
            ),
          ),
          SliverList(
            delegate: SliverChildListDelegate(
              [
                FutureBuilder(
                    future: getWidgets(),
                    builder: (context, snapshot) {
                      if (snapshot.hasData) {
                        var list = snapshot.data as List;
                        return ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: list.length,
                            itemBuilder: (context, index) {
                              return WidgetD(
                                id: index,
                                idA: list[index]['action'],
                                idR: list[index]['reaction'],
                                action: getAction(list[index]['action']),
                                reaction: getReaction(list[index]['reaction']),
                                argsA: list[index]['argsA'],
                                argsR: list[index]['argsR'],
                                callback: callback,
                                callbackCocktail: callbackCocktail,
                              );
                            });
                      } else if (snapshot.hasError) {
                        return (const Center(
                            child: Text('Error while fetching user widgets')));
                      } else {
                        return const Padding(
                            padding: EdgeInsets.only(top: 40),
                            child: Center(child: CircularProgressIndicator()));
                      }
                    })
              ],
            ),
          ),
        ],
      ),
    );
  }
}
