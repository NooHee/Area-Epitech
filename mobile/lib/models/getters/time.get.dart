import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void onTime(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse("$ip/action/time/on-time"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] != 'KO') {
      react(argsR, callback, callbackCocktail);
    }
  } else {
    throw Exception('Failed to fetch action on-Time');
  }
}

void halfTime(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  args ??= [];
  final response = await http.get(Uri.parse("$ip/action/time/half-time"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] != 'KO') {
      react(argsR, callback, callbackCocktail);
    }
  } else {
    throw Exception('Failed to fetch action half-Time');
  }
}
