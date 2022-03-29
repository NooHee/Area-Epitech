import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:http/http.dart' as http;
import 'package:area_mobile/main.dart';
import 'package:flutter/material.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future signInWithGoogle(BuildContext context) async {
    final GoogleSignIn googleSignIn = GoogleSignIn();
    final GoogleSignInAccount? googleSignin = await googleSignIn.signIn();
    if (googleSignin != null) {
      final GoogleSignInAuthentication googleSignInAuthentication =
          await googleSignin.authentication;
      final AuthCredential authCredential = GoogleAuthProvider.credential(
          idToken: googleSignInAuthentication.idToken,
          accessToken: googleSignInAuthentication.accessToken);
      UserCredential result = await _auth.signInWithCredential(authCredential);
      await http.get(Uri.parse(
          "$ip/check-user?uid=${result.user!.uid}&name=${result.user?.displayName}"));
    }
  }

  Future signIn(String email, String password, String name,
      Function(String) callback) async {
    try {
      if (name.isEmpty) {
        throw 'missing username';
      }
      var result = await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: email, password: password);
      await http
          .get(Uri.parse("$ip/check-user?uid=${result.user!.uid}&name=$name"));
    } on FirebaseAuthException catch (e) {
      if (e.code == 'invalid-email') {
        callback('The email is not valid.');
      } else if (e.code == 'weak-password') {
        callback('The password provided is too weak.');
      } else if (e.code == 'email-already-in-use') {
        callback('The account already exists for that email.');
      }
    } catch (e) {
      if (e == 'missing username') {
        callback('Please provide a username');
      } else {
        print(e);
      }
    }
  }

  Future login(String email, String password) async {
    try {
      await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: email, password: password);
    } on FirebaseAuthException catch (e) {
      if (e.code == 'weak-password') {
        print('The password provided is too weak.');
      } else if (e.code == 'email-already-in-use') {
        print('The account already exists for that email.');
      }
    } catch (e) {
      print(e);
    }
  }

  //Sign out
  Future signOut() async {
    try {
      await GoogleSignIn().signOut();
      return await _auth.signOut();
    } catch (e) {
      print(e.toString());
      print('errrrrrrrrrrr');
      return null;
    }
  }
}
