import 'package:area_mobile/models/actionlist.class.dart';
import 'package:area_mobile/models/services.class.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:area_mobile/main.dart';

Future<List<Services>> getServicesActions() async {
  final response =
      await http.get(Uri.parse("$ip/services/actions"));
  if (response.statusCode == 200) {
    var objs = jsonDecode(response.body)['services'] as List;
    List<Services> tagObjs =
        objs.map((tagJson) => Services.fromJson(tagJson)).toList();
    return tagObjs;
  } else {
    throw Exception('Failed to fetch Services list');
  }
}

Future<List<ActionList>> getActions(String actions) async {
  final response =
      await http.get(Uri.parse("$ip/actions/$actions"));
  if (response.statusCode == 200) {
    var objs = jsonDecode(response.body)['actions'] as List;
    List<ActionList> tagObjs =
        objs.map((tagJson) => ActionList.fromJson(tagJson)).toList();
    return tagObjs;
  } else {
    throw Exception('Failed to fetch Actions list');
  }
}