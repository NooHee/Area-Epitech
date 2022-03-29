import 'package:flutter/material.dart';
import 'package:area_mobile/firebase/auth.dart';
/* 
class GoogleSignInButton extends StatefulWidget {
  @override
  _GoogleSignInButtonState createState() => _GoogleSignInButtonState();
}

class _GoogleSignInButtonState extends State<GoogleSignInButton> {
  bool _isSigningIn = false;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: _isSigningIn
          ? CircularProgressIndicator(
              valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
            )
          : OutlinedButton(
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(Colors.white),
                shape: MaterialStateProperty.all(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(40),
                  ),
                ),
              ),
              onPressed: () async {
                setState(() {
                  _isSigningIn = true;
                });

                // TODO: Add a method call to the Google Sign-In authentication

                setState(() {
                  _isSigningIn = false;
                });
              },
              child: Padding(
                padding: const EdgeInsets.fromLTRB(0, 10, 0, 10),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    Image(
                      image: AssetImage("assets/discord.png"),
                      height: 35.0,
                    ),
                    Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Text(
                        'Sign in with Google',
                        style: TextStyle(
                          fontSize: 20,
                          color: Colors.black54,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    )
                  ],
                ),
              ),
            ),
    );
  }
}


class SignInScreen extends StatefulWidget {
  @override
  _SignInScreenState createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  @override
  Widget build(BuildContext context) {
    return Container(child: GoogleSignInButton());
  }
}
 */

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  String name = '';
  String email = '';
  String password = '';

  void callback(String arg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(arg),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final AuthService _auth = AuthService();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.grey[850],
        elevation: 0.0,
      ),
      resizeToAvoidBottomInset: false,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Form(
            child: Column(
              children: [
                const SizedBox(height: 20.0),
                Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'Email',
                        ),
                        onChanged: (em) {
                          setState(() => email = em);
                        })),
                const SizedBox(height: 10.0),
                Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                        obscureText: true,
                        decoration: const InputDecoration(
                          border: OutlineInputBorder(),
                          hintText: 'Password',
                        ),
                        onChanged: (pass) {
                          setState(() => password = pass);
                        })),
                const SizedBox(height: 10.0),
                Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 50),
                    child: TextFormField(
                        decoration: const InputDecoration(
                            border: OutlineInputBorder(),
                            hintText: 'Username',
                            labelText: 'Fill only if you signup a new account'),
                        onChanged: (nm) {
                          setState(() => name = nm);
                        })),
                Padding(
                  padding: EdgeInsets.only(top: 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        style:
                            ElevatedButton.styleFrom(primary: Colors.grey[850]),
                        child: const Text('Login'),
                        onPressed: () async {
                          await _auth.login(email, password);
                        },
                      ),
                      ElevatedButton(
                        child: const Text('Register'),
                        style:
                            ElevatedButton.styleFrom(primary: Colors.grey[850]),
                        onPressed: () async {
                          await _auth.signIn(email, password, name, callback);
                        },
                      ),
                      ElevatedButton(
                        child: const Text('Signin with google'),
                        style:
                            ElevatedButton.styleFrom(primary: Colors.grey[850]),
                        onPressed: () async {
                          await _auth.signInWithGoogle(context);
                        },
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
