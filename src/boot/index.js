//===============================================================================
//
//  #####    #####    #####   ######   ####  ######  #####      ###    #####
//  ##  ##  ##   ##  ##   ##    ##    ##       ##    ##  ##    ## ##   ##  ##
//  #####   ##   ##  ##   ##    ##     ###     ##    #####    ##   ##  #####
//  ##  ##  ##   ##  ##   ##    ##       ##    ##    ##  ##   #######  ##
//  #####    #####    #####     ##    ####     ##    ##   ##  ##   ##  ##
//
//===============================================================================

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: R E F L E C T   M E T A D A T A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
import 'reflect-metadata'
import starterConfig from '../../starter.config'
import express from 'express'
import mongoClient from './mongodb'
import pool from './postgresql'
import firebase from './firebase'
import fs from 'fs'
import { createRedisClient } from './redis'

const app = express()

starterConfig.boot.forEach(async (moduleName) => {
	await import(`./${moduleName}`).catch((err) => console.log(err.message))

	// ─── MONGODB ────────────────────────────────────────────────────────────────────
	moduleName === 'mongodb' &&
		mongoClient.connect((err) => {
			if (err) {
				console.error(err)
				process.exit(1)
			}
		})
})

export { app, express, mongoClient, pool, firebase, createRedisClient }
