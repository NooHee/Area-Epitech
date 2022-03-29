class ActionList {
  final String name;
  final List<dynamic> args;
  final String description;
  final String id;
  final int color;
  final String service;

  const ActionList({
    required this.name,
    required this.description,
    required this.args,
    required this.id,
    required this.color,
    required this.service,
  });

  factory ActionList.fromJson(Map<String, dynamic> json) {
    if (json['args'] == null) {
      return ActionList(
          name: json['name'],
          description: json['description'],
          args: [],
          id: json['id'],
          color: json['color'],
          service: json['service']);
    }
    return ActionList(
        name: json['name'],
        description: json['description'],
        args: json['args'],
        id: json['id'],
        color: json['color'],
        service: json['service']);
  }
}
