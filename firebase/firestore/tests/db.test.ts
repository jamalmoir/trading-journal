import { setup, teardown } from "./helpers";

describe('Database rules', () => {
	let db: firebase.firestore.Firestore;
	let ref: firebase.firestore.CollectionReference;

	// Applies only to tests in this describe block
	beforeAll(async () => {
		db = await setup();

		ref = db.collection('some-nonexistent-collection');
	});

	afterAll(async () => {
		await teardown();
	})

	test('fails when reading/writing an unauthorized collection', async () => {
		expect(ref.get()).toDeny();
	})
});
