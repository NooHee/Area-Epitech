import 'package:firebase_auth/firebase_auth.dart';

import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void isLive(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final response = await http
      .get(Uri.parse("$ip/action/twitch/is-live?streamer_name=${args[0]}"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] == 'OK') {
      react(argsR, callback, callbackCocktail);
    }
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}

void stream1H(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final response = await http
      .get(Uri.parse("$ip/action/twitch/stream-1h?streamer_name=${args[0]}"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] == 'OK') {
      react(argsR, callback, callbackCocktail);
    }
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}

void top100(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final response =
      await http.get(Uri.parse("$ip/action/twitch/top-100?game=${args[0]}"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] == 'OK') {
      react(argsR, callback, callbackCocktail);
    }
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}
