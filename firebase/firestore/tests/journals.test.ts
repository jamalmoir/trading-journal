import { setup, teardown } from "./helpers";

describe('Journal rules', () => {

	afterAll(async () => {
		await teardown();
	})

	test('fails when reading/writing to journals when unauthorized', async () => {
		const db = await setup();
		const journalsRef = db.collection('journals');

		expect(journalsRef.get()).toDeny();
	})

	test('passes when reading/writing to journals when authorized', async () => {
		const db = await setup({ uid: "jamal", email: "jamal@gmail.com" });
		const journalsRef = db.collection('journals');

		expect(journalsRef.get()).toAllow();
		expect(journalsRef.add({ userId: 'jamal'})).toAllow();
		expect(journalsRef.add({ userId: 'notJamal'})).toDeny();
	})
});