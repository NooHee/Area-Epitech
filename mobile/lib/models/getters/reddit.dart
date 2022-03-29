import 'package:firebase_auth/firebase_auth.dart';
import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void nbSub(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final FirebaseAuth auth = FirebaseAuth.instance;
  final User? user = auth.currentUser;
  var key = '';

  final token = await http.get(Uri.parse("$ip/get-keys?uid=${user!.uid}"));
  if (token.statusCode == 200) {
    var res = jsonDecode(token.body);
    key = res['reddit']['key'];
  }

  final response = await http.get(
      Uri.parse("$ip/action/reddit/nb-sub?key=$key"));
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