import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void cocktailAlcoholAlert(
    List args, FUNNY callback, FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse(
      "$ip/trigger/cocktail/random-cocktail-alcoholic?ingredient=${args[0]}"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] == 'OK') {
      return callbackCocktail([jsonEncode(res['cocktail'])]);
    }
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}

void cocktailNoAlcoholAlert(
    List args, FUNNY callback, FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse(
      "$ip/trigger/cocktail/random-cocktail-non-alcoholic?ingredient=${args[0]}"));
  if (response.statusCode == 200) {
    var res = jsonDecode(response.body);
    if (res['result'] == 'OK') {
      return callbackCocktail([jsonEncode(res['cocktail'])]);
    }
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}
