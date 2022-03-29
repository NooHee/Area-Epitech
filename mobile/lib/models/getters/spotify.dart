import 'package:firebase_auth/firebase_auth.dart';

import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void isPopular(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final FirebaseAuth auth = FirebaseAuth.instance;
  final User? user = auth.currentUser;
  var key = '';

  final token = await http.get(Uri.parse("$ip/get-keys?uid=${user!.uid}"));
  if (token.statusCode == 200) {
    var res = jsonDecode(token.body);
    key = res['spotify']['key'];
  }

  final response = await http.get(
      Uri.parse("$ip/action/spotify/is-popular?artist=${args[0]}&key=$key"));
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

void follower50K(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final FirebaseAuth auth = FirebaseAuth.instance;
  final User? user = auth.currentUser;
  var key = '';

  final token = await http.get(Uri.parse("$ip/get-keys?uid=${user!.uid}"));
  if (token.statusCode == 200) {
    var res = jsonDecode(token.body);
    key = res['spotify']['key'];
  }
  final response = await http.get(
      Uri.parse("$ip/action/spotify/follower-50k?artist=${args[0]}&key=$key"));
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
