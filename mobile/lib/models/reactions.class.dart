class Reactions {
  final String name;
  final String description;
  final List<dynamic> args;
  final String id;
  final int color;
  final String service;

  const Reactions(
      {required this.name,
      required this.description,
      required this.args,
      required this.id,
      required this.color,
      required this.service});

  factory Reactions.fromJson(Map<String, dynamic> json) {
    if (json['args'] == null) {
      return Reactions(
          name: json['name'],
          description: json['description'],
          args: [],
          id: json['id'],
          color: json['color'],
          service: json['service']);
    }
    return Reactions(
        name: json['name'],
        description: json['description'],
        args: json['args'],
        id: json['id'],
        color: json['color'],
        service: json['service']);
  }
}
