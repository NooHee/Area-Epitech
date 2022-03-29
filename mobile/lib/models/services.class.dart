class Services {
  final String name;
  final String label;
  final int color;

  const Services({
    required this.name,
    required this.label,
    required this.color,
  });
  factory Services.fromJson(Map<String, dynamic> json) {
    return Services(
      name: json['name'],
      label: json['label'],
      color: json['color'],
    );
  }
}