import 'package:area_mobile/models/reactions.class.dart';
import 'package:area_mobile/models/services.class.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

Future<List<Services>> getServicesReactions() async {
  final response =
      await http.get(Uri.parse("$ip/services/reactions"));
  if (response.statusCode == 200) {
    var objs = jsonDecode(response.body)['services'] as List;
    List<Services> tagObjs =
        objs.map((tagJson) => Services.fromJson(tagJson)).toList();
    return tagObjs;
  } else {
    throw Exception('Failed to fetch Services list');
  }
}

Future<List<Reactions>> getReactions(String reactions) async {
  final response =
      await http.get(Uri.parse("$ip/reactions/$reactions"));
  if (response.statusCode == 200) {
    var objs = jsonDecode(response.body)['reactions'] as List;
    List<Reactions> tagObjs =
        objs.map((tagJson) => Reactions.fromJson(tagJson)).toList();
    return tagObjs;
  } else {
    throw Exception('Failed to fetch Reactions list');
  }
}