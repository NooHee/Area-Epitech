import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void higherThan20(List? args, FUNC react, List argsR, FUNNY callback,
    FUNNY callbackCocktail) async {
  final response = await http
      .get(Uri.parse("$ip/action/weather/higher-than-20?city=${args![0]}"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] != 'KO') {
      react(argsR, callback, callbackCocktail);
    }
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != null) callback([res['error']]);
  }
}
