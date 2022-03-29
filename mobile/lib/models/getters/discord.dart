import 'getters.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

void discordMessage(List args, FUNNY callback, FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse(
      "$ip/trigger/discord/message?channel=${args[0]}&message=${args[1]}"));
  if (response.statusCode == 200) {
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}

void discordMessage4ALL(
    List args, FUNNY callback, FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse(
      "$ip/trigger/discord/message-for-all?channel=${args[0]}&message=${args[1]}"));
  if (response.statusCode == 200) {
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}

void discordCreateChannel(
    List args, FUNNY callback, FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse(
      "$ip/trigger/discord/create-channel?sname=${args[0]}&channel=${args[1]}"));
  if (response.statusCode == 200) {
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}

void discordPM(List args, FUNNY callback, FUNNY callbackCocktail) async {
  final response = await http.get(Uri.parse(
      "$ip/trigger/discord/send-pm?user=${args[0]}&message=${args[1]}"));
  if (response.statusCode == 200) {
  } else {
    var res = jsonDecode(response.body);
    if (res['error'] != '') callback([res['error']]);
  }
}
