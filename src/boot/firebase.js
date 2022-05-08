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

export const firebaseApp = admin.initializeApp({
	credential: admin.credential.cert(require('../../firebase_certificate.json')),
})

export default firebaseApp
