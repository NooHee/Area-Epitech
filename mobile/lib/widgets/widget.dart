import 'dart:async';
import 'package:http/http.dart' as http;
import 'package:area_mobile/widgets/board.dart';
import 'package:area_mobile/models/getters/getters.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:area_mobile/main.dart';

String getNameAction(String id) {
  switch (id) {
    case 'T0':
      return 'On Time';
    case 'T1':
      return 'Half Time';
    case 'W0':
      return 'Temperature >= 20°C';
    case 'TW0':
      return 'Is Live';
    case 'TW1':
      return 'Stream time >= 1H';
    case 'TW2':
      return 'Top 100 >= 50K viewers';
    case 'S0':
      return 'Popularity > 80%';
    case 'S1':
      return 'Number follower >= 50K';
    case 'R0':
      return 'Subbed to more than 10 subreddits';
    default:
      return 'Undefined action';
  }
}

String getNameReaction(String id) {
  switch (id) {
    case 'D0':
      return 'Write Message';
    case 'D1':
      return 'Write message for every servers';
    case 'D2':
      return 'Create channel';
    case 'D3':
      return 'Send PM';
    case 'C0':
      return 'Cocktail with alcohol';
    case 'C1':
      return 'Cocktail without alcohol';
    default:
      return 'Undefined reaction';
  }
}

class WidgetD extends StatefulWidget {
  const WidgetD(
      {Key? key,
      required this.id,
      required this.action,
      required this.reaction,
      required this.argsA,
      required this.argsR,
      required this.idA,
      required this.idR,
      required this.callback,
      required this.callbackCocktail})
      : super(key: key);

  final int id;
  final FUN action;
  final FUNC reaction;
  final List argsA;
  final List argsR;
  final String idA;
  final String idR;
  final FUNNY callback;
  final FUNNY callbackCocktail;

  @override
  _WidgetState createState() => _WidgetState();
}

class _WidgetState extends State<WidgetD> {
  Timer? timer;
  bool on = false;

  var stylePrimary = const TextStyle(
    fontFamily: "Nunito",
    fontWeight: FontWeight.w500,
    fontSize: 22,
  );

  var styleSecondary = const TextStyle(
    fontFamily: "Bebas",
    fontSize: 20,
  );

  @override
  void initState() {
    super.initState();
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  void deleteWidget(int id) async {
    final FirebaseAuth auth = FirebaseAuth.instance;
    final User? user = auth.currentUser;
    await http
        .get(Uri.parse("$ip/delete-widget?id=${widget.id}&uid=${user!.uid}"));
    await Navigator.pushReplacement<void, void>(
      context,
      MaterialPageRoute<void>(
        builder: (BuildContext context) => const Board(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20.0),
      child: Card(
        color: const Color(0xffCCD7E4),
        elevation: 20,
        child: Padding(
          padding: const EdgeInsets.all(30.0),
          child: Column(
            children: [
              Center(
                child: Text('IF: ' + getNameAction(widget.idA),
                    style: stylePrimary),
              ),
              ListView.builder(
                shrinkWrap: true,
                itemCount: widget.argsA.length,
                itemBuilder: (context, index) {
                  if (widget.argsA[index] != '') {
                    return Text(widget.argsA[index], style: styleSecondary);
                  } else {
                    return (Container());
                  }
                },
              ),
              const Divider(),
              Center(
                child: Text('THEN: ' + getNameReaction(widget.idR),
                    style: stylePrimary),
              ),
              ListView.builder(
                shrinkWrap: true,
                itemCount: widget.argsR.length,
                itemBuilder: (context, index) {
                  if (widget.argsR[index] != '') {
                    return Text(widget.argsR[index], style: styleSecondary);
                  } else {
                    return (Container());
                  }
                },
              ),
              Row(
                children: [
                  IconButton(
                      icon: const Icon(Icons.delete),
                      tooltip: 'Delete',
                      onPressed: () async {
                        deleteWidget(widget.id);
                      }),
                  Switch(
                      value: on,
                      onChanged: (value) {
                        setState(() {
                          on = value;
                        });
                        Timer.periodic(
                            const Duration(seconds: 20),
                            (Timer t) => {
                                  if (on)
                                    {
                                      if (on)
                                        timer != null ? timer!.cancel() : null,
                                      widget.action(
                                          widget.argsA,
                                          widget.reaction,
                                          widget.argsR,
                                          widget.callback,
                                          widget.callbackCocktail),
                                    }
                                });
                      }),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
