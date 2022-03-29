import 'package:area_mobile/models/getters/reddit.dart';
import 'package:area_mobile/models/getters/spotify.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'twitch.dart';
import 'cocktail.dart';
import 'discord.dart';
import 'time.get.dart';
import 'weather.dart';

import 'package:area_mobile/main.dart';

typedef FUNC = void Function(List args, FUNNY, FUNNY);
typedef FUNNY = void Function(List args);
typedef FUN = void Function(
    List args, FUNC react, List argsR, FUNNY callback, FUNNY callbackCocktail);

void alertSystem(List args, FUNNY callback, FUNNY callbackCocktail) {
  callback(args);
}

FUN getAction(id) {
  switch (id) {
    case 'T0':
      return onTime;
    case 'T1':
      return halfTime;
    case 'W0':
      return higherThan20;
    case 'TW0':
      return isLive;
    case 'TW1':
      return stream1H;
    case 'TW2':
      return top100;
    case 'S0':
      return isPopular;
    case 'S1':
      return follower50K;
    case 'R0':
      return nbSub;
  }
  throw 'error';
}

FUNC getReaction(id) {
  switch (id) {
    case 'D0':
      return discordMessage;
    case 'D1':
      return discordMessage4ALL;
    case 'D2':
      return discordCreateChannel;
    case 'D3':
      return discordPM;
    case 'C0':
      return cocktailAlcoholAlert;
    case 'C1':
      return cocktailNoAlcoholAlert;
  }
  throw ('error: ' + id.toString());
}

Future<List> getWidgets() async {
  final FirebaseAuth auth = FirebaseAuth.instance;
  try {
    final User? user = auth.currentUser;
    final response =
        await http.get(Uri.parse("$ip/get-widget?uid=${user!.uid}"));
    if (response.statusCode == 200) {
      var res = jsonDecode(response.body);
      return res['widgets'];
    } else {
      throw 'Error while fetching widgets from user';
    }
  } catch (err) {
    print(err);
    return [];
  }
}
