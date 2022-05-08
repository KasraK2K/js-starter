//==============================================================
//
//  #####  ##  #####    #####  #####     ###     ####  #####
//  ##     ##  ##  ##   ##     ##  ##   ## ##   ##     ##
//  #####  ##  #####    #####  #####   ##   ##   ###   #####
//  ##     ##  ##  ##   ##     ##  ##  #######     ##  ##
//  ##     ##  ##   ##  #####  #####   ##   ##  ####   #####
//
//==============================================================

import admin from 'firebase-admin'
import firebase_certificate from '../../firebase_certificate'

export const firebaseApp = admin.initializeApp({
	credential: admin.credential.cert(firebase_certificate),
})

export default firebaseApp
