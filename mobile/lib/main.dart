import 'package:area_mobile/authentication/auth_checker.dart';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:http/http.dart' as http;

var ip = 'None';
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const IpInput());
}

class IpInput extends StatefulWidget {
  const IpInput({Key? key}) : super(key: key);

  @override
  _IpInputState createState() => _IpInputState();
}

class _IpInputState extends State<IpInput> {
  late String ipV = '10.0.2.2';
  late String message = '';

  @override
  Widget build(BuildContext context) {
    return (MaterialApp(
      debugShowCheckedModeBanner: false,
      home: Builder(
        builder: (context) => Scaffold(
          resizeToAvoidBottomInset: false,
          body: Center(
            child: Padding(
              padding: const EdgeInsets.only(top: 200),
              child: Column(
                children: [
                  const Text(
                      'Please provide only the hostname of the backend to get\naccess to the app.\n\n Example: 10.0.2.2'),
                  const Padding(padding: EdgeInsets.only(top: 20)),
                  SizedBox(
                    width: 300,
                    child: TextFormField(
                      initialValue: ipV,
                      decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          labelText: 'Hostname',
                          hintText: 'IP'),
                      onChanged: (String val) {
                        ipV = val;
                      },
                    ),
                  ),
                  IconButton(
                      icon: const Icon(Icons.login),
                      onPressed: () async {
                        if (ipV == '') return;
                        var tmp = 'http://' + ipV;
                        bool valid = Uri.parse(tmp).isAbsolute;
                        if (valid) {
                          try {
                            await http.get(Uri.parse(tmp + ':8081'));
                            ip = tmp + ':8081';
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const AuthChecker()),
                            );
                          } catch (error) {
                            print(error);
                            setState(() {
                              ipV = '';
                              message =
                                  'Can\'t reach backend. Please check the hostname';
                            });
                          }
                          //print(res);
                        }
                      }),
                  Padding(
                      child: Text(message != '' ? message : ''),
                      padding: const EdgeInsets.only(top: 10)),
                ],
              ),
            ),
          ),
        ),
      ),
    ));
  }
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      debugShowCheckedModeBanner: false,
      home: AuthChecker(),
    );
  }
}
