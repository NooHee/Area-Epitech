import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:area_mobile/models/actionlist.class.dart';
import 'package:area_mobile/models/getters/actions.getter.dart';
import 'package:area_mobile/models/getters/reactions.getter.dart';
import 'package:area_mobile/models/services.class.dart';
import 'package:area_mobile/models/reactions.class.dart';
import 'package:area_mobile/widgets/board.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:area_mobile/main.dart';

class Selector extends StatefulWidget {
  const Selector({Key? key}) : super(key: key);

  @override
  _SelectorState createState() => _SelectorState();
}

class _SelectorState extends State<Selector> {
  late Future<List<Services>> servicesA;
  late Future<List<Services>> servicesR;
  late Future<List<ActionList>> actions;
  late Future<List<Reactions>> reactions;
  late String currentServiceA = '';
  late String currentServiceR = '';
  late ActionList currentAction = const ActionList(
      name: '', description: '', args: [], id: '', color: 0, service: '');
  late Reactions currentReaction = const Reactions(
      name: '', description: '', args: [], id: '', color: 0, service: '');

  late List<String> argsA = ['', '', ''];
  late List<String> argsR = ['', '', ''];

  callbackA(action) {
    setState(() {
      currentAction = action;
    });
  }

  callbackR(reaction) {
    setState(() {
      currentReaction = reaction;
    });
  }

  List<String> updateArgsA(int id, String newVal) {
    switch (id) {
      case 0:
        argsA[0] = newVal;
        break;
      case 1:
        argsA[1] = newVal;
        break;
      case 2:
        argsA[2] = newVal;
        break;
      default:
        break;
    }
    return argsA;
  }

  List<String> updateArgsR(int id, String newVal) {
    switch (id) {
      case 0:
        argsR[0] = newVal;
        break;
      case 1:
        argsR[1] = newVal;
        break;
      case 2:
        argsR[2] = newVal;
        break;
      default:
        break;
    }
    return argsR;
  }

  void addWidget(String widget) async {
    final FirebaseAuth auth = FirebaseAuth.instance;
    final User? user = auth.currentUser;
    await http.get(
        Uri.parse("$ip/add-widget?widget=" + widget + "&uid=${user!.uid}"));
    await Navigator.pushReplacement<void, void>(
      context,
      MaterialPageRoute<void>(
        builder: (BuildContext context) => const Board(),
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    servicesA = getServicesActions();
    servicesR = getServicesReactions();
  }

  @override
  Widget build(BuildContext context) {
    if (currentAction.name != '' && currentReaction.name != '') {
      return SafeArea(
        child: Scaffold(
          resizeToAvoidBottomInset: false,
          appBar: AppBar(
            title: const Text('Comfirm the creation'),
            automaticallyImplyLeading: false,
            backgroundColor: Colors.grey[850],
            elevation: 5,
          ),
          body: Column(
            children: [
              const Padding(padding: EdgeInsets.only(top: 30)),
              Text(currentAction.name),
              Text(currentAction.description),
              ListView.builder(
                  shrinkWrap: true,
                  itemCount: currentAction.args.length,
                  itemBuilder: (context, index) {
                    return (Padding(
                        padding: const EdgeInsets.all(10),
                        child: TextField(
                          onChanged: (String value) async {
                            updateArgsA(index, value);
                          },
                          decoration: InputDecoration(
                            border: const OutlineInputBorder(),
                            hintText: currentAction.args[index]['name'],
                            labelText: currentAction.args[index]['name'],
                          ),
                        )));
                  }),
              const Padding(padding: EdgeInsets.only(top: 30)),
              Text(currentReaction.name),
              Text(currentReaction.description),
              ListView.builder(
                  shrinkWrap: true,
                  itemCount: currentReaction.args.length,
                  itemBuilder: (context, index) {
                    return (Padding(
                        padding: const EdgeInsets.all(10),
                        child: TextField(
                          onChanged: (String value) async {
                            updateArgsR(index, value);
                          },
                          decoration: InputDecoration(
                            border: const OutlineInputBorder(),
                            hintText: currentReaction.args[index]['name'],
                            labelText: currentReaction.args[index]['name'],
                          ),
                        )));
                  }),
              const Padding(padding: EdgeInsets.only(top: 30)),
              const Text('Are you sure ?'),
              const Padding(padding: EdgeInsets.only(top: 10)),
              Row(
                children: [
                  Expanded(
                      child: ElevatedButton(
                    style: ElevatedButton.styleFrom(primary: Colors.green),
                    child: const Text('Yes'),
                    onPressed: () async {
                      Map<String, dynamic> js = {
                        'action': currentAction.id,
                        'argsA': argsA,
                        'reaction': currentReaction.id,
                        'argsR': argsR
                      };
                      var res = jsonEncode(js);
                      addWidget(res);
                    },
                  )),
                  const Padding(padding: EdgeInsets.only(right: 30)),
                  Expanded(
                      child: ElevatedButton(
                    style: ElevatedButton.styleFrom(primary: Colors.red),
                    child: const Text('No'),
                    onPressed: () async {
                      setState(() {
                        Navigator.pushReplacement<void, void>(
                          context,
                          MaterialPageRoute<void>(
                            builder: (BuildContext context) => const Selector(),
                          ),
                        );
                      });
                    },
                  )),
                  const Padding(padding: EdgeInsets.only(right: 30)),
                  Expanded(
                    child: ElevatedButton(
                      child: const Text('Abort'),
                      onPressed: () async {
                        setState(() {
                          Navigator.pushReplacement<void, void>(
                            context,
                            MaterialPageRoute<void>(
                              builder: (BuildContext context) => const Board(),
                            ),
                          );
                        });
                      },
                    ),
                  )
                ],
              ),
            ],
          ),
        ),
      );
    } else if (currentAction.name != '') {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Select Reaction'),
          automaticallyImplyLeading: false,
          backgroundColor: Colors.grey[850],
          elevation: 5,
          actions: [
            IconButton(
              icon: const Icon(Icons.close),
              tooltip: 'Cancel creation',
              onPressed: () async {
                Navigator.pushReplacement<void, void>(
                  context,
                  MaterialPageRoute<void>(
                    builder: (BuildContext context) => const Board(),
                  ),
                );
              },
            ),
          ],
        ),
        body: FutureBuilder<List<Services>>(
          future: servicesR,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              if (currentServiceR != '') {
                return SelectorReaction(
                    reaction: currentServiceR, callback: callbackR);
              } else {
                List<Services> list = snapshot.data as List<Services>;
                return ListView.builder(
                  shrinkWrap: true,
                  itemCount: list.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                        title: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          primary: Color(list[index].color)),
                      child: Column(children: [
                        Image(
                          image: AssetImage(
                              'assets/images/' + list[index].label + '.png'),
                          width: 250,
                          height: 250,
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 30),
                          child: Text(
                            list[index].name,
                            style: const TextStyle(
                              fontFamily: "Bebas",
                              fontSize: 25,
                            ),
                          ),
                        )
                      ]),
                      onPressed: () async {
                        setState(() {
                          currentServiceR = list[index].label;
                          reactions = getReactions(currentServiceR);
                        });
                      },
                    ));
                  },
                );
              }
            } else if (snapshot.hasError) {
              return (const Center(child: Text('Ça marche pas')));
            } else {
              return (const Center(child: CircularProgressIndicator()));
            }
          },
        ),
      );
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Action'),
        automaticallyImplyLeading: false,
        backgroundColor: Colors.grey[850],
        elevation: 5,
        actions: [
          IconButton(
            icon: const Icon(Icons.close),
            tooltip: 'Cancel creation',
            onPressed: () async {
              Navigator.pushReplacement<void, void>(
                context,
                MaterialPageRoute<void>(
                  builder: (BuildContext context) => const Board(),
                ),
              );
            },
          ),
        ],
      ),
      body: FutureBuilder<List<Services>>(
        future: servicesA,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            if (currentServiceA != '') {
              return SelectorAction(
                  action: currentServiceA, callback: callbackA);
            } else {
              List<Services> list = snapshot.data as List<Services>;
              return ListView.builder(
                shrinkWrap: true,
                itemCount: list.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                          primary: Color(list[index].color)),
                      child: Column(
                        children: [
                          Image(
                            image: AssetImage(
                                'assets/images/' + list[index].label + '.png'),
                            width: 250,
                            height: 250,
                          ),
                          Padding(
                            padding: const EdgeInsets.symmetric(vertical: 30),
                            child: Text(
                              list[index].name,
                              style: const TextStyle(
                                fontFamily: "Bebas",
                                fontSize: 25,
                              ),
                            ),
                          ),
                        ],
                      ),
                      onPressed: () async {
                        setState(() {
                          currentServiceA = list[index].label;
                          actions = getActions(currentServiceA);
                        });
                      },
                    ),
                  );
                },
              );
            }
          } else if (snapshot.hasError) {
            return (const Center(child: Text('Ça marche pas')));
          } else {
            return (const Center(child: CircularProgressIndicator()));
          }
        },
      ),
    );
  }
}

class SelectorAction extends StatefulWidget {
  const SelectorAction(
      {Key? key, required final this.action, required final this.callback})
      : super(key: key);

  final String action;
  final dynamic callback;

  @override
  _SelectorActionState createState() => _SelectorActionState();
}

class _SelectorActionState extends State<SelectorAction> {
  late Future<List<ActionList>> actions;
  late String currentAction = '';
  late ActionList currentAc;

  @override
  void initState() {
    super.initState();
    actions = getActions(widget.action);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: FutureBuilder<List<ActionList>>(
        future: actions,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<ActionList> list = snapshot.data as List<ActionList>;
            return Column(
              children: [
                Image(
                  image:
                      AssetImage('assets/images/' + list[0].service + '.png'),
                  width: 125,
                  height: 125,
                ),
                ListView.builder(
                  shrinkWrap: true,
                  itemCount: list.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.all(10),
                      child: ListTile(
                          title: ElevatedButton(
                        child: Padding(
                          padding: const EdgeInsets.all(40),
                          child: Text(list[index].name),
                        ),
                        style: ElevatedButton.styleFrom(
                            primary: Color(list[index].color)),
                        onPressed: () async {
                          setState(() {
                            currentAction = list[index].name;
                            currentAc = list[index];
                            widget.callback(currentAc);
                          });
                        },
                      )),
                    );
                  },
                ),
              ],
            );
          } else if (snapshot.hasError) {
            return (const Center(child: Text('Ça marche pas')));
          } else {
            return (const Center(child: CircularProgressIndicator()));
          }
        },
      ),
    );
  }
}

class SelectorReaction extends StatefulWidget {
  const SelectorReaction(
      {Key? key, required final this.reaction, required final this.callback})
      : super(key: key);

  final String reaction;
  final dynamic callback;

  @override
  _SelectorReactionState createState() => _SelectorReactionState();
}

class _SelectorReactionState extends State<SelectorReaction> {
  late Future<List<Reactions>> reactions;
  late String currentReaction = '';
  late Reactions currentReac;

  @override
  void initState() {
    super.initState();
    reactions = getReactions(widget.reaction);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      body: FutureBuilder<List<Reactions>>(
        future: reactions,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            List<Reactions> list = snapshot.data as List<Reactions>;
            return Column(
              children: [
                Image(
                  image:
                      AssetImage('assets/images/' + list[0].service + '.png'),
                  width: 125,
                  height: 125,
                ),
                ListView.builder(
                  shrinkWrap: true,
                  itemCount: list.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.all(10),
                      child: ListTile(
                          title: ElevatedButton(
                        child: Padding(
                          padding: const EdgeInsets.all(35),
                          child: Text(list[index].name),
                        ),
                        style: ElevatedButton.styleFrom(
                            primary: Color(list[index].color)),
                        onPressed: () async {
                          setState(() {
                            currentReaction = list[index].name;
                            currentReac = list[index];
                            widget.callback(currentReac);
                          });
                        },
                      )),
                    );
                  },
                ),
              ],
            );
          } else if (snapshot.hasError) {
            return (const Center(child: Text('Ça marche pas')));
          } else {
            return (const Center(child: CircularProgressIndicator()));
          }
        },
      ),
    );
  }
}
