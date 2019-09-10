import firebase from '@firebase/testing';
import fs from 'fs';

declare global {
    namespace jest {
        interface Matchers<R> {
            // add any of your custom matchers here
            toAllow: () => {pass: boolean, message: string};
            toDeny: () => {pass: boolean, message: string};
        }
    }
}

expect.extend({
	async toAllow(x) {
		let pass = false;
		try {
			await firebase.assertSucceeds(x);
			pass = true;
		} catch (err) {}

		return {
			pass,
			message: () => 'Expected Firebase operation to be allowed, but it was denied.'
		};
	}
});

expect.extend({
	async toDeny(x) {
		let pass = false;
		try {
			await firebase.assertFails(x);
			pass = true;
		} catch (err) {}

		return {
			pass,
			message: () => 'Expected Firebase operation to be denied, but it was allowed.'
		};
	}
});

export const setup = async (auth?: {uid: string, email: string}, data?: any) => {
	const projectId = `rules-spec-${Date.now()}`;

	const app = await firebase.initializeTestApp({
		projectId: projectId,
		auth: auth,
	});

	const db = app.firestore();
	
	// Write mock documents before rules.
	if (data) {
		for (const key in data) {
			const ref = db.doc(key);
			await ref.set(data[key]);
		}
	}

	// Apply rules.
	await firebase.loadFirestoreRules({
		projectId: projectId,
		rules: fs.readFileSync('firestore.rules').toString()
	});

	return db
}

export const teardown = async () => {
	Promise.all(firebase.apps().map(app => app.delete()));
}

